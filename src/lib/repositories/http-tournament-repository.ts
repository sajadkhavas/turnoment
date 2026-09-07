import {
  tournamentDetailResponseSchema,
  tournamentListResponseSchema,
  type TournamentDiscoveryResult,
  type TournamentQuery,
  type TournamentSummary,
} from "@/lib/contracts/tournament";
import { PublicApiError, type PublicApiClient } from "@/lib/api/public-client";
import type { TournamentRepository } from "./tournament-repository";

function queryForApi(query: TournamentQuery) {
  return {
    game: query.game === "all" ? undefined : query.game,
    city: query.city === "all" ? undefined : query.city,
    date: query.date === "all" ? undefined : query.date,
    status: query.status === "all" ? undefined : query.status,
    format: query.format === "all" ? undefined : query.format,
    price: query.price === "all" ? undefined : query.price,
    verified: query.verified ? true : undefined,
    sort: query.sort === "suggested" ? undefined : query.sort,
  };
}

/**
 * Public Django adapter matching the frontend contract.
 *
 * This adapter is intentionally NOT activated until the backend endpoints are
 * implemented and accepted. Swapping the active adapter happens in
 * `repositories/tournaments.ts`, not inside route/components.
 */
export function createHttpTournamentRepository(client: PublicApiClient): TournamentRepository {
  return {
    async list(query: TournamentQuery): Promise<TournamentDiscoveryResult> {
      const payload = await client.get<unknown>("api/v1/tournaments/", queryForApi(query));
      const parsed = tournamentListResponseSchema.parse(payload);
      return {
        items: parsed.items,
        stats: parsed.meta,
        facets: parsed.facets,
      };
    },

    async getByIdOrSlug(idOrSlug: string): Promise<TournamentSummary | undefined> {
      try {
        const payload = await client.get<unknown>(`api/v1/tournaments/${encodeURIComponent(idOrSlug)}/`);
        return tournamentDetailResponseSchema.parse(payload).item;
      } catch (error) {
        if (error instanceof PublicApiError && error.status === 404) return undefined;
        throw error;
      }
    },
  };
}
