import { getDataAdapterMode } from "./data-adapter";
import type { GamingCenterDetailRepository } from "./gaming-center-detail-contract";
import { MockGamingCenterDetailRepository } from "./gaming-center-detail-fixture";
import { ApiGamingCenterDetailRepository } from "./gaming-center-detail-http-repository";

export function selectGamingCenterDetailRepository(): GamingCenterDetailRepository {
  return getDataAdapterMode() === "api"
    ? new ApiGamingCenterDetailRepository()
    : new MockGamingCenterDetailRepository();
}

export const gamingCenterDetailRepository = selectGamingCenterDetailRepository();
