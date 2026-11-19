import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Gamepad2, Pencil, UserRound } from "lucide-react";
import { z } from "zod";
import { avatarSource } from "@/lib/player-avatar";
import { getDataAdapterMode } from "@/lib/data-adapter";
import type { AuthenticatedPlayer } from "@/lib/login-auth-contract";

const count = z.number().int().nonnegative();
const summarySchema = z.object({
  displayName: z.string().nullable(),
  gamerTag: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  level: z.number().int().positive(),
  wins: count,
  teams: z.array(z.object({ id: z.string().uuid(), name: z.string(), isPublic: z.boolean() })),
  games: z.array(z.object({
    gameId: z.string(), gameName: z.string(),
    played: count, wins: count, losses: count, draws: count,
    rank: z.object({
      position: z.number().int().positive(),
      kind: z.enum(["tournament", "challenge"]),
      season: z.string(),
    }).nullable(),
  })),
});
type Summary = z.infer<typeof summarySchema>;

function number(n: number) {
  return n.toLocaleString("fa-IR");
}

export function PlayerProfileSummary({ player }: { player: AuthenticatedPlayer }) {
  const [state, setState] = useState<
    { status: "loading" | "error" | "preview" } | { status: "ready"; data: Summary }
  >({ status: "loading" });
  const [retry, setRetry] = useState(0);
  const [failedImage, setFailedImage] = useState<string>();
  const base = import.meta.env.VITE_API_BASE_URL?.trim() || "";

  useEffect(() => {
    if (getDataAdapterMode() === "mock") {
      setState({ status: "preview" });
      return;
    }

    const controller = new AbortController();
    setState({ status: "loading" });
    fetch(new URL("/api/v1/me/profile-summary/", base || window.location.origin), {
      credentials: "include", cache: "no-store", signal: controller.signal,
      headers: { Accept: "application/json" },
    }).then(async (response) => {
      if (!response.ok) throw new Error();
      const data = summarySchema.parse(await response.json());
      if (!controller.signal.aborted) setState({ status: "ready", data });
    }).catch(() => {
      if (!controller.signal.aborted) setState({ status: "error" });
    });
    return () => controller.abort();
  }, [base, player.id, retry]);

  const summary = state.status === "ready" ? state.data : undefined;
  const name = summary?.displayName || player.profile.display_name || player.profile.gamer_tag || "بازیکن";
  const tag = summary?.gamerTag || player.profile.gamer_tag;
  const photo = avatarSource(summary?.avatarUrl);

  return (
    <div dir="rtl" className="space-y-5">
      <section className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4 sm:p-6" aria-labelledby="profile-title">
        {photo && failedImage !== photo ? (
          <img src={photo} alt="" width={72} height={72} className="size-[72px] rounded-full object-cover"
            onError={() => setFailedImage(photo)} />
        ) : (
          <span className="grid size-[72px] place-items-center rounded-full bg-primary/15 text-primary">
            <UserRound aria-hidden="true" />
          </span>
        )}
        <div className="min-w-0 flex-1 space-y-1">
          <h1 id="profile-title" dir="auto" className="break-words text-xl font-black">{name}</h1>
          {tag && tag !== name && <p className="text-sm text-muted-foreground"><bdi>@{tag}</bdi></p>}
          {summary && <p className="text-sm text-primary">سطح {number(summary.level)} · {number(summary.wins)} برد</p>}
        </div>
        <Link to="/dashboard/profile" search={{ edit: true }}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-4 text-sm font-bold hover:border-primary">
          <Pencil className="size-4" aria-hidden="true" /> ویرایش پروفایل
        </Link>
        {summary && <div className="flex w-full flex-wrap gap-2 text-sm">
          <span className="text-muted-foreground">تیم:</span>
          {!summary.teams.length && <span>بدون تیم</span>}
          {summary.teams.map((team) => team.isPublic ? (
            <Link key={team.id} to="/teams/$id" params={{ id: team.id }} search={{ page: 1 }} className="text-primary hover:underline">{team.name}</Link>
          ) : <span key={team.id}>{team.name}</span>)}
        </div>}
      </section>

      <section className="space-y-3 rounded-2xl border border-border bg-card p-4 sm:p-6" aria-labelledby="profile-games">
        <h2 id="profile-games" className="flex items-center gap-2 font-black"><Gamepad2 className="size-5 text-primary" aria-hidden="true" /> آمار بازی‌ها</h2>
        {state.status === "loading" && <p role="status">در حال دریافت آمار…</p>}
        {state.status === "error" && <p role="alert">آمار بارگیری نشد. <button className="text-primary underline" onClick={() => setRetry((n) => n + 1)}>تلاش دوباره</button></p>}
        {state.status === "preview" && <p className="text-sm text-muted-foreground">آمار پس از اتصال به حساب بازی نمایش داده می‌شود.</p>}
        {summary && !summary.games.length && <p className="text-sm text-muted-foreground">هنوز نتیجهٔ نهایی بازی‌ای ثبت نشده است.</p>}
        {summary?.games.map((game) => (
          <article key={game.gameId} className="space-y-2 rounded-xl border border-border p-3">
            <div className="flex flex-wrap justify-between gap-2">
              <h3 className="font-bold" dir="auto">{game.gameName}</h3>
              <p className="text-xs text-muted-foreground">{game.rank
                ? `رتبهٔ ${number(game.rank.position)} · ${game.rank.kind === "tournament" ? "مسابقات" : "چالش‌ها"} · ${game.rank.season}`
                : "بدون رتبهٔ منتشرشده"}</p>
            </div>
            <dl className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
              {([["بازی", game.played], ["برد", game.wins], ["باخت", game.losses], ["مساوی", game.draws]] as const).map(([label, value]) => (
                <div className="flex flex-wrap items-baseline gap-2 rounded-lg bg-surface p-2" key={label}>
                  <dt className="text-muted-foreground">{label}</dt><dd className="font-black">{number(value)}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </section>
    </div>
  );
}
