import { getDataAdapterMode } from "./data-adapter";
import type { HostApplicationRepository } from "./host-application-contract";
import { MockHostApplicationRepository } from "./host-application-fixture";
import { ApiHostApplicationRepository } from "./host-application-http-repository";

export function selectHostApplicationRepository(): HostApplicationRepository {
  return getDataAdapterMode() === "api"
    ? new ApiHostApplicationRepository()
    : new MockHostApplicationRepository();
}

export const hostApplicationRepository = selectHostApplicationRepository();
