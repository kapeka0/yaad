import { Queue } from "bullmq";
import type { Db } from "@yaad/db";
import { webServices, technologies, assetTechnologies, assets } from "@yaad/db";
import { DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import type { ScanHttpJob, CollectJsJob, DetectTechnologyJob } from "@yaad/queue";
import { sql, eq } from "drizzle-orm";
import { runHttpx } from "./runner.js";

export async function processScanHttp(
  job: { data: ScanHttpJob },
  db: Db,
  collectJsQueue: Queue<CollectJsJob>,
  detectTechQueue: Queue<DetectTechnologyJob>
): Promise<void> {
  const { domain, assetId } = job.data;

  console.log(JSON.stringify({ level: "info", msg: `Scanning HTTP for ${domain}` }));

  const results = await runHttpx(domain);
  const downstream: Array<{ serviceId: number; url: string }> = [];
  const failures: Array<{ url: string; error: string }> = [];
  let resolvedIp: string | undefined;

  for (const result of results) {
    try {
      const enrichment = {
        statusCode: result.statusCode,
        title: result.title,
        webServer: result.webServer,
        contentType: result.contentType,
        contentLength: result.contentLength,
        ip: result.ip,
        cname: result.cname,
        cdnName: result.cdnName,
        faviconHash: result.faviconHash,
        jarm: result.jarm,
        techFingerprint: result.tech ?? null,
        responseHeaders: result.responseHeaders ?? null,
        lastScanned: new Date(),
      };

      const [service] = await db
        .insert(webServices)
        .values({ assetId, url: result.url, ...enrichment })
        .onConflictDoUpdate({ target: webServices.url, set: enrichment })
        .returning();

      if (result.ip) resolvedIp = result.ip;

      if (service) {
        // Persist httpx-detected technologies directly (fast, no extra fetch).
        for (const techName of result.tech ?? []) {
          await upsertTech(db, assetId, techName);
        }

        downstream.push({ serviceId: service.id, url: result.url });
      }
    } catch (err) {
      failures.push({ url: result.url, error: String(err) });
      console.error(
        JSON.stringify({ level: "warn", msg: `Failed to upsert service ${result.url}`, error: String(err) })
      );
    }
  }

  if (failures.length > 0) {
    throw new Error(`Failed to persist ${failures.length}/${results.length} HTTP result(s)`);
  }

  if (downstream.length > 0) {
    const dayBucket = Math.floor(Date.now() / 86_400_000);
    await Promise.all([
      collectJsQueue.addBulk(
        downstream.map(({ serviceId, url }) => ({
          name: "collect_js",
          data: { url, serviceId },
          opts: { ...DEFAULT_JOB_OPTIONS, jobId: `collect-js-${serviceId}-${dayBucket}` },
        }))
      ),
      detectTechQueue.addBulk(
        downstream.map(({ serviceId, url }) => ({
          name: "detect_technology",
          data: { url, assetId },
          opts: { ...DEFAULT_JOB_OPTIONS, jobId: `detect-tech-${serviceId}-${dayBucket}` },
        }))
      ),
    ]);
  }

  // Freshness means the scan and its downstream enqueue completed, not merely
  // that the scheduler attempted to queue it.
  await db
    .update(assets)
    .set({
      ...(resolvedIp ? { ip: resolvedIp, resolved: true } : {}),
      lastSeen: new Date(),
      lastScannedAt: new Date(),
    })
    .where(eq(assets.id, assetId));
}

async function upsertTech(db: Db, assetId: number, name: string): Promise<void> {
  try {
    const [tech] = await db
      .insert(technologies)
      .values({ name, version: "" })
      .onConflictDoUpdate({
        target: [technologies.name, technologies.version],
        set: {
          icon: sql`CASE WHEN excluded.icon <> '' THEN excluded.icon ELSE ${technologies.icon} END`,
        },
      })
      .returning();
    if (tech) {
      await db
        .insert(assetTechnologies)
        .values({ assetId, technologyId: tech.id })
        .onConflictDoNothing();
    }
  } catch {
    /* ignore */
  }
}
