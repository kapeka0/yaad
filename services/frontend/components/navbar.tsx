"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const LINKS = [
  { href: "/js-hunt", label: "JS Hunt" },
  { href: "/programs/manage", label: "Manage Scopes" },
  { href: "/stats", label: "Stats" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 max-w-7xl flex h-12 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "font-mono font-bold text-sm tracking-tight transition-opacity hover:opacity-80",
              pathname === "/" && "text-foreground"
            )}
          >
            YAAD
          </Link>
          <nav className="flex items-center gap-4 text-xs font-mono">
            {LINKS.map((l) => {
              const active = pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "transition-colors",
                    active ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <a
            href="https://github.com/kapeka0/yaad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground transition-colors"
          >
            <img src="/images/github.svg" alt="GitHub" className="w-4 h-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
