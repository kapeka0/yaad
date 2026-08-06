"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { SearchCombobox } from "@/components/ui/combobox";

interface ProgramOption {
  id: number;
  name: string;
  platform: string;
}

const inputCls =
  "w-full px-3 py-1.5 text-xs rounded-md border border-border bg-background text-foreground font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring";
const btnCls =
  "px-3 py-1.5 text-xs font-mono rounded-md bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 transition-colors";

function Status({ msg }: { msg: { ok: boolean; text: string } | null }) {
  if (!msg) return null;
  return (
    <p className={cn("text-xs font-mono", msg.ok ? "text-emerald-500" : "text-destructive")}>
      {msg.text}
    </p>
  );
}

export default function ManageProgramsPage() {
  const [programs, setPrograms] = useState<ProgramOption[]>([]);

  // New program
  const [name, setName] = useState("");
  const [platform, setPlatform] = useState("Private");
  const [reward, setReward] = useState(true);
  const [scopes, setScopes] = useState("");
  const [savingProg, setSavingProg] = useState(false);
  const [progMsg, setProgMsg] = useState<{ ok: boolean; text: string } | null>(null);

  // Bulk subdomains
  const [programId, setProgramId] = useState("");
  const [subs, setSubs] = useState("");
  const [savingSubs, setSavingSubs] = useState(false);
  const [subsMsg, setSubsMsg] = useState<{ ok: boolean; text: string } | null>(null);

  // Build searchable labels and O(1) lookup maps only when the program list
  // changes, not on every textarea keystroke.
  const programOptions = useMemo(() => {
    const labels: string[] = [];
    const idByLabel = new Map<string, string>();
    const labelById = new Map<string, string>();
    for (const program of programs) {
      const label = `${program.name} (${program.platform})`;
      const id = String(program.id);
      labels.push(label);
      idByLabel.set(label, id);
      labelById.set(id, label);
    }
    return { labels, idByLabel, labelById };
  }, [programs]);

  const selectedProgramLabel = programOptions.labelById.get(programId) ?? "";

  const loadPrograms = useCallback(async () => {
    try {
      const res = await fetch("/api/programs");
      if (!res.ok) return;
      const data: ProgramOption[] = await res.json();
      setPrograms(data);
      setProgramId((cur) => cur || (data[0] ? String(data[0].id) : ""));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    void loadPrograms();
  }, [loadPrograms]);

  async function submitProgram(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSavingProg(true);
    setProgMsg(null);
    try {
      const res = await fetch("/api/programs/private", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), platform: platform.trim() || "Private", offersReward: reward, scopes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setProgMsg({
        ok: true,
        text: `Saved · ${data.scopesCount} scopes · ${data.jobs?.enumerate ?? 0} enum, ${data.jobs?.scan ?? 0} scan jobs`,
      });
      setScopes("");
      void loadPrograms();
    } catch (err) {
      setProgMsg({ ok: false, text: err instanceof Error ? err.message : String(err) });
    } finally {
      setSavingProg(false);
    }
  }

  async function submitSubs(e: React.FormEvent) {
    e.preventDefault();
    if (!programId || !subs.trim()) return;
    setSavingSubs(true);
    setSubsMsg(null);
    try {
      const res = await fetch("/api/assets/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ programId, subdomains: subs }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setSubsMsg({
        ok: true,
        text: `Processed ${data.processed} · ${data.linked ?? data.inserted} linked · ${data.inserted} new · ${data.skipped ?? 0} skipped · ${data.enqueued} scans queued`,
      });
      setSubs("");
    } catch (err) {
      setSubsMsg({ ok: false, text: err instanceof Error ? err.message : String(err) });
    } finally {
      setSavingSubs(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="border-b border-border pb-4">
        <h1 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          yaad / manage
        </h1>
      </div>

      {/* New program */}
      <form onSubmit={submitProgram} className="space-y-3">
        <h2 className="text-xs font-mono font-semibold text-foreground">New program</h2>
        <div className="grid grid-cols-2 gap-2">
          <input className={inputCls} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <select className={inputCls} value={platform} onChange={(e) => setPlatform(e.target.value)} aria-label="Visibility">
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
        </div>
        <textarea
          className={cn(inputCls, "resize-y")}
          rows={5}
          placeholder={"*.target.com\napp.target.com"}
          value={scopes}
          onChange={(e) => setScopes(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs font-mono text-muted-foreground cursor-pointer">
            <input type="checkbox" checked={reward} onChange={(e) => setReward(e.target.checked)} className="accent-foreground" />
            offers reward
          </label>
          <button type="submit" disabled={savingProg} className={btnCls}>
            {savingProg ? "Saving…" : "Add program"}
          </button>
        </div>
        <p className="text-[10px] font-mono text-muted-foreground/60">
          One scope per line. <code className="text-foreground">*.domain</code> enumerates; a bare host scans directly.
        </p>
        <Status msg={progMsg} />
      </form>

      {/* Bulk subdomains */}
      <form onSubmit={submitSubs} className="space-y-3 border-t border-border pt-6">
        <h2 className="text-xs font-mono font-semibold text-foreground">Bulk subdomains</h2>
        <SearchCombobox
          options={programOptions.labels}
          value={selectedProgramLabel}
          onChange={(label) => setProgramId(programOptions.idByLabel.get(label) ?? "")}
          placeholder={programs.length === 0 ? "No programs yet" : "Select program"}
          searchPlaceholder="Search program..."
          triggerClassName="w-full"
          disabled={programs.length === 0}
        />
        <textarea
          className={cn(inputCls, "resize-y")}
          rows={6}
          placeholder={"api.target.com\ndev.target.com"}
          value={subs}
          onChange={(e) => setSubs(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-mono text-muted-foreground/60">
            Matches an existing scope or creates one, then queues scans.
          </p>
          <button type="submit" disabled={savingSubs || !programId} className={btnCls}>
            {savingSubs ? "Adding…" : "Add subdomains"}
          </button>
        </div>
        <Status msg={subsMsg} />
      </form>
    </div>
  );
}
