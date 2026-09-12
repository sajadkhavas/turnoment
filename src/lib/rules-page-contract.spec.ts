import { parseRulesPageDocument, rulesPageDocumentSchema } from "./rules-page-contract";
import { RULES_PAGE_CONTENT } from "./rules-page-content";
import { rulesPageRepository } from "./rules-page-repository";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const parsed = parseRulesPageDocument(RULES_PAGE_CONTENT);
assert(parsed.schemaVersion === 1, "Rules schemaVersion must remain v1.");
assert(parsed.publicationState === "published", "Public rules document must be published.");
assert(parsed.seo.canonical === "/rules", "Rules canonical must stay /rules.");
assert(parsed.seo.robots === "index,follow", "Recertified public rules must remain indexable.");
assert(parsed.policyMeta.version === null, "Unapproved public policy version must not be fabricated.");
assert(parsed.policyMeta.effectiveDate === null, "Unapproved effective date must not be fabricated.");

const publicText = JSON.stringify(RULES_PAGE_CONTENT);
for (const forbidden of ["۳۰ دقیقه", "15 دقیقه", "۱۵ دقیقه", "کارت شناسایی", "کسر امتیاز", "۲۴ ساعت", "بازگشت کامل"]) {
  assert(!publicText.includes(forbidden), `Unsupported legacy policy text must stay absent: ${forbidden}`);
}

const firstSection = RULES_PAGE_CONTENT.sections[0];
assert(firstSection, "Rules fixture requires at least one section.");

const duplicateSections = {
  ...RULES_PAGE_CONTENT,
  sections: [...RULES_PAGE_CONTENT.sections, { ...firstSection }],
};
assert(!rulesPageDocumentSchema.safeParse(duplicateSections).success, "Duplicate section IDs must be rejected.");

const firstRule = firstSection.rules[0];
assert(firstRule, "Rules fixture requires at least one rule.");

const duplicateRuleDocument = {
  ...RULES_PAGE_CONTENT,
  sections: [
    ...RULES_PAGE_CONTENT.sections,
    {
      id: "duplicate-rule-section",
      title: "بخش آزمون",
      description: "این بخش فقط برای بررسی اعتبارسنجی استفاده می‌شود.",
      rules: [{ ...firstRule }],
    },
  ],
};
assert(!rulesPageDocumentSchema.safeParse(duplicateRuleDocument).success, "Duplicate rule IDs must be rejected globally.");

const externalLinkDocument = {
  ...RULES_PAGE_CONTENT,
  relatedLinks: [{ id: "external", label: "خارجی", href: "https://example.com" }],
};
assert(!rulesPageDocumentSchema.safeParse(externalLinkDocument).success, "External related links must be rejected by the public contract.");

const unknownFieldDocument = {
  ...RULES_PAGE_CONTENT,
  internalModerationNotes: "must not become public",
};
assert(!rulesPageDocumentSchema.safeParse(unknownFieldDocument).success, "Unexpected public policy fields must be rejected.");

const invalidDateDocument = {
  ...RULES_PAGE_CONTENT,
  policyMeta: {
    ...RULES_PAGE_CONTENT.policyMeta,
    effectiveDate: "2026-02-30",
  },
};
assert(!rulesPageDocumentSchema.safeParse(invalidDateDocument).success, "Invalid policy dates must be rejected.");

const repositoryDocument = await rulesPageRepository.getPublishedRules();
assert(repositoryDocument.heading === RULES_PAGE_CONTENT.heading, "Production rules repository must return the validated reviewed document.");

console.log("F24 rules page contract checks passed.");
