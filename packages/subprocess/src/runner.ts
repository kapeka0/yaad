import { spawn, type ChildProcessByStdio } from "node:child_process";
import { createInterface } from "node:readline";
import type { Readable } from "node:stream";

const DEFAULT_TIMEOUT_MS = 60_000;
const DEFAULT_KILL_GRACE_MS = 5_000;
const DEFAULT_STDERR_MAX_BYTES = 64 * 1024;
const ERROR_STDERR_PREVIEW_CHARS = 1_000;

// External tools often outlive the Node worker that launched them unless they
// are explicitly interrupted during a container update. A single process-wide
// signal is shared by every invocation and combined with any caller signal.
const processShutdownController = new AbortController();
let processShutdownListenersInstalled = false;

function getProcessShutdownSignal(): AbortSignal {
  if (!processShutdownListenersInstalled) {
    processShutdownListenersInstalled = true;
    const abort = (signal: NodeJS.Signals): void => {
      if (!processShutdownController.signal.aborted) {
        processShutdownController.abort(new Error(`Worker received ${signal}`));
      }
    };
    process.once("SIGTERM", () => abort("SIGTERM"));
    process.once("SIGINT", () => abort("SIGINT"));
  }
  return processShutdownController.signal;
}

export type ProcessFailureReason =
  | "spawn"
  | "exit"
  | "signal"
  | "timeout"
  | "abort"
  | "output";

export interface RunProcessOptions {
  command: string;
  args?: readonly string[];
  timeoutMs?: number;
  killGraceMs?: number;
  stderrMaxBytes?: number;
  allowedExitCodes?: readonly number[];
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  signal?: AbortSignal;
  onStdoutLine?: (line: string) => void;
}

export interface ProcessResult {
  exitCode: number;
  signal: NodeJS.Signals | null;
  stderr: string;
  stderrTruncated: boolean;
  durationMs: number;
}

interface ProcessErrorDetails {
  command: string;
  reason: ProcessFailureReason;
  exitCode: number | null;
  signal: NodeJS.Signals | null;
  stderr: string;
  stderrTruncated: boolean;
  timedOut: boolean;
  aborted: boolean;
  cause?: unknown;
}

/**
 * Error deliberately marked retryable so queue consumers can distinguish a
 * transient tool/process failure from invalid job input.
 */
export class ProcessExecutionError extends Error {
  readonly retryable = true;
  readonly command: string;
  readonly reason: ProcessFailureReason;
  readonly exitCode: number | null;
  readonly signal: NodeJS.Signals | null;
  readonly stderr: string;
  readonly stderrTruncated: boolean;
  readonly timedOut: boolean;
  readonly aborted: boolean;

  constructor(message: string, details: ProcessErrorDetails) {
    super(message, details.cause === undefined ? undefined : { cause: details.cause });
    this.name = "ProcessExecutionError";
    this.command = details.command;
    this.reason = details.reason;
    this.exitCode = details.exitCode;
    this.signal = details.signal;
    this.stderr = details.stderr;
    this.stderrTruncated = details.stderrTruncated;
    this.timedOut = details.timedOut;
    this.aborted = details.aborted;
  }
}

function positiveInteger(value: string | undefined): number | null {
  if (!value) return null;
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) return null;
  return parsed;
}

/** A tool-specific timeout can be overridden globally for operational tuning. */
export function getToolTimeoutMs(envName: string, fallbackMs: number): number {
  return (
    positiveInteger(process.env[envName]) ??
    positiveInteger(process.env.EXTERNAL_TOOL_TIMEOUT_MS) ??
    fallbackMs
  );
}

function stderrPreview(stderr: string): string {
  const compact = stderr.trim().replace(/\s+/g, " ");
  if (!compact) return "";
  return `: ${compact.slice(-ERROR_STDERR_PREVIEW_CHARS)}`;
}

function processError(
  command: string,
  reason: ProcessFailureReason,
  message: string,
  details: Omit<ProcessErrorDetails, "command" | "reason">,
): ProcessExecutionError {
  return new ProcessExecutionError(`${message}${stderrPreview(details.stderr)}`, {
    command,
    reason,
    ...details,
  });
}

/**
 * Run a CLI with bounded diagnostics and deterministic termination.
 *
 * stdout is always drained line-by-line. stderr is also always drained, while
 * only its bounded tail is retained for diagnostics. On Linux/macOS the child
 * starts in its own process group so descendants receive SIGTERM/SIGKILL too.
 */
export async function runProcess(options: RunProcessOptions): Promise<ProcessResult> {
  const args = [...(options.args ?? [])];
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const killGraceMs =
    options.killGraceMs ??
    positiveInteger(process.env.EXTERNAL_TOOL_KILL_GRACE_MS) ??
    DEFAULT_KILL_GRACE_MS;
  const stderrMaxBytes =
    options.stderrMaxBytes ??
    positiveInteger(process.env.EXTERNAL_TOOL_STDERR_MAX_BYTES) ??
    DEFAULT_STDERR_MAX_BYTES;
  const allowedExitCodes = new Set(options.allowedExitCodes ?? [0]);
  const abortSignals = [getProcessShutdownSignal(), options.signal].filter(
    (signal): signal is AbortSignal => signal !== undefined,
  );

  if (!Number.isSafeInteger(timeoutMs) || timeoutMs <= 0) {
    throw new TypeError("timeoutMs must be a positive integer");
  }
  if (!Number.isSafeInteger(killGraceMs) || killGraceMs <= 0) {
    throw new TypeError("killGraceMs must be a positive integer");
  }
  if (!Number.isSafeInteger(stderrMaxBytes) || stderrMaxBytes < 0) {
    throw new TypeError("stderrMaxBytes must be a non-negative integer");
  }

  const alreadyAborted = abortSignals.find((signal) => signal.aborted);
  if (alreadyAborted) {
    throw processError(options.command, "abort", `${options.command} was aborted`, {
      exitCode: null,
      signal: null,
      stderr: "",
      stderrTruncated: false,
      timedOut: false,
      aborted: true,
      cause: alreadyAborted.reason,
    });
  }

  const startedAt = Date.now();

  return new Promise<ProcessResult>((resolve, reject) => {
    let child: ChildProcessByStdio<null, Readable, Readable>;
    try {
      child = spawn(options.command, args, {
        cwd: options.cwd,
        env: options.env ?? process.env,
        detached: process.platform !== "win32",
        windowsHide: true,
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch (cause) {
      reject(
        processError(options.command, "spawn", `Failed to start ${options.command}`, {
          exitCode: null,
          signal: null,
          stderr: "",
          stderrTruncated: false,
          timedOut: false,
          aborted: false,
          cause,
        }),
      );
      return;
    }

    let settled = false;
    let stopReason: "timeout" | "abort" | "output" | null = null;
    let outputCause: unknown;
    let stderrTail: Buffer = Buffer.alloc(0);
    let stderrTruncated = false;
    let forceKillTimer: NodeJS.Timeout | null = null;

    const appendStderr = (chunk: Buffer | string): void => {
      const data = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      if (data.length === 0) return;
      if (stderrMaxBytes === 0) {
        stderrTruncated = true;
        return;
      }
      if (data.length >= stderrMaxBytes) {
        stderrTruncated =
          stderrTruncated || stderrTail.length > 0 || data.length > stderrMaxBytes;
        stderrTail = data.subarray(data.length - stderrMaxBytes);
        return;
      }
      const keepFromExisting = Math.min(stderrTail.length, stderrMaxBytes - data.length);
      if (keepFromExisting < stderrTail.length) stderrTruncated = true;
      stderrTail = Buffer.concat([
        stderrTail.subarray(stderrTail.length - keepFromExisting),
        data,
      ]);
    };

    child.stderr.on("data", appendStderr);

    const stdout = createInterface({ input: child.stdout, crlfDelay: Infinity });
    stdout.on("line", (line) => {
      if (!options.onStdoutLine || stopReason) return;
      try {
        options.onStdoutLine(line);
      } catch (cause) {
        outputCause = cause;
        requestStop("output");
      }
    });

    const sendSignal = (signal: NodeJS.Signals): void => {
      if (process.platform !== "win32" && child.pid !== undefined) {
        try {
          process.kill(-child.pid, signal);
          return;
        } catch {
          // Fall back to signaling only the direct child.
        }
      }
      if (child.exitCode !== null || child.signalCode !== null) return;
      try {
        child.kill(signal);
      } catch {
        // The process may have exited between the state check and kill call.
      }
    };

    function requestStop(reason: "timeout" | "abort" | "output"): void {
      if (stopReason) return;
      stopReason = reason;
      sendSignal("SIGTERM");
      forceKillTimer = setTimeout(() => sendSignal("SIGKILL"), killGraceMs);
      forceKillTimer.unref();
    }

    const timeoutTimer = setTimeout(() => requestStop("timeout"), timeoutMs);
    timeoutTimer.unref();

    const onAbort = (): void => requestStop("abort");
    abortSignals.forEach((signal) => signal.addEventListener("abort", onAbort, { once: true }));
    if (abortSignals.some((signal) => signal.aborted)) requestStop("abort");

    const cleanup = (): void => {
      clearTimeout(timeoutTimer);
      if (forceKillTimer) clearTimeout(forceKillTimer);
      abortSignals.forEach((signal) => signal.removeEventListener("abort", onAbort));
      stdout.close();
    };

    child.once("error", (cause) => {
      if (settled) return;
      settled = true;
      cleanup();
      const stderr = stderrTail.toString("utf-8");
      reject(
        processError(options.command, "spawn", `Failed to run ${options.command}`, {
          exitCode: child.exitCode,
          signal: child.signalCode,
          stderr,
          stderrTruncated,
          timedOut: false,
          aborted: false,
          cause,
        }),
      );
    });

    child.once("close", (exitCode, signal) => {
      if (settled) return;
      settled = true;
      // The direct child may exit before descendants that ignored SIGTERM.
      // A final group SIGKILL prevents those descendants from surviving.
      if (stopReason) sendSignal("SIGKILL");
      cleanup();

      const stderr = stderrTail.toString("utf-8");
      const common = {
        exitCode,
        signal,
        stderr,
        stderrTruncated,
        timedOut: stopReason === "timeout",
        aborted: stopReason === "abort",
      };

      if (stopReason === "timeout") {
        reject(
          processError(
            options.command,
            "timeout",
            `${options.command} timed out after ${timeoutMs}ms`,
            common,
          ),
        );
        return;
      }
      if (stopReason === "abort") {
        reject(
          processError(options.command, "abort", `${options.command} was aborted`, {
            ...common,
            cause: abortSignals.find((abortSignal) => abortSignal.aborted)?.reason,
          }),
        );
        return;
      }
      if (stopReason === "output") {
        reject(
          processError(
            options.command,
            "output",
            `${options.command} stdout handler failed`,
            { ...common, cause: outputCause },
          ),
        );
        return;
      }
      if (signal) {
        reject(
          processError(
            options.command,
            "signal",
            `${options.command} was terminated by ${signal}`,
            common,
          ),
        );
        return;
      }
      if (exitCode === null || !allowedExitCodes.has(exitCode)) {
        reject(
          processError(
            options.command,
            "exit",
            `${options.command} exited with code ${exitCode ?? "unknown"}`,
            common,
          ),
        );
        return;
      }

      resolve({
        exitCode,
        signal: null,
        stderr,
        stderrTruncated,
        durationMs: Date.now() - startedAt,
      });
    });
  });
}
