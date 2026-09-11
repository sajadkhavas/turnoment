import { MockChallengeHubRepository } from "./challenge-hub-data";
import { DjangoChallengeHubRepository } from "./challenge-hub-http-repository";
import type { ChallengeHubRepository } from "./challenge-hub-contract";

function selectChallengeHubRepository(): ChallengeHubRepository {
  const adapter = import.meta.env.VITE_DATA_ADAPTER?.trim().toLowerCase();
  if (adapter === "django") return new DjangoChallengeHubRepository();
  return new MockChallengeHubRepository();
}

export const challengeHubRepository = selectChallengeHubRepository();
