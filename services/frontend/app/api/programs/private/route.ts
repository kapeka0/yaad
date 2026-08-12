import { NextRequest, NextResponse } from "next/server";
import { Queue } from "bullmq";
import { db as getDbInstance } from "@/lib/db";
import {
  getRedisOptions,
  QUEUES,
  DEFAULT_JOB_OPTIONS,
  getAssetScanJobId,
  shouldQueueAssetScan,
} from "@yaad/queue";
import type { EnumerateSubdomainsJob, ScanHttpJob } from "@yaad/queue";
import { programs, scopes, assets, type Scope } from "@yaad/db";
import { inArray, sql } from "drizzle-orm";
import { normalizeAssetDomain } from "@yaad/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let enumerateQueue: Queue<EnumerateSubdomainsJob> | undefined;
  let scanQueue: Queue<ScanHttpJob> | undefined;
  try {
    const body = await req.json();
    const { name, platform, offersReward, scopes: rawScopes } = body;

    if (!name || !platform) {
      return NextResponse.json({ error: "Program name and platform are required" }, { status: 400 });
    }

    const scopeList = typeof rawScopes === "string"
      ? rawScopes.split("\n").map(s => s.trim()).filter(Boolean)
      : Array.isArray(rawScopes)
        ? rawScopes.map(s => s.trim()).filter(Boolean)
        : [];

    const dbInstance = getDbInstance();
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      return NextResponse.json({ error: "REDIS_URL not configured" }, { status: 500 });
    }
    const redisOptions = getRedisOptions(redisUrl);

    // Instantiate queues
    enumerateQueue = new Queue<EnumerateSubdomainsJob>(QUEUES.ENUMERATE_SUBDOMAINS, { connection: redisOptions });
    scanQueue = new Queue<ScanHttpJob>(QUEUES.SCAN_HTTP, { connection: redisOptions });

    // 1. Upsert program
    const [program] = await dbInstance
      .insert(programs)
      .values({
        name,
        platform,
        offersReward: offersReward !== false,
      })
      .onConflictDoUpdate({
        target: programs.name,
        set: { platform, offersReward: offersReward !== false },
      })
      .returning();

    if (!program) {
      throw new Error("Failed to insert or retrieve program");
    }

    const importedScopes: Scope[] = [];
    const enqueuedJobsCount = { enumerate: 0, scan: 0 };
    const scanCandidates = new Map<number, string>();

    for (const scopeStr of scopeList) {
      const domain = normalizeAssetDomain(scopeStr);
      if (!domain) continue;
      const isWildcard = /^\*+\.?/.test(scopeStr);
      const scopeAsset = isWildcard ? `*.${domain}` : domain;
      const type = "domain"; // Default to domain for manual inputs

      // 2. Upsert scope
      const [insertedScope] = await dbInstance
        .insert(scopes)
        .values({
          programId: program.id,
          asset: scopeAsset,
          type,
          wildcard: isWildcard,
          inScope: true,
        })
        .onConflictDoUpdate({
          target: [scopes.programId, scopes.asset],
          set: { type, wildcard: isWildcard, inScope: true },
        })
        .returning();

      if (!insertedScope) continue;
      importedScopes.push(insertedScope);

      if (isWildcard) {
        // Enqueue wildcard subdomain enumeration
        await enumerateQueue.add(
          "enumerate_subdomains",
          { domain, scopeId: insertedScope.id },
          DEFAULT_JOB_OPTIONS
        );
        enqueuedJobsCount.enumerate++;
      } else {
        // Non-wildcard domain: upsert asset and enqueue scan_http
        const [asset] = await dbInstance
          .insert(assets)
          .values({
            scopeId: insertedScope.id,
            domain,
            source: "manual",
          })
          .onConflictDoUpdate({
            target: assets.domain,
            set: { scopeId: insertedScope.id, source: "manual", lastSeen: new Date() },
          })
          .returning({
            id: assets.id,
            resolved: assets.resolved,
            lastScannedAt: assets.lastScannedAt,
            isNew: sql<boolean>`(xmax = 0)`,
          });

        if (asset && shouldQueueAssetScan(asset)) scanCandidates.set(asset.id, domain);
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
      await dbInstance
        .update(assets)
        .set({ lastScanAttemptAt: attemptedAt })
        .where(inArray(assets.id, candidates.map(([assetId]) => assetId)));
      enqueuedJobsCount.scan = candidates.length;
    }

    return NextResponse.json({
      success: true,
      program,
      scopesCount: importedScopes.length,
      jobs: enqueuedJobsCount,
    });
  } catch (err: unknown) {
    console.error("Failed to import private program:", err);
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  } finally {
    await Promise.allSettled([
      enumerateQueue?.close() ?? Promise.resolve(),
      scanQueue?.close() ?? Promise.resolve(),
    ]);
  }
}
