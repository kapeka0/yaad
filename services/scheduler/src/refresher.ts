import { Queue } from "bullmq";
import { and, or, eq, ne, lt, isNull, isNotNull, inArray, sql } from "drizzle-orm";
import type { Db } from "@yaad/db";
import { assets, javascriptFiles, jsBlobs, scopes } from "@yaad/db";
import { DEFAULT_JOB_OPTIONS, getAssetScanJobId } from "@yaad/queue";
import type {
  AnalyzeJsJob,
  DetectTechnologyJob,
  EnumerateSubdomainsJob,
  ScanHttpJob,
} from "@yaad/queue";
import type { SchedulerSettings } from "@yaad/config";

const HOSTNAME_PATTERN =
  "^([A-Za-z0-9_][A-Za-z0-9_-]{0,62})([.][A-Za-z0-9_][A-Za-z0-9_-]{0,62})*[.]?$";
const WILDCARD_HOSTNAME_PATTERN =
  "^[*][.]([A-Za-z0-9_][A-Za-z0-9_-]{0,62})([.][A-Za-z0-9_][A-Za-z0-9_-]{0,62})*[.]?$";

function log(level: string, msg: string, extra: Record<string, unknown> = {}): void {
  console.log(JSON.stringify({ level, msg, ...extra }));
}

async function getQueueDepth(queue: Queue): Promise<number> {
  const [waiting, active, delayed] = await Promise.all([
    queue.getWaitingCount(),
    queue.getActiveCount(),
    queue.getDelayedCount(),
  ]);
  return waiting + active + delayed;
}

function retryBucket(now: Date, retryIntervalHours: number): number {
  const windowMs = Math.max(1, retryIntervalHours) * 60 * 60 * 1000;
  return Math.floor(now.getTime() / windowMs);
}

export interface QueuePressureSource {
  queue: Queue;
  maxDepth: number;
}

async function findSaturatedQueue(
  downstreamQueues: QueuePressureSource[]
): Promise<{ name: string; depth: number; maxDepth: number } | undefined> {
  const depths = await Promise.all(
    downstreamQueues.map(async ({ queue, maxDepth }) => ({
      name: queue.name,
      depth: await getQueueDepth(queue),
      maxDepth,
    }))
  );
  return depths.find(({ depth, maxDepth }) => depth >= maxDepth);
}

/**
 * Re-enumerate wildcard scopes whose last enumeration is older than the
 * configured interval (or that were never enumerated). Queue attempts and
 * successful completion are tracked independently so failures remain stale.
 */
export async function refreshStaleScopes(
  db: Db,
  enumerateQueue: Queue<EnumerateSubdomainsJob>,
  settings: SchedulerSettings
): Promise<number> {
  const depth = await getQueueDepth(enumerateQueue);
  const available = Math.max(0, settings.maxEnumQueueDepth - depth);
  const limit = Math.min(settings.batchSize, available);
  if (limit === 0) {
    log("info", "Enumeration scheduler paused by backpressure", {
      queueDepth: depth,
      maxQueueDepth: settings.maxEnumQueueDepth,
    });
    return 0;
  }

  const staleBefore = sql`now() - ${`${settings.enumIntervalHours} hours`}::interval`;
  const retryBefore = sql`now() - ${`${settings.retryIntervalHours} hours`}::interval`;

  const rows = await db
    .select({ id: scopes.id, asset: scopes.asset })
    .from(scopes)
    .where(
      and(
        eq(scopes.wildcard, true),
        eq(scopes.inScope, true),
        sql`${scopes.asset} ~ ${WILDCARD_HOSTNAME_PATTERN}`,
        or(isNull(scopes.lastEnumeratedAt), lt(scopes.lastEnumeratedAt, staleBefore)),
        or(
          isNull(scopes.lastEnumerationAttemptAt),
          lt(scopes.lastEnumerationAttemptAt, retryBefore)
        )
      )
    )
    // Never-enumerated first, then oldest first.
    .orderBy(sql`${scopes.lastEnumeratedAt} asc nulls first`)
    .limit(limit);

  if (rows.length > 0) {
    const attemptedAt = new Date();
    const bucket = retryBucket(attemptedAt, settings.retryIntervalHours);
    await enumerateQueue.addBulk(
      rows.map((row) => ({
        name: "enumerate_subdomains",
        data: { domain: row.asset.replace(/^\*\./, ""), scopeId: row.id, depth: 0 },
        opts: { ...DEFAULT_JOB_OPTIONS, jobId: `scheduler-enum-${row.id}-${bucket}` },
      }))
    );
    await db
      .update(scopes)
      .set({ lastEnumerationAttemptAt: attemptedAt })
      .where(inArray(scopes.id, rows.map((row) => row.id)));
  }

  if (rows.length > 0) {
    log("info", `Queued enumeration for ${rows.length} stale scope(s)`, {
      queueDepthBefore: depth,
    });
  }
  return rows.length;
}

/**
 * Re-scan known assets whose last http scan is older than the configured
 * interval (or that were never scanned by the scheduler). Re-running
 * `scan_http` cascades into js collection and technology detection, so the
 * whole downstream pipeline is refreshed. Only resolved, program-associated
 * assets are scheduled; JS-discovered third parties and dead names are not.
 */
export async function refreshStaleAssets(
  db: Db,
  scanQueue: Queue<ScanHttpJob>,
  settings: SchedulerSettings,
  downstreamQueues: QueuePressureSource[] = []
): Promise<number> {
  const saturated = await findSaturatedQueue(downstreamQueues);
  if (saturated) {
    log("info", "HTTP scheduler paused by downstream backpressure", {
      queue: saturated.name,
      queueDepth: saturated.depth,
      maxQueueDepth: saturated.maxDepth,
    });
    return 0;
  }

  const depth = await getQueueDepth(scanQueue);
  const available = Math.max(0, settings.maxScanQueueDepth - depth);
  const limit = Math.min(settings.batchSize, available);
  if (limit === 0) {
    log("info", "HTTP scheduler paused by backpressure", {
      queueDepth: depth,
      maxQueueDepth: settings.maxScanQueueDepth,
    });
    return 0;
  }

  const staleBefore = sql`now() - ${`${settings.rescanIntervalHours} hours`}::interval`;
  const retryBefore = sql`now() - ${`${settings.retryIntervalHours} hours`}::interval`;

  const rows = await db
    .select({ id: assets.id, domain: assets.domain })
    .from(assets)
    .where(
      and(
        sql`${assets.domain} ~ ${HOSTNAME_PATTERN}`,
        isNotNull(assets.scopeId),
        eq(assets.resolved, true),
        or(isNull(assets.lastScannedAt), lt(assets.lastScannedAt, staleBefore)),
        or(isNull(assets.lastScanAttemptAt), lt(assets.lastScanAttemptAt, retryBefore))
      )
    )
    // Never-scanned first, then oldest first.
    .orderBy(sql`${assets.lastScannedAt} asc nulls first`)
    .limit(limit);

  if (rows.length > 0) {
    const attemptedAt = new Date();
    await scanQueue.addBulk(
      rows.map((row) => ({
        name: "scan_http",
        data: { domain: row.domain, assetId: row.id },
        opts: {
          ...DEFAULT_JOB_OPTIONS,
          jobId: getAssetScanJobId(row.id, attemptedAt, settings.retryIntervalHours),
        },
      }))
    );
    await db
      .update(assets)
      .set({ lastScanAttemptAt: attemptedAt })
      .where(inArray(assets.id, rows.map((row) => row.id)));
  }

  if (rows.length > 0) {
    log("info", `Queued http scan for ${rows.length} stale asset(s)`, {
      queueDepthBefore: depth,
    });
  }
  return rows.length;
}

export function buildUnresolvedRecoveryJobs(
  rows: Array<{ id: number; domain: string }>,
  now: Date,
  retryIntervalHours: number
) {
  return rows.map((row) => ({
    name: "scan_http" as const,
    data: { domain: row.domain, assetId: row.id },
    opts: {
      ...DEFAULT_JOB_OPTIONS,
      jobId: getAssetScanJobId(row.id, now, retryIntervalHours),
    },
  }));
}

/**
 * Retry active, valid assets that never produced a live HTTP service. Manual
 * assets and exact scope roots are selected first; passive discoveries follow
 * in deliberately small, backpressured batches so dead hosts cannot dominate
 * the Raspberry Pi.
 */
export async function refreshUnresolvedAssets(
  db: Db,
  scanQueue: Queue<ScanHttpJob>,
  settings: SchedulerSettings,
  downstreamQueues: QueuePressureSource[] = []
): Promise<number> {
  const saturated = await findSaturatedQueue(downstreamQueues);
  if (saturated) {
    log("info", "Unresolved HTTP recovery paused by downstream backpressure", {
      queue: saturated.name,
      queueDepth: saturated.depth,
      maxQueueDepth: saturated.maxDepth,
    });
    return 0;
  }

  const depth = await getQueueDepth(scanQueue);
  const available = Math.max(0, settings.maxScanQueueDepth - depth);
  const limit = Math.min(settings.unresolvedBatchSize, available);
  if (limit === 0) {
    log("info", "Unresolved HTTP recovery paused by backpressure", {
      queueDepth: depth,
      maxQueueDepth: settings.maxScanQueueDepth,
    });
    return 0;
  }

  const retryBefore = sql`now() - ${`${settings.unresolvedRetryIntervalHours} hours`}::interval`;
  const commonConditions = [
    eq(scopes.inScope, true),
    sql`${assets.domain} ~ ${HOSTNAME_PATTERN}`,
    eq(assets.resolved, false),
    isNull(assets.lastScannedAt),
    or(isNull(assets.lastScanAttemptAt), lt(assets.lastScanAttemptAt, retryBefore)),
  ];
  const manualRows = await db
    .select({ id: assets.id, domain: assets.domain })
    .from(assets)
    .innerJoin(scopes, eq(assets.scopeId, scopes.id))
    .where(and(...commonConditions, eq(assets.source, "manual")))
    .orderBy(sql`${assets.lastScanAttemptAt} asc nulls first`, assets.id)
    .limit(limit);
  const remaining = limit - manualRows.length;
  const otherRows = remaining > 0
    ? await db
        .select({ id: assets.id, domain: assets.domain })
        .from(assets)
        .innerJoin(scopes, eq(assets.scopeId, scopes.id))
        .where(and(...commonConditions, ne(assets.source, "manual")))
        .orderBy(sql`${assets.lastScanAttemptAt} asc nulls first`, assets.id)
        .limit(remaining)
    : [];
  const rows = [...manualRows, ...otherRows];

  if (rows.length === 0) return 0;

  const attemptedAt = new Date();
  await scanQueue.addBulk(
    buildUnresolvedRecoveryJobs(
      rows,
      attemptedAt,
      settings.retryIntervalHours
    )
  );
  await db
    .update(assets)
    .set({ lastScanAttemptAt: attemptedAt })
    .where(inArray(assets.id, rows.map((row) => row.id)));

  log("info", `Queued HTTP recovery for ${rows.length} unresolved asset(s)`, {
    queueDepthBefore: depth,
  });
  return rows.length;
}

export interface EndpointFanoutRecoveryResult {
  scans: number;
  technologies: number;
}

export function buildEndpointAnalysisJobs(
  rows: Array<{ id: number; url: string }>,
  bucket: number
) {
  return rows.map((row) => ({
    name: "analyze_js" as const,
    data: { jsId: row.id, jsUrl: row.url },
    opts: {
      ...DEFAULT_JOB_OPTIONS,
      jobId: `scheduler-analyze-js-${row.id}-${bucket}`,
    },
  }));
}

/**
 * Rebuild the content-addressed endpoint index and recover occurrence fan-out.
 * Pending blobs are represented once per batch; completed shared blobs may
 * fan out through every remaining scoped occurrence without rerunning tools.
 */
export async function refreshPendingEndpointAnalyses(
  db: Db,
  analyzeQueue: Queue<AnalyzeJsJob>,
  settings: SchedulerSettings
): Promise<number> {
  const depth = await getQueueDepth(analyzeQueue);
  const available = Math.max(0, settings.maxAnalyzeQueueDepth - depth);
  const limit = Math.min(settings.batchSize, available);
  if (limit === 0) {
    log("info", "Endpoint analysis scheduler paused by backpressure", {
      queueDepth: depth,
      maxQueueDepth: settings.maxAnalyzeQueueDepth,
    });
    return 0;
  }

  const retryBefore = sql`now() - ${`${settings.retryIntervalHours} hours`}::interval`;
  const candidates = await db
    .select({
      id: javascriptFiles.id,
      url: javascriptFiles.url,
      sha256: javascriptFiles.sha256,
      blobAnalyzedAt: jsBlobs.endpointAnalyzedAt,
    })
    .from(javascriptFiles)
    .innerJoin(jsBlobs, eq(javascriptFiles.sha256, jsBlobs.sha256))
    .where(
      and(
        isNotNull(javascriptFiles.fetchedAt),
        isNull(javascriptFiles.endpointAnalyzedAt),
        or(
          isNull(javascriptFiles.endpointAnalysisStartedAt),
          lt(javascriptFiles.endpointAnalysisStartedAt, retryBefore)
        )
      )
    )
    .orderBy(sql`${javascriptFiles.endpointAnalysisStartedAt} asc nulls first`, javascriptFiles.id)
    .limit(Math.min(5_000, Math.max(limit, limit * 4)));

  const selected: Array<{
    id: number;
    url: string;
    sha256: string;
    blobAnalyzedAt: Date | null;
  }> = [];
  const pendingHashes = new Set<string>();
  for (const row of candidates) {
    if (!row.sha256) continue;
    if (!row.blobAnalyzedAt && pendingHashes.has(row.sha256)) continue;
    if (!row.blobAnalyzedAt) pendingHashes.add(row.sha256);
    selected.push({ ...row, sha256: row.sha256 });
    if (selected.length >= limit) break;
  }
  if (selected.length === 0) return 0;

  const attemptedAt = new Date();
  const bucket = retryBucket(attemptedAt, settings.retryIntervalHours);
  await analyzeQueue.addBulk(buildEndpointAnalysisJobs(selected, bucket));

  const pendingBlobHashes = [...new Set(
    selected.filter((row) => !row.blobAnalyzedAt).map((row) => row.sha256)
  )];
  const completedBlobOccurrenceIds = selected
    .filter((row) => row.blobAnalyzedAt)
    .map((row) => row.id);
  if (pendingBlobHashes.length > 0) {
    await db
      .update(javascriptFiles)
      .set({ endpointAnalysisStartedAt: attemptedAt })
      .where(
        and(
          inArray(javascriptFiles.sha256, pendingBlobHashes),
          isNull(javascriptFiles.endpointAnalyzedAt)
        )
      );
  }
  if (completedBlobOccurrenceIds.length > 0) {
    await db
      .update(javascriptFiles)
      .set({ endpointAnalysisStartedAt: attemptedAt })
      .where(inArray(javascriptFiles.id, completedBlobOccurrenceIds));
  }

  log("info", "Queued pending endpoint analyses", {
    occurrences: selected.length,
    uniquePendingBlobs: pendingBlobHashes.length,
    queueDepthBefore: depth,
  });
  return selected.length;
}

export function buildEndpointRecoveryJobs(
  scanRows: Array<{ id: number; domain: string }>,
  techRows: Array<{ id: number; url: string }>,
  bucket: number
) {
  return {
    scanJobs: scanRows.map((row) => ({
      name: "scan_http" as const,
      data: { domain: row.domain, assetId: row.id },
      opts: {
        ...DEFAULT_JOB_OPTIONS,
        jobId: `endpoint-recovery-scan-${row.id}-${bucket}`,
      },
    })),
    techJobs: techRows.map((row) => ({
      name: "detect_technology" as const,
      data: { url: row.url, assetId: row.id },
      opts: {
        ...DEFAULT_JOB_OPTIONS,
        jobId: `endpoint-recovery-tech-${row.id}-${bucket}`,
      },
    })),
  };
}

/**
 * Recover child jobs accepted by Redis but never completed. Endpoint assets
 * may still be unresolved, so they cannot rely on the normal resolved-only
 * HTTP refresh path. Bucketed IDs also bypass an exhausted failed BullMQ job.
 */
export async function refreshEndpointFanout(
  db: Db,
  scanQueue: Queue<ScanHttpJob>,
  detectTechQueue: Queue<DetectTechnologyJob>,
  settings: SchedulerSettings
): Promise<EndpointFanoutRecoveryResult> {
  const [scanDepth, techDepth] = await Promise.all([
    getQueueDepth(scanQueue),
    getQueueDepth(detectTechQueue),
  ]);
  const scanLimit = Math.min(
    settings.batchSize,
    Math.max(0, settings.maxScanQueueDepth - scanDepth)
  );
  const techLimit = Math.min(
    settings.batchSize,
    Math.max(0, settings.maxTechQueueDepth - techDepth)
  );
  const retryBefore = sql`now() - ${`${settings.retryIntervalHours} hours`}::interval`;
  const attemptedAt = new Date();
  const bucket = retryBucket(attemptedAt, settings.retryIntervalHours);

  let scanRows: Array<{ id: number; domain: string }> = [];
  if (scanLimit > 0) {
    scanRows = await db
      .select({ id: assets.id, domain: assets.domain })
      .from(assets)
      .innerJoin(scopes, eq(assets.scopeId, scopes.id))
      .where(
        and(
          eq(scopes.inScope, true),
          sql`${assets.domain} ~ ${HOSTNAME_PATTERN}`,
          isNotNull(assets.endpointFanoutManagedAt),
          isNull(assets.lastScannedAt),
          or(
            isNull(assets.endpointScanEnqueuedAt),
            lt(assets.endpointScanEnqueuedAt, retryBefore)
          )
        )
      )
      .orderBy(sql`${assets.endpointScanEnqueuedAt} asc nulls first`)
      .limit(scanLimit);

    if (scanRows.length > 0) {
      const { scanJobs } = buildEndpointRecoveryJobs(scanRows, [], bucket);
      await scanQueue.addBulk(scanJobs);
      await db
        .update(assets)
        .set({ endpointScanEnqueuedAt: attemptedAt })
        .where(inArray(assets.id, scanRows.map((row) => row.id)));
    }
  }

  let techRows: Array<{ id: number; url: string }> = [];
  if (techLimit > 0) {
    techRows = await db
      .select({ id: assets.id, url: assets.endpointTechUrl })
      .from(assets)
      .innerJoin(scopes, eq(assets.scopeId, scopes.id))
      .where(
        and(
          eq(scopes.inScope, true),
          isNotNull(assets.endpointFanoutManagedAt),
          isNotNull(assets.endpointTechUrl),
          isNull(assets.lastTechnologyScannedAt),
          or(
            isNull(assets.endpointTechEnqueuedAt),
            lt(assets.endpointTechEnqueuedAt, retryBefore)
          )
        )
      )
      .orderBy(sql`${assets.endpointTechEnqueuedAt} asc nulls first`)
      .limit(techLimit) as Array<{ id: number; url: string }>;

    if (techRows.length > 0) {
      const { techJobs } = buildEndpointRecoveryJobs([], techRows, bucket);
      await detectTechQueue.addBulk(techJobs);
      await db
        .update(assets)
        .set({ endpointTechEnqueuedAt: attemptedAt })
        .where(inArray(assets.id, techRows.map((row) => row.id)));
    }
  }

  if (scanRows.length > 0 || techRows.length > 0) {
    log("info", "Recovered endpoint fan-out", {
      scans: scanRows.length,
      technologies: techRows.length,
      scanQueueDepthBefore: scanDepth,
      techQueueDepthBefore: techDepth,
    });
  }
  return { scans: scanRows.length, technologies: techRows.length };
}

export async function runTick(
  db: Db,
  enumerateQueue: Queue<EnumerateSubdomainsJob>,
  scanQueue: Queue<ScanHttpJob>,
  analyzeQueue: Queue<AnalyzeJsJob>,
  detectTechQueue: Queue<DetectTechnologyJob>,
  settings: SchedulerSettings,
  downstreamQueues: QueuePressureSource[] = []
): Promise<void> {
  const [enumCount, endpointRecovery, endpointAnalyses] = await Promise.all([
    refreshStaleScopes(db, enumerateQueue, settings),
    refreshEndpointFanout(db, scanQueue, detectTechQueue, settings),
    refreshPendingEndpointAnalyses(db, analyzeQueue, settings),
  ]);
  const unresolvedCount = await refreshUnresolvedAssets(
    db,
    scanQueue,
    settings,
    downstreamQueues
  );
  const scanCount = await refreshStaleAssets(db, scanQueue, settings, downstreamQueues);
  log("info", "Scheduler tick complete", {
    scopesReEnumerated: enumCount,
    assetsReScanned: scanCount,
    unresolvedAssetsRetried: unresolvedCount,
    endpointAnalysesQueued: endpointAnalyses,
    endpointScansRecovered: endpointRecovery.scans,
    endpointTechnologiesRecovered: endpointRecovery.technologies,
  });
}
