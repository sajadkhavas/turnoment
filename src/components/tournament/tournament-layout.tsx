import type { ReactNode } from "react";
import { TournamentHeader } from "./tournament-header";
import { TournamentFooter } from "./tournament-footer";

export function TournamentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TournamentHeader />
      <main className="flex-1">{children}</main>
      <TournamentFooter />
    </div>
  );
}
