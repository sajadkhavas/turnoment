import type { ReactNode } from "react";

import { MobileBottomNav } from "./mobile-bottom-nav";
import { TournamentFooter } from "./tournament-footer";
import { TournamentHeader } from "./tournament-header";

export function TournamentLayout({
  children,
  pageOwnsMain = false,
}: {
  children: ReactNode;
  pageOwnsMain?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background pb-24 lg:pb-0">
      <TournamentHeader />

      {pageOwnsMain ? (
        <div className="flex-1">{children}</div>
      ) : (
        <main className="flex-1">{children}</main>
      )}

      <TournamentFooter />

      <MobileBottomNav />
    </div>
  );
}