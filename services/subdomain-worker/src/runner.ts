import { spawn } from "child_process";
import { tmpdir } from "os";
import { join } from "path";
import { readFile, unlink, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import { createInterface } from "readline";

function isHostname(value: string): boolean {
  return /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/i.test(
    value
  );
}

/**
 * Subdomain enumeration via subfinder. `deep` adds `-all -recursive` (more
 * sources + recursion, heavier); disable it on low-power hosts.
 */
export async function runSubfinder(domain: string, deep = true): Promise<string[]> {
  const outputFile = join(tmpdir(), `subfinder-${randomUUID()}.txt`);
  const args = ["-d", domain, "-o", outputFile, "-silent"];
  if (deep) args.push("-all", "-recursive");

  return new Promise((resolve) => {
    const proc = spawn("subfinder", args, { stdio: ["ignore", "pipe", "pipe"] });

    proc.on("close", async () => {
      try {
        const content = await readFile(outputFile, "utf-8");
        await unlink(outputFile).catch(() => {});
        resolve(
          content
            .split("\n")
            .map((s) => s.trim().toLowerCase())
            .filter(Boolean)
        );
      } catch {
        resolve([]);
      }
    });

    proc.on("error", () => resolve([]));
  });
}

/** Certificate transparency logs via crt.sh (free, no API key). */
export async function getCrtSh(domain: string): Promise<string[]> {
  try {
    const res = await fetch(
      `https://crt.sh/?q=${encodeURIComponent("%." + domain)}&output=json`,
      { signal: AbortSignal.timeout(30_000) }
    );
    if (!res.ok) return [];
    const rows = (await res.json()) as Array<{ name_value?: string }>;
    const out = new Set<string>();
    for (const row of rows) {
      if (!row.name_value) continue;
      for (const raw of row.name_value.split("\n")) {
        const name = raw.trim().toLowerCase().replace(/^\*\./, "");
        if (name.endsWith(domain) && isHostname(name)) out.add(name);
      }
    }
    return [...out];
  } catch {
    return [];
  }
}

/** Historical URLs via gau; we keep only in-scope hostnames. */
export async function runGau(domain: string): Promise<string[]> {
  return new Promise((resolve) => {
    const hosts = new Set<string>();
    const proc = spawn("gau", ["--subs", "--threads", "5", domain], {
      stdio: ["ignore", "pipe", "ignore"],
    });
    const rl = createInterface({ input: proc.stdout });
    rl.on("line", (line) => {
      try {
        const host = new URL(line.trim()).hostname.toLowerCase();
        if (host.endsWith(domain) && isHostname(host)) hosts.add(host);
      } catch {
        /* not a URL */
      }
    });
    proc.on("close", () => resolve([...hosts]));
    proc.on("error", () => resolve([]));
  });
}

export interface Resolution {
  host: string;
  ip: string | null;
}

/**
 * Resolve a set of hosts with dnsx. Returns only entries that resolve (A record),
 * which filters out dead/NXDOMAIN subdomains before we scan them.
 */
export async function resolveHosts(hosts: string[]): Promise<Resolution[]> {
  if (hosts.length === 0) return [];
  const inputFile = join(tmpdir(), `dnsx-${randomUUID()}.txt`);
  await writeFile(inputFile, hosts.join("\n"), "utf-8");

  return new Promise((resolve) => {
    const results: Resolution[] = [];
    const proc = spawn(
      "dnsx",
      ["-l", inputFile, "-a", "-resp", "-json", "-silent"],
      { stdio: ["ignore", "pipe", "ignore"] }
    );
    const rl = createInterface({ input: proc.stdout });
    rl.on("line", (line) => {
      if (!line.trim()) return;
      try {
        const parsed = JSON.parse(line) as { host?: string; a?: string[] };
        if (parsed.host) {
          results.push({ host: parsed.host.toLowerCase(), ip: parsed.a?.[0] ?? null });
        }
      } catch {
        /* skip */
      }
    });
    proc.on("close", async () => {
      await unlink(inputFile).catch(() => {});
      resolve(results);
    });
    proc.on("error", async () => {
      await unlink(inputFile).catch(() => {});
      resolve([]);
    });
  });
}
