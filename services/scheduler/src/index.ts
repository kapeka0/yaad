import { Queue } from "bullmq";
import { loadConfig } from "@yaad/config";
import { getDb } from "@yaad/db";
import { getRedisOptions, QUEUES } from "@yaad/queue";
import type { EnumerateSubdomainsJob, ScanHttpJob } from "@yaad/queue";
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

  log("info", "Scheduler started", {
    tickMs: scheduler.tickMs,
    batchSize: scheduler.batchSize,
    enumIntervalHours: scheduler.enumIntervalHours,
    rescanIntervalHours: scheduler.rescanIntervalHours,
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
      await runTick(db, enumerateQueue, scanQueue, scheduler);
    } catch (err) {
      log("error", "Scheduler tick failed", { error: String(err) });
    } finally {
      running = false;
    }
  };

  // Run once at startup, then on the configured interval.
  await tick();
  setInterval(() => void tick(), scheduler.tickMs);
}

main().catch((err) => {
  log("fatal", "Unexpected error", { error: String(err) });
  process.exit(1);
});
