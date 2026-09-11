import { Link } from "@tanstack/react-router";
import { ArrowLeft, Gamepad2, MapPin, RotateCcw, Trophy } from "lucide-react";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import type { GameCatalogItem, GameCatalogPageData } from "@/lib/game-catalog-contract";
import { formatNumber } from "@/lib/format";

function tournamentCountCopy(game: GameCatalogItem) {
  if (game.tournamentCount === null) return "مسابقات مرتبط را بررسی کن";
  if (game.tournamentCount === 0) return "فعلاً مسابقه‌ای در فهرست نیست";
  return `${formatNumber(game.tournamentCount)} مسابقه در فهرست`;
}

function GameCatalogCard({ game }: { game: GameCatalogItem }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/60">
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {game.coverImage ? (
          <img
            src={game.coverImage}
            alt={`تصویر ${game.name}`}
            loading="lazy"
            width={768}
            height={432}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full place-items-center text-muted-foreground" aria-hidden="true">
            <Gamepad2 className="h-10 w-10" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/55 to-transparent px-5 pb-4 pt-12">
          <h2 className="text-xl font-black tracking-tight text-foreground">{game.name}</h2>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2" aria-label={`پلتفرم‌های ${game.name}`}>
          {game.platforms.map((platform) => (
            <span key={platform} className="rounded-full border border-border bg-muted/70 px-3 py-1 text-xs font-bold text-muted-foreground">
              {platform}
            </span>
          ))}
        </div>

        <p className="mt-4 text-sm leading-7 text-muted-foreground">{game.description}</p>
        <p className="mt-4 text-xs font-bold text-secondary">{tournamentCountCopy(game)}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/games/$slug"
            params={{ slug: game.slug }}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            صفحه بازی
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/tournaments"
            search={{ game: game.gameId }}
            className="inline-flex min-h-11 items-center rounded-xl border border-border bg-background px-4 text-sm font-bold text-foreground transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            مسابقات این بازی
          </Link>
        </div>
      </div>
    </article>
  );
}

export function GameCatalogPage({ data }: { data: GameCatalogPageData }) {
  return (
    <TournamentLayout pageOwnsMain>
      <main>
        <section className="border-b border-border bg-gradient-to-l from-primary/15 via-transparent to-secondary/5" aria-labelledby="games-title">
          <div className="container mx-auto px-4 py-10 md:py-14">
            <p className="text-sm font-bold text-primary">فهرست بازی‌های رقابتی</p>
            <div className="mt-2 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <h1 id="games-title" className="text-3xl font-black tracking-tight md:text-4xl">بازی‌های مسابقات گیمینگ</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                  بازی‌ای را انتخاب کن تا مسابقات حضوری، فرمت‌های رقابت و مسیرهای مرتبط با همان بازی را در صفحه اختصاصی آن بررسی کنی.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-card/80 px-4 py-3 text-sm backdrop-blur-sm">
                <span className="font-mono-num text-lg font-black text-foreground">{formatNumber(data.totalItems)}</span>
                <span className="mr-2 text-muted-foreground">بازی در فهرست عمومی</span>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 md:py-10" aria-labelledby="game-catalog-heading">
          <div className="max-w-2xl">
            <h2 id="game-catalog-heading" className="text-2xl font-black">یک بازی را برای ادامه مسیر انتخاب کن</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              هر صفحه بازی اطلاعات رقابتی همان عنوان را جدا از فهرست کلی مسابقات نگه می‌دارد تا انتخاب بازی و انتخاب تورنمنت با هم قاطی نشوند.
            </p>
          </div>

          {data.items.length > 0 ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {data.items.map((game) => <GameCatalogCard key={game.gameId} game={game} />)}
            </div>
          ) : (
            <section className="mt-8 rounded-3xl border border-dashed border-border bg-card p-10 text-center md:p-14" aria-labelledby="empty-games-title">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Gamepad2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2 id="empty-games-title" className="mt-4 text-xl font-black">فعلاً بازی‌ای در فهرست عمومی نیست</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
                می‌توانی فهرست مسابقات را ببینی و بعداً دوباره به بخش بازی‌ها برگردی.
              </p>
              <Link to="/tournaments" className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                مشاهده مسابقات
              </Link>
            </section>
          )}
        </section>

        <section className="border-t border-border bg-surface/30" aria-labelledby="games-next-title">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl">
              <h2 id="games-next-title" className="text-2xl font-black">بعد از انتخاب بازی، مسیر رقابت را کامل کن</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                فهرست بازی‌ها نقطه شروع است؛ برای پیدا کردن رقابت، شناخت مرکز میزبان یا دنبال کردن جایگاه بازیکنان، وارد بخش تخصصی همان نیاز شو.
              </p>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <Link to="/tournaments" className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Gamepad2 className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-black">همه مسابقات</h3>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">مسابقات را بر اساس بازی، شهر، زمان و وضعیت ثبت‌نام مقایسه کن.</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">مشاهده مسابقات <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" /></span>
              </Link>
              <Link to="/centers" className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-black">گیم‌نت‌ها و مرکزهای میزبان</h3>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">مرکزهای میزبان را جداگانه بررسی کن و مسیر برگزاری را بشناس.</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">مشاهده مرکزها <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" /></span>
              </Link>
              <Link to="/ranking" className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Trophy className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-black">رتبه‌بندی بازیکنان</h3>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">جایگاه بازیکنان را در بخش رتبه‌بندی دنبال کن.</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">مشاهده رتبه‌بندی <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" /></span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </TournamentLayout>
  );
}

export function GameCatalogSkeleton() {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-12" aria-busy="true" aria-label="در حال بارگذاری فهرست بازی‌ها">
        <div className="h-5 w-36 animate-pulse rounded-full bg-muted" />
        <div className="mt-5 h-12 max-w-xl animate-pulse rounded-2xl bg-muted" />
        <div className="mt-4 h-16 max-w-2xl animate-pulse rounded-2xl bg-muted" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="overflow-hidden rounded-3xl border border-border bg-card">
              <div className="aspect-[16/9] animate-pulse bg-muted" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-1/2 animate-pulse rounded bg-muted" />
                <div className="h-16 animate-pulse rounded bg-muted" />
                <div className="h-10 w-2/3 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </TournamentLayout>
  );
}

export function GameCatalogErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <TournamentLayout pageOwnsMain>
      <main className="container mx-auto px-4 py-20 text-center" role="alert">
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 md:p-10">
          <Gamepad2 className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-black">فهرست بازی‌ها فعلاً بارگذاری نشد</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">برای دریافت دوباره بازی‌های رقابتی، یک بار دیگر تلاش کن.</p>
          <button type="button" onClick={onRetry} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            تلاش دوباره
          </button>
        </div>
      </main>
    </TournamentLayout>
  );
}
