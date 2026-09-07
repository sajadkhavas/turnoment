import type {
  TournamentDiscoveryResult,
  TournamentQuery,
  TournamentSummary,
} from "@/lib/contracts/tournament";

export interface TournamentRepository {
  list(query: TournamentQuery): Promise<TournamentDiscoveryResult>;
  getByIdOrSlug(idOrSlug: string): Promise<TournamentSummary | undefined>;
}
