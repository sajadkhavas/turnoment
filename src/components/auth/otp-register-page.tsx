import { CheckCircle2, KeyRound, ShieldCheck, Smartphone, Sparkles, UserPlus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {
  normalizeIranMobileForUi,
  normalizeOtpCode,
  type OtpChallenge,
} from "@/lib/login-auth-contract";
import { loginAuthRepository } from "@/lib/login-auth-repository";

function faNumber(value: number) {
  return new Intl.NumberFormat("fa-IR", { useGrouping: false }).format(value);
}

function countdown(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${faNumber(minutes)}:${faNumber(rest).padStart(2, "۰")}`;
}

function displayPhone(phone: string) {
  return phone.replace(/^\+98/, "0");
}

type Feedback = { tone: "error" | "info" | "success"; text: string } | null;

export function OtpRegisterPage({ redirectTo }: { redirectTo: string }) {
  const [phone, setPhone] = useState("");
  const [challenge, setChallenge] = useState<OtpChallenge | null>(null);
  const [code, setCode] = useState("");
  const [issuedAt, setIssuedAt] = useState(0);
  const [deadChallenge, setDeadChallenge] = useState(false);
  const [requestRetryAt, setRequestRetryAt] = useState(0);
  const [requestPending, setRequestPending] = useState(false);
  const [verifyPending, setVerifyPending] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let active = true;
    void loginAuthRepository
      .getSession()
      .then((session) => {
        if (active && session.state === "authenticated") window.location.replace(redirectTo);
      })
      .catch(() => {
        // Session preflight is only a navigation optimization. OTP remains usable if it cannot be confirmed.
      });
    return () => {
      active = false;
    };
  }, [redirectTo]);

  const normalizedPhone = useMemo(() => normalizeIranMobileForUi(phone), [phone]);
  const expiresRemaining = challenge
    ? Math.max(0, Math.ceil((issuedAt + challenge.expiresIn * 1000 - now) / 1000))
    : 0;
  const resendRemaining = challenge
    ? Math.max(0, Math.ceil((Math.max(issuedAt + challenge.resendAfter * 1000, requestRetryAt) - now) / 1000))
    : Math.max(0, Math.ceil((requestRetryAt - now) / 1000));
  const challengeUsable = Boolean(challenge && !deadChallenge && expiresRemaining > 0);

  async function requestCode(nextPhone: string) {
    if (requestPending || resendRemaining > 0) return;
    const canonical = normalizeIranMobileForUi(nextPhone);
    if (!canonical) {
      setFeedback({ tone: "error", text: "شماره موبایل ایران را به‌درستی وارد کن؛ مثل 09121234567." });
      return;
    }

    setRequestPending(true);
    setFeedback(null);
    try {
      const action = await loginAuthRepository.requestOtp(canonical);
      if (action.outcome === "issued") {
        setPhone(displayPhone(action.challenge.phone));
        setChallenge(action.challenge);
        setIssuedAt(Date.now());
        setRequestRetryAt(0);
        setCode("");
        setDeadChallenge(false);
        setFeedback({ tone: "success", text: "کد تأیید ارسال شد. کد ۶ رقمی را وارد کن." });
      } else if (action.outcome === "rate_limited") {
        setRequestRetryAt(Date.now() + action.retryAfter * 1000);
        setFeedback({ tone: "info", text: action.message });
      } else {
        setFeedback({ tone: "error", text: action.message });
      }
    } catch {
      setFeedback({
        tone: "error",
        text: "وضعیت ارسال کد مشخص نشد. برای جلوگیری از درخواست‌های پشت‌سرهم، کمی بعد دوباره تلاش کن.",
      });
    } finally {
      setRequestPending(false);
    }
  }

  async function verifyCode() {
    if (!challenge || verifyPending) return;
    const normalized = normalizeOtpCode(code);
    if (normalized.length !== 6) {
      setFeedback({ tone: "error", text: "کد تأیید باید ۶ رقم باشد." });
      return;
    }
    if (!challengeUsable) {
      setFeedback({ tone: "error", text: "این کد دیگر قابل استفاده نیست. یک کد جدید بگیر." });
      return;
    }

    setVerifyPending(true);
    setFeedback(null);
    try {
      const action = await loginAuthRepository.verifyOtp({ challengeId: challenge.challengeId, code: normalized });
      if (action.outcome === "authenticated") {
        setFeedback({ tone: "success", text: "شماره تأیید شد. حساب تو آماده است." });
        window.location.assign(redirectTo);
        return;
      }
      if (action.outcome === "expired" || action.outcome === "consumed") setDeadChallenge(true);
      setFeedback({
        tone: action.outcome === "invalid" || action.outcome === "validation_error" ? "error" : "info",
        text: action.message,
      });
    } catch {
      try {
        const session = await loginAuthRepository.getSession();
        if (session.state === "authenticated") {
          window.location.assign(redirectTo);
          return;
        }
      } catch {
        // Keep the same challenge so an uncertain verification can be retried without creating a second account flow.
      }
      setFeedback({ tone: "error", text: "وضعیت تأیید کد مشخص نشد. اتصال را بررسی کن و همین کد را دوباره امتحان کن." });
    } finally {
      setVerifyPending(false);
    }
  }

  function changePhone() {
    setChallenge(null);
    setCode("");
    setIssuedAt(0);
    setDeadChallenge(false);
    setRequestRetryAt(0);
    setFeedback(null);
  }

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,hsl(var(--primary)/0.16),transparent_38%),radial-gradient(circle_at_15%_80%,hsl(var(--primary)/0.08),transparent_34%)]" />
      <div className="container relative mx-auto grid min-h-[calc(100vh-8rem)] place-items-center px-4 py-10 sm:py-16">
        <section className="grid w-full max-w-5xl gap-6 lg:grid-cols-[0.85fr_1.15fr]" aria-labelledby="register-title">
          <aside className="order-2 rounded-3xl border border-border/70 bg-elevated/55 p-5 backdrop-blur lg:order-1 lg:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              شروع مسیر رقابتی
            </div>
            <h2 className="mt-5 text-xl font-black leading-9 sm:text-2xl">یک شماره موبایل؛ یک حساب بازیکن</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              شماره‌ات را تأیید کن و وارد فضای مسابقات شو. اگر با این شماره حسابی نداشته باشی، حساب بازیکن همان لحظه برایت ساخته می‌شود.
            </p>

            <div className="mt-7 space-y-3">
              <Feature text="ساخت حساب بدون انتخاب یا نگهداری رمز عبور" />
              <Feature text="ورودهای بعدی هم با کد یکبارمصرف انجام می‌شود" />
              <Feature text="هویت حساب با همان شماره تأییدشده نگه داشته می‌شود" />
            </div>

            <div className="mt-7 rounded-2xl border border-border/70 bg-card/70 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold">شروع امن و ساده</p>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">
                    برای شروع فقط شماره موبایل لازم است؛ نام، ایمیل و رمز عبور اجباری نیست.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <div className="order-1 rounded-3xl border border-border/80 bg-card/95 p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-8 lg:order-2">
            <div className="text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                {challenge ? <KeyRound className="h-6 w-6" aria-hidden="true" /> : <UserPlus className="h-6 w-6" aria-hidden="true" />}
              </div>
              <h1 id="register-title" className="mt-4 text-2xl font-black sm:text-3xl">
                {challenge ? "تأیید شماره موبایل" : "ساخت حساب با شماره موبایل"}
              </h1>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
                {challenge
                  ? `کد ارسال‌شده به ${displayPhone(challenge.phone)} را وارد کن.`
                  : "شماره موبایلت را وارد کن تا کد تأیید برایت ارسال شود."}
              </p>
            </div>

            {!challenge ? (
              <form
                className="mt-7 space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  void requestCode(phone);
                }}
                noValidate
              >
                <div>
                  <label htmlFor="register-phone" className="mb-2 block text-sm font-bold">شماره موبایل</label>
                  <div className="relative">
                    <Smartphone className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <input
                      id="register-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      dir="ltr"
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value);
                        if (feedback?.tone === "error") setFeedback(null);
                      }}
                      placeholder="09121234567"
                      aria-describedby="register-phone-help register-feedback"
                      aria-invalid={Boolean(phone && !normalizedPhone)}
                      className="h-12 w-full rounded-xl border border-border bg-elevated px-4 pr-11 text-left font-mono-num text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <p id="register-phone-help" className="mt-2 text-xs leading-6 text-muted-foreground">
                    فقط شماره موبایل ایران. اگر این شماره قبلاً حساب داشته باشد، مستقیم وارد همان حساب می‌شوی.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={requestPending || resendRemaining > 0}
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground transition hover:glow-violet-strong disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {requestPending ? "در حال ارسال…" : resendRemaining > 0 ? `تلاش دوباره تا ${countdown(resendRemaining)}` : "دریافت کد تأیید"}
                </button>
              </form>
            ) : (
              <form
                className="mt-7 space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  void verifyCode();
                }}
                noValidate
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <label id="register-otp-label" className="text-sm font-bold">کد ۶ رقمی</label>
                    <button type="button" onClick={changePhone} className="text-xs font-bold text-primary hover:underline">تغییر شماره</button>
                  </div>
                  <div dir="ltr" className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={code}
                      onChange={(value) => {
                        setCode(normalizeOtpCode(value));
                        if (feedback?.tone === "error") setFeedback(null);
                      }}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      aria-labelledby="register-otp-label"
                      aria-describedby="register-otp-help register-feedback"
                      disabled={verifyPending || !challengeUsable}
                      autoFocus
                    >
                      <InputOTPGroup className="gap-1.5 sm:gap-2">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <InputOTPSlot key={index} index={index} className="h-12 w-10 rounded-lg border sm:w-12" />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <div id="register-otp-help" className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span>{challengeUsable ? `اعتبار کد: ${countdown(expiresRemaining)}` : "اعتبار این کد به پایان رسیده است."}</span>
                    {resendRemaining > 0 ? <span>ارسال دوباره: {countdown(resendRemaining)}</span> : null}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={verifyPending || code.length !== 6 || !challengeUsable}
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground transition hover:glow-violet-strong disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {verifyPending ? "در حال تأیید…" : "تأیید و ادامه"}
                </button>

                <button
                  type="button"
                  disabled={requestPending || resendRemaining > 0}
                  onClick={() => void requestCode(challenge.phone)}
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-bold transition hover:border-primary/60 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {requestPending ? "در حال ارسال…" : resendRemaining > 0 ? `ارسال دوباره تا ${countdown(resendRemaining)}` : "ارسال دوباره کد"}
                </button>
              </form>
            )}

            <div
              id="register-feedback"
              role={feedback?.tone === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`mt-5 min-h-6 rounded-xl px-3 py-2 text-center text-xs leading-6 ${
                feedback?.tone === "error"
                  ? "bg-destructive/10 text-destructive"
                  : feedback?.tone === "success"
                    ? "bg-emerald-500/10 text-emerald-300"
                    : feedback
                      ? "bg-primary/10 text-primary"
                      : "bg-transparent text-transparent"
              }`}
            >
              {feedback?.text ?? "وضعیت ساخت حساب"}
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
              <span>قبلاً حساب ساخته‌ای؟</span>
              <Link to="/login" className="font-black text-primary hover:underline">ورود</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/50 p-3.5">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <span className="text-sm leading-7 text-muted-foreground">{text}</span>
    </div>
  );
}
