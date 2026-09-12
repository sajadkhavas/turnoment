import { z } from "zod";

export const RULES_PAGE_SCHEMA_VERSION = 1 as const;
export const RULES_PAGE_CANONICAL = "/rules" as const;

const stableIdPattern = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

function isValidIsoCalendarDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

const nonEmptyText = (max: number) => z.string().trim().min(1).max(max);
const stableIdSchema = z.string().trim().min(1).max(96).regex(stableIdPattern);
const isoCalendarDateSchema = z.string().refine(isValidIsoCalendarDate, "Expected a valid YYYY-MM-DD calendar date.");

export const rulesPolicyMetaSchema = z.object({
  version: nonEmptyText(40).nullable(),
  effectiveDate: isoCalendarDateSchema.nullable(),
  lastSubstantiveRevisionDate: isoCalendarDateSchema.nullable(),
}).strict().superRefine((meta, context) => {
  if (meta.effectiveDate && meta.lastSubstantiveRevisionDate && meta.lastSubstantiveRevisionDate < meta.effectiveDate) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["lastSubstantiveRevisionDate"],
      message: "lastSubstantiveRevisionDate cannot be earlier than effectiveDate.",
    });
  }
});

export const rulesNoticeSchema = z.object({
  title: nonEmptyText(180),
  body: nonEmptyText(1600),
}).strict();

export const ruleItemSchema = z.object({
  id: stableIdSchema,
  title: nonEmptyText(180),
  body: nonEmptyText(2400),
}).strict();

export const rulesSectionSchema = z.object({
  id: stableIdSchema,
  title: nonEmptyText(180),
  description: nonEmptyText(700),
  rules: z.array(ruleItemSchema).min(1).max(12),
}).strict();

export const rulesRelatedLinkSchema = z.object({
  id: stableIdSchema,
  label: nonEmptyText(120),
  href: z.literal("/tournaments"),
}).strict();

export const rulesSeoSchema = z.object({
  title: nonEmptyText(180),
  description: nonEmptyText(320),
  canonical: z.literal(RULES_PAGE_CANONICAL),
  robots: z.literal("index,follow"),
  openGraph: z.object({
    title: nonEmptyText(180),
    description: nonEmptyText(320),
    type: z.literal("website"),
    url: z.literal(RULES_PAGE_CANONICAL),
  }).strict(),
}).strict();

export const rulesPageDocumentSchema = z.object({
  schemaVersion: z.literal(RULES_PAGE_SCHEMA_VERSION),
  publicationState: z.literal("published"),
  eyebrow: nonEmptyText(120),
  heading: nonEmptyText(180),
  summary: nonEmptyText(1200),
  policyMeta: rulesPolicyMetaSchema,
  scopeNotice: rulesNoticeSchema,
  precedenceNotice: rulesNoticeSchema,
  sections: z.array(rulesSectionSchema).min(1).max(12),
  relatedLinks: z.array(rulesRelatedLinkSchema).min(1).max(4),
  seo: rulesSeoSchema,
}).strict().superRefine((document, context) => {
  const sectionIds = new Set<string>();
  const ruleIds = new Set<string>();
  const relatedLinkIds = new Set<string>();

  document.sections.forEach((section, sectionIndex) => {
    if (sectionIds.has(section.id)) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ["sections", sectionIndex, "id"], message: `Duplicate section id: ${section.id}` });
    }
    sectionIds.add(section.id);

    section.rules.forEach((rule, ruleIndex) => {
      if (ruleIds.has(rule.id)) {
        context.addIssue({ code: z.ZodIssueCode.custom, path: ["sections", sectionIndex, "rules", ruleIndex, "id"], message: `Duplicate rule id: ${rule.id}` });
      }
      ruleIds.add(rule.id);
    });
  });

  document.relatedLinks.forEach((link, linkIndex) => {
    if (relatedLinkIds.has(link.id)) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ["relatedLinks", linkIndex, "id"], message: `Duplicate related link id: ${link.id}` });
    }
    relatedLinkIds.add(link.id);
  });
});

export type RulesPageDocument = z.infer<typeof rulesPageDocumentSchema>;
export type RulesSection = z.infer<typeof rulesSectionSchema>;
export type RuleItem = z.infer<typeof ruleItemSchema>;

export function parseRulesPageDocument(input: unknown): RulesPageDocument {
  return rulesPageDocumentSchema.parse(input);
}
