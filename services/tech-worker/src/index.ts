import { Worker } from "bullmq";
import { loadConfig } from "@yaad/config";
import { getDb } from "@yaad/db";
import { getRedisOptions, QUEUES } from "@yaad/queue";
import type { DetectTechnologyJob } from "@yaad/queue";
import { processDetectTechnology } from "./processor.js";

async function main(): Promise<void> {
  const config = loadConfig();
  const db = getDb(config.databaseUrl);
  const redisOptions = getRedisOptions(config.redisUrl);

  const worker = new Worker<DetectTechnologyJob>(
    QUEUES.DETECT_TECHNOLOGY,
    async (job) => {
      await processDetectTechnology(
        job,
        db,
        config.cultivateApiUrl,
        config.confidenceThreshold
      );
    },
    {
      connection: redisOptions,
      concurrency: config.techWorkerConcurrency,
    }
  );

  worker.on("completed", (job) => {
    console.log(JSON.stringify({ level: "info", msg: `Job ${job.id} completed` }));
  });

  worker.on("failed", (job, err) => {
    console.error(JSON.stringify({ level: "error", msg: `Job ${job?.id} failed`, error: String(err) }));
  });

  console.log(JSON.stringify({ level: "info", msg: "Tech detection worker started" }));
}

main().catch((err) => {
  console.error(JSON.stringify({ level: "fatal", error: String(err) }));
  process.exit(1);
});
