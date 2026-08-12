import { Queue } from "bullmq";
import { eq, inArray, sql } from "drizzle-orm";
import type { Db } from "@yaad/db";
import { programs, scopes, assets } from "@yaad/db";
import {
  DEFAULT_JOB_OPTIONS,
  getAssetScanJobId,
  shouldQueueAssetScan,
} from "@yaad/queue";
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
  const scanCandidates = new Map<number, string>();

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
          .returning({
            id: assets.id,
            resolved: assets.resolved,
            lastScannedAt: assets.lastScannedAt,
            isNew: sql<boolean>`(xmax = 0)`,
          });

        // Existing discoveries can be linked to a program before their first
        // successful scan, so ownership changes must also recover them.
        if (asset && shouldQueueAssetScan(asset)) scanCandidates.set(asset.id, domain);
      }
    }
  }

  if (scanCandidates.size > 0) {
    const attemptedAt = new Date();
    const retryIntervalHours =
      Number.parseInt(process.env.SCHEDULER_RETRY_INTERVAL_HOURS ?? "6", 10) || 6;
    const candidates = [...scanCandidates.entries()];
    await scanQueue.addBulk(
      candidates.map(([assetId, domain]) => ({
        name: "scan_http",
        data: { domain, assetId },
        opts: {
          ...DEFAULT_JOB_OPTIONS,
          jobId: getAssetScanJobId(assetId, attemptedAt, retryIntervalHours),
        },
      }))
    );
    await db
      .update(assets)
      .set({ lastScanAttemptAt: attemptedAt })
      .where(inArray(assets.id, candidates.map(([assetId]) => assetId)));
  }
}
