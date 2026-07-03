import { Queue } from "bullmq";
import { sql } from "drizzle-orm";
import type { Db } from "@yaad/db";
import { programs, scopes, assets } from "@yaad/db";
import { DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import type { EnumerateSubdomainsJob, ScanHttpJob } from "@yaad/queue";
import type { NormalizedProgram } from "@yaad/types";

function normalizeAssetDomain(raw: string): string {
  try {
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      return new URL(raw).hostname;
    }
  } catch { /* not a valid URL, use as-is */ }
  return raw;
}

export async function importPrograms(
  db: Db,
  normalizedPrograms: NormalizedProgram[],
  enumerateQueue: Queue<EnumerateSubdomainsJob>,
  scanQueue: Queue<ScanHttpJob>
): Promise<void> {
  for (const prog of normalizedPrograms) {
    // Upsert program
    const [program] = await db
      .insert(programs)
      .values({ name: prog.programName, platform: prog.platform, offersReward: prog.offersReward ?? true })
      .onConflictDoUpdate({
        target: programs.name,
        set: { platform: prog.platform, offersReward: prog.offersReward ?? true },
      })
      .returning();

    if (!program) continue;

    for (const scope of prog.scopes) {
      // Upsert scope
      const [insertedScope] = await db
        .insert(scopes)
        .values({
          programId: program.id,
          asset: scope.asset,
          type: scope.type,
          wildcard: scope.wildcard,
          inScope: scope.inScope,
        })
        .onConflictDoUpdate({
          target: [scopes.programId, scopes.asset],
          set: { type: scope.type, wildcard: scope.wildcard, inScope: scope.inScope },
        })
        .returning();

      if (!insertedScope || !scope.inScope) continue;

      if (scope.wildcard) {
        // Strip the *. prefix for subfinder
        const baseDomain = scope.asset.replace(/^\*\./, "");
        await enumerateQueue.add(
          "enumerate_subdomains",
          { domain: baseDomain, scopeId: insertedScope.id },
          DEFAULT_JOB_OPTIONS
        );
      } else {
        // Determine if this is a domain-type scope worth scanning
        const t = scope.type.toLowerCase();
        const isDomain =
          t.includes("domain") || t.includes("url") || t.includes("wildcard");

        if (!isDomain) continue;

        // Non-wildcard domain: upsert asset and enqueue scan_http
        const domain = normalizeAssetDomain(scope.asset);
        const [asset] = await db
          .insert(assets)
          .values({
            scopeId: insertedScope.id,
            domain,
          })
          .onConflictDoUpdate({
            target: assets.domain,
            set: { lastSeen: new Date() },
          })
          .returning({ id: assets.id, isNew: sql<boolean>`(xmax = 0)` });

        // Scan newly imported roots immediately; re-imports just refresh
        // last_seen and let the scheduler drive periodic re-scans.
        if (asset?.isNew) {
          await scanQueue.add(
            "scan_http",
            { domain, assetId: asset.id },
            DEFAULT_JOB_OPTIONS
          );
        }
      }
    }
  }
}
