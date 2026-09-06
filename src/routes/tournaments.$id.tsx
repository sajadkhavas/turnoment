import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, CalendarDays, Clock, MapPin, Trophy, Users } from "lucide-react";
import { TournamentLayout } from "@/components/tournament/tournament-layout";
import { getTournament, gamingCenters, tournamentRules } from "@/lib/tournament-data";
import { formatNumber, formatPrice } from "@/lib/format";

export const Route = createFileRoute("/tournaments/$id")({
  loader: ({ params }) => {
    const t = getTournament(params.id);
    if (!t) throw notFound();
    return { t };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "مسابقه یافت نشد | ایران مهر افزار" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.t.title} | مسابقات ایران مهر افزار`;
    const description = `مسابقه ${loaderData.t.game} در ${loaderData.t.venue}، ${loaderData.t.city} — ${loaderData.t.date} ساعت ${loaderData.t.time}. ثبت‌نام آنلاین.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: TournamentNotFound,
  component: TournamentDetail,
});

function TournamentNotFound() {
  return (
    <TournamentLayout>
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-black">این مسابقه پیدا نشد</h1>
        <Link to="/tournaments" className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground">
          بازگشت به مسابقات
        </Link>
      </div>
    </TournamentLayout>
  );
}

function TournamentDetail() {
  const { t } = Route.useLoaderData();
  const [done, setDone] = useState(false);
  const center = gamingCenters.find((c) => c.name === t.venue);
  const pct = Math.min(100, Math.round((t.registered / t.capacity) * 100));
  const closed = t.status === "closed";

  return (
    <TournamentLayout>
      <section className="border-b border-border bg-gradient-to-l from-primary/15 to-transparent">
        <div className="container mx-auto px-4 py-10">
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">خانه</Link>
            <span>/</span>
            <Link to="/tournaments" className="hover:text-primary">مسابقات</Link>
          </nav>
          <p className="text-sm font-bold text-secondary">{t.game}</p>
          <h1 className="mt-2 text-3xl font-black md:text-4xl">{t.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" />{t.venue}{t.venueVerified && <BadgeCheck className="h-4 w-4 text-secondary" />} — {t.city}، {t.district}</span>
            <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-primary" />{t.date}</span>
            <span className="flex items-center gap-1.5 font-mono-num"><Clock className="h-4 w-4 text-primary" />{t.time}</span>
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" />{t.format}</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto grid gap-6 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-black">درباره این مسابقه</h2>
            <p className="mt-3 text-sm leading-8 text-muted-foreground">
              مسابقه {t.game} با فرمت {t.format} در {t.venue} برگزار می‌شود. ظرفیت محدود است و ثبت‌نام به‌صورت آنلاین انجام می‌شود.
              نتایج این مسابقه در امتیاز رتبه‌بندی بازیکنان ثبت خواهد شد.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Info label="فرمت" value={t.format} />
              <Info label="ظرفیت" value={`${formatNumber(t.registered)} از ${formatNumber(t.capacity)}`} />
              <Info label="داوری" value="داور رسمی گیم‌نت" />
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-lg font-black">قوانین مسابقه</h2>
            <ul className="mt-4 space-y-4">
              {tournamentRules.slice(0, 4).map((r, i) => (
                <li key={r.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/15 font-mono-num text-xs font-bold text-primary">{formatNumber(i + 1)}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-bold">{r.title}</div>
                    <p className="mt-1 text-xs leading-6 text-muted-foreground">{r.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/rules" className="mt-5 inline-flex text-xs font-bold text-primary hover:underline">مشاهده همه قوانین</Link>
          </section>

          {center && (
            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-lg font-black">گیم‌نت میزبان</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-[140px_minmax(0,1fr)]">
                <img src={center.image} alt={center.name} loading="lazy" width={480} height={360} className="h-28 w-full rounded-xl object-cover" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 font-bold">{center.name}{center.verified && <BadgeCheck className="h-4 w-4 text-secondary" />}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{center.city}، {center.district}</p>
                  <p className="mt-2 font-mono-num text-xs text-warning">امتیاز {formatNumber(center.rating)} از ۵</p>
                  <Link to="/centers/$id" params={{ id: center.id }} className="mt-3 inline-flex h-9 items-center rounded-lg border border-border bg-surface px-3 text-xs font-bold hover:border-primary hover:text-primary">
                    صفحه گیم‌نت
                  </Link>
                </div>
              </div>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="min-w-0">
                <div className="text-[11px] text-muted-foreground">هزینه ثبت‌نام</div>
                <div className="mt-1 truncate font-mono-num text-base font-black">{formatPrice(t.entryFee)}</div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground"><Trophy className="h-3.5 w-3.5 text-warning" />جایزه ثابت</div>
                <div className="mt-1 truncate font-mono-num text-base font-black text-warning">{formatPrice(t.fixedPrize)}</div>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>ظرفیت</span>
                <span className="font-mono-num">{formatNumber(t.registered)} / {formatNumber(t.capacity)}</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-to-l from-primary to-secondary" style={{ width: `${pct}%` }} />
              </div>
            </div>

            {done ? (
              <div className="mt-5 rounded-xl border border-success/40 bg-success/10 p-4 text-center text-sm text-success">
                درخواست ثبت‌نام تو ثبت شد. جزئیات حضور پیامک می‌شود.
              </div>
            ) : (
              <form
                className="mt-5 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  setDone(true);
                }}
              >
                <Field label="نام و نام خانوادگی" type="text" />
                <Field label="شماره موبایل" type="tel" />
                <Field label="نام بازیکن (Gamer Tag)" type="text" />
                <button
                  type="submit"
                  disabled={closed}
                  className="h-12 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground transition-all hover:glow-violet-strong disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
                >
                  {closed ? "ظرفیت تکمیل شده" : "ثبت‌نام در مسابقه"}
                </button>
                <p className="text-center text-[11px] text-muted-foreground">پرداخت هزینه ثبت‌نام حضوری در گیم‌نت انجام می‌شود.</p>
              </form>
            )}
          </div>
        </aside>
      </div>
    </TournamentLayout>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-background/60 p-3">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="mt-1 truncate text-sm font-bold">{value}</div>
    </div>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      <input required type={type} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
    </label>
  );
}
