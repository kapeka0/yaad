"use client";

import useSWR from "swr";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Stats {
  database: {
    sizeBytes: number;
    programs: number;
    scopes: number;
    assets: number;
    resolvedAssets: number;
    webServices: number;
    javascriptFiles: number;
    endpoints: number;
    technologies: number;
    estimated: boolean;
  };
  libraries: { detected: number; vulnerable: number };
  storage: { uniqueBlobs: number; originalBytes: number; storedBytes: number; ratio: number };
  endpointIndex: { indexedBlobs: number; totalBlobs: number };
  queues: Record<string, { waiting: number; active: number; completed: number; failed: number }>;
  lastScan: string | null;
}

const fetcher = async (url: string): Promise<Stats> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Stats request failed (${response.status})`);
  return response.json() as Promise<Stats>;
};

function formatBytes(n: number): string {
  if (!n) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.min(units.length - 1, Math.floor(Math.log(n) / Math.log(1024)));
  return `${(n / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function formatNum(n: number): string {
  return n.toLocaleString("en-US");
}

function timeAgo(iso: string | null): string {
  if (!iso) return "never";
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (!Number.isFinite(s)) return "unknown";
  if (s < 0) return "just now";
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function Tile({ label, value, accent }: { label: string; value: string; accent?: "danger" }) {
  return (
    <div className="border border-border rounded-md px-3 py-2.5 bg-background">
      <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={cn("text-lg font-mono mt-0.5", accent === "danger" ? "text-destructive" : "text-foreground")}>
        {value}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{title}</h2>
      {children}
    </section>
  );
}

export default function StatsPage() {
  const { data, error, isLoading } = useSWR<Stats>("/api/stats", fetcher, {
    refreshInterval: 30_000,
    dedupingInterval: 30_000,
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-border pb-4 flex items-end justify-between">
        <h1 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">yaad / stats</h1>
        {data && (
          <div className="text-[10px] font-mono text-muted-foreground">
            last scan · <span className="text-foreground">{timeAgo(data.lastScan)}</span>
          </div>
        )}
      </div>

      {error && (
        <div className="border border-destructive/30 bg-destructive/10 text-destructive text-xs font-mono p-3 rounded-md">
          Failed to load stats.
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-md" />
          ))}
        </div>
      )}

      {data && (
        <>
          <Section title="Database">
            {data.database.estimated && (
              <p className="text-[10px] font-mono text-muted-foreground">Row counts are low-overhead estimates.</p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Tile label="DB size" value={formatBytes(data.database.sizeBytes)} />
              <Tile label="Programs" value={formatNum(data.database.programs)} />
              <Tile label="Scopes" value={formatNum(data.database.scopes)} />
              <Tile
                label="Assets (resolved)"
                value={`${formatNum(data.database.assets)} (${formatNum(data.database.resolvedAssets)})`}
              />
              <Tile label="Web services" value={formatNum(data.database.webServices)} />
              <Tile label="JS files" value={formatNum(data.database.javascriptFiles)} />
              <Tile label="Endpoints" value={formatNum(data.database.endpoints)} />
              <Tile label="Technologies" value={formatNum(data.database.technologies)} />
            </div>
          </Section>

          <Section title="JS libraries">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Tile label="Detected" value={formatNum(data.libraries.detected)} />
              <Tile
                label="Vulnerable"
                value={formatNum(data.libraries.vulnerable)}
                accent={data.libraries.vulnerable > 0 ? "danger" : undefined}
              />
            </div>
          </Section>

          <Section title="JS blob storage (MinIO)">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Tile label="Unique blobs" value={formatNum(data.storage.uniqueBlobs)} />
              <Tile label="Raw JS seen" value={formatBytes(data.storage.originalBytes)} />
              <Tile label="Stored (zstd)" value={formatBytes(data.storage.storedBytes)} />
              <Tile
                label="Compression"
                value={data.storage.ratio > 0 ? `${data.storage.ratio.toFixed(1)}×` : "—"}
              />
              <Tile
                label="Endpoint-indexed blobs"
                value={`${formatNum(data.endpointIndex.indexedBlobs)} / ${formatNum(data.endpointIndex.totalBlobs)}`}
              />
            </div>
          </Section>

          <Section title="Pipeline queues">
            <div className="border border-border rounded-md overflow-hidden">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-[10px] text-muted-foreground uppercase tracking-wider">
                    <th className="text-left px-3 py-2">Queue</th>
                    <th className="text-right px-3 py-2">Waiting</th>
                    <th className="text-right px-3 py-2">Active</th>
                    <th className="text-right px-3 py-2">Completed</th>
                    <th className="text-right px-3 py-2">Failed</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(data.queues).map(([name, c]) => (
                    <tr key={name} className="border-b border-border last:border-0">
                      <td className="px-3 py-2 text-foreground">{name}</td>
                      <td className="px-3 py-2 text-right text-muted-foreground">{formatNum(c.waiting)}</td>
                      <td className={cn("px-3 py-2 text-right", c.active > 0 ? "text-emerald-500" : "text-muted-foreground")}>
                        {formatNum(c.active)}
                      </td>
                      <td className="px-3 py-2 text-right text-muted-foreground">{formatNum(c.completed)}</td>
                      <td className={cn("px-3 py-2 text-right", c.failed > 0 ? "text-destructive" : "text-muted-foreground")}>
                        {formatNum(c.failed)}
                      </td>
                    </tr>
                  ))}
                  {Object.keys(data.queues).length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                        No queue data (Redis unavailable)
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Section>
        </>
      )}
    </div>
  );
}
