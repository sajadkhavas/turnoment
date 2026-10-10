import { getDataAdapterMode } from "./data-adapter";
import { MockMyMatchesRepository, type MyMatchesRepository } from "./my-matches-data";
import { ApiMyMatchesRepository } from "./my-matches-http-repository";

export const myMatchesRepository: MyMatchesRepository =
  getDataAdapterMode() === "api"
    ? new ApiMyMatchesRepository()
    : new MockMyMatchesRepository();
