import assert from "node:assert/strict";
import test from "node:test";
import { ProcessExecutionError, runProcess } from "./runner.js";

test("drains stdout and keeps bounded stderr diagnostics", async () => {
  const lines: string[] = [];
  const result = await runProcess({
    command: process.execPath,
    args: [
      "-e",
      "console.log('one'); console.log('two'); process.stderr.write('abcdefghijklmnop')",
    ],
    timeoutMs: 2_000,
    stderrMaxBytes: 8,
    onStdoutLine: (line) => lines.push(line),
  });

  assert.deepEqual(lines, ["one", "two"]);
  assert.equal(result.stderr, "ijklmnop");
  assert.equal(result.stderrTruncated, true);
});

test("allows explicitly accepted non-zero exit codes", async () => {
  const result = await runProcess({
    command: process.execPath,
    args: ["-e", "process.exit(13)"],
    allowedExitCodes: [0, 13],
    timeoutMs: 2_000,
  });

  assert.equal(result.exitCode, 13);
});

test("rejects non-zero exits with a retryable bounded error", async () => {
  await assert.rejects(
    runProcess({
      command: process.execPath,
      args: ["-e", "process.stderr.write('broken'); process.exit(7)"],
      timeoutMs: 2_000,
    }),
    (error: unknown) => {
      assert.ok(error instanceof ProcessExecutionError);
      assert.equal(error.reason, "exit");
      assert.equal(error.exitCode, 7);
      assert.equal(error.stderr, "broken");
      assert.equal(error.retryable, true);
      return true;
    },
  );
});

test("terminates the child when stdout processing fails", async () => {
  await assert.rejects(
    runProcess({
      command: process.execPath,
      args: ["-e", "console.log('bad line'); setInterval(() => {}, 1000)"],
      timeoutMs: 2_000,
      killGraceMs: 100,
      onStdoutLine: () => {
        throw new Error("parser failed");
      },
    }),
    (error: unknown) => {
      assert.ok(error instanceof ProcessExecutionError);
      assert.equal(error.reason, "output");
      assert.equal(error.retryable, true);
      return true;
    },
  );
});

test("terminates a process that exceeds its deadline", async () => {
  const startedAt = Date.now();
  await assert.rejects(
    runProcess({
      command: process.execPath,
      args: ["-e", "setInterval(() => {}, 1000)"],
      timeoutMs: 100,
      killGraceMs: 100,
    }),
    (error: unknown) => {
      assert.ok(error instanceof ProcessExecutionError);
      assert.equal(error.reason, "timeout");
      assert.equal(error.timedOut, true);
      return true;
    },
  );
  assert.ok(Date.now() - startedAt < 2_000);
});

test("terminates and cleans up when aborted", async () => {
  const controller = new AbortController();
  const pending = runProcess({
    command: process.execPath,
    args: ["-e", "setInterval(() => {}, 1000)"],
    timeoutMs: 2_000,
    killGraceMs: 100,
    signal: controller.signal,
  });
  setTimeout(() => controller.abort(new Error("cancelled")), 100);

  await assert.rejects(pending, (error: unknown) => {
    assert.ok(error instanceof ProcessExecutionError);
    assert.equal(error.reason, "abort");
    assert.equal(error.aborted, true);
    return true;
  });
});

test("does not spawn when the signal is already aborted", async () => {
  const controller = new AbortController();
  controller.abort(new Error("already cancelled"));

  await assert.rejects(
    runProcess({
      command: "this-command-must-not-be-started",
      signal: controller.signal,
    }),
    (error: unknown) => {
      assert.ok(error instanceof ProcessExecutionError);
      assert.equal(error.reason, "abort");
      return true;
    },
  );
});
