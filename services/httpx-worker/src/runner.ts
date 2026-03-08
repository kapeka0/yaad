import { spawn } from "child_process";
import { createInterface } from "readline";

export interface HttpxResult {
  url: string;
  statusCode: number;
  title?: string;
  input: string;
}

export async function runHttpx(domain: string): Promise<HttpxResult[]> {
  return new Promise((resolve, reject) => {
    const results: HttpxResult[] = [];

    const proc = spawn(
      "httpx",
      [
        "-u", domain,
        "-json",
        "-silent",
        "-status-code",
        "-title",
        "-follow-redirects",
      ],
      { stdio: ["ignore", "pipe", "pipe"] }
    );

    const rl = createInterface({ input: proc.stdout });

    rl.on("line", (line) => {
      if (!line.trim()) return;
      try {
        const parsed = JSON.parse(line) as {
          url?: string;
          "status-code"?: number;
          status_code?: number;
          title?: string;
          input?: string;
        };

        if (parsed.url) {
          results.push({
            url: parsed.url,
            statusCode: parsed["status-code"] ?? parsed.status_code ?? 0,
            title: parsed.title,
            input: parsed.input ?? domain,
          });
        }
      } catch {
        // skip malformed lines
      }
    });

    proc.on("close", () => resolve(results));
    proc.on("error", (err) => reject(new Error(`httpx error: ${err.message}`)));
  });
}
