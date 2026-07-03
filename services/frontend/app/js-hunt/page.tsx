"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, ShieldAlert, ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface GrepMatch {
  sha256: string;
  jsUrl: string;
  domain: string;
  programName: string;
}

interface GrepResponse {
  scanned: number;
  matchedBlobs: number;
  matches: GrepMatch[];
}

interface VulnerableLib {
  name: string;
  version: string;
  severity: string;
  vulnerabilities: string[] | null;
}

interface GeneralLib {
  name: string;
  version: string;
  occurrences: string;
}

interface AffectedAsset {
  assetId: number;
  domain: string;
  jsUrl: string;
  programName: string;
  platform: string;
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 border border-dashed border-border rounded-md">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/javascript-svgrepo-com.svg"
        alt="JS Hunt"
        className="w-12 h-12 opacity-40 mb-3 grayscale"
      />
      <p className="text-xs font-mono text-muted-foreground max-w-sm">{text}</p>
    </div>
  );
}

const GREP_HINT =
  "Grep every unique JavaScript bundle stored in MinIO for an arbitrary signature — endpoints, API keys, secrets or library markers — and see which subdomains and programs serve it.";
const VULN_HINT =
  "Libraries flagged by retire.js with known CVEs will appear here. Cross-reference a disclosure against your assets to see exactly who is affected.";
const LIB_HINT =
  "Search the catalogue of JavaScript libraries and versions detected across every scanned asset.";

export default function JsHuntPage() {
  const [activeTab, setActiveTab] = useState<"grep" | "vulnerable" | "libraries">("grep");

  // State for Grep
  const [grepQuery, setGrepQuery] = useState("");
  const [grepLimit, setGrepLimit] = useState(300);
  const [grepResults, setGrepResults] = useState<GrepResponse | null>(null);
  const [isGrepping, setIsGrepping] = useState(false);
  const [grepError, setGrepError] = useState("");

  // State for Vulnerable Libs
  const [vulnerableLibs, setVulnerableLibs] = useState<VulnerableLib[]>([]);
  const [isLoadingVulnerable, setIsLoadingVulnerable] = useState(false);
  const [vulnerableError, setVulnerableError] = useState("");
  const [expandedLib, setExpandedLib] = useState<string | null>(null);
  const [affectedAssets, setAffectedAssets] = useState<AffectedAsset[]>([]);
  const [isLoadingAffected, setIsLoadingAffected] = useState(false);

  // State for Library Search
  const [libQuery, setLibQuery] = useState("");
  const [libResults, setLibResults] = useState<GeneralLib[]>([]);
  const [isLoadingLibs, setIsLoadingLibs] = useState(false);
  const [libError, setLibError] = useState("");
  const [expandedSearchLib, setExpandedSearchLib] = useState<string | null>(null);

  // Fetch vulnerable libraries on mount or when tab active
  useEffect(() => {
    if (activeTab === "vulnerable") {
      fetchVulnerable();
    }
  }, [activeTab]);

  async function handleGrepSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!grepQuery.trim()) return;

    setIsGrepping(true);
    setGrepError("");
    setGrepResults(null);

    try {
      const res = await fetch(`/api/js/grep?q=${encodeURIComponent(grepQuery)}&limit=${grepLimit}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Grep request failed");
      }
      const data = await res.json();
      setGrepResults(data);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setGrepError(errMsg);
    } finally {
      setIsGrepping(false);
    }
  }

  async function fetchVulnerable() {
    setIsLoadingVulnerable(true);
    setVulnerableError("");
    try {
      const res = await fetch("/api/libraries/vulnerable");
      if (!res.ok) throw new Error("Failed to load vulnerable libraries");
      const data = await res.json();
      setVulnerableLibs(data);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setVulnerableError(errMsg);
    } finally {
      setIsLoadingVulnerable(false);
    }
  }

  async function handleSearchLibs(e: React.FormEvent) {
    e.preventDefault();
    setIsLoadingLibs(true);
    setLibError("");
    setLibResults([]);
    try {
      const res = await fetch(`/api/libraries?q=${encodeURIComponent(libQuery)}`);
      if (!res.ok) throw new Error("Failed to search libraries");
      const data = await res.json();
      setLibResults(data);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setLibError(errMsg);
    } finally {
      setIsLoadingLibs(false);
    }
  }

  async function loadAffectedAssets(name: string, version: string, isSearch = false) {
    const key = `${name}@${version}`;
    const currentExpanded = isSearch ? expandedSearchLib : expandedLib;
    
    if (currentExpanded === key) {
      if (isSearch) setExpandedSearchLib(null);
      else setExpandedLib(null);
      return;
    }

    if (isSearch) {
      setExpandedSearchLib(key);
    } else {
      setExpandedLib(key);
    }
    
    setIsLoadingAffected(true);
    setAffectedAssets([]);
    try {
      const res = await fetch(`/api/libraries?name=${encodeURIComponent(name)}&version=${encodeURIComponent(version)}`);
      if (!res.ok) throw new Error("Failed to load affected assets");
      const data = await res.json();
      setAffectedAssets(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingAffected(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
          yaad / js-hunt
        </h1>
        <p className="text-xs text-muted-foreground">
          Identify vulnerable JavaScript libraries and search scripts for signatures
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border text-xs font-mono">
        <button
          onClick={() => setActiveTab("grep")}
          className={cn(
            "px-4 py-2 border-b-2 -mb-px transition-colors",
            activeTab === "grep"
              ? "border-primary text-foreground font-semibold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          JS Signature Grep
        </button>
        <button
          onClick={() => setActiveTab("vulnerable")}
          className={cn(
            "px-4 py-2 border-b-2 -mb-px transition-colors",
            activeTab === "vulnerable"
              ? "border-primary text-foreground font-semibold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          CVE Hunting (Vulnerable)
        </button>
        <button
          onClick={() => setActiveTab("libraries")}
          className={cn(
            "px-4 py-2 border-b-2 -mb-px transition-colors",
            activeTab === "libraries"
              ? "border-primary text-foreground font-semibold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Library Search
        </button>
      </div>

      {/* Tab Contents */}
      <div className="pt-2">
        {activeTab === "grep" && (
          <div className="space-y-4">
            <div className="bg-muted/30 border border-border rounded-md p-3 text-xs font-mono">
              <p className="text-muted-foreground mb-2">
                Scan all stored unique JavaScript files (deduplicated by sha256) for an arbitrary signature or API key pattern.
              </p>
              <form onSubmit={handleGrepSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="Regex (e.g. firebaseio\.com or AIza[0-9A-Za-z_-]{35})"
                    value={grepQuery}
                    onChange={(e) => setGrepQuery(e.target.value)}
                    className={cn(
                      "w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-border bg-background",
                      "placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono"
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="2000"
                    title="Max unique blobs to check (most referenced first)"
                    value={grepLimit}
                    onChange={(e) => setGrepLimit(parseInt(e.target.value, 10))}
                    className="w-20 px-2 py-1.5 text-xs rounded-md border border-border bg-background font-mono focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                  <button
                    type="submit"
                    disabled={isGrepping}
                    className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono font-medium rounded-md bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 transition-colors"
                  >
                    {isGrepping && <Loader2 className="w-3 h-3 animate-spin" />}
                    Grep Chunks
                  </button>
                </div>
              </form>
            </div>

            {!isGrepping && !grepResults && !grepError && <EmptyState text={GREP_HINT} />}

            {grepError && (
              <div className="border border-destructive/30 bg-destructive/10 text-destructive text-xs font-mono p-3 rounded-md">
                Error: {grepError}
              </div>
            )}

            {isGrepping && (
              <div className="flex items-center justify-center py-12 text-xs text-muted-foreground font-mono gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                Grepping blobs from S3 storage... This may take a moment.
              </div>
            )}

            {grepResults && (
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground font-mono">
                  Scanned {grepResults.scanned} unique blobs. Found {grepResults.matchedBlobs} matches across {grepResults.matches.length} hosts.
                </div>
                <div className="border border-border rounded-md overflow-x-auto">
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="border-b border-border bg-muted/40 text-[10px] text-muted-foreground uppercase tracking-wider">
                        <th className="text-left px-3 py-2">Subdomain</th>
                        <th className="text-left px-3 py-2">Program</th>
                        <th className="text-left px-3 py-2">Javascript File</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grepResults.matches.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-3 py-8 text-center text-muted-foreground">
                            No signatures matched the pattern.
                          </td>
                        </tr>
                      ) : (
                        grepResults.matches.map((match, i) => (
                          <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                            <td className="px-3 py-2 text-foreground whitespace-nowrap">{match.domain}</td>
                            <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{match.programName}</td>
                            <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">
                              <a
                                href={match.jsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 hover:text-foreground hover:underline"
                              >
                                {match.jsUrl} <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                              </a>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "vulnerable" && (
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground font-mono">
              Libraries detected by retire.js containing known security vulnerabilities.
            </div>

            {isLoadingVulnerable && (
              <div className="flex items-center justify-center py-12 text-xs text-muted-foreground font-mono gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                Querying vulnerable JavaScript index...
              </div>
            )}

            {vulnerableError && (
              <div className="border border-destructive/30 bg-destructive/10 text-destructive text-xs font-mono p-3 rounded-md">
                Error: {vulnerableError}
              </div>
            )}

            {!isLoadingVulnerable && vulnerableLibs.length === 0 && !vulnerableError && (
              <EmptyState text={VULN_HINT} />
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 border border-border rounded-md divide-y divide-border overflow-hidden">
                <div className="bg-muted/40 px-3 py-2 font-mono text-xs font-semibold border-b border-border text-[10px] text-muted-foreground uppercase tracking-wider">
                  Vulnerable Library List
                </div>
                <div className="max-h-[500px] overflow-y-auto divide-y divide-border bg-background">
                  {vulnerableLibs.map((lib) => {
                    const key = `${lib.name}@${lib.version}`;
                    const isExpanded = expandedLib === key;
                    const isHigh = lib.severity === "high";
                    return (
                      <button
                        key={key}
                        onClick={() => loadAffectedAssets(lib.name, lib.version)}
                        className={cn(
                          "w-full text-left px-3 py-2.5 flex items-center justify-between text-xs font-mono transition-colors",
                          isExpanded ? "bg-muted" : "hover:bg-muted/30"
                        )}
                      >
                        <div className="truncate">
                          <span className="font-semibold text-foreground">{lib.name}</span>
                          <span className="ml-2 text-muted-foreground">{lib.version}</span>
                        </div>
                        <span className={cn(
                          "text-[9px] uppercase px-1.5 py-0.5 rounded border leading-none font-semibold font-sans tracking-wide shrink-0",
                          isHigh 
                            ? "bg-destructive/10 text-destructive border-destructive/20" 
                            : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        )}>
                          {lib.severity || "medium"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="md:col-span-2 border border-border rounded-md bg-background flex flex-col min-h-[300px]">
                {expandedLib ? (
                  <div className="p-4 flex-1 flex flex-col font-mono text-xs space-y-4">
                    {/* Header Details */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <ShieldAlert className="w-4 h-4 text-destructive shrink-0" />
                        <h3 className="font-semibold text-sm">{expandedLib.split("@")[0]}</h3>
                        <span className="text-muted-foreground">({expandedLib.split("@")[1]})</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        CVEs / Advisories associated:
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {vulnerableLibs.find(l => `${l.name}@${l.version}` === expandedLib)?.vulnerabilities?.map((vuln, i) => (
                          <span key={i} className="text-[10px] bg-muted px-2 py-0.5 border border-border rounded">
                            {vuln}
                          </span>
                        )) || <span className="text-muted-foreground">None listed</span>}
                      </div>
                    </div>

                    <div className="border-t border-border pt-4 flex-1 flex flex-col">
                      <h4 className="font-semibold text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                        Affected Assets & Programs
                      </h4>

                      {isLoadingAffected ? (
                        <div className="flex-1 flex items-center justify-center gap-2 py-12 text-muted-foreground">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Locating affected domains...
                        </div>
                      ) : affectedAssets.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-muted-foreground py-12 border border-dashed border-border rounded-md">
                          No matching assets in database
                        </div>
                      ) : (
                        <div className="flex-1 overflow-x-auto max-h-[300px] border border-border rounded-md">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-[9px] text-muted-foreground uppercase border-b border-border">
                              <tr>
                                <th className="px-3 py-1.5">Asset</th>
                                <th className="px-3 py-1.5">Program</th>
                                <th className="px-3 py-1.5">JavaScript Path</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {affectedAssets.map((asset, i) => (
                                <tr key={i} className="hover:bg-muted/30 transition-colors">
                                  <td className="px-3 py-2 font-semibold text-foreground whitespace-nowrap">{asset.domain}</td>
                                  <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">
                                    {asset.programName} <span className="text-[9px] text-muted-foreground/60">({asset.platform})</span>
                                  </td>
                                  <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">
                                    <a
                                      href={asset.jsUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 hover:text-foreground hover:underline"
                                    >
                                      {asset.jsUrl} <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-muted-foreground font-mono text-xs">
                    <ShieldAlert className="w-8 h-8 text-muted-foreground/30 mb-2" />
                    <span>Select a vulnerable library from the list to hunt for affected assets.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "libraries" && (
          <div className="space-y-4 font-mono text-xs">
            <div className="bg-muted/30 border border-border rounded-md p-3">
              <p className="text-muted-foreground mb-2">
                Search standard Javascript libraries catalogued across all scanned sites.
              </p>
              <form onSubmit={handleSearchLibs} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="Library name (e.g. jquery, lodash, react, core-js)"
                    value={libQuery}
                    onChange={(e) => setLibQuery(e.target.value)}
                    className={cn(
                      "w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-border bg-background",
                      "placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono"
                    )}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoadingLibs}
                  className="flex items-center gap-1.5 px-4 py-1.5 font-medium rounded-md bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 transition-colors"
                >
                  {isLoadingLibs && <Loader2 className="w-3 h-3 animate-spin" />}
                  Search
                </button>
              </form>
            </div>

            {libError && (
              <div className="border border-destructive/30 bg-destructive/10 text-destructive p-3 rounded-md">
                Error: {libError}
              </div>
            )}

            {isLoadingLibs && (
              <div className="flex items-center justify-center py-12 text-muted-foreground gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                Querying database...
              </div>
            )}

            {!isLoadingLibs && libResults.length === 0 && !libError && <EmptyState text={LIB_HINT} />}

            {libResults.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 border border-border rounded-md divide-y divide-border overflow-hidden bg-background">
                  <div className="bg-muted/40 px-3 py-2 font-semibold text-[10px] text-muted-foreground uppercase tracking-wider border-b border-border">
                    Libraries & Versions Found
                  </div>
                  <div className="max-h-[400px] overflow-y-auto divide-y divide-border">
                    {libResults.map((lib) => {
                      const key = `${lib.name}@${lib.version}`;
                      const isExpanded = expandedSearchLib === key;
                      return (
                        <button
                          key={key}
                          onClick={() => loadAffectedAssets(lib.name, lib.version, true)}
                          className={cn(
                            "w-full text-left px-3 py-2 flex items-center justify-between transition-colors",
                            isExpanded ? "bg-muted" : "hover:bg-muted/30"
                          )}
                        >
                          <div>
                            <span className="font-semibold text-foreground">{lib.name}</span>
                            <span className="ml-2 text-muted-foreground">{lib.version}</span>
                          </div>
                          <span className="text-[10px] bg-muted px-1.5 py-0.5 border border-border rounded text-muted-foreground">
                            {lib.occurrences} instances
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="md:col-span-2 border border-border rounded-md bg-background flex flex-col min-h-[250px]">
                  {expandedSearchLib ? (
                    <div className="p-4 flex-1 flex flex-col space-y-4">
                      <div>
                        <h3 className="font-semibold text-sm mb-1">{expandedSearchLib.split("@")[0]} ({expandedSearchLib.split("@")[1]})</h3>
                        <p className="text-[10px] text-muted-foreground">
                          Assets configured with this library version:
                        </p>
                      </div>

                      {isLoadingAffected ? (
                        <div className="flex-1 flex items-center justify-center gap-2 py-12 text-muted-foreground">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Locating domains...
                        </div>
                      ) : affectedAssets.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-muted-foreground py-12 border border-dashed border-border rounded-md">
                          No matching assets
                        </div>
                      ) : (
                        <div className="flex-1 overflow-x-auto max-h-[300px] border border-border rounded-md">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-muted/40 text-[9px] text-muted-foreground uppercase border-b border-border">
                              <tr>
                                <th className="px-3 py-1.5">Asset</th>
                                <th className="px-3 py-1.5">Program</th>
                                <th className="px-3 py-1.5">JavaScript Path</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              {affectedAssets.map((asset, i) => (
                                <tr key={i} className="hover:bg-muted/30 transition-colors">
                                  <td className="px-3 py-2 font-semibold text-foreground whitespace-nowrap">{asset.domain}</td>
                                  <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">
                                    {asset.programName} <span className="text-[9px] text-muted-foreground/60">({asset.platform})</span>
                                  </td>
                                  <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">
                                    <a
                                      href={asset.jsUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 hover:text-foreground hover:underline"
                                    >
                                      {asset.jsUrl} <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                      <ArrowRight className="w-6 h-6 text-muted-foreground/30 mb-2" />
                      <span>Select a library version to view its instances across program domains.</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
