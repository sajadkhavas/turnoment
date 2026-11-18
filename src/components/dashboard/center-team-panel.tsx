import { useEffect, useState } from "react";
import { z } from "zod";
import { getDataAdapterMode } from "@/lib/data-adapter";

const teamSchema = z.object({ teamId: z.string().uuid(), name: z.string() });
const centersSchema = z.object({ items: z.array(z.object({
  id: z.string().uuid(), name: z.string(), team: teamSchema.nullable(),
})) });
const invitesSchema = z.object({ items: z.array(z.object({
  inviteId: z.string().uuid(), teamName: z.string(),
})) });

async function teamRequest(path: string, data?: object) {
  const base = new URL(import.meta.env.VITE_API_BASE_URL || window.location.origin);
  const headers: Record<string, string> = { Accept: "application/json" };
  if (data) {
    const csrf = await fetch(new URL("/api/v1/auth/csrf/", base), { credentials: "include" });
    if (!csrf.ok) throw new Error("مجوز ثبت تغییرات دریافت نشد.");
    headers["X-CSRFToken"] = z.object({ csrf_token: z.string().min(1) }).parse(await csrf.json()).csrf_token;
    headers["Content-Type"] = "application/json";
  }
  const response = await fetch(new URL("/api/v1/" + path, base), {
    credentials: "include", headers,
    ...(data ? { method: "POST", body: JSON.stringify(data) } : {}),
  });
  if (!response.ok) throw new Error(response.status === 404
    ? "بازیکن یا دعوت پیدا نشد." : "عملیات انجام نشد. دسترسی و اطلاعات را بررسی کن.");
  return response.json() as Promise<unknown>;
}

export function CenterTeamPanel({ onChanged }: { onChanged: () => Promise<void> }) {
  const [centers, setCenters] = useState<z.infer<typeof centersSchema>["items"]>([]);
  const [invites, setInvites] = useState<z.infer<typeof invitesSchema>["items"]>([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const enabled = getDataAdapterMode() === "api";

  async function refresh() {
    const [managed, pending] = await Promise.all([
      teamRequest("me/team-centers/"), teamRequest("me/team-invites/"),
    ]);
    setCenters(centersSchema.parse(managed).items);
    setInvites(invitesSchema.parse(pending).items);
  }

  useEffect(() => {
    if (enabled) void refresh().catch(() => setNotice("دریافت اطلاعات تیم انجام نشد."));
  }, [enabled]);

  async function act(path: string, payload: object, success: string) {
    setBusy(true);
    setNotice("");
    try {
      await teamRequest(path, payload);
      setNotice(success);
      await Promise.all([refresh(), onChanged()]);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "عملیات انجام نشد.");
    } finally {
      setBusy(false);
    }
  }

  if (!enabled || (!centers.length && !invites.length && !notice)) return null;
  return (
    <section className="mb-6 space-y-4 rounded-2xl border border-border bg-card p-4" dir="rtl">
      {centers.map((center) => (
        <form key={center.id + (center.team?.teamId ?? "")} className="space-y-2" onSubmit={(event) => {
          event.preventDefault();
          const value = String(new FormData(event.currentTarget).get("value") ?? "").trim();
          if (!value || busy) return;
          void (center.team
            ? act("center-teams/" + center.team.teamId + "/invites/", { gamerTag: value }, "دعوت ارسال شد.")
            : act("centers/" + center.id + "/team/", { name: value }, "تیم ساخته شد."));
        }}>
          <h2 className="font-bold">{center.name}{center.team ? " — " + center.team.name : ""}</h2>
          <div className="flex flex-wrap gap-2">
            <input name="value" required maxLength={center.team ? 24 : 120}
              aria-label={center.team ? "نام کاربری بازیکن" : "نام تیم"}
              placeholder={center.team ? "نام کاربری بازیکن" : "نام تیم"}
              className="min-w-0 rounded-lg border border-border bg-background px-3 py-2" />
            <button disabled={busy} className="rounded-lg bg-primary px-3 py-2 text-primary-foreground">
              {center.team ? "ارسال دعوت" : "ساخت تیم"}
            </button>
          </div>
        </form>
      ))}
      {invites.map((item) => (
        <div key={item.inviteId} className="flex flex-wrap items-center gap-3">
          <span>دعوت عضویت در {item.teamName}</span>
          {(["accept", "decline"] as const).map((action) => (
            <button key={action} type="button" disabled={busy} className="rounded-lg border border-border px-3 py-2"
              onClick={() => void act("teams/invites/" + item.inviteId + "/" + action + "/", {},
                action === "accept" ? "دعوت پذیرفته شد." : "دعوت رد شد.")}>
              {action === "accept" ? "قبول" : "رد"}
            </button>
          ))}
        </div>
      ))}
      {notice && <p role="status">{notice}</p>}
    </section>
  );
}
