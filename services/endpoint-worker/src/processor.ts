import { Queue } from "bullmq";
import { and, eq, isNull, sql } from "drizzle-orm";
import type { Db } from "@yaad/db";
import { assets, endpoints, javascriptFiles, scopes, webServices } from "@yaad/db";
import { DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import type { AnalyzeJsJob, ScanHttpJob, DetectTechnologyJob } from "@yaad/queue";
import { normalizeAssetDomain } from "@yaad/types";
import { runLinkfinder } from "./runner.js";

// Keep every value comfortably below PostgreSQL's btree index tuple limit.
// LinkFinder occasionally emits entire inline payloads as a single endpoint.
export const MAX_ENDPOINT_BYTES = 2_048;
export const MAX_ENDPOINTS_PER_JS = 2_000;
const ENDPOINT_INSERT_BATCH_SIZE = 250;

interface ParentScopeContext {
  scopeId: number;
  rootDomain: string;
  nextDepth: number;
}

interface AnalysisInput {
  jsUrl: string;
  fetchedAt: Date | null;
  endpointAnalyzedAt: Date | null;
  parentScope: ParentScopeContext | null;
}

interface EndpointCandidate {
  endpoint: string;
  hostname: string | null;
}

/**
 * A discovered host belongs to a scope only when it is the scope root or a
 * label-delimited subdomain. A plain endsWith check would incorrectly accept
 * values such as `notexample.com` for the `example.com` scope.
 */
export function isHostnameInScope(hostname: string, rootDomain: string): boolean {
  return hostname === rootDomain || hostname.endsWith(`.${rootDomain}`);
}

export function extractHostname(endpoint: string): string | null {
  try {
    if (!endpoint.startsWith("http://") && !endpoint.startsWith("https://")) return null;
    return normalizeAssetDomain(new URL(endpoint).hostname);
  } catch {
    return null;
  }
}

/** Deduplicate and bound untrusted LinkFinder output before it reaches an index. */
export function sanitizeEndpointCandidates(foundEndpoints: string[]): EndpointCandidate[] {
  const seen = new Set<string>();
  const candidates: EndpointCandidate[] = [];

  for (const rawEndpoint of foundEndpoints) {
    const endpoint = rawEndpoint.trim();
    if (
      !endpoint ||
      endpoint.includes("\0") ||
      Buffer.byteLength(endpoint, "utf8") > MAX_ENDPOINT_BYTES ||
      seen.has(endpoint)
    ) {
      continue;
    }

    seen.add(endpoint);
    candidates.push({ endpoint, hostname: extractHostname(endpoint) });
    if (candidates.length >= MAX_ENDPOINTS_PER_JS) break;
  }

  return candidates;
}

async function loadAnalysisInput(db: Db, jsId: number): Promise<AnalysisInput | null> {
  const [row] = await db
    .select({
      jsUrl: javascriptFiles.url,
      fetchedAt: javascriptFiles.fetchedAt,
      endpointAnalyzedAt: javascriptFiles.endpointAnalyzedAt,
      scopeId: assets.scopeId,
      parentDepth: assets.depth,
      scopeAsset: scopes.asset,
      scopeInScope: scopes.inScope,
    })
    .from(javascriptFiles)
    .innerJoin(webServices, eq(javascriptFiles.serviceId, webServices.id))
    .innerJoin(assets, eq(webServices.assetId, assets.id))
    .leftJoin(scopes, eq(assets.scopeId, scopes.id))
    .where(eq(javascriptFiles.id, jsId))
    .limit(1);

  if (!row) return null;

  let parentScope: ParentScopeContext | null = null;
  if (row.scopeId != null && row.scopeAsset && row.scopeInScope === true) {
    const rootDomain = normalizeAssetDomain(row.scopeAsset);
    if (rootDomain) {
      parentScope = {
        scopeId: row.scopeId,
        rootDomain,
        nextDepth: (row.parentDepth ?? 0) + 1,
      };
    }
  }

  return {
    jsUrl: row.jsUrl,
    fetchedAt: row.fetchedAt,
    endpointAnalyzedAt: row.endpointAnalyzedAt,
    parentScope,
  };
}

async function markEndpointAnalysisComplete(db: Db, jsId: number): Promise<void> {
  await db
    .update(javascriptFiles)
    .set({ endpointAnalyzedAt: new Date() })
    .where(and(eq(javascriptFiles.id, jsId), isNull(javascriptFiles.endpointAnalyzedAt)));
}

async function insertEndpointBatches(
  db: Db,
  jsId: number,
  candidates: EndpointCandidate[]
): Promise<void> {
  for (let offset = 0; offset < candidates.length; offset += ENDPOINT_INSERT_BATCH_SIZE) {
    const batch = candidates.slice(offset, offset + ENDPOINT_INSERT_BATCH_SIZE);
    await db
      .insert(endpoints)
      .values(batch.map(({ endpoint }) => ({ jsId, endpoint })))
      .onConflictDoNothing();
  }
}

async function fanOutScopedHosts(
  db: Db,
  jsId: number,
  candidates: EndpointCandidate[],
  context: ParentScopeContext | null,
  scanQueue: Queue<ScanHttpJob>,
  detectTechQueue: Queue<DetectTechnologyJob>
): Promise<void> {
  // Unscoped historical assets may still have analyze_js jobs in Redis. Keep
  // their endpoint index, but never let them fan out more global assets.
  if (!context) return;

  const scopedHosts = new Map<string, string>();
  for (const candidate of candidates) {
    if (
      candidate.hostname &&
      isHostnameInScope(candidate.hostname, context.rootDomain) &&
      !scopedHosts.has(candidate.hostname)
    ) {
      scopedHosts.set(candidate.hostname, candidate.endpoint);
    }
  }

  if (scopedHosts.size === 0) return;

  const discovered = await db
    .insert(assets)
    .values(
      [...scopedHosts.keys()].map((domain) => ({
        scopeId: context.scopeId,
        domain,
        source: "js",
        depth: context.nextDepth,
      }))
    )
    .onConflictDoUpdate({
      target: assets.domain,
      set: {
        scopeId: sql`coalesce(${assets.scopeId}, ${context.scopeId})`,
        lastSeen: new Date(),
      },
    })
    .returning({
      id: assets.id,
      domain: assets.domain,
      isNew: sql<boolean>`(xmax = 0)`,
    });

  const newAssets = discovered.filter((asset) => asset.isNew);
  if (newAssets.length === 0) return;

  await scanQueue.addBulk(
    newAssets.map((asset) => ({
      name: "scan_http",
      data: { domain: asset.domain, assetId: asset.id },
      opts: {
        ...DEFAULT_JOB_OPTIONS,
        jobId: `endpoint-${jsId}-scan-${asset.id}`,
      },
    }))
  );

  await detectTechQueue.addBulk(
    newAssets.map((asset) => ({
      name: "detect_technology",
      data: { url: scopedHosts.get(asset.domain)!, assetId: asset.id },
      opts: {
        ...DEFAULT_JOB_OPTIONS,
        jobId: `endpoint-${jsId}-tech-${asset.id}`,
      },
    }))
  );
}

export async function processAnalyzeJs(
  job: { data: AnalyzeJsJob },
  db: Db,
  scanQueue: Queue<ScanHttpJob>,
  detectTechQueue: Queue<DetectTechnologyJob>
): Promise<void> {
  const { jsId } = job.data;

  const input = await loadAnalysisInput(db, jsId);
  if (!input || input.endpointAnalyzedAt) return;

  // Legacy jobs were enqueued before JS download. Drain them without invoking
  // LinkFinder; js-worker will retry and enqueue again after persistence.
  if (!input.fetchedAt) {
    console.log(JSON.stringify({ level: "info", msg: "Skipping incomplete JS analysis", jsId }));
    return;
  }

  // Historical queues contain third-party assets discovered before scope
  // propagation was enforced. Drain them without network or database fan-out;
  // if an operator later links the asset, its NULL checkpoint remains healable.
  if (!input.parentScope) {
    console.log(JSON.stringify({ level: "info", msg: "Skipping unscoped JS analysis", jsId }));
    return;
  }

  // Lazily checkpoint historical rows that already produced endpoints before
  // endpoint_analyzed_at existed, avoiding a mass re-analysis migration.
  const [existingEndpoint] = await db
    .select({ jsId: endpoints.jsId })
    .from(endpoints)
    .where(eq(endpoints.jsId, jsId))
    .limit(1);
  if (existingEndpoint) {
    await markEndpointAnalysisComplete(db, jsId);
    return;
  }

  console.log(JSON.stringify({ level: "info", msg: `Analyzing JS ${input.jsUrl}` }));

  const foundEndpoints = await runLinkfinder(input.jsUrl);
  const candidates = sanitizeEndpointCandidates(foundEndpoints);

  if (candidates.length < foundEndpoints.length) {
    console.log(
      JSON.stringify({
        level: "info",
        msg: "Endpoint output bounded before persistence",
        jsId,
        found: foundEndpoints.length,
        accepted: candidates.length,
      })
    );
  }

  await insertEndpointBatches(db, jsId, candidates);
  await fanOutScopedHosts(
    db,
    jsId,
    candidates,
    input.parentScope,
    scanQueue,
    detectTechQueue
  );
  await markEndpointAnalysisComplete(db, jsId);
}
