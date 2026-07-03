import { Worker, Queue } from "bullmq";
import { loadConfig } from "@yaad/config";
import { getDb } from "@yaad/db";
import { getRedisOptions, QUEUES } from "@yaad/queue";
import type { CollectJsJob, AnalyzeJsJob, ScanHttpJob, EnumerateSubdomainsJob } from "@yaad/queue";
import { BlobStore } from "@yaad/storage";
import { processCollectJs, type JsWorkerDeps } from "./processor.js";

async function main(): Promise<void> {
  const config = loadConfig();
  const db = getDb(config.databaseUrl);
  const redisOptions = getRedisOptions(config.redisUrl);

  const analyzeJsQueue = new Queue<AnalyzeJsJob>(QUEUES.ANALYZE_JS, { connection: redisOptions });
  const scanQueue = new Queue<ScanHttpJob>(QUEUES.SCAN_HTTP, { connection: redisOptions });
  const enumerateQueue = new Queue<EnumerateSubdomainsJob>(QUEUES.ENUMERATE_SUBDOMAINS, {
    connection: redisOptions,
  });

  const store = config.storeJsBlobs ? new BlobStore(config.storage) : null;

  const deps: JsWorkerDeps = {
    db,
    store,
    analyzeJsQueue,
    scanQueue,
    enumerateQueue,
    jsMaxBytes: config.jsMaxBytes,
    storeJsBlobs: config.storeJsBlobs,
    maxRecursionDepth: config.maxRecursionDepth,
  };

  const worker = new Worker<CollectJsJob>(
    QUEUES.COLLECT_JS,
    async (job) => {
      await processCollectJs(job, deps);
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
