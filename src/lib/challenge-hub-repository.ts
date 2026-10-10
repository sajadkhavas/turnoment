import { getDataAdapterMode } from "./data-adapter";
import { MockChallengeHubRepository } from "./challenge-hub-data";
import { ApiChallengeHubRepository } from "./challenge-hub-http-repository";
import type { ChallengeHubRepository } from "./challenge-hub-contract";

function selectChallengeHubRepository(): ChallengeHubRepository {
  const adapter = getDataAdapterMode();
  if (adapter === "api") return new ApiChallengeHubRepository();
  return new MockChallengeHubRepository();
}

export const challengeHubRepository = selectChallengeHubRepository();
