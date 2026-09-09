import { Link, useRouter } from "@tanstack/react-router";
import { CheckCircle2, ChevronLeft, ShieldCheck, TicketCheck, Users } from "lucide-react";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import type {
  RegistrationActionResult,
  TournamentRegistrationContext,
} from "@/lib/tournament-detail-contract";
import { tournamentDetailRepository } from "@/lib/tournament-detail-data";
import { formatPrice } from "@/lib/format";

function formatIrrAsToman(amount: number) {
  return formatPrice(Math.round(amount / 10));
}

const unavailableCopy = {
  already_registered: {
    title: "قبلاً در این مسابقه ثبت‌نام کرده‌ای",
    description: "وضعیت ثبت‌نامت از بخش مسابقات من قابل پیگیری است.",
  },
  full: {
    title: "ظرفیت مسابقه تکمیل شده",
    description: "در حال حاضر امکان ثبت‌نام جدید برای این مسابقه وجود ندارد.",
  },
  closed: {
    title: "مهلت ثبت‌نام تمام شده",
    description: "ثبت‌نام این مسابقه بسته شده است.",
  },
  upcoming: {
    title: "ثبت‌نام هنوز شروع نشده",
    description: "زمان بازشدن ثبت‌نام در صفحه مسابقه نمایش داده می‌شود.",
  },
  ineligible: {
    title: "شرایط ثبت‌نام کامل نیست",
    description: "شرایط لازم برای حضور در این مسابقه را از قوانین و اطلاعات مسابقه بررسی کن.",
  },
} as const;

type UnavailableState = keyof typeof unavailableCopy;

function copyForAvailability(value: TournamentRegistrationContext["availability"]) {
  return value === "available" ? null : unavailableCopy[value as UnavailableState];
}

export function TournamentRegistrationPage({
  context,
  identifier,
}: {
  context: TournamentRegistrationContext;
  identifier: string;
}) {
  const router = useRouter();
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [teamId, setTeamId] = useState<string | null>(context.eligibleTeams[0]?.id ?? null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<RegistrationActionResult | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);

  const formUnavailable = context.availability !== "available";
  const unavailable = copyForAvailability(context.availability);
  const fieldErrors: Record<string, string> =
    result?.outcome === "validation_error" ? result.fields : {};
  const teamRequired = context.mode === "team";
  const canSubmit = !submitting && acceptedRules && (!teamRequired || Boolean(teamId));

  const submitLabel = useMemo(() => {
    if (submitting) return "در حال ثبت...";
    return context.tournament.entryFee.amount > 0 ? "تأیید و ادامه ثبت‌نام" : "تأیید ثبت‌نام";
  }, [context.tournament.entryFee.amount, submitting]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setResult(null);
    setRequestError(null);
    try {
      const response = await tournamentDetailRepository.register(identifier, {
        detailVersion: context.detailVersion,
        rulesVersion: context.rules.version,
        acceptedRules: true,
        teamId: teamRequired ? teamId : null,
      });
      setResult(response);
    } catch {
      setRequestError("ثبت‌نام انجام نشد. دوباره تلاش کن یا وضعیت ورودت را بررسی کن.");
    } finally {
      setSubmitting(false);
    }
  };

  if (result?.outcome === "confirmed") {
    return (
      <RegistrationShell context={context}>
        <div role="status" className="rounded-2xl border border-success/30 bg-success/10 p-6 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-success/15 text-success">
            <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-2xl font-black">ثبت‌نام تأیید شد</h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
            ثبت‌نام تو برای {context.tournament.title} با موفقیت تأیید شد. وضعیت مسابقه و اقدام بعدی را از داشبورد دنبال کن.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link to="/dashboard/tournaments" className="inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground">
              مسابقات من
            </Link>
            <Link to="/tournaments/$id" params={{ id: context.tournament.slug }} className="inline-flex h-11 items-center rounded-xl border border-border px-5 text-sm font-bold">
              صفحه مسابقه
            </Link>
          </div>
        </div>
      </RegistrationShell>
    );
  }

  if (result?.outcome === "payment_required") {
    return (
      <RegistrationShell context={context}>
        <div role="status" className="rounded-2xl border border-primary/30 bg-primary/10 p-6 text-center">
          <TicketCheck className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-black">یک مرحله تا تکمیل ثبت‌نام</h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
            ظرفیت برای ثبت‌نام تو رزرو شده است. برای نهایی‌شدن ثبت‌نام، پرداخت را ادامه بده.
          </p>
          <a href={result.paymentUrl} className="mt-5 inline-flex h-12 items-center rounded-xl bg-primary px-6 text-sm font-black text-primary-foreground">
            ادامه پرداخت
          </a>
        </div>
      </RegistrationShell>
    );
  }

  if (formUnavailable || result?.outcome === "already_registered" || result?.outcome === "unavailable") {
    const state = result?.outcome === "unavailable"
      ? unavailableCopy[result.reason]
      : result?.outcome === "already_registered"
        ? unavailableCopy.already_registered
        : unavailable;
    return (
      <RegistrationShell context={context}>
        <div role="status" className="rounded-2xl border border-border bg-card p-6 text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-black">{state?.title}</h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">{state?.description}</p>
          <Link
            to="/tournaments/$id"
            params={{ id: context.tournament.slug }}
            className="mt-5 inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground"
          >
            بازگشت به مسابقه
          </Link>
        </div>
      </RegistrationShell>
    );
  }

  return (
    <RegistrationShell context={context}>
      <form onSubmit={submit} className="space-y-5" noValidate>
        <section aria-labelledby="player-title" className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-primary">بازیکن</p>
              <h2 id="player-title" className="mt-1 text-lg font-black">هویت ثبت‌نام</h2>
            </div>
            <span className="font-mono-num text-sm font-black">{context.player.gamerTag}</span>
          </div>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">
            این ثبت‌نام برای حساب بازیکن فعلی ثبت می‌شود.
          </p>
        </section>

        {teamRequired ? (
          <section aria-labelledby="team-title" className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-secondary" aria-hidden="true" />
              <h2 id="team-title" className="text-lg font-black">تیم شرکت‌کننده</h2>
            </div>
            {context.eligibleTeams.length ? (
              <div className="mt-4 space-y-2">
                {context.eligibleTeams.map((team) => (
                  <label key={team.id} className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border bg-background/50 p-4 has-[:checked]:border-primary">
                    <span>
                      <span className="block text-sm font-black">{team.name}</span>
                      <span className="mt-1 block text-[11px] text-muted-foreground">{team.memberCount} عضو</span>
                    </span>
                    <input
                      type="radio"
                      name="team"
                      value={team.id}
                      checked={teamId === team.id}
                      onChange={() => setTeamId(team.id)}
                      className="h-5 w-5 accent-primary"
                    />
                  </label>
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-xl border border-dashed border-border p-4 text-sm leading-7 text-muted-foreground">
                تیم واجد شرایطی برای این مسابقه در حساب تو ثبت نشده است.
              </p>
            )}
            {fieldErrors.teamId ? <p className="mt-2 text-xs text-destructive">{fieldErrors.teamId}</p> : null}
          </section>
        ) : null}

        <section aria-labelledby="rules-title" className="rounded-2xl border border-border bg-card p-5">
          <h2 id="rules-title" className="text-lg font-black">تأیید قوانین</h2>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">{context.rules.summary}</p>
          <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
            <input
              type="checkbox"
              checked={acceptedRules}
              onChange={(event) => setAcceptedRules(event.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-primary"
            />
            <span className="text-sm leading-7">
              قوانین مسابقه و Ruleset نسخه {context.rules.version} را خوانده‌ام و می‌پذیرم.
              <Link to="/rules" className="mr-1 font-bold text-primary hover:underline">مشاهده قوانین</Link>
            </span>
          </label>
        </section>

        <div aria-live="polite" aria-atomic="true">
          {result?.outcome === "stale" ? (
            <div role="status" className="rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm leading-7 text-warning">
              وضعیت مسابقه تغییر کرده است. اطلاعات را تازه کن و دوباره ادامه بده.
              <button type="button" onClick={() => void router.invalidate()} className="mr-2 font-black underline">تازه‌سازی</button>
            </div>
          ) : null}
          {fieldErrors.form ? <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{fieldErrors.form}</div> : null}
          {requestError ? <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{requestError}</div> : null}
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          aria-busy={submitting}
          className="h-12 w-full rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitLabel}
        </button>
      </form>
    </RegistrationShell>
  );
}

function RegistrationShell({ context, children }: { context: TournamentRegistrationContext; children: ReactNode }) {
  return (
    <main className="container mx-auto px-4 py-8 md:py-10">
      <nav aria-label="مسیر صفحه" className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Link to="/tournaments" className="hover:text-primary">مسابقات</Link>
        <span aria-hidden="true">/</span>
        <Link to="/tournaments/$id" params={{ id: context.tournament.slug }} className="max-w-52 truncate hover:text-primary">{context.tournament.title}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">ثبت‌نام</span>
      </nav>

      <div className="mx-auto mt-6 grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="min-w-0">
          <div className="mb-6">
            <p className="text-sm font-bold text-primary">ثبت‌نام مسابقه</p>
            <h1 className="mt-1 text-3xl font-black">{context.tournament.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{context.tournament.game} · {context.tournament.displayDate} · {context.tournament.displayTime}</p>
          </div>
          {children}
        </div>

        <aside aria-label="خلاصه ثبت‌نام" className="rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24">
          <h2 className="text-sm font-black">خلاصه مسابقه</h2>
          <dl className="mt-4 space-y-3 text-xs">
            <SummaryRow label="گیم‌نت" value={context.tournament.venue} />
            <SummaryRow label="هزینه ثبت‌نام" value={formatIrrAsToman(context.tournament.entryFee.amount)} />
            <SummaryRow label="جایزه ثابت" value={formatIrrAsToman(context.tournament.fixedPrize.amount)} warning />
            <SummaryRow label="نوع ثبت‌نام" value={context.mode === "team" ? "تیمی" : "انفرادی"} />
          </dl>
          <Link to="/tournaments/$id" params={{ id: context.tournament.slug }} className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
            جزئیات مسابقه <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </main>
  );
}

function SummaryRow({ label, value, warning = false }: { label: string; value: string; warning?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={`text-left font-bold ${warning ? "text-warning" : ""}`}>{value}</dd>
    </div>
  );
}

export function TournamentRegistrationSkeleton() {
  return (
    <main aria-busy="true" aria-label="در حال بارگذاری ثبت‌نام" className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="h-9 w-2/3 animate-pulse rounded-xl bg-muted" />
        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">{[1, 2, 3].map((item) => <div key={item} className="h-40 animate-pulse rounded-2xl bg-muted" />)}</div>
          <div className="h-72 animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>
    </main>
  );
}
