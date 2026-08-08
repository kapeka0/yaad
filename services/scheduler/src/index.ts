import { Queue } from "bullmq";
import { loadConfig } from "@yaad/config";
import { getDb } from "@yaad/db";
import { getRedisOptions, installGracefulShutdown, QUEUES } from "@yaad/queue";
import type {
  AnalyzeJsJob,
  CollectJsJob,
  DetectTechnologyJob,
  EnumerateSubdomainsJob,
  ScanHttpJob,
} from "@yaad/queue";
import { runTick } from "./refresher.js";

function log(level: string, msg: string, extra: Record<string, unknown> = {}): void {
  console.log(JSON.stringify({ level, msg, ...extra }));
}

async function main(): Promise<void> {
  const config = loadConfig();
  const db = getDb(config.databaseUrl);
  const redisOptions = getRedisOptions(config.redisUrl);
  const { scheduler } = config;

  const enumerateQueue = new Queue<EnumerateSubdomainsJob>(QUEUES.ENUMERATE_SUBDOMAINS, {
    connection: redisOptions,
  });
  const scanQueue = new Queue<ScanHttpJob>(QUEUES.SCAN_HTTP, { connection: redisOptions });
  const collectJsQueue = new Queue<CollectJsJob>(QUEUES.COLLECT_JS, { connection: redisOptions });
  const analyzeJsQueue = new Queue<AnalyzeJsJob>(QUEUES.ANALYZE_JS, { connection: redisOptions });
  const detectTechQueue = new Queue<DetectTechnologyJob>(QUEUES.DETECT_TECHNOLOGY, {
    connection: redisOptions,
  });
  const downstreamQueues = [
    { queue: collectJsQueue, maxDepth: scheduler.maxCollectQueueDepth },
    { queue: analyzeJsQueue, maxDepth: scheduler.maxAnalyzeQueueDepth },
    { queue: detectTechQueue, maxDepth: scheduler.maxTechQueueDepth },
  ];

  log("info", "Scheduler started", {
    tickMs: scheduler.tickMs,
    batchSize: scheduler.batchSize,
    enumIntervalHours: scheduler.enumIntervalHours,
    rescanIntervalHours: scheduler.rescanIntervalHours,
    retryIntervalHours: scheduler.retryIntervalHours,
    maxEnumQueueDepth: scheduler.maxEnumQueueDepth,
    maxScanQueueDepth: scheduler.maxScanQueueDepth,
    maxCollectQueueDepth: scheduler.maxCollectQueueDepth,
    maxAnalyzeQueueDepth: scheduler.maxAnalyzeQueueDepth,
    maxTechQueueDepth: scheduler.maxTechQueueDepth,
  });

  let running = false;
  const tick = async (): Promise<void> => {
    // Skip overlapping ticks if a batch runs long.
    if (running) {
      log("warn", "Previous tick still running, skipping");
      return;
    }
    running = true;
    try {
      await runTick(
        db,
        enumerateQueue,
        scanQueue,
        detectTechQueue,
        scheduler,
        downstreamQueues
      );
    } catch (err) {
      log("error", "Scheduler tick failed", { error: String(err) });
    } finally {
      running = false;
    }
  };

  // Run once at startup, then on the configured interval.
  await tick();
  const interval = setInterval(() => void tick(), scheduler.tickMs);
  installGracefulShutdown("scheduler", [
    { close: async () => clearInterval(interval) },
    enumerateQueue,
    scanQueue,
    collectJsQueue,
    analyzeJsQueue,
    detectTechQueue,
  ]);
}

main().catch((err) => {
  log("fatal", "Unexpected error", { error: String(err) });
  process.exit(1);
});
