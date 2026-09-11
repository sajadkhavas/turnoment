import {
  compactTournamentDiscoverySearch,
  tournamentDiscoveryPageSchema,
  type TournamentDiscoveryPageData,
  type TournamentDiscoveryQuery,
  type TournamentDiscoveryRepository,
} from "./tournament-discovery-contract";

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) {
    throw new Error("VITE_API_BASE_URL is required for the production tournament discovery adapter.");
  }
  return configured.endsWith("/") ? configured : `${configured}/`;
}

export class DjangoTournamentDiscoveryRepository implements TournamentDiscoveryRepository {
  async getDiscovery(query: TournamentDiscoveryQuery): Promise<TournamentDiscoveryPageData> {
    const url = new URL("api/v1/tournaments/", apiBaseUrl());
    const search = compactTournamentDiscoverySearch(query);
    for (const [key, value] of Object.entries(search)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Tournament discovery request failed with HTTP ${response.status}.`);
    }

    return tournamentDiscoveryPageSchema.parse(await response.json());
  }
}
