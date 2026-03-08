import { Queue } from "bullmq";
import type { Db } from "@yaad/db";
import { programs, scopes, assets } from "@yaad/db";
import { DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import type { EnumerateSubdomainsJob, ScanHttpJob } from "@yaad/queue";
import type { NormalizedProgram } from "@yaad/types";

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
        const [asset] = await db
          .insert(assets)
          .values({
            scopeId: insertedScope.id,
            domain: scope.asset,
          })
          .onConflictDoUpdate({
            target: assets.domain,
            set: { lastSeen: new Date(), scopeId: insertedScope.id },
          })
          .returning();

        if (asset) {
          await scanQueue.add(
            "scan_http",
            { domain: scope.asset, assetId: asset.id },
            DEFAULT_JOB_OPTIONS
          );
        }
      }
    }
  }
}
