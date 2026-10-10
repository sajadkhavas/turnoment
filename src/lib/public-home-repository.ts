import { getDataAdapterMode } from "./data-adapter";
import type { PublicHomeRepository } from "./public-home-contract";
import { MockPublicHomeRepository } from "./public-home-data";
import { ApiPublicHomeRepository } from "./public-home-http-repository";

export function selectPublicHomeRepository(): PublicHomeRepository {
  return getDataAdapterMode() === "api"
    ? new ApiPublicHomeRepository()
    : new MockPublicHomeRepository();
}

export const publicHomeRepository = selectPublicHomeRepository();
