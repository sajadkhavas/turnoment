import { getDataAdapterMode } from "./data-adapter";
import { MockMatchDisputeRepository } from "./match-dispute-data";
import { ApiMatchDisputeRepository } from "./match-dispute-http-repository";

export const matchDisputeRepository =
  getDataAdapterMode() === "api" ? new ApiMatchDisputeRepository() : new MockMatchDisputeRepository();
