import { NextResponse } from "next/server";
import { db as getDbInstance } from "@/lib/db";
import { jsLibraries } from "@yaad/db";
import { isNotNull } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET() {
  const dbInstance = getDbInstance();
  try {
    const rows = await dbInstance
      .selectDistinct({
        name: jsLibraries.name,
        version: jsLibraries.version,
        severity: jsLibraries.severity,
        vulnerabilities: jsLibraries.vulnerabilities,
      })
      .from(jsLibraries)
      .where(isNotNull(jsLibraries.vulnerabilities))
      .orderBy(jsLibraries.name, jsLibraries.version);
    return NextResponse.json(rows);
  } catch (err: unknown) {
    console.error("Failed to query vulnerable libraries:", err);
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
