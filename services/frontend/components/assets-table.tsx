"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";
import { Skeleton } from "./ui/skeleton";
import { TechIcons } from "./tech-icons";

const SKELETON_WIDTHS = ["w-full","w-10/12","w-9/12","w-8/12","w-7/12","w-6/12","w-5/12","w-4/12"];

interface Tech {
  id: number;
  name: string;
  version: string;
  icon: string;
}

interface Asset {
  id: number;
  domain: string;
  firstSeen: string;
  program: { id: number; name: string; platform: string };
  technologies: Tech[];
}

interface Page {
  nextCursor: number | null;
  data: Asset[];
  total: number;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function buildUrl(base: URLSearchParams, cursor?: number) {
  const p = new URLSearchParams(base.toString());
  p.delete("cursor");
  if (cursor) p.set("cursor", String(cursor));
  return `/api/assets?${p.toString()}`;
}

export function AssetsTable() {
  const searchParams = useSearchParams();
  const filterKey = searchParams.toString();
  const prevFilterKey = useRef(filterKey);

  const { data, size, setSize, isLoading, isValidating } = useSWRInfinite<Page>(
    (pageIndex, prev: Page | null) => {
      if (prev && prev.nextCursor === null) return null;
      const cursor =
        pageIndex === 0 ? undefined : prev?.nextCursor ?? undefined;
      return buildUrl(searchParams, cursor);
    },
    fetcher,
    { revalidateFirstPage: false, keepPreviousData: false },
  );

  // Reset when filters change
  useEffect(() => {
    if (filterKey !== prevFilterKey.current) {
      prevFilterKey.current = filterKey;
      void setSize(1);
    }
  }, [filterKey, setSize]);

  const { ref: sentinelRef, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isValidating && data) {
      const last = data[data.length - 1];
      if (last?.nextCursor !== null) setSize((s) => s + 1);
    }
  }, [inView, isValidating, data, setSize]);

  const rows: Asset[] = data?.flatMap((p) => p.data) ?? [];
  const isEmpty = !isLoading && rows.length === 0;
  const total = data?.[0]?.total ?? null;

  return (
    <div className="space-y-2">
      <div className="text-xs text-muted-foreground font-mono">
        {isLoading ? <Skeleton className="h-3 w-24" /> : total !== null ? `${total} assets` : `${rows.length} assets+`}
      </div>

      <div className="border border-border rounded-md overflow-hidden">
        <table className="w-full text-xs font-mono table-fixed">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-3 py-2 font-medium text-muted-foreground uppercase tracking-wider text-[10px] w-[35%]">
                Subdomain
              </th>
              <th className="text-left px-3 py-2 font-medium text-muted-foreground uppercase tracking-wider text-[10px] w-[30%]">
                Program
              </th>
              <th className="text-left px-3 py-2 font-medium text-muted-foreground uppercase tracking-wider text-[10px] w-[20%]">
                Technologies
              </th>
              <th className="text-left px-3 py-2 font-medium text-muted-foreground uppercase tracking-wider text-[10px] w-[15%]">
                First Seen
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && SKELETON_WIDTHS.map((w, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-3 py-2"><Skeleton className={cn("h-3", w)} /></td>
                <td className="px-3 py-2"><Skeleton className="h-3 w-7/12" /></td>
                <td className="px-3 py-2"><Skeleton className="h-3 w-4/12" /></td>
                <td className="px-3 py-2"><Skeleton className="h-3 w-5/12" /></td>
              </tr>
            ))}
            {isEmpty && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-8 text-center text-muted-foreground"
                >
                  No assets found
                </td>
              </tr>
            )}
            {rows.map((asset) => (
              <tr
                key={asset.id}
                className={cn(
                  "border-b border-border last:border-0",
                  "hover:bg-muted/30 transition-colors",
                )}
              >
                <td className="px-3 py-2 text-foreground max-w-xs">
                  <span className="block truncate" title={asset.domain}>{asset.domain}</span>
                </td>
                <td className="px-3 py-2">
                  <span className="text-muted-foreground">
                    {asset.program.name}
                  </span>
                  <span className="ml-1 text-[10px] text-muted-foreground/60">
                    ({asset.program.platform})
                  </span>
                </td>
                <td className="px-3 py-2">
                  <TechIcons techs={asset.technologies} />
                </td>
                <td className="px-3 py-2 text-muted-foreground">
                  <span className="shrink-0 text-nowrap">
                    {new Date(asset.firstSeen).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Infinite scroll sentinel */}
      <div
        ref={sentinelRef}
        className="py-2 text-center text-xs text-muted-foreground"
      >
        {isValidating && size > 1 && "Loading more..."}
      </div>

    </div>
  );
}
