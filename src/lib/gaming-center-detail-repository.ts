import type { GamingCenterDetailRepository } from "./gaming-center-detail-contract";
import { MockGamingCenterDetailRepository } from "./gaming-center-detail-fixture";
import { DjangoGamingCenterDetailRepository } from "./gaming-center-detail-http-repository";

export function selectGamingCenterDetailRepository(): GamingCenterDetailRepository {
  const adapter = import.meta.env.VITE_DATA_ADAPTER?.trim().toLowerCase();

  if (adapter === "mock") return new MockGamingCenterDetailRepository();
  if (adapter === "django") return new DjangoGamingCenterDetailRepository();

  return import.meta.env.PROD
    ? new DjangoGamingCenterDetailRepository()
    : new MockGamingCenterDetailRepository();
}

export const gamingCenterDetailRepository = selectGamingCenterDetailRepository();
