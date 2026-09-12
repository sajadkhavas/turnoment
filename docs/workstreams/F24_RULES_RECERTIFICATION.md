# F24 — Rules Page Recertification

Status: `IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/rules`

START_SHA: `b3143885a4aacc4301a952eb24bdad608b594d3b`

Tracking Issue: `#107`

Implementation branch: `phase/f24-rules-recertification`

Closeout branch: `closeout/f24-rules-recertification`

Target: `FINAL_CURRENT`

## 1. Mandatory preflight

Read from exact START before mutation:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `SEO_FINAL_COPY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- legacy `src/routes/rules.tsx`.

F23 Issue #104 was confirmed CLOSED / COMPLETED before F24 began. `/rules` was the protected NEXT frontend route.

## 2. Supplied specialist input synthesis

F24 reviewed three user-supplied specialist outputs rather than copying any one output directly:

1. TypeScript/TanStack proposal — accepted typed document contract, runtime validation, repository boundary, SSR and test ideas. Rejected as-is: invented `VITE_RULES_PUBLIC_ENDPOINT`, non-null synthetic policy dates/version, and incorrect `TournamentLayout` import path.
2. UI/UX proposal — accepted reading-first policy surface, compact hero, grouped semantic sections, mobile horizontal quick navigation, desktop sticky rail, narrow Persian reading column, plain fragment anchors, visible focus, no accordion/animation dependency.
3. SEO/policy research — accepted informational/pre-participation intent, separation of platform-wide policy from tournament-specific operations, final H1/title/description direction, no unsupported inherited policy claims, and no page-specific rich-result schema by default.

## 3. Official/current source audit

Reviewed current official guidance before implementation:
- TanStack Start / Router SSR, loader and document-head behavior;
- Google Search people-first content, title/snippet, canonical, crawlable-link and structured-data guidance;
- WCAG 2.2 focus visibility, semantics and practical target behavior.

Applied consequences:
- `ssr: true` is explicit;
- primary content comes through the route loader and is present in SSR HTML;
- route `head` owns title/description/robots/Open Graph/canonical;
- no browser-only primary-content fetch;
- no unsupported FAQ/Article/Event schema on `/rules`;
- interactive anchors/CTA retain visible keyboard focus.

## 4. Accepted design direction

F24 uses existing Turnoment public design tokens and masters rather than a new visual brand:
- `bg-background`, `bg-card`, `border-border`, `text-muted-foreground`, `text-primary`;
- premium dark RTL visual system;
- bounded prose width;
- grouped cards instead of a giant numbered wall;
- mobile horizontal quick navigation and desktop sticky rail;
- no new dependency, animation library, or frozen shared-component refactor.

Manual and automated responsive evidence covered `375`, `390`, `430`, `768`, `1024`, and `1440` widths with no accepted horizontal overflow, clipping or sidebar collision.

## 5. Search intent / final-copy lock

Purpose: answer which rules apply generally to Turnoment tournament participation and which details must be checked on the individual tournament.

Primary audience: players considering registration, preparing to register, or already registered and checking expectations.

Primary intent: informational / pre-participation.

Primary topic cluster: `قوانین و شرایط شرکت در تورنمنت‌های گیمینگ`.

Cannibalization boundary:
- `/tournaments` owns discovery/listing;
- `/games` and `/games/$slug` own game discovery/game competition context;
- `/centers` and `/centers/$id` own venue discovery/details;
- `/ranking` owns ranking mechanics;
- `/host` owns organizer acquisition;
- tournament detail owns timing, venue, eligibility, format, check-in, equipment and event-specific operating rules.

Final H1:

`قوانین شرکت در تورنمنت‌های Turnoment`

Final title:

`قوانین و شرایط شرکت در تورنمنت‌ها | Turnoment`

Final description:

`قوانین عمومی شرکت در تورنمنت‌های Turnoment را بخوانید و ببینید کدام شرایط در همه رقابت‌ها مشترک است و کدام جزئیات در صفحه هر تورنمنت اعلام می‌شود.`

Canonical: `/rules`.

Robots: `index,follow`.

Structured data: none page-specific. `BreadcrumbList` remains unnecessary because the accepted F24 UI has no visible breadcrumb.

Primary internal CTA: `مشاهده تورنمنت‌ها` → `/tournaments`.

Inbound crawlability already exists through the shared tournament footer; frozen shared footer source remains untouched.

## 6. Product-policy truth lock

Product owner explicitly approved these narrow platform-wide principles on 2026-09-12:
- participant-provided registration/coordination information must be accurate and current;
- cheating, collusion and deliberate result manipulation are prohibited;
- respectful conduct is required in interactions with players, hosts, organizers and event staff;
- event-specific published rules must be reviewed and followed for that event.

Precedence/ownership boundary:
- platform-wide baseline principles remain common;
- event-specific rules supplement operational details such as timing, format, equipment, venue and participation conditions;
- the event page is the operational source for those event-specific details.

F24 explicitly rejects these inherited statements as global product truth:
- no universal 30-minute early-arrival requirement;
- no universal 15-minute technical-loss rule;
- no universal ID-card requirement;
- no universal referee approval rule for personal controllers;
- no elimination/ranking-deduction sanction claim;
- no 24-hour full-refund promise.

No sanction, refund, withdrawal, identity-verification, age, dispute deadline, payment or legal promise is inferred from the approved baseline.

## 7. Permanent frontend boundary

F24 uses:

`Route → loader → RulesPageRepository → strict RulesPageDocument validation → RulesPage UI`

The current production repository is reviewed version-controlled public policy content. No backend rules endpoint is accepted as existing and Backend NEXT remains `P02 — Games / Catalog Foundation`.

A later HTTP/admin-backed repository can implement the same `RulesPageRepository` interface without reconstructing the page component tree.

There is no production fixture fallback and no invented API URL.

## 8. Policy metadata decision

Public `version`, `effectiveDate`, and `lastSubstantiveRevisionDate` are nullable in v1.

F24 does not fabricate a public version/date merely to appear current. Future approved policy versioning can enter through the same validated contract and UI.

## 9. Exact implementation ownership / compare

Implementation head:

`b11101bfd6261360a31e66e10e2bd5b08c260e63`

START → implementation head:
- ahead `1` / behind `0`;
- exactly `1` commit;
- exactly `8` changed files;
- no package/lock/dependency mutation;
- frozen public route source untouched.

Owned implementation files:
- `src/routes/rules.tsx`;
- `src/components/rules/rules-page.tsx`;
- `src/lib/rules-page-contract.ts`;
- `src/lib/rules-page-content.ts`;
- `src/lib/rules-page-repository.ts`;
- `src/lib/rules-page-contract.spec.ts`;
- `.github/workflows/f24-rules-quality.yml`;
- `docs/workstreams/F24_RULES_RECERTIFICATION.md`.

## 10. Exact-head QA

On exact implementation head `b11101bfd6261360a31e66e10e2bd5b08c260e63`:
- F24 `34707551043` — PASS — artifact `10302685750` — digest `sha256:8504a47e1e80f283e460572e6d69812b5f899bd60b88a02fe4d8b9b54c8d705a`;
- Full `34707550985` — PASS — artifact `10301957784` — digest `sha256:1074ab071c9c78416e810435b1656f238de3dc11cf227d215c97b9c0fca86b47`.

Focused evidence proves lint, contract tests, production build, typecheck, SSR final copy/head/canonical/robots, rejection of old brand/unsupported legacy rules, one-main semantics and responsive screenshots at all six target widths.

## 11. Implementation PR-context acceptance

PR #108:
- head `b11101bfd6261360a31e66e10e2bd5b08c260e63`;
- mergeable `true`;
- unresolved review threads `0`;
- exact live `main` remained F24 START before merge;
- expected-head merge lock used.

PR-context gates:
- F24 `34710086614` — PASS — artifact `10303535413` — digest `sha256:1f6c8b8c2d9efe5cc82088774f042b96f60af02894c92d09b3232e3a4a8c978b`;
- Full `34710086598` — PASS — artifact `10302723472` — digest `sha256:8330d3959aaba5c7ccfec82214669a622e53d2a5b63d3c2c8b869924d31b56d6`.

Implementation PR #108 merged successfully.

Implementation merge/main:

`3e1f4747997afda1c4c275db93f2905379d36a37`

## 12. Post-main implementation acceptance

On exact merge/main `3e1f4747997afda1c4c275db93f2905379d36a37`:
- F24 `34710368111` — PASS — artifact `10302858188` — digest `sha256:0d1099a0fe6858595adc6437ed9ff35ee67a846a47e21d9bb215343d107e9d60`;
- Full `34710368093` — PASS — artifact `10303176790` — digest `sha256:7c83f34d566af8797e34f9a05911fe62c74ca1bc30e8c6ccaee2b1a7e2672dcb`.

Exact live frontend `main` was reverified at the implementation merge after post-main QA. Evidence is recorded in Issue #107.

Therefore route-level `/rules` satisfies current-law acceptance and may be recorded as `FINAL_CURRENT` in closeout governance.

## 13. Documentation-only closeout law

Closeout branch:

`closeout/f24-rules-recertification`

Closeout is exactly one commit changing exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F24_RULES_RECERTIFICATION.md`;
4. `docs/workstreams/F24_CLOSEOUT.md`.

No source/package/lockfile/workflow/dependency/runtime mutation is authorized in closeout.

Terminal closeout SHA/merge/frozen-main QA facts must be recorded in Issue #107 after they exist, not recursively self-recorded in this commit.

## 14. Remaining terminal chain

F24 still requires:
1. exact closeout compare = ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR without auto-closing Issue #107;
3. every actually-triggered PR-context Full/F24/frozen-route regression gate PASS;
4. mergeable=true and unresolved review threads=0;
5. exact live-main lock at implementation merge `3e1f4747997afda1c4c275db93f2905379d36a37` before closeout merge;
6. expected-head closeout merge;
7. terminal frozen-main Full/F24/frozen-route regressions PASS;
8. terminal artifacts/digests recorded in Issue #107;
9. exact live `main` reverified;
10. Issue #107 CLOSED / COMPLETED.

Only after those future facts exist may F24 be reported:

`F24 — DONE / MERGED / FROZEN — FINAL_CURRENT`

## 15. NEXT after terminal F24

Next public competitive recertification candidate:

`/tournaments/$id` — currently `FINAL_PRE_SEO`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
