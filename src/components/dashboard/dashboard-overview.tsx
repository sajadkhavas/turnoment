import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, CalendarClock, Radio, ShieldCheck, Swords, Trophy } from "lucide-react";
import type {
  ChallengeProgress,
  CompetitiveSnapshot,
  NextAction,
  PlayerIdentitySummary,
} from "@/lib/dashboard-data";
import { formatNumber, toPersianDigits } from "@/lib/format";
import { SectionCard } from "./dashboard-states";

export function PlayerDashboardHeader({ identity }: { identity: PlayerIdentitySummary }) {
  return (
    <header className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">سلام، {identity.displayName} 👋</p>
        <h1 className="mt-1 text-xl font-black sm:text-2xl">مرکز رقابت تو</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          مسابقات، چالش‌ها و عملکرد رقابتی خودت رو از اینجا دنبال کن.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-border bg-elevated p-3">
        <span
          aria-hidden="true"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-black text-primary-foreground"
        >
          {identity.avatarInitials}
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-black" dir="ltr">{identity.gamerTag}</div>
          <div className="mt-0.5 flex items-center gap-1 text-[11px] text-success">
            <ShieldCheck className="h-3 w-3" aria-hidden="true" /> {identity.statusLabel}
          </div>
          <Link
            to="/players/$username"
            params={{ username: identity.username }}
            className="mt-1 inline-block text-[11px] font-bold text-primary hover:underline"
          >
            مشاهده پروفایل
          </Link>
        </div>
      </div>
    </header>
  );
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`mt-2 font-mono-num text-2xl font-black ${accent}`} dir="ltr">{value}</div>
      {sub && <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

export function CompetitiveSnapshotCards({ snapshot }: { snapshot: CompetitiveSnapshot }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="رتبه مسابقات (Tournament Rating)"
        value={formatNumber(snapshot.tournamentRating)}
        sub={`رتبه #${toPersianDigits(snapshot.tournamentRank)}`}
        accent="text-primary"
      />
      <StatCard
        label="رتبه چالش (Challenge Rating)"
        value={formatNumber(snapshot.challengeRating)}
        sub="سیستم امتیاز مستقل از مسابقات"
        accent="text-secondary"
      />
      <StatCard label="مسابقات نهایی‌شده" value={formatNumber(snapshot.finalizedMatches)} accent="text-foreground" />
      <StatCard label="قهرمانی‌ها و بردهای مسابقاتی" value={formatNumber(snapshot.tournamentWins)} accent="text-success" />
    </div>
  );
}

export function ChallengeProgressCard({ progress }: { progress: ChallengeProgress }) {
  const remaining = Math.max(progress.requiredMatches - progress.finalizedMatches, 0);
  const percent = Math.min(100, Math.round((progress.finalizedMatches / progress.requiredMatches) * 100));

  return (
    <SectionCard title="مسیر فعال‌سازی چالش">
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold">
          {progress.unlocked ? "چالش فعال است" : `${toPersianDigits(remaining)} مسابقه تا فعال شدن چالش`}
        </span>
        <span className="font-mono-num text-muted-foreground" dir="ltr">
          {progress.finalizedMatches} / {progress.requiredMatches}
        </span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-elevated" role="presentation">
        <div
          style={{ width: `${percent}%` }}
          className="h-full rounded-full bg-gradient-to-l from-primary to-secondary transition-[width] duration-700 ease-out"
        />
      </div>
      <p className="mt-3 text-xs leading-6 text-muted-foreground">
        بعد از ثبت ۳۰ مسابقه معتبر، امکان ارسال و دریافت چالش برایت فعال می‌شود. تعداد برد یا باخت در این شرط تأثیری ندارد.
      </p>
    </SectionCard>
  );
}

const toneStyles: Record<NextAction["tone"], { wrap: string; badge: string; icon: typeof Trophy }> = {
  primary: { wrap: "border-primary/40 bg-primary/8", badge: "bg-primary/20 text-primary", icon: CalendarClock },
  warning: { wrap: "border-warning/45 bg-warning/8", badge: "bg-warning/20 text-warning", icon: AlertTriangle },
  live: { wrap: "border-secondary/45 bg-secondary/8", badge: "bg-secondary/20 text-secondary", icon: Radio },
  muted: { wrap: "border-border bg-card", badge: "bg-elevated text-muted-foreground", icon: Swords },
};

export function NextActionCard({ action }: { action: NextAction }) {
  const tone = toneStyles[action.tone];
  const Icon = tone.icon;

  return (
    <section
      className={`rounded-2xl border p-5 ${tone.wrap}`}
      aria-labelledby="next-action-title"
    >
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black ${tone.badge}`}>
          <Icon className="h-3.5 w-3.5" aria-hidden="true" /> اقدام بعدی
        </span>
      </div>
      <h2 id="next-action-title" className="mt-3 text-base font-black sm:text-lg">{action.title}</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{action.description}</p>

      {action.meta.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {action.meta.map((m) => (
            <li key={m} className="rounded-full border border-border bg-background/40 px-2.5 py-1 text-[11px] text-muted-foreground">
              {m}
            </li>
          ))}
        </ul>
      )}

      {action.kind !== "none" && (
        <Link
          to="/tournaments"
          className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          {action.ctaLabel} <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </section>
  );
}

export function RatingTrend({ history }: { history: number[] }) {
  if (history.length < 2) return null;
  const min = Math.min(...history);
  const max = Math.max(...history);
  const span = Math.max(max - min, 1);
  const points = history
    .map((v, i) => `${(i / (history.length - 1)) * 100},${40 - ((v - min) / span) * 34 - 3}`)
    .join(" ");

  return (
    <SectionCard title="روند رتبه مسابقات">
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-24 w-full" role="img" aria-label={`روند امتیاز مسابقات، از ${min} تا ${max}`}>
        <polyline points={points} fill="none" stroke="var(--primary)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <p className="mt-2 text-[11px] text-muted-foreground">
        بر اساس ۱۰ مسابقه نهایی‌شده اخیر؛ مقادیر از سرویس مسابقات دریافت می‌شود.
      </p>
    </SectionCard>
  );
}
