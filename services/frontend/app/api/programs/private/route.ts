import { NextRequest, NextResponse } from "next/server";
import { Queue } from "bullmq";
import { db as getDbInstance } from "@/lib/db";
import { getRedisOptions, QUEUES, DEFAULT_JOB_OPTIONS } from "@yaad/queue";
import { programs, scopes, assets, type Scope } from "@yaad/db";
import { sql } from "drizzle-orm";

export const runtime = "nodejs";

function normalizeAssetDomain(raw: string): string {
  try {
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      return new URL(raw).hostname;
    }
  } catch { /* ignore */ }
  return raw.trim();
}

export async function POST(req: NextRequest) {
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
    const enumerateQueue = new Queue(QUEUES.ENUMERATE_SUBDOMAINS, { connection: redisOptions });
    const scanQueue = new Queue(QUEUES.SCAN_HTTP, { connection: redisOptions });

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

    for (const scopeStr of scopeList) {
      const isWildcard = scopeStr.startsWith("*.");
      const type = "domain"; // Default to domain for manual inputs

      // 2. Upsert scope
      const [insertedScope] = await dbInstance
        .insert(scopes)
        .values({
          programId: program.id,
          asset: scopeStr,
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
        const baseDomain = scopeStr.replace(/^\*\./, "");
        await enumerateQueue.add(
          "enumerate_subdomains",
          { domain: baseDomain, scopeId: insertedScope.id },
          DEFAULT_JOB_OPTIONS
        );
        enqueuedJobsCount.enumerate++;
      } else {
        // Non-wildcard domain: upsert asset and enqueue scan_http
        const domain = normalizeAssetDomain(scopeStr);
        const [asset] = await dbInstance
          .insert(assets)
          .values({
            scopeId: insertedScope.id,
            domain,
            source: "manual",
          })
          .onConflictDoUpdate({
            target: assets.domain,
            set: { lastSeen: new Date() },
          })
          .returning({ id: assets.id, isNew: sql<boolean>`(xmax = 0)` });

        if (asset?.isNew) {
          await scanQueue.add(
            "scan_http",
            { domain, assetId: asset.id },
            DEFAULT_JOB_OPTIONS
          );
          enqueuedJobsCount.scan++;
        }
      }
    }

    // Close queues to free up connections
    await enumerateQueue.close();
    await scanQueue.close();

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
  }
}
