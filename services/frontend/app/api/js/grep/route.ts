import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_PAGE_SIZE = 100;
const MAX_PAGE_SIZE = 200;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  const parsedLimit = Number.parseInt(searchParams.get("limit") ?? "", 10);
  const limit = Number.isFinite(parsedLimit)
    ? Math.min(MAX_PAGE_SIZE, Math.max(1, parsedLimit))
    : DEFAULT_PAGE_SIZE;

  const backendParams = new URLSearchParams({ q, limit: String(limit) });
  const searchId = searchParams.get("searchId");
  const cursor = searchParams.get("cursor");
  if (searchId) backendParams.set("searchId", searchId);
  if (cursor) backendParams.set("cursor", cursor);

  const apiUrl = process.env.API_URL || "http://api:3000";
  try {
    const res = await fetch(`${apiUrl}/js/grep?${backendParams.toString()}`, {
      cache: "no-store",
    });
    const rawBody = await res.text();
    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      body = { error: `Backend API returned a non-JSON response: ${rawBody.slice(0, 500)}` };
    }

    // A full-corpus grep runs asynchronously. Preserve 202 so the client can
    // poll with searchId; pagination cursors are forwarded unchanged.
    return NextResponse.json(body, {
      status: res.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err: unknown) {
    console.error("Failed to proxy grep search to backend API:", err);
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Failed to fetch from backend API: ${errMsg}` }, { status: 500 });
  }
}
