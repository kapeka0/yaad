import { Queue } from "bullmq";
import { eq, sql } from "drizzle-orm";
import type { Db } from "@yaad/db";
import { programs, scopes, assets } from "@yaad/db";
import { DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import type { EnumerateSubdomainsJob, ScanHttpJob } from "@yaad/queue";
import { normalizeAssetDomain, type NormalizedProgram } from "@yaad/types";

export async function updateProgramUrls(
  db: Db,
  normalizedPrograms: NormalizedProgram[],
): Promise<number> {
  let updatedCount = 0;

  for (const program of normalizedPrograms) {
    if (!program.url) continue;
    const updated = await db
      .update(programs)
      .set({ url: program.url })
      .where(eq(programs.name, program.programName))
      .returning({ id: programs.id });
    updatedCount += updated.length;
  }

  return updatedCount;
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
      .values({
        name: prog.programName,
        platform: prog.platform,
        url: prog.url,
        offersReward: prog.offersReward ?? true,
      })
      .onConflictDoUpdate({
        target: programs.name,
        set: {
          platform: prog.platform,
          url: prog.url,
          offersReward: prog.offersReward ?? true,
        },
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
        .returning({ id: scopes.id, isNew: sql<boolean>`(xmax = 0)` });

      if (!insertedScope || !scope.inScope) continue;

      if (scope.wildcard) {
        if (!insertedScope.isNew) continue;
        const baseDomain = normalizeAssetDomain(scope.asset);
        if (!baseDomain) continue;
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
        if (!domain) continue;
        const [asset] = await db
          .insert(assets)
          .values({
            scopeId: insertedScope.id,
            domain,
          })
          .onConflictDoUpdate({
            target: assets.domain,
            // Importing a root scope is an explicit ownership decision.
            set: { scopeId: insertedScope.id, lastSeen: new Date() },
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
