import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bell,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Circle,
  Gamepad2,
  ShieldCheck,
  Swords,
  Trophy,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type {
  NotificationKindFilter,
  NotificationsPageData,
  NotificationStateFilter,
  NotificationTarget,
  PlayerNotification,
} from "@/lib/player-notifications-contract";
import { toPersianDigits } from "@/lib/format";

const stateFilters: Array<{ value: NotificationStateFilter; label: string }> = [
  { value: "all", label: "همه" },
  { value: "unread", label: "خوانده‌نشده" },
  { value: "read", label: "خوانده‌شده" },
];

const kindFilters: Array<{ value: NotificationKindFilter; label: string }> = [
  { value: "all", label: "همه موضوع‌ها" },
  { value: "tournament", label: "تورنومنت" },
  { value: "match", label: "Match" },
  { value: "challenge", label: "چالش" },
  { value: "account", label: "حساب" },
  { value: "system", label: "سیستم" },
];

const kindPresentation: Record<
  PlayerNotification["kind"],
  { label: string; icon: LucideIcon; className: string }
> = {
  tournament: { label: "تورنومنت", icon: Trophy, className: "text-warning bg-warning/10" },
  match: { label: "Match", icon: Gamepad2, className: "text-primary bg-primary/10" },
  challenge: { label: "چالش", icon: Swords, className: "text-secondary bg-secondary/10" },
  account: { label: "حساب", icon: UserRound, className: "text-success bg-success/10" },
  system: { label: "سیستم", icon: ShieldCheck, className: "text-muted-foreground bg-elevated" },
};

function formatDateTime(value: string) {
  try {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function targetLabel(target: NotificationTarget) {
  switch (target.kind) {
    case "my-tournaments":
      return "مسابقات من";
    case "my-matches":
      return "Matchهای من";
    case "tournament-detail":
      return "مشاهده تورنومنت";
    case "result-submission":
      return "ثبت نتیجه Match";
    case "match-dispute":
      return "مشاهده اعتراض";
    case "player-profile":
      return "مشاهده پروفایل";
  }
}

function NotificationTargetLink({ target }: { target: NotificationTarget }) {
  const className =
    "inline-flex min-h-10 items-center justify-center rounded-lg border border-border bg-elevated px-3.5 text-xs font-bold hover:border-primary/45 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  switch (target.kind) {
    case "my-tournaments":
      return <Link to="/dashboard/tournaments" className={className}>{targetLabel(target)}</Link>;
    case "my-matches":
      return <Link to="/dashboard/matches" className={className}>{targetLabel(target)}</Link>;
    case "tournament-detail":
      return <Link to="/tournaments/$id" params={{ id: target.tournamentSlug }} className={className}>{targetLabel(target)}</Link>;
    case "result-submission":
      return <Link to="/matches/$id/result" params={{ id: target.matchId }} className={className}>{targetLabel(target)}</Link>;
    case "match-dispute":
      return <Link to="/matches/$id/dispute" params={{ id: target.matchId }} className={className}>{targetLabel(target)}</Link>;
    case "player-profile":
      return <Link to="/dashboard/profile" className={className}>{targetLabel(target)}</Link>;
  }
}

function SummaryCard({ label, value, unread = false }: { label: string; value: number; unread?: boolean }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-muted-foreground">{label}</span>
        {unread ? <Circle className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden="true" /> : <Bell className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
      </div>
      <p className="mt-3 font-mono-num text-2xl font-black" dir="ltr">{toPersianDigits(value)}</p>
    </div>
  );
}

function NotificationCard({
  item,
  pending,
  onMarkRead,
}: {
  item: PlayerNotification;
  pending: boolean;
  onMarkRead: (notificationId: string) => void;
}) {
  const presentation = kindPresentation[item.kind];
  const Icon = presentation.icon;
  const unread = item.readAt === null;

  return (
    <li
      className={`relative overflow-hidden rounded-2xl border bg-card p-4 transition-colors sm:p-5 ${
        unread ? "border-primary/35" : "border-border"
      }`}
    >
      {unread ? <span className="absolute inset-y-0 right-0 w-1 bg-primary" aria-hidden="true" /> : null}
      <div className="flex items-start gap-3 sm:gap-4">
        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${presentation.className}`} aria-hidden="true">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-black text-muted-foreground">{presentation.label}</span>
              {unread ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/12 px-2 py-1 text-[10px] font-black text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  جدید
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                  <Check className="h-3 w-3" aria-hidden="true" /> خوانده‌شده
                </span>
              )}
            </div>
            <time dateTime={item.occurredAt} className="text-[10px] text-muted-foreground">
              {formatDateTime(item.occurredAt)}
            </time>
          </div>

          <h2 className="mt-2 text-sm font-black leading-7 sm:text-base">{item.title}</h2>
          <p className="mt-1 text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">{item.body}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {item.target ? <NotificationTargetLink target={item.target} /> : null}
            {unread ? (
              <button
                type="button"
                disabled={pending}
                onClick={() => onMarkRead(item.notificationId)}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3.5 text-xs font-bold text-muted-foreground hover:bg-elevated hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-55"
              >
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                {pending ? "در حال ثبت..." : "خوانده شد"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}

export function PlayerNotificationsPage({
  data,
  state,
  kind,
  pendingNotificationId,
  markAllPending,
  mutationMessage,
  onStateChange,
  onKindChange,
  onPageChange,
  onResetFilters,
  onMarkRead,
  onMarkAllRead,
}: {
  data: NotificationsPageData;
  state: NotificationStateFilter;
  kind: NotificationKindFilter;
  pendingNotificationId: string | null;
  markAllPending: boolean;
  mutationMessage: { tone: "success" | "error"; text: string } | null;
  onStateChange: (state: NotificationStateFilter) => void;
  onKindChange: (kind: NotificationKindFilter) => void;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
  onMarkRead: (notificationId: string) => void;
  onMarkAllRead: () => void;
}) {
  const hasFilters = state !== "all" || kind !== "all";

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold text-primary">داشبورد بازیکن</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">اعلان‌ها</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
            تغییرات مهم مسابقه‌ها، Matchها و حساب بازیکنت را از یکجا دنبال کن.
          </p>
        </div>
        {data.summary.unread > 0 ? (
          <button
            type="button"
            disabled={markAllPending || pendingNotificationId !== null}
            onClick={onMarkAllRead}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-wait disabled:opacity-55"
          >
            <CheckCheck className="h-4 w-4" aria-hidden="true" />
            {markAllPending ? "در حال ثبت..." : "همه را خوانده‌ام"}
          </button>
        ) : null}
      </header>

      {mutationMessage ? (
        <div
          role="status"
          className={`rounded-xl border p-3 text-xs font-bold ${
            mutationMessage.tone === "success"
              ? "border-success/35 bg-success/10 text-success"
              : "border-destructive/35 bg-destructive/10 text-destructive"
          }`}
        >
          {mutationMessage.text}
        </div>
      ) : null}

      <section aria-label="خلاصه اعلان‌ها" className="grid grid-cols-2 gap-3">
        <SummaryCard label="همه اعلان‌ها" value={data.summary.total} />
        <SummaryCard label="خوانده‌نشده" value={data.summary.unread} unread />
      </section>

      <section className="rounded-2xl border border-border bg-card p-4" aria-labelledby="notification-filters-title">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="notification-filters-title" className="text-sm font-black">فیلتر اعلان‌ها</h2>
          {hasFilters ? (
            <button
              type="button"
              onClick={onResetFilters}
              className="min-h-10 rounded-lg px-3 text-xs font-bold text-muted-foreground hover:bg-elevated hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              پاک کردن فیلترها
            </button>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2" aria-label="وضعیت خواندن">
          {stateFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              aria-pressed={state === filter.value}
              onClick={() => onStateChange(filter.value)}
              className={`min-h-10 rounded-lg border px-3.5 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                state === filter.value
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-border bg-elevated text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <label className="mt-4 block max-w-sm text-xs font-bold">
          <span className="mb-1.5 block text-muted-foreground">موضوع اعلان</span>
          <select
            value={kind}
            onChange={(event) => onKindChange(event.target.value as NotificationKindFilter)}
            className="h-11 w-full rounded-lg border border-border bg-elevated px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {kindFilters.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}
          </select>
        </label>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-black">صندوق اعلان‌ها</p>
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {toPersianDigits(data.pagination.totalItems)} اعلان در این فیلتر
        </p>
      </div>

      {data.items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center sm:p-10">
          <Bell className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-4 text-sm font-black">
            {hasFilters ? "اعلانی با این فیلتر پیدا نشد" : "هنوز اعلانی نداری"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-muted-foreground">
            {hasFilters
              ? "فیلترها را تغییر بده یا همه اعلان‌ها را ببین."
              : "وقتی رویداد مهمی برای مسابقه‌ها، Matchها یا حسابت ثبت شود، اعلان آن اینجا نمایش داده می‌شود."}
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-4 inline-flex min-h-10 items-center rounded-lg bg-primary px-4 text-xs font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              نمایش همه اعلان‌ها
            </button>
          ) : null}
        </div>
      ) : (
        <ul className="grid gap-3">
          {data.items.map((item) => (
            <NotificationCard
              key={item.notificationId}
              item={item}
              pending={pendingNotificationId === item.notificationId}
              onMarkRead={onMarkRead}
            />
          ))}
        </ul>
      )}

      {data.pagination.totalPages > 1 ? (
        <nav className="flex items-center justify-center gap-2" aria-label="صفحه‌بندی اعلان‌ها">
          <button
            type="button"
            disabled={data.pagination.currentPage <= 1}
            onClick={() => onPageChange(data.pagination.currentPage - 1)}
            className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-border px-3 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" /> قبلی
          </button>
          <span className="px-2 text-xs text-muted-foreground">
            صفحه {toPersianDigits(data.pagination.currentPage)} از {toPersianDigits(data.pagination.totalPages)}
          </span>
          <button
            type="button"
            disabled={data.pagination.currentPage >= data.pagination.totalPages}
            onClick={() => onPageChange(data.pagination.currentPage + 1)}
            className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-border px-3 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40"
          >
            بعدی <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </nav>
      ) : null}
    </div>
  );
}

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-elevated ${className}`} />;
}

export function PlayerNotificationsSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-live="polite">
      <SkeletonBar className="h-24 w-full" />
      <div className="grid grid-cols-2 gap-3">
        <SkeletonBar className="h-24" />
        <SkeletonBar className="h-24" />
      </div>
      <SkeletonBar className="h-40 w-full" />
      <SkeletonBar className="h-36 w-full" />
      <SkeletonBar className="h-36 w-full" />
    </div>
  );
}

export function PlayerNotificationsErrorState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-border bg-card p-10 text-center">
      <AlertTriangle className="h-8 w-8 text-warning" aria-hidden="true" />
      <h2 className="mt-4 text-base font-black">اعلان‌ها بارگذاری نشد</h2>
      <p className="mt-2 max-w-sm text-sm leading-7 text-muted-foreground">
        اطلاعات فعلی در دسترس نیست. دوباره تلاش کن.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        تلاش دوباره
      </button>
    </div>
  );
}
