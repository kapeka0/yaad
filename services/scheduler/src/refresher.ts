import { Queue } from "bullmq";
import { and, or, eq, lt, isNull, isNotNull, inArray, sql } from "drizzle-orm";
import type { Db } from "@yaad/db";
import { scopes, assets } from "@yaad/db";
import { DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import type { DetectTechnologyJob, EnumerateSubdomainsJob, ScanHttpJob } from "@yaad/queue";
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
  const downstreamDepths = await Promise.all(
    downstreamQueues.map(async ({ queue, maxDepth }) => ({
      name: queue.name,
      depth: await getQueueDepth(queue),
      maxDepth,
    }))
  );
  const saturated = downstreamDepths.find(({ depth, maxDepth }) => depth >= maxDepth);
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
    const bucket = retryBucket(attemptedAt, settings.retryIntervalHours);
    await scanQueue.addBulk(
      rows.map((row) => ({
        name: "scan_http",
        data: { domain: row.domain, assetId: row.id },
        opts: { ...DEFAULT_JOB_OPTIONS, jobId: `scheduler-scan-${row.id}-${bucket}` },
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

export interface EndpointFanoutRecoveryResult {
  scans: number;
  technologies: number;
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
  detectTechQueue: Queue<DetectTechnologyJob>,
  settings: SchedulerSettings,
  downstreamQueues: QueuePressureSource[] = []
): Promise<void> {
  const [enumCount, endpointRecovery] = await Promise.all([
    refreshStaleScopes(db, enumerateQueue, settings),
    refreshEndpointFanout(db, scanQueue, detectTechQueue, settings),
  ]);
  const scanCount = await refreshStaleAssets(db, scanQueue, settings, downstreamQueues);
  log("info", "Scheduler tick complete", {
    scopesReEnumerated: enumCount,
    assetsReScanned: scanCount,
    endpointScansRecovered: endpointRecovery.scans,
    endpointTechnologiesRecovered: endpointRecovery.technologies,
  });
}
