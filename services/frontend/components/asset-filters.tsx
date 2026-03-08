"use client";

import { cn } from "@/lib/utils";
import { Download, Loader2, Search, X } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { SearchCombobox } from "@/components/ui/combobox";
import { useSearchParams } from "next/navigation";

interface Props {
  platforms: string[];
  technologies: string[];
  programs: string[];
}

async function exportDomains(params: URLSearchParams) {
  const p = new URLSearchParams(params.toString());
  p.delete("cursor");
  const res = await fetch(`/api/assets/export?${p.toString()}`);
  const text = await res.text();
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "domains.txt";
  a.click();
  URL.revokeObjectURL(url);
}

export function AssetFilters({ platforms, technologies, programs }: Props) {
  const searchParams = useSearchParams();

  const [q, setQ] = useQueryState("q", parseAsString.withDefault("").withOptions({ shallow: false }));
  const [technology, setTechnology] = useQueryState("technology", parseAsString.withDefault("").withOptions({ shallow: false }));
  const [platform, setPlatform] = useQueryState("platform", parseAsString.withDefault("").withOptions({ shallow: false }));
  const [program, setProgram] = useQueryState("program", parseAsString.withDefault("").withOptions({ shallow: false }));
  const [excludeVdp, setExcludeVdp] = useQueryState("excludeVdp", parseAsBoolean.withDefault(false).withOptions({ shallow: false }));

  // Local input state — debounce the URL write by 300ms
  const [inputValue, setInputValue] = useState(q);
  const [debouncedSetQ] = useDebounce((v: string) => setQ(v || null), 300);

  const [exporting, setExporting] = useState(false);

  function handleSearchChange(value: string) {
    setInputValue(value);
    debouncedSetQ(value);
  }

  function handleClear() {
    setInputValue("");
    setQ(null);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
      {/* Keyword search */}
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search domains..."
          value={inputValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={cn(
            "w-full pl-8 pr-7 py-1.5 text-xs rounded-md border border-border bg-background",
            "placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring",
            "font-mono"
          )}
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Technology filter */}
      <SearchCombobox
        options={technologies}
        value={technology}
        onChange={(v) => setTechnology(v || null)}
        placeholder="All technologies"
        searchPlaceholder="Search tech..."
        triggerClassName="w-44"
      />

      {/* Platform filter */}
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value || null)}
        className={cn(
          "px-3 py-1.5 text-xs rounded-md border border-border bg-background",
          "focus:outline-none focus:ring-1 focus:ring-ring font-mono",
          "text-foreground"
        )}
      >
        <option value="">All platforms</option>
        {platforms.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      {/* No VDP toggle */}
      <button
        onClick={() => setExcludeVdp(excludeVdp ? null : true)}
        className={cn(
          "px-3 py-1.5 text-xs rounded-md font-mono border transition-colors",
          excludeVdp
            ? "bg-primary text-primary-foreground border-primary"
            : "border-border text-muted-foreground hover:text-foreground"
        )}
      >
        No VDP
      </button>

      {/* Program filter */}
      <SearchCombobox
        options={programs}
        value={program}
        onChange={(v) => setProgram(v || null)}
        placeholder="All programs"
        searchPlaceholder="Search program..."
        triggerClassName="w-36"
      />

      {/* Export button */}
      <button
        disabled={exporting}
        onClick={async () => {
          setExporting(true);
          try { await exportDomains(searchParams); } finally { setExporting(false); }
        }}
        title="Export domains"
        className={cn(
          "flex items-center justify-center px-2.5 py-1.5 rounded-md border border-border",
          "text-muted-foreground hover:text-foreground transition-colors",
          exporting && "opacity-60 pointer-events-none"
        )}
      >
        {exporting
          ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
          : <Download className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
