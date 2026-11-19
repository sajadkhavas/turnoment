import { Link } from "@tanstack/react-router";
import { Gamepad2, Trophy, UserRound } from "lucide-react";
import { useState } from "react";
import { formatNumber } from "@/lib/format";
import { gameImage, type HomeHighlights } from "@/lib/home-highlights";
import { avatarSource } from "@/lib/player-avatar";

function Artwork({ source, avatar = false }: { source?: string; avatar?: boolean }) {
  const [failed, setFailed] = useState<string>();
  const Icon = avatar ? UserRound : Gamepad2;
  const shape = avatar ? "size-14 rounded-full" : "size-14 rounded-xl";
  return source && failed !== source ? (
    <img src={source} alt="" width={56} height={56} loading="lazy" referrerPolicy="no-referrer"
      className={`${shape} shrink-0 object-cover`} onError={() => setFailed(source)} />
  ) : (
    <span className={`${shape} grid shrink-0 place-items-center bg-primary/15 text-primary`}>
      <Icon className="size-5" aria-hidden="true" />
    </span>
  );
}

export function HomeHighlightsSection({ data }: { data: HomeHighlights }) {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8" dir="rtl">
      {data.leaders.length > 0 && (
        <section aria-labelledby="home-leaders" className="space-y-4">
          <h2 id="home-leaders" className="flex items-center gap-2 text-xl font-black">
            <Trophy className="size-5 text-primary" aria-hidden="true" /> بازیکنان برتر تورنومچ
          </h2>
          <ol className="grid gap-3 sm:grid-cols-3">
            {data.leaders.slice(0, 3).map((entry) => (
              <li key={entry.username}>
                <Link to="/players/$username" params={{ username: entry.username }}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 hover:border-primary">
                  <Artwork avatar source={avatarSource(entry.avatarUrl)} />
                  <div className="min-w-0">
                    <p className="text-xs text-primary">رتبهٔ {formatNumber(entry.rank)}</p>
                    <p className="break-words font-black"><bdi>{entry.name}</bdi></p>
                    <p className="text-xs text-muted-foreground">سطح {formatNumber(entry.level)} · {formatNumber(entry.wins)} برد</p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
          {data.leaders.length > 3 && (
            <div className="max-h-64 overflow-auto rounded-xl border border-border" tabIndex={0} aria-label="جدول بازیکنان برتر">
              <table className="w-full text-right text-sm">
                <thead className="sticky top-0 bg-card"><tr>
                  <th className="p-3" scope="col">رتبه</th><th className="p-3" scope="col">بازیکن</th>
                  <th className="p-3" scope="col">سطح</th><th className="p-3" scope="col">برد</th>
                </tr></thead>
                <tbody>{data.leaders.slice(3).map((entry) => (
                  <tr key={entry.username} className="border-t border-border">
                    <td className="p-3">{formatNumber(entry.rank)}</td>
                    <td className="p-3"><Link to="/players/$username" params={{ username: entry.username }} className="hover:underline"><bdi>{entry.name}</bdi></Link></td>
                    <td className="p-3">{formatNumber(entry.level)}</td>
                    <td className="p-3">{formatNumber(entry.wins)}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </section>
      )}
      {data.games.length > 0 && (
        <section aria-labelledby="home-games" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 id="home-games" className="text-xl font-black">مسابقه را از بازی موردعلاقه‌ات پیدا کن</h2>
            <Link to="/games" className="text-sm font-bold text-primary hover:underline">همهٔ بازی‌ها</Link>
          </div>
          <ul className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-6">
            {data.games.map((game) => (
              <li key={game.gameId}>
                <Link to="/tournaments" search={{ game: game.gameId }}
                  className="flex flex-col items-start gap-2 rounded-xl border border-border bg-card p-3 hover:border-primary sm:flex-row sm:items-center">
                  <Artwork source={gameImage(game.imageUrl)} />
                  <span className="min-w-0 break-words text-sm font-bold">{game.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
