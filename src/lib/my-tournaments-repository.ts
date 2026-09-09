import { MockMyTournamentsRepository, type MyTournamentsRepository } from "./my-tournaments-data";
import { DjangoMyTournamentsRepository } from "./my-tournaments-http-repository";

export const myTournamentsRepository: MyTournamentsRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django"
    ? new DjangoMyTournamentsRepository()
    : new MockMyTournamentsRepository();
