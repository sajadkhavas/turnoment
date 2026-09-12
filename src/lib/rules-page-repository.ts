import { parseRulesPageDocument, type RulesPageDocument } from "./rules-page-contract";
import { RULES_PAGE_CONTENT } from "./rules-page-content";

export interface RulesPageRepository {
  getPublishedRules(): Promise<RulesPageDocument>;
}

export class VersionControlledRulesPageRepository implements RulesPageRepository {
  private readonly source: unknown;

  constructor(source: unknown = RULES_PAGE_CONTENT) {
    this.source = source;
  }

  async getPublishedRules(): Promise<RulesPageDocument> {
    return parseRulesPageDocument(this.source);
  }
}

export const rulesPageRepository: RulesPageRepository = new VersionControlledRulesPageRepository();
