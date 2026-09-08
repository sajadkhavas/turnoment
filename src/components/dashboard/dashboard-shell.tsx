import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { TournamentHeader } from "@/components/tournament/tournament-header";
import { dashboardNav } from "./dashboard-nav";

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="ناوبری داشبورد بازیکن" className="flex flex-col gap-1">
      {dashboardNav.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          activeOptions={item.exact ? { exact: true } : undefined}
          className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          activeProps={{
            className:
              "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold bg-primary/12 text-primary border border-primary/30",
          }}
        >
          <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TournamentHeader />

      {/* mobile dashboard bar */}
      <div className="sticky top-16 z-40 border-b border-border/60 bg-background/90 backdrop-blur-xl lg:hidden">
        <div className="container mx-auto flex h-14 items-center justify-between gap-3 px-4">
          <span className="text-sm font-bold">مرکز رقابت</span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="باز کردن ناوبری داشبورد"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-xs font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Menu className="h-4 w-4" aria-hidden="true" /> منو
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="بستن ناوبری"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="ناوبری داشبورد"
            className="absolute inset-y-0 end-0 w-[82%] max-w-xs overflow-y-auto border-s border-border bg-card p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-black">داشبورد بازیکن</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="بستن"
                className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <NavList onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="container mx-auto flex-1 px-4 py-6 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_252px]">
          <main className="order-2 min-w-0 lg:order-1">{children}</main>
          <aside className="order-1 hidden lg:order-2 lg:block">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-3">
              <NavList />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
