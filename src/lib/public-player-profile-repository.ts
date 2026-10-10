import { getDataAdapterMode } from "./data-adapter";
import type { PublicPlayerProfileRepository } from "./public-player-profile-contract";
import { MockPublicPlayerProfileRepository } from "./public-player-profile-fixture";
import { ApiPublicPlayerProfileRepository } from "./public-player-profile-http-repository";

export function selectPublicPlayerProfileRepository(): PublicPlayerProfileRepository {
  return getDataAdapterMode() === "api"
    ? new ApiPublicPlayerProfileRepository()
    : new MockPublicPlayerProfileRepository();
}

export const publicPlayerProfileRepository = selectPublicPlayerProfileRepository();
