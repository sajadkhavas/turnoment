import { MockMyMatchesRepository, type MyMatchesRepository } from "./my-matches-data";
import { DjangoMyMatchesRepository } from "./my-matches-http-repository";

export const myMatchesRepository: MyMatchesRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django"
    ? new DjangoMyMatchesRepository()
    : new MockMyMatchesRepository();
