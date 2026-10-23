import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function LiveNotifications() {
  const [unread, setUnread] = useState(0);
  useEffect(() => {
    const configured = import.meta.env.VITE_API_BASE_URL?.trim();
    if (!configured) return;
    const base = configured.endsWith("/") ? configured : configured + "/";
    let active = true;
    let fetching = false;
    const controller = new AbortController();
    async function refresh() {
      if (fetching || document.visibilityState !== "visible") return;
      fetching = true;
      try {
        const response = await fetch(new URL("api/v1/me/notifications/", base), {
          credentials: "include", signal: controller.signal,
        });
        if (!response.ok) return;
        const data = await response.json();
        if (active && Number.isInteger(data.summary?.unread) && data.summary.unread >= 0) {
          setUnread(data.summary.unread);
        }
      } catch { /* Keep the last confirmed unread count during a network failure. */ }
      finally { fetching = false; }
    }
    void refresh();
    const timer = window.setInterval(() => void refresh(), 15000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      active = false; controller.abort(); window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);
  return <Link to="/dashboard/notifications" className="mx-4 my-2 rounded-xl border border-border p-3 text-sm"
    aria-label={`اعلان‌ها؛ ${unread} خوانده‌نشده`}>
    اعلان‌ها <span aria-live="polite">{unread > 0 ? `(${unread})` : ""}</span>
  </Link>;
}
