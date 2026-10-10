import { getDataAdapterMode } from "./data-adapter";
import { MockResultSubmissionRepository } from "./result-submission-data";
import { ApiResultSubmissionRepository } from "./result-submission-http-repository";
import type { ResultSubmissionRepository } from "./result-submission-contract";

export const resultSubmissionRepository: ResultSubmissionRepository =
  getDataAdapterMode() === "api"
    ? new ApiResultSubmissionRepository()
    : new MockResultSubmissionRepository();
