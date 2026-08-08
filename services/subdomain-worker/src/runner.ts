import { tmpdir } from "os";
import { join } from "path";
import { readFile, unlink, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import { getToolTimeoutMs, runProcess } from "@yaad/subprocess";

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

  try {
    await runProcess({
      command: "subfinder",
      args,
      timeoutMs: getToolTimeoutMs("SUBFINDER_TIMEOUT_MS", 900_000),
    });

    const content = await readFile(outputFile, "utf-8").catch(() => "");
    return content
      .split("\n")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  } finally {
    await unlink(outputFile).catch(() => {});
  }
}

/** Certificate transparency logs via crt.sh (free, no API key). */
export async function getCrtSh(domain: string): Promise<string[]> {
  const res = await fetch(
    `https://crt.sh/?q=${encodeURIComponent("%." + domain)}&output=json`,
    { signal: AbortSignal.timeout(getToolTimeoutMs("CRTSH_TIMEOUT_MS", 30_000)) }
  );
  if (!res.ok) {
    throw new Error(`crt.sh request failed for ${domain}: ${res.status} ${res.statusText}`);
  }

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
}

/** Historical URLs via gau; we keep only in-scope hostnames. */
export async function runGau(domain: string): Promise<string[]> {
  const hosts = new Set<string>();
  await runProcess({
    command: "gau",
    args: ["--subs", "--threads", "5", domain],
    timeoutMs: getToolTimeoutMs("GAU_TIMEOUT_MS", 600_000),
    onStdoutLine: (line) => {
      try {
        const host = new URL(line.trim()).hostname.toLowerCase();
        if (host.endsWith(domain) && isHostname(host)) hosts.add(host);
      } catch {
        /* not a URL */
      }
    },
  });
  return [...hosts];
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
  const results: Resolution[] = [];

  try {
    await writeFile(inputFile, hosts.join("\n"), "utf-8");
    await runProcess({
      command: "dnsx",
      args: ["-l", inputFile, "-a", "-resp", "-json", "-silent"],
      timeoutMs: getToolTimeoutMs("DNSX_TIMEOUT_MS", 600_000),
      onStdoutLine: (line) => {
        if (!line.trim()) return;
        try {
          const parsed = JSON.parse(line) as { host?: string; a?: string[] };
          if (parsed.host) {
            results.push({ host: parsed.host.toLowerCase(), ip: parsed.a?.[0] ?? null });
          }
        } catch {
          /* skip malformed lines */
        }
      },
    });
    return results;
  } finally {
    await unlink(inputFile).catch(() => {});
  }
}
