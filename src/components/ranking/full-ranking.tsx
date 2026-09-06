import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Crown, Info, Minus, Search, Swords, TrendingDown, TrendingUp } from "lucide-react";
import {
  CHALLENGE_UNLOCK_MATCHES,
  getRanking,
  rankingGames,
  rankingRegions,
  rankingSeasons,
  rankingTypes,
  winRate,
  type RankingEntry,
  type RankingType,
} from "@/lib/ranking-data";
import { formatNumber, toPersianDigits } from "@/lib/format";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PAGE_SIZE = 10;

function Trend({ trend }: { trend: RankingEntry["trend"] }) {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-success" aria-label="صعودی" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" aria-label="نزولی" />;
  return <Minus className="h-4 w-4 text-muted-foreground" aria-label="بدون تغییر" />;
}

function Chip({
  active,
  children,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 rounded-lg border px-4 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        active
          ? "border-primary bg-primary/15 text-primary"
          : "border-border bg-card text-muted-foreground hover:text-foreground"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

function FormDots({ form }: { form: RankingEntry["recentForm"] }) {
  return (
    <div className="flex items-center gap-1" aria-label={`فرم اخیر: ${form.join("، ")}`}>
      {form.map((r, i) => (
        <span
          key={i}
          aria-hidden
          className={`grid h-5 w-5 place-items-center rounded-md text-[10px] font-black ${
            r === "W" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
          }`}
        >
          {r}
        </span>
      ))}
    </div>
  );
}

function HowItWorks() {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-surface px-4 text-xs font-bold text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <Info className="h-4 w-4" /> رتبه‌بندی چطور محاسبه می‌شود؟
      </DialogTrigger>
      <DialogContent className="max-w-lg text-start">
        <DialogHeader className="text-start">
          <DialogTitle>روش محاسبه رتبه‌بندی</DialogTitle>
          <DialogDescription>
            محاسبه نهایی امتیازها روی سرور پلتفرم انجام می‌شود و آنچه در این صفحه می‌بینید فقط نمایش نتیجه است.
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
          <li>
            <span className="font-bold text-foreground">رتبه مسابقات:</span> فقط بر پایه نتایج رسمی و نهایی‌شده مسابقات
            برگزارشده در گیم‌نت‌های تأییدشده به‌دست می‌آید.
          </li>
          <li>
            <span className="font-bold text-foreground">رتبه چالش:</span> جدا از رتبه مسابقات نگهداری می‌شود و تنها از
            چالش‌های معتبر بازیکن‌به‌بازیکن تشکیل شده است.
          </li>
          <li>
            <span className="font-bold text-foreground">شرط فعال‌شدن چالش:</span> تکمیل{" "}
            <span className="font-mono-num">{formatNumber(CHALLENGE_UNLOCK_MATCHES)}</span> مسابقه نهایی‌شده با نتیجه
            معتبر. برد یا باخت در فعال‌شدن چالش تأثیری ندارد.
          </li>
          <li>
            مسابقات لغوشده، بدون نتیجه، نامعتبر یا عدم‌حضور در هیچ‌کدام از این شمارش‌ها به حساب نمی‌آیند.
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}

function PlayerPreview({ e, type }: { e: RankingEntry; type: RankingType }) {
  return (
    <Dialog>
      <DialogTrigger
        className="text-start font-bold hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label={`پیش‌نمایش ${e.gamerTag}`}
      >
        {e.gamerTag}
      </DialogTrigger>
      <DialogContent className="max-w-md text-start">
        <DialogHeader className="text-start">
          <DialogTitle>{e.gamerTag}</DialogTitle>
          <DialogDescription>
            {e.city} — بازی اصلی: {e.game}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-elevated p-3">
            <div className="text-[11px] text-muted-foreground">Tournament Rating</div>
            <div className="font-mono-num text-lg font-black text-primary">{formatNumber(e.tournamentRating)}</div>
          </div>
          <div className="rounded-xl border border-border bg-elevated p-3">
            <div className="text-[11px] text-muted-foreground">Challenge Rating</div>
            <div className="font-mono-num text-lg font-black text-secondary">
              {e.challengeEligible ? formatNumber(e.challengeRating) : "—"}
            </div>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">پنج نتیجه اخیر</span>
            <FormDots form={e.recentForm} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">استریک فعلی</span>
            <span className="font-mono-num font-bold">{formatNumber(e.streak)} برد پیاپی</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              {type === "challenge" ? "چالش‌های معتبر" : "مسابقات نهایی‌شده"}
            </span>
            <span className="font-mono-num font-bold">
              {formatNumber(type === "challenge" ? e.challengeMatches : e.finalizedMatches)}
            </span>
          </div>
        </div>
        <Link
          to="/players/$username"
          params={{ username: e.username }}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong"
        >
          مشاهده پروفایل بازیکن
        </Link>
      </DialogContent>
    </Dialog>
  );
}

const podiumStyle = [
  "border-warning/50 bg-warning/10",
  "border-muted-foreground/40 bg-surface",
  "border-[#cd7f32]/50 bg-[#cd7f32]/10",
];

export function FullRanking() {
  const [game, setGame] = useState(rankingGames[0].name);
  const [type, setType] = useState<RankingType>("tournament");
  const [region, setRegion] = useState("all");
  const [season, setSeason] = useState("current");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const rows = useMemo(() => {
    let list = getRanking(game);
    if (type === "challenge") list = list.filter((e) => e.challengeEligible);
    if (region === "karaj") list = list.filter((e) => e.city === "کرج");
    if (region === "tehran") list = list.filter((e) => e.city === "تهران");
    if (region === "other") list = list.filter((e) => e.city !== "کرج" && e.city !== "تهران");
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((e) => e.gamerTag.toLowerCase().includes(q));
    }
    if (type === "challenge") {
      list = [...list].sort((a, b) => b.challengeRating - a.challengeRating);
    }
    return list;
  }, [game, type, region, query]);

  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const paged = rows.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const top3 = rows.slice(0, 3);

  const reset = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setPage(1);
  };

  const ratingOf = (e: RankingEntry) => (type === "challenge" ? e.challengeRating : e.tournamentRating);

  return (
    <>
      {/* Filters */}
      <section className="border-b border-border bg-surface/30">
        <div className="container mx-auto space-y-5 px-4 py-8">
          <div role="tablist" aria-label="نوع رتبه‌بندی" className="flex flex-wrap gap-2">
            {rankingTypes.map((t) => (
              <Chip
                key={t.id}
                role="tab"
                aria-selected={type === t.id}
                active={type === t.id}
                onClick={() => reset(setType)(t.id)}
              >
                {t.label}
              </Chip>
            ))}
          </div>

          <div>
            <div className="mb-2 text-xs font-bold text-muted-foreground">بازی</div>
            <div role="tablist" aria-label="انتخاب بازی" className="flex flex-wrap gap-2">
              {rankingGames.map((g) => (
                <Chip
                  key={g.slug}
                  role="tab"
                  aria-selected={game === g.name}
                  active={game === g.name}
                  onClick={() => reset(setGame)(g.name)}
                >
                  {g.name}
                </Chip>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-muted-foreground">منطقه</span>
              <select
                value={region}
                onChange={(ev) => reset(setRegion)(ev.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-card px-3 text-sm focus:border-primary focus:outline-none"
              >
                {rankingRegions.map((r) => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-muted-foreground">فصل</span>
              <select
                value={season}
                onChange={(ev) => reset(setSeason)(ev.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-card px-3 text-sm focus:border-primary focus:outline-none"
              >
                {rankingSeasons.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-muted-foreground">جستجو</span>
              <span className="relative block">
                <Search className="pointer-events-none absolute inset-y-0 end-3 my-auto h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(ev) => reset(setQuery)(ev.target.value)}
                  placeholder="جستجوی Gamer Tag..."
                  className="h-11 w-full rounded-lg border border-border bg-card pe-10 ps-3 text-sm focus:border-primary focus:outline-none"
                />
              </span>
            </label>
          </div>

          {type === "challenge" && (
            <p className="rounded-xl border border-secondary/30 bg-secondary/10 p-4 text-xs leading-6 text-secondary">
              رتبه چالش کاملاً جدا از رتبه مسابقات است و فقط برای بازیکنانی نمایش داده می‌شود که{" "}
              <span className="font-mono-num">{formatNumber(CHALLENGE_UNLOCK_MATCHES)}</span> مسابقه نهایی‌شده معتبر را
              تکمیل کرده‌اند.
            </p>
          )}
        </div>
      </section>

      {/* Top 3 */}
      {top3.length > 0 && (
        <section className="container mx-auto px-4 py-10">
          <h2 className="mb-6 text-xl font-black md:text-2xl">سه بازیکن برتر</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {top3.map((e, i) => (
              <article
                key={e.playerId}
                className={`rounded-2xl border p-5 ${podiumStyle[i]} ${i === 0 ? "md:order-2 md:scale-[1.03]" : i === 1 ? "md:order-1" : "md:order-3"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border bg-background/70 font-mono-num text-base font-black">
                    {formatNumber(i + 1)}
                  </span>
                  <div className="min-w-0">
                    <Link
                      to="/players/$username"
                      params={{ username: e.username }}
                      className="flex items-center gap-1.5 truncate text-base font-black hover:text-primary"
                    >
                      {i === 0 && <Crown className="h-4 w-4 shrink-0 text-warning" aria-hidden />}
                      {e.gamerTag}
                    </Link>
                    <div className="truncate text-xs text-muted-foreground">{e.city}</div>
                  </div>
                  <span className="ms-auto shrink-0"><Trend trend={e.trend} /></span>
                </div>
                <div className="mt-4 font-mono-num text-3xl font-black text-primary">{formatNumber(ratingOf(e))}</div>
                <div className="text-[11px] text-muted-foreground">
                  {type === "challenge" ? "Challenge Rating" : "Tournament Rating"}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-background/60 py-2">
                    <div className="font-mono-num font-bold">{formatNumber(e.wins)}</div>
                    <div className="text-[11px] text-muted-foreground">برد</div>
                  </div>
                  <div className="rounded-lg bg-background/60 py-2">
                    <div className="font-mono-num font-bold">{formatNumber(e.played)}</div>
                    <div className="text-[11px] text-muted-foreground">مسابقات</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Leaderboard */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <h2 className="text-xl font-black md:text-2xl">جدول کامل</h2>
          <span className="font-mono-num text-xs text-muted-foreground">{formatNumber(rows.length)} بازیکن</span>
        </div>

        {rows.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            بازیکنی با این فیلترها پیدا نشد.
          </p>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden overflow-hidden rounded-2xl border border-border bg-card md:block">
              <table className="w-full text-sm">
                <caption className="sr-only">جدول رتبه‌بندی بازیکنان {game}</caption>
                <thead className="bg-background/60 text-xs text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-start">رتبه</th>
                    <th scope="col" className="px-4 py-3 text-start">بازیکن</th>
                    <th scope="col" className="px-4 py-3 text-start">شهر</th>
                    <th scope="col" className="px-4 py-3 text-start">
                      {type === "challenge" ? "Challenge Rating" : "Rating"}
                    </th>
                    <th scope="col" className="px-4 py-3 text-start">
                      {type === "challenge" ? "چالش معتبر" : "مسابقات"}
                    </th>
                    <th scope="col" className="px-4 py-3 text-start">برد</th>
                    <th scope="col" className="px-4 py-3 text-start">باخت</th>
                    <th scope="col" className="px-4 py-3 text-start">Win Rate</th>
                    <th scope="col" className="px-4 py-3 text-start">روند</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((e, i) => (
                    <tr key={e.playerId} className="border-t border-border/60 hover:bg-surface/50">
                      <td className="px-4 py-3 font-mono-num font-bold text-primary">
                        {formatNumber((current - 1) * PAGE_SIZE + i + 1)}
                      </td>
                      <td className="px-4 py-3"><PlayerPreview e={e} type={type} /></td>
                      <td className="px-4 py-3 text-muted-foreground">{e.city}</td>
                      <td className="px-4 py-3 font-mono-num font-bold text-secondary">{formatNumber(ratingOf(e))}</td>
                      <td className="px-4 py-3 font-mono-num text-muted-foreground">
                        {formatNumber(type === "challenge" ? e.challengeMatches : e.played)}
                      </td>
                      <td className="px-4 py-3 font-mono-num text-muted-foreground">{formatNumber(e.wins)}</td>
                      <td className="px-4 py-3 font-mono-num text-muted-foreground">{formatNumber(e.losses)}</td>
                      <td className="px-4 py-3 font-mono-num">{toPersianDigits(winRate(e))}٪</td>
                      <td className="px-4 py-3"><Trend trend={e.trend} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <ul className="grid gap-3 md:hidden">
              {paged.map((e, i) => (
                <li key={e.playerId} className="rounded-2xl border border-border bg-card p-4">
                  <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 font-mono-num text-sm font-black text-primary">
                      {formatNumber((current - 1) * PAGE_SIZE + i + 1)}
                    </span>
                    <div className="min-w-0">
                      <Link
                        to="/players/$username"
                        params={{ username: e.username }}
                        className="block truncate text-sm font-bold hover:text-primary"
                      >
                        {e.gamerTag}
                      </Link>
                      <div className="truncate text-xs text-muted-foreground">{e.city}</div>
                    </div>
                    <Trend trend={e.trend} />
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                    <div className="rounded-lg bg-background/60 py-2">
                      <div className="font-mono-num text-sm font-bold text-secondary">{formatNumber(ratingOf(e))}</div>
                      <div className="text-[10px] text-muted-foreground">Rating</div>
                    </div>
                    <div className="rounded-lg bg-background/60 py-2">
                      <div className="font-mono-num text-sm font-bold">{formatNumber(e.wins)}</div>
                      <div className="text-[10px] text-muted-foreground">برد</div>
                    </div>
                    <div className="rounded-lg bg-background/60 py-2">
                      <div className="font-mono-num text-sm font-bold">{formatNumber(e.losses)}</div>
                      <div className="text-[10px] text-muted-foreground">باخت</div>
                    </div>
                    <div className="rounded-lg bg-background/60 py-2">
                      <div className="font-mono-num text-sm font-bold">{toPersianDigits(winRate(e))}٪</div>
                      <div className="text-[10px] text-muted-foreground">Win Rate</div>
                    </div>
                  </div>
                  {type === "challenge" && (
                    <p className="mt-3 flex items-center gap-1.5 text-[11px] text-secondary">
                      <Swords className="h-3.5 w-3.5" /> {formatNumber(e.challengeMatches)} چالش معتبر
                    </p>
                  )}
                </li>
              ))}
            </ul>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav aria-label="صفحه‌بندی جدول" className="mt-6 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage(Math.max(1, current - 1))}
                  disabled={current === 1}
                  className="h-10 rounded-lg border border-border bg-card px-4 text-xs font-bold disabled:opacity-40"
                >
                  قبلی
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-current={current === i + 1 ? "page" : undefined}
                    onClick={() => setPage(i + 1)}
                    className={`h-10 w-10 rounded-lg border font-mono-num text-xs font-bold ${
                      current === i + 1
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    {formatNumber(i + 1)}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPage(Math.min(totalPages, current + 1))}
                  disabled={current === totalPages}
                  className="h-10 rounded-lg border border-border bg-card px-4 text-xs font-bold disabled:opacity-40"
                >
                  بعدی
                </button>
              </nav>
            )}
          </>
        )}
      </section>
    </>
  );
}

export { HowItWorks as RankingHowItWorks };
