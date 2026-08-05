import { Queue } from "bullmq";
import { loadConfig } from "@yaad/config";
import { getDb } from "@yaad/db";
import { getRedisOptions, QUEUES } from "@yaad/queue";
import type { EnumerateSubdomainsJob, ScanHttpJob } from "@yaad/queue";
import { fetchPlatformData, PLATFORMS } from "./fetcher.js";
import { parsePlatformData } from "./parser.js";
import { importPrograms, updateProgramUrls } from "./importer.js";

const SLEEP_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24h

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runProgramUrlImport(): Promise<void> {
  const config = loadConfig();
  const db = getDb(config.databaseUrl);
  let updatedPrograms = 0;

  for (const platform of PLATFORMS) {
    const raw = await fetchPlatformData(platform);
    const normalized = parsePlatformData(platform, raw);
    updatedPrograms += await updateProgramUrls(db, normalized);
  }

  console.log(
    JSON.stringify({ level: "info", msg: `Updated URLs for ${updatedPrograms} existing programs` }),
  );
}

async function runImport(): Promise<void> {
  const config = loadConfig();
  const db = getDb(config.databaseUrl);
  const redisOptions = getRedisOptions(config.redisUrl);

  const enumerateQueue = new Queue<EnumerateSubdomainsJob>(
    QUEUES.ENUMERATE_SUBDOMAINS,
    { connection: redisOptions }
  );
  const scanQueue = new Queue<ScanHttpJob>(QUEUES.SCAN_HTTP, { connection: redisOptions });

  let totalPrograms = 0;

  for (const platform of PLATFORMS) {
    try {
      console.log(JSON.stringify({ level: "info", msg: `Fetching ${platform}...` }));
      const raw = await fetchPlatformData(platform);
      const normalized = parsePlatformData(platform, raw);
      await importPrograms(db, normalized, enumerateQueue, scanQueue);
      totalPrograms += normalized.length;
      console.log(
        JSON.stringify({ level: "info", msg: `Imported ${normalized.length} programs from ${platform}` })
      );
    } catch (err) {
      console.error(
        JSON.stringify({ level: "error", msg: `Failed to import ${platform}`, error: String(err) })
      );
    }
  }

  await enumerateQueue.close();
  await scanQueue.close();
  console.log(JSON.stringify({ level: "info", msg: `Import complete: ${totalPrograms} total programs` }));
}

async function main(): Promise<void> {
  console.log(JSON.stringify({ level: "info", msg: "Scope importer starting..." }));

  if (process.env.PROGRAM_URLS_ONLY === "true") {
    await runProgramUrlImport();
    process.exit(0);
  }

  while (true) {
    try {
      await runImport();
    } catch (err) {
      console.error(JSON.stringify({ level: "error", msg: "Import cycle failed", error: String(err) }));
    }
    console.log(JSON.stringify({ level: "info", msg: `Sleeping ${SLEEP_INTERVAL_MS / 1000}s until next import` }));
    await sleep(SLEEP_INTERVAL_MS);
  }
}

main().catch((err) => {
  console.error(JSON.stringify({ level: "fatal", msg: "Unexpected error", error: String(err) }));
  process.exit(1);
});
