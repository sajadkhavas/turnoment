import type {
  TournamentDiscoveryResult,
  TournamentQuery,
  TournamentSummary,
} from "@/lib/contracts/tournament";
import {
  discoveryStats,
  filterTournaments,
  getTournament,
} from "@/lib/tournament-data";
import type { TournamentRepository } from "./tournament-repository";

function copyTournament(tournament: TournamentSummary): TournamentSummary {
  return { ...tournament };
}

export const mockTournamentRepository: TournamentRepository = {
  async list(query: TournamentQuery): Promise<TournamentDiscoveryResult> {
    const items = filterTournaments(query).map(copyTournament);
    return {
      items,
      stats: { ...discoveryStats },
    };
  },

  async getByIdOrSlug(idOrSlug: string): Promise<TournamentSummary | undefined> {
    const tournament = getTournament(idOrSlug);
    return tournament ? copyTournament(tournament) : undefined;
  },
};
