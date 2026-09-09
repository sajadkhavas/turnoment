import { MockResultSubmissionRepository } from "./result-submission-data";
import { DjangoResultSubmissionRepository } from "./result-submission-http-repository";
import type { ResultSubmissionRepository } from "./result-submission-contract";

export const resultSubmissionRepository: ResultSubmissionRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django"
    ? new DjangoResultSubmissionRepository()
    : new MockResultSubmissionRepository();
