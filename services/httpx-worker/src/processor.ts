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

      // Keep the asset's resolved IP fresh.
      if (result.ip) {
        await db
          .update(assets)
          .set({ ip: result.ip, resolved: true, lastSeen: new Date() })
          .where(eq(assets.id, assetId));
      }

      if (service) {
        // Persist httpx-detected technologies directly (fast, no extra fetch).
        for (const techName of result.tech ?? []) {
          await upsertTech(db, assetId, techName);
        }

        await collectJsQueue.add(
          "collect_js",
          { url: result.url, serviceId: service.id },
          DEFAULT_JOB_OPTIONS
        );
        await detectTechQueue.add(
          "detect_technology",
          { url: result.url, assetId },
          DEFAULT_JOB_OPTIONS
        );
      }
    } catch (err) {
      console.error(
        JSON.stringify({ level: "warn", msg: `Failed to upsert service ${result.url}`, error: String(err) })
      );
    }
  }
}

async function upsertTech(db: Db, assetId: number, name: string): Promise<void> {
  try {
    const [tech] = await db
      .insert(technologies)
      .values({ name, version: "" })
      .onConflictDoUpdate({
        target: [technologies.name, technologies.version],
        set: { icon: sql`excluded.icon` },
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
