import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  Gamepad2,
  House,
  LogIn,
  MapPin,
  Medal,
  Menu,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const nav = [
  { to: "/", label: "خانه", icon: House },
  { to: "/tournaments", label: "مسابقات", icon: Trophy },
  { to: "/games", label: "بازی‌ها", icon: Gamepad2 },
  { to: "/centers", label: "گیم‌نت‌ها", icon: MapPin },
  { to: "/ranking", label: "رتبه‌بندی", icon: Medal },
  { to: "/host", label: "میزبان شو", icon: Users },
] as const;

export function TournamentHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="h-[2px] w-full rgb-strip" />

      {/* Mobile header */}
      <div
        className="relative h-16 border-b border-white/5 px-4 lg:hidden"
        dir="ltr"
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              aria-label="باز کردن منو"
              className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-2xl border border-white/10 bg-surface/80 shadow-lg backdrop-blur-xl transition-all hover:border-primary/40 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Menu className="h-5 w-5" />
            </button>
          </DialogTrigger>

          <DialogContent
            dir="rtl"
            className="left-0 top-0 h-dvh w-[86vw] max-w-[360px] translate-x-0 translate-y-0 overflow-hidden rounded-none border-y-0 border-l-0 border-r border-primary/20 bg-background/95 p-0 shadow-[0_0_80px_rgba(124,58,237,0.18)] backdrop-blur-2xl sm:max-w-[360px] sm:rounded-none [&>button]:hidden"
          >
            <DialogTitle className="sr-only">
              منوی اصلی Turnoment
            </DialogTitle>

            <DialogDescription className="sr-only">
              دسترسی به بخش‌های اصلی پلتفرم Turnoment
            </DialogDescription>

            <div className="relative border-b border-white/10 px-5 pb-5 pt-6">
              <div className="absolute inset-0 bg-gradient-to-bl from-primary/15 via-transparent to-secondary/10" />

              <div className="relative flex items-center justify-between">
                <img
                  src="/brand/turnoment-logo.png"
                  alt="Turnoment"
                  className="h-11 w-auto object-contain"
                />

                <DialogClose asChild>
                  <button
                    type="button"
                    aria-label="بستن منو"
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-background/60 transition-colors hover:bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </DialogClose>
              </div>

              <p className="relative mt-4 text-xs leading-6 text-muted-foreground">
                مسابقات حضوری، گیم‌نت‌ها و مسیر رقابت بازیکنان
              </p>
            </div>

            <nav className="flex flex-col gap-1.5 p-4">
              {nav.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="group flex min-h-14 items-center gap-3 rounded-2xl border border-transparent px-3 text-sm font-medium text-muted-foreground transition-all hover:border-white/10 hover:bg-white/[0.04] hover:text-foreground"
                    activeProps={{
                      className:
                        "border-primary/20 bg-primary/10 text-primary",
                    }}
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-surface/80 transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>

                    <span className="flex-1">{item.label}</span>

                    <ChevronLeft className="h-4 w-4 opacity-40" />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-white/10 p-4">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-primary to-secondary px-4 text-sm font-black text-white shadow-[0_10px_30px_rgba(124,58,237,0.25)]"
              >
                <LogIn className="h-4 w-4" />
                ورود بازیکن
              </Link>
            </div>
          </DialogContent>
        </Dialog>

        {/* centered logo */}
        <Link
          to="/"
          aria-label="Turnoment — خانه"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <img
            src="/brand/turnoment-logo.png"
            alt="Turnoment"
            className="h-auto w-[98px] object-contain max-[360px]:w-[84px]"
          />
        </Link>

        {/* right CTA */}
        <Link
          to="/tournaments"
          dir="rtl"
          className="absolute right-4 top-1/2 inline-flex min-h-10 -translate-y-1/2 items-center rounded-xl bg-primary px-3 text-xs font-black text-primary-foreground shadow-[0_8px_25px_rgba(124,58,237,0.25)] transition-transform active:scale-95 max-[360px]:px-2"
        >
          مشاهده مسابقات
        </Link>
      </div>

      {/* Desktop header */}
      <div className="container mx-auto hidden h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 lg:grid">
        <Link
          to="/"
          aria-label="Turnoment — خانه"
          className="flex min-w-0 shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <img
            src="/brand/turnoment-logo.png"
            alt="Turnoment"
            className="h-11 w-auto object-contain"
          />
        </Link>

        <nav
          className="flex items-center justify-center gap-1"
          aria-label="ناوبری اصلی"
        >
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/login"
            className="inline-flex min-h-10 items-center rounded-lg border border-border bg-surface px-4 text-sm font-bold transition-colors hover:border-primary/60 hover:text-primary"
          >
            ورود بازیکن
          </Link>

          <Link
            to="/tournaments"
            className="inline-flex min-h-10 items-center rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong"
          >
            مشاهده مسابقات
          </Link>
        </div>
      </div>
    </header>
  );
}