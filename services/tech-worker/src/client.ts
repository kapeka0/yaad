export interface DetectedTech {
  name: string;
  version: string;
  icon: string;
}

const DEFAULT_RETRY_DELAYS_MS = [1_000, 2_000, 4_000, 8_000, 16_000] as const;
const RETRYABLE_STATUS_CODES = new Set([429, 502, 503, 504]);

interface DetectTechnologyOptions {
  fetchImpl?: typeof fetch;
  retryDelaysMs?: readonly number[];
  wait?: (delayMs: number) => Promise<void>;
}

function wait(delayMs: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, delayMs));
}

function isRequestTimeout(error: unknown) {
  return (
    error instanceof Error &&
    (error.name === "AbortError" || error.name === "TimeoutError")
  );
}

export async function detectTechnologies(
  cultivateApiUrl: string,
  url: string,
  confidenceThreshold: number,
  options: DetectTechnologyOptions = {},
): Promise<DetectedTech[]> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const retryDelaysMs = options.retryDelaysMs ?? DEFAULT_RETRY_DELAYS_MS;
  const waitForRetry = options.wait ?? wait;
  let res: Response | undefined;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retryDelaysMs.length; attempt += 1) {
    res = undefined;

    try {
      res = await fetchImpl(`${cultivateApiUrl}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        signal: AbortSignal.timeout(60_000),
      });

      if (res.ok || !RETRYABLE_STATUS_CODES.has(res.status)) break;

      lastError = new Error(`cultivate-api error: ${res.status} ${res.statusText}`);
      await res.body?.cancel();
    } catch (error) {
      if (isRequestTimeout(error)) throw error;
      lastError = error;
    }

    const retryDelayMs = retryDelaysMs[attempt];
    if (retryDelayMs === undefined) break;
    await waitForRetry(retryDelayMs);
  }

  if (!res) {
    throw lastError instanceof Error
      ? lastError
      : new Error(`cultivate-api request failed: ${String(lastError)}`);
  }

  if (!res.ok) {
    throw new Error(`cultivate-api error: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as {
    technologies?: Array<{
      name: string;
      version?: string;
      icon?: string;
      confidence?: number;
    }>;
  };

  return (data.technologies ?? [])
    .filter((t) => (t.confidence ?? 100) >= confidenceThreshold)
    .map((t) => ({
      name: t.name,
      version: t.version ?? "",
      icon: t.icon ?? "",
    }));
}
