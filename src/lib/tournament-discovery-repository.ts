import { getDataAdapterMode } from "./data-adapter";
import type { TournamentDiscoveryRepository } from "./tournament-discovery-contract";
import { MockTournamentDiscoveryRepository } from "./tournament-discovery-data";
import { ApiTournamentDiscoveryRepository } from "./tournament-discovery-http-repository";

export function selectTournamentDiscoveryRepository(): TournamentDiscoveryRepository {
  return getDataAdapterMode() === "api"
    ? new ApiTournamentDiscoveryRepository()
    : new MockTournamentDiscoveryRepository();
}

export const tournamentDiscoveryRepository = selectTournamentDiscoveryRepository();
