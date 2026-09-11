import { publicHomePageSchema, type PublicHomePageData, type PublicHomeRepository } from "./public-home-contract";

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) {
    throw new Error("VITE_API_BASE_URL is required for the production public Home adapter.");
  }
  return configured.endsWith("/") ? configured : `${configured}/`;
}

export class DjangoPublicHomeRepository implements PublicHomeRepository {
  async getHome(): Promise<PublicHomePageData> {
    const response = await fetch(new URL("api/v1/discovery/home/", apiBaseUrl()), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Public Home request failed with HTTP ${response.status}.`);
    }

    return publicHomePageSchema.parse(await response.json());
  }
}
