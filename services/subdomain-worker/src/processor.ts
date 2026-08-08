import { Queue } from "bullmq";
import { and, eq, sql } from "drizzle-orm";
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

interface EnumerationScope {
  asset: string;
  wildcard: boolean;
  inScope: boolean;
}

export interface EnumerationDependencies {
  loadScope: (db: Db, scopeId: number) => Promise<EnumerationScope | null>;
  runSubfinder: typeof runSubfinder;
  getCrtSh: typeof getCrtSh;
  runGau: typeof runGau;
  resolveHosts: typeof resolveHosts;
  getSubdomainsFromPDCP: typeof getSubdomainsFromPDCP;
}

const HOSTNAME_PATTERN =
  /^([a-z0-9_][a-z0-9_-]{0,62})(\.[a-z0-9_][a-z0-9_-]{0,62})*\.?$/i;
const WILDCARD_HOSTNAME_PATTERN =
  /^\*\.([a-z0-9_][a-z0-9_-]{0,62})(\.[a-z0-9_][a-z0-9_-]{0,62})*\.?$/i;

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
  return HOSTNAME_PATTERN.test(host) ? host : null;
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

function activeWildcardRoot(scope: EnumerationScope | null): string | null {
  if (!scope?.inScope || !scope.wildcard) return null;

  const asset = scope.asset.trim().toLowerCase();
  if (!WILDCARD_HOSTNAME_PATTERN.test(asset)) return null;
  return normalizeHost(asset.slice(2));
}

async function loadScope(db: Db, scopeId: number): Promise<EnumerationScope | null> {
  const [scope] = await db
    .select({
      asset: scopes.asset,
      wildcard: scopes.wildcard,
      inScope: scopes.inScope,
    })
    .from(scopes)
    .where(eq(scopes.id, scopeId))
    .limit(1);
  return scope ?? null;
}

const DEFAULT_DEPENDENCIES: EnumerationDependencies = {
  loadScope,
  runSubfinder,
  getCrtSh,
  runGau,
  resolveHosts,
  getSubdomainsFromPDCP,
};

function logSkippedJob(reason: string, job: EnumerateSubdomainsJob): void {
  console.warn(
    JSON.stringify({
      level: "warn",
      msg: "Skipping stale or invalid enumeration job",
      reason,
      domain: job.domain,
      scopeId: job.scopeId,
      depth: job.depth ?? 0,
    })
  );
}

export async function processEnumerateSubdomains(
  job: { data: EnumerateSubdomainsJob },
  db: Db,
  scanQueue: Queue<ScanHttpJob>,
  opts: EnumOptions,
  deps: EnumerationDependencies = DEFAULT_DEPENDENCIES
): Promise<void> {
  const { domain, scopeId } = job.data;
  const depth = job.data.depth ?? 0;

  if (scopeId === null || !Number.isSafeInteger(scopeId) || scopeId <= 0) {
    logSkippedJob("missing or invalid scopeId", job.data);
    return;
  }

  const scope = await deps.loadScope(db, scopeId);
  const scopeRoot = activeWildcardRoot(scope);
  if (!scopeRoot) {
    logSkippedJob("scope does not exist or is not an active valid wildcard", job.data);
    return;
  }

  const rootDomain = normalizeHost(domain);
  if (!rootDomain || !isWithinDomain(rootDomain, scopeRoot)) {
    logSkippedJob("domain is invalid or outside its scope", job.data);
    return;
  }

  console.log(JSON.stringify({ level: "info", msg: `Enumerating subdomains for ${rootDomain}` }));

  // Fan out to every source, tracking provenance (first source to report a host wins).
  const sourceOf = new Map<string, string>();
  const record = (host: string | null, source: string) => {
    if (host && isWithinDomain(host, rootDomain) && !sourceOf.has(host)) {
      sourceOf.set(host, source);
    }
  };

  const tasks: Array<Promise<void>> = [
    deps.runSubfinder(rootDomain, opts.subfinderDeep).then((hs) =>
      hs.forEach((h) => record(normalizeHost(h), "subfinder"))
    ),
  ];
  if (opts.crtShEnabled) {
    tasks.push(
      deps.getCrtSh(rootDomain).then((hs) =>
        hs.forEach((h) => record(normalizeHost(h), "crtsh"))
      )
    );
  }
  if (opts.gauEnabled) {
    tasks.push(
      deps.runGau(rootDomain).then((hs) =>
        hs.forEach((h) => record(normalizeHost(h), "gau"))
      )
    );
  }
  if (opts.pdcpApiKey) {
    tasks.push(
      deps.getSubdomainsFromPDCP(rootDomain, opts.pdcpApiKey).then((hs) =>
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
      `Primary enumeration failed for ${rootDomain}: ${sourceFailures
        .map((result) => String((result as PromiseRejectedResult).reason))
        .join("; ")}`
    );
  }
  if (sourceFailures.length > 0) {
    console.warn(
      JSON.stringify({
        level: "warn",
        msg: `Some enumeration sources failed for ${rootDomain}`,
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
    JSON.stringify({ level: "info", msg: `Found ${allHosts.length} candidate hosts for ${rootDomain}` })
  );

  // Resolve to drop dead subdomains and capture IPs.
  const resolutions = await deps.resolveHosts(allHosts);
  const ipOf = new Map(resolutions.map((r) => [r.host, r.ip]));

  console.log(
    JSON.stringify({ level: "info", msg: `${resolutions.length}/${allHosts.length} resolved for ${rootDomain}` })
  );

  // Enumeration can take minutes. Re-check the scope immediately before any
  // DB/queue fanout so a scope disabled while tools were running stays clean.
  const currentScopeRoot = activeWildcardRoot(await deps.loadScope(db, scopeId));
  if (currentScopeRoot !== scopeRoot || !isWithinDomain(rootDomain, currentScopeRoot)) {
    logSkippedJob("scope became inactive or changed during enumeration", job.data);
    return;
  }

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

  await db
    .update(scopes)
    .set({ lastEnumeratedAt: new Date() })
    .where(
      and(
        eq(scopes.id, scopeId),
        eq(scopes.inScope, true),
        eq(scopes.wildcard, true)
      )
    );
}
