import { Queue } from "bullmq";
import type { Db } from "@yaad/db";
import { endpoints, assets } from "@yaad/db";
import { QUEUES, DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import type { AnalyzeJsJob, ScanHttpJob, DetectTechnologyJob } from "@yaad/queue";
import { runLinkfinder } from "./runner.js";

function extractHostname(endpoint: string): string | null {
  try {
    if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
      const url = new URL(endpoint);
      return url.hostname;
    }
  } catch {
    // not a valid absolute URL
  }
  return null;
}

export async function processAnalyzeJs(
  job: { data: AnalyzeJsJob },
  db: Db,
  scanQueue: Queue<ScanHttpJob>,
  detectTechQueue: Queue<DetectTechnologyJob>
): Promise<void> {
  const { jsUrl, jsId } = job.data;

  console.log(JSON.stringify({ level: "info", msg: `Analyzing JS ${jsUrl}` }));

  const foundEndpoints = await runLinkfinder(jsUrl);

  for (const endpoint of foundEndpoints) {
    try {
      await db
        .insert(endpoints)
        .values({ jsId, endpoint })
        .onConflictDoNothing();
    } catch {
      // ignore
    }

    // Extract hostnames from absolute URLs and treat as new assets
    const hostname = extractHostname(endpoint);
    if (hostname) {
      try {
        const [asset] = await db
          .insert(assets)
          .values({ scopeId: null, domain: hostname })
          .onConflictDoUpdate({
            target: assets.domain,
            set: { lastSeen: new Date() },
          })
          .returning();

        if (asset) {
          await scanQueue.add(
            "scan_http",
            { domain: hostname, assetId: asset.id },
            DEFAULT_JOB_OPTIONS
          );
          await detectTechQueue.add(
            "detect_technology",
            { url: endpoint, assetId: asset.id },
            DEFAULT_JOB_OPTIONS
          );
        }
      } catch (err) {
        console.error(
          JSON.stringify({ level: "warn", msg: `Failed to process hostname ${hostname}`, error: String(err) })
        );
      }
    }
  }
}
