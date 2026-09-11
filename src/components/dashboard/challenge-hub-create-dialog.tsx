import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toPersianDigits } from "@/lib/format";
import {
  validateCreateChallengeDraft,
  type ChallengeHubPageData,
  type ChallengeMutationAction,
  type ChallengeOpponent,
  type OpponentSearchAction,
  type OpponentSearchRequest,
} from "@/lib/challenge-hub-contract";

type CreateDraft = { opponentPlayerId: string; gameId: string; formatId: string; note: string };
type FieldErrors = { opponent?: string; game?: string; format?: string; note?: string; form?: string };

export function ChallengeCreateDialog({
  data,
  open,
  pending,
  onOpenChange,
  onSearchOpponents,
  onCreate,
}: {
  data: ChallengeHubPageData;
  open: boolean;
  pending: boolean;
  onOpenChange: (open: boolean) => void;
  onSearchOpponents: (request: OpponentSearchRequest) => Promise<OpponentSearchAction>;
  onCreate: (draft: CreateDraft) => Promise<ChallengeMutationAction | null>;
}) {
  const firstGame = data.creation.games[0];
  const [gameId, setGameId] = useState(firstGame?.gameId ?? "");
  const selectedGame = useMemo(
    () => data.creation.games.find((game) => game.gameId === gameId) ?? firstGame,
    [data.creation.games, firstGame, gameId],
  );
  const [formatId, setFormatId] = useState(selectedGame?.formats[0]?.formatId ?? "");
  const [query, setQuery] = useState("");
  const [searchPending, setSearchPending] = useState(false);
  const [searchMessage, setSearchMessage] = useState<string | null>(null);
  const [opponents, setOpponents] = useState<ChallengeOpponent[]>([]);
  const [opponentPlayerId, setOpponentPlayerId] = useState("");
  const [note, setNote] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const reset = () => {
    const game = data.creation.games[0];
    setGameId(game?.gameId ?? "");
    setFormatId(game?.formats[0]?.formatId ?? "");
    setQuery("");
    setSearchMessage(null);
    setOpponents([]);
    setOpponentPlayerId("");
    setNote("");
    setFieldErrors({});
  };

  const changeGame = (value: string) => {
    const game = data.creation.games.find((candidate) => candidate.gameId === value);
    setGameId(value);
    setFormatId(game?.formats[0]?.formatId ?? "");
    setOpponentPlayerId("");
    setOpponents([]);
    setSearchMessage(null);
    setFieldErrors((current) => ({ ...current, game: undefined, format: undefined, opponent: undefined }));
  };

  const search = async () => {
    setSearchMessage(null);
    setFieldErrors((current) => ({ ...current, opponent: undefined }));
    if (!selectedGame) return;
    if (query.trim().length < data.creation.opponentSearchMinChars) {
      setSearchMessage(`حداقل ${toPersianDigits(data.creation.opponentSearchMinChars)} کاراکتر برای جست‌وجو وارد کن.`);
      setOpponents([]);
      return;
    }
    setSearchPending(true);
    try {
      const action = await onSearchOpponents({ query: query.trim(), gameId: selectedGame.gameId });
      if (action.outcome === "results") {
        setOpponents(action.items);
        setSearchMessage(action.items.length ? null : "بازیکن واجد شرایطی با این عبارت پیدا نشد.");
      } else if (action.outcome === "validation_error") {
        setOpponents([]);
        setSearchMessage(action.message);
      }
    } catch {
      setOpponents([]);
      setSearchMessage("جست‌وجوی حریف انجام نشد. دوباره تلاش کن.");
    } finally {
      setSearchPending(false);
    }
  };

  const submit = async () => {
    const draft = { opponentPlayerId, gameId, formatId, note };
    const localErrors = validateCreateChallengeDraft(data, draft);
    setFieldErrors(localErrors);
    if (Object.keys(localErrors).length) return;
    const action = await onCreate(draft);
    if (!action) return;
    if (action.outcome === "accepted") {
      onOpenChange(false);
      reset();
      return;
    }
    if (action.outcome === "validation_error") {
      setFieldErrors(action.fields);
      return;
    }
    if (action.outcome === "conflict" || action.outcome === "unavailable" || action.outcome === "stale") {
      setFieldErrors({ form: action.message });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => { onOpenChange(next); if (!next && !pending) reset(); }}>
      <DialogContent dir="rtl" className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader className="text-right sm:text-right">
          <DialogTitle>ایجاد چالش جدید</DialogTitle>
          <DialogDescription>حریف را از نتیجه جست‌وجو انتخاب کن؛ سپس بازی و فرمت Match را مشخص کن.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <label className="block text-xs font-bold">
            <span className="mb-1.5 block text-muted-foreground">بازی</span>
            <select value={gameId} onChange={(event) => changeGame(event.target.value)} className="h-11 w-full rounded-lg border border-border bg-elevated px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {data.creation.games.map((game) => <option key={game.gameId} value={game.gameId}>{game.name}</option>)}
            </select>
            {fieldErrors.game ? <span className="mt-1 block text-[11px] text-destructive">{fieldErrors.game}</span> : null}
          </label>

          <label className="block text-xs font-bold">
            <span className="mb-1.5 block text-muted-foreground">فرمت Match</span>
            <select value={formatId} onChange={(event) => { setFormatId(event.target.value); setFieldErrors((current) => ({ ...current, format: undefined })); }} className="h-11 w-full rounded-lg border border-border bg-elevated px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {selectedGame?.formats.map((format) => <option key={format.formatId} value={format.formatId}>{format.label}</option>)}
            </select>
            {fieldErrors.format ? <span className="mt-1 block text-[11px] text-destructive">{fieldErrors.format}</span> : null}
          </label>

          <div>
            <label htmlFor="challenge-opponent-search" className="text-xs font-bold text-muted-foreground">جست‌وجوی حریف</label>
            <div className="mt-1.5 flex gap-2">
              <input id="challenge-opponent-search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); void search(); } }} placeholder="گیم‌تگ یا نام کاربری" autoComplete="off" className="h-11 min-w-0 flex-1 rounded-lg border border-border bg-elevated px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              <Button type="button" variant="outline" className="min-h-11" disabled={searchPending} onClick={() => void search()}><Search className="h-4 w-4" aria-hidden="true" />{searchPending ? "در حال جست‌وجو" : "جست‌وجو"}</Button>
            </div>
            {searchMessage ? <p className="mt-2 text-[11px] leading-5 text-muted-foreground" role="status">{searchMessage}</p> : null}
            {opponents.length ? (
              <div className="mt-2 grid gap-2" role="radiogroup" aria-label="حریف‌های پیدا شده">
                {opponents.map((opponent) => (
                  <button key={opponent.playerId} type="button" role="radio" aria-checked={opponentPlayerId === opponent.playerId} onClick={() => { setOpponentPlayerId(opponent.playerId); setFieldErrors((current) => ({ ...current, opponent: undefined })); }} className={cn("flex min-h-12 items-center justify-between gap-3 rounded-xl border px-3 text-right focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", opponentPlayerId === opponent.playerId ? "border-primary/60 bg-primary/10" : "border-border bg-elevated hover:border-primary/30")}>
                    <span><span className="block text-sm font-black" dir="ltr">{opponent.gamerTag}</span><span className="mt-0.5 block text-[10px] text-muted-foreground" dir="ltr">@{opponent.username}</span></span>
                    <span className="font-mono-num text-xs text-secondary" dir="ltr">{opponent.challengeRating === null ? "—" : toPersianDigits(opponent.challengeRating)}</span>
                  </button>
                ))}
              </div>
            ) : null}
            {fieldErrors.opponent ? <span className="mt-1 block text-[11px] text-destructive">{fieldErrors.opponent}</span> : null}
          </div>

          <label className="block text-xs font-bold">
            <span className="mb-1.5 flex items-center justify-between gap-3 text-muted-foreground"><span>یادداشت اختیاری</span><span>{toPersianDigits(note.trim().length)} / {toPersianDigits(data.creation.noteMaxLength)}</span></span>
            <textarea value={note} onChange={(event) => { setNote(event.target.value); setFieldErrors((current) => ({ ...current, note: undefined })); }} maxLength={data.creation.noteMaxLength} rows={3} className="w-full resize-y rounded-lg border border-border bg-elevated px-3 py-2 text-sm leading-6 outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            {fieldErrors.note ? <span className="mt-1 block text-[11px] text-destructive">{fieldErrors.note}</span> : null}
          </label>
          {fieldErrors.form ? <div className="rounded-xl border border-destructive/30 bg-destructive/8 p-3 text-xs leading-6 text-destructive" role="alert">{fieldErrors.form}</div> : null}
        </div>

        <DialogFooter className="gap-2 sm:space-x-0">
          <Button type="button" variant="outline" disabled={pending} onClick={() => onOpenChange(false)}>انصراف</Button>
          <Button type="button" disabled={pending || !data.access.canCreate} onClick={() => void submit()}>{pending ? "در حال ارسال دعوت..." : "ارسال دعوت چالش"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
