const SCHEME = /^[a-z][a-z\d+.-]*:\/\//i;
const INVALID_RAW_DOMAIN = /[\s(),;]/;
const VALID_LABEL = /^[a-z\d_](?:[a-z\d_-]{0,61}[a-z\d_])?$/i;

/**
 * Convert a scope/URL-like value into a hostname suitable for the assets
 * table. Descriptions and other non-host scope values are rejected instead of
 * becoming broken clickable assets.
 */
export function normalizeAssetDomain(raw: string): string | null {
  let candidate = raw.trim();
  if (!candidate || INVALID_RAW_DOMAIN.test(candidate) || candidate.includes("@")) {
    return null;
  }

  // Accept both proper wildcards (*.example.com) and legacy *example.com.
  candidate = candidate.replace(/^\*+\.?/, "");

  try {
    const parsed = new URL(SCHEME.test(candidate) ? candidate : `https://${candidate}`);
    candidate = parsed.hostname.toLowerCase().replace(/\.$/, "");
  } catch {
    return null;
  }

  if (!candidate || candidate.includes("*") || candidate.length > 253) return null;

  // URL.hostname keeps IPv6 brackets, which are valid when building a URL.
  if (candidate.startsWith("[") && candidate.endsWith("]")) return candidate;

  const labels = candidate.split(".");
  if (labels.some((label) => !VALID_LABEL.test(label))) return null;
  return candidate;
}
