import { getDataAdapterMode } from "./data-adapter";
import { MockMyTournamentsRepository, type MyTournamentsRepository } from "./my-tournaments-data";
import { ApiMyTournamentsRepository } from "./my-tournaments-http-repository";

export const myTournamentsRepository: MyTournamentsRepository =
  getDataAdapterMode() === "api"
    ? new ApiMyTournamentsRepository()
    : new MockMyTournamentsRepository();
