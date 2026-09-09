import { MockMatchDisputeRepository } from "./match-dispute-data";
import { DjangoMatchDisputeRepository } from "./match-dispute-http-repository";

export const matchDisputeRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django" ? new DjangoMatchDisputeRepository() : new MockMatchDisputeRepository();
