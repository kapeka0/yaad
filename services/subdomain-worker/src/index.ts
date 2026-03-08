import { Worker, Queue } from "bullmq";
import { loadConfig } from "@yaad/config";
import { getDb } from "@yaad/db";
import { getRedisOptions, QUEUES } from "@yaad/queue";
import type { EnumerateSubdomainsJob, ScanHttpJob } from "@yaad/queue";
import { processEnumerateSubdomains } from "./processor.js";

async function main(): Promise<void> {
  const config = loadConfig();
  const db = getDb(config.databaseUrl);
  const redisOptions = getRedisOptions(config.redisUrl);

  const scanQueue = new Queue<ScanHttpJob>(QUEUES.SCAN_HTTP, { connection: redisOptions });

  const worker = new Worker<EnumerateSubdomainsJob>(
    QUEUES.ENUMERATE_SUBDOMAINS,
    async (job) => {
      await processEnumerateSubdomains(job, db, scanQueue, config.pdcpApiKey);
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

  console.log(JSON.stringify({ level: "info", msg: "Subdomain worker started" }));
}

main().catch((err) => {
  console.error(JSON.stringify({ level: "fatal", error: String(err) }));
  process.exit(1);
});
