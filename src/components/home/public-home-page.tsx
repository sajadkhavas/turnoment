import { Link } from "@tanstack/react-router";
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
import { PublicHomeFinder } from "./public-home-finder";
import heroImg from "@/assets/tournament/hero-arena.jpg";
import type {
  PublicHomeGamingCenter,
  PublicHomePageData,
  PublicHomeShowdown,
  PublicHomeTournament,
  PublicHomeTournamentRegistrationState,
  PublicHomeTrend,
} from "@/lib/public-home-contract";
import { formatNumber, formatPrice } from "@/lib/format";

const benefits = [
  { title: "جست‌وجوی سریع مسابقه", description: "بازی، شهر و زمان را مشخص کن و مستقیم وارد فهرست مسابقات مرتبط شو.", icon: SearchCheck },
  { title: "جزئیات روشن قبل از انتخاب", description: "زمان، ظرفیت، هزینه، جایزه و اطلاعات مرکز میزبان را قبل از ادامه ببین.", icon: CalendarDays },
  { title: "مسیر رقابت قابل پیگیری", description: "از پیدا کردن مسابقه تا نتیجه و رتبه‌بندی، هر مرحله در جای مشخص خودش قرار دارد.", icon: Trophy },
  { title: "مرکز میزبان قابل شناسایی", description: "هویت و موقعیت مرکز میزبان کنار مسابقه نمایش داده می‌شود تا انتخاب دقیق‌تری داشته باشی.", icon: MapPin },
];

const steps = [
  { title: "مسابقه مناسب را پیدا کن", description: "از بازی، شهر یا زمان شروع کن و گزینه‌های مرتبط را ببین." },
  { title: "جزئیات را بررسی کن", description: "مرکز میزبان، زمان، ظرفیت و شرایط همان مسابقه را قبل از ثبت‌نام بخوان." },
  { title: "وارد رقابت شو", description: "از صفحه مسابقه ادامه بده و بعد از برگزاری، مسیر نتیجه و رتبه‌بندی را دنبال کن." },
];

const registrationMeta: Record<PublicHomeTournamentRegistrationState, { label: string; className: string }> = {
  open: { label: "ثبت‌نام باز", className: "border-success/40 bg-success/10 text-success" },
  filling: { label: "ظرفیت رو به تکمیل", className: "border-warning/40 bg-warning/10 text-warning" },
  closed: { label: "ثبت‌نام بسته", className: "border-border bg-muted text-muted-foreground" },
  unavailable: { label: "فعلاً در دسترس نیست", className: "border-border bg-muted text-muted-foreground" },
};

function SectionHeading({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-black tracking-tight md:text-3xl">{title}</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
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
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-success" aria-label="روند صعودی" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" aria-label="روند نزولی" />;
  return <Minus className="h-4 w-4 text-muted-foreground" aria-label="بدون تغییر" />;
}

function TournamentCard({ tournament }: { tournament: PublicHomeTournament }) {
  const status = registrationMeta[tournament.registrationState];
  const capacityPercent = Math.min(100, Math.round((tournament.registeredCount / tournament.capacity) * 100));

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-black leading-7">{tournament.title}</h3>
          <p className="mt-1 text-xs font-bold text-secondary">{tournament.game.name}</p>
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${status.className}`}>{status.label}</span>
      </div>

      <div className="mt-4 space-y-2 text-xs leading-6 text-muted-foreground">
        <p className="flex items-start gap-2">
          <MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <span>
            {tournament.venue.name}
            {tournament.venue.verified && <BadgeCheck className="mx-1 inline h-3.5 w-3.5 text-secondary" aria-label="مرکز تأییدشده" />}
            — {tournament.venue.city}، {tournament.venue.district}
          </span>
        </p>
        <p className="flex items-center gap-2"><Clock3 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{formatDateTime(tournament.startsAt, tournament.timezone)}</p>
        <p className="flex items-center gap-2"><Users className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{tournament.formatLabel}</p>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>ظرفیت ثبت‌نام</span>
          <span className="font-mono-num">{formatNumber(tournament.registeredCount)} / {formatNumber(tournament.capacity)}</span>
        </div>
        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted" aria-hidden="true">
          <div className="h-full rounded-full bg-gradient-to-l from-primary to-secondary" style={{ width: `${capacityPercent}%` }} />
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 rounded-xl border border-border bg-background/60 p-3 text-xs">
        <div>
          <dt className="text-muted-foreground">هزینه ثبت‌نام</dt>
          <dd className="mt-1 font-mono-num font-bold">{tournament.entryFee === 0 ? "رایگان" : formatPrice(tournament.entryFee)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">جایزه اعلام‌شده</dt>
          <dd className="mt-1 font-mono-num font-bold text-warning">{formatPrice(tournament.fixedPrize)}</dd>
        </div>
      </dl>

      <Link
        to="/tournaments/$id"
        params={{ id: tournament.tournamentSlug }}
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-black text-primary-foreground transition-all hover:glow-violet-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        مشاهده جزئیات مسابقه
      </Link>
    </article>
  );
}

function GamingCenterCard({ center }: { center: PublicHomeGamingCenter }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/60">
      <div className="relative aspect-[16/10] overflow-hidden bg-elevated">
        <img src={center.imageUrl} alt={`نمای ${center.name}`} loading="lazy" width={768} height={480} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {center.verified && (
          <span className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full border border-secondary/40 bg-background/90 px-2.5 py-1 text-[11px] font-bold text-secondary backdrop-blur">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> مرکز تأییدشده
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-base font-black">{center.name}</h3>
          {center.rating !== null && center.reviewCount !== null && (
            <span className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-warning">
              <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              {center.rating.toLocaleString("fa-IR", { maximumFractionDigits: 1 })}
              <span className="text-muted-foreground">({formatNumber(center.reviewCount)})</span>
            </span>
          )}
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{center.city}، {center.district}</p>
        {center.equipmentLabels.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="امکانات مرکز">
            {center.equipmentLabels.map((item) => <li key={item} className="rounded-lg border border-border bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground">{item}</li>)}
          </ul>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-xs font-bold text-secondary">{formatNumber(center.upcomingTournamentCount)} مسابقه پیش‌رو</span>
          <Link to="/centers/$id" params={{ id: center.gamingCenterId }} className="inline-flex min-h-10 items-center rounded-lg border border-border bg-surface px-4 text-xs font-bold transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">مشاهده مرکز</Link>
        </div>
      </div>
    </article>
  );
}

function Showdown({ showdown }: { showdown: PublicHomeShowdown }) {
  const details = showdown.tournamentSlug ? (
    <Link to="/tournaments/$id" params={{ id: showdown.tournamentSlug }} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">مشاهده رقابت</Link>
  ) : (
    <Link to="/tournaments" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">مشاهده مسابقات</Link>
  );

  return (
    <section className="container mx-auto px-4 py-14" aria-labelledby="home-showdown-title">
      <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card p-6 md:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rgb-strip" />
        <div className="relative text-center">
          <span className="inline-flex rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-[11px] font-bold text-warning">{showdown.eyebrow}</span>
          <h2 id="home-showdown-title" className="mt-4 text-2xl font-black md:text-3xl">{showdown.title}</h2>
          <p className="mt-1.5 text-sm font-bold text-secondary">{showdown.subtitle}</p>
        </div>
        <div className="relative mt-8 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 md:gap-8">
          {[showdown.playerA, showdown.playerB].map((player, index) => (
            <div key={player.playerId} className={index === 0 ? "min-w-0 text-start" : "min-w-0 text-end"}>
              <p className="break-words text-lg font-black md:text-xl">{player.gamerTag}</p>
              {player.city && <p className="mt-1 text-xs text-muted-foreground">{player.city}</p>}
              <p className="mt-3 font-mono-num text-2xl font-black text-secondary">{formatNumber(player.rating)}</p>
              {player.recordLabel && <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{player.recordLabel}</p>}
            </div>
          )).reduce<React.ReactNode[]>((items, player, index) => {
            if (index === 1) items.push(<div key="vs" className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/40 bg-primary/10 text-xs font-black text-primary md:h-16 md:w-16">VS</div>);
            items.push(player);
            return items;
          }, [])}
        </div>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground sm:flex-row sm:gap-6">
          <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />{formatDateTime(showdown.startsAt, showdown.timezone)}</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" aria-hidden="true" />{showdown.venueName}</span>
        </div>
        <div className="relative mt-7 text-center">{details}</div>
      </div>
    </section>
  );
}

export function PublicHomePage({ data }: { data: PublicHomePageData }) {
  return (
    <TournamentLayout>
      <section className="relative overflow-hidden border-b border-border" aria-labelledby="home-title">
        <div className="absolute inset-0" aria-hidden="true">
          <img src={heroImg} alt="" className="h-full w-full object-cover" width={1024} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/45" />
          <div className="absolute inset-0 bg-gradient-to-l from-background/90 via-background/50 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 py-16 md:py-24 lg:py-28">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/50 bg-secondary/10 px-3 py-1.5 text-xs font-bold text-secondary"><span className="h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />رقابت حضوری را از انتخاب درست شروع کن</span>
            <h1 id="home-title" className="mt-5 max-w-3xl text-3xl font-black leading-tight sm:text-4xl md:text-5xl lg:text-6xl">مسابقات گیمینگ حضوری نزدیکت را پیدا کن</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-muted-foreground md:text-base">بازی، شهر و زمان را انتخاب کن؛ مسابقات گیم‌نت‌ها را مقایسه کن و برای دیدن جزئیات هر رقابت مستقیم وارد صفحه همان مسابقه شو.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/tournaments" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-black text-primary-foreground transition-all hover:glow-violet-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">مشاهده مسابقات <ArrowLeft className="h-4 w-4" aria-hidden="true" /></Link>
              <Link to="/host" className="inline-flex min-h-12 items-center rounded-xl border border-border bg-surface/80 px-6 text-sm font-black backdrop-blur transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">برای میزبانی مسابقه</Link>
            </div>
            {data.stats && (
              <dl className="mt-9 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border/70 bg-background/60 p-3 backdrop-blur"><dt className="text-xs text-muted-foreground">مرکز فعال</dt><dd className="mt-1 font-mono-num text-2xl font-black text-secondary">{formatNumber(data.stats.activeGamingCenters)}</dd></div>
                <div className="rounded-xl border border-border/70 bg-background/60 p-3 backdrop-blur"><dt className="text-xs text-muted-foreground">مسابقه باز یا پیش‌رو</dt><dd className="mt-1 font-mono-num text-2xl font-black text-secondary">{formatNumber(data.stats.openOrUpcomingTournaments)}</dd></div>
                <div className="rounded-xl border border-border/70 bg-background/60 p-3 backdrop-blur"><dt className="text-xs text-muted-foreground">بازیکن ثبت‌شده</dt><dd className="mt-1 font-mono-num text-2xl font-black text-secondary">{formatNumber(data.stats.registeredPlayers)}</dd></div>
              </dl>
            )}
            <div className="mt-9 max-w-4xl"><PublicHomeFinder finder={data.finder} /></div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface/30" aria-label="مزیت‌های مسیر کشف مسابقه">
        <div className="container mx-auto grid gap-4 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary" aria-hidden="true"><Icon className="h-5 w-5" /></span>
              <h2 className="mt-4 text-sm font-black">{title}</h2>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </section>

      {data.popularGames.length > 0 && (
        <section className="container mx-auto px-4 py-14" aria-labelledby="popular-games-title">
          <SectionHeading title="مسابقه را از بازی موردعلاقه‌ات پیدا کن" description="بازی را انتخاب کن تا مستقیم مسابقات مرتبط با همان عنوان را ببینی." action={<Link to="/games" className="inline-flex min-h-10 items-center gap-1 rounded-lg px-3 text-xs font-bold text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">همه بازی‌ها <ChevronLeft className="h-4 w-4" aria-hidden="true" /></Link>} />
          <div id="popular-games-title" className="sr-only">بازی‌های دارای مسابقه</div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {data.popularGames.map((game) => (
              <Link key={game.gameId} to="/tournaments" search={{ game: game.gameId }} className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <div className="relative aspect-[4/5] overflow-hidden bg-elevated">
                  <img src={game.imageUrl} alt={`مسابقات ${game.name}`} loading="lazy" width={480} height={600} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <h3 className="text-sm font-black">{game.name}</h3>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{game.platformLabel}</p>
                    <p className="mt-1 text-[11px] font-bold text-secondary">{formatNumber(game.activeTournamentCount)} مسابقه فعال</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {data.featuredTournaments.length > 0 && (
        <section className="border-y border-border bg-surface/30" aria-labelledby="featured-tournaments-title">
          <div className="container mx-auto px-4 py-14">
            <SectionHeading title="مسابقات پیش‌رو" description="چند رقابت فعلی را ببین و برای ظرفیت، زمان و شرایط کامل وارد صفحه همان مسابقه شو." action={<Link to="/tournaments" className="inline-flex min-h-10 items-center gap-1 rounded-lg px-3 text-xs font-bold text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">همه مسابقات <ChevronLeft className="h-4 w-4" aria-hidden="true" /></Link>} />
            <div id="featured-tournaments-title" className="sr-only">مسابقات منتخب پیش‌رو</div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{data.featuredTournaments.map((item) => <TournamentCard key={item.tournamentId} tournament={item} />)}</div>
          </div>
        </section>
      )}

      {data.featuredShowdown && <Showdown showdown={data.featuredShowdown} />}

      {data.featuredGamingCenters.length > 0 && (
        <section className="container mx-auto px-4 py-14" aria-labelledby="featured-centers-title">
          <SectionHeading title="مرکزهای میزبان مسابقه" description="موقعیت، امکانات و مسابقات پیش‌روی مرکزها را قبل از انتخاب بررسی کن." action={<Link to="/centers" className="inline-flex min-h-10 items-center gap-1 rounded-lg px-3 text-xs font-bold text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">همه مرکزها <ChevronLeft className="h-4 w-4" aria-hidden="true" /></Link>} />
          <div id="featured-centers-title" className="sr-only">مرکزهای میزبان منتخب</div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{data.featuredGamingCenters.map((item) => <GamingCenterCard key={item.gamingCenterId} center={item} />)}</div>
        </section>
      )}

      {data.rankingPreview && data.rankingPreview.entries.length > 0 && (
        <section className="border-y border-border bg-surface/30" aria-labelledby="ranking-preview-title">
          <div className="container mx-auto px-4 py-14">
            <SectionHeading title={`نگاهی به رتبه‌بندی ${data.rankingPreview.game.name}`} description="این پیش‌نمایش از رتبه‌بندی ثبت‌شده می‌آید؛ برای جدول کامل و بازی‌های دیگر وارد صفحه رتبه‌بندی شو." action={<Link to="/ranking" className="inline-flex min-h-10 items-center gap-1 rounded-lg px-3 text-xs font-bold text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">رتبه‌بندی کامل <ChevronLeft className="h-4 w-4" aria-hidden="true" /></Link>} />
            <div id="ranking-preview-title" className="sr-only">پیش‌نمایش رتبه‌بندی بازیکنان</div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <ul className="divide-y divide-border/60">
                {data.rankingPreview.entries.map((entry) => (
                  <li key={entry.player.playerId} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4 md:grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] md:px-5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 font-mono-num text-sm font-black text-primary">{formatNumber(entry.rank)}</span>
                    <div className="min-w-0"><p className="truncate text-sm font-black">{entry.player.gamerTag}</p>{entry.city && <p className="mt-1 truncate text-xs text-muted-foreground">{entry.city}</p>}</div>
                    <div className="flex items-center gap-2"><span className="font-mono-num text-sm font-black text-secondary">{formatNumber(entry.rating)}</span><TrendIcon trend={entry.trend} /></div>
                    <span className="hidden text-xs text-muted-foreground md:block">{formatNumber(entry.finalizedMatches)} Match نهایی</span>
                    <span className="hidden text-xs text-muted-foreground md:block">{formatNumber(entry.wins)} برد</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-14" aria-labelledby="how-it-works-title">
        <SectionHeading title="از پیدا کردن مسابقه تا روز رقابت" description="صفحه اصلی فقط نقطه شروع است؛ هر تصمیم مهم را در صفحه تخصصی خودش می‌بینی." />
        <ol id="how-it-works-title" className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary font-mono-num text-base font-black text-primary-foreground">{formatNumber(index + 1)}</span>
              <h3 className="mt-4 text-base font-black">{step.title}</h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container mx-auto px-4 pb-16 pt-2">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card px-6 py-12 text-center md:px-10 md:py-16">
          <div className="pointer-events-none absolute -bottom-24 start-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl" aria-hidden="true" />
          <h2 className="relative text-2xl font-black md:text-3xl">مسابقه بعدی‌ات را پیدا کن</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">اگر بازیکنی، از فهرست مسابقات شروع کن. اگر مرکز میزبان داری، مسیر میزبانی و انتشار مسابقه را ببین.</p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/tournaments" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">مشاهده مسابقات <ArrowLeft className="h-4 w-4" aria-hidden="true" /></Link>
            <Link to="/host" className="inline-flex min-h-12 items-center rounded-xl border border-border bg-surface px-6 text-sm font-black transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">مسیر میزبانی</Link>
          </div>
        </div>
      </section>
    </TournamentLayout>
  );
}

export function PublicHomeSkeleton() {
  return (
    <TournamentLayout>
      <section className="container mx-auto px-4 py-16 md:py-24" aria-busy="true" aria-label="در حال آماده‌سازی صفحه اصلی">
        <div className="h-5 w-40 animate-pulse rounded-full bg-muted" />
        <div className="mt-6 h-12 max-w-2xl animate-pulse rounded-2xl bg-muted" />
        <div className="mt-4 h-20 max-w-xl animate-pulse rounded-2xl bg-muted" />
        <div className="mt-8 h-40 animate-pulse rounded-3xl bg-muted" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">{[0, 1, 2].map((item) => <div key={item} className="h-72 animate-pulse rounded-2xl bg-muted" />)}</div>
      </section>
    </TournamentLayout>
  );
}

export function PublicHomeErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <TournamentLayout>
      <section className="container mx-auto px-4 py-20 text-center" role="alert">
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 md:p-10">
          <h1 className="text-2xl font-black">اطلاعات مسابقات فعلاً بارگذاری نشد</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">برای دیدن تازه‌ترین مسابقات، مرکزها و رتبه‌بندی دوباره تلاش کن.</p>
          <button type="button" onClick={onRetry} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><RotateCcw className="h-4 w-4" aria-hidden="true" />تلاش دوباره</button>
        </div>
      </section>
    </TournamentLayout>
  );
}
