import { Queue } from "bullmq";
import type { Db } from "@yaad/db";
import { webServices } from "@yaad/db";
import { QUEUES, DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import type { ScanHttpJob, CollectJsJob, DetectTechnologyJob } from "@yaad/queue";
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
      const [service] = await db
        .insert(webServices)
        .values({
          assetId,
          url: result.url,
          statusCode: result.statusCode,
          title: result.title,
          lastScanned: new Date(),
        })
        .onConflictDoUpdate({
          target: webServices.url,
          set: {
            statusCode: result.statusCode,
            title: result.title,
            lastScanned: new Date(),
          },
        })
        .returning();

      if (service) {
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
