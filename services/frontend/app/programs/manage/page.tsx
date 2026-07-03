"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2, CheckCircle2, AlertTriangle, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgramOption {
  id: number;
  name: string;
  platform: string;
}

export default function ManageProgramsPage() {
  const [activeTab, setActiveTab] = useState<"program" | "subdomains">("program");

  // Program Form State
  const [progName, setProgName] = useState("");
  const [progPlatform, setProgPlatform] = useState("Private");
  const [progOffersReward, setProgOffersReward] = useState(true);
  const [progScopes, setProgScopes] = useState("");
  const [isSubmittingProg, setIsSubmittingProg] = useState(false);
  const [progResult, setProgResult] = useState<{
    success: boolean;
    scopesCount?: number;
    jobs?: { enumerate: number; scan: number };
    error?: string;
  } | null>(null);

  // Bulk Subdomains Form State
  const [programsList, setProgramsList] = useState<ProgramOption[]>([]);
  const [selectedProgId, setSelectedProgId] = useState("");
  const [bulkSubdomains, setBulkSubdomains] = useState("");
  const [isSubmittingSubs, setIsSubmittingSubs] = useState(false);
  const [subsResult, setSubsResult] = useState<{
    success: boolean;
    processed?: number;
    inserted?: number;
    enqueued?: number;
    error?: string;
  } | null>(null);

  // Fetch programs for selector
  useEffect(() => {
    fetchPrograms();
  }, []);

  async function fetchPrograms() {
    try {
      const res = await fetch("/api/programs");
      if (res.ok) {
        const data = await res.json();
        setProgramsList(data);
        if (data.length > 0 && !selectedProgId) {
          setSelectedProgId(String(data[0].id));
        }
      }
    } catch (err) {
      console.error("Failed to load programs:", err);
    }
  }

  async function handleProgramSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!progName.trim() || !progPlatform.trim()) return;

    setIsSubmittingProg(true);
    setProgResult(null);

    try {
      const res = await fetch("/api/programs/private", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: progName.trim(),
          platform: progPlatform.trim(),
          offersReward: progOffersReward,
          scopes: progScopes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save program");
      
      setProgResult({
        success: true,
        scopesCount: data.scopesCount,
        jobs: data.jobs,
      });

      // Clear scopes field and refresh programs selector
      setProgScopes("");
      fetchPrograms();
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setProgResult({ success: false, error: errMsg });
    } finally {
      setIsSubmittingProg(false);
    }
  }

  async function handleSubdomainsSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProgId || !bulkSubdomains.trim()) return;

    setIsSubmittingSubs(true);
    setSubsResult(null);

    try {
      const res = await fetch("/api/assets/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programId: selectedProgId,
          subdomains: bulkSubdomains,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to ingest subdomains");

      setSubsResult({
        success: true,
        processed: data.processed,
        inserted: data.inserted,
        enqueued: data.enqueued,
      });

      // Clear input
      setBulkSubdomains("");
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setSubsResult({ success: false, error: errMsg });
    } finally {
      setIsSubmittingSubs(false);
    }
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
          yaad / manage-scopes
        </h1>
        <p className="text-xs text-muted-foreground">
          Import private programs, set scope rules, or ingest domains in bulk to trigger automated scans
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border text-xs font-mono">
        <button
          onClick={() => setActiveTab("program")}
          className={cn(
            "px-4 py-2 border-b-2 -mb-px transition-colors",
            activeTab === "program"
              ? "border-primary text-foreground font-semibold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Add Private Program
        </button>
        <button
          onClick={() => setActiveTab("subdomains")}
          className={cn(
            "px-4 py-2 border-b-2 -mb-px transition-colors",
            activeTab === "subdomains"
              ? "border-primary text-foreground font-semibold"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Add Bulk Subdomains
        </button>
      </div>

      {/* Tab Contents */}
      <div className="pt-2">
        {activeTab === "program" && (
          <form onSubmit={handleProgramSubmit} className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-muted-foreground block">Program Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My Private Target"
                  value={progName}
                  onChange={(e) => setProgName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-muted-foreground block">Platform</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Private, HackerOne, Bugcrowd"
                  value={progPlatform}
                  onChange={(e) => setProgPlatform(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                id="offersReward"
                checked={progOffersReward}
                onChange={(e) => setProgOffersReward(e.target.checked)}
                className="w-3.5 h-3.5 border-border rounded bg-background accent-primary"
              />
              <label htmlFor="offersReward" className="text-muted-foreground select-none cursor-pointer">
                Eligible for rewards (Offers Bounty / Reward)
              </label>
            </div>

            <div className="space-y-1">
              <label className="text-muted-foreground block">
                Scopes / Root Targets <span className="text-[10px] text-muted-foreground/60">(One rule per line)</span>
              </label>
              <textarea
                rows={8}
                placeholder="*.target.com&#10;standalone.target.com&#10;*.anotherdomain.net"
                value={progScopes}
                onChange={(e) => setProgScopes(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono placeholder:text-muted-foreground/50 resize-y"
              />
              <p className="text-[10px] text-muted-foreground/60">
                Wildcard scopes (starting with <code className="text-foreground">*.</code>) trigger subdomain enumeration (subfinder, crtsh, gau). Standalone domains bypass enumeration and are queued directly for HTTP scanning.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmittingProg}
              className="flex items-center gap-1.5 px-4 py-2 font-medium rounded-md bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 transition-colors"
            >
              {isSubmittingProg ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving program & triggering queues...
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" /> Save Program
                </>
              )}
            </button>

            {progResult && (
              <div className={cn(
                "p-3 rounded-md border text-xs font-mono space-y-1 flex items-start gap-2.5",
                progResult.success 
                  ? "bg-green-500/10 text-green-500 border-green-500/20" 
                  : "bg-destructive/10 text-destructive border-destructive/20"
              )}>
                {progResult.success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Program and scopes imported successfully!</p>
                      <p className="text-[10px] opacity-80">
                        Saved {progResult.scopesCount} scope rules. Jobs triggered: {progResult.jobs?.enumerate} subdomains enumeration, {progResult.jobs?.scan} HTTP scans.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Failed to import program</p>
                      <p className="text-[10px] opacity-80">{progResult.error}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </form>
        )}

        {activeTab === "subdomains" && (
          <form onSubmit={handleSubdomainsSubmit} className="space-y-4 font-mono text-xs">
            <div className="space-y-1">
              <label className="text-muted-foreground block">Select Program</label>
              {programsList.length === 0 ? (
                <div className="text-muted-foreground text-xs italic">
                  No programs found. Create a program first.
                </div>
              ) : (
                <select
                  value={selectedProgId}
                  onChange={(e) => setSelectedProgId(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono"
                >
                  {programsList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.platform})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-muted-foreground block">
                Subdomains <span className="text-[10px] text-muted-foreground/60">(One subdomain hostname per line)</span>
              </label>
              <textarea
                rows={10}
                required
                placeholder="api.target.com&#10;dev.target.com&#10;dashboard.target.com"
                value={bulkSubdomains}
                onChange={(e) => setBulkSubdomains(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring font-mono placeholder:text-muted-foreground/50 resize-y"
              />
              <p className="text-[10px] text-muted-foreground/60">
                These subdomains are resolved against the program's scopes (e.g. matching wildcard rules). If no matching scope exists, an exact scope is automatically created. All new assets are added and enqueued for HTTP scanning immediately.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmittingSubs || !selectedProgId}
              className="flex items-center gap-1.5 px-4 py-2 font-medium rounded-md bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 transition-colors"
            >
              {isSubmittingSubs ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Ingesting & scanning...
                </>
              ) : (
                <>
                  <Globe className="w-3.5 h-3.5" /> Ingest Subdomains
                </>
              )}
            </button>

            {subsResult && (
              <div className={cn(
                "p-3 rounded-md border text-xs font-mono space-y-1 flex items-start gap-2.5",
                subsResult.success 
                  ? "bg-green-500/10 text-green-500 border-green-500/20" 
                  : "bg-destructive/10 text-destructive border-destructive/20"
              )}>
                {subsResult.success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Subdomains ingested successfully!</p>
                      <p className="text-[10px] opacity-80">
                        Processed {subsResult.processed} lines, inserted {subsResult.inserted} assets. Triggered {subsResult.enqueued} new HTTP scans (existing assets are skipped/updated).
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Failed to ingest subdomains</p>
                      <p className="text-[10px] opacity-80">{subsResult.error}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
