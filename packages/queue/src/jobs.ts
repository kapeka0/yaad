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
