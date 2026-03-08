export const QUEUES = {
  ENUMERATE_SUBDOMAINS: "enumerate_subdomains",
  SCAN_HTTP: "scan_http",
  COLLECT_JS: "collect_js",
  ANALYZE_JS: "analyze_js",
  DETECT_TECHNOLOGY: "detect_technology",
} as const;

export type QueueName = (typeof QUEUES)[keyof typeof QUEUES];
