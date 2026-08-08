"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, Loader2, Search } from "lucide-react";
import useSWRInfinite from "swr/infinite";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 100;
const MAX_MATCH_CONTEXT_LENGTH = 240;
const RESULT_ROW_STYLE = {
  contentVisibility: "auto",
  containIntrinsicSize: "84px",
} as const;
const NUMBER_FORMAT = new Intl.NumberFormat();

interface GrepMatch {
  jsId?: number | string;
  assetId?: number | string;
  domain: string;
  programName?: string | null;
  programId?: number | string | null;
  programUrl?: string | null;
  attribution?: string | null;
  jsUrl: string;
  lineNumber: number;
  lineText?: string;
  snippet?: string;
  line?: string;
  matchStart: number;
  matchEnd: number;
}

interface AssignedGrepMatch extends GrepMatch {
  programName: string;
  programId: number | string;
}

interface GrepPage {
  results: AssignedGrepMatch[];
  total: number;
  nextCursor: string | null;
  totalHosts?: number;
  matchedBlobs?: number;
  scannedBlobs?: number;
}

interface GrepScanning {
  status: "scanning";
  searchId: string;
  scannedBlobs: number;
  totalBlobs: number;
  matchedBlobs: number;
}

type GrepResponse = GrepPage | GrepScanning;

interface RawGrepPage extends Partial<Omit<GrepPage, "total">> {
  total?: number;
  totalResults?: number;
  error?: string;
}

interface RawScanningResponse {
  status?: string;
  searchId?: string;
  scannedBlobs?: number;
  totalBlobs?: number;
  matchedBlobs?: number;
  error?: string;
}

interface SearchRequest {
  query: string;
  id: number;
}

function isScanning(response: GrepResponse | null | undefined): response is GrepScanning {
  return Boolean(response && "status" in response && response.status === "scanning");
}

async function fetchGrepResponse(url: string): Promise<GrepResponse> {
  const response = await fetch(url);
  const payload = (await response.json().catch(() => null)) as
    | RawGrepPage
    | RawScanningResponse
    | null;

  const progress = payload as RawScanningResponse | null;
  if (response.status === 202 || progress?.status === "scanning") {
    if (
      progress?.status !== "scanning" ||
      typeof progress.searchId !== "string" ||
      typeof progress.scannedBlobs !== "number" ||
      typeof progress.totalBlobs !== "number" ||
      typeof progress.matchedBlobs !== "number"
    ) {
      throw new Error("The grep service returned invalid scan progress");
    }
    return {
      status: "scanning",
      searchId: progress.searchId,
      scannedBlobs: progress.scannedBlobs,
      totalBlobs: progress.totalBlobs,
      matchedBlobs: progress.matchedBlobs,
    };
  }

  if (!response.ok) {
    throw new Error(payload?.error || `Grep request failed (${response.status})`);
  }

  const page = payload as RawGrepPage | null;
  const total = page?.totalResults ?? page?.total;
  if (
    !page ||
    !Array.isArray(page.results) ||
    !page.results.every(hasAssignedProgram) ||
    typeof total !== "number"
  ) {
    throw new Error("The grep service returned an invalid response");
  }

  return {
    results: page.results,
    total,
    nextCursor: page.nextCursor ?? null,
    totalHosts: page.totalHosts,
    matchedBlobs: page.matchedBlobs,
    scannedBlobs: page.scannedBlobs,
  };
}

function resultIdentity(match: GrepMatch): string {
  return [
    match.jsId ?? match.assetId ?? "",
    match.domain,
    match.jsUrl,
    match.lineNumber,
    match.matchStart,
    match.matchEnd,
    match.lineText ?? match.snippet ?? match.line ?? "",
  ].join("\u0000");
}

function hasAssignedProgram(match: GrepMatch): match is AssignedGrepMatch {
  return Boolean(match.programName?.trim()) && match.programId !== null && match.programId !== undefined;
}

function MatchContext({ match }: { match: GrepMatch }) {
  const line = match.lineText ?? match.snippet ?? match.line ?? "";
  const start = Math.max(0, Math.min(line.length, match.matchStart));
  const end = Math.max(start, Math.min(line.length, match.matchEnd));
  const matchLength = end - start;
  const visibleCharacterBudget =
    line.length > MAX_MATCH_CONTEXT_LENGTH
      ? MAX_MATCH_CONTEXT_LENGTH - 2
      : MAX_MATCH_CONTEXT_LENGTH;
  let contextStart = 0;

  if (line.length > visibleCharacterBudget) {
    if (matchLength >= visibleCharacterBudget) {
      contextStart = start + Math.floor((matchLength - visibleCharacterBudget) / 2);
    } else {
      const surroundingContext = visibleCharacterBudget - matchLength;
      contextStart = start - Math.floor(surroundingContext / 2);
      contextStart = Math.max(0, Math.min(contextStart, line.length - visibleCharacterBudget));
    }
  }

  const contextEnd = Math.min(line.length, contextStart + visibleCharacterBudget);
  const visibleLine = line.slice(contextStart, contextEnd);
  const visibleMatchStart = Math.max(0, Math.min(visibleLine.length, start - contextStart));
  const visibleMatchEnd = Math.max(
    visibleMatchStart,
    Math.min(visibleLine.length, end - contextStart)
  );
  const hasHighlight = visibleMatchEnd > visibleMatchStart;

  return (
    <code
      className="block min-w-0 whitespace-pre-wrap break-all rounded border border-border/70 bg-muted/25 px-2 py-1 text-[11px] leading-5 text-muted-foreground"
      title={`Exact match context (up to ${MAX_MATCH_CONTEXT_LENGTH} characters)`}
    >
      {contextStart > 0 ? "\u2026" : null}
      {hasHighlight ? (
        <>
          {visibleLine.slice(0, visibleMatchStart)}
          <mark className="rounded-sm bg-amber-400/30 text-foreground ring-1 ring-inset ring-amber-400/40">
            {visibleLine.slice(visibleMatchStart, visibleMatchEnd)}
          </mark>
          {visibleLine.slice(visibleMatchEnd)}
        </>
      ) : (
        visibleLine || "(empty match)"
      )}
      {contextEnd < line.length ? "\u2026" : null}
    </code>
  );
}

const GrepResultRow = memo(function GrepResultRow({ match }: { match: AssignedGrepMatch }) {
  const program = match.programName.trim();
  const domainHref = /^https?:\/\//i.test(match.domain)
    ? match.domain
    : `https://${match.domain}`;

  return (
    <div
      role="row"
      style={RESULT_ROW_STYLE}
      className="grid grid-cols-[minmax(12rem,0.75fr)_minmax(10rem,0.65fr)_minmax(18rem,1fr)_minmax(24rem,1.6fr)] border-b border-border text-xs transition-colors last:border-0 hover:bg-muted/30"
    >
      <div role="cell" className="min-w-0 px-3 py-2.5 font-semibold text-foreground">
        <a
          href={domainHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-full items-center gap-1 hover:underline"
        >
          <span className="truncate">{match.domain}</span>
          <ExternalLink className="h-2.5 w-2.5 shrink-0" />
        </a>
      </div>
      <div role="cell" className="min-w-0 px-3 py-2.5">
        {match.programUrl ? (
          <a
            href={match.programUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex max-w-full items-center gap-1 text-muted-foreground hover:text-foreground hover:underline"
            title={program}
          >
            <span className="truncate">{program}</span>
            <ExternalLink className="h-2.5 w-2.5 shrink-0" />
          </a>
        ) : (
          <span className="text-muted-foreground" title={program}>
            {program}
          </span>
        )}
      </div>
      <div role="cell" className="min-w-0 px-3 py-2.5 text-muted-foreground">
        <a
          href={match.jsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-full items-center gap-1 hover:text-foreground hover:underline"
          title={match.jsUrl}
        >
          <span className="truncate">{match.jsUrl}</span>
          <ExternalLink className="h-2.5 w-2.5 shrink-0" />
        </a>
      </div>
      <div role="cell" className="min-w-0 px-3 py-2">
        <MatchContext match={match} />
      </div>
    </div>
  );
});

export function JsGrepSearch() {
  const [query, setQuery] = useState("");
  const [searchRequest, setSearchRequest] = useState<SearchRequest | null>(null);
  const requestId = useRef(0);
  const activeSearchIds = useRef(new Map<string, string>());
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const fetchPage = useCallback(async (url: string) => {
    const parsedUrl = new URL(url, "http://yaad.local");
    const requestKey = parsedUrl.searchParams.get("request") ?? "";
    const isFirstPage = !parsedUrl.searchParams.has("cursor");
    const activeSearchId = activeSearchIds.current.get(requestKey);
    const pollingUrl =
      isFirstPage && activeSearchId
        ? `${url}&searchId=${encodeURIComponent(activeSearchId)}`
        : url;
    const response = await fetchGrepResponse(pollingUrl);
    if (isScanning(response)) activeSearchIds.current.set(requestKey, response.searchId);
    return response;
  }, []);

  const { data, error, size, setSize, isLoading, isValidating, mutate } =
    useSWRInfinite<GrepResponse>(
      (pageIndex, previousPage) => {
        if (
          !searchRequest ||
          (pageIndex > 0 &&
            (!previousPage || isScanning(previousPage) || !previousPage.nextCursor))
        ) {
          return null;
        }

        const params = new URLSearchParams({
          q: searchRequest.query,
          limit: String(PAGE_SIZE),
          request: String(searchRequest.id),
        });
        if (pageIndex === 0) params.set("force", "1");
        if (pageIndex > 0 && previousPage && !isScanning(previousPage)) {
          params.set("cursor", previousPage.nextCursor);
        }
        return `/api/js/grep?${params.toString()}`;
      },
      fetchPage,
      {
        dedupingInterval: 500,
        revalidateFirstPage: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
      }
    );

  const results = useMemo(() => {
    const unique = new Map<string, AssignedGrepMatch>();
    for (const page of data ?? []) {
      if (isScanning(page)) continue;
      for (const match of page.results) {
        const identity = resultIdentity(match);
        if (!unique.has(identity)) unique.set(identity, match);
      }
    }
    return Array.from(unique.values());
  }, [data]);

  const firstResponse = data?.[0];
  const scanProgress = isScanning(firstResponse) ? firstResponse : null;
  const firstPage = firstResponse && !isScanning(firstResponse) ? firstResponse : null;
  const isScanningSearch = scanProgress !== null;
  const total = firstPage?.total ?? 0;
  const metrics = firstPage;
  const lastResponse = data?.[data.length - 1];
  const lastPage = lastResponse && !isScanning(lastResponse) ? lastResponse : null;
  const hasMore = Boolean(lastPage?.nextCursor);
  const isInitialLoading = Boolean(searchRequest) && (isLoading || (!data && isValidating));
  const isLoadingMore = Boolean(data && size > data.length && isValidating);
  const hasResults = results.length > 0;

  useEffect(() => {
    if (!isScanningSearch || error) return;

    let cancelled = false;
    let pollingTimer: number | undefined;
    const poll = async () => {
      if (cancelled) return;
      try {
        await mutate();
      } catch {
        // SWR exposes the error state and the restart action below.
      }
      if (!cancelled) pollingTimer = window.setTimeout(poll, 1_250);
    };

    pollingTimer = window.setTimeout(poll, 1_250);
    return () => {
      cancelled = true;
      if (pollingTimer !== undefined) window.clearTimeout(pollingTimer);
    };
  }, [error, isScanningSearch, mutate, searchRequest?.id]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasMore || isLoadingMore || error) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.unobserve(target);
        void setSize((currentSize) => currentSize + 1);
      },
      { rootMargin: "500px 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [error, hasMore, isLoadingMore, searchRequest?.id, setSize]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedQuery = query.trim();
    if (!normalizedQuery) return;

    requestId.current += 1;
    activeSearchIds.current.clear();
    setSearchRequest({ query: normalizedQuery, id: requestId.current });
  }

  function restartSearch() {
    if (!searchRequest) return;
    requestId.current += 1;
    activeSearchIds.current.clear();
    setSearchRequest({ query: searchRequest.query, id: requestId.current });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-border bg-muted/30 p-3 text-xs font-mono">
        <p className="mb-2 text-muted-foreground">
          Scan every stored JS file associated with a program using safe RE2 syntax (no lookarounds or backreferences). Results load automatically as you scroll.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              required
              placeholder="Regex (e.g. firebaseio\.com or AIza[0-9A-Za-z_-]{35})"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className={cn(
                "w-full rounded-md border border-border bg-background py-1.5 pl-8 pr-3 text-xs",
                "font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              )}
            />
          </div>
          <button
            type="submit"
            disabled={isInitialLoading}
            className="flex items-center justify-center gap-1.5 rounded-md bg-foreground px-4 py-1.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
          >
            {isInitialLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
            Grep Chunks
          </button>
        </form>
      </div>

      {!searchRequest ? (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-border px-6 py-16 text-center">
          <Image
            src="/images/javascript-svgrepo-com.svg"
            alt="JS Hunt"
            width={48}
            height={48}
            className="mb-3 h-12 w-12 grayscale opacity-40"
          />
          <p className="max-w-sm text-xs font-mono text-muted-foreground">
            Grep stored JS bundles for a signature and see the exact match context.
          </p>
        </div>
      ) : null}

      {isInitialLoading ? (
        <div className="flex items-center justify-center gap-2 py-12 text-xs font-mono text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          Searching all program-associated JS files...
        </div>
      ) : null}

      {scanProgress && !error ? (
        <div className="space-y-2 rounded-md border border-border bg-muted/20 p-3 text-xs font-mono">
          <div className="flex flex-wrap items-center justify-between gap-2 text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
              Scanning program-associated JS blobs...
            </span>
            <span>
              {NUMBER_FORMAT.format(scanProgress.scannedBlobs)} / {NUMBER_FORMAT.format(scanProgress.totalBlobs)}
              {` (${NUMBER_FORMAT.format(scanProgress.matchedBlobs)} matching so far)`}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="JavaScript scan progress"
            aria-valuemin={0}
            aria-valuemax={scanProgress.totalBlobs}
            aria-valuenow={scanProgress.scannedBlobs}
            className="h-1.5 overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{
                width: `${scanProgress.totalBlobs > 0
                  ? Math.min(100, (scanProgress.scannedBlobs / scanProgress.totalBlobs) * 100)
                  : 0}%`,
              }}
            />
          </div>
        </div>
      ) : null}

      {error && !hasResults ? (
        <div className="space-y-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs font-mono text-destructive">
          <p>Error: {error.message}</p>
          <button
            type="button"
            onClick={restartSearch}
            className="rounded border border-destructive/40 px-2 py-1 hover:bg-destructive/10"
          >
            Restart search
          </button>
        </div>
      ) : null}

      {firstPage && !isInitialLoading ? (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-muted-foreground">
            <span>
              <strong className="font-semibold text-foreground">{NUMBER_FORMAT.format(total)}</strong> total results
              {typeof metrics?.totalHosts === "number"
                ? ` / ${NUMBER_FORMAT.format(metrics.totalHosts)} hosts`
                : ""}
              {typeof metrics?.matchedBlobs === "number"
                ? ` / ${NUMBER_FORMAT.format(metrics.matchedBlobs)} matching blobs`
                : ""}
              {typeof metrics?.scannedBlobs === "number"
                ? ` / ${NUMBER_FORMAT.format(metrics.scannedBlobs)} JS blobs scanned`
                : ""}
            </span>
            <span>
              Loaded {NUMBER_FORMAT.format(results.length)} of {NUMBER_FORMAT.format(total)}
            </span>
          </div>

          {hasResults ? (
            <div role="table" aria-label="JavaScript signature matches" className="overflow-x-auto rounded-md border border-border font-mono">
              <div className="min-w-[1100px]">
                <div
                  role="row"
                  className="grid grid-cols-[minmax(12rem,0.75fr)_minmax(10rem,0.65fr)_minmax(18rem,1fr)_minmax(24rem,1.6fr)] border-b border-border bg-muted/40 text-[10px] uppercase tracking-wider text-muted-foreground"
                >
                  <div role="columnheader" className="px-3 py-2">Subdomain</div>
                  <div role="columnheader" className="px-3 py-2">Program</div>
                  <div role="columnheader" className="px-3 py-2">JavaScript file</div>
                  <div role="columnheader" className="px-3 py-2">Match</div>
                </div>
                <div role="rowgroup">
                  {results.map((match) => (
                    <GrepResultRow key={resultIdentity(match)} match={match} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-md border border-dashed border-border px-3 py-12 text-center text-xs font-mono text-muted-foreground">
              No signatures matched the pattern.
            </div>
          )}

          <div ref={loadMoreRef} className="flex min-h-14 items-center justify-center py-3 text-xs font-mono text-muted-foreground">
            {error && hasResults ? (
              <div className="flex items-center gap-2 text-destructive">
                <span>Could not load the next page.</span>
                <button
                  type="button"
                  onClick={restartSearch}
                  className="rounded border border-destructive/40 px-2 py-1 hover:bg-destructive/10"
                >
                  Restart search
                </button>
              </div>
            ) : isLoadingMore ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Loading more results...
              </span>
            ) : hasMore ? (
              <span>Scroll to load more results</span>
            ) : hasResults ? (
              <span>End of results / {NUMBER_FORMAT.format(total)} total</span>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
