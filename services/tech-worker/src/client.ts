export interface DetectedTech {
  name: string;
  version: string;
}

export async function detectTechnologies(
  cultivateApiUrl: string,
  url: string,
  confidenceThreshold: number
): Promise<DetectedTech[]> {
  const res = await fetch(`${cultivateApiUrl}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
    signal: AbortSignal.timeout(60_000),
  });

  if (!res.ok) {
    throw new Error(`cultivate-api error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as {
    technologies?: Array<{
      name: string;
      version?: string;
      confidence?: number;
    }>;
  };

  return (data.technologies ?? [])
    .filter((t) => (t.confidence ?? 100) >= confidenceThreshold)
    .map((t) => ({
      name: t.name,
      version: t.version ?? "",
    }));
}
