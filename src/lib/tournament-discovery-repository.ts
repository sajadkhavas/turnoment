import type { TournamentDiscoveryRepository } from "./tournament-discovery-contract";
import { MockTournamentDiscoveryRepository } from "./tournament-discovery-data";
import { DjangoTournamentDiscoveryRepository } from "./tournament-discovery-http-repository";

export function selectTournamentDiscoveryRepository(): TournamentDiscoveryRepository {
  const adapter = import.meta.env.VITE_DATA_ADAPTER?.trim().toLowerCase();

  if (adapter === "mock") return new MockTournamentDiscoveryRepository();
  if (adapter === "django") return new DjangoTournamentDiscoveryRepository();

  return import.meta.env.PROD ? new DjangoTournamentDiscoveryRepository() : new MockTournamentDiscoveryRepository();
}

export const tournamentDiscoveryRepository = selectTournamentDiscoveryRepository();
