import { getToolTimeoutMs, runProcess } from "@yaad/subprocess";

export interface HttpxResult {
  url: string;
  input: string;
  statusCode: number;
  title?: string;
  webServer?: string;
  contentType?: string;
  contentLength?: number;
  ip?: string;
  cname?: string;
  cdnName?: string;
  faviconHash?: string;
  jarm?: string;
  tech?: string[];
  responseHeaders?: Record<string, string>;
}

// Raw shape of an httpx -json line (only the fields we consume).
interface HttpxLine {
  url?: string;
  input?: string;
  status_code?: number;
  "status-code"?: number;
  title?: string;
  webserver?: string;
  content_type?: string;
  content_length?: number;
  a?: string[];
  host?: string;
  cname?: string[];
  cdn_name?: string;
  favicon?: string | number;
  jarm?: string;
  tech?: string[];
  header?: Record<string, string>;
}

export async function runHttpx(domain: string): Promise<HttpxResult[]> {
  const results: HttpxResult[] = [];

  await runProcess({
    command: "httpx",
    args: [
      "-u", domain,
      "-json",
      "-silent",
      "-status-code",
      "-title",
      "-follow-redirects",
      "-tech-detect",
      "-web-server",
      "-content-type",
      "-content-length",
      "-favicon",
      "-jarm",
      "-cname",
      "-ip",
      "-cdn",
      "-include-response-header",
    ],
    timeoutMs: getToolTimeoutMs("HTTPX_TIMEOUT_MS", 120_000),
    onStdoutLine: (line) => {
      if (!line.trim()) return;
      try {
        const p = JSON.parse(line) as HttpxLine;
        if (!p.url) return;
        results.push({
          url: p.url,
          input: p.input ?? domain,
          statusCode: p.status_code ?? p["status-code"] ?? 0,
          title: p.title,
          webServer: p.webserver,
          contentType: p.content_type,
          contentLength: typeof p.content_length === "number" ? p.content_length : undefined,
          ip: p.a?.[0] ?? p.host,
          cname: p.cname?.[0],
          cdnName: p.cdn_name,
          faviconHash: p.favicon !== undefined ? String(p.favicon) : undefined,
          jarm: p.jarm,
          tech: p.tech,
          responseHeaders: p.header,
        });
      } catch {
        // skip malformed lines
      }
    },
  });

  return results;
}
