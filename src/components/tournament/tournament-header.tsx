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
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-[var(--shadow-glow)]">
            <Swords className="h-4 w-4" />
          </span>
          <span className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="truncate text-sm font-bold">ایران مهر افزار</span>
            <span className="truncate text-[10px] text-muted-foreground">پلتفرم مسابقات حضوری</span>
          </span>
        </Link>

        <nav className="hidden items-center justify-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/login"
            className="hidden h-10 items-center rounded-lg border border-border bg-surface px-4 text-sm font-bold transition-colors hover:border-primary/60 hover:text-primary sm:inline-flex"
          >
            ورود بازیکن
          </Link>
          <Link
            to="/tournaments"
            className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong"
          >
            مشاهده مسابقات
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="منو"
            aria-expanded={open}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-surface lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="container mx-auto flex flex-col px-4 py-2">
            {nav.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-bold text-primary">
              ورود بازیکن
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
