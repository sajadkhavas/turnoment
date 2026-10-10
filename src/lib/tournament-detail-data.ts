import { getDataAdapterMode } from "./data-adapter";
import { ApiTournamentDetailRepository } from "./tournament-detail-http-repository";
import { FixtureTournamentDetailRepository } from "./tournament-detail-fixture";
import type { TournamentDetailRepository } from "./tournament-detail-repository";

export const tournamentDetailRepository: TournamentDetailRepository =
  getDataAdapterMode() === "api"
    ? new ApiTournamentDetailRepository()
    : new FixtureTournamentDetailRepository();
