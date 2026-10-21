import { useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import type { MyMatchItem } from "@/lib/my-matches-data";

export function ChallengeLifecycleAction({ item }: { item: MyMatchItem }) {
  const router = useRouter();
  const busy = useRef(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(false);
  const command = item.lifecycleState === "ready" ? "start" : "finish";

  async function execute() {
    if (busy.current || completed || !item.revision || !item.canControlLifecycle) return;
    busy.current = true;
    setPending(true);
    setMessage("");
    try {
      const configured = import.meta.env.VITE_API_BASE_URL?.trim();
      if (!configured) throw new Error("Missing API configuration");
      const base = configured.endsWith("/") ? configured : configured + "/";
      const csrfResponse = await fetch(new URL("api/v1/auth/csrf/", base), {
        credentials: "include", headers: { Accept: "application/json" },
      });
      if (!csrfResponse.ok) throw new Error("CSRF failed");
      const csrf = await csrfResponse.json();
      if (typeof csrf.csrf_token !== "string" || !csrf.csrf_token) throw new Error("Invalid CSRF");
      const response = await fetch(
        new URL("api/v1/matches/" + encodeURIComponent(item.matchId) + "/lifecycle/", base),
        {
          method: "POST", credentials: "include",
          headers: {
            Accept: "application/json", "Content-Type": "application/json",
            "X-CSRFToken": csrf.csrf_token,
          },
          body: JSON.stringify({ command, revision: item.revision }),
        },
      );
      if (!response.ok) throw new Error("Lifecycle request failed");
      const action = await response.json();
      if (action.outcome === "accepted") {
        const expected = command === "start" ? "live" : "awaiting-result";
        if (action.matchId !== item.matchId || action.state !== expected ||
            typeof action.revision !== "string") throw new Error("Invalid response");
        setCompleted(true);
        await router.invalidate();
      } else if (action.outcome === "stale" || action.outcome === "unavailable") {
        setMessage("\u0648\u0636\u0639\u06cc\u062a \u062a\u063a\u06cc\u06cc\u0631 \u06a9\u0631\u062f\u0647 \u0627\u0633\u062a. \u0635\u0641\u062d\u0647 \u0631\u0627 \u062a\u0627\u0632\u0647 \u06a9\u0646.");
        await router.invalidate();
      } else throw new Error("Unexpected response");
    } catch {
      setMessage("\u0648\u0636\u0639\u06cc\u062a \u0645\u0634\u062e\u0635 \u0646\u0634\u062f. \u0635\u0641\u062d\u0647 \u0631\u0627 \u062a\u0627\u0632\u0647 \u06a9\u0646.");
    } finally {
      busy.current = false;
      setPending(false);
    }
  }

  return (
    <div className="mt-4 space-y-2">
      <button type="button" disabled={pending || completed} aria-busy={pending}
        onClick={() => void execute()}
        className="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground disabled:opacity-50">
        {pending ? "\u062f\u0631 \u062d\u0627\u0644 \u062b\u0628\u062a..." :
          command === "start" ? "\u0634\u0631\u0648\u0639 \u0628\u0627\u0632\u06cc" :
          "\u0628\u0627\u0632\u06cc \u062a\u0645\u0627\u0645 \u0634\u062f\u061b \u062b\u0628\u062a \u0646\u062a\u06cc\u062c\u0647"}
      </button>
      {message ? <p role="status" className="text-sm leading-7">{message}</p> : null}
    </div>
  );
}
