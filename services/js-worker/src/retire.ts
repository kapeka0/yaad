import { spawn } from "child_process";
import { tmpdir } from "os";
import { join } from "path";
import { mkdtemp, writeFile, rm, readFile } from "fs/promises";
import { randomUUID } from "crypto";

export interface DetectedLibrary {
  name: string;
  version: string;
  vulnerabilities: string[];
  severity?: string;
}

// Shape of retire.js JSON output (v4/v5).
interface RetireResult {
  component?: string;
  version?: string;
  vulnerabilities?: Array<{
    severity?: string;
    identifiers?: { CVE?: string[]; summary?: string; issue?: string };
    info?: string[];
  }>;
}
interface RetireFile {
  results?: RetireResult[];
}
interface RetireOutput {
  data?: RetireFile[];
}

const SEVERITY_RANK: Record<string, number> = { low: 1, medium: 2, high: 3, critical: 4 };

/**
 * Run retire.js against a single JS body and return detected libraries with
 * any known vulnerabilities for that exact version.
 */
export async function runRetire(body: Buffer): Promise<DetectedLibrary[]> {
  const dir = await mkdtemp(join(tmpdir(), "retire-"));
  const jsFile = join(dir, `${randomUUID()}.js`);
  const outFile = join(dir, "out.json");

  try {
    await writeFile(jsFile, body);

    await new Promise<void>((resolve) => {
      const proc = spawn(
        "retire",
        ["--path", dir, "--outputformat", "json", "--outputpath", outFile],
        { stdio: ["ignore", "ignore", "ignore"] }
      );
      // retire exits non-zero when it finds vulnerabilities — that's expected.
      proc.on("close", () => resolve());
      proc.on("error", () => resolve());
    });

    const raw = await readFile(outFile, "utf-8").catch(() => "");
    if (!raw) return [];

    const parsed = JSON.parse(raw) as RetireOutput;
    const libs = new Map<string, DetectedLibrary>();

    for (const file of parsed.data ?? []) {
      for (const result of file.results ?? []) {
        if (!result.component) continue;
        const version = result.version ?? "";
        const key = `${result.component}@${version}`;
        const cves: string[] = [];
        let severity: string | undefined;
        for (const v of result.vulnerabilities ?? []) {
          if (v.identifiers?.CVE) cves.push(...v.identifiers.CVE);
          else if (v.identifiers?.summary) cves.push(v.identifiers.summary);
          if (v.severity && (!severity || SEVERITY_RANK[v.severity] > (SEVERITY_RANK[severity] ?? 0))) {
            severity = v.severity;
          }
        }
        const existing = libs.get(key);
        if (existing) {
          existing.vulnerabilities.push(...cves);
        } else {
          libs.set(key, {
            name: result.component,
            version,
            vulnerabilities: [...new Set(cves)],
            severity,
          });
        }
      }
    }

    return [...libs.values()];
  } catch {
    return [];
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}
