# F24 — Rules Page Recertification Closeout

Status at document creation:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/rules`

Target route status: `FINAL_CURRENT`

Tracking Issue: `#107`

This is a non-recursive closeout snapshot. It records only evidence that already exists when this document is created. The future closeout head/merge/frozen-main SHA and terminal post-closeout CI/artifact/digest facts are intentionally not self-recorded here; they belong in Issue #107 after they exist.

## 1. Exact source lock

Frontend START_SHA:

`b3143885a4aacc4301a952eb24bdad608b594d3b`

Implementation branch:

`phase/f24-rules-recertification`

Implementation head:

`b11101bfd6261360a31e66e10e2bd5b08c260e63`

Implementation PR:

`#108` — MERGED with expected-head lock.

Implementation merge / accepted main / closeout base:

`3e1f4747997afda1c4c275db93f2905379d36a37`

Closeout branch:

`closeout/f24-rules-recertification`

## 2. Specialist-input synthesis

F24 deliberately combined, rather than blindly copied, three supplied specialist outputs:
- TypeScript/TanStack: repository boundary, strict runtime validation, SSR and contract tests;
- UI/UX: reading-first policy layout, grouped sections, responsive quick navigation, accessible anchors;
- SEO/policy: researched pre-participation intent, final Persian copy/metadata, cannibalization boundaries and rejection of unsupported legacy policy claims.

Rejected proposals included an invented rules endpoint/env var, fabricated non-null policy version/effective dates, generic theme values where Turnoment tokens existed, and unverified legal/product claims.

## 3. Accepted permanent architecture

`Route → loader → RulesPageRepository → strict RulesPageDocument validation → RulesPage UI`

Current production authority is reviewed, version-controlled policy content behind the repository interface.

No runtime backend rules endpoint is claimed. A future HTTP/admin-backed adapter may implement the same repository interface without rebuilding the route/UI.

Backend NEXT remains independently `P02 — Games / Catalog Foundation`.

## 4. Product-policy acceptance

Product owner approved these platform-wide baseline principles:
1. participant-provided registration/coordination information must be accurate and current;
2. cheating, collusion and deliberate result manipulation are prohibited;
3. respectful conduct toward players, hosts, organizers and event staff is required;
4. players must review and follow the rules published for the specific tournament they enter.

Event-specific operational details—including timing/check-in, eligibility, format, equipment, venue and event-specific requirements—belong to tournament detail.

Explicitly rejected as unsupported global policy:
- 30-minute early-arrival requirement;
- 15-minute technical-loss rule;
- mandatory ID for all participants;
- referee approval requirement for personal controllers;
- elimination/ranking deduction as an automatic sanction;
- 24-hour/full-refund guarantee or any invented refund timeline.

No unapproved sanction, refund, identity, age, dispute, payment or legal rule is implied by F24.

## 5. Public SEO / final-copy acceptance

Page purpose: explain which participation rules are common across Turnoment and which operational details must be checked on the individual tournament.

Audience: players considering registration, preparing to register or checking participation expectations.

Primary intent: informational / pre-participation.

Final H1:

`قوانین شرکت در تورنمنت‌های Turnoment`

Final title:

`قوانین و شرایط شرکت در تورنمنت‌ها | Turnoment`

Final description:

`قوانین عمومی شرکت در تورنمنت‌های Turnoment را بخوانید و ببینید کدام شرایط در همه رقابت‌ها مشترک است و کدام جزئیات در صفحه هر تورنمنت اعلام می‌شود.`

Canonical: `/rules`.

Robots: `index,follow`.

Primary CTA: `مشاهده تورنمنت‌ها` → `/tournaments`.

No page-specific rich-result schema is added. `BreadcrumbList` is omitted because no visible breadcrumb exists; FAQ/Article/Event markup would misrepresent this route or add schema merely for coverage.

## 6. Accessibility / responsive acceptance

The accepted UI has:
- one `<main>` and one primary H1;
- semantic section hierarchy;
- real fragment anchors that remain useful in SSR HTML without client state;
- `scroll-mt-*` for anchored sections;
- visible keyboard focus;
- practical target sizes;
- horizontal quick navigation on narrow mobile screens;
- sticky desktop navigation without squeezing the reading column;
- no accordion/animation dependency.

Automated screenshots cover 375/390/430/768/1024/1440. Manual review found no accepted horizontal overflow, clipping or sidebar collision.

## 7. Exact implementation diff evidence

START → implementation head `b11101bfd6261360a31e66e10e2bd5b08c260e63`:
- ahead `1` / behind `0`;
- exactly `1` implementation commit;
- exactly `8` changed files;
- no package/lock/dependency mutation;
- frozen public-route source untouched.

Implementation-owned files:
- `.github/workflows/f24-rules-quality.yml`;
- `docs/workstreams/F24_RULES_RECERTIFICATION.md`;
- `src/components/rules/rules-page.tsx`;
- `src/lib/rules-page-content.ts`;
- `src/lib/rules-page-contract.spec.ts`;
- `src/lib/rules-page-contract.ts`;
- `src/lib/rules-page-repository.ts`;
- `src/routes/rules.tsx`.

## 8. Exact-head QA evidence

On exact implementation head `b11101bfd6261360a31e66e10e2bd5b08c260e63`:
- F24 `34707551043` — PASS — artifact `10302685750` — digest `sha256:8504a47e1e80f283e460572e6d69812b5f899bd60b88a02fe4d8b9b54c8d705a`;
- Full `34707550985` — PASS — artifact `10301957784` — digest `sha256:1074ab071c9c78416e810435b1656f238de3dc11cf227d215c97b9c0fca86b47`.

## 9. Implementation PR-context QA evidence

PR #108 pre-merge:
- mergeable `true`;
- unresolved review threads `0`;
- exact live `main` remained F24 START;
- expected head `b11101bfd6261360a31e66e10e2bd5b08c260e63` used.

PR-context gates:
- F24 `34710086614` — PASS — artifact `10303535413` — digest `sha256:1f6c8b8c2d9efe5cc82088774f042b96f60af02894c92d09b3232e3a4a8c978b`;
- Full `34710086598` — PASS — artifact `10302723472` — digest `sha256:8330d3959aaba5c7ccfec82214669a622e53d2a5b63d3c2c8b869924d31b56d6`.

Expected-head merge succeeded.

Implementation merge/main:

`3e1f4747997afda1c4c275db93f2905379d36a37`

## 10. Post-main implementation QA evidence

Accepted implementation main `3e1f4747997afda1c4c275db93f2905379d36a37`:
- F24 `34710368111` — PASS — artifact `10302858188` — digest `sha256:0d1099a0fe6858595adc6437ed9ff35ee67a846a47e21d9bb215343d107e9d60`;
- Full `34710368093` — PASS — artifact `10303176790` — digest `sha256:7c83f34d566af8797e34f9a05911fe62c74ca1bc30e8c6ccaee2b1a7e2672dcb`.

Exact live frontend `main` was reverified at the implementation SHA after post-main QA. Implementation acceptance evidence is recorded in Issue #107.

## 11. Route registry decision

Because implementation is merged and required post-main implementation gates are green, `/rules` is eligible for non-recursive promotion to `FINAL_CURRENT`.

This route-level promotion does not itself mean the F24 workstream is terminally frozen. Terminal workstream status still requires closeout merge and terminal frozen-main evidence in Issue #107.

## 12. Documentation-only closeout scope

This closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F24_RULES_RECERTIFICATION.md`;
4. `docs/workstreams/F24_CLOSEOUT.md`.

Exactly one closeout commit is allowed. No source code, package, lockfile, workflow, runtime configuration, dependency or backend phase change is authorized.

## 13. Remaining terminal gates

After this closeout snapshot is committed, F24 still requires:
1. exact closeout compare: ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to main without auto-closing Issue #107;
3. every actually-triggered PR-context Full + F24 + frozen-route regression gate PASS;
4. mergeable=true and unresolved review threads=0;
5. exact live-main lock at implementation merge SHA before closeout merge;
6. expected-head closeout merge;
7. terminal frozen-main Full + F24 + frozen-route regressions PASS;
8. terminal artifact IDs and SHA-256 digests recorded in Issue #107;
9. exact live frontend main reverified;
10. Issue #107 updated with terminal evidence and CLOSED / COMPLETED.

Only after those future facts exist may the workstream be reported:

`F24 — DONE / MERGED / FROZEN — FINAL_CURRENT`

## 14. NEXT after F24 terminal freeze

Next public competitive recertification candidate:

`/tournaments/$id` — currently `FINAL_PRE_SEO`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
