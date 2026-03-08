import { Queue } from "bullmq";
import type { Db } from "@yaad/db";
import { assets } from "@yaad/db";
import { QUEUES, DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import type { ScanHttpJob, EnumerateSubdomainsJob } from "@yaad/queue";
import { runSubfinder } from "./runner.js";
import { getSubdomainsFromPDCP } from "./pdcp.js";

export async function processEnumerateSubdomains(
  job: { data: EnumerateSubdomainsJob },
  db: Db,
  scanQueue: Queue<ScanHttpJob>,
  pdcpApiKey?: string
): Promise<void> {
  const { domain, scopeId } = job.data;

  console.log(JSON.stringify({ level: "info", msg: `Enumerating subdomains for ${domain}` }));

  const tasks: Promise<string[]>[] = [runSubfinder(domain)];
  if (pdcpApiKey) {
    tasks.push(getSubdomainsFromPDCP(domain, pdcpApiKey));
  }

  const results = await Promise.allSettled(tasks);
  const allSubdomains = new Set<string>();

  for (const result of results) {
    if (result.status === "fulfilled") {
      result.value.forEach((s) => allSubdomains.add(s));
    } else {
      console.error(JSON.stringify({ level: "warn", msg: "Subdomain task failed", error: String(result.reason) }));
    }
  }

  console.log(
    JSON.stringify({ level: "info", msg: `Found ${allSubdomains.size} subdomains for ${domain}` })
  );

  for (const subdomain of allSubdomains) {
    try {
      const [inserted] = await db
        .insert(assets)
        .values({ scopeId, domain: subdomain })
        .onConflictDoUpdate({
          target: assets.domain,
          set: { lastSeen: new Date() },
        })
        .returning();

      if (inserted) {
        await scanQueue.add(
          "scan_http",
          { domain: subdomain, assetId: inserted.id },
          DEFAULT_JOB_OPTIONS
        );
      }
    } catch (err) {
      console.error(
        JSON.stringify({ level: "warn", msg: `Failed to upsert asset ${subdomain}`, error: String(err) })
      );
    }
  }
}
