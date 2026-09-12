import type { PublicPlayerProfileRepository } from "./public-player-profile-contract";
import { MockPublicPlayerProfileRepository } from "./public-player-profile-fixture";
import { DjangoPublicPlayerProfileRepository } from "./public-player-profile-http-repository";

export function selectPublicPlayerProfileRepository(): PublicPlayerProfileRepository {
  const adapter = import.meta.env.VITE_DATA_ADAPTER?.trim().toLowerCase();

  if (adapter === "mock") return new MockPublicPlayerProfileRepository();
  if (adapter === "django") return new DjangoPublicPlayerProfileRepository();

  return import.meta.env.PROD
    ? new DjangoPublicPlayerProfileRepository()
    : new MockPublicPlayerProfileRepository();
}

export const publicPlayerProfileRepository = selectPublicPlayerProfileRepository();
