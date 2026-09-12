import type { HostApplicationRepository } from "./host-application-contract";
import { MockHostApplicationRepository } from "./host-application-fixture";
import { DjangoHostApplicationRepository } from "./host-application-http-repository";

export function selectHostApplicationRepository(): HostApplicationRepository {
  const adapter = import.meta.env.VITE_DATA_ADAPTER?.trim().toLowerCase();
  if (adapter === "mock") return new MockHostApplicationRepository();
  if (adapter === "django") return new DjangoHostApplicationRepository();
  return import.meta.env.PROD ? new DjangoHostApplicationRepository() : new MockHostApplicationRepository();
}

export const hostApplicationRepository = selectHostApplicationRepository();
