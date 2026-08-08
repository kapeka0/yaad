import { Queue } from "bullmq";
import { and, eq, inArray, isNull, sql } from "drizzle-orm";
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
export const ENDPOINT_INSERT_BATCH_SIZE = 250;

interface ParentScopeContext {
  scopeId: number;
  rootDomain: string;
  nextDepth: number;
}

interface AnalysisInput {
  jsUrl: string;
  fetchedAt: Date | null;
  endpointAnalyzedAt: Date | null;
  endpointAnalysisStartedAt: Date | null;
  parentScope: ParentScopeContext | null;
}

export interface EndpointCandidate {
  endpoint: string;
  hostname: string | null;
}

export interface EndpointAnalysisOperations {
  findEndpoints: (jsUrl: string) => Promise<string[]>;
  persistEndpoints: (jsId: number, candidates: EndpointCandidate[]) => Promise<void>;
  loadPersistedEndpoints: (jsId: number) => Promise<string[]>;
  fanOut: (jsId: number, candidates: EndpointCandidate[]) => Promise<void>;
  markComplete: (jsId: number) => Promise<void>;
}

export interface EndpointFanoutLimits {
  maxScanQueueDepth: number;
  maxTechQueueDepth: number;
}

const UNBOUNDED_FANOUT: EndpointFanoutLimits = {
  maxScanQueueDepth: Number.MAX_SAFE_INTEGER,
  maxTechQueueDepth: Number.MAX_SAFE_INTEGER,
};

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
      endpointAnalysisStartedAt: javascriptFiles.endpointAnalysisStartedAt,
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
    endpointAnalysisStartedAt: row.endpointAnalysisStartedAt,
    parentScope,
  };
}

async function markEndpointAnalysisStarted(db: Db, jsId: number): Promise<void> {
  await db
    .update(javascriptFiles)
    .set({ endpointAnalysisStartedAt: new Date() })
    .where(
      and(
        eq(javascriptFiles.id, jsId),
        isNull(javascriptFiles.endpointAnalysisStartedAt)
      )
    );
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
  await persistEndpointBatches(jsId, candidates, async (batch) => {
    await db
      .insert(endpoints)
      .values(batch)
      .onConflictDoNothing();
  });
}

/**
 * Persist bounded endpoint output in restart-safe batches. The callback is
 * deliberately exposed so retry behavior can be tested without PostgreSQL.
 */
export async function persistEndpointBatches(
  jsId: number,
  candidates: EndpointCandidate[],
  insertBatch: (rows: Array<{ jsId: number; endpoint: string }>) => Promise<void>
): Promise<void> {
  for (let offset = 0; offset < candidates.length; offset += ENDPOINT_INSERT_BATCH_SIZE) {
    const batch = candidates.slice(offset, offset + ENDPOINT_INSERT_BATCH_SIZE);
    await insertBatch(batch.map(({ endpoint }) => ({ jsId, endpoint })));
  }
}

async function loadPersistedEndpointValues(db: Db, jsId: number): Promise<string[]> {
  const rows = await db
    .select({ endpoint: endpoints.endpoint })
    .from(endpoints)
    .where(eq(endpoints.jsId, jsId))
    .orderBy(endpoints.id)
    .limit(MAX_ENDPOINTS_PER_JS);

  return rows.map((row) => row.endpoint);
}

/**
 * A failed attempt may already have persisted a subset of endpoints. Merge
 * them with the fresh LinkFinder result so retries also recover their fan-out.
 */
export async function runEndpointAnalysisAttempt(
  jsId: number,
  jsUrl: string,
  operations: EndpointAnalysisOperations
): Promise<{ found: number; accepted: number }> {
  const foundEndpoints = await operations.findEndpoints(jsUrl);
  const candidates = sanitizeEndpointCandidates(foundEndpoints);
  const persistedEndpoints = await operations.loadPersistedEndpoints(jsId);
  const recoveryCandidates = sanitizeEndpointCandidates([
    // Persisted rows come first so a changed LinkFinder result cannot crowd
    // partial work from an earlier attempt out of the bounded recovery set.
    ...persistedEndpoints,
    ...candidates.map(({ endpoint }) => endpoint),
  ]);

  // Persist and fan out the exact same bounded union. This keeps the database,
  // queues and checkpoint coherent even when LinkFinder changes between tries.
  await operations.persistEndpoints(jsId, recoveryCandidates);
  await operations.fanOut(jsId, recoveryCandidates);
  await operations.markComplete(jsId);

  return { found: foundEndpoints.length, accepted: candidates.length };
}

export function buildScopedFanOutJobs(
  scanAssets: Array<{ id: number; domain: string }>,
  techAssets: Array<{ id: number; domain: string }>,
  scopedHosts: ReadonlyMap<string, string>
) {
  return {
    scanJobs: scanAssets.map((asset) => ({
      name: "scan_http" as const,
      data: { domain: asset.domain, assetId: asset.id },
      opts: {
        ...DEFAULT_JOB_OPTIONS,
        jobId: `endpoint-scan-${asset.id}`,
      },
    })),
    techJobs: techAssets.map((asset) => ({
      name: "detect_technology" as const,
      data: { url: scopedHosts.get(asset.domain)!, assetId: asset.id },
      opts: {
        ...DEFAULT_JOB_OPTIONS,
        jobId: `endpoint-tech-${asset.id}`,
      },
    })),
  };
}

async function fanOutScopedHosts(
  db: Db,
  jsId: number,
  candidates: EndpointCandidate[],
  context: ParentScopeContext | null,
  scanQueue: Queue<ScanHttpJob>,
  detectTechQueue: Queue<DetectTechnologyJob>,
  limits: EndpointFanoutLimits
): Promise<void> {
  // Unscoped historical assets may still have analyze_js jobs in Redis. Keep
  // their endpoint index, but never let them fan out more global assets.
  if (!context) return;

  const [currentScope] = await db
    .select({ asset: scopes.asset, inScope: scopes.inScope })
    .from(scopes)
    .where(eq(scopes.id, context.scopeId))
    .limit(1);
  if (
    !currentScope?.inScope ||
    normalizeAssetDomain(currentScope.asset) !== context.rootDomain
  ) {
    throw new Error(`Scope ${context.scopeId} became inactive or changed during JS analysis`);
  }

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
      [...scopedHosts].map(([domain, techUrl]) => ({
        scopeId: context.scopeId,
        domain,
        source: "js",
        depth: context.nextDepth,
        endpointFanoutManagedAt: new Date(),
        endpointTechUrl: techUrl,
      }))
    )
    .onConflictDoUpdate({
      target: assets.domain,
      set: {
        scopeId: sql`coalesce(${assets.scopeId}, ${context.scopeId})`,
        endpointFanoutManagedAt: sql`coalesce(
          ${assets.endpointFanoutManagedAt},
          case
            when ${assets.endpointScanEnqueuedAt} is null
              or ${assets.endpointTechEnqueuedAt} is null
            then excluded.endpoint_fanout_managed_at
          end
        )`,
        endpointTechUrl: sql`coalesce(${assets.endpointTechUrl}, excluded.endpoint_tech_url)`,
        lastSeen: new Date(),
      },
    })
    .returning({
      id: assets.id,
      domain: assets.domain,
      scanEnqueuedAt: assets.endpointScanEnqueuedAt,
      techEnqueuedAt: assets.endpointTechEnqueuedAt,
    });

  // The migration checkpoints historical assets. New endpoint-discovered rows
  // remain NULL until their respective queue accepted the job, so retries can
  // resume either side independently without a job per (JS, asset) pair.
  if (discovered.length === 0) return;

  const pendingScan = discovered.filter((asset) => asset.scanEnqueuedAt === null);
  const pendingTech = discovered.filter((asset) => asset.techEnqueuedAt === null);
  const [scanWaiting, scanActive, scanDelayed, techWaiting, techActive, techDelayed] =
    await Promise.all([
      scanQueue.getWaitingCount(),
      scanQueue.getActiveCount(),
      scanQueue.getDelayedCount(),
      detectTechQueue.getWaitingCount(),
      detectTechQueue.getActiveCount(),
      detectTechQueue.getDelayedCount(),
    ]);
  const scanHeadroom = Math.max(
    0,
    limits.maxScanQueueDepth - scanWaiting - scanActive - scanDelayed
  );
  const techHeadroom = Math.max(
    0,
    limits.maxTechQueueDepth - techWaiting - techActive - techDelayed
  );
  const readyScan = pendingScan.slice(0, scanHeadroom);
  const readyTech = pendingTech.slice(0, techHeadroom);
  const { scanJobs, techJobs } = buildScopedFanOutJobs(
    readyScan,
    readyTech,
    scopedHosts
  );

  if (scanJobs.length > 0) {
    await scanQueue.addBulk(scanJobs);
    await db
      .update(assets)
      .set({ endpointScanEnqueuedAt: new Date() })
      .where(inArray(assets.id, readyScan.map((asset) => asset.id)));
  }
  if (techJobs.length > 0) {
    await detectTechQueue.addBulk(techJobs);
    await db
      .update(assets)
      .set({ endpointTechEnqueuedAt: new Date() })
      .where(inArray(assets.id, readyTech.map((asset) => asset.id)));
  }
}

export async function processAnalyzeJs(
  job: { data: AnalyzeJsJob },
  db: Db,
  scanQueue: Queue<ScanHttpJob>,
  detectTechQueue: Queue<DetectTechnologyJob>,
  limits: EndpointFanoutLimits = UNBOUNDED_FANOUT
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
    // Remember that this row has passed through the new worker. If it is later
    // linked to a scope, it must resume the real analysis rather than being
    // mistaken for fully processed legacy data merely because endpoints exist.
    if (!input.endpointAnalysisStartedAt) {
      await markEndpointAnalysisStarted(db, jsId);
    }
    console.log(JSON.stringify({ level: "info", msg: "Skipping unscoped JS analysis", jsId }));
    return;
  }

  if (!input.endpointAnalysisStartedAt) {
    // Mark before the first side effect. Existing endpoint rows are loaded by
    // runEndpointAnalysisAttempt and recovered; their presence is never used
    // as proof that an older attempt completed all fan-out.
    await markEndpointAnalysisStarted(db, jsId);
  }

  console.log(JSON.stringify({ level: "info", msg: `Analyzing JS ${input.jsUrl}` }));

  const result = await runEndpointAnalysisAttempt(jsId, input.jsUrl, {
    findEndpoints: runLinkfinder,
    persistEndpoints: (analysisJsId, candidates) =>
      insertEndpointBatches(db, analysisJsId, candidates),
    loadPersistedEndpoints: (analysisJsId) =>
      loadPersistedEndpointValues(db, analysisJsId),
    fanOut: (analysisJsId, candidates) =>
      fanOutScopedHosts(
        db,
        analysisJsId,
        candidates,
        input.parentScope,
        scanQueue,
        detectTechQueue,
        limits
      ),
    markComplete: (analysisJsId) => markEndpointAnalysisComplete(db, analysisJsId),
  });

  if (result.accepted < result.found) {
    console.log(
      JSON.stringify({
        level: "info",
        msg: "Endpoint output bounded before persistence",
        jsId,
        found: result.found,
        accepted: result.accepted,
      })
    );
  }
}
