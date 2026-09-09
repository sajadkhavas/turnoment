import { DjangoTournamentDetailRepository } from "./tournament-detail-http-repository";
import { FixtureTournamentDetailRepository } from "./tournament-detail-fixture";
import type { TournamentDetailRepository } from "./tournament-detail-repository";

export const tournamentDetailRepository: TournamentDetailRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django"
    ? new DjangoTournamentDetailRepository()
    : new FixtureTournamentDetailRepository();
