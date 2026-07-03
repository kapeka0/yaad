import { NextRequest, NextResponse } from "next/server";
import { db as getDbInstance } from "@/lib/db";
import {
  assets,
  scopes,
  programs,
  technologies,
  assetTechnologies,
  webServices,
  javascriptFiles,
  jsLibraries,
} from "@yaad/db";
import { eq, ilike, gt, and, inArray, sql, type SQL } from "drizzle-orm";

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
  const library = searchParams.get("library") ?? undefined;
  const libraryVersion = searchParams.get("libraryVersion") ?? undefined;
  const platform = searchParams.get("platform") ?? undefined;
  const program = searchParams.get("program") ?? undefined;
  const excludeVdpRaw = searchParams.get("excludeVdp");
  const excludeVdp = excludeVdpRaw === "1" || excludeVdpRaw === "true";
  const cursorStr = searchParams.get("cursor") ?? undefined;
  const cursor = cursorStr ? parseInt(cursorStr, 10) : undefined;
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "30", 10)));

  const dbInstance = getDbInstance();

  // Shared filters (excluding cursor, which only applies to the data query).
  function baseConditions(withCursor: boolean): SQL[] {
    const c: SQL[] = [];
    if (withCursor && cursor) c.push(gt(assets.id, cursor));
    if (q) c.push(ilike(assets.domain, `%${q}%`));
    if (platform) c.push(eq(programs.platform, platform));
    if (program) c.push(eq(programs.name, program));
    if (excludeVdp) c.push(eq(programs.offersReward, true));
    return c;
  }

  // Applies technology/library joins + conditions to a dynamic query.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function applyFilters(query: any, conditions: SQL[]) {
    if (technology) {
      query = query
        .innerJoin(assetTechnologies, eq(assetTechnologies.assetId, assets.id))
        .innerJoin(technologies, eq(technologies.id, assetTechnologies.technologyId));
      conditions.push(ilike(technologies.name, `%${technology}%`));
    }
    if (library) {
      query = query
        .innerJoin(webServices, eq(webServices.assetId, assets.id))
        .innerJoin(javascriptFiles, eq(javascriptFiles.serviceId, webServices.id))
        .innerJoin(jsLibraries, eq(jsLibraries.jsId, javascriptFiles.id));
      conditions.push(ilike(jsLibraries.name, library));
      if (libraryVersion) conditions.push(eq(jsLibraries.version, libraryVersion));
    }
    if (conditions.length > 0) query = query.where(and(...conditions));
    return query;
  }

  const countQuery = applyFilters(
    dbInstance
      .select({ count: sql<number>`count(distinct ${assets.id})` })
      .from(assets)
      .innerJoin(scopes, eq(assets.scopeId, scopes.id))
      .innerJoin(programs, eq(scopes.programId, programs.id))
      .$dynamic(),
    baseConditions(false)
  );

  const query = applyFilters(
    dbInstance
      .selectDistinct({
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
      .$dynamic(),
    baseConditions(true)
  );

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
