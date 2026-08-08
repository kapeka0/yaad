import { getToolTimeoutMs, runProcess } from "@yaad/subprocess";

export async function runLinkfinder(jsUrl: string): Promise<string[]> {
  const endpoints: string[] = [];

  await runProcess({
    command: "python3",
    args: ["/opt/linkfinder/linkfinder.py", "-i", jsUrl, "-o", "cli"],
    timeoutMs: getToolTimeoutMs("LINKFINDER_TIMEOUT_MS", 300_000),
    onStdoutLine: (line) => {
      const trimmed = line.trim();
      if (trimmed) {
        endpoints.push(trimmed);
      }
    },
  });

  return endpoints;
}
