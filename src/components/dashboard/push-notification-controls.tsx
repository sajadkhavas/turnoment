import { useEffect, useState } from "react";

function baseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) throw new Error("Missing API configuration");
  return configured.endsWith("/") ? configured : configured + "/";
}

async function subscriptionRequest(method: "POST" | "DELETE", body: unknown) {
  const base = baseUrl();
  const csrfResponse = await fetch(new URL("api/v1/auth/csrf/", base), {
    credentials: "include", headers: { Accept: "application/json" },
  });
  if (!csrfResponse.ok) throw new Error("CSRF failed");
  const csrf = await csrfResponse.json();
  if (typeof csrf.csrf_token !== "string" || !csrf.csrf_token) throw new Error("Invalid CSRF");
  const response = await fetch(new URL("api/v1/me/notifications/push/subscription/", base), {
    method, credentials: "include",
    headers: { "Content-Type": "application/json", "X-CSRFToken": csrf.csrf_token },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error("Subscription failed");
}

export function PushNotificationControls() {
  const [supported, setSupported] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setSupported(window.isSecureContext && "serviceWorker" in navigator &&
      "PushManager" in window && "Notification" in window);
  }, []);

  async function enable() {
    if (pending) return;
    setPending(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setMessage("اجازهٔ اعلان مرورگر داده نشد؛ اعلان‌های داخل سایت همچنان در دسترس‌اند.");
        return;
      }
      const response = await fetch(new URL("api/v1/me/notifications/push/config/", baseUrl()), {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Configuration failed");
      const config = await response.json();
      if (!config.enabled || typeof config.publicKey !== "string") {
        setMessage("ارسال پوش هنوز در سرور تنظیم نشده است.");
        return;
      }
      const registration = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;
      const old = await registration.pushManager.getSubscription();
      if (old) {
        // Recreate so a browser previously associated with another account
        // cannot silently reuse that account's push identity.
        await subscriptionRequest("DELETE", { endpoint: old.endpoint });
        await old.unsubscribe();
      }
      const raw = atob(config.publicKey.replace(/-/g, "+").replace(/_/g, "/"));
      const key = Uint8Array.from(raw, (char) => char.charCodeAt(0));
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true, applicationServerKey: key,
      });
      try {
        await subscriptionRequest("POST", subscription.toJSON());
      } catch (error) {
        await subscription.unsubscribe();
        throw error;
      }
      setMessage("اعلان مرورگر فعال شد.");
    } catch {
      setMessage("فعال‌سازی اعلان انجام نشد. اتصال و تنظیمات مرورگر را بررسی کن.");
    } finally { setPending(false); }
  }

  async function disable() {
    if (pending) return;
    setPending(true);
    try {
      const registration = await navigator.serviceWorker.getRegistration("/");
      const subscription = await registration?.pushManager.getSubscription();
      if (subscription) {
        await subscriptionRequest("DELETE", { endpoint: subscription.endpoint });
        await subscription.unsubscribe();
      }
      setMessage("اعلان مرورگر غیرفعال شد.");
    } catch { setMessage("غیرفعال‌سازی انجام نشد؛ دوباره تلاش کن."); }
    finally { setPending(false); }
  }

  return <section className="mb-5 rounded-2xl border border-border bg-card p-5">
    <h2 className="font-bold">اعلان مرورگر</h2>
    <p className="mt-2 text-sm leading-7">برای دریافت رویدادهای حساب، اعلان مرورگر را فعال کن.</p>
    {supported ? <div className="mt-3 flex flex-wrap gap-2">
      <button type="button" disabled={pending} onClick={() => void enable()}
        className="min-h-11 rounded-xl bg-primary px-4 text-primary-foreground">فعال‌سازی اعلان</button>
      <button type="button" disabled={pending} onClick={() => void disable()}
        className="min-h-11 rounded-xl border border-border px-4">غیرفعال‌سازی</button>
    </div> : <p className="text-sm">این مرورگر یا اتصال فعلی پوش را پشتیبانی نمی‌کند.</p>}
    {message ? <p role="status" className="mt-3 text-sm leading-7">{message}</p> : null}
  </section>;
}
