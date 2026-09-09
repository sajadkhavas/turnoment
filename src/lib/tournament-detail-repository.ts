import type {
  RegistrationActionResult,
  RegistrationRequest,
  TournamentDetail,
  TournamentRegistrationContext,
} from "./tournament-detail-contract";
import type { PlayerSession } from "./player-session";

export interface TournamentDetailRepository {
  getByIdentifier(identifier: string): Promise<TournamentDetail | null>;
  getRegistrationContext(
    identifier: string,
    session: PlayerSession,
  ): Promise<TournamentRegistrationContext | null>;
  register(
    identifier: string,
    request: RegistrationRequest,
  ): Promise<RegistrationActionResult>;
}
