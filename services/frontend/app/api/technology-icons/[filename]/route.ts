import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_ICON_BYTES = 2 * 1024 * 1024;
const ICON_TIMEOUT_MS = 5_000;
const SAFE_RESPONSE_HEADERS = {
  "Cache-Control":
    "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
  "Content-Security-Policy":
    "default-src 'none'; img-src data:; style-src 'unsafe-inline'; sandbox",
  "X-Content-Type-Options": "nosniff",
};

function isSafeIconFilename(filename: string) {
  const hasControlCharacter = Array.from(filename).some((character) => {
    const codePoint = character.codePointAt(0) ?? 0;
    return codePoint <= 31 || codePoint === 127;
  });

  return (
    filename.length > 0 &&
    filename.length <= 255 &&
    filename !== "." &&
    filename !== ".." &&
    !filename.includes("/") &&
    !filename.includes("\\") &&
    !hasControlCharacter &&
    /\.(?:png|svg)$/i.test(filename)
  );
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;

  // Reject malformed names before reaching the internal service.
  if (!isSafeIconFilename(filename)) {
    return NextResponse.json({ error: "Invalid technology icon filename" }, { status: 400 });
  }

  const cultivateUrl = process.env.CULTIVATE_API_URL || "http://cultivate-api:3000";

  try {
    const upstream = await fetch(
      `${cultivateUrl}/icons/${encodeURIComponent(filename)}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(ICON_TIMEOUT_MS),
      },
    );

    if (upstream.status === 404) {
      return NextResponse.json({ error: "Technology icon not found" }, { status: 404 });
    }

    if (!upstream.ok) {
      return NextResponse.json({ error: "Technology icon service unavailable" }, { status: 502 });
    }

    const contentType = upstream.headers.get("content-type")?.split(";", 1)[0].toLowerCase();
    if (contentType !== "image/svg+xml" && contentType !== "image/png") {
      return NextResponse.json({ error: "Invalid technology icon response" }, { status: 502 });
    }

    const advertisedLength = Number.parseInt(
      upstream.headers.get("content-length") ?? "",
      10,
    );
    if (Number.isFinite(advertisedLength) && advertisedLength > MAX_ICON_BYTES) {
      return NextResponse.json({ error: "Technology icon is too large" }, { status: 502 });
    }

    const body = await upstream.arrayBuffer();
    if (body.byteLength > MAX_ICON_BYTES) {
      return NextResponse.json({ error: "Technology icon is too large" }, { status: 502 });
    }

    return new NextResponse(body, {
      status: 200,
      headers: {
        ...SAFE_RESPONSE_HEADERS,
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    console.error("Failed to load technology icon from Cultivate:", error);
    return NextResponse.json({ error: "Technology icon service unavailable" }, { status: 502 });
  }
}
