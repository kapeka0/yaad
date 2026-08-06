"use client";

import { useState, useRef, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchComboboxProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  triggerClassName?: string;
  disabled?: boolean;
  maxVisibleOptions?: number;
}

export function SearchCombobox({
  options,
  value,
  onChange,
  placeholder = "All",
  searchPlaceholder = "Search...",
  triggerClassName,
  disabled = false,
  maxVisibleOptions = 100,
}: SearchComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setSearch("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const filtered = search
    ? options.filter((o) => o.toLowerCase().includes(search.toLowerCase()))
    : options;
  const visibleOptions = filtered.slice(0, maxVisibleOptions);

  const label = value || placeholder;

  function select(v: string) {
    onChange(v);
    setOpen(false);
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          disabled={disabled}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs rounded-md border border-border bg-background",
            "focus:outline-none focus:ring-1 focus:ring-ring font-mono text-foreground",
            "justify-between min-w-0 disabled:cursor-not-allowed disabled:opacity-50",
            triggerClassName
          )}
        >
          <span className="truncate">{label}</span>
          <ChevronDown className="w-3 h-3 shrink-0 text-muted-foreground" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={cn(
            "z-50 w-56 rounded-md border border-border bg-background shadow-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
          align="start"
          sideOffset={4}
        >
          <div className="p-1 border-b border-border">
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full px-2 py-1 text-xs bg-transparent focus:outline-none placeholder:text-muted-foreground font-mono"
            />
          </div>
          <ul className="max-h-48 overflow-y-auto p-1">
            <li>
              <button
                onClick={() => select("")}
                className={cn(
                  "w-full flex items-center justify-between px-2 py-1 text-xs rounded font-mono",
                  "hover:bg-accent hover:text-accent-foreground",
                  !value && "text-primary font-medium"
                )}
              >
                <span>{placeholder}</span>
                {!value && <Check className="w-3 h-3" />}
              </button>
            </li>
            {visibleOptions.map((opt) => (
              <li key={opt}>
                <button
                  onClick={() => select(opt)}
                  className={cn(
                    "w-full flex items-center justify-between px-2 py-1 text-xs rounded font-mono",
                    "hover:bg-accent hover:text-accent-foreground",
                    value === opt && "text-primary font-medium"
                  )}
                >
                  <span className="truncate">{opt}</span>
                  {value === opt && <Check className="w-3 h-3 shrink-0" />}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-2 py-1 text-xs text-muted-foreground font-mono">No results</li>
            )}
            {filtered.length > visibleOptions.length && (
              <li className="px-2 py-1 text-xs text-muted-foreground font-mono">
                {filtered.length - visibleOptions.length} more results. Type to narrow the list.
              </li>
            )}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
