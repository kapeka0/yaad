import { NextResponse } from "next/server";
import { Queue } from "bullmq";
import { db as getDbInstance } from "@/lib/db";
import { getRedisOptions, QUEUES } from "@yaad/queue";
import { sql } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CountsRow {
  programs: number | string;
  scopes: number | string;
  assets: number | string;
  resolved_assets: number | string;
  web_services: number | string;
  javascript_files: number | string;
  js_libraries: number | string;
  vulnerable_libraries: number | string;
  technologies: number | string;
  endpoints: number | string;
  endpoint_indexed_blobs: number | string;
  js_blobs: number | string;
  blob_size_bytes: number | string;
  blob_stored_bytes: number | string;
  db_size_bytes: number | string;
  last_scan: Date | string | null;
}

interface QueueCounts {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
}

interface StatsPayload {
  database: {
    sizeBytes: number;
    programs: number;
    scopes: number;
    assets: number;
    resolvedAssets: number;
    webServices: number;
    javascriptFiles: number;
    endpoints: number;
    technologies: number;
    estimated: true;
  };
  libraries: { detected: number; vulnerable: number };
  storage: { uniqueBlobs: number; originalBytes: number; storedBytes: number; ratio: number };
  endpointIndex: { indexedBlobs: number; totalBlobs: number };
  queues: Record<string, QueueCounts>;
  lastScan: string | null;
}

const CACHE_TTL_MS = 60_000;
let cachedStats: { expiresAt: number; value: StatsPayload } | null = null;
let statsInFlight: Promise<StatsPayload> | null = null;
let queueClients: Queue[] | null = null;

function getQueueClients(): Queue[] {
  if (queueClients) return queueClients;
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) return [];
  const connection = getRedisOptions(redisUrl);
  queueClients = Object.values(QUEUES).map((name) => new Queue(name, { connection }));
  return queueClients;
}

async function computeStats(): Promise<StatsPayload> {
  const dbInstance = getDbInstance();

  // PostgreSQL planner estimates keep dashboard counters constant-time and
  // low-I/O. Endpoints are content-addressed, so this is the unique useful
  // result count rather than duplicated per-occurrence rows.
  const result = await dbInstance.execute(sql`
      WITH estimates AS (
        SELECT c.relname, GREATEST(c.reltuples, 0)::bigint AS row_estimate
        FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public'
          AND c.relkind = 'r'
      )
      SELECT
        COALESCE(max(row_estimate) FILTER (WHERE relname = 'programs'), 0)::bigint AS programs,
        COALESCE(max(row_estimate) FILTER (WHERE relname = 'scopes'), 0)::bigint AS scopes,
        COALESCE(max(row_estimate) FILTER (WHERE relname = 'assets'), 0)::bigint AS assets,
        (SELECT count(*) FROM assets WHERE resolved)::int                 AS resolved_assets,
        COALESCE(max(row_estimate) FILTER (WHERE relname = 'web_services'), 0)::bigint AS web_services,
        COALESCE(max(row_estimate) FILTER (WHERE relname = 'javascript_files'), 0)::bigint AS javascript_files,
        (SELECT count(*) FROM js_libraries)::int                          AS js_libraries,
        (SELECT count(*) FROM js_libraries WHERE vulnerabilities IS NOT NULL)::int AS vulnerable_libraries,
        COALESCE(max(row_estimate) FILTER (WHERE relname = 'technologies'), 0)::bigint AS technologies,
        COALESCE(max(row_estimate) FILTER (WHERE relname = 'blob_endpoints'), 0)::bigint AS endpoints,
        (SELECT count(*) FROM js_blobs WHERE endpoint_analyzed_at IS NOT NULL)::int AS endpoint_indexed_blobs,
        COALESCE(max(row_estimate) FILTER (WHERE relname = 'js_blobs'), 0)::bigint AS js_blobs,
        (SELECT COALESCE(sum(size_bytes), 0) FROM js_blobs)::bigint       AS blob_size_bytes,
        (SELECT COALESCE(sum(stored_bytes), 0) FROM js_blobs)::bigint     AS blob_stored_bytes,
        pg_database_size(current_database())::bigint                      AS db_size_bytes,
        (SELECT max(last_scanned) FROM web_services)                      AS last_scan
      FROM estimates
    `);

  const row = (result as unknown as CountsRow[])[0];
  if (!row) throw new Error("Stats query returned no rows");

  const queues: Record<string, QueueCounts> = {};
  try {
    await Promise.all(
      getQueueClients().map(async (queue) => {
        const c = await queue.getJobCounts("waiting", "active", "completed", "failed", "delayed");
        queues[queue.name] = {
          waiting: (c.waiting ?? 0) + (c.delayed ?? 0),
          active: c.active ?? 0,
          completed: c.completed ?? 0,
          failed: c.failed ?? 0,
        };
      })
    );
  } catch (err) {
    // Redis being unavailable should not take down database/storage stats.
    console.warn("Failed to read queue stats:", err);
    for (const key of Object.keys(queues)) delete queues[key];
  }

  const blobSize = Number(row.blob_size_bytes);
  const blobStored = Number(row.blob_stored_bytes);

  // Postgres `timestamp` columns store UTC wall-clock but come back without a
  // timezone marker, so JS would parse them as local time. Normalize to a real
  // UTC ISO string so the frontend's "X ago" is accurate.
  let lastScan: string | null = null;
  if (row.last_scan) {
    const d = row.last_scan instanceof Date
      ? row.last_scan
      : new Date(String(row.last_scan).replace(" ", "T") + "Z");
    if (!Number.isNaN(d.getTime())) lastScan = d.toISOString();
  }

  return {
    database: {
      sizeBytes: Number(row.db_size_bytes),
      programs: Number(row.programs),
      scopes: Number(row.scopes),
      assets: Number(row.assets),
      resolvedAssets: Number(row.resolved_assets),
      webServices: Number(row.web_services),
      javascriptFiles: Number(row.javascript_files),
      endpoints: Number(row.endpoints),
      technologies: Number(row.technologies),
      estimated: true,
    },
    libraries: {
      detected: Number(row.js_libraries),
      vulnerable: Number(row.vulnerable_libraries),
    },
    storage: {
      uniqueBlobs: Number(row.js_blobs),
      originalBytes: blobSize,
      storedBytes: blobStored,
      ratio: blobStored > 0 ? blobSize / blobStored : 0,
    },
    endpointIndex: {
      indexedBlobs: Number(row.endpoint_indexed_blobs),
      totalBlobs: Number(row.js_blobs),
    },
    queues,
    lastScan,
  };
}

export async function GET() {
  try {
    const now = Date.now();
    if (cachedStats && cachedStats.expiresAt > now) {
      return NextResponse.json(cachedStats.value, {
        headers: { "Cache-Control": "public, max-age=15, stale-while-revalidate=60" },
      });
    }

    statsInFlight ??= computeStats();
    const value = await statsInFlight;
    cachedStats = { expiresAt: Date.now() + CACHE_TTL_MS, value };
    return NextResponse.json(value, {
      headers: { "Cache-Control": "public, max-age=15, stale-while-revalidate=60" },
    });
  } catch (err) {
    console.error("Failed to compute stats:", err);
    return NextResponse.json({ error: "Failed to compute stats" }, { status: 500 });
  } finally {
    statsInFlight = null;
  }
}
