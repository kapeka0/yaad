import { spawn } from "child_process";
import { createInterface } from "readline";

export async function runGetJS(url: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const jsUrls: string[] = [];

    const proc = spawn("getJS", ["--url", url, "--complete"], {
      stdio: ["ignore", "pipe", "pipe"],
    });

    const rl = createInterface({ input: proc.stdout });

    rl.on("line", (line) => {
      const trimmed = line.trim();
      if (trimmed && (trimmed.startsWith("http://") || trimmed.startsWith("https://"))) {
        jsUrls.push(trimmed);
      }
    });

    proc.on("close", () => resolve(jsUrls));
    proc.on("error", (err) => reject(new Error(`getJS error: ${err.message}`)));
  });
}
