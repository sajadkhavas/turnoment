import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  Gamepad2,
  MapPin,
  Monitor,
  RotateCcw,
  Trophy,
  Users,
} from "lucide-react";
import { TournamentDiscoveryCard } from "@/components/tournaments/tournament-discovery-card";
import type { GameDetail } from "@/lib/game-detail-contract";
import { formatNumber } from "@/lib/format";

const trendGlyph = {
  up: "↑",
  down: "↓",
  flat: "—",
} as const;

const trendClass = {
  up: "text-success",
  down: "text-danger",
  flat: "text-muted-foreground",
} as const;

export function GameDetailPage({ game }: { game: GameDetail }) {
  const discoverableTournaments = game.tournaments.filter(
    (tournament) => tournament.status !== "closed",
  );

  return (
    <main>
      <section className="relative overflow-hidden border-b border-border bg-card">
        {game.heroImage ? (
          <img
            src={game.heroImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/95 to-background/55" />
        <div className="container relative mx-auto px-4 py-8 md:py-12 lg:py-16">
          <nav aria-label="مسیر صفحه" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/games" className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              بازی‌ها
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-foreground">{game.name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2">
                {game.platforms.map((platform) => (
                  <span key={platform} className="inline-flex items-center gap-1.5 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">
                    <Monitor className="h-3.5 w-3.5" />
                    {platform}
                  </span>
                ))}
              </div>
              <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">{game.name}</h1>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-muted-foreground md:text-base">{game.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/tournaments"
                  search={{ game: game.id }}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  مسابقات {game.shortName}
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link
                  to="/ranking"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-background/70 px-5 text-sm font-bold transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  رتبه‌بندی بازیکنان
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 rounded-2xl border border-border bg-background/70 p-3 backdrop-blur-sm sm:gap-3 lg:grid-cols-1">
              <StatRow label="مسابقه با ثبت‌نام باز" value={game.stats.openTournamentCount} icon={<Trophy className="h-4 w-4 text-warning" />} />
              <StatRow label="گیم‌نت میزبان" value={game.stats.supportingCenterCount} icon={<MapPin className="h-4 w-4 text-primary" />} />
              <StatRow label="بازیکن رتبه‌دار" value={game.stats.rankedPlayerCount} icon={<Users className="h-4 w-4 text-secondary" />} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="game-tournaments-heading" className="container mx-auto px-4 py-10 md:py-14">
        <SectionHeader
          id="game-tournaments-heading"
          eyebrow="مسابقات و تورنمنت‌ها"
          title={`مسابقات ${game.shortName}`}
          description={`مسابقات و تورنمنت‌های ${game.shortName} را با زمان برگزاری، وضعیت ثبت‌نام، ظرفیت، گیم‌نت میزبان و جایزه بررسی کن.`}
          action={
            <Link to="/tournaments" search={{ game: game.id }} className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
              همه مسابقات {game.shortName}
              <ArrowLeft className="h-4 w-4" />
            </Link>
          }
        />

        {discoverableTournaments.length > 0 ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {discoverableTournaments.slice(0, 4).map((tournament) => (
              <TournamentDiscoveryCard key={tournament.id} t={tournament} />
            ))}
          </div>
        ) : (
          <EmptyPanel
            icon={<Trophy className="h-6 w-6" />}
            title={`فعلاً مسابقه‌ای برای ${game.shortName} در دسترس نیست`}
            description={`در حال حاضر مسابقه‌ای با ثبت‌نام باز یا زمان‌بندی‌شده برای ${game.shortName} وجود ندارد. می‌توانی فهرست همه مسابقات را بررسی کنی.`}
            action={
              <Link to="/tournaments" className="text-sm font-bold text-primary hover:underline">
                مشاهده همه مسابقات
              </Link>
            }
          />
        )}
      </section>

      <section aria-labelledby="game-formats-heading" className="border-y border-border bg-card/55">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <SectionHeader
            id="game-formats-heading"
            eyebrow="نحوه برگزاری"
            title={`فرمت‌های مسابقات ${game.shortName}`}
            description="مسابقات این بازی می‌توانند با فرمت‌های زیر برگزار شوند. قوانین، تعداد بازی‌ها و شرایط صعود هر تورنمنت را در صفحه همان مسابقه ببین."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {game.competitiveFormats.map((format) => (
              <article key={format.id} className="rounded-2xl border border-border bg-background p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Gamepad2 className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-black">{format.label}</h3>
                    {format.teamSize ? (
                      <p className="mt-1 text-xs text-muted-foreground">تعداد بازیکن در تیم: {formatNumber(format.teamSize)}</p>
                    ) : null}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{format.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="game-ranking-heading" className="container mx-auto px-4 py-10 md:py-14">
        <SectionHeader
          id="game-ranking-heading"
          eyebrow="رتبه‌بندی بازیکنان"
          title={`رتبه‌بندی بازیکنان ${game.shortName}`}
          description={`جایگاه و عملکرد بازیکنان ${game.shortName} را بر اساس نتایج مسابقات ثبت‌شده دنبال کن.`}
          action={
            <Link to="/ranking" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
              مشاهده رتبه‌بندی کامل
              <ArrowLeft className="h-4 w-4" />
            </Link>
          }
        />

        {game.ranking.state === "active" && game.ranking.entries.length > 0 ? (
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
            <div className="hidden grid-cols-[70px_minmax(0,1fr)_110px_110px_90px] gap-3 border-b border-border bg-muted/35 px-5 py-3 text-xs font-bold text-muted-foreground md:grid">
              <span>رتبه</span>
              <span>بازیکن</span>
              <span>امتیاز</span>
              <span>مسابقه</span>
              <span>روند</span>
            </div>
            <div className="divide-y divide-border">
              {game.ranking.entries.slice(0, 5).map((entry) => (
                <Link
                  key={`${entry.rank}-${entry.gamerTag}`}
                  to="/players/$username"
                  params={{ username: entry.gamerTag }}
                  className="grid gap-3 px-5 py-4 transition-colors hover:bg-muted/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:grid-cols-[70px_minmax(0,1fr)_110px_110px_90px] md:items-center"
                >
                  <span className="font-mono-num text-lg font-black text-primary">#{formatNumber(entry.rank)}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-black">{entry.gamerTag}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{entry.city}</span>
                  </span>
                  <span className="font-mono-num text-sm font-black">{formatNumber(entry.rating)}</span>
                  <span className="text-xs text-muted-foreground">{formatNumber(entry.played)} بازی / {formatNumber(entry.wins)} برد</span>
                  <span className={`font-mono-num text-lg font-black ${trendClass[entry.trend]}`}>{trendGlyph[entry.trend]}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <EmptyPanel
            icon={<Users className="h-6 w-6" />}
            title={`رتبه‌بندی ${game.shortName} منتشر نشده است`}
            description="برای این بازی در حال حاضر جدول رتبه‌بندی منتشر نشده است. مسابقات فعال را از بخش بالای همین صفحه دنبال کن."
          />
        )}
      </section>

      <section aria-labelledby="game-centers-heading" className="border-t border-border bg-card/55">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <SectionHeader
            id="game-centers-heading"
            eyebrow="گیم‌نت و محل برگزاری"
            title={`گیم‌نت‌های میزبان مسابقات ${game.shortName}`}
            description={`گیم‌نت‌هایی که برای ${game.shortName} مسابقه برگزار می‌کنند یا میزبان رویدادهای ثبت‌شده این بازی هستند.`}
          />

          {game.centers.length > 0 ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {game.centers.map((center) => (
                <article key={center.id} className="overflow-hidden rounded-2xl border border-border bg-background">
                  {center.image ? (
                    <img src={center.image} alt="" className="h-36 w-full object-cover" loading="lazy" width={720} height={360} />
                  ) : (
                    <div className="grid h-36 place-items-center bg-muted/40 text-muted-foreground" aria-hidden="true">
                      <Gamepad2 className="h-8 w-8" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="truncate font-black">{center.name}</h3>
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          {center.city}، {center.district}
                        </p>
                      </div>
                      {center.verified ? <BadgeCheck className="h-5 w-5 shrink-0 text-secondary" aria-label="گیم‌نت تأییدشده" /> : null}
                    </div>
                    {center.equipment.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {center.equipment.slice(0, 3).map((item) => (
                          <span key={item} className="rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] text-muted-foreground">{item}</span>
                        ))}
                      </div>
                    ) : null}
                    <Link
                      to="/centers/$id"
                      params={{ id: center.id }}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      مشاهده {center.name}
                      <ArrowLeft className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyPanel
              icon={<MapPin className="h-6 w-6" />}
              title={`گیم‌نت میزبان برای ${game.shortName} پیدا نشد`}
              description="در حال حاضر گیم‌نت میزبان فعالی برای این بازی در فهرست مسابقات وجود ندارد."
              action={
                <Link to="/centers" className="text-sm font-bold text-primary hover:underline">
                  مشاهده گیم‌نت‌ها
                </Link>
              }
            />
          )}
        </div>
      </section>
    </main>
  );
}

function StatRow({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/80 bg-card/70 p-3 sm:p-4">
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-2 font-mono-num text-xl font-black sm:text-2xl">{formatNumber(value)}</div>
    </div>
  );
}

function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  action,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-black text-secondary">{eyebrow}</p>
        <h2 id={id} className="mt-2 text-2xl font-black md:text-3xl">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function EmptyPanel({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-border bg-card/45 px-5 py-10 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">{icon}</div>
      <h3 className="mt-4 font-black">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-muted-foreground">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function GameDetailSkeleton() {
  return (
    <main className="animate-pulse" aria-busy="true" aria-label="در حال بارگذاری صفحه بازی">
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="h-4 w-36 rounded bg-muted" />
          <div className="mt-8 h-10 w-48 rounded bg-muted" />
          <div className="mt-4 h-5 max-w-2xl rounded bg-muted" />
          <div className="mt-2 h-5 max-w-xl rounded bg-muted" />
        </div>
      </section>
      <div className="container mx-auto px-4 py-10">
        <div className="h-8 w-56 rounded bg-muted" />
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <div className="h-80 rounded-2xl bg-muted" />
          <div className="h-80 rounded-2xl bg-muted" />
        </div>
      </div>
    </main>
  );
}

export function GameDetailError({ retry }: { retry: () => void }) {
  return (
    <main className="container mx-auto px-4 py-24 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-danger/10 text-danger">
        <Gamepad2 className="h-7 w-7" />
      </div>
      <h1 className="mt-5 text-2xl font-black">اطلاعات بازی بارگذاری نشد</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">دوباره تلاش کن. اگر مشکل ادامه داشت، می‌توانی به فهرست بازی‌ها برگردی.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={retry}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcw className="h-4 w-4" />
          تلاش دوباره
        </button>
        <Link to="/games" className="inline-flex h-11 items-center rounded-xl border border-border px-5 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          فهرست بازی‌ها
        </Link>
      </div>
    </main>
  );
}