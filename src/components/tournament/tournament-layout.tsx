import type { ReactNode } from "react";
import { TournamentHeader } from "./tournament-header";
import { TournamentFooter } from "./tournament-footer";

export function TournamentLayout({
  children,
  pageOwnsMain = false,
}: {
  children: ReactNode;
  pageOwnsMain?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TournamentHeader />
      {pageOwnsMain ? <div className="flex-1">{children}</div> : <main className="flex-1">{children}</main>}
      <TournamentFooter />
    </div>
  );
}
