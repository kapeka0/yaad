import type { DetectedLibrary } from "./retire.js";

// Matches bare hostnames anywhere in the JS body.
const HOST_RE = /\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}\b/gi;

// Common file-extension false positives that look like hostnames.
const NOT_A_HOST = /\.(js|css|png|jpg|jpeg|gif|svg|json|map|woff2?|ttf|ico|html?)$/i;

/**
 * Pull hostnames out of a JS body and keep only those that belong to one of the
 * in-scope root domains (so we recurse on the target's own infra, not the CDN).
 */
export function extractSubdomains(body: string, rootDomains: string[]): string[] {
  const roots = rootDomains.map((d) => d.toLowerCase());
  const found = new Set<string>();
  const matches = body.match(HOST_RE);
  if (!matches) return [];
  for (const raw of matches) {
    const host = raw.toLowerCase();
    if (NOT_A_HOST.test(host)) continue;
    if (roots.some((r) => host === r || host.endsWith("." + r))) {
      found.add(host);
    }
  }
  return [...found];
}

// A few high-value inline version banners retire.js sometimes misses.
const INLINE_SIGNATURES: Array<{ name: string; re: RegExp }> = [
  { name: "jquery", re: /jQuery\s+v?(\d+\.\d+\.\d+)/i },
  { name: "react", re: /react(?:\.production\.min)?\.js[^]{0,200}?"(\d+\.\d+\.\d+)"/i },
  { name: "angular", re: /angular[^]{0,50}?version[^]{0,20}?(\d+\.\d+\.\d+)/i },
  { name: "vue", re: /Vue\.version\s*=\s*["'](\d+\.\d+\.\d+)["']/i },
  { name: "lodash", re: /lodash[^]{0,50}?VERSION\s*=\s*["'](\d+\.\d+\.\d+)["']/i },
  { name: "bootstrap", re: /Bootstrap\s+v?(\d+\.\d+\.\d+)/i },
];

export function extractInlineLibraries(body: string): DetectedLibrary[] {
  const out: DetectedLibrary[] = [];
  const sample = body.length > 200_000 ? body.slice(0, 200_000) : body;
  for (const sig of INLINE_SIGNATURES) {
    const m = sig.re.exec(sample);
    if (m) out.push({ name: sig.name, version: m[1], vulnerabilities: [] });
  }
  return out;
}
