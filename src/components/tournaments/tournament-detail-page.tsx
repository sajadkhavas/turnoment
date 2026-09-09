import { Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  CalendarDays,
  ChevronLeft,
  Clock3,
  Gamepad2,
  MapPin,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";
import type { TournamentDetail } from "@/lib/tournament-detail-contract";
import { formatNumber, formatPrice } from "@/lib/format";

const lifecycleCopy: Record<
  TournamentDetail["lifecycle"],
  { label: string; className: string }
> = {
  registration_open: { label: "ثبت‌نام باز", className: "border-success/30 bg-success/10 text-success" },
  filling: { label: "ظرفیت محدود", className: "border-warning/30 bg-warning/10 text-warning" },
  registration_closed: { label: "ثبت‌نام بسته", className: "border-border bg-muted text-muted-foreground" },
  upcoming: { label: "به‌زودی", className: "border-secondary/30 bg-secondary/10 text-secondary" },
  check_in: { label: "Check-in", className: "border-warning/30 bg-warning/10 text-warning" },
  in_progress: { label: "در حال برگزاری", className: "border-secondary/30 bg-secondary/10 text-secondary" },
  completed: { label: "پایان‌یافته", className: "border-border bg-muted text-muted-foreground" },
  cancelled: { label: "لغوشده", className: "border-destructive/30 bg-destructive/10 text-destructive" },
};

const registrationCopy: Record<
  TournamentDetail["registrationPolicy"]["state"],
  { title: string; description: string; cta: string }
> = {
  open: {
    title: "ثبت‌نام باز است",
    description: "ظرفیت و شرایط مسابقه را بررسی کن و ثبت‌نامت را تکمیل کن.",
    cta: "ثبت‌نام در مسابقه",
  },
  full: {
    title: "ظرفیت تکمیل شده",
    description: "در حال حاضر جای خالی برای این مسابقه وجود ندارد.",
    cta: "ظرفیت تکمیل است",
  },
  closed: {
    title: "ثبت‌نام بسته شده",
    description: "مهلت ثبت‌نام این مسابقه به پایان رسیده است.",
    cta: "ثبت‌نام بسته است",
  },
  upcoming: {
    title: "ثبت‌نام به‌زودی باز می‌شود",
    description: "زمان شروع ثبت‌نام از همین صفحه اعلام می‌شود.",
    cta: "به‌زودی",
  },
};

function formatIrrAsToman(amount: number) {
  return formatPrice(Math.round(amount / 10));
}

export function TournamentDetailPage({ tournament }: { tournament: TournamentDetail }) {
  const status = lifecycleCopy[tournament.lifecycle];
  const registration = registrationCopy[tournament.registrationPolicy.state];
  const capacityPercent = Math.min(
    100,
    Math.round((tournament.capacity.registered / tournament.capacity.limit) * 100),
  );
  const canRegister = tournament.registrationPolicy.state === "open";

  return (
    <main className="pb-28 lg:pb-0">
      <section className="relative overflow-hidden border-b border-border bg-card">
        {tournament.heroImage ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[42%] lg:block">
            <img
              src={tournament.heroImage}
              alt=""
              className="h-full w-full object-cover opacity-25 [mask-image:linear-gradient(to_right,black,transparent)]"
            />
          </div>
        ) : null}
        <div className="container relative mx-auto px-4 py-8 md:py-10">
          <nav aria-label="مسیر صفحه" className="mb-5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-primary">خانه</Link>
            <span aria-hidden="true">/</span>
            <Link to="/tournaments" className="transition-colors hover:text-primary">مسابقات</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="max-w-52 truncate text-foreground">{tournament.title}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full border px-3 py-1 text-xs font-bold ${status.className}`}>
                {status.label}
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {tournament.game.name}
              </span>
              <span className="text-xs text-muted-foreground">{tournament.game.platform}</span>
            </div>
            <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">{tournament.title}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-muted-foreground md:text-base">
              {tournament.description}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Meta icon={CalendarDays} label="تاریخ" value={tournament.schedule.displayDate} />
              <Meta icon={Clock3} label="شروع" value={tournament.schedule.displayTime} mono />
              <Meta icon={MapPin} label="محل" value={`${tournament.venue.city}، ${tournament.venue.district}`} />
              <Meta icon={Gamepad2} label="فرمت" value={tournament.formatLabel} />
            </div>
          </div>
        </div>
      </section>

      <nav
        aria-label="بخش‌های مسابقه"
        className="sticky top-[66px] z-30 border-b border-border bg-background/95 backdrop-blur"
      >
        <div className="container mx-auto flex gap-5 overflow-x-auto px-4 py-3 text-xs font-bold text-muted-foreground [scrollbar-width:none]">
          <a href="#overview" className="whitespace-nowrap hover:text-primary">اطلاعات</a>
          <a href="#rules" className="whitespace-nowrap hover:text-primary">قوانین</a>
          <a href="#participants" className="whitespace-nowrap hover:text-primary">شرکت‌کنندگان</a>
          <a href="#bracket" className="whitespace-nowrap hover:text-primary">براکت</a>
          <a href="#venue" className="whitespace-nowrap hover:text-primary">گیم‌نت میزبان</a>
        </div>
      </nav>

      <div className="container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-10">
        <div className="min-w-0 space-y-8">
          <section id="overview" aria-labelledby="overview-title" className="scroll-mt-32 rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-primary">جزئیات رقابت</p>
                <h2 id="overview-title" className="mt-1 text-xl font-black">اطلاعات مسابقه</h2>
              </div>
              <ShieldCheck className="h-7 w-7 text-secondary" aria-hidden="true" />
            </div>
            <dl className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <Detail label="نوع رقابت" value={tournament.registrationPolicy.mode === "team" ? "تیمی" : "انفرادی"} />
              <Detail label="ساختار براکت" value={tournament.bracketFormatLabel} />
              <Detail label="ظرفیت" value={`${formatNumber(tournament.capacity.limit)} نفر/تیم`} />
              <Detail label="ثبت‌شده" value={formatNumber(tournament.capacity.registered)} />
              <Detail label="جای خالی" value={formatNumber(tournament.capacity.remaining)} />
              <Detail label="Ruleset" value={`نسخه ${tournament.ruleset.version}`} />
            </dl>
          </section>

          <section id="rules" aria-labelledby="rules-title" className="scroll-mt-32 rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-primary">قانون رقابت</p>
                <h2 id="rules-title" className="mt-1 text-xl font-black">قوانین کلیدی</h2>
              </div>
              <Link to="/rules" className="text-xs font-bold text-primary hover:underline">مشاهده قوانین کامل</Link>
            </div>
            <ol className="mt-5 grid gap-3 md:grid-cols-2">
              {tournament.ruleset.rules.map((rule, index) => (
                <li key={rule.id} className="rounded-xl border border-border bg-background/50 p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 font-mono-num text-xs font-black text-primary">
                      {formatNumber(index + 1)}
                    </span>
                    <div>
                      <h3 className="text-sm font-black">{rule.title}</h3>
                      <p className="mt-1 text-xs leading-6 text-muted-foreground">{rule.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section id="participants" aria-labelledby="participants-title" className="scroll-mt-32 rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-secondary">Roster</p>
                <h2 id="participants-title" className="mt-1 text-xl font-black">شرکت‌کنندگان</h2>
              </div>
              <span className="font-mono-num text-sm font-bold text-muted-foreground">
                {formatNumber(tournament.participants.total)} ثبت‌شده
              </span>
            </div>
            {tournament.participants.preview.length ? (
              <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {tournament.participants.preview.map((participant) => (
                  <Link
                    key={participant.id}
                    to="/players/$username"
                    params={{ username: participant.gamerTag }}
                    className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-border bg-background/50 px-4 py-3 transition-colors hover:border-primary/50"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-mono-num text-sm font-black">{participant.gamerTag}</div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">ثبت‌نام تأییدشده</div>
                    </div>
                    {participant.seed ? (
                      <span className="shrink-0 rounded-md bg-primary/10 px-2 py-1 font-mono-num text-[10px] font-bold text-primary">
                        Seed {formatNumber(participant.seed)}
                      </span>
                    ) : null}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-5 rounded-xl border border-dashed border-border p-5 text-sm leading-7 text-muted-foreground">
                فهرست شرکت‌کنندگان پس از شروع ثبت‌نام در همین بخش نمایش داده می‌شود.
              </p>
            )}
          </section>

          <section id="bracket" aria-labelledby="bracket-title" className="scroll-mt-32 rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-secondary">Bracket</p>
                <h2 id="bracket-title" className="mt-1 text-xl font-black">نمای براکت</h2>
              </div>
              <span className="text-xs text-muted-foreground">{tournament.bracketPreview.formatLabel}</span>
            </div>
            {tournament.bracketPreview.rounds.length ? (
              <div className="mt-5 space-y-4">
                {tournament.bracketPreview.rounds.map((round) => (
                  <div key={round.id}>
                    <h3 className="mb-2 text-xs font-bold text-muted-foreground">{round.title}</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {round.matches.map((match) => (
                        <div key={match.id} className="rounded-xl border border-border bg-background/60 p-3">
                          <div className="mb-2 text-[10px] font-bold text-muted-foreground">{match.label}</div>
                          <BracketSide gamerTag={match.sideA?.gamerTag ?? "تعیین نشده"} seed={match.sideA?.seed ?? null} score={match.sideA?.score ?? null} />
                          <div className="my-1 border-t border-border" />
                          <BracketSide gamerTag={match.sideB?.gamerTag ?? "تعیین نشده"} seed={match.sideB?.seed ?? null} score={match.sideB?.score ?? null} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-border bg-background/40 p-5">
                <h3 className="text-sm font-black">براکت هنوز منتشر نشده است</h3>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  براکت پس از نهایی‌شدن شرکت‌کنندگان و سیدینگ مسابقه در همین بخش نمایش داده می‌شود.
                </p>
              </div>
            )}
          </section>

          <section id="venue" aria-labelledby="venue-title" className="scroll-mt-32 rounded-2xl border border-border bg-card p-5 md:p-6">
            <div className="grid gap-5 sm:grid-cols-[160px_minmax(0,1fr)]">
              <div className="overflow-hidden rounded-xl border border-border bg-muted">
                {tournament.venue.image ? (
                  <img src={tournament.venue.image} alt={`نمای ${tournament.venue.name}`} loading="lazy" className="h-36 w-full object-cover sm:h-full" />
                ) : (
                  <div className="grid h-36 place-items-center text-muted-foreground sm:h-full"><MapPin className="h-8 w-8" /></div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-primary">میزبان مسابقه</p>
                <h2 id="venue-title" className="mt-1 flex flex-wrap items-center gap-2 text-xl font-black">
                  {tournament.venue.name}
                  {tournament.venue.verified ? <BadgeCheck className="h-5 w-5 text-secondary" aria-label="گیم‌نت تأییدشده" /> : null}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{tournament.venue.city}، {tournament.venue.district}</p>
                {tournament.venue.equipment.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tournament.venue.equipment.slice(0, 4).map((item) => (
                      <span key={item} className="rounded-lg border border-border bg-background/60 px-2.5 py-1 text-[11px] text-muted-foreground">{item}</span>
                    ))}
                  </div>
                ) : null}
                <Link
                  to="/centers/$id"
                  params={{ id: tournament.venue.id }}
                  className="mt-5 inline-flex h-10 items-center gap-1 rounded-lg border border-border px-4 text-xs font-bold transition-colors hover:border-primary hover:text-primary"
                >
                  صفحه گیم‌نت <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        </div>

        <aside aria-label="ثبت‌نام مسابقه" className="hidden lg:block">
          <div className="sticky top-32 rounded-2xl border border-border bg-card p-5 shadow-xl shadow-black/10">
            <RegistrationSummary tournament={tournament} registration={registration} capacityPercent={capacityPercent} />
          </div>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <div className="container mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] text-muted-foreground">هزینه ثبت‌نام</div>
            <div className="truncate font-mono-num text-sm font-black">{formatIrrAsToman(tournament.entryFee.amount)}</div>
          </div>
          {canRegister ? (
            <Link
              to="/tournaments/$id/register"
              params={{ id: tournament.slug }}
              className="inline-flex h-12 min-w-44 items-center justify-center rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground"
            >
              {registration.cta}
            </Link>
          ) : (
            <span className="inline-flex h-12 min-w-44 items-center justify-center rounded-xl bg-muted px-5 text-sm font-black text-muted-foreground">
              {registration.cta}
            </span>
          )}
        </div>
      </div>
    </main>
  );
}

function RegistrationSummary({
  tournament,
  registration,
  capacityPercent,
}: {
  tournament: TournamentDetail;
  registration: { title: string; description: string; cta: string };
  capacityPercent: number;
}) {
  const canRegister = tournament.registrationPolicy.state === "open";
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-[11px] text-muted-foreground">هزینه ثبت‌نام</div>
          <div className="mt-1 font-mono-num text-lg font-black">{formatIrrAsToman(tournament.entryFee.amount)}</div>
        </div>
        <div>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground"><Trophy className="h-3.5 w-3.5 text-warning" />جایزه ثابت</div>
          <div className="mt-1 font-mono-num text-lg font-black text-warning">{formatIrrAsToman(tournament.fixedPrize.amount)}</div>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex justify-between text-[11px] text-muted-foreground">
          <span>ظرفیت</span>
          <span className="font-mono-num">{formatNumber(tournament.capacity.registered)} / {formatNumber(tournament.capacity.limit)}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted" aria-hidden="true">
          <div className="h-full rounded-full bg-gradient-to-l from-primary to-secondary" style={{ width: `${capacityPercent}%` }} />
        </div>
        <div className="mt-2 text-[11px] text-muted-foreground">{formatNumber(tournament.capacity.remaining)} جای خالی</div>
      </div>
      <div className="mt-5 rounded-xl border border-border bg-background/50 p-4">
        <h2 className="text-sm font-black">{registration.title}</h2>
        <p className="mt-1 text-xs leading-6 text-muted-foreground">{registration.description}</p>
      </div>
      {canRegister ? (
        <Link
          to="/tournaments/$id/register"
          params={{ id: tournament.slug }}
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-black text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          {registration.cta}
        </Link>
      ) : (
        <span className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-muted text-sm font-black text-muted-foreground">
          {registration.cta}
        </span>
      )}
    </>
  );
}

function Meta({ icon: Icon, label, value, mono = false }: { icon: typeof CalendarDays; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-background/50 p-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="h-4 w-4" aria-hidden="true" /></span>
      <div className="min-w-0">
        <div className="text-[10px] text-muted-foreground">{label}</div>
        <div className={`mt-0.5 truncate text-xs font-bold ${mono ? "font-mono-num" : ""}`}>{value}</div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/50 p-3">
      <dt className="text-[10px] text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-bold">{value}</dd>
    </div>
  );
}

function BracketSide({ gamerTag, seed, score }: { gamerTag: string; seed: number | null; score: number | null }) {
  return (
    <div className="flex items-center justify-between gap-2 py-1.5 text-xs">
      <div className="min-w-0 truncate font-mono-num font-bold">
        {seed ? <span className="ml-2 text-[10px] text-muted-foreground">#{formatNumber(seed)}</span> : null}
        {gamerTag}
      </div>
      {score !== null ? <span className="font-mono-num font-black">{formatNumber(score)}</span> : null}
    </div>
  );
}

export function TournamentDetailSkeleton() {
  return (
    <main aria-busy="true" aria-label="در حال بارگذاری مسابقه" className="container mx-auto px-4 py-10">
      <div className="h-4 w-40 animate-pulse rounded bg-muted" />
      <div className="mt-5 h-10 w-3/4 animate-pulse rounded-xl bg-muted" />
      <div className="mt-4 h-20 max-w-3xl animate-pulse rounded-xl bg-muted" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          {[1, 2, 3].map((item) => <div key={item} className="h-44 animate-pulse rounded-2xl bg-muted" />)}
        </div>
        <div className="h-80 animate-pulse rounded-2xl bg-muted" />
      </div>
    </main>
  );
}

export function TournamentDetailError({ retry }: { retry: () => void }) {
  return (
    <main className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-2xl font-black">اطلاعات مسابقه بارگذاری نشد</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">برای دریافت دوباره اطلاعات این مسابقه تلاش کن.</p>
      <button type="button" onClick={retry} className="mt-6 h-11 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground">تلاش دوباره</button>
    </main>
  );
}
