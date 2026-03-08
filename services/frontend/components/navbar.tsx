import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 max-w-7xl flex h-12 items-center justify-between">
        <span className="font-mono font-bold text-sm tracking-tight">YAAD</span>
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
