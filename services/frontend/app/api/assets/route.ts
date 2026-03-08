import { NextRequest, NextResponse } from "next/server";
import { db as getDbInstance } from "@/lib/db";
import { assets, scopes, programs, technologies, assetTechnologies } from "@yaad/db";
import { eq, ilike, gt, and, inArray, sql } from "drizzle-orm";

export const runtime = "nodejs";

interface TechRow {
  assetId: number;
  techId: number;
  techName: string;
  techVersion: string;
  techIcon: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q") ?? undefined;
  const technology = searchParams.get("technology") ?? undefined;
  const platform = searchParams.get("platform") ?? undefined;
  const program = searchParams.get("program") ?? undefined;
  const excludeVdpRaw = searchParams.get("excludeVdp");
  const excludeVdp = excludeVdpRaw === "1" || excludeVdpRaw === "true";
  const cursorStr = searchParams.get("cursor") ?? undefined;
  const cursor = cursorStr ? parseInt(cursorStr, 10) : undefined;
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "30", 10)));

  const dbInstance = getDbInstance();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conditions: any[] = [];
  if (cursor) conditions.push(gt(assets.id, cursor));
  if (q) conditions.push(ilike(assets.domain, `%${q}%`));
  if (platform) conditions.push(eq(programs.platform, platform));
  if (program) conditions.push(eq(programs.name, program));
  if (excludeVdp) conditions.push(eq(programs.offersReward, true));

  // COUNT query (same filters, no cursor)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const countConditions: any[] = [];
  if (q) countConditions.push(ilike(assets.domain, `%${q}%`));
  if (platform) countConditions.push(eq(programs.platform, platform));
  if (program) countConditions.push(eq(programs.name, program));
  if (excludeVdp) countConditions.push(eq(programs.offersReward, true));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let countQuery: any = dbInstance
    .select({ count: sql<number>`count(*)` })
    .from(assets)
    .innerJoin(scopes, eq(assets.scopeId, scopes.id))
    .innerJoin(programs, eq(scopes.programId, programs.id))
    .$dynamic();

  if (technology) {
    countQuery = countQuery
      .innerJoin(assetTechnologies, eq(assetTechnologies.assetId, assets.id))
      .innerJoin(technologies, eq(technologies.id, assetTechnologies.technologyId))
      .where(and(...countConditions, ilike(technologies.name, `%${technology}%`)));
  } else if (countConditions.length > 0) {
    countQuery = countQuery.where(and(...countConditions));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = dbInstance
    .select({
      id: assets.id,
      domain: assets.domain,
      firstSeen: assets.firstSeen,
      programId: programs.id,
      programName: programs.name,
      programPlatform: programs.platform,
    })
    .from(assets)
    .innerJoin(scopes, eq(assets.scopeId, scopes.id))
    .innerJoin(programs, eq(scopes.programId, programs.id))
    .$dynamic();

  if (technology) {
    query = query
      .innerJoin(assetTechnologies, eq(assetTechnologies.assetId, assets.id))
      .innerJoin(technologies, eq(technologies.id, assetTechnologies.technologyId))
      .where(and(...conditions, ilike(technologies.name, `%${technology}%`)));
  } else if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }

  const [rows, [{ count }]] = await Promise.all([
    query.orderBy(assets.id).limit(limit),
    countQuery,
  ]);

  const total = Number(count);
  const assetIds = (rows as { id: number }[]).map((r) => r.id);
  const techRows: TechRow[] =
    assetIds.length > 0
      ? await dbInstance
          .select({
            assetId: assetTechnologies.assetId,
            techId: technologies.id,
            techName: technologies.name,
            techVersion: technologies.version,
            techIcon: technologies.icon,
          })
          .from(assetTechnologies)
          .innerJoin(technologies, eq(technologies.id, assetTechnologies.technologyId))
          .where(inArray(assetTechnologies.assetId, assetIds))
      : [];

  const techsByAsset = new Map<number, TechRow[]>();
  for (const t of techRows) {
    if (!techsByAsset.has(t.assetId)) techsByAsset.set(t.assetId, []);
    techsByAsset.get(t.assetId)!.push(t);
  }

  const data = (rows as { id: number; domain: string; firstSeen: Date; programId: number; programName: string; programPlatform: string }[]).map((r) => ({
    id: r.id,
    domain: r.domain,
    firstSeen: r.firstSeen,
    program: { id: r.programId, name: r.programName, platform: r.programPlatform },
    technologies: (techsByAsset.get(r.id) ?? []).map((t) => ({
      id: t.techId,
      name: t.techName,
      version: t.techVersion,
      icon: t.techIcon,
    })),
  }));

  const nextCursor = rows.length === limit ? rows[rows.length - 1].id : null;
  return NextResponse.json({ nextCursor, data, total });
}
