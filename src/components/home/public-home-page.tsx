import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  ChevronLeft,
  Clock3,
  MapPin,
  Minus,
  RotateCcw,
  SearchCheck,
  Star,
  TrendingDown,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";

import { TournamentLayout } from "@/components/tournament/tournament-layout";
import heroImg from "@/assets/tournament/hero-arena.jpg";
import {
  type PublicHomeGamingCenter,
  type PublicHomePageData,
  type PublicHomeShowdown,
  type PublicHomeTournament,
  type PublicHomeTournamentRegistrationState,
  type PublicHomeTrend,
} from "@/lib/public-home-contract";
import { formatNumber, formatPrice } from "@/lib/format";

import { PublicHomeFinder } from "./public-home-finder";

const sectionClass =
  "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

const benefits = [
  {
    title: "جست‌وجوی سریع مسابقه",
    description:
      "بازی، شهر و زمان را مشخص کن و مستقیم وارد فهرست مسابقات مرتبط شو.",
    icon: SearchCheck,
  },
  {
    title: "جزئیات روشن قبل از انتخاب",
    description:
      "زمان، ظرفیت، هزینه، جایزه و اطلاعات مرکز میزبان را قبل از ادامه ببین.",
    icon: CalendarDays,
  },
  {
    title: "مسیر رقابت قابل پیگیری",
    description:
      "از پیدا کردن مسابقه تا نتیجه و رتبه‌بندی، هر مرحله در جای مشخص خودش قرار دارد.",
    icon: Trophy,
  },
  {
    title: "مرکز میزبان قابل شناسایی",
    description:
      "هویت و موقعیت مرکز میزبان کنار مسابقه نمایش داده می‌شود تا انتخاب دقیق‌تری داشته باشی.",
    icon: MapPin,
  },
];

const steps = [
  {
    title: "مسابقه مناسب را پیدا کن",
    description:
      "از بازی، شهر یا زمان شروع کن و گزینه‌های مرتبط را ببین.",
  },
  {
    title: "جزئیات را بررسی کن",
    description:
      "مرکز میزبان، زمان، ظرفیت و شرایط همان مسابقه را قبل از ثبت‌نام بخوان.",
  },
  {
    title: "وارد رقابت شو",
    description:
      "از صفحه مسابقه ادامه بده و بعد از برگزاری، مسیر نتیجه و رتبه‌بندی را دنبال کن.",
  },
];

const registrationMeta: Record<
  PublicHomeTournamentRegistrationState,
  {
    label: string;
    className: string;
  }
> = {
  open: {
    label: "ثبت‌نام باز",
    className: "border-success/40 bg-success/10 text-success",
  },
  filling: {
    label: "ظرفیت رو به تکمیل",
    className: "border-warning/40 bg-warning/10 text-warning",
  },
  closed: {
    label: "ثبت‌نام بسته",
    className: "border-border bg-muted text-muted-foreground",
  },
  unavailable: {
    label: "فعلاً در دسترس نیست",
    className: "border-border bg-muted text-muted-foreground",
  },
};

function SectionHeading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0 max-w-2xl">
        <h2 className="text-xl font-black tracking-tight text-foreground sm:text-2xl lg:text-3xl">
          {title}
        </h2>

        <p className="mt-2 max-w-xl text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">
          {description}
        </p>
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

function SectionAction({
  to,
  children,
}: {
  to: "/games" | "/tournaments" | "/centers" | "/ranking";
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-white/5 bg-white/[0.025] px-3.5 text-xs font-bold text-primary transition-all hover:border-primary/20 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {children}
      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

function formatDateTime(value: string, timezone: string) {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: timezone,
    }).format(new Date(value));
  } catch {
    return "زمان اعلام‌شده مسابقه";
  }
}

function TrendIcon({ trend }: { trend: PublicHomeTrend }) {
  if (trend === "up") {
    return (
      <TrendingUp
        className="h-4 w-4 text-success"
        aria-label="روند صعودی"
      />
    );
  }

  if (trend === "down") {
    return (
      <TrendingDown
        className="h-4 w-4 text-destructive"
        aria-label="روند نزولی"
      />
    );
  }

  return (
    <Minus
      className="h-4 w-4 text-muted-foreground"
      aria-label="بدون تغییر"
    />
  );
}

function TournamentCard({
  tournament,
}: {
  tournament: PublicHomeTournament;
}) {
  const status = registrationMeta[tournament.registrationState];

  const capacityPercent =
    tournament.capacity > 0
      ? Math.min(
        100,
        Math.round(
          (tournament.registeredCount / tournament.capacity) * 100,
        ),
      )
      : 0;

  return (
    <article className="group flex h-full min-w-0 flex-col rounded-2xl border border-white/10 bg-card/80 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_20px_55px_rgba(0,0,0,0.2)] sm:rounded-3xl sm:p-5">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-sm font-black leading-6 text-foreground sm:text-base sm:leading-7">
            {tournament.title}
          </h3>

          <p className="mt-1 text-xs font-bold text-secondary">
            {tournament.game.name}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold sm:text-[11px] ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <div className="mt-4 space-y-2.5 text-xs leading-6 text-muted-foreground">
        <p className="flex items-start gap-2">
          <MapPin
            className="mt-1 h-4 w-4 shrink-0 text-primary"
            aria-hidden="true"
          />

          <span className="min-w-0 break-words">
            {tournament.venue.name}

            {tournament.venue.verified && (
              <BadgeCheck
                className="mx-1 inline h-3.5 w-3.5 text-secondary"
                aria-label="مرکز تأییدشده"
              />
            )}

            {" — "}
            {tournament.venue.city}، {tournament.venue.district}
          </span>
        </p>

        <p className="flex items-start gap-2">
          <Clock3
            className="mt-1 h-4 w-4 shrink-0 text-primary"
            aria-hidden="true"
          />

          <span>
            {formatDateTime(
              tournament.startsAt,
              tournament.timezone,
            )}
          </span>
        </p>

        <p className="flex items-center gap-2">
          <Users
            className="h-4 w-4 shrink-0 text-primary"
            aria-hidden="true"
          />

          {tournament.formatLabel}
        </p>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <span>ظرفیت ثبت‌نام</span>

          <span className="shrink-0 font-mono-num">
            {formatNumber(tournament.registeredCount)} /{" "}
            {formatNumber(tournament.capacity)}
          </span>
        </div>

        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-muted"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-gradient-to-l from-primary to-secondary"
            style={{
              width: `${capacityPercent}%`,
            }}
          />
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2 rounded-2xl border border-white/5 bg-background/55 p-3 text-xs sm:gap-3">
        <div className="min-w-0">
          <dt className="text-[10px] leading-5 text-muted-foreground sm:text-xs">
            هزینه ثبت‌نام
          </dt>

          <dd className="mt-1 break-words font-mono-num text-xs font-bold sm:text-sm">
            {tournament.entryFee === 0
              ? "رایگان"
              : formatPrice(tournament.entryFee)}
          </dd>
        </div>

        <div className="min-w-0">
          <dt className="text-[10px] leading-5 text-muted-foreground sm:text-xs">
            جایزه اعلام‌شده
          </dt>

          <dd className="mt-1 break-words font-mono-num text-xs font-bold text-warning sm:text-sm">
            {formatPrice(tournament.fixedPrize)}
          </dd>
        </div>
      </dl>

      <Link
        to="/tournaments/$id"
        params={{
          id: tournament.tournamentSlug,
        }}
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-black text-primary-foreground transition-all duration-200 hover:shadow-[0_12px_35px_rgba(124,58,237,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        مشاهده جزئیات مسابقه
      </Link>
    </article>
  );
}

function GamingCenterCard({
  center,
}: {
  center: PublicHomeGamingCenter;
}) {
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/80 shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 sm:rounded-3xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-elevated">
        <img
          src={center.imageUrl}
          alt={`نمای ${center.name}`}
          loading="lazy"
          width={768}
          height={480}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
        />

        {center.verified && (
          <span className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full border border-secondary/30 bg-background/85 px-2.5 py-1 text-[10px] font-bold text-secondary backdrop-blur-xl sm:text-[11px]">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            مرکز تأییدشده
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <h3 className="min-w-0 break-words text-sm font-black sm:text-base">
            {center.name}
          </h3>

          {center.rating !== null &&
            center.reviewCount !== null && (
              <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-warning sm:text-xs">
                <Star
                  className="h-3.5 w-3.5 fill-current"
                  aria-hidden="true"
                />

                {center.rating.toLocaleString("fa-IR", {
                  maximumFractionDigits: 1,
                })}

                <span className="hidden text-muted-foreground xs:inline">
                  ({formatNumber(center.reviewCount)})
                </span>
              </span>
            )}
        </div>

        <p className="mt-2 flex items-start gap-1.5 text-xs leading-6 text-muted-foreground">
          <MapPin
            className="mt-1 h-4 w-4 shrink-0 text-primary"
            aria-hidden="true"
          />

          <span>
            {center.city}، {center.district}
          </span>
        </p>

        {center.equipmentLabels.length > 0 && (
          <ul
            className="mt-4 flex flex-wrap gap-1.5"
            aria-label="امکانات مرکز"
          >
            {center.equipmentLabels.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-white/10 bg-background/50 px-2.5 py-1 text-[10px] text-muted-foreground sm:text-[11px]"
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs font-bold text-secondary">
            {formatNumber(center.upcomingTournamentCount)} مسابقه
            پیش‌رو
          </span>

          <Link
            to="/centers/$id"
            params={{
              id: center.gamingCenterId,
            }}
            className="inline-flex min-h-10 w-full items-center justify-center rounded-xl border border-white/10 bg-surface px-4 text-xs font-bold transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
          >
            مشاهده مرکز
          </Link>
        </div>
      </div>
    </article>
  );
}

function Showdown({
  showdown,
}: {
  showdown: PublicHomeShowdown;
}) {
  const details = showdown.tournamentSlug ? (
    <Link
      to="/tournaments/$id"
      params={{
        id: showdown.tournamentSlug,
      }}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-sm font-black text-primary-foreground transition-all hover:shadow-[0_12px_35px_rgba(124,58,237,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
    >
      مشاهده رقابت
    </Link>
  ) : (
    <Link
      to="/tournaments"
      className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
    >
      مشاهده مسابقات
    </Link>
  );

  return (
    <section
      className={`${sectionClass} py-10 sm:py-14 lg:py-16`}
      aria-labelledby="home-showdown-title"
    >
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card/80 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.2)] sm:p-8 lg:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rgb-strip"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-primary/10 blur-[80px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-secondary/10 blur-[80px]"
        />

        <div className="relative text-center">
          <span className="inline-flex rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-[10px] font-bold text-warning sm:text-[11px]">
            {showdown.eyebrow}
          </span>

          <h2
            id="home-showdown-title"
            className="mt-4 text-xl font-black sm:text-2xl lg:text-3xl"
          >
            {showdown.title}
          </h2>

          <p className="mt-1.5 text-xs font-bold text-secondary sm:text-sm">
            {showdown.subtitle}
          </p>
        </div>

        <div className="relative mt-8 grid grid-cols-1 items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-5 lg:gap-10">
          <div className="min-w-0 rounded-2xl border border-white/5 bg-background/30 p-4 text-center sm:border-0 sm:bg-transparent sm:p-0 sm:text-start">
            <p className="break-words text-lg font-black sm:text-xl">
              {showdown.playerA.gamerTag}
            </p>

            {showdown.playerA.city && (
              <p className="mt-1 text-xs text-muted-foreground">
                {showdown.playerA.city}
              </p>
            )}

            <p className="mt-3 font-mono-num text-2xl font-black text-secondary sm:text-3xl">
              {formatNumber(showdown.playerA.rating)}
            </p>

            {showdown.playerA.recordLabel && (
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                {showdown.playerA.recordLabel}
              </p>
            )}
          </div>

          <div className="mx-auto grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-primary/40 bg-primary/10 text-xs font-black text-primary shadow-[0_0_35px_rgba(124,58,237,0.16)] sm:h-16 sm:w-16">
            VS
          </div>

          <div className="min-w-0 rounded-2xl border border-white/5 bg-background/30 p-4 text-center sm:border-0 sm:bg-transparent sm:p-0 sm:text-end">
            <p className="break-words text-lg font-black sm:text-xl">
              {showdown.playerB.gamerTag}
            </p>

            {showdown.playerB.city && (
              <p className="mt-1 text-xs text-muted-foreground">
                {showdown.playerB.city}
              </p>
            )}

            <p className="mt-3 font-mono-num text-2xl font-black text-secondary sm:text-3xl">
              {formatNumber(showdown.playerB.rating)}
            </p>

            {showdown.playerB.recordLabel && (
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                {showdown.playerB.recordLabel}
              </p>
            )}
          </div>
        </div>

        <div className="relative mt-7 flex flex-col items-center justify-center gap-2 text-center text-xs leading-6 text-muted-foreground sm:flex-row sm:gap-6">
          <span className="flex items-center gap-1.5">
            <CalendarDays
              className="h-4 w-4 shrink-0 text-primary"
              aria-hidden="true"
            />

            {formatDateTime(
              showdown.startsAt,
              showdown.timezone,
            )}
          </span>

          <span className="flex items-center gap-1.5">
            <MapPin
              className="h-4 w-4 shrink-0 text-primary"
              aria-hidden="true"
            />

            {showdown.venueName}
          </span>
        </div>

        <div className="relative mt-7 text-center">{details}</div>
      </div>
    </section>
  );
}

export function PublicHomePage({
  data,
}: {
  data: PublicHomePageData;
}) {
  return (
    <TournamentLayout>
      {/* Hero */}
      <section
        className="relative isolate overflow-hidden border-b border-white/10"
        aria-labelledby="home-title"
      >
        <div className="absolute inset-0 -z-20" aria-hidden="true">
          <img
            src={heroImg}
            alt=""
            className="h-full w-full scale-[1.02] object-cover object-center"
            width={1024}
            height={1280}
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/80 to-background/30"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-l from-background/95 via-background/55 to-background/10"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent"
        />

        <div className={`${sectionClass} py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28`}>
          <div className="max-w-5xl">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-secondary/35 bg-secondary/10 px-3 py-1.5 text-[10px] font-bold leading-5 text-secondary backdrop-blur sm:text-xs">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-secondary shadow-[0_0_12px_currentColor]"
                aria-hidden="true"
              />

              <span className="truncate sm:overflow-visible sm:whitespace-normal">
                رقابت حضوری را از انتخاب درست شروع کن
              </span>
            </span>

            <h1
              id="home-title"
              className="mt-5 max-w-4xl text-[clamp(2rem,7vw,4.65rem)] font-black leading-[1.13] tracking-tight text-foreground"
            >
              مسابقات گیمینگ حضوری
              <span className="mt-1 block bg-gradient-to-l from-primary via-secondary to-primary bg-clip-text text-transparent sm:mt-2">
                نزدیکت را پیدا کن
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 lg:text-[17px]">
              بازی، شهر و زمان را انتخاب کن؛ مسابقات گیم‌نت‌ها را
              مقایسه کن و برای دیدن جزئیات هر رقابت مستقیم وارد
              صفحه همان مسابقه شو.
            </p>

            <div className="mt-7 grid gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              <Link
                to="/tournaments"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-primary to-secondary px-6 text-sm font-black text-white shadow-[0_12px_35px_rgba(124,58,237,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(124,58,237,0.36)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
              >
                مشاهده مسابقات
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                to="/host"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/10 bg-background/50 px-6 text-sm font-black text-foreground backdrop-blur-xl transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
              >
                برای میزبانی مسابقه
              </Link>
            </div>

            {data.stats && (
              <dl className="mt-8 grid max-w-2xl grid-cols-3 gap-2 sm:mt-9 sm:gap-3">
                <div className="min-w-0 rounded-2xl border border-white/10 bg-background/45 p-2.5 text-center backdrop-blur-xl sm:p-4 sm:text-start">
                  <dt className="text-[9px] leading-4 text-muted-foreground sm:text-xs">
                    مرکز فعال
                  </dt>

                  <dd className="mt-1 truncate font-mono-num text-xl font-black text-secondary sm:text-2xl lg:text-3xl">
                    {formatNumber(data.stats.activeGamingCenters)}
                  </dd>
                </div>

                <div className="min-w-0 rounded-2xl border border-white/10 bg-background/45 p-2.5 text-center backdrop-blur-xl sm:p-4 sm:text-start">
                  <dt className="text-[9px] leading-4 text-muted-foreground sm:text-xs">
                    مسابقه پیش‌رو
                  </dt>

                  <dd className="mt-1 truncate font-mono-num text-xl font-black text-secondary sm:text-2xl lg:text-3xl">
                    {formatNumber(
                      data.stats.openOrUpcomingTournaments,
                    )}
                  </dd>
                </div>

                <div className="min-w-0 rounded-2xl border border-white/10 bg-background/45 p-2.5 text-center backdrop-blur-xl sm:p-4 sm:text-start">
                  <dt className="text-[9px] leading-4 text-muted-foreground sm:text-xs">
                    بازیکن ثبت‌شده
                  </dt>

                  <dd className="mt-1 truncate font-mono-num text-xl font-black text-secondary sm:text-2xl lg:text-3xl">
                    {formatNumber(data.stats.registeredPlayers)}
                  </dd>
                </div>
              </dl>
            )}

            <div className="mt-7 max-w-5xl sm:mt-9">
              <PublicHomeFinder finder={data.finder} />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        className="border-b border-white/10 bg-surface/25"
        aria-label="مزیت‌های مسیر کشف مسابقه"
      >
        <div
          className={`${sectionClass} grid gap-3 py-10 sm:grid-cols-2 sm:gap-4 sm:py-12 lg:grid-cols-4`}
        >
          {benefits.map(
            ({
              title,
              description,
              icon: Icon,
            }) => (
              <article
                key={title}
                className="group rounded-2xl border border-white/10 bg-card/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card sm:p-5"
              >
                <span
                  className="grid h-10 w-10 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </span>

                <h2 className="mt-4 text-sm font-black leading-6">
                  {title}
                </h2>

                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  {description}
                </p>
              </article>
            ),
          )}
        </div>
      </section>

      {/* Popular games */}
      {data.popularGames.length > 0 && (
        <section
          className={`${sectionClass} py-10 sm:py-14 lg:py-16`}
          aria-labelledby="popular-games-title"
        >
          <SectionHeading
            title="مسابقه را از بازی موردعلاقه‌ات پیدا کن"
            description="بازی را انتخاب کن تا مستقیماً مسابقات مرتبط با همان عنوان را ببینی."
            action={
              <SectionAction to="/games">
                همه بازی‌ها
              </SectionAction>
            }
          />

          <div
            id="popular-games-title"
            className="sr-only"
          >
            بازی‌های دارای مسابقه
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {data.popularGames.map((game) => (
              <Link
                key={game.gameId}
                to="/tournaments"
                search={{
                  game: game.gameId,
                }}
                className="group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-card shadow-[0_10px_35px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:rounded-3xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-elevated">
                  <img
                    src={game.imageUrl}
                    alt={`مسابقات ${game.name}`}
                    loading="lazy"
                    width={480}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                    <h3 className="truncate text-xs font-black sm:text-sm">
                      {game.name}
                    </h3>

                    <p className="mt-0.5 truncate text-[10px] text-muted-foreground sm:text-[11px]">
                      {game.platformLabel}
                    </p>

                    <p className="mt-1 text-[10px] font-bold text-secondary sm:text-[11px]">
                      {formatNumber(
                        game.activeTournamentCount,
                      )}{" "}
                      مسابقه فعال
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured tournaments */}
      {data.featuredTournaments.length > 0 && (
        <section
          className="border-y border-white/10 bg-surface/25"
          aria-labelledby="featured-tournaments-title"
        >
          <div className={`${sectionClass} py-10 sm:py-14 lg:py-16`}>
            <SectionHeading
              title="مسابقات پیش‌رو"
              description="رقابت‌های فعلی را ببین و برای ظرفیت، زمان و شرایط کامل وارد صفحه همان مسابقه شو."
              action={
                <SectionAction to="/tournaments">
                  همه مسابقات
                </SectionAction>
              }
            />

            <div
              id="featured-tournaments-title"
              className="sr-only"
            >
              مسابقات منتخب پیش‌رو
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {data.featuredTournaments.map(
                (item) => (
                  <TournamentCard
                    key={item.tournamentId}
                    tournament={item}
                  />
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {data.featuredShowdown && (
        <Showdown showdown={data.featuredShowdown} />
      )}

      {/* Gaming centers */}
      {data.featuredGamingCenters.length > 0 && (
        <section
          className={`${sectionClass} py-10 sm:py-14 lg:py-16`}
          aria-labelledby="featured-centers-title"
        >
          <SectionHeading
            title="مراکز میزبان مسابقه"
            description="موقعیت، امکانات و مسابقات پیش‌روی مراکز را قبل از انتخاب بررسی کن."
            action={
              <SectionAction to="/centers">
                همه مراکز
              </SectionAction>
            }
          />

          <div
            id="featured-centers-title"
            className="sr-only"
          >
            مراکز میزبان منتخب
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.featuredGamingCenters.map(
              (item) => (
                <GamingCenterCard
                  key={item.gamingCenterId}
                  center={item}
                />
              ),
            )}
          </div>
        </section>
      )}

      {/* Ranking */}
      {data.rankingPreview &&
        data.rankingPreview.entries.length > 0 && (
          <section
            className="border-y border-white/10 bg-surface/25"
            aria-labelledby="ranking-preview-title"
          >
            <div className={`${sectionClass} py-10 sm:py-14 lg:py-16`}>
              <SectionHeading
                title={`نگاهی به رتبه‌بندی ${data.rankingPreview.game.name}`}
                description="پیش‌نمایشی از رتبه‌بندی ثبت‌شده بازیکنان؛ برای جدول کامل وارد صفحه رتبه‌بندی شو."
                action={
                  <SectionAction to="/ranking">
                    رتبه‌بندی کامل
                  </SectionAction>
                }
              />

              <div
                id="ranking-preview-title"
                className="sr-only"
              >
                پیش‌نمایش رتبه‌بندی بازیکنان
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-card/70 shadow-[0_15px_45px_rgba(0,0,0,0.12)] sm:rounded-3xl">
                <ul className="divide-y divide-white/5">
                  {data.rankingPreview.entries.map(
                    (entry) => (
                      <li
                        key={entry.player.playerId}
                        className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 p-3.5 transition-colors hover:bg-white/[0.025] sm:gap-3 sm:p-4 md:grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] md:px-5"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 font-mono-num text-sm font-black text-primary">
                          {formatNumber(entry.rank)}
                        </span>

                        <div className="min-w-0">
                          <p className="truncate text-xs font-black sm:text-sm">
                            {entry.player.gamerTag}
                          </p>

                          {entry.city && (
                            <p className="mt-1 truncate text-[10px] text-muted-foreground sm:text-xs">
                              {entry.city}
                            </p>
                          )}
                        </div>

                        <div className="flex shrink-0 items-center gap-1.5">
                          <span className="font-mono-num text-xs font-black text-secondary sm:text-sm">
                            {formatNumber(entry.rating)}
                          </span>

                          <TrendIcon trend={entry.trend} />
                        </div>

                        <span className="hidden whitespace-nowrap text-xs text-muted-foreground md:block">
                          {formatNumber(
                            entry.finalizedMatches,
                          )}{" "}
                          Match نهایی
                        </span>

                        <span className="hidden whitespace-nowrap text-xs text-muted-foreground md:block">
                          {formatNumber(entry.wins)} برد
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </section>
        )}

      {/* How it works */}
      <section
        className={`${sectionClass} py-10 sm:py-14 lg:py-16`}
        aria-labelledby="how-it-works-title"
      >
        <SectionHeading
          title="از پیدا کردن مسابقه تا روز رقابت"
          description="صفحه اصلی فقط نقطه شروع است؛ هر تصمیم مهم را در صفحه تخصصی خودش می‌بینی."
        />

        <ol
          id="how-it-works-title"
          className="grid gap-3 md:grid-cols-3 md:gap-4"
        >
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 sm:rounded-3xl sm:p-6"
            >
              <div
                aria-hidden="true"
                className="absolute -left-14 -top-14 h-32 w-32 rounded-full bg-primary/5 blur-2xl"
              />

              <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary font-mono-num text-sm font-black text-white shadow-[0_10px_30px_rgba(124,58,237,0.22)] sm:h-11 sm:w-11 sm:text-base">
                {formatNumber(index + 1)}
              </span>

              <h3 className="relative mt-4 text-sm font-black leading-6 sm:text-base">
                {step.title}
              </h3>

              <p className="relative mt-2 text-xs leading-6 text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Final CTA */}
      <section className={`${sectionClass} pb-12 pt-1 sm:pb-16 lg:pb-20`}>
        <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card px-5 py-10 text-center shadow-[0_25px_80px_rgba(0,0,0,0.18)] sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-secondary/15 blur-[70px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
          />

          <span className="relative inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary sm:text-xs">
            آماده رقابت؟
          </span>

          <h2 className="relative mx-auto mt-4 max-w-2xl text-xl font-black leading-tight sm:text-2xl lg:text-3xl">
            مسابقه بعدی‌ات را پیدا کن
          </h2>

          <p className="relative mx-auto mt-3 max-w-xl text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">
            اگر بازیکنی، از فهرست مسابقات شروع کن. اگر مرکز
            میزبان داری، مسیر میزبانی و انتشار مسابقه را ببین.
          </p>

          <div className="relative mx-auto mt-7 grid max-w-md gap-2.5 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-3">
            <Link
              to="/tournaments"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-primary to-secondary px-6 text-sm font-black text-white shadow-[0_12px_35px_rgba(124,58,237,0.24)] transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
            >
              مشاهده مسابقات

              <ArrowLeft
                className="h-4 w-4"
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/host"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/10 bg-surface/70 px-6 text-sm font-black transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
            >
              مسیر میزبانی
            </Link>
          </div>
        </div>
      </section>
    </TournamentLayout>
  );
}

export function PublicHomeSkeleton() {
  return (
    <TournamentLayout>
      <section
        className={`${sectionClass} py-12 sm:py-16 md:py-20`}
        aria-busy="true"
        aria-label="در حال آماده‌سازی صفحه اصلی"
      >
        <div className="h-6 w-40 animate-pulse rounded-full bg-muted" />

        <div className="mt-6 h-12 max-w-2xl animate-pulse rounded-2xl bg-muted sm:h-16" />

        <div className="mt-4 h-20 max-w-xl animate-pulse rounded-2xl bg-muted" />

        <div className="mt-8 h-72 animate-pulse rounded-3xl bg-muted sm:h-48" />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-72 animate-pulse rounded-3xl bg-muted"
            />
          ))}
        </div>
      </section>
    </TournamentLayout>
  );
}

export function PublicHomeErrorState({
  onRetry,
}: {
  onRetry: () => void;
}) {
  return (
    <TournamentLayout>
      <section
        className={`${sectionClass} py-16 text-center sm:py-20`}
        role="alert"
      >
        <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-card p-6 shadow-[0_20px_70px_rgba(0,0,0,0.2)] sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          />

          <h1 className="relative text-xl font-black sm:text-2xl">
            صفحه اصلی بارگذاری نشد
          </h1>

          <p className="relative mt-3 text-sm leading-7 text-muted-foreground">
            برای دیدن تازه‌ترین مسابقات، مراکز و رتبه‌بندی دوباره
            تلاش کن.
          </p>

          <button
            type="button"
            onClick={onRetry}
            className="relative mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground transition-all hover:shadow-[0_12px_35px_rgba(124,58,237,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-auto"
          >
            <RotateCcw
              className="h-4 w-4"
              aria-hidden="true"
            />

            تلاش دوباره
          </button>
        </div>
      </section>
    </TournamentLayout>
  );
}