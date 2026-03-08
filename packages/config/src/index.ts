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
  };
}
