import type { GamingCenterDiscoveryRepository } from "./gaming-center-discovery-contract";
import { MockGamingCenterDiscoveryRepository } from "./gaming-center-discovery-fixture";
import { DjangoGamingCenterDiscoveryRepository } from "./gaming-center-discovery-http-repository";

export function selectGamingCenterDiscoveryRepository(): GamingCenterDiscoveryRepository {
  const adapter = import.meta.env.VITE_DATA_ADAPTER?.trim().toLowerCase();

  if (adapter === "mock") return new MockGamingCenterDiscoveryRepository();
  if (adapter === "django") return new DjangoGamingCenterDiscoveryRepository();

  return import.meta.env.PROD
    ? new DjangoGamingCenterDiscoveryRepository()
    : new MockGamingCenterDiscoveryRepository();
}

export const gamingCenterDiscoveryRepository = selectGamingCenterDiscoveryRepository();
