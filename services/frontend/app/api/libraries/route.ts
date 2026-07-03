import { NextRequest, NextResponse } from "next/server";
import { db as getDbInstance } from "@/lib/db";
import {
  assets,
  scopes,
  programs,
  webServices,
  javascriptFiles,
  jsLibraries,
} from "@yaad/db";
import { eq, ilike, and, count, type SQL } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name = searchParams.get("name");
  const version = searchParams.get("version") ?? undefined;
  const pageStr = searchParams.get("page") ?? "1";
  const limitStr = searchParams.get("limit") ?? "50";
  const page = Math.max(1, parseInt(pageStr, 10));
  const limit = Math.min(100, Math.max(1, parseInt(limitStr, 10)));
  const offset = (page - 1) * limit;

  const dbInstance = getDbInstance();

  try {
    if (name) {
      // Find assets using this library (and version if specified)
      const conditions: SQL[] = [ilike(jsLibraries.name, name)];
      if (version) conditions.push(eq(jsLibraries.version, version));

      const rows = await dbInstance
        .selectDistinct({
          assetId: assets.id,
          domain: assets.domain,
          library: jsLibraries.name,
          version: jsLibraries.version,
          jsUrl: javascriptFiles.url,
          programId: programs.id,
          programName: programs.name,
          platform: programs.platform,
        })
        .from(jsLibraries)
        .innerJoin(javascriptFiles, eq(javascriptFiles.id, jsLibraries.jsId))
        .innerJoin(webServices, eq(webServices.id, javascriptFiles.serviceId))
        .innerJoin(assets, eq(assets.id, webServices.assetId))
        .leftJoin(scopes, eq(scopes.id, assets.scopeId))
        .leftJoin(programs, eq(programs.id, scopes.programId))
        .where(and(...conditions))
        .orderBy(assets.domain)
        .limit(limit)
        .offset(offset);

      return NextResponse.json({ page, limit, data: rows });
    } else {
      // General search/list of unique libraries and versions
      const q = searchParams.get("q");
      const rows = await dbInstance
        .select({
          name: jsLibraries.name,
          version: jsLibraries.version,
          occurrences: count(jsLibraries.id),
        })
        .from(jsLibraries)
        .where(q ? ilike(jsLibraries.name, `%${q}%`) : undefined)
        .groupBy(jsLibraries.name, jsLibraries.version)
        .orderBy(jsLibraries.name, jsLibraries.version)
        .limit(limit)
        .offset(offset);

      return NextResponse.json(rows);
    }
  } catch (err: unknown) {
    console.error("Failed to query library data:", err);
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
