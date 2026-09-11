# F16 — Public Home Discovery Closeout

Status at document creation:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/`

Target route status: `FINAL_CURRENT`

Tracking Issue: `#81`

This is a non-recursive closeout snapshot. It records only evidence that already exists when this document is created. The future closeout merge/frozen-main SHA and terminal post-closeout CI/artifact/digest are intentionally not self-recorded here; they belong in Issue #81 after they exist.

## 1. Exact source lock

Frontend START_SHA:

`008f4fbd959138e3abe6bf85078f6cf700319bd2`

Implementation branch:

`phase/f16-public-home-discovery`

Final reviewed implementation head:

`41aeba987fa4435832361db95d2e232817c668b3`

Implementation merge / accepted main:

`2b66c5140511febaa98e96d93351cfdb62773bbf`

Closeout branch base:

`2b66c5140511febaa98e96d93351cfdb62773bbf`

Closeout branch:

`closeout/f16-public-home-discovery`

## 2. Implementation scope accepted

F16 replaced Home-owned authoritative-looking fixture truth with the permanent boundary:

`public / route → SSR loader → typed PublicHomeRepository → runtime-validated public-home projection → Home UI`

Accepted behavior includes:
- production HTTP/Django adapter and deterministic QA fixture behind the same contract;
- production does not silently fall back to fixture records;
- real Home finder navigation into validated `/tournaments` search state;
- stable typed game/tournament/center/ranking/host navigation;
- SSR-rendered public Home content;
- final title/meta/canonical/robots/OG ownership in route head;
- pending/error/empty/partial states without engineering-status or fabricated fallback copy;
- backend/repository authority for dynamic stats, verification, lifecycle/capacity, ranking/rating/result-derived truth;
- final responsive/accessibility presentation;
- removal of legacy `ایران مهر افزار` shell branding and fabricated contact/social facts from the active tournament shell.

The old shared `src/lib/tournament-home-data.ts` was intentionally left untouched because adjacent unre-certified routes still consume it. The accepted Home route no longer imports that file.

## 3. Public SEO/final-copy acceptance

Research record:

`docs/workstreams/F16_PUBLIC_HOME_SEO.md`

Final H1:

`مسابقات گیمینگ حضوری نزدیکت را پیدا کن`

Final title:

`مسابقات گیمینگ حضوری و تورنمنت‌های گیم‌نت | Turnoment`

Technical indexing:
- canonical `/`;
- robots `index,follow`;
- crawlable semantic internal links;
- primary public content SSR-rendered.

Intent boundary:
- `/` broad discovery gateway;
- `/tournaments` full tournament inventory/filter intent;
- `/games` game catalog;
- `/centers` center discovery;
- `/ranking` ranking inventory;
- `/host` host acquisition.

No unsupported search volume, ranking guarantee, popularity superlative or Organization JSON-LD fact was invented.

## 4. Official documentation applied

Current official guidance reviewed during F16 included:
- TanStack Start Selective SSR;
- TanStack Router data loading;
- TanStack Router document head management;
- W3C WCAG 2.2;
- Google Search Central canonicalization, title links, snippets, helpful content, crawlable links and structured-data policies.

Key accepted decisions:
- SSR remains enabled for important Home content;
- route loader is the Home dynamic-data coordination boundary;
- route head owns final metadata;
- controls preserve visible focus and touch-safe sizing;
- structured data is omitted when stable supporting identity/facts are unavailable.

## 5. Cross-repo backend contract alignment

Backend repository:

`sajadkhavas/turnoment-backend`

Backend F16 alignment is terminal as documentation alignment only:
- START `c72ec545782a25719009ae329d74ffd13259d020`;
- Issue #29 CLOSED / COMPLETED;
- docs head `0338af8432d16a92ebafe85160e1d45f8ae3c8db`;
- PR #30 MERGED;
- PR Backend Quality Gate `34591383203` PASS on Python 3.12 and 3.14;
- backend merge/main `335211d711c197a440e086bc570b86f2c5cd65f8`;
- post-main Backend Quality Gate `34591528685` PASS;
- live backend main reverified exact;
- no runtime Python/model/migration/serializer/view/URL/dependency/phase-registry implementation added.

Planned endpoint:

`GET /api/v1/discovery/home/`

Runtime remains:

`FRONTEND MOCK / BACKEND PENDING`

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

## 6. Exact implementation diff evidence

Compare from START to final implementation head:
- ahead `1`;
- behind `0`;
- exactly one implementation commit;
- exactly 15 changed files;
- no lockfile mutation;
- no dependency/version mutation.

Implementation PR:

`#82` — MERGED with expected-head lock.

Pre-merge acceptance:
- PR mergeable `true`;
- unresolved review threads `0`;
- exact pre-merge frontend `main` remained START_SHA.

## 7. Exact-head QA evidence

Normal Frontend Quality Gate:
- run `34592421423` — PASS;
- artifact `10196275291`;
- digest `sha256:41799e4d45b4351fdb3f87edb7513c1af918858087d04661c618ab6721bbef5a`.

Focused F16 Public Home Quality Gate:
- run `34592421509` — PASS;
- artifact `10196188910`;
- digest `sha256:1a6ff22263d98927f784c5d5facff97978b125370cee0496052d32e9627a4651`;
- SSR/final-copy/link assertions PASS;
- exactly six screenshots at 375/390/430/768/1024/1440;
- manual visual inspection PASS with no observed horizontal overflow, clipping or overlap.

## 8. PR-context QA evidence

Frontend Quality Gate:
- run `34598183137` — PASS;
- artifact `10262957454`;
- digest `sha256:0e563511f2c20e042ed27d025395b9fd40a4ce28d2f9e2f04cdcc057bc706a8e`.

Focused F16 Public Home Quality Gate:
- run `34598183138` — PASS;
- artifact `10263646547`;
- digest `sha256:52cc118d27e789894295523c8b6cf38bd3c0b98e098790673ec2734c1cf910e9`.

## 9. Post-main implementation QA evidence

Accepted implementation main:

`2b66c5140511febaa98e96d93351cfdb62773bbf`

Normal Frontend Quality Gate:
- run `34598728780` — PASS including full browser regression;
- artifact `10263148439`;
- digest `sha256:6522b08fc635fbcef7844257d37083681a4407b3de4afa14eebc51034b003fda`.

Focused F16 Public Home Quality Gate:
- run `34598728817` — PASS;
- artifact `10263087863`;
- digest `sha256:6337d86bbaa94e83ced301825445483c5b59c91a93426480a1d4ff810c18dd3d`.

Live frontend main was reverified exact accepted implementation SHA before closeout branch creation.

## 10. Route registry decision

Because the F16 implementation is merged and required post-main implementation QA is green, `/` is eligible for non-recursive promotion from `NEEDS_RECERTIFICATION` to:

`FINAL_CURRENT`

This route-level promotion does not itself mean the F16 workstream is terminally frozen. Workstream terminal status still requires the closeout merge and terminal frozen-main evidence below.

## 11. Documentation-only closeout scope

This closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F16_PUBLIC_HOME.md`;
4. `docs/workstreams/F16_CLOSEOUT.md`.

No source code, package, lockfile, workflow, runtime configuration or dependency change is authorized.

## 12. Remaining terminal gates

After this closeout snapshot is committed, F16 still requires:
1. exact closeout compare: ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to `main` without auto-closing Issue #81;
3. PR-context normal + focused F16 gates PASS;
4. mergeable=true;
5. unresolved review threads=0;
6. exact live-main lock at implementation merge SHA before merge;
7. expected-head closeout merge;
8. terminal frozen-main normal Frontend Quality Gate PASS;
9. terminal frozen-main focused F16 gate PASS;
10. terminal artifact IDs and SHA-256 digests recorded;
11. exact live frontend main reverified after terminal gates;
12. Issue #81 updated with those terminal facts and CLOSED / COMPLETED.

Only after those future facts exist may the workstream be reported:

`F16 — DONE / MERGED / FROZEN — FINAL_CURRENT`
