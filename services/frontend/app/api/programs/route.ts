import { NextResponse } from "next/server";
import { db as getDbInstance } from "@/lib/db";
import { programs } from "@yaad/db";

export const runtime = "nodejs";

export async function GET() {
  const dbInstance = getDbInstance();
  try {
    const rows = await dbInstance
      .select({
        id: programs.id,
        name: programs.name,
        platform: programs.platform,
        url: programs.url,
      })
      .from(programs)
      .orderBy(programs.name);
    return NextResponse.json(rows);
  } catch (err: unknown) {
    console.error("Failed to query programs list:", err);
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
