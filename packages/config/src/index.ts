export interface StorageSettings {
  endpoint: string;
  accessKey: string;
  secretKey: string;
  bucket: string;
  useSSL: boolean;
}

export interface AppConfig {
  databaseUrl: string;
  redisUrl: string;
  cultivateApiUrl: string;
  logLevel: string;
  confidenceThreshold: number;
  workerConcurrency: number;
  techWorkerConcurrency: number;
  port: number;
  pdcpApiKey?: string;
  // Enumeration
  maxRecursionDepth: number;
  crtShEnabled: boolean;
  gauEnabled: boolean;
  // JS storage
  storage: StorageSettings;
  jsMaxBytes: number;
  storeJsBlobs: boolean;
  // Continuous re-scan scheduler
  scheduler: SchedulerSettings;
}

export interface SchedulerSettings {
  // How often the scheduler wakes up to look for stale rows.
  tickMs: number;
  // Max rows re-enqueued per stage per tick (spreads load, avoids thundering herd).
  batchSize: number;
  // Re-run subdomain enumeration for a wildcard scope after this many hours.
  enumIntervalHours: number;
  // Re-run http scan (→ js → tech) for a known asset after this many hours.
  rescanIntervalHours: number;
}

function boolEnv(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  return value === "1" || value.toLowerCase() === "true";
}

export function loadConfig(): AppConfig {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is required");

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) throw new Error("REDIS_URL is required");

  return {
    databaseUrl,
    redisUrl,
    cultivateApiUrl: process.env.CULTIVATE_API_URL ?? "http://cultivate-api:3000",
    logLevel: process.env.LOG_LEVEL ?? "info",
    confidenceThreshold: parseInt(process.env.CONFIDENCE_THRESHOLD ?? "50", 10),
    workerConcurrency: parseInt(process.env.WORKER_CONCURRENCY ?? "5", 10),
    techWorkerConcurrency: parseInt(process.env.TECH_WORKER_CONCURRENCY ?? "3", 10),
    port: parseInt(process.env.PORT ?? "3000", 10),
    pdcpApiKey: process.env.PDCP_API_KEY,
    maxRecursionDepth: parseInt(process.env.MAX_RECURSION_DEPTH ?? "2", 10),
    crtShEnabled: boolEnv(process.env.CRTSH_ENABLED, true),
    gauEnabled: boolEnv(process.env.GAU_ENABLED, true),
    storage: {
      endpoint: process.env.S3_ENDPOINT ?? "minio:9000",
      accessKey: process.env.S3_ACCESS_KEY ?? "yaad",
      secretKey: process.env.S3_SECRET_KEY ?? "yaadyaad",
      bucket: process.env.S3_BUCKET ?? "js-blobs",
      useSSL: boolEnv(process.env.S3_USE_SSL, false),
    },
    jsMaxBytes: parseInt(process.env.JS_MAX_BYTES ?? "10485760", 10), // 10 MB
    storeJsBlobs: boolEnv(process.env.STORE_JS_BLOBS, true),
    scheduler: {
      tickMs: parseInt(process.env.SCHEDULER_TICK_MS ?? "900000", 10), // 15 min
      batchSize: parseInt(process.env.SCHEDULER_BATCH_SIZE ?? "500", 10),
      enumIntervalHours: parseInt(process.env.RESCAN_ENUM_INTERVAL_HOURS ?? "168", 10), // 7 days
      rescanIntervalHours: parseInt(process.env.RESCAN_HTTP_INTERVAL_HOURS ?? "24", 10), // 1 day
    },
  };
}
