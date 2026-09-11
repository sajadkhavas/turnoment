import { CheckCircle2, KeyRound, ShieldCheck, Smartphone } from "lucide-react";
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

export function OtpLoginPage({ redirectTo }: { redirectTo: string }) {
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
        // Session preflight is an optimization. The OTP form remains usable if it cannot be confirmed.
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
        setFeedback({ tone: "success", text: "کد ورود ارسال شد. کد ۶ رقمی را وارد کن." });
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
      setFeedback({ tone: "error", text: "کد ورود باید ۶ رقم باشد." });
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
        setFeedback({ tone: "success", text: "ورود با موفقیت انجام شد." });
        window.location.assign(redirectTo);
        return;
      }
      if (action.outcome === "expired" || action.outcome === "consumed") setDeadChallenge(true);
      setFeedback({ tone: action.outcome === "invalid" ? "error" : action.outcome === "validation_error" ? "error" : "info", text: action.message });
    } catch {
      try {
        const session = await loginAuthRepository.getSession();
        if (session.state === "authenticated") {
          window.location.assign(redirectTo);
          return;
        }
      } catch {
        // Keep the current challenge so the same logical verification can be retried safely.
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.12),transparent_42%)]" />
      <div className="container relative mx-auto grid min-h-[calc(100vh-8rem)] place-items-center px-4 py-10 sm:py-16">
        <section className="w-full max-w-lg" aria-labelledby="login-title">
          <div className="rounded-3xl border border-border/80 bg-card/95 p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
            <div className="text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                {challenge ? <KeyRound className="h-6 w-6" aria-hidden="true" /> : <Smartphone className="h-6 w-6" aria-hidden="true" />}
              </div>
              <h1 id="login-title" className="mt-4 text-2xl font-black sm:text-3xl">ورود با کد یکبارمصرف</h1>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-muted-foreground">
                {challenge
                  ? `کد ارسال‌شده به ${displayPhone(challenge.phone)} را وارد کن.`
                  : "شماره موبایلت را وارد کن تا کد امن ورود برایت ارسال شود."}
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
                  <label htmlFor="login-phone" className="mb-2 block text-sm font-bold">شماره موبایل</label>
                  <input
                    id="login-phone"
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
                    aria-describedby="login-phone-help login-feedback"
                    aria-invalid={Boolean(phone && !normalizedPhone)}
                    className="h-12 w-full rounded-xl border border-border bg-elevated px-4 text-left font-mono-num text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <p id="login-phone-help" className="mt-2 text-xs leading-6 text-muted-foreground">
                    فقط شماره موبایل ایران. اگر حسابی با این شماره نداشته باشی، بعد از تأیید شماره حساب بازیکن ساخته می‌شود.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={requestPending || resendRemaining > 0}
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground transition hover:glow-violet-strong disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {requestPending ? "در حال ارسال…" : resendRemaining > 0 ? `تلاش دوباره تا ${countdown(resendRemaining)}` : "دریافت کد ورود"}
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
                    <label id="otp-label" className="text-sm font-bold">کد ۶ رقمی</label>
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
                      aria-labelledby="otp-label"
                      aria-describedby="otp-help login-feedback"
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
                  <div id="otp-help" className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span>{challengeUsable ? `اعتبار کد: ${countdown(expiresRemaining)}` : "اعتبار این کد به پایان رسیده است."}</span>
                    {resendRemaining > 0 ? <span>ارسال دوباره: {countdown(resendRemaining)}</span> : null}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={verifyPending || code.length !== 6 || !challengeUsable}
                  className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-black text-primary-foreground transition hover:glow-violet-strong disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {verifyPending ? "در حال تأیید…" : "تأیید و ورود"}
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
              id="login-feedback"
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
              {feedback?.text ?? "وضعیت ورود"}
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-border/70 bg-elevated/60 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold">ورود امن بدون رمز عبور</p>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">کد ورود فقط برای همین درخواست معتبر است و پس از تأیید، نشست امن حساب تو برقرار می‌شود.</p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-5 flex max-w-md items-center justify-center gap-2 text-center text-xs text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>ورود و ساخت حساب بازیکن با یک جریان یکپارچه انجام می‌شود.</span>
          </div>
        </section>
      </div>
    </main>
  );
}
