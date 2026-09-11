import {
  AlertTriangle,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  LockKeyhole,
  Medal,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import type {
  AchievementSortMode,
  AchievementStatusFilter,
  PlayerAchievementItem,
  PlayerAchievementsPageData,
} from "@/lib/player-achievements-contract";

const statusLabels: Record<AchievementStatusFilter, string> = {
  all: "همه وضعیت‌ها",
  locked: "قفل‌شده",
  "in-progress": "در حال پیشرفت",
  unlocked: "بازشده",
};

const sortLabels: Record<AchievementSortMode, string> = {
  default: "ترتیب پیشنهادی",
  recent: "تازه‌ترین بازشدن",
  progress: "بیشترین پیشرفت",
};

const itemStatusMeta: Record<
  PlayerAchievementItem["status"],
  { label: string; icon: LucideIcon; className: string }
> = {
  unlocked: {
    label: "بازشده",
    icon: CheckCircle2,
    className: "border-success/30 bg-success/10 text-success",
  },
  "in-progress": {
    label: "در حال پیشرفت",
    icon: Clock3,
    className: "border-primary/30 bg-primary/10 text-primary",
  },
  locked: {
    label: "قفل‌شده",
    icon: LockKeyhole,
    className: "border-border bg-elevated text-muted-foreground",
  },
};

function formatUnlockedAt(value: string, timezone: string) {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: timezone,
    }).format(new Date(value));
  } catch {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  }
}

function SummaryCard({ icon: Icon, label, value, hint }: { icon: LucideIcon; label: string; value: number; hint: string }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-black tabular-nums sm:text-3xl">{value.toLocaleString("fa-IR")}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary" aria-hidden="true">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-xs leading-6 text-muted-foreground">{hint}</p>
    </article>
  );
}

function AchievementCard({ item, timezone }: { item: PlayerAchievementItem; timezone: string }) {
  const status = itemStatusMeta[item.status];
  const StatusIcon = status.icon;

  return (
    <article className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border ${
            item.status === "unlocked"
              ? "border-success/20 bg-success/10 text-success"
              : item.status === "in-progress"
                ? "border-primary/20 bg-primary/10 text-primary"
                : "border-border bg-elevated text-muted-foreground"
          }`}
          aria-hidden="true"
        >
          {item.status === "unlocked" ? <Trophy className="h-7 w-7" /> : item.status === "in-progress" ? <Target className="h-7 w-7" /> : <LockKeyhole className="h-7 w-7" />}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="break-words text-lg font-black sm:text-xl">{item.title}</h2>
                <span className="rounded-full border border-border bg-elevated px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
                  {item.category.name}
                </span>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">{item.description}</p>
            </div>

            <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-black ${status.className}`}>
              <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {status.label}
            </span>
          </div>

          {item.progress ? (
            <section className="mt-5 rounded-xl border border-border/80 bg-elevated/60 p-4" aria-label={`پیشرفت دستاورد ${item.title}`}>
              <div className="flex items-center justify-between gap-3 text-xs font-bold">
                <span>پیشرفت ثبت‌شده</span>
                <span className="tabular-nums text-foreground">{item.progress.percent.toLocaleString("fa-IR")}٪</span>
              </div>
              <div
                className="mt-3 h-2.5 overflow-hidden rounded-full bg-border/70"
                role="progressbar"
                aria-label={`پیشرفت ${item.title}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={item.progress.percent}
              >
                <div className="h-full rounded-full bg-primary" style={{ width: `${item.progress.percent}%` }} />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>وضعیت فعلی</span>
                <span className="font-bold tabular-nums text-foreground" dir="ltr">
                  {item.progress.current.toLocaleString("fa-IR")} / {item.progress.target.toLocaleString("fa-IR")}
                </span>
              </div>
            </section>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold text-muted-foreground">
            {item.status === "unlocked" && item.unlockedAt ? (
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
                بازشده در {formatUnlockedAt(item.unlockedAt, timezone)}
              </span>
            ) : item.status === "in-progress" ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-primary" aria-hidden="true" />
                پیشرفت این دستاورد ادامه دارد
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                این دستاورد هنوز باز نشده است
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function PlayerAchievementsPage({
  data,
  status,
  categoryId,
  sort,
  onStatusChange,
  onCategoryChange,
  onSortChange,
  onPageChange,
  onResetFilters,
}: {
  data: PlayerAchievementsPageData;
  status: AchievementStatusFilter;
  categoryId?: string;
  sort: AchievementSortMode;
  onStatusChange: (status: AchievementStatusFilter) => void;
  onCategoryChange: (categoryId?: string) => void;
  onSortChange: (sort: AchievementSortMode) => void;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
}) {
  const hasFilters = status !== "all" || Boolean(categoryId);
  const isAllEmpty = data.summary.total === 0;
  const isFilteredEmpty = !isAllEmpty && data.items.length === 0;

  return (
    <div className="space-y-5 sm:space-y-6">
      <header className="overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold text-primary">داشبورد بازیکن</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">دستاوردهای من</h1>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
              نشان‌های مسیر رقابتی حسابت را یک‌جا ببین؛ وضعیت بازشدن و پیشرفت هر دستاورد بر اساس آخرین اطلاعات ثبت‌شده نمایش داده می‌شود.
            </p>
          </div>
          <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-primary/20 bg-primary/8 px-3 py-2 text-xs font-bold text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            مسیر دستاوردها
          </div>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="خلاصه دستاوردها">
        <SummaryCard icon={Award} label="کل دستاوردها" value={data.summary.total} hint="تمام نشان‌های ثبت‌شده برای مسیر حساب تو" />
        <SummaryCard icon={Trophy} label="بازشده" value={data.summary.unlocked} hint="دستاوردهایی که وضعیت بازشده دارند" />
        <SummaryCard icon={Target} label="در حال پیشرفت" value={data.summary.inProgress} hint="نشان‌هایی که پیشرفت فعال برایشان ثبت شده" />
        <SummaryCard icon={LockKeyhole} label="قفل‌شده" value={data.summary.locked} hint="دستاوردهایی که هنوز باز نشده‌اند" />
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-5" aria-labelledby="achievement-filters-title">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0 flex-1">
            <h2 id="achievement-filters-title" className="text-sm font-black">فیلتر و مرتب‌سازی</h2>
            <p className="mt-1 text-xs leading-6 text-muted-foreground">دستاوردها را بر اساس وضعیت، دسته و ترتیب نمایش محدود کن.</p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="وضعیت دستاورد">
              {Object.entries(statusLabels).map(([value, label]) => {
                const typedValue = value as AchievementStatusFilter;
                const active = status === typedValue;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onStatusChange(typedValue)}
                    className={`min-h-10 rounded-xl border px-3 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-elevated text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[480px]">
            <label className="text-xs font-bold text-muted-foreground">
              دسته
              <select
                value={categoryId ?? ""}
                onChange={(event) => onCategoryChange(event.target.value || undefined)}
                className="mt-1.5 min-h-11 w-full rounded-xl border border-border bg-elevated px-3 text-sm font-bold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">همه دسته‌ها</option>
                {data.categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                ))}
              </select>
            </label>
            <label className="text-xs font-bold text-muted-foreground">
              ترتیب
              <select
                value={sort}
                onChange={(event) => onSortChange(event.target.value as AchievementSortMode)}
                className="mt-1.5 min-h-11 w-full rounded-xl border border-border bg-elevated px-3 text-sm font-bold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {Object.entries(sortLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3" aria-live="polite">
        <p className="text-xs font-bold text-muted-foreground">
          {data.pagination.totalItems.toLocaleString("fa-IR")} دستاورد مطابق این نمایش
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-bold hover:bg-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            پاک‌کردن فیلترها
          </button>
        ) : null}
      </div>

      {isAllEmpty ? (
        <section className="grid place-items-center rounded-2xl border border-dashed border-border bg-card p-8 text-center sm:p-12">
          <Medal className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-black">هنوز دستاوردی ثبت نشده است</h2>
          <p className="mt-2 max-w-lg text-sm leading-7 text-muted-foreground">وقتی دستاوردی برای مسیر حساب تو ثبت شود، وضعیت آن در همین بخش دیده می‌شود.</p>
        </section>
      ) : isFilteredEmpty ? (
        <section className="grid place-items-center rounded-2xl border border-dashed border-border bg-card p-8 text-center sm:p-12">
          <Target className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-4 text-lg font-black">دستاوردی با این فیلتر پیدا نشد</h2>
          <p className="mt-2 max-w-lg text-sm leading-7 text-muted-foreground">فیلترها را تغییر بده یا همه دستاوردها را دوباره نمایش بده.</p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            نمایش همه دستاوردها
          </button>
        </section>
      ) : (
        <section className="space-y-3" aria-label="فهرست دستاوردها">
          {data.items.map((item) => <AchievementCard key={item.achievementId} item={item} timezone={data.timezone} />)}
        </section>
      )}

      {data.pagination.totalPages > 1 ? (
        <nav className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4" aria-label="صفحه‌بندی دستاوردها">
          <button
            type="button"
            disabled={data.pagination.currentPage <= 1}
            onClick={() => onPageChange(data.pagination.currentPage - 1)}
            className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-border px-3 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            قبلی
          </button>
          <p className="text-xs font-bold text-muted-foreground">
            صفحه {data.pagination.currentPage.toLocaleString("fa-IR")} از {data.pagination.totalPages.toLocaleString("fa-IR")}
          </p>
          <button
            type="button"
            disabled={data.pagination.currentPage >= data.pagination.totalPages}
            onClick={() => onPageChange(data.pagination.currentPage + 1)}
            className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-border px-3 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            بعدی
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
        </nav>
      ) : null}
    </div>
  );
}

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-elevated ${className}`} />;
}

export function PlayerAchievementsSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-live="polite" aria-label="در حال بارگذاری دستاوردها">
      <SkeletonBlock className="h-36" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SkeletonBlock className="h-32" />
        <SkeletonBlock className="h-32" />
        <SkeletonBlock className="h-32" />
        <SkeletonBlock className="h-32" />
      </div>
      <SkeletonBlock className="h-36" />
      <SkeletonBlock className="h-64" />
      <SkeletonBlock className="h-64" />
    </div>
  );
}

export function PlayerAchievementsErrorState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-border bg-card p-8 text-center sm:p-10" role="alert">
      <AlertTriangle className="h-8 w-8 text-warning" aria-hidden="true" />
      <h1 className="mt-4 text-base font-black">دستاوردها بارگذاری نشد</h1>
      <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">دریافت آخرین وضعیت دستاوردها انجام نشد. دوباره تلاش کن.</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        تلاش دوباره
      </button>
    </div>
  );
}
