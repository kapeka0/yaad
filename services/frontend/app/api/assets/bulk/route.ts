import { NextRequest, NextResponse } from "next/server";
import { Queue } from "bullmq";
import { db as getDbInstance } from "@/lib/db";
import { getRedisOptions, QUEUES, DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import { programs, scopes, assets, type Scope, type Asset } from "@yaad/db";
import { eq, sql } from "drizzle-orm";
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

    const scanQueue = new Queue(QUEUES.SCAN_HTTP, { connection: redisOptions });
    const insertedAssets: Asset[] = [];
    let newAssets = 0;
    let skippedAssets = 0;
    let enqueuedJobs = 0;

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
        .returning({ id: assets.id, isNew: sql<boolean>`(xmax = 0)` });

      if (asset) {
        // Find full asset object
        const fullAssetRows = await dbInstance
          .select()
          .from(assets)
          .where(eq(assets.id, asset.id))
          .limit(1);
        
        if (fullAssetRows.length > 0) {
          insertedAssets.push(fullAssetRows[0]);
        }
        
        // 5. Enqueue scan if it is a new asset
        if (asset.isNew) {
          newAssets++;
          await scanQueue.add(
            "scan_http",
            { domain, assetId: asset.id },
            DEFAULT_JOB_OPTIONS
          );
          enqueuedJobs++;
        }
      }
    }

    await scanQueue.close();

    return NextResponse.json({
      success: true,
      processed: subdomainsList.length,
      linked: insertedAssets.length,
      inserted: newAssets,
      skipped: skippedAssets,
      enqueued: enqueuedJobs,
    });
  } catch (err: unknown) {
    console.error("Failed to ingest subdomains in bulk:", err);
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
