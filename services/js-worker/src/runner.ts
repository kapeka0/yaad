import { getToolTimeoutMs, runProcess } from "@yaad/subprocess";

export async function runGetJS(url: string): Promise<string[]> {
  const jsUrls: string[] = [];

  await runProcess({
    command: "getJS",
    args: ["--url", url, "--complete"],
    timeoutMs: getToolTimeoutMs("GETJS_TIMEOUT_MS", 120_000),
    onStdoutLine: (line) => {
      const trimmed = line.trim();
      if (trimmed && (trimmed.startsWith("http://") || trimmed.startsWith("https://"))) {
        jsUrls.push(trimmed);
      }
    },
  });

  return jsUrls;
}
