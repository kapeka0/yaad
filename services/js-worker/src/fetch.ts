export interface FetchedJs {
  body: Buffer;
  status: number;
  hasSourcemap: boolean;
}

/** Fetch a JS file, capped at maxBytes to avoid pathological downloads. */
export async function fetchJs(url: string, maxBytes: number): Promise<FetchedJs | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(20_000),
      headers: { "User-Agent": "yaad-js-collector/1.0" },
      redirect: "follow",
    });
    if (!res.ok || !res.body) return null;

    const reader = res.body.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        total += value.length;
        if (total > maxBytes) {
          await reader.cancel().catch(() => {});
          return null; // too large — skip
        }
        chunks.push(value);
      }
    }

    const body = Buffer.concat(chunks);
    const text = body.subarray(0, 4096).toString("utf-8");
    const hasSourcemap =
      /\/\/[#@]\s*sourceMappingURL=/.test(body.subarray(-512).toString("utf-8")) ||
      /sourceMappingURL=/.test(text);

    return { body, status: res.status, hasSourcemap };
  } catch {
    return null;
  }
}
