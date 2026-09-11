import { MockChallengeHubRepository, type ChallengeHubRepository } from "./challenge-hub-data";
import { DjangoChallengeHubRepository } from "./challenge-hub-http-repository";

export const challengeHubRepository: ChallengeHubRepository =
  import.meta.env.VITE_DATA_ADAPTER === "django"
    ? new DjangoChallengeHubRepository()
    : new MockChallengeHubRepository();