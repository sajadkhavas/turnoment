import { useEffect, useState, type FormEvent } from "react";

type VenueMatch = {
  id: string;
  center: string;
  title: string;
  playerA: string;
  playerB: string;
  revision: string;
  minScore: number;
  maxScore: number | null;
  scoreA: number | null;
  scoreB: number | null;
};

type Queue = { canManage: boolean; items: VenueMatch[] };

function ScoreForm({ match, onSaved }: { match: VenueMatch; onSaved: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [key] = useState(() => crypto.randomUUID());

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const fields = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    try {
      const tokenResponse = await fetch("/api/v1/auth/csrf/", { cache: "no-store" });
      if (!tokenResponse.ok) throw new Error();
      const { csrf_token } = await tokenResponse.json();
      const response = await fetch(`/api/v1/venue-results/${encodeURIComponent(match.center)}/${match.id}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": csrf_token, "Idempotency-Key": key },
        body: JSON.stringify({
          revision: match.revision, scoreA: Number(fields.get("a")), scoreB: Number(fields.get("b")),
        }),
      });
      if (!response.ok) throw new Error();
      const { outcome } = await response.json();
      if (outcome === "finalized") onSaved();
      else if (outcome === "stale" || outcome === "unavailable") {
        setError("وضعیت بازی تغییر کرده است. صفحه را تازه‌سازی کنید.");
      } else if (outcome === "score_mismatch") {
        setError("امتیاز با گزارش قبلی یکی نیست. برای اصلاح با پشتیبانی تماس بگیرید.");
      } else setError("امتیاز واردشده با قوانین بازی سازگار نیست.");
    } catch {
      setError("ثبت نتیجه انجام نشد. دوباره تلاش کنید.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-border bg-surface p-4">
      <p className="mb-2 text-sm font-bold">{match.title} · {match.center}</p>
      <div className="flex flex-wrap items-end gap-3">
        {[["a", match.playerA, match.scoreA], ["b", match.playerB, match.scoreB]].map(([name, player, score]) => (
          <label key={name} className="grid gap-1 text-sm">
            <span dir="auto">{player}</span>
            <input className="h-10 w-24 rounded-lg border border-border bg-card px-2" type="number"
              name={String(name)} defaultValue={score ?? undefined} min={match.minScore}
              max={match.maxScore ?? undefined} step={1} required />
          </label>
        ))}
        <button disabled={busy} className="min-h-10 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground">
          {busy ? "در حال ثبت…" : "ثبت نهایی نتیجه"}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-warning" role="alert">{error}</p>}
    </form>
  );
}

export function VenueResults() {
  const [queue, setQueue] = useState<Queue | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/v1/me/venue-results/", { cache: "no-store", signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json() as Promise<Queue>;
      })
      .then((data) => { setQueue(data); setError(false); })
      .catch(() => { if (!controller.signal.aborted) setError(true); });
    return () => controller.abort();
  }, [version]);

  if (!queue?.canManage) return error ? <p role="alert">فهرست نتایج مراکز بارگیری نشد.</p> : null;
  return (
    <section className="mb-5 space-y-3 rounded-2xl border border-border bg-card p-4">
      <h2 className="font-black">ثبت نتیجهٔ گیم‌نت</h2>
      {saved && <p role="status">نتیجه ثبت شد.</p>}
      {error && <p role="alert">فهرست نتایج مراکز بارگیری نشد.</p>}
      {!queue.items.length && <p className="text-sm text-muted-foreground">بازی در انتظار ثبت نتیجه نیست.</p>}
      {queue.items.map((match) => (
        <ScoreForm key={match.id} match={match} onSaved={() => {
          setSaved(true);
          setQueue((current) => current && { ...current, items: current.items.filter((item) => item.id !== match.id) });
          setVersion((current) => current + 1);
        }} />
      ))}
    </section>
  );
}
