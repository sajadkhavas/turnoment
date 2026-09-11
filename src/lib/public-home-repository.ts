import type { PublicHomeRepository } from "./public-home-contract";
import { MockPublicHomeRepository } from "./public-home-data";
import { DjangoPublicHomeRepository } from "./public-home-http-repository";

export function selectPublicHomeRepository(): PublicHomeRepository {
  const adapter = import.meta.env.VITE_DATA_ADAPTER?.trim().toLowerCase();

  if (adapter === "mock") return new MockPublicHomeRepository();
  if (adapter === "django") return new DjangoPublicHomeRepository();

  // Development/test stays deterministic for visual and contract QA. Production
  // fails toward the real HTTP adapter rather than silently serving fabricated data.
  return import.meta.env.PROD ? new DjangoPublicHomeRepository() : new MockPublicHomeRepository();
}

export const publicHomeRepository = selectPublicHomeRepository();
