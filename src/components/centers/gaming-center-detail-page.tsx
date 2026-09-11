import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarDays,
  Clock3,
  ExternalLink,
  Gamepad2,
  MapPin,
  Monitor,
  Phone,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import type {
  GamingCenterDetailData,
  GamingCenterDetailRegistrationState,
} from "@/lib/gaming-center-detail-contract";
import { formatNumber } from "@/lib/format";

type GamingCenterDetailTournament = GamingCenterDetailData["tournaments"][number];

const registrationCopy: Record<GamingCenterDetailRegistrationState, string> = {
  open: "ثبت‌نام باز",
  filling: "ظرفیت رو به تکمیل",
  closed: "ثبت‌نام بسته",
  upcoming: "ثبت‌نام به‌زودی",
  unavailable: "فعلاً در دسترس نیست",
};

const dayLabels: Record<string, string> = {
  Saturday: "شنبه",
  Sunday: "یکشنبه",
  Monday: "دوشنبه",
  Tuesday: "سه‌شنبه",
  Wednesday: "چهارشنبه",
  Thursday: "پنج‌شنبه",
  Friday: "جمعه",
};

function formatDays(days: string[]) {
  if (days.length === 7) return "همه‌روزه";
  return days.map((day) => dayLabels[day] ?? day).join("، ");
}

function upcomingCopy(center: GamingCenterDetailData) {
  if (center.upcomingTournamentCount === null) return "مسابقات منتشرشده این مرکز را ببین";
  if (center.upcomingTournamentCount === 0) return "فعلاً مسابقه پیش‌رویی منتشر نشده است";
  return `${formatNumber(center.upcomingTournamentCount)} مسابقه پیش‌رو`;
}

function TournamentMiniCard({ tournament }: { tournament: GamingCenterDetailTournament }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold text-secondary">{tournament.game.name}</p>
          <h3 className="mt-1 text-lg font-black leading-7">{tournament.title}</h3>
        </div>
        <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
          {registrationCopy[tournament.registrationState]}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
          {tournament.displayDate}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono-num">
          <Clock3 className="h-4 w-4 text-primary" aria-hidden="true" />
          {tournament.displayTime}
        </span>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to="/tournaments/$id"
          params={{ id: tournament.tournamentSlug }}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          جزئیات مسابقه
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          to="/games/$slug"
          params={{ slug: tournament.game.slug }}
          className="inline-flex min-h-11 items-center rounded-xl border border-border bg-background px-4 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          صفحه {tournament.game.name}
        </Link>
      </div>
    </article>
  );
}

export function GamingCenterDetailPage({ center }: { center: GamingCenterDetailData }) {
  const hasVisitInfo = Boolean(center.publicAddress || center.publicPhone || center.openingHours.length > 0);

  return (
    <TournamentLayout pageOwnsMain>
      <main>
        <section className="relative overflow-hidden border-b border-border" aria-labelledby="center-detail-title">
          <div className="absolute inset-0 bg-gradient-to-l from-primary/15 via-background to-secondary/5" aria-hidden="true" />
          {center.coverImage ? (
            <div className="relative h-56 overflow-hidden md:h-72 lg:h-80">
              <img
                src={center.coverImage}
                alt={`نمای ${center.name}`}
                width={1440}
                height={800}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-background/10" aria-hidden="true" />
            </div>
          ) : (
            <div className="relative grid h-48 place-items-center md:h-56" aria-hidden="true">
              <Building2 className="h-16 w-16 text-primary/40" />
            </div>
          )}

          <div className="container relative mx-auto -mt-16 px-4 pb-8 md:-mt-20 md:pb-10">
            <nav aria-label="مسیر صفحه" className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Link to="/centers" className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">مرکزهای گیمینگ</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{center.name}</span>
            </nav>

            <div className="rounded-3xl border border-border bg-card/95 p-5 shadow-xl backdrop-blur md:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <h1 id="center-detail-title" className="text-2xl font-black tracking-tight md:text-4xl">{center.name}</h1>
                {center.verified ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-secondary/40 bg-secondary/10 px-3 py-1.5 text-xs font-bold text-secondary">
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    مرکز تأییدشده
                  </span>
                ) : (
                  <span className="rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-bold text-muted-foreground">بدون نشان تأیید</span>
                )}
              </div>

              <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {center.city.name}، {center.district}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-muted-foreground">{center.summary}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/tournaments"
                  search={{ city: center.city.slug }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Trophy className="h-4 w-4" aria-hidden="true" />
                  مسابقات این شهر
                </Link>
                <Link
                  to="/centers"
                  search={{ city: center.city.slug }}
                  className="inline-flex min-h-11 items-center rounded-xl border border-border bg-background px-5 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  مرکزهای {center.city.name}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto grid gap-6 px-4 py-9 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.6fr)]" aria-label="اطلاعات مرکز">
          <div className="space-y-6">
            <section className="rounded-3xl border border-border bg-card p-6 md:p-7" aria-labelledby="about-center-title">
              <h2 id="about-center-title" className="text-2xl font-black">درباره {center.name}</h2>
              <p className="mt-4 text-sm leading-8 text-muted-foreground">{center.description}</p>
            </section>

            <section className="rounded-3xl border border-border bg-card p-6 md:p-7" aria-labelledby="equipment-title">
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" aria-hidden="true" />
                <h2 id="equipment-title" className="text-xl font-black">امکانات مرکز</h2>
              </div>
              {center.equipmentLabels.length > 0 ? (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {center.equipmentLabels.map((equipment) => (
                    <li key={equipment} className="rounded-full border border-border bg-background px-3 py-2 text-xs font-bold text-muted-foreground">
                      {equipment}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm leading-7 text-muted-foreground">فهرست امکانات عمومی این مرکز هنوز منتشر نشده است.</p>
              )}
            </section>
          </div>

          <aside className="rounded-3xl border border-border bg-card p-6 md:p-7" aria-labelledby="visit-info-title">
            <h2 id="visit-info-title" className="text-xl font-black">اطلاعات مراجعه</h2>
            {hasVisitInfo ? (
              <div className="mt-5 space-y-5 text-sm">
                {center.publicAddress && (
                  <div>
                    <p className="flex items-center gap-2 font-black">
                      <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                      نشانی عمومی
                    </p>
                    <p className="mt-2 leading-7 text-muted-foreground">{center.publicAddress.displayAddress}</p>
                    {center.mapUrl && (
                      <a
                        href={center.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 text-xs font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        مشاهده روی نقشه
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}

                {center.publicPhone && (
                  <div>
                    <p className="flex items-center gap-2 font-black">
                      <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                      تلفن عمومی
                    </p>
                    <a
                      href={`tel:${center.publicPhone}`}
                      dir="ltr"
                      className="mt-2 inline-flex min-h-11 items-center rounded-xl border border-border px-4 font-mono-num font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {center.publicPhone}
                    </a>
                  </div>
                )}

                {center.openingHours.length > 0 && (
                  <div>
                    <p className="flex items-center gap-2 font-black">
                      <Clock3 className="h-4 w-4 text-primary" aria-hidden="true" />
                      ساعت کاری عمومی
                    </p>
                    <dl className="mt-3 space-y-2">
                      {center.openingHours.map((hours) => (
                        <div key={hours.dayOfWeek.join("-")} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-background px-3 py-2.5">
                          <dt className="text-muted-foreground">{formatDays(hours.dayOfWeek)}</dt>
                          <dd className="font-mono-num font-bold" dir="ltr">{hours.opens}–{hours.closes}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                اطلاعات مراجعه عمومی برای این مرکز هنوز در صفحه منتشر نشده است. برای انتخاب مسابقه می‌توانی فهرست رویدادهای ثبت‌شده را بررسی کنی.
              </p>
            )}
          </aside>
        </section>

        <section className="border-y border-border bg-surface/30" aria-labelledby="center-tournaments-title">
          <div className="container mx-auto px-4 py-10 md:py-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-secondary">{upcomingCopy(center)}</p>
                <h2 id="center-tournaments-title" className="mt-2 text-2xl font-black">مسابقات این مرکز</h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                  زمان، بازی و وضعیت ثبت‌نام رقابت‌های پیش‌رو را ببین و برای قوانین و جزئیات کامل وارد صفحه همان مسابقه شو.
                </p>
              </div>
              <Link
                to="/tournaments"
                search={{ city: center.city.slug }}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                همه مسابقات {center.city.name}
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {center.tournaments.length > 0 ? (
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {center.tournaments.map((tournament) => (
                  <TournamentMiniCard key={tournament.tournamentId} tournament={tournament} />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-border bg-card p-8 text-center">
                <Trophy className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-black">فعلاً مسابقه عمومی پیش‌رویی ثبت نشده است</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">فهرست مسابقات را ببین تا رقابت‌های دیگر این شهر و بازی‌های مختلف را پیدا کنی.</p>
              </div>
            )}
          </div>
        </section>

        <section className="container mx-auto px-4 py-11" aria-labelledby="center-related-title">
          <h2 id="center-related-title" className="text-2xl font-black">مسیرهای مرتبط</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Link to="/centers" className="group rounded-2xl border border-border bg-card p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-black">همه مرکزهای گیمینگ</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">مرکزهای دیگر را بر اساس شهر و امکانات مقایسه کن.</p>
            </Link>
            <Link to="/tournaments" className="group rounded-2xl border border-border bg-card p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Trophy className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-black">تورنمنت‌ها و مسابقات</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">رقابت‌های حضوری را بر اساس بازی، شهر و زمان پیدا کن.</p>
            </Link>
            <Link to="/games" className="group rounded-2xl border border-border bg-card p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Gamepad2 className="h-5 w-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-black">بازی‌های رقابتی</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">فهرست بازی‌ها و مسیر مسابقات هر عنوان را بررسی کن.</p>
            </Link>
          </div>
        </section>
      </main>
    </TournamentLayout>
  );
}

export function GamingCenterDetailSkeleton() {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-12" aria-busy="true" aria-label="در حال بارگذاری اطلاعات مرکز گیمینگ">
        <div className="h-56 animate-pulse rounded-3xl bg-muted md:h-72" />
        <div className="-mt-12 h-48 animate-pulse rounded-3xl border border-border bg-card" />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="h-64 animate-pulse rounded-3xl bg-muted" />
          <div className="h-64 animate-pulse rounded-3xl bg-muted" />
        </div>
      </main>
    </TournamentLayout>
  );
}

export function GamingCenterDetailErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-20 text-center" role="alert">
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 md:p-10">
          <Building2 className="mx-auto h-9 w-9 text-primary" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-black">اطلاعات این مرکز فعلاً بارگذاری نشد</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">برای دریافت دوباره اطلاعات عمومی مرکز و مسابقات منتشرشده، یک بار دیگر تلاش کن.</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            تلاش دوباره
          </button>
        </div>
      </main>
    </TournamentLayout>
  );
}
