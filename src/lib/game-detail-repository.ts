import type { GameDetail } from "./game-detail-contract";

export interface GameDetailRepository {
  getByIdentifier(identifier: string): Promise<GameDetail | null>;
}
