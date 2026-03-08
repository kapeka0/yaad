import { spawn } from "child_process";
import { tmpdir } from "os";
import { join } from "path";
import { readFile, unlink } from "fs/promises";
import { randomUUID } from "crypto";

export async function runSubfinder(domain: string): Promise<string[]> {
  const outputFile = join(tmpdir(), `subfinder-${randomUUID()}.txt`);

  return new Promise((resolve, reject) => {
    const proc = spawn("subfinder", ["-d", domain, "-o", outputFile, "-silent"], {
      stdio: ["ignore", "pipe", "pipe"],
    });

    proc.on("close", async (code) => {
      try {
        const content = await readFile(outputFile, "utf-8");
        await unlink(outputFile).catch(() => {});
        const subdomains = content
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
        resolve(subdomains);
      } catch {
        resolve([]);
      }
    });

    proc.on("error", (err) => {
      reject(new Error(`subfinder error: ${err.message}`));
    });
  });
}
