import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const q = searchParams.get("q");
  const limit = searchParams.get("limit") ?? "300";

  if (!q) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  const apiUrl = process.env.API_URL || "http://api:3000";
  try {
    const targetUrl = `${apiUrl}/js/grep?q=${encodeURIComponent(q)}&limit=${limit}`;
    const res = await fetch(targetUrl);
    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: `Backend API returned error: ${errText}` }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    console.error("Failed to proxy grep search to backend API:", err);
    const errMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Failed to fetch from backend API: ${errMsg}` }, { status: 500 });
  }
}
