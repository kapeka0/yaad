import { getToolTimeoutMs, runProcess } from "@yaad/subprocess";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

/** Analyze the exact content-addressed body instead of re-downloading a URL. */
export async function runLinkfinder(body: Buffer): Promise<string[]> {
  const endpoints: string[] = [];
  const temporaryDirectory = await mkdtemp(join(tmpdir(), "yaad-linkfinder-"));
  const inputPath = join(temporaryDirectory, "input.js");

  try {
    await writeFile(inputPath, body, { flag: "wx" });
    await runProcess({
      command: "python3",
      args: ["/opt/linkfinder/linkfinder.py", "-i", inputPath, "-o", "cli"],
      timeoutMs: getToolTimeoutMs("LINKFINDER_TIMEOUT_MS", 300_000),
      onStdoutLine: (line) => {
        const trimmed = line.trim();
        if (trimmed) endpoints.push(trimmed);
      },
    });
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }

  return endpoints;
}
