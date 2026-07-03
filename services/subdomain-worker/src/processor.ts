import { Queue } from "bullmq";
import { sql } from "drizzle-orm";
import type { Db } from "@yaad/db";
import { assets } from "@yaad/db";
import { DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import type { ScanHttpJob, EnumerateSubdomainsJob } from "@yaad/queue";
import { runSubfinder, getCrtSh, runGau, resolveHosts } from "./runner.js";
import { getSubdomainsFromPDCP } from "./pdcp.js";

export interface EnumOptions {
  pdcpApiKey?: string;
  crtShEnabled: boolean;
  gauEnabled: boolean;
}

function normalizeHost(raw: string): string | null {
  let host = raw.trim().toLowerCase();
  try {
    if (host.startsWith("http://") || host.startsWith("https://")) {
      host = new URL(host).hostname;
    }
  } catch {
    /* ignore */
  }
  return host || null;
}

export async function processEnumerateSubdomains(
  job: { data: EnumerateSubdomainsJob },
  db: Db,
  scanQueue: Queue<ScanHttpJob>,
  opts: EnumOptions
): Promise<void> {
  const { domain, scopeId } = job.data;
  const depth = job.data.depth ?? 0;

  console.log(JSON.stringify({ level: "info", msg: `Enumerating subdomains for ${domain}` }));

  // Fan out to every source, tracking provenance (first source to report a host wins).
  const sourceOf = new Map<string, string>();
  const record = (host: string | null, source: string) => {
    if (host && !sourceOf.has(host)) sourceOf.set(host, source);
  };

  const tasks: Array<Promise<void>> = [
    runSubfinder(domain).then((hs) => hs.forEach((h) => record(normalizeHost(h), "subfinder"))),
  ];
  if (opts.crtShEnabled) {
    tasks.push(getCrtSh(domain).then((hs) => hs.forEach((h) => record(normalizeHost(h), "crtsh"))));
  }
  if (opts.gauEnabled) {
    tasks.push(runGau(domain).then((hs) => hs.forEach((h) => record(normalizeHost(h), "gau"))));
  }
  if (opts.pdcpApiKey) {
    tasks.push(
      getSubdomainsFromPDCP(domain, opts.pdcpApiKey).then((hs) =>
        hs.forEach((h) => record(normalizeHost(h), "pdcp"))
      )
    );
  }

  await Promise.allSettled(tasks);

  // Always include the root domain itself.
  record(normalizeHost(domain), "scope");

  const allHosts = [...sourceOf.keys()];
  console.log(
    JSON.stringify({ level: "info", msg: `Found ${allHosts.length} candidate hosts for ${domain}` })
  );

  // Resolve to drop dead subdomains and capture IPs.
  const resolutions = await resolveHosts(allHosts);
  const ipOf = new Map(resolutions.map((r) => [r.host, r.ip]));

  console.log(
    JSON.stringify({ level: "info", msg: `${resolutions.length}/${allHosts.length} resolved for ${domain}` })
  );

  for (const host of allHosts) {
    const resolved = ipOf.has(host);
    try {
      // Upsert: new hosts are inserted, already-known hosts get their
      // liveness refreshed (last_seen / ip / resolved). `(xmax = 0)` is true
      // only for the freshly inserted row, letting us scan new hosts
      // immediately while the scheduler handles periodic re-scans of the rest.
      const [row] = await db
        .insert(assets)
        .values({
          scopeId,
          domain: host,
          source: sourceOf.get(host) ?? "subfinder",
          ip: ipOf.get(host) ?? null,
          resolved,
          depth,
        })
        .onConflictDoUpdate({
          target: assets.domain,
          set: {
            ip: ipOf.get(host) ?? null,
            resolved,
            lastSeen: new Date(),
          },
        })
        .returning({ id: assets.id, isNew: sql<boolean>`(xmax = 0)` });

      // Only scan newly discovered hosts that actually resolve; dead names
      // just get recorded. Known hosts are re-scanned by the scheduler.
      if (row?.isNew && resolved) {
        await scanQueue.add(
          "scan_http",
          { domain: host, assetId: row.id },
          DEFAULT_JOB_OPTIONS
        );
      }
    } catch (err) {
      console.error(
        JSON.stringify({ level: "warn", msg: `Failed to upsert asset ${host}`, error: String(err) })
      );
    }
  }
}
