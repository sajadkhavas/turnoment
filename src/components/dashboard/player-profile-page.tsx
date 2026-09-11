import { useState, type FormEvent } from "react";
import {
  AtSign,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Loader2,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import type { AuthenticatedPlayer } from "@/lib/login-auth-contract";
import {
  playerToProfileDraft,
  validatePlayerProfileDraft,
  type PlayerProfileDraft,
  type PlayerProfileFieldErrors,
  type PlayerProfileRepository,
} from "@/lib/player-profile-contract";
import { toPersianDigits } from "@/lib/format";

type Notice = { tone: "success" | "error"; text: string } | null;

function formatPhone(phone: string) {
  const match = /^\+98(9\d{9})$/.exec(phone);
  if (!match) return phone;
  const local = `0${match[1]}`;
  return `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7)}`;
}

function formatJoinedAt(value: string) {
  try {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", { dateStyle: "medium" }).format(new Date(value));
  } catch {
    return value;
  }
}

function initials(player: AuthenticatedPlayer) {
  const source = player.profile.display_name.trim() || player.profile.gamer_tag?.trim() || "بازیکن";
  return Array.from(source).slice(0, 2).join("").toUpperCase();
}

function sameDraft(a: PlayerProfileDraft, b: PlayerProfileDraft) {
  return (
    a.gamerTag === b.gamerTag &&
    a.displayName === b.displayName &&
    a.city === b.city &&
    a.bio === b.bio &&
    a.interviewOptIn === b.interviewOptIn
  );
}

function FieldMessage({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[11px] font-bold leading-5 text-destructive" role="alert">
      <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}

const inputClass =
  "mt-2 min-h-11 w-full rounded-xl border border-border bg-elevated px-3.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60";

export function PlayerProfilePage({
  initialPlayer,
  repository,
  onSessionExpired,
}: {
  initialPlayer: AuthenticatedPlayer;
  repository: PlayerProfileRepository;
  onSessionExpired: () => void;
}) {
  const initialDraft = playerToProfileDraft(initialPlayer);
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer);
  const [baseline, setBaseline] = useState(initialDraft);
  const [draft, setDraft] = useState(initialDraft);
  const [fieldErrors, setFieldErrors] = useState<PlayerProfileFieldErrors>({});
  const [notice, setNotice] = useState<Notice>(null);
  const [saving, setSaving] = useState(false);
  const dirty = !sameDraft(draft, baseline);

  const setField = <K extends keyof PlayerProfileDraft>(key: K, value: PlayerProfileDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
    setNotice(null);
  };

  const reset = () => {
    setDraft(baseline);
    setFieldErrors({});
    setNotice(null);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving || !dirty) return;

    const validation = validatePlayerProfileDraft(draft);
    if (!validation.valid) {
      setFieldErrors(validation.fieldErrors);
      setNotice({ tone: "error", text: "موارد مشخص‌شده را اصلاح کن و دوباره ذخیره بزن." });
      return;
    }

    setSaving(true);
    setFieldErrors({});
    setNotice(null);

    try {
      const result = await repository.updateProfile(validation.command);
      if (result.outcome === "saved") {
        const nextPlayer = { ...currentPlayer, profile: result.profile };
        const nextDraft = playerToProfileDraft(nextPlayer);
        setCurrentPlayer(nextPlayer);
        setDraft(nextDraft);
        setBaseline(nextDraft);
        setNotice({ tone: "success", text: "تغییرات پروفایل ذخیره شد." });
        return;
      }

      if (result.outcome === "session_expired") {
        setNotice({ tone: "error", text: result.message });
        onSessionExpired();
        return;
      }

      setFieldErrors(result.fieldErrors);
      setNotice({ tone: "error", text: result.message });
    } catch {
      setNotice({ tone: "error", text: "ذخیره تغییرات انجام نشد. دوباره تلاش کن." });
    } finally {
      setSaving(false);
    }
  };

  const displayName =
    currentPlayer.profile.display_name.trim() || currentPlayer.profile.gamer_tag?.trim() || "بازیکن تورنومنت";

  return (
    <div className="space-y-5 pb-8">
      <header className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/12 via-card to-card p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-lg font-black text-primary shadow-sm sm:h-20 sm:w-20 sm:text-xl"
              aria-hidden="true"
            >
              {initials(currentPlayer)}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-black text-primary">حساب بازیکن</p>
              <h1 className="mt-1 truncate text-2xl font-black sm:text-3xl">پروفایل بازیکن</h1>
              <p className="mt-2 max-w-2xl text-xs leading-6 text-muted-foreground sm:text-sm">
                اطلاعاتی را که در تجربه رقابتی و معرفی بازیکن استفاده می‌شود از همین صفحه مدیریت کن.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-success/25 bg-success/10 px-3 py-2 text-[11px] font-black text-success sm:self-auto">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            حساب فعال
          </div>
        </div>
      </header>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]">
        <section aria-labelledby="profile-edit-title" className="rounded-3xl border border-border bg-card p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary" aria-hidden="true">
              <UserRound className="h-5 w-5" />
            </div>
            <div>
              <h2 id="profile-edit-title" className="text-base font-black sm:text-lg">اطلاعات قابل ویرایش</h2>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">
                این اطلاعات را هر زمان لازم باشد می‌توانی به‌روزرسانی کنی. همه فیلدها اختیاری‌اند.
              </p>
            </div>
          </div>

          {notice ? (
            <div
              className={`mt-5 flex items-start gap-2.5 rounded-xl border p-3.5 text-xs font-bold leading-6 ${
                notice.tone === "success"
                  ? "border-success/30 bg-success/10 text-success"
                  : "border-destructive/30 bg-destructive/10 text-destructive"
              }`}
              role={notice.tone === "error" ? "alert" : "status"}
              aria-live="polite"
            >
              {notice.tone === "success" ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              <span>{notice.text}</span>
            </div>
          ) : null}

          <form className="mt-6 space-y-5" onSubmit={submit} noValidate>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="profile-display-name" className="text-xs font-black">نام نمایشی</label>
                <p id="profile-display-name-help" className="mt-1 text-[11px] leading-5 text-muted-foreground">
                  نامی که برای معرفی تو در بخش‌های بازیکن نمایش داده می‌شود.
                </p>
                <input
                  id="profile-display-name"
                  value={draft.displayName}
                  onChange={(event) => setField("displayName", event.target.value)}
                  maxLength={80}
                  autoComplete="nickname"
                  aria-describedby={`profile-display-name-help${fieldErrors.displayName ? " profile-display-name-error" : ""}`}
                  aria-invalid={Boolean(fieldErrors.displayName)}
                  className={inputClass}
                  placeholder="مثلاً سجاد"
                />
                <FieldMessage id="profile-display-name-error" message={fieldErrors.displayName} />
              </div>

              <div>
                <label htmlFor="profile-gamer-tag" className="text-xs font-black">شناسه بازیکن</label>
                <p id="profile-gamer-tag-help" className="mt-1 text-[11px] leading-5 text-muted-foreground">
                  ۳ تا ۲۴ کاراکتر؛ حروف لاتین، عدد، نقطه، خط تیره یا زیرخط.
                </p>
                <div className="relative">
                  <AtSign className="pointer-events-none absolute left-3.5 top-[1.15rem] h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <input
                    id="profile-gamer-tag"
                    value={draft.gamerTag}
                    onChange={(event) => setField("gamerTag", event.target.value)}
                    maxLength={24}
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    dir="ltr"
                    aria-describedby={`profile-gamer-tag-help${fieldErrors.gamerTag ? " profile-gamer-tag-error" : ""}`}
                    aria-invalid={Boolean(fieldErrors.gamerTag)}
                    className={`${inputClass} pl-9 text-left font-mono-num`}
                    placeholder="sajadx"
                  />
                </div>
                <FieldMessage id="profile-gamer-tag-error" message={fieldErrors.gamerTag} />
              </div>

              <div>
                <label htmlFor="profile-city" className="text-xs font-black">شهر</label>
                <p id="profile-city-help" className="mt-1 text-[11px] leading-5 text-muted-foreground">
                  شهری که می‌خواهی در پروفایل بازیکن نمایش داده شود.
                </p>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3.5 top-[1.15rem] h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <input
                    id="profile-city"
                    value={draft.city}
                    onChange={(event) => setField("city", event.target.value)}
                    maxLength={80}
                    autoComplete="address-level2"
                    aria-describedby={`profile-city-help${fieldErrors.city ? " profile-city-error" : ""}`}
                    aria-invalid={Boolean(fieldErrors.city)}
                    className={`${inputClass} pl-9`}
                    placeholder="مثلاً کرج"
                  />
                </div>
                <FieldMessage id="profile-city-error" message={fieldErrors.city} />
              </div>

              <div className="rounded-2xl border border-border bg-elevated/60 p-4 md:self-end">
                <label htmlFor="profile-interview" className="flex cursor-pointer items-start gap-3">
                  <input
                    id="profile-interview"
                    type="checkbox"
                    checked={draft.interviewOptIn}
                    onChange={(event) => setField("interviewOptIn", event.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-primary"
                  />
                  <span>
                    <span className="block text-xs font-black">ارتباط برای گفت‌وگو و معرفی بازیکنان</span>
                    <span className="mt-1 block text-[11px] leading-5 text-muted-foreground">
                      با فعال‌کردن این گزینه، اجازه می‌دهی برای گفت‌وگوها و معرفی بازیکنان با تو در ارتباط باشیم.
                    </span>
                  </span>
                </label>
                <FieldMessage id="profile-interview-error" message={fieldErrors.interviewOptIn} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="profile-bio" className="text-xs font-black">معرفی کوتاه</label>
                <span className="font-mono-num text-[10px] text-muted-foreground" aria-hidden="true">
                  {toPersianDigits(draft.bio.length)} / {toPersianDigits(280)}
                </span>
              </div>
              <p id="profile-bio-help" className="mt-1 text-[11px] leading-5 text-muted-foreground">
                چند جمله کوتاه درباره سبک بازی، تجربه رقابتی یا علایق گیمینگ خودت بنویس.
              </p>
              <textarea
                id="profile-bio"
                value={draft.bio}
                onChange={(event) => setField("bio", event.target.value)}
                maxLength={280}
                rows={5}
                aria-describedby={`profile-bio-help${fieldErrors.bio ? " profile-bio-error" : ""}`}
                aria-invalid={Boolean(fieldErrors.bio)}
                className={`${inputClass} resize-y py-3 leading-7`}
                placeholder="مثلاً بازیکن رقابتی EA FC و علاقه‌مند به تورنومنت‌های حضوری..."
              />
              <FieldMessage id="profile-bio-error" message={fieldErrors.bio} />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={reset}
                disabled={!dirty || saving}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-border bg-elevated px-4 text-xs font-black transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-45"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                بازگردانی تغییرات
              </button>
              <button
                type="submit"
                disabled={!dirty || saving}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-xs font-black text-primary-foreground transition hover:glow-violet-strong disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
                {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-5">
          <section aria-labelledby="account-identity-title" className="rounded-3xl border border-border bg-card p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-secondary/10 p-2.5 text-secondary" aria-hidden="true">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 id="account-identity-title" className="text-sm font-black">اطلاعات حساب</h2>
                <p className="mt-1 text-[11px] text-muted-foreground">اطلاعات هویتی و ورود این حساب</p>
              </div>
            </div>

            <dl className="mt-5 space-y-4">
              <div className="rounded-xl border border-border bg-elevated/60 p-3.5">
                <dt className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" /> شماره ورود حساب
                </dt>
                <dd className="mt-2 font-mono-num text-sm font-black" dir="ltr">{formatPhone(currentPlayer.phone)}</dd>
              </div>

              <div className="rounded-xl border border-border bg-elevated/60 p-3.5">
                <dt className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" /> ایمیل حساب
                </dt>
                <dd className="mt-2 break-all text-sm font-black" dir={currentPlayer.email ? "ltr" : undefined}>
                  {currentPlayer.email || "ثبت نشده"}
                </dd>
              </div>

              <div className="rounded-xl border border-border bg-elevated/60 p-3.5">
                <dt className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> عضویت از
                </dt>
                <dd className="mt-2 text-sm font-black">{formatJoinedAt(currentPlayer.date_joined)}</dd>
              </div>
            </dl>

            <div className="mt-4 rounded-xl border border-primary/20 bg-primary/8 p-3 text-[11px] leading-6 text-muted-foreground">
              شماره موبایل، ایمیل و اطلاعات ورود از این صفحه تغییر نمی‌کنند. این بخش فقط وضعیت فعلی حساب را نشان می‌دهد.
            </div>
          </section>

          <section aria-labelledby="profile-preview-title" className="rounded-3xl border border-border bg-card p-5 sm:p-6">
            <h2 id="profile-preview-title" className="text-sm font-black">نمای فعلی پروفایل</h2>
            <div className="mt-4 rounded-2xl border border-border bg-elevated/60 p-4">
              <p className="truncate text-base font-black">{displayName}</p>
              <p className="mt-1 truncate font-mono-num text-xs font-bold text-primary" dir="ltr">
                {currentPlayer.profile.gamer_tag ? `@${currentPlayer.profile.gamer_tag}` : "شناسه بازیکن ثبت نشده"}
              </p>
              {currentPlayer.profile.city ? (
                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {currentPlayer.profile.city}
                </p>
              ) : null}
              {currentPlayer.profile.bio ? (
                <p className="mt-3 text-xs leading-6 text-muted-foreground">{currentPlayer.profile.bio}</p>
              ) : (
                <p className="mt-3 text-xs leading-6 text-muted-foreground">هنوز معرفی کوتاهی برای پروفایل ثبت نشده است.</p>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

export function PlayerProfileSkeleton() {
  return (
    <div className="space-y-5" aria-label="در حال آماده‌سازی پروفایل" aria-busy="true">
      <div className="h-36 animate-pulse rounded-3xl border border-border bg-card" />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]">
        <div className="h-[620px] animate-pulse rounded-3xl border border-border bg-card" />
        <div className="h-[420px] animate-pulse rounded-3xl border border-border bg-card" />
      </div>
    </div>
  );
}

export function PlayerProfileErrorState() {
  return (
    <section className="rounded-3xl border border-destructive/25 bg-destructive/8 p-6 text-center" role="alert">
      <CircleAlert className="mx-auto h-8 w-8 text-destructive" aria-hidden="true" />
      <h1 className="mt-3 text-lg font-black">نمایش پروفایل انجام نشد</h1>
      <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-muted-foreground">
        اطلاعات پروفایل در این لحظه قابل نمایش نیست. دوباره صفحه را باز کن.
      </p>
      <a
        href="/dashboard/profile"
        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-xs font-black text-primary-foreground"
      >
        تلاش دوباره
      </a>
    </section>
  );
}
