import { Queue } from "bullmq";
import { eq, sql } from "drizzle-orm";
import type { Db } from "@yaad/db";
import { assets, scopes } from "@yaad/db";
import { DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import type { ScanHttpJob, EnumerateSubdomainsJob } from "@yaad/queue";
import { runSubfinder, getCrtSh, runGau, resolveHosts } from "./runner.js";
import { getSubdomainsFromPDCP } from "./pdcp.js";

export interface EnumOptions {
  pdcpApiKey?: string;
  crtShEnabled: boolean;
  gauEnabled: boolean;
  subfinderDeep: boolean;
  maxScanQueueDepth: number;
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
  host = host.replace(/\.$/, "");
  return host || null;
}

function isWithinDomain(host: string, rootDomain: string): boolean {
  return host === rootDomain || host.endsWith(`.${rootDomain}`);
}

function chunks<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

export async function processEnumerateSubdomains(
  job: { data: EnumerateSubdomainsJob },
  db: Db,
  scanQueue: Queue<ScanHttpJob>,
  opts: EnumOptions
): Promise<void> {
  const { domain, scopeId } = job.data;
  const depth = job.data.depth ?? 0;
  const rootDomain = normalizeHost(domain);
  if (!rootDomain) throw new Error(`Invalid enumeration domain: ${domain}`);

  console.log(JSON.stringify({ level: "info", msg: `Enumerating subdomains for ${domain}` }));

  // Fan out to every source, tracking provenance (first source to report a host wins).
  const sourceOf = new Map<string, string>();
  const record = (host: string | null, source: string) => {
    if (host && isWithinDomain(host, rootDomain) && !sourceOf.has(host)) {
      sourceOf.set(host, source);
    }
  };

  const tasks: Array<Promise<void>> = [
    runSubfinder(domain, opts.subfinderDeep).then((hs) =>
      hs.forEach((h) => record(normalizeHost(h), "subfinder"))
    ),
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

  const sourceResults = await Promise.allSettled(tasks);
  const sourceFailures = sourceResults.filter((result) => result.status === "rejected");
  // Subfinder is the primary source and the first task by construction. Do
  // not report a fresh successful enumeration when only an optional source
  // happened to respond.
  if (sourceResults[0]?.status === "rejected") {
    throw new Error(
      `Primary enumeration failed for ${domain}: ${sourceFailures
        .map((result) => String((result as PromiseRejectedResult).reason))
        .join("; ")}`
    );
  }
  if (sourceFailures.length > 0) {
    console.warn(
      JSON.stringify({
        level: "warn",
        msg: `Some enumeration sources failed for ${domain}`,
        failures: sourceFailures.map((result) =>
          String((result as PromiseRejectedResult).reason)
        ),
      })
    );
  }

  // Always include the root domain itself.
  record(rootDomain, "scope");

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

  const [waitingScans, activeScans, delayedScans] = await Promise.all([
    scanQueue.getWaitingCount(),
    scanQueue.getActiveCount(),
    scanQueue.getDelayedCount(),
  ]);
  let scanHeadroom = Math.max(
    0,
    opts.maxScanQueueDepth - waitingScans - activeScans - delayedScans
  );

  for (const hostChunk of chunks(allHosts, 250)) {
    const rows = await db
      .insert(assets)
      .values(
        hostChunk.map((host) => ({
          scopeId,
          domain: host,
          source: sourceOf.get(host) ?? "subfinder",
          ip: ipOf.get(host) ?? null,
          resolved: ipOf.has(host),
          depth,
        }))
      )
      .onConflictDoUpdate({
        target: assets.domain,
        set: {
          // Preserve an existing program association, but adopt legacy assets
          // that were previously discovered without a scope.
          scopeId: sql`coalesce(${assets.scopeId}, excluded.scope_id)`,
          ip: sql`excluded.ip`,
          resolved: sql`excluded.resolved`,
          lastSeen: new Date(),
        },
      })
      .returning({
        id: assets.id,
        domain: assets.domain,
        resolved: assets.resolved,
        isNew: sql<boolean>`(xmax = 0)`,
      });

    const newResolved = rows
      .filter((row) => row.isNew && row.resolved)
      .slice(0, scanHeadroom);
    if (newResolved.length > 0) {
      await scanQueue.addBulk(
        newResolved.map((row) => ({
          name: "scan_http",
          data: { domain: row.domain, assetId: row.id },
          opts: { ...DEFAULT_JOB_OPTIONS, jobId: `discovered-scan-${row.id}` },
        }))
      );
      scanHeadroom -= newResolved.length;
    }
  }

  if (scopeId !== null) {
    await db
      .update(scopes)
      .set({ lastEnumeratedAt: new Date() })
      .where(eq(scopes.id, scopeId));
  }
}
