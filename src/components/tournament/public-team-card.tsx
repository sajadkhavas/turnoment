import { Link } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { useState } from "react";
import { safeTeamImage, type TeamCard } from "@/lib/public-teams";

export function TeamImage({ team }: { team: TeamCard }) {
  const src = safeTeamImage(team.image);
  const [failed, setFailed] = useState<string>();
  return src && failed !== src ? (
    <img src={src} alt="" width={64} height={64} loading="lazy" referrerPolicy="no-referrer"
      onError={() => setFailed(src)} className="size-16 shrink-0 rounded-2xl object-cover" />
  ) : (
    <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
      <Users aria-hidden="true" />
    </span>
  );
}

export function PublicTeamCard({ team }: { team: TeamCard }) {
  return (
    <Link to="/teams/$id" params={{ id: team.id }} search={{ page: 1 }}
      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:border-primary">
      <TeamImage team={team} />
      <div className="min-w-0">
        <p className="break-words font-black">{team.name}</p>
        <p className="text-sm text-muted-foreground">{team.center.name}</p>
        <p className="mt-1 text-sm text-primary">سطح {team.level.toLocaleString("fa")} · {team.wins.toLocaleString("fa")} برد</p>
      </div>
    </Link>
  );
}
