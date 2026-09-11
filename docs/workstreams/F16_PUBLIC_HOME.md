# F16 — Public Home Discovery

Status: `MERGED / CLOSEOUT IN PROGRESS`

Route: `/`

Tracking Issue: `#81`

START_SHA: `008f4fbd959138e3abe6bf85078f6cf700319bd2`

Implementation branch: `phase/f16-public-home-discovery`

Closeout branch: `closeout/f16-public-home-discovery`

Target: `FINAL_CURRENT`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 1. Preflight

Mandatory root law read before implementation:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `SEO_FINAL_COPY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- `docs/SEO_CONTENT_RESEARCH_TEMPLATE.md`.

Live frontend main was exact START_SHA before implementation branch creation.

## 2. Source audit

The previous Home UI was visually usable but not current-law final.

Blocking findings:
- dynamic public facts came directly from `src/lib/tournament-home-data.ts`;
- aggregate statistics, tournament registration/capacity/prize, center verification/reviews/equipment, ranking and showdown values were therefore browser-owned fixture truth;
- route `/` had no loader/repository/runtime validation boundary;
- Hero finder submitted to nowhere (`preventDefault()` only);
- popular-game cards lost game identity when navigating;
- showdown navigation was generic;
- public metadata still used legacy `ایران مهر افزار` branding;
- shared tournament shell exposed fabricated phone/email/address and dead social `#` links;
- claims were not backed by a stable anonymous backend projection;
- no current SEO/final-copy evidence chain existed.

F16 therefore productionizes the Home route while retaining the useful RTL esports visual direction.

## 3. Permanent architecture

`public / route → SSR loader → typed PublicHomeRepository → runtime-validated public-home projection → Home UI`

Repository/backend owns:
- dynamic aggregate discovery stats;
- stable game identity/slug + active-tournament count;
- data-driven Home finder options;
- featured tournament identity, venue, lifecycle, capacity/registration/fee/prize;
- gaming-center identity, verification/location/reviews/equipment/upcoming count;
- ranking preview identity/rank/rating/result-derived metrics;
- optional showdown identity/timing/player/rating projection.

Frontend owns:
- final static Persian explanatory copy;
- temporary finder form state;
- semantic navigation using stable projected IDs/slugs;
- responsive/accessibility presentation;
- deterministic dev/test/visual fixture behind the same repository contract.

No production fallback to fixture data is allowed.

## 4. Backend alignment — terminal documentation truth

Backend Issue `#29` — CLOSED / COMPLETED as documentation alignment only.

- backend START `c72ec545782a25719009ae329d74ffd13259d020`;
- docs head `0338af8432d16a92ebafe85160e1d45f8ae3c8db`;
- PR `#30` — MERGED;
- PR gate `34591383203` — PASS Python 3.12/3.14;
- merge/main `335211d711c197a440e086bc570b86f2c5cd65f8`;
- post-main gate `34591528685` — PASS Python 3.12/3.14;
- exact live backend main reverified;
- no runtime Python implementation;
- Backend NEXT remains `P02 — Games / Catalog Foundation`.

Planned endpoint:
`GET /api/v1/discovery/home/`

This backend closure is contract documentation only. It does not make the endpoint live.

## 5. Implementation decisions

F16 adds:
- Zod runtime contract with cross-field integrity checks;
- HTTP/Django repository adapter;
- deterministic fixture repository;
- selector that defaults Production to Django and development to fixture;
- SSR route loader;
- final public head metadata;
- real Home finder navigation to validated `/tournaments` search;
- stable dynamic links for tournament and center details;
- optional stats/ranking/showdown sections that disappear safely when the backend omits them;
- explicit pending/error states;
- focused F16 browser gate plus existing full quality gate.

F16 intentionally does not rewrite `src/lib/tournament-home-data.ts`, because unre-certified adjacent routes still consume that file. The accepted Home route stops importing it entirely.

Shared shell correction included in the same implementation:
- active tournament shell branding changed to Turnoment;
- fabricated phone/email/address removed;
- dead social `#` links removed;
- only real product routes/copy retained.

## 6. Final product states

Accepted Home states:
- SSR ready projection;
- loader pending skeleton;
- loader/transport error with retry;
- stats present/absent;
- popular games present/empty;
- featured tournaments present/empty;
- centers present/empty;
- ranking preview present/absent;
- showdown present/absent;
- finder with all/partial filters;
- stable navigation from dynamic cards;
- responsive presentation at 375 / 390 / 430 / 768 / 1024 / 1440.

No engineering-stage copy or fabricated fallback claim is shown to users.

## 7. SEO/final-copy acceptance

Detailed research record: `docs/workstreams/F16_PUBLIC_HOME_SEO.md`.

Accepted intent split:
- `/` broad discovery gateway;
- `/tournaments` full inventory/filter page;
- `/games` game catalog;
- `/centers` center discovery;
- `/ranking` ranking inventory;
- `/host` acquisition.

Final Home H1:
`مسابقات گیمینگ حضوری نزدیکت را پیدا کن`

Final title:
`مسابقات گیمینگ حضوری و تورنمنت‌های گیم‌نت | Turnoment`

Robots: `index,follow`

Canonical: `/`

Organization JSON-LD is intentionally omitted until stable absolute production site/logo identity is available; F16 does not invent structured-data facts.

## 8. Exact implementation evidence

Implementation head:

`41aeba987fa4435832361db95d2e232817c668b3`

Compare from START:
- ahead 1 / behind 0;
- exactly one commit;
- exactly 15 changed files;
- no lockfile mutation;
- no dependency/version mutation.

Exact-head normal gate:
- Frontend Quality Gate `34592421423` — PASS;
- artifact `10196275291`;
- digest `sha256:41799e4d45b4351fdb3f87edb7513c1af918858087d04661c618ab6721bbef5a`.

Exact-head focused gate:
- F16 Public Home Quality Gate `34592421509` — PASS;
- artifact `10196188910`;
- digest `sha256:1a6ff22263d98927f784c5d5facff97978b125370cee0496052d32e9627a4651`;
- SSR/final-copy/link assertions PASS;
- six screenshots at 375/390/430/768/1024/1440 generated;
- manual six-width visual QA PASS with no observed horizontal overflow, clipping or overlap.

## 9. Implementation PR acceptance

Implementation PR:

`#82` — MERGED.

PR-context normal gate:
- run `34598183137` — PASS;
- artifact `10262957454`;
- digest `sha256:0e563511f2c20e042ed27d025395b9fd40a4ce28d2f9e2f04cdcc057bc706a8e`.

PR-context focused gate:
- run `34598183138` — PASS;
- artifact `10263646547`;
- digest `sha256:52cc118d27e789894295523c8b6cf38bd3c0b98e098790673ec2734c1cf910e9`.

Before merge:
- PR mergeable `true`;
- unresolved review threads `0`;
- live main exact START_SHA;
- expected-head merge used with implementation head.

Implementation merge / accepted main:

`2b66c5140511febaa98e96d93351cfdb62773bbf`

## 10. Post-main implementation acceptance

Exact implementation main `2b66c5140511febaa98e96d93351cfdb62773bbf`:

Normal Frontend Quality Gate:
- run `34598728780` — PASS including full browser regression;
- artifact `10263148439`;
- digest `sha256:6522b08fc635fbcef7844257d37083681a4407b3de4afa14eebc51034b003fda`.

Focused F16 Public Home Quality Gate:
- run `34598728817` — PASS;
- artifact `10263087863`;
- digest `sha256:6337d86bbaa94e83ced301825445483c5b59c91a93426480a1d4ff810c18dd3d`.

Live frontend main was reverified exact accepted implementation SHA before closeout branch creation.

Implementation is therefore accepted on main and `/` may be promoted non-recursively to `FINAL_CURRENT` in the compliance registry.

## 11. Closeout boundary

Closeout is documentation-only.

Authorized files exactly:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F16_PUBLIC_HOME.md`;
4. `docs/workstreams/F16_CLOSEOUT.md`.

Forbidden during closeout:
- source/runtime code;
- `package.json` or lockfiles;
- workflows;
- dependencies;
- route implementation;
- backend phase/runtime changes.

Non-recursive rule:
- this committed record may contain implementation evidence that already exists;
- it MUST NOT claim its own future closeout merge SHA or future terminal main run/artifact;
- those terminal facts are recorded in Issue #81 after closeout merge and terminal CI actually exist.

## 12. Remaining acceptance chain

Before F16 can be terminally reported `DONE / MERGED / FROZEN — FINAL_CURRENT`:
1. closeout compare must be one commit / exactly four Markdown files;
2. closeout PR must remain docs-only and must not auto-close Issue #81;
3. PR-context normal + focused gates PASS;
4. PR mergeable=true and unresolved review threads=0;
5. exact pre-merge main remains implementation merge SHA;
6. expected-head closeout merge;
7. terminal frozen-main normal + focused gates PASS;
8. terminal artifacts/digests recorded;
9. exact live-main verification;
10. Issue #81 updated and CLOSED / COMPLETED.

Only then may F16 be reported as:

`DONE / MERGED / FROZEN — FINAL_CURRENT`.
