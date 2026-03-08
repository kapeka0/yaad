import { Queue } from "bullmq";
import type { Db } from "@yaad/db";
import { javascriptFiles } from "@yaad/db";
import { QUEUES, DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import type { CollectJsJob, AnalyzeJsJob } from "@yaad/queue";
import { runGetJS } from "./runner.js";

export async function processCollectJs(
  job: { data: CollectJsJob },
  db: Db,
  analyzeJsQueue: Queue<AnalyzeJsJob>
): Promise<void> {
  const { url, serviceId } = job.data;

  console.log(JSON.stringify({ level: "info", msg: `Collecting JS from ${url}` }));

  const jsUrls = await runGetJS(url);

  for (const jsUrl of jsUrls) {
    try {
      const [jsFile] = await db
        .insert(javascriptFiles)
        .values({ serviceId, url: jsUrl })
        .onConflictDoNothing()
        .returning();

      if (jsFile) {
        await analyzeJsQueue.add(
          "analyze_js",
          { jsUrl: jsFile.url, jsId: jsFile.id },
          DEFAULT_JOB_OPTIONS
        );
      }
    } catch (err) {
      console.error(
        JSON.stringify({ level: "warn", msg: `Failed to upsert JS file ${jsUrl}`, error: String(err) })
      );
    }
  }
}
