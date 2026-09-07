import { mockTournamentRepository } from "./mock-tournament-repository";
import type { TournamentRepository } from "./tournament-repository";

/**
 * Frontend composition root for tournament reads.
 *
 * Pages and route loaders import this port instead of importing mock data.
 * When Django endpoints are available, the active adapter is swapped here
 * (or injected through route context) without rewriting page components.
 */
export const tournamentRepository: TournamentRepository = mockTournamentRepository;

export type { TournamentRepository } from "./tournament-repository";
