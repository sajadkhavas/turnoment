import { Link } from "@tanstack/react-router";
import { AlertTriangle, LockKeyhole } from "lucide-react";
import type { ReactNode } from "react";

export function SectionCard({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-border bg-card p-5 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-black">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function EmptyState({ text, ctaLabel, ctaTo }: { text: string; ctaLabel?: string; ctaTo?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-elevated/40 p-6 text-center">
      <p className="text-sm text-muted-foreground">{text}</p>
      {ctaLabel && ctaTo && (
        <Link
          to={ctaTo}
          className="mt-3 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-xs font-bold text-primary-foreground"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}

function Bar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-elevated ${className}`} />;
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-live="polite">
      <Bar className="h-24 w-full" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Bar key={i} className="h-28 w-full" />
        ))}
      </div>
      <Bar className="h-40 w-full" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Bar className="h-56 w-full" />
        <Bar className="h-56 w-full" />
      </div>
      <Bar className="h-64 w-full" />
    </div>
  );
}

export function DashboardErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-border bg-card p-10 text-center">
      <AlertTriangle className="h-8 w-8 text-warning" aria-hidden="true" />
      <h2 className="mt-4 text-base font-black">اطلاعات داشبورد بارگذاری نشد</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        ارتباط با سرویس مسابقات برقرار نشد. چند لحظه بعد دوباره تلاش کن.
      </p>
      <button
        type="button"
        onClick={() => (onRetry ? onRetry() : window.location.reload())}
        className="mt-5 inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground"
      >
        تلاش دوباره
      </button>
    </div>
  );
}

export function SessionExpiredState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-border bg-card p-10 text-center">
      <LockKeyhole className="h-8 w-8 text-primary" aria-hidden="true" />
      <h2 className="mt-4 text-base font-black">نشست شما منقضی شده است</h2>
      <p className="mt-2 text-sm text-muted-foreground">برای ادامه، دوباره وارد حساب بازیکن خود شو.</p>
      <Link to="/login" className="mt-5 inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground">
        ورود دوباره
      </Link>
    </div>
  );
}
