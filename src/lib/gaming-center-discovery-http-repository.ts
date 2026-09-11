import {
  gamingCenterDiscoveryPageSchema,
  type GamingCenterDiscoveryPageData,
  type GamingCenterDiscoveryQuery,
  type GamingCenterDiscoveryRepository,
} from "./gaming-center-discovery-contract";

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) {
    throw new Error("VITE_API_BASE_URL is required for the production gaming center discovery adapter.");
  }
  return configured.endsWith("/") ? configured : `${configured}/`;
}

export class DjangoGamingCenterDiscoveryRepository implements GamingCenterDiscoveryRepository {
  async getDiscovery(query: GamingCenterDiscoveryQuery): Promise<GamingCenterDiscoveryPageData> {
    const url = new URL("api/v1/centers/", apiBaseUrl());
    if (query.city) url.searchParams.set("city", query.city);
    if (query.page > 1) url.searchParams.set("page", String(query.page));

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Gaming center discovery request failed with HTTP ${response.status}.`);
    }

    return gamingCenterDiscoveryPageSchema.parse(await response.json());
  }
}
