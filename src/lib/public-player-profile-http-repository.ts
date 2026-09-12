import {
  parsePublicPlayerUsername,
  publicPlayerProfileSchema,
  type PublicPlayerProfileLoadResult,
  type PublicPlayerProfileRepository,
} from "./public-player-profile-contract";

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) {
    throw new Error("VITE_API_BASE_URL is required for the production public player profile adapter.");
  }
  return configured.endsWith("/") ? configured : `${configured}/`;
}

export class DjangoPublicPlayerProfileRepository implements PublicPlayerProfileRepository {
  async getByUsername(username: string): Promise<PublicPlayerProfileLoadResult> {
    const parsedUsername = parsePublicPlayerUsername(username);
    if (!parsedUsername) return { state: "not_found" };

    const url = new URL(
      `api/v1/players/${encodeURIComponent(parsedUsername)}/public-profile/`,
      apiBaseUrl(),
    );

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (response.status === 404) return { state: "not_found" };
    if (!response.ok) {
      throw new Error(`Public player profile request failed with HTTP ${response.status}.`);
    }

    const profile = publicPlayerProfileSchema.parse(await response.json());
    if (profile.username !== parsedUsername) {
      throw new Error("Public player profile identity did not match the requested username.");
    }

    return { state: "published", profile };
  }
}
