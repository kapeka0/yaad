import { NextResponse } from "next/server";
import { Queue } from "bullmq";
import { db as getDbInstance } from "@/lib/db";
import { getRedisOptions, QUEUES } from "@yaad/queue";
import { sql } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface CountsRow {
  programs: number;
  scopes: number;
  assets: number;
  resolved_assets: number;
  web_services: number;
  javascript_files: number;
  js_libraries: number;
  vulnerable_libraries: number;
  technologies: number;
  endpoints: number;
  js_blobs: number;
  blob_size_bytes: number;
  blob_stored_bytes: number;
  db_size_bytes: number;
  last_scan: string | null;
}

export async function GET() {
  const dbInstance = getDbInstance();

  try {
    // One round-trip for every headline number.
    const result = await dbInstance.execute(sql`
      SELECT
        (SELECT count(*) FROM programs)::int                              AS programs,
        (SELECT count(*) FROM scopes)::int                                AS scopes,
        (SELECT count(*) FROM assets)::int                                AS assets,
        (SELECT count(*) FROM assets WHERE resolved)::int                 AS resolved_assets,
        (SELECT count(*) FROM web_services)::int                          AS web_services,
        (SELECT count(*) FROM javascript_files)::int                      AS javascript_files,
        (SELECT count(*) FROM js_libraries)::int                          AS js_libraries,
        (SELECT count(*) FROM js_libraries WHERE vulnerabilities IS NOT NULL)::int AS vulnerable_libraries,
        (SELECT count(*) FROM technologies)::int                          AS technologies,
        (SELECT count(*) FROM endpoints)::int                             AS endpoints,
        (SELECT count(*) FROM js_blobs)::int                              AS js_blobs,
        (SELECT COALESCE(sum(size_bytes), 0) FROM js_blobs)::bigint       AS blob_size_bytes,
        (SELECT COALESCE(sum(stored_bytes), 0) FROM js_blobs)::bigint     AS blob_stored_bytes,
        pg_database_size(current_database())::bigint                      AS db_size_bytes,
        (SELECT max(last_scanned) FROM web_services)                      AS last_scan
    `);

    const row = (result as unknown as CountsRow[])[0];

    // Live queue depths from BullMQ / Redis.
    const redisUrl = process.env.REDIS_URL;
    const queues: Record<string, { waiting: number; active: number; completed: number; failed: number }> = {};
    if (redisUrl) {
      const connection = getRedisOptions(redisUrl);
      await Promise.all(
        Object.values(QUEUES).map(async (name) => {
          const queue = new Queue(name, { connection });
          try {
            const c = await queue.getJobCounts("waiting", "active", "completed", "failed", "delayed");
            queues[name] = {
              waiting: (c.waiting ?? 0) + (c.delayed ?? 0),
              active: c.active ?? 0,
              completed: c.completed ?? 0,
              failed: c.failed ?? 0,
            };
          } finally {
            await queue.close();
          }
        })
      );
    }

    const blobSize = Number(row.blob_size_bytes);
    const blobStored = Number(row.blob_stored_bytes);

    return NextResponse.json({
      database: {
        sizeBytes: Number(row.db_size_bytes),
        programs: row.programs,
        scopes: row.scopes,
        assets: row.assets,
        resolvedAssets: row.resolved_assets,
        webServices: row.web_services,
        javascriptFiles: row.javascript_files,
        endpoints: row.endpoints,
        technologies: row.technologies,
      },
      libraries: {
        detected: row.js_libraries,
        vulnerable: row.vulnerable_libraries,
      },
      storage: {
        uniqueBlobs: row.js_blobs,
        originalBytes: blobSize,
        storedBytes: blobStored,
        // How much MinIO holds vs. raw JS seen (dedup + zstd).
        ratio: blobStored > 0 ? blobSize / blobStored : 0,
      },
      queues,
      lastScan: row.last_scan,
    });
  } catch (err) {
    console.error("Failed to compute stats:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
