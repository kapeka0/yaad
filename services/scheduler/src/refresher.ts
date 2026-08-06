import { Queue } from "bullmq";
import { and, or, eq, lt, isNull, sql } from "drizzle-orm";
import type { Db } from "@yaad/db";
import { scopes, assets } from "@yaad/db";
import { DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import type { EnumerateSubdomainsJob, ScanHttpJob } from "@yaad/queue";
import type { SchedulerSettings } from "@yaad/config";

const HOSTNAME_PATTERN =
  "^([A-Za-z0-9_][A-Za-z0-9_-]{0,62})([.][A-Za-z0-9_][A-Za-z0-9_-]{0,62})*[.]?$";
const WILDCARD_HOSTNAME_PATTERN =
  "^[*][.]([A-Za-z0-9_][A-Za-z0-9_-]{0,62})([.][A-Za-z0-9_][A-Za-z0-9_-]{0,62})*[.]?$";

function log(level: string, msg: string, extra: Record<string, unknown> = {}): void {
  console.log(JSON.stringify({ level, msg, ...extra }));
}

/**
 * Re-enumerate wildcard scopes whose last enumeration is older than the
 * configured interval (or that were never enumerated). Stamps
 * `last_enumerated_at = now()` at enqueue time so the same scope is not
 * re-picked on the next tick before its interval elapses again.
 */
export async function refreshStaleScopes(
  db: Db,
  enumerateQueue: Queue<EnumerateSubdomainsJob>,
  settings: SchedulerSettings
): Promise<number> {
  const staleBefore = sql`now() - ${`${settings.enumIntervalHours} hours`}::interval`;

  const rows = await db
    .select({ id: scopes.id, asset: scopes.asset })
    .from(scopes)
    .where(
      and(
        eq(scopes.wildcard, true),
        eq(scopes.inScope, true),
        sql`${scopes.asset} ~ ${WILDCARD_HOSTNAME_PATTERN}`,
        or(isNull(scopes.lastEnumeratedAt), lt(scopes.lastEnumeratedAt, staleBefore))
      )
    )
    // Never-enumerated first, then oldest first.
    .orderBy(sql`${scopes.lastEnumeratedAt} asc nulls first`)
    .limit(settings.batchSize);

  for (const row of rows) {
    const baseDomain = row.asset.replace(/^\*\./, "");
    await enumerateQueue.add(
      "enumerate_subdomains",
      { domain: baseDomain, scopeId: row.id, depth: 0 },
      DEFAULT_JOB_OPTIONS
    );
    await db
      .update(scopes)
      .set({ lastEnumeratedAt: new Date() })
      .where(eq(scopes.id, row.id));
  }

  if (rows.length > 0) {
    log("info", `Re-enqueued enumeration for ${rows.length} stale scope(s)`);
  }
  return rows.length;
}

/**
 * Re-scan known assets whose last http scan is older than the configured
 * interval (or that were never scanned by the scheduler). Re-running
 * `scan_http` cascades into js collection and technology detection, so the
 * whole downstream pipeline is refreshed. Stamps `last_scanned_at = now()`
 * at enqueue time to avoid re-picking the same asset next tick.
 */
export async function refreshStaleAssets(
  db: Db,
  scanQueue: Queue<ScanHttpJob>,
  settings: SchedulerSettings
): Promise<number> {
  const staleBefore = sql`now() - ${`${settings.rescanIntervalHours} hours`}::interval`;

  const rows = await db
    .select({ id: assets.id, domain: assets.domain })
    .from(assets)
    .where(
      and(
        sql`${assets.domain} ~ ${HOSTNAME_PATTERN}`,
        or(isNull(assets.lastScannedAt), lt(assets.lastScannedAt, staleBefore))
      )
    )
    // Never-scanned first, then oldest first.
    .orderBy(sql`${assets.lastScannedAt} asc nulls first`)
    .limit(settings.batchSize);

  for (const row of rows) {
    await scanQueue.add(
      "scan_http",
      { domain: row.domain, assetId: row.id },
      DEFAULT_JOB_OPTIONS
    );
    await db
      .update(assets)
      .set({ lastScannedAt: new Date() })
      .where(eq(assets.id, row.id));
  }

  if (rows.length > 0) {
    log("info", `Re-enqueued http scan for ${rows.length} stale asset(s)`);
  }
  return rows.length;
}

export async function runTick(
  db: Db,
  enumerateQueue: Queue<EnumerateSubdomainsJob>,
  scanQueue: Queue<ScanHttpJob>,
  settings: SchedulerSettings
): Promise<void> {
  const [enumCount, scanCount] = await Promise.all([
    refreshStaleScopes(db, enumerateQueue, settings),
    refreshStaleAssets(db, scanQueue, settings),
  ]);
  log("info", "Scheduler tick complete", {
    scopesReEnumerated: enumCount,
    assetsReScanned: scanCount,
  });
}
