export interface EnumerateSubdomainsJob {
  domain: string;
  scopeId: number | null;
  // Recursion depth from the original root scope (0 = root scope asset).
  depth?: number;
}

export interface ScanHttpJob {
  domain: string;
  assetId: number;
}

export interface AssetScanState {
  resolved: boolean;
  lastScannedAt: Date | null;
}

/** New, unresolved, and legacy never-successful assets all need an HTTP job. */
export function shouldQueueAssetScan(asset: AssetScanState): boolean {
  return !asset.resolved || asset.lastScannedAt === null;
}

/**
 * All ordinary producers share the same bucketed ID so imports and the
 * scheduler cannot multiply work for one asset, while exhausted failed jobs
 * become retryable in the next recovery window.
 */
export function getAssetScanJobId(
  assetId: number,
  now = new Date(),
  retryIntervalHours = 6
): string {
  const windowMs = Math.max(1, retryIntervalHours) * 60 * 60 * 1000;
  return `asset-scan-${assetId}-${Math.floor(now.getTime() / windowMs)}`;
}

export interface CollectJsJob {
  url: string;
  serviceId: number;
}

export interface AnalyzeJsJob {
  jsUrl: string;
  jsId: number;
}

export interface DetectTechnologyJob {
  url: string;
  assetId: number;
}

export type JobPayload =
  | EnumerateSubdomainsJob
  | ScanHttpJob
  | CollectJsJob
  | AnalyzeJsJob
  | DetectTechnologyJob;
