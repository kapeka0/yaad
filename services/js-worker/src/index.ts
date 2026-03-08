import { Worker, Queue } from "bullmq";
import { loadConfig } from "@yaad/config";
import { getDb } from "@yaad/db";
import { getRedisOptions, QUEUES } from "@yaad/queue";
import type { CollectJsJob, AnalyzeJsJob } from "@yaad/queue";
import { processCollectJs } from "./processor.js";

async function main(): Promise<void> {
  const config = loadConfig();
  const db = getDb(config.databaseUrl);
  const redisOptions = getRedisOptions(config.redisUrl);

  const analyzeJsQueue = new Queue<AnalyzeJsJob>(QUEUES.ANALYZE_JS, { connection: redisOptions });

  const worker = new Worker<CollectJsJob>(
    QUEUES.COLLECT_JS,
    async (job) => {
      await processCollectJs(job, db, analyzeJsQueue);
    },
    {
      connection: redisOptions,
      concurrency: config.workerConcurrency,
    }
  );

  worker.on("completed", (job) => {
    console.log(JSON.stringify({ level: "info", msg: `Job ${job.id} completed` }));
  });

  worker.on("failed", (job, err) => {
    console.error(JSON.stringify({ level: "error", msg: `Job ${job?.id} failed`, error: String(err) }));
  });

  console.log(JSON.stringify({ level: "info", msg: "JS collection worker started" }));
}

main().catch((err) => {
  console.error(JSON.stringify({ level: "fatal", error: String(err) }));
  process.exit(1);
});
