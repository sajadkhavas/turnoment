import { Link, useRouter } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Gamepad2,
  MapPin,
  RefreshCw,
  ShieldCheck,
  Swords,
} from "lucide-react";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type ResultSubmissionPageData,
  type SubmitResultAction,
  validateScoreDraft,
} from "@/lib/result-submission-contract";
import { resultSubmissionRepository } from "@/lib/result-submission-repository";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function createIdempotencyKey() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `result-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const unavailableCopy = {
  "not-reportable": {
    title: "امکان ثبت نتیجه وجود ندارد",
    description: "وضعیت فعلی این Match اجازه ثبت نتیجه جدید را نمی‌دهد.",
  },
  disputed: {
    title: "نتیجه در حال بررسی است",
    description: "تا پایان بررسی وضعیت نتیجه، ارسال نتیجه جدید برای این Match غیرفعال است.",
  },
  finalized: {
    title: "نتیجه نهایی شده است",
    description: "نتیجه این Match قبلاً نهایی شده و قابل ثبت دوباره نیست.",
  },
  cancelled: {
    title: "این Match قابل نتیجه‌دهی نیست",
    description: "برای Match لغوشده نتیجه جدید ثبت نمی‌شود.",
  },
} as const;

export function ResultSubmissionPage({ context }: { context: ResultSubmissionPageData }) {
  const router = useRouter();
  const [playerScoreText, setPlayerScoreText] = useState("");
  const [opponentScoreText, setOpponentScoreText] = useState("");
  const [reviewing, setReviewing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [attemptKey, setAttemptKey] = useState<string | null>(null);
  const [result, setResult] = useState<SubmitResultAction | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const playerScore = Number(playerScoreText);
  const opponentScore = Number(opponentScoreText);

  const effectiveState = useMemo(() => {
    if (result?.outcome === "accepted") return result.status;
    if (result?.outcome === "already_submitted") return result.status;
    return context.submissionState;
  }, [context.submissionState, result]);

  const reportedScore =
    result?.outcome === "accepted" || result?.outcome === "already_submitted"
      ? result.reportedScore
      : context.reportedScore;

  const finalResult =
    result?.outcome === "accepted" || result?.outcome === "already_submitted"
      ? result.finalResult
      : context.finalResult;

  const backendFieldErrors =
    result?.outcome === "validation_error" ? result.fields : {};
  const fieldErrors = { ...backendFieldErrors, ...localErrors };

  const editScore = (setter: (value: string) => void, value: string) => {
    setter(value);
    setReviewing(false);
    setAttemptKey(null);
    setResult(null);
    setRequestError(null);
    setLocalErrors({});
  };

  const review = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting || context.submissionState !== "reportable") return;

    const errors: Record<string, string> = {};
    if (playerScoreText.trim() === "") errors.playerScore = "امتیاز خودت را وارد کن.";
    if (opponentScoreText.trim() === "") errors.opponentScore = "امتیاز حریف را وارد کن.";

    if (!errors.playerScore && !errors.opponentScore) {
      Object.assign(errors, validateScoreDraft(context, playerScore, opponentScore));
    }

    if (Object.keys(errors).length) {
      setLocalErrors(errors);
      setReviewing(false);
      return;
    }

    setLocalErrors({});
    setAttemptKey((current) => current ?? createIdempotencyKey());
    setReviewing(true);
  };

  const submit = async () => {
    if (!reviewing || submitting || context.submissionState !== "reportable") return;
    const key = attemptKey ?? createIdempotencyKey();
    setAttemptKey(key);
    setSubmitting(true);
    setRequestError(null);
    setResult(null);

    try {
      const response = await resultSubmissionRepository.submitResult(context.matchId, {
        revision: context.revision,
        playerScore,
        opponentScore,
        idempotencyKey: key,
      });
      setResult(response);
      if (response.outcome !== "validation_error") setReviewing(false);
    } catch {
      setRequestError(
        "وضعیت ثبت نتیجه مشخص نشد. بدون تغییر امتیازها دوباره تلاش کن تا همان درخواست با شناسه قبلی بررسی شود.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ResultSubmissionShell context={context}>
      <div className="space-y-5">
        {effectiveState === "reportable" ? (
          <form onSubmit={review} noValidate className="space-y-5">
            <section aria-labelledby="score-title" className="rounded-2xl border border-border bg-card p-5 md:p-6">
              <div>
                <p className="text-xs font-bold text-primary">نتیجه بازی</p>
                <h2 id="score-title" className="mt-1 text-xl font-black">امتیاز نهایی Match را وارد کن</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  فقط امتیازی را ثبت کن که بازی با آن تمام شده است. نتیجه نهایی و تغییر امتیاز رقابتی بعد از بررسی وضعیت Match مشخص می‌شود.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
                <ScoreField
                  id="player-score"
                  label={context.player.displayTag}
                  value={playerScoreText}
                  error={fieldErrors.playerScore}
                  onChange={(value) => editScore(setPlayerScoreText, value)}
                  disabled={submitting}
                />
                <div className="hidden pb-3 text-center text-xs font-black text-muted-foreground sm:block" aria-hidden="true">VS</div>
                <ScoreField
                  id="opponent-score"
                  label={context.opponent.displayTag}
                  value={opponentScoreText}
                  error={fieldErrors.opponentScore}
                  onChange={(value) => editScore(setOpponentScoreText, value)}
                  disabled={submitting}
                />
              </div>

              <p className="mt-4 text-xs leading-6 text-muted-foreground">
                حداقل امتیاز {context.scorePolicy.minScore}
                {context.scorePolicy.maxScore !== null ? ` و حداکثر ${context.scorePolicy.maxScore}` : ""} است.
                {context.scorePolicy.allowDraw ? " نتیجه مساوی مجاز است." : " نتیجه مساوی برای این Match مجاز نیست."}
              </p>

              {fieldErrors.form ? (
                <div role="alert" className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm leading-7 text-destructive">
                  {fieldErrors.form}
                </div>
              ) : null}
            </section>

            {reviewing ? (
              <section aria-labelledby="review-title" className="rounded-2xl border border-primary/30 bg-primary/5 p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <div>
                    <h2 id="review-title" className="text-lg font-black">قبل از ارسال یک بار بررسی کن</h2>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      این مرحله فقط امتیاز گزارش‌شده را ارسال می‌کند؛ تأیید یا نهایی‌شدن نتیجه به وضعیت رسمی Match بستگی دارد.
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <ReviewScore label={context.player.displayTag} value={playerScore} />
                  <ReviewScore label={context.opponent.displayTag} value={opponentScore} />
                </div>
                <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <Button type="button" variant="outline" onClick={() => setReviewing(false)} disabled={submitting}>
                    اصلاح امتیازها
                  </Button>
                  <Button type="button" onClick={() => void submit()} disabled={submitting} aria-busy={submitting}>
                    {submitting ? "در حال ارسال نتیجه..." : "ارسال نتیجه"}
                  </Button>
                </div>
              </section>
            ) : (
              <Button type="submit" className="h-12 w-full rounded-xl text-sm font-black" disabled={submitting}>
                بررسی نتیجه قبل از ارسال
              </Button>
            )}
          </form>
        ) : null}

        {effectiveState === "awaiting-confirmation" && reportedScore ? (
          <StateCard
            icon={<Clock3 className="h-7 w-7" aria-hidden="true" />}
            title="نتیجه ثبت شده و منتظر ادامه فرایند است"
            description="امتیاز گزارش‌شده ثبت شده است. وضعیت نهایی Match بعد از طی‌شدن فرایند تأیید مشخص می‌شود."
          >
            <ScoreReceipt context={context} playerScore={reportedScore.playerScore} opponentScore={reportedScore.opponentScore} />
          </StateCard>
        ) : null}

        {effectiveState === "finalized" && finalResult ? (
          <StateCard
            success
            icon={<CheckCircle2 className="h-7 w-7" aria-hidden="true" />}
            title="نتیجه Match نهایی شده است"
            description="این امتیاز از وضعیت نهایی Match نمایش داده می‌شود."
          >
            <ScoreReceipt context={context} playerScore={finalResult.playerScore} opponentScore={finalResult.opponentScore} />
            <div className="mt-4 rounded-xl border border-border bg-background/50 p-4 text-sm">
              <span className="text-muted-foreground">تغییر امتیاز رقابتی: </span>
              <strong className="font-mono-num">
                {finalResult.ratingDelta === null ? "—" : `${finalResult.ratingDelta > 0 ? "+" : ""}${finalResult.ratingDelta}`}
              </strong>
            </div>
          </StateCard>
        ) : null}

        {effectiveState === "disputed" ? (
          <StateCard
            warning
            icon={<AlertTriangle className="h-7 w-7" aria-hidden="true" />}
            title="نتیجه این Match در حال بررسی است"
            description="در وضعیت فعلی امکان ثبت نتیجه جدید وجود ندارد. وضعیت بررسی را از Matchهای من دنبال کن."
          />
        ) : null}

        {effectiveState === "unavailable" ? (
          <StateCard
            icon={<ShieldCheck className="h-7 w-7" aria-hidden="true" />}
            title="ثبت نتیجه برای این Match در دسترس نیست"
            description="وضعیت فعلی Match اجازه ارسال نتیجه جدید را نمی‌دهد."
          />
        ) : null}

        {result?.outcome === "unavailable" ? (
          <StateCard
            warning
            icon={<AlertTriangle className="h-7 w-7" aria-hidden="true" />}
            title={unavailableCopy[result.reason].title}
            description={unavailableCopy[result.reason].description}
          />
        ) : null}

        {result?.outcome === "stale" ? (
          <div role="status" className="rounded-2xl border border-warning/30 bg-warning/10 p-5 text-sm leading-7">
            وضعیت Match هنگام ارسال تغییر کرده است. اطلاعات صفحه را تازه کن و بر اساس وضعیت جدید ادامه بده.
            <Button type="button" variant="outline" className="mt-4 w-full sm:w-auto" onClick={() => void router.invalidate()}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              تازه‌سازی وضعیت
            </Button>
          </div>
        ) : null}

        {requestError ? (
          <div role="alert" className="rounded-2xl border border-destructive/30 bg-destructive/10 p-5 text-sm leading-7 text-destructive">
            {requestError}
          </div>
        ) : null}

        <Link
          to="/dashboard/matches"
          className="inline-flex h-11 items-center gap-1 rounded-xl border border-border px-5 text-sm font-bold hover:border-primary/40 hover:text-primary"
        >
          بازگشت به Matchهای من
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </ResultSubmissionShell>
  );
}

function ResultSubmissionShell({ context, children }: { context: ResultSubmissionPageData; children: ReactNode }) {
  return (
    <main className="container mx-auto px-4 py-8 md:py-10">
      <nav aria-label="مسیر صفحه" className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Link to="/dashboard/matches" className="hover:text-primary">Matchهای من</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">ثبت نتیجه</span>
      </nav>

      <div className="mx-auto mt-6 grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="min-w-0">
          <div className="mb-6">
            <p className="text-sm font-bold text-primary">Result Submission</p>
            <h1 className="mt-1 text-3xl font-black">ثبت نتیجه Match</h1>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {context.game.name} · {context.competition.title}
              {context.competition.roundLabel ? ` · ${context.competition.roundLabel}` : ""}
            </p>
          </div>
          {children}
        </div>

        <aside aria-label="خلاصه Match" className="rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24">
          <div className="flex items-center gap-2 text-primary">
            <Swords className="h-5 w-5" aria-hidden="true" />
            <h2 className="text-sm font-black">خلاصه Match</h2>
          </div>
          <dl className="mt-5 space-y-4 text-xs">
            <SummaryRow icon={<Gamepad2 className="h-4 w-4" />} label="بازی" value={context.game.name} />
            <SummaryRow icon={<Swords className="h-4 w-4" />} label="حریف" value={context.opponent.displayTag} />
            <SummaryRow icon={<Clock3 className="h-4 w-4" />} label="زمان" value={formatDateTime(context.startsAt)} />
            {context.venue ? <SummaryRow icon={<MapPin className="h-4 w-4" />} label="محل" value={`${context.venue.name}، ${context.venue.city}`} /> : null}
            <SummaryRow icon={<ShieldCheck className="h-4 w-4" />} label="فرمت" value={context.formatLabel} />
          </dl>
        </aside>
      </div>
    </main>
  );
}

function ScoreField({
  id,
  label,
  value,
  error,
  onChange,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <Label htmlFor={id} className="mb-2 block text-sm font-black">{label}</Label>
      <Input
        id={id}
        type="number"
        min={0}
        step={1}
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="h-14 rounded-xl text-center font-mono-num text-2xl font-black"
      />
      {error ? <p id={errorId} role="alert" className="mt-2 text-xs leading-6 text-destructive">{error}</p> : null}
    </div>
  );
}

function ReviewScore({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-4 text-center">
      <p className="truncate text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 font-mono-num text-3xl font-black">{value}</p>
    </div>
  );
}

function ScoreReceipt({
  context,
  playerScore,
  opponentScore,
}: {
  context: ResultSubmissionPageData;
  playerScore: number;
  opponentScore: number;
}) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <ReviewScore label={context.player.displayTag} value={playerScore} />
      <ReviewScore label={context.opponent.displayTag} value={opponentScore} />
    </div>
  );
}

function StateCard({
  icon,
  title,
  description,
  children,
  success = false,
  warning = false,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
  success?: boolean;
  warning?: boolean;
}) {
  return (
    <section
      role="status"
      className={`rounded-2xl border p-6 ${
        success
          ? "border-success/30 bg-success/10"
          : warning
            ? "border-warning/30 bg-warning/10"
            : "border-border bg-card"
      }`}
    >
      <div className={success ? "text-success" : warning ? "text-warning" : "text-primary"}>{icon}</div>
      <h2 className="mt-4 text-xl font-black">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>
      {children}
    </section>
  );
}

function SummaryRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-muted-foreground" aria-hidden="true">{icon}</span>
      <div className="min-w-0">
        <dt className="text-muted-foreground">{label}</dt>
        <dd className="mt-1 break-words font-bold text-foreground">{value}</dd>
      </div>
    </div>
  );
}
