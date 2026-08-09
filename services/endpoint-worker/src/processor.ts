import { Queue } from "bullmq";
import { and, eq, inArray, isNull, lt, or, sql } from "drizzle-orm";
import type { Db } from "@yaad/db";
import {
  assets,
  blobEndpoints,
  javascriptFiles,
  jsBlobs,
  scopes,
  webServices,
} from "@yaad/db";
import { DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import type { AnalyzeJsJob, ScanHttpJob, DetectTechnologyJob } from "@yaad/queue";
import { BlobStore, type Compression } from "@yaad/storage";
import { normalizeAssetDomain } from "@yaad/types";
import { runLinkfinder } from "./runner.js";

// Keep every value comfortably below PostgreSQL's btree index tuple limit.
// LinkFinder occasionally emits entire inline payloads as a single endpoint.
export const MAX_ENDPOINT_BYTES = 2_048;
export const MAX_ENDPOINTS_PER_BLOB = 250;
export const ENDPOINT_INSERT_BATCH_SIZE = 100;
export const BLOB_ANALYSIS_CLAIM_TIMEOUT_MS = 10 * 60 * 1000;

const STATIC_RESOURCE_EXTENSION =
  /\.(?:avif|bmp|css|eot|gif|ico|jpe?g|js|mjs|map|mp3|mp4|ogg|otf|pdf|png|svg|ttf|webm|webp|woff2?)(?:[?#].*)?$/i;
const MIME_TYPE =
  /^(?:application|audio|font|image|message|model|multipart|text|video)\/[a-z0-9][a-z0-9.+-]*(?:\s*;.*)?$/i;
const NON_HTTP_SCHEME = /^(?:blob|data|file|javascript|mailto|tel):/i;
const LINKFINDER_NOISE = /^(?:usage:|options:|use -h for help)/i;

interface ParentScopeContext {
  scopeId: number;
  rootDomain: string;
  nextDepth: number;
}

interface AnalysisInput {
  jsUrl: string;
  sha256: string | null;
  storageKey: string | null;
  compression: Compression | null;
  fetchedAt: Date | null;
  endpointAnalyzedAt: Date | null;
  endpointAnalysisStartedAt: Date | null;
  blobEndpointAnalyzedAt: Date | null;
  parentScope: ParentScopeContext | null;
}

export interface EndpointCandidate {
  endpoint: string;
  hostname: string | null;
}

export interface EndpointAnalysisOperations {
  claimBlobAnalysis: (sha256: string) => Promise<"claimed" | "complete" | "busy">;
  readBlob: () => Promise<Buffer>;
  findEndpoints: (body: Buffer) => Promise<string[]>;
  persistEndpoints: (sha256: string, candidates: EndpointCandidate[]) => Promise<void>;
  loadPersistedEndpoints: (sha256: string) => Promise<string[]>;
  markBlobComplete: (sha256: string) => Promise<void>;
  releaseBlobClaim: (sha256: string) => Promise<void>;
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

export function isHighSignalEndpoint(endpoint: string): boolean {
  if (
    !endpoint ||
    MIME_TYPE.test(endpoint) ||
    NON_HTTP_SCHEME.test(endpoint) ||
    LINKFINDER_NOISE.test(endpoint) ||
    STATIC_RESOURCE_EXTENSION.test(endpoint) ||
    /(?:^|\/)node_modules\//i.test(endpoint) ||
    /\/_next\/static\//i.test(endpoint)
  ) {
    return false;
  }

  if (/^https?:\/\//i.test(endpoint)) {
    try {
      const parsed = new URL(endpoint);
      if (parsed.hostname === "w3.org" || parsed.hostname.endsWith(".w3.org")) return false;
      return true;
    } catch {
      return false;
    }
  }

  // LinkFinder occasionally prints banners and identifiers. Relative paths,
  // templates and a few endpoint-like route names remain useful.
  return (
    endpoint.includes("/") ||
    endpoint.includes("?") ||
    endpoint.includes("{") ||
    /^(?:api|auth|graphql|login|oauth)$/i.test(endpoint)
  );
}

/** Deduplicate, filter and bound untrusted LinkFinder output before indexing. */
export function sanitizeEndpointCandidates(foundEndpoints: string[]): EndpointCandidate[] {
  const seen = new Set<string>();
  const candidates: EndpointCandidate[] = [];

  for (const rawEndpoint of foundEndpoints) {
    let endpoint = rawEndpoint.trim();
    if (
      endpoint.length >= 2 &&
      ((endpoint.startsWith('"') && endpoint.endsWith('"')) ||
        (endpoint.startsWith("'") && endpoint.endsWith("'")))
    ) {
      endpoint = endpoint.slice(1, -1).trim();
    }
    if (
      !endpoint ||
      endpoint.includes("\0") ||
      Buffer.byteLength(endpoint, "utf8") > MAX_ENDPOINT_BYTES ||
      !isHighSignalEndpoint(endpoint) ||
      seen.has(endpoint)
    ) {
      continue;
    }

    seen.add(endpoint);
    candidates.push({ endpoint, hostname: extractHostname(endpoint) });
    if (candidates.length >= MAX_ENDPOINTS_PER_BLOB) break;
  }

  return candidates;
}

async function loadAnalysisInput(db: Db, jsId: number): Promise<AnalysisInput | null> {
  const [row] = await db
    .select({
      jsUrl: javascriptFiles.url,
      sha256: javascriptFiles.sha256,
      fetchedAt: javascriptFiles.fetchedAt,
      endpointAnalyzedAt: javascriptFiles.endpointAnalyzedAt,
      endpointAnalysisStartedAt: javascriptFiles.endpointAnalysisStartedAt,
      storageKey: jsBlobs.storageKey,
      compression: jsBlobs.compression,
      blobEndpointAnalyzedAt: jsBlobs.endpointAnalyzedAt,
      scopeId: assets.scopeId,
      parentDepth: assets.depth,
      scopeAsset: scopes.asset,
      scopeInScope: scopes.inScope,
    })
    .from(javascriptFiles)
    .innerJoin(webServices, eq(javascriptFiles.serviceId, webServices.id))
    .innerJoin(assets, eq(webServices.assetId, assets.id))
    .leftJoin(scopes, eq(assets.scopeId, scopes.id))
    .leftJoin(jsBlobs, eq(javascriptFiles.sha256, jsBlobs.sha256))
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
    sha256: row.sha256,
    storageKey: row.storageKey,
    compression:
      row.compression === "zstd" || row.compression === "gzip" ? row.compression : null,
    fetchedAt: row.fetchedAt,
    endpointAnalyzedAt: row.endpointAnalyzedAt,
    endpointAnalysisStartedAt: row.endpointAnalysisStartedAt,
    blobEndpointAnalyzedAt: row.blobEndpointAnalyzedAt,
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
  sha256: string,
  candidates: EndpointCandidate[]
): Promise<void> {
  await persistEndpointBatches(sha256, candidates, async (batch) => {
    await db.insert(blobEndpoints).values(batch).onConflictDoNothing();
  });
}

/**
 * Persist bounded endpoint output in restart-safe batches. The callback is
 * deliberately exposed so retry behavior can be tested without PostgreSQL.
 */
export async function persistEndpointBatches(
  sha256: string,
  candidates: EndpointCandidate[],
  insertBatch: (rows: Array<{ sha256: string; endpoint: string }>) => Promise<void>
): Promise<void> {
  for (let offset = 0; offset < candidates.length; offset += ENDPOINT_INSERT_BATCH_SIZE) {
    const batch = candidates.slice(offset, offset + ENDPOINT_INSERT_BATCH_SIZE);
    await insertBatch(batch.map(({ endpoint }) => ({ sha256, endpoint })));
  }
}

async function loadPersistedEndpointValues(db: Db, sha256: string): Promise<string[]> {
  const rows = await db
    .select({ endpoint: blobEndpoints.endpoint })
    .from(blobEndpoints)
    .where(eq(blobEndpoints.sha256, sha256))
    .orderBy(blobEndpoints.endpoint)
    .limit(MAX_ENDPOINTS_PER_BLOB);

  return rows.map((row) => row.endpoint);
}

async function claimBlobAnalysis(
  db: Db,
  sha256: string
): Promise<"claimed" | "complete" | "busy"> {
  const staleBefore = new Date(Date.now() - BLOB_ANALYSIS_CLAIM_TIMEOUT_MS);
  const [claimed] = await db
    .update(jsBlobs)
    .set({ endpointAnalysisStartedAt: new Date() })
    .where(
      and(
        eq(jsBlobs.sha256, sha256),
        isNull(jsBlobs.endpointAnalyzedAt),
        or(
          isNull(jsBlobs.endpointAnalysisStartedAt),
          lt(jsBlobs.endpointAnalysisStartedAt, staleBefore)
        )
      )
    )
    .returning({ sha256: jsBlobs.sha256 });
  if (claimed) return "claimed";

  const [current] = await db
    .select({ endpointAnalyzedAt: jsBlobs.endpointAnalyzedAt })
    .from(jsBlobs)
    .where(eq(jsBlobs.sha256, sha256))
    .limit(1);
  if (!current) throw new Error(`JS blob ${sha256} does not exist`);
  return current.endpointAnalyzedAt ? "complete" : "busy";
}

async function markBlobAnalysisComplete(db: Db, sha256: string): Promise<void> {
  const completedAt = new Date();
  const [updated] = await db
    .update(jsBlobs)
    .set({ endpointAnalyzedAt: completedAt, endpointAnalysisStartedAt: null })
    .where(eq(jsBlobs.sha256, sha256))
    .returning({ sha256: jsBlobs.sha256 });
  if (!updated) throw new Error(`JS blob ${sha256} disappeared during analysis`);

  // Occurrences skipped while this blob was claimed can be selected on the
  // next scheduler tick instead of waiting for the retry window.
  await db
    .update(javascriptFiles)
    .set({ endpointAnalysisStartedAt: null })
    .where(
      and(
        eq(javascriptFiles.sha256, sha256),
        isNull(javascriptFiles.endpointAnalyzedAt)
      )
    );
}

async function releaseBlobAnalysisClaim(db: Db, sha256: string): Promise<void> {
  await db
    .update(jsBlobs)
    .set({ endpointAnalysisStartedAt: null })
    .where(and(eq(jsBlobs.sha256, sha256), isNull(jsBlobs.endpointAnalyzedAt)));
}

/**
 * A failed attempt may already have persisted a subset of endpoints. Merge
 * them with the fresh LinkFinder result so retries also recover their fan-out.
 */
export async function runEndpointAnalysisAttempt(
  jsId: number,
  sha256: string,
  operations: EndpointAnalysisOperations
): Promise<{ found: number; accepted: number; deferred: boolean }> {
  const claim = await operations.claimBlobAnalysis(sha256);
  if (claim === "busy") return { found: 0, accepted: 0, deferred: true };

  let found = 0;
  let candidates: EndpointCandidate[];
  if (claim === "complete") {
    candidates = sanitizeEndpointCandidates(
      await operations.loadPersistedEndpoints(sha256)
    );
  } else {
    try {
      const persistedEndpoints = await operations.loadPersistedEndpoints(sha256);
      const body = await operations.readBlob();
      const foundEndpoints = await operations.findEndpoints(body);
      found = foundEndpoints.length;
      candidates = sanitizeEndpointCandidates([
        // Partial rows from an earlier attempt remain first so a changed tool
        // result cannot crowd durable work out of the bounded recovery set.
        ...persistedEndpoints,
        ...foundEndpoints,
      ]);
      await operations.persistEndpoints(sha256, candidates);
      await operations.markBlobComplete(sha256);
    } catch (error) {
      await operations.releaseBlobClaim(sha256).catch(() => undefined);
      throw error;
    }
  }

  // Blob completion precedes occurrence fan-out. A queue failure can retry
  // cheaply from shared rows without invoking LinkFinder again.
  await operations.fanOut(jsId, candidates);
  await operations.markComplete(jsId);

  return { found, accepted: candidates.length, deferred: false };
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
  store: BlobStore,
  scanQueue: Queue<ScanHttpJob>,
  detectTechQueue: Queue<DetectTechnologyJob>,
  limits: EndpointFanoutLimits = UNBOUNDED_FANOUT
): Promise<void> {
  const { jsId } = job.data;

  const input = await loadAnalysisInput(db, jsId);
  if (!input || (input.endpointAnalyzedAt && input.blobEndpointAnalyzedAt)) return;

  // Legacy jobs were enqueued before JS download. Drain them without invoking
  // LinkFinder; js-worker will retry and enqueue again after persistence.
  if (
    !input.fetchedAt ||
    !input.sha256 ||
    !input.storageKey ||
    !input.compression
  ) {
    console.log(JSON.stringify({ level: "info", msg: "Skipping incomplete JS analysis", jsId }));
    return;
  }

  if (!input.endpointAnalysisStartedAt) {
    // Mark before the first side effect. Existing endpoint rows are loaded by
    // runEndpointAnalysisAttempt and recovered; their presence is never used
    // as proof that an older attempt completed all fan-out.
    await markEndpointAnalysisStarted(db, jsId);
  }

  if (!input.parentScope) {
    console.log(
      JSON.stringify({
        level: "info",
        msg: "Indexing shared JS blob without unscoped fan-out",
        jsId,
      })
    );
  }
  console.log(JSON.stringify({ level: "info", msg: `Analyzing JS ${input.jsUrl}` }));

  const result = await runEndpointAnalysisAttempt(jsId, input.sha256, {
    claimBlobAnalysis: (sha256) => claimBlobAnalysis(db, sha256),
    readBlob: () => store.get(input.storageKey!, input.compression!),
    findEndpoints: runLinkfinder,
    persistEndpoints: (sha256, candidates) =>
      insertEndpointBatches(db, sha256, candidates),
    loadPersistedEndpoints: (sha256) => loadPersistedEndpointValues(db, sha256),
    markBlobComplete: (sha256) => markBlobAnalysisComplete(db, sha256),
    releaseBlobClaim: (sha256) => releaseBlobAnalysisClaim(db, sha256),
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

  if (result.deferred) {
    console.log(
      JSON.stringify({
        level: "info",
        msg: "Shared JS blob analysis already in progress",
        jsId,
        sha256: input.sha256,
      })
    );
    return;
  }

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
