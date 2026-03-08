"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchCombobox } from "@/components/ui/combobox";

interface Props {
  platforms: string[];
  technologies: string[];
  programs: string[];
}

export function AssetFilters({ platforms, technologies, programs }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      next.delete("cursor");
      startTransition(() => {
        router.push(`/?${next.toString()}`);
      });
    },
    [params, router]
  );

  const q = params.get("q") ?? "";
  const technology = params.get("technology") ?? "";
  const platform = params.get("platform") ?? "";
  const programName = params.get("program") ?? "";
  const excludeVdp = params.get("excludeVdp") === "1";

  function toggleExcludeVdp() {
    const next = new URLSearchParams(params.toString());
    if (excludeVdp) {
      next.delete("excludeVdp");
    } else {
      next.set("excludeVdp", "1");
    }
    next.delete("cursor");
    startTransition(() => {
      router.push(`/?${next.toString()}`);
    });
  }

  return (
    <div className={cn("flex flex-col sm:flex-row gap-2 flex-wrap", isPending && "opacity-60 pointer-events-none")}>
      {/* Keyword search */}
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search domains..."
          defaultValue={q}
          onChange={(e) => update("q", e.target.value)}
          className={cn(
            "w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-border bg-background",
            "placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring",
            "font-mono"
          )}
        />
        {q && (
          <button
            onClick={() => update("q", "")}
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
        onChange={(v) => update("technology", v)}
        placeholder="All technologies"
        searchPlaceholder="Search tech..."
        triggerClassName="w-44"
      />

      {/* Platform filter */}
      <select
        value={platform}
        onChange={(e) => update("platform", e.target.value)}
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
        onClick={toggleExcludeVdp}
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
        value={programName}
        onChange={(v) => update("program", v)}
        placeholder="All programs"
        searchPlaceholder="Search program..."
        triggerClassName="w-36"
      />
    </div>
  );
}
