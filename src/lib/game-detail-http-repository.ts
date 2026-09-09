import { gameDetailSchema, type GameDetail } from "./game-detail-contract";
import type { GameDetailRepository } from "./game-detail-repository";

function apiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (!configured) {
    throw new Error("VITE_API_BASE_URL is required when the Django game adapter is enabled.");
  }
  return configured.endsWith("/") ? configured : `${configured}/`;
}

function gamePath(identifier: string) {
  return `api/v1/games/${encodeURIComponent(identifier)}/`;
}

export class DjangoGameDetailRepository implements GameDetailRepository {
  async getByIdentifier(identifier: string): Promise<GameDetail | null> {
    const response = await fetch(new URL(gamePath(identifier), apiBaseUrl()), {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    if (response.status === 404) return null;
    if (!response.ok) {
      throw new Error(`Game detail request failed with HTTP ${response.status}.`);
    }

    return gameDetailSchema.parse(await response.json());
  }
}
