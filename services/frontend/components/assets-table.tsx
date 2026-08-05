"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import useSWRInfinite from "swr/infinite";
import { Skeleton } from "./ui/skeleton";
import { TechIcons } from "./tech-icons";
import { PlatformIcon } from "./platform-icon";

const SKELETON_WIDTHS = ["w-full","w-10/12","w-9/12","w-8/12","w-7/12","w-6/12","w-5/12","w-4/12"];

interface Tech {
  id: number;
  name: string;
  version: string;
  icon: string;
}

interface Program {
  id: number;
  name: string;
  platform: string;
  url: string | null;
}

interface Asset {
  id: number;
  domain: string;
  firstSeen: string;
  program: Program;
  technologies: Tech[];
}

interface Page {
  nextCursor: number | null;
  data: Asset[];
  total: number;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function domainUrl(domain: string): string {
  if (/^https?:\/\//i.test(domain)) return domain;
  return `https://${domain.replace(/^\*\./, "")}`;
}

function publicProgramUrl(url: string | null): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.href : null;
  } catch {
    return null;
  }
}

function ProgramLink({ program }: { program: Program }) {
  const url = publicProgramUrl(program.url);
  const content = (
    <>
      <span className="truncate">{program.name}</span>
      <PlatformIcon platform={program.platform} />
    </>
  );

  if (!url) {
    return (
      <span
        className="inline-flex max-w-full items-center gap-1.5 text-muted-foreground"
        title={`${program.name} has no public program page`}
      >
        {content}
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex max-w-full items-center gap-1.5 text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
      title={`Open ${program.name} on ${program.platform}`}
    >
      {content}
    </a>
  );
}

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
  const isResetting = useRef(false);

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
      isResetting.current = true;
      void setSize(1);
    }
  }, [filterKey, setSize]);

  const { ref: sentinelRef, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (isResetting.current) {
      isResetting.current = false;
      return;
    }
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
                  <a
                    href={domainUrl(asset.domain)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block truncate underline-offset-2 hover:text-primary hover:underline"
                    title={`Open ${asset.domain}`}
                  >
                    {asset.domain}
                  </a>
                </td>
                <td className="px-3 py-2">
                  <ProgramLink program={asset.program} />
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
