import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 max-w-7xl flex h-12 items-center justify-between">
        <span className="font-mono font-bold text-sm tracking-tight">YAAD</span>
        <ThemeToggle />
      </div>
    </header>
  );
}
