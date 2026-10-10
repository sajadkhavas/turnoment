import { getDataAdapterMode } from "./data-adapter";
import type { GamingCenterDiscoveryRepository } from "./gaming-center-discovery-contract";
import { MockGamingCenterDiscoveryRepository } from "./gaming-center-discovery-fixture";
import { ApiGamingCenterDiscoveryRepository } from "./gaming-center-discovery-http-repository";

export function selectGamingCenterDiscoveryRepository(): GamingCenterDiscoveryRepository {
  return getDataAdapterMode() === "api"
    ? new ApiGamingCenterDiscoveryRepository()
    : new MockGamingCenterDiscoveryRepository();
}

export const gamingCenterDiscoveryRepository = selectGamingCenterDiscoveryRepository();
