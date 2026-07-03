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
import { eq, ilike, and, type SQL } from "drizzle-orm";

export const runtime = "nodejs";

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

  const dbInstance = getDbInstance();

  const conditions: SQL[] = [];
  if (q) conditions.push(ilike(assets.domain, `%${q}%`));
  if (platform) conditions.push(eq(programs.platform, platform));
  if (program) conditions.push(eq(programs.name, program));
  if (excludeVdp) conditions.push(eq(programs.offersReward, true));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = dbInstance
    .selectDistinct({ domain: assets.domain })
    .from(assets)
    .innerJoin(scopes, eq(assets.scopeId, scopes.id))
    .innerJoin(programs, eq(scopes.programId, programs.id))
    .$dynamic();

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

  const rows: { domain: string }[] = await query.orderBy(assets.domain);
  const text = rows.map((r) => r.domain).join("\n");

  return new NextResponse(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'attachment; filename="domains.txt"',
    },
  });
}
