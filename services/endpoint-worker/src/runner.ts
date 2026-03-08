import { spawn } from "child_process";
import { createInterface } from "readline";

export async function runLinkfinder(jsUrl: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const endpoints: string[] = [];

    const proc = spawn("python3", ["/opt/linkfinder/linkfinder.py", "-i", jsUrl, "-o", "cli"], {
      stdio: ["ignore", "pipe", "pipe"],
    });

    const rl = createInterface({ input: proc.stdout });

    rl.on("line", (line) => {
      const trimmed = line.trim();
      if (trimmed) {
        endpoints.push(trimmed);
      }
    });

    proc.on("close", () => resolve(endpoints));
    proc.on("error", (err) => reject(new Error(`linkfinder error: ${err.message}`)));
  });
}
