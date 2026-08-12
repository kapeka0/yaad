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
import type { ScanHttpJob } from "@yaad/queue";
import { programs, scopes, assets, type Scope } from "@yaad/db";
import { eq, inArray, sql } from "drizzle-orm";
import { normalizeAssetDomain } from "@yaad/types";

export const runtime = "nodejs";

function findMatchingScope(domain: string, programScopes: Scope[]): Scope | undefined {
  // Try exact match first
  const exactMatch = programScopes.find(s => !s.wildcard && s.asset.toLowerCase() === domain);
  if (exactMatch) return exactMatch;

  // Try wildcard match (e.g. *.target.com matches sub.target.com and target.com)
  const wildcardMatch = programScopes.find(s => {
    if (!s.wildcard) return false;
    const base = s.asset.replace(/^\*\./, "").toLowerCase();
    return domain === base || domain.endsWith("." + base);
  });
  return wildcardMatch;
}

export async function POST(req: NextRequest) {
  let scanQueue: Queue<ScanHttpJob> | undefined;
  try {
    const body = await req.json();
    const { programId: rawProgramId, subdomains: rawSubdomains } = body;

    const programId = parseInt(rawProgramId, 10);
    if (isNaN(programId)) {
      return NextResponse.json({ error: "Invalid or missing programId" }, { status: 400 });
    }

    const subdomainsList = typeof rawSubdomains === "string"
      ? rawSubdomains.split("\n").map(s => s.trim()).filter(Boolean)
      : Array.isArray(rawSubdomains)
        ? rawSubdomains.map(s => s.trim()).filter(Boolean)
        : [];

    if (subdomainsList.length === 0) {
      return NextResponse.json({ error: "No subdomains provided" }, { status: 400 });
    }

    const dbInstance = getDbInstance();
    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      return NextResponse.json({ error: "REDIS_URL not configured" }, { status: 500 });
    }
    const redisOptions = getRedisOptions(redisUrl);

    // 1. Verify program exists
    const programExists = await dbInstance
      .select({ id: programs.id })
      .from(programs)
      .where(eq(programs.id, programId))
      .limit(1);

    if (programExists.length === 0) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    // 2. Fetch program scopes
    const programScopes = await dbInstance
      .select()
      .from(scopes)
      .where(eq(scopes.programId, programId));

    scanQueue = new Queue<ScanHttpJob>(QUEUES.SCAN_HTTP, { connection: redisOptions });
    let linkedAssets = 0;
    let newAssets = 0;
    let skippedAssets = 0;
    let enqueuedJobs = 0;
    const scanCandidates = new Map<number, string>();

    for (const rawSub of subdomainsList) {
      const domain = normalizeAssetDomain(rawSub);
      if (!domain) {
        skippedAssets++;
        continue;
      }

      // 3. Match against program scopes or create new scope
      const matchedScope = findMatchingScope(domain, programScopes);
      let scopeId = matchedScope?.id;

      if (!matchedScope) {
        // Create an exact scope for this domain
        const [newScope] = await dbInstance
          .insert(scopes)
          .values({
            programId,
            asset: domain,
            type: "domain",
            wildcard: false,
            inScope: true,
          })
          .returning();
        
        if (newScope) {
          scopeId = newScope.id;
          // Add to local list to match subsequent subdomains if needed
          programScopes.push(newScope);
        }
      }

      if (!scopeId) continue;

      // 4. Upsert Asset
      const [asset] = await dbInstance
        .insert(assets)
        .values({
          scopeId,
          domain,
          source: "manual",
        })
        .onConflictDoUpdate({
          target: assets.domain,
          // A manual import is an explicit program assignment. Existing
          // domains (including previously unscoped discoveries) must be
          // linked to the selected program instead of only being touched.
          set: { scopeId, source: "manual", lastSeen: new Date() },
        })
        .returning({
          id: assets.id,
          resolved: assets.resolved,
          lastScannedAt: assets.lastScannedAt,
          isNew: sql<boolean>`(xmax = 0)`,
        });

      if (asset) {
        linkedAssets++;
        if (asset.isNew) newAssets++;
        if (shouldQueueAssetScan(asset)) scanCandidates.set(asset.id, domain);
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
      enqueuedJobs = candidates.length;
    }

    return NextResponse.json({
      success: true,
      processed: subdomainsList.length,
      linked: linkedAssets,
      inserted: newAssets,
      skipped: skippedAssets,
      enqueued: enqueuedJobs,
    });
  } catch (err: unknown) {
    console.error("Failed to ingest subdomains in bulk:", err);
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  } finally {
    await scanQueue?.close().catch(() => undefined);
  }
}
