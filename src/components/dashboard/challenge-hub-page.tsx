import { useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Ban,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Gamepad2,
  LockKeyhole,
  MapPin,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Swords,
  Trophy,
  UserRoundPlus,
  UsersRound,
  X,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toPersianDigits } from "@/lib/format";
import type {
  ChallengeAction,
  ChallengeAccess,
  ChallengeHubFilter,
  ChallengeHubPageData,
  ChallengeItem,
  ChallengeLifecycle,
  ChallengeOutcome,
} from "@/lib/challenge-hub-data";

const filters: Array<{ value: ChallengeHubFilter; label: string }> = [
  { value: "all", label: "همه" },
  { value: "incoming", label: "دعوت‌های دریافتی" },
  { value: "outgoing", label: "ارسال‌شده" },
  { value: "active", label: "فعال" },
  { value: "action-required", label: "نیازمند اقدام" },
  { value: "completed", label: "تکمیل‌شده" },
];

const lifecyclePresentation: Record<ChallengeLifecycle, { label: string; className: string }> = {
  "invitation-pending": { label: "در انتظار پاسخ", className: "bg-primary/15 text-primary" },
  "invitation-expired": { label: "مهلت پایان یافته", className: "bg-elevated text-muted-foreground" },
  "invitation-unavailable": { label: "دیگر در دسترس نیست", className: "bg-elevated text-muted-foreground" },
  accepted: { label: "فعال", className: "bg-success/15 text-success" },
  "match-ready": { label: "Match آماده است", className: "bg-secondary/15 text-secondary" },
  "awaiting-result": { label: "در انتظار نتیجه", className: "bg-warning/15 text-warning" },
  "action-required": { label: "نیازمند اقدام", className: "bg-warning/15 text-warning" },
  completed: { label: "پایان‌یافته", className: "bg-success/15 text-success" },
  cancelled: { label: "باطل‌شده", className: "bg-elevated text-muted-foreground" },
};

const outcomePresentation: Record<ChallengeOutcome, { label: string; className: string }> = {
  win: { label: "برد", className: "text-success" },
  loss: { label: "باخت", className: "text-destructive" },
  draw: { label: "مساوی", className: "text-muted-foreground" },
  void: { label: "باطل‌شده", className: "text-muted-foreground" },
};

function SummaryCard({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-muted-foreground">{label}</span>
        <span className="text-primary" aria-hidden="true">{icon}</span>
      </div>
      <p className="mt-3 font-mono-num text-2xl font-black" dir="ltr">{toPersianDigits(value)}</p>
    </div>
  );
}

function ChallengeAccessCard({ access }: { access: ChallengeAccess }) {
  const progress = Math.min(100, Math.max(0, (access.finalizedValidMatches / access.requiredFinalizedMatches) * 100));

  if (access.unlocked) {
    return (
      <section aria-labelledby="challenge-access-title" className="overflow-hidden rounded-2xl border border-success/30 bg-card">
        <div className="h-1 bg-gradient-to-l from-success via-secondary to-primary" />
        <div className="grid gap-5 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-success">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <h2 id="challenge-access-title" className="text-sm font-black">بخش چالش فعال است</h2>
            </div>
            <p className="mt-2 max-w-xl text-xs leading-6 text-muted-foreground">
              می‌توانی دعوت‌های چالش را مدیریت کنی و برای رقابت مستقیم دعوت بفرستی.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-3 sm:min-w-80">
            <div className="rounded-xl border border-secondary/25 bg-secondary/8 p-3">
              <dt className="text-[11px] font-bold text-muted-foreground">امتیاز چالش</dt>
              <dd className="mt-1 font-mono-num text-xl font-black text-secondary" dir="ltr">
                {access.challengeRating === null ? "—" : toPersianDigits(access.challengeRating)}
              </dd>
            </div>
            <div className="rounded-xl border border-border bg-elevated/60 p-3">
              <dt className="text-[11px] font-bold text-muted-foreground">Match نهایی معتبر</dt>
              <dd className="mt-1 font-mono-num text-xl font-black" dir="ltr">{toPersianDigits(access.finalizedValidMatches)}</dd>
            </div>
          </dl>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="challenge-access-title" className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-elevated text-muted-foreground">
          <LockKeyhole className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id="challenge-access-title" className="text-sm font-black">چالش هنوز فعال نشده</h2>
          <p className="mt-1.5 text-xs leading-6 text-muted-foreground">
            برای ورود به رقابت‌های چالشی، سابقه Matchهای نهایی معتبر حساب تو باید به حد لازم برسد.
          </p>
          <div className="mt-4 flex items-center justify-between gap-3 text-xs font-bold">
            <span>{toPersianDigits(access.finalizedValidMatches)} از {toPersianDigits(access.requiredFinalizedMatches)} Match نهایی معتبر</span>
            <span className="text-muted-foreground">{toPersianDigits(Math.round(progress))}٪</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-elevated" role="progressbar" aria-valuemin={0} aria-valuemax={access.requiredFinalizedMatches} aria-valuenow={access.finalizedValidMatches} aria-label="پیشرفت فعال‌سازی چالش">
            <div className="h-full rounded-full bg-gradient-to-l from-primary to-secondary" style={{ width: `${progress}%` }} />
          </div>
          <Button asChild variant="outline" className="mt-4 min-h-11">
            <Link to="/dashboard/matches">مشاهده Matchهای من <ArrowLeft aria-hidden="true" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Opponent({ item }: { item: ChallengeItem }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar className="h-12 w-12 border border-primary/30">
        <AvatarFallback className="bg-primary/15 font-mono-num text-xs font-black text-primary">{item.opponent.avatarInitials}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-black" dir="ltr">{item.opponent.gamerTag}</p>
        <p className="mt-1 truncate text-[11px] text-muted-foreground">{item.game.name}</p>
      </div>
    </div>
  );
}

function ChallengeCard({ item, pendingAction, onAction }: { item: ChallengeItem; pendingAction: string | null; onAction: (challengeId: string, action: ChallengeAction) => void }) {
  const presentation = lifecyclePresentation[item.lifecycle];
  const result = item.result ? outcomePresentation[item.result.outcome] : null;
  const isPending = pendingAction?.startsWith(`${item.challengeId}:`) ?? false;
  const isInvitation = item.lifecycle.startsWith("invitation");

  return (
    <li className={cn("flex min-w-0 flex-col rounded-2xl border bg-card p-4 sm:p-5", item.actionRequiredLabel ? "border-warning/40" : "border-border")}>
      <div className="flex min-w-0 items-start justify-between gap-3">
        <Opponent item={item} />
        <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black", presentation.className)}>{item.statusLabel || presentation.label}</span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-border bg-elevated/50 p-3 text-xs">
        <div>
          <dt className="text-[10px] text-muted-foreground">نوع دعوت</dt>
          <dd className="mt-1 font-bold">{item.direction === "incoming" ? "دریافتی" : "ارسال‌شده"}</dd>
        </div>
        <div>
          <dt className="text-[10px] text-muted-foreground">فرمت Match</dt>
          <dd className="mt-1 font-bold" dir="ltr">{item.formatLabel}</dd>
        </div>
        <div>
          <dt className="text-[10px] text-muted-foreground">زمان ایجاد</dt>
          <dd className="mt-1 font-bold">{item.createdAtLabel}</dd>
        </div>
        <div>
          <dt className="text-[10px] text-muted-foreground">امتیاز چالش حریف</dt>
          <dd className="mt-1 font-mono-num font-bold text-secondary" dir="ltr">{item.opponent.challengeRating === null ? "ثبت نشده" : toPersianDigits(item.opponent.challengeRating)}</dd>
        </div>
      </dl>

      {item.responseDeadlineLabel ? (
        <p className={cn("mt-3 flex items-center gap-2 text-xs", item.lifecycle === "invitation-expired" ? "text-muted-foreground" : "text-warning")}>
          <Clock3 className="h-4 w-4" aria-hidden="true" /> مهلت پاسخ: {item.responseDeadlineLabel}
        </p>
      ) : null}

      {item.note ? <blockquote className="mt-3 rounded-xl border-s-2 border-primary bg-primary/8 p-3 text-xs leading-6 text-muted-foreground">«{item.note}»</blockquote> : null}

      {item.match ? (
        <div className="mt-3 space-y-2 rounded-xl border border-border p-3 text-xs">
          {item.match.startsAtLabel ? <p className="flex items-center gap-2"><CalendarClock className="h-4 w-4 text-primary" aria-hidden="true" /> {item.match.startsAtLabel}</p> : null}
          {item.match.venueLabel ? <p className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" aria-hidden="true" /> {item.match.venueLabel}</p> : null}
          {item.match.contextLabel ? <p className="flex items-center gap-2 text-muted-foreground"><Gamepad2 className="h-4 w-4" aria-hidden="true" /> {item.match.contextLabel}</p> : null}
        </div>
      ) : null}

      {item.actionRequiredLabel ? (
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/8 p-3" role="status">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
          <div><p className="text-xs font-black text-warning">نیازمند اقدام</p><p className="mt-1 text-[11px] leading-5 text-muted-foreground">{item.actionRequiredLabel}</p></div>
        </div>
      ) : null}

      {item.result && result ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-elevated/60 p-3.5">
          <div className="flex items-center gap-2"><Trophy className={cn("h-4 w-4", result.className)} aria-hidden="true" /><div><p className={cn("text-xs font-black", result.className)}>{result.label}</p><p className="mt-0.5 text-[10px] text-muted-foreground">{item.result.completedAtLabel}</p></div></div>
          <div className="text-left"><p className="font-mono-num text-lg font-black" dir="ltr">{item.result.scoreLabel ?? "—"}</p>{item.result.ratingDelta !== null ? <p className={cn("mt-0.5 font-mono-num text-xs font-black", item.result.ratingDelta > 0 ? "text-success" : item.result.ratingDelta < 0 ? "text-destructive" : "text-muted-foreground")} dir="ltr">{item.result.ratingDelta > 0 ? "+" : ""}{toPersianDigits(item.result.ratingDelta)} امتیاز چالش</p> : null}</div>
        </div>
      ) : null}

      <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row">
        {item.allowedActions.includes("accept") ? <Button className="min-h-11 flex-1" disabled={isPending} onClick={() => onAction(item.challengeId, "accept")}>{isPending ? "در حال ثبت درخواست..." : "پذیرفتن چالش"}</Button> : null}
        {item.allowedActions.includes("decline") ? <Button variant="outline" className="min-h-11 flex-1" disabled={isPending} onClick={() => onAction(item.challengeId, "decline")}>رد کردن</Button> : null}
        {item.allowedActions.includes("cancel") ? <Button variant="outline" className="min-h-11 flex-1" disabled={isPending} onClick={() => onAction(item.challengeId, "cancel")}>لغو دعوت</Button> : null}
        {item.allowedActions.includes("view") ? <Button className="min-h-11 flex-1" onClick={() => onAction(item.challengeId, "view")}>مشاهده چالش <ArrowLeft aria-hidden="true" /></Button> : null}
        {isInvitation && item.allowedActions.length === 0 ? <p className="flex min-h-11 flex-1 items-center justify-center rounded-lg bg-elevated px-4 text-xs font-bold text-muted-foreground"><Ban className="me-2 h-4 w-4" aria-hidden="true" /> این دعوت دیگر قابل اقدام نیست</p> : null}
      </div>
    </li>
  );
}

export function ChallengeHubPage({ data, filter, onFilterChange, onPageChange }: { data: ChallengeHubPageData; filter: ChallengeHubFilter; onFilterChange: (value: ChallengeHubFilter) => void; onPageChange: (page: number) => void }) {
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const hasAnyChallenges = data.summary.incoming + data.summary.outgoing + data.summary.active + data.summary.completed > 0;

  const handleAction = (challengeId: string, action: ChallengeAction) => {
    if (action === "view") return;
    setPendingAction(`${challengeId}:${action}`);
  };

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-primary"><Swords className="h-5 w-5" aria-hidden="true" /><p className="text-xs font-bold">مرکز رقابت مستقیم</p></div>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">چالش‌های من</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">دعوت‌ها، رقابت‌های فعال و سابقه چالش‌های خودت را از یکجا مدیریت کن.</p>
        </div>
        <Button className="min-h-11 w-full sm:w-auto" disabled={!data.access.canCreate} onClick={() => setPendingAction("create")}>
          <Plus aria-hidden="true" /> ایجاد چالش جدید
        </Button>
      </header>

      {pendingAction ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-secondary/30 bg-secondary/8 p-3 text-xs" role="status" aria-live="polite">
          <p>{pendingAction === "create" ? "فرآیند ایجاد چالش در همین صفحه آغاز نشده است." : "درخواست در حال ثبت است؛ تا دریافت پاسخ نهایی، وضعیت چالش تغییر نمی‌کند."}</p>
          <Button variant="ghost" size="icon" className="shrink-0" aria-label="بستن پیام" onClick={() => setPendingAction(null)}><X aria-hidden="true" /></Button>
        </div>
      ) : null}

      <ChallengeAccessCard access={data.access} />

      <section aria-label="خلاصه چالش‌ها" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard label="دعوت‌های دریافتی" value={data.summary.incoming} icon={<UserRoundPlus className="h-4 w-4" />} />
        <SummaryCard label="دعوت‌های ارسال‌شده" value={data.summary.outgoing} icon={<Send className="h-4 w-4" />} />
        <SummaryCard label="چالش‌های فعال" value={data.summary.active} icon={<Sparkles className="h-4 w-4" />} />
        <SummaryCard label="چالش‌های تکمیل‌شده" value={data.summary.completed} icon={<CheckCircle2 className="h-4 w-4" />} />
      </section>

      <section className="rounded-2xl border border-border bg-card p-3 sm:p-4" aria-labelledby="challenge-filters-title">
        <div className="flex items-center justify-between gap-3 px-1">
          <h2 id="challenge-filters-title" className="text-sm font-black">وضعیت چالش‌ها</h2>
          <span className="text-[11px] text-muted-foreground" aria-live="polite">{toPersianDigits(data.pagination.totalItems)} مورد</span>
        </div>
        <div className="mt-3 overflow-x-auto pb-1" role="tablist" aria-label="فیلتر وضعیت چالش‌ها">
          <div className="flex min-w-max gap-2">
            {filters.map((item) => (
              <Button key={item.value} type="button" role="tab" aria-selected={filter === item.value} variant="outline" onClick={() => onFilterChange(item.value)} className={cn("min-h-10 rounded-full px-4 text-xs", filter === item.value ? "border-primary/50 bg-primary/15 text-primary hover:bg-primary/15" : "bg-elevated text-muted-foreground")}>
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {data.items.length ? (
        <ul className="grid min-w-0 gap-4 xl:grid-cols-2">
          {data.items.map((item) => <ChallengeCard key={item.challengeId} item={item} pendingAction={pendingAction} onAction={handleAction} />)}
        </ul>
      ) : (
        <section className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
          <UsersRound className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-3 text-sm font-black">{hasAnyChallenges ? "چالشی با این وضعیت پیدا نشد" : "هنوز چالشی نداری"}</h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-muted-foreground">{hasAnyChallenges ? "فیلتر دیگری را انتخاب کن یا همه چالش‌ها را ببین." : "وقتی چالشی ایجاد کنی یا بازیکنی تو را دعوت کند، وضعیت آن را اینجا می‌بینی."}</p>
          <Button className="mt-4 min-h-11" disabled={!data.access.canCreate && !hasAnyChallenges} onClick={() => hasAnyChallenges ? onFilterChange("all") : setPendingAction("create")}>
            {hasAnyChallenges ? "نمایش همه" : "ایجاد اولین چالش"}
          </Button>
        </section>
      )}

      {data.pagination.totalPages > 1 ? (
        <nav className="flex items-center justify-center gap-2" aria-label="صفحه‌بندی چالش‌ها">
          <Button variant="outline" className="min-h-10" disabled={data.pagination.currentPage <= 1} onClick={() => onPageChange(data.pagination.currentPage - 1)}>قبلی</Button>
          <span className="px-2 text-xs text-muted-foreground">صفحه {toPersianDigits(data.pagination.currentPage)} از {toPersianDigits(data.pagination.totalPages)}</span>
          <Button variant="outline" className="min-h-10" disabled={data.pagination.currentPage >= data.pagination.totalPages} onClick={() => onPageChange(data.pagination.currentPage + 1)}>بعدی</Button>
        </nav>
      ) : null}
    </div>
  );
}

function SkeletonBar({ className }: { className: string }) {
  return <div className={cn("skeleton-shimmer rounded-xl", className)} />;
}

export function ChallengeHubSkeleton() {
  return <div className="space-y-5" aria-busy="true" aria-live="polite"><SkeletonBar className="h-24" /><SkeletonBar className="h-32" /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <SkeletonBar key={index} className="h-24" />)}</div><SkeletonBar className="h-24" /><div className="grid gap-4 xl:grid-cols-2"><SkeletonBar className="h-80" /><SkeletonBar className="h-80" /></div></div>;
}

export function ChallengeHubErrorState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-border bg-card p-10 text-center">
      <AlertTriangle className="h-8 w-8 text-warning" aria-hidden="true" />
      <h2 className="mt-4 text-base font-black">دریافت اطلاعات چالش‌ها انجام نشد.</h2>
      <p className="mt-2 max-w-sm text-sm leading-7 text-muted-foreground">اطلاعات فعلی در دسترس نیست. دوباره تلاش کن.</p>
      <Button className="mt-5 min-h-11" onClick={() => window.location.reload()}>تلاش دوباره</Button>
    </div>
  );
}