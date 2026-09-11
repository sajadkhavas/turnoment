import { Link } from "@tanstack/react-router";
import { Menu, Swords, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "خانه" },
  { to: "/tournaments", label: "مسابقات" },
  { to: "/games", label: "بازی‌ها" },
  { to: "/centers", label: "گیم‌نت‌ها" },
  { to: "/ranking", label: "رتبه‌بندی" },
  { to: "/host", label: "میزبان شو" },
];

export function TournamentHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="h-[2px] w-full rgb-strip" />
      <div className="container mx-auto grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4">
        <Link to="/" aria-label="Turnoment — خانه" className="flex min-w-0 shrink-0 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-[var(--shadow-glow)]">
            <Swords className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="truncate text-sm font-black">Turnoment</span>
            <span className="truncate text-[10px] text-muted-foreground">مسابقات حضوری گیمینگ</span>
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-1 lg:flex" aria-label="ناوبری اصلی">
          {nav.map((item) => (
            <Link key={item.label} to={item.to} className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link to="/login" className="hidden min-h-10 items-center rounded-lg border border-border bg-surface px-4 text-sm font-bold transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex">
            ورود بازیکن
          </Link>
          <Link to="/tournaments" className="inline-flex min-h-10 items-center rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            مشاهده مسابقات
          </Link>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "بستن منو" : "باز کردن منو"} aria-expanded={open} aria-controls="mobile-main-navigation" className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden">
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-main-navigation" className="border-t border-border bg-background lg:hidden" aria-label="ناوبری موبایل">
          <div className="container mx-auto flex flex-col px-4 py-2">
            {nav.map((item) => (
              <Link key={item.label} to={item.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {item.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              ورود بازیکن
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
