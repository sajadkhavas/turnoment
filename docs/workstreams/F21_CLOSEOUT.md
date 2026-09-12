# F21 — Public Player Ranking Closeout

Status at document creation:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/ranking`

Target route status: `FINAL_CURRENT`

Tracking Issue: `#98`

This is a non-recursive closeout snapshot. It records only evidence that already exists when this document is created. The future closeout merge/frozen-main SHA and terminal post-closeout CI/artifact/digest are intentionally not self-recorded here; they belong in Issue #98 after they exist.

## 1. Exact source lock

Frontend START_SHA:

`b585e1e421c2e0febedf53e43349a23666004338`

Implementation branch:

`phase/f21-public-player-ranking`

Final reviewed implementation head:

`b8aaad067ce64a376e8758daa2eda43e374fee65`

Implementation PR:

`#99` — MERGED with expected-head lock.

Implementation merge / accepted main:

`7868d191f07f038ba757e3a2593ffc400bb0c883`

Closeout branch base:

`7868d191f07f038ba757e3a2593ffc400bb0c883`

Closeout branch:

`closeout/f21-public-player-ranking`

## 2. Accepted permanent architecture

F21 replaces the legacy local-array ranking route with:

`validated ranking search → loaderDeps → SSR loader → typed PlayerRankingRepository → strict runtime-validated ranking projection → Ranking UI`

Accepted production behavior:
- planned endpoint `GET /api/v1/rankings/`;
- production defaults to Django HTTP repository;
- `VITE_API_BASE_URL` required;
- GET + credentials + JSON Accept;
- non-2xx/contract failures fail closed;
- strict response validation;
- deterministic fixtures remain dev/test/visual-QA only;
- no silent production fallback;
- no browser calculation of authoritative rank/rating/movement/eligibility.

## 3. Ranking truth / identity / privacy acceptance

Backend/repository eventually owns leaderboard membership and authoritative ordering, stable `playerId`, public `username`, gamer tag projection, game/city identities, Tournament Rating or Challenge Rating selected by active type, record, movement, facets/filtering and pagination.

Frontend owns only URL navigation state, presentation/final copy, SEO/canonical/robots, accessibility/responsive behavior and deterministic QA fixtures.

Identity:
- `playerId` = stable relation identity;
- `username` = stable public profile-navigation identity;
- gamer tag = display only, never a relation key.

Tournament Rating and Challenge Rating remain separate competitive truths. F21 v1 returns one authoritative `rating` paired with `ratingType`. Challenge eligibility is intentionally absent from ranking-list v1 and is never browser-derived.

Future public backend projection must not leak private account/contact/auth/moderation/payment data.

## 4. Public SEO / final-copy acceptance

H1:

`رتبه‌بندی بازیکنان مسابقات Turnoment`

Title:

`رتبه‌بندی بازیکنان مسابقات | Turnoment`

Description:

`جدول رتبه‌بندی بازیکنان Turnoment را بر اساس بازی، نوع امتیاز، فصل و محدوده ببین و جایگاه، امتیاز و روند رقابتی هر بازیکن را مقایسه کن.`

Indexing:
- base `/ranking`: canonical `/ranking`, robots `index,follow`;
- game/season/region/type/page navigation variants: canonical `/ranking`, robots `noindex,follow`.

No fabricated “best players”, official/national-ranking authority, popularity, search-volume or ranking-guarantee claims are authorized. No unsupported ranking schema is emitted.

Intent boundary remains:
- `/ranking` = multi-player ranking/discovery;
- `/players/$username` = one public player profile;
- `/games` + `/games/$slug` = game discovery/detail;
- `/tournaments` = event discovery;
- dashboard rating surfaces = private player-specific state.

## 5. Official documentation applied

Current official guidance reviewed/applied during F21 included:
- TanStack Router data loading / SSR loader behavior;
- validated search params and search navigation;
- document head management;
- Google Search canonicalization guidance;
- W3C WCAG 2.2 focus/target-size baseline;
- Django REST framework Permissions, Filtering and Pagination for the separate backend documentation alignment.

Key decisions:
- primary ranking data is SSR-loaded;
- filter/page state is URL-backed and shareable;
- production adapter fails closed;
- base ranking page is canonical/indexable while current filter states remain navigation variants;
- backend eventually owns filtering, deterministic order and pagination truth;
- public controls retain visible focus and touch-safe sizing.

## 6. Cross-repo backend alignment

Backend repository:

`sajadkhavas/turnoment-backend`

Backend F21 alignment is terminal as documentation alignment only:
- Backend START `e8e48061cba201b3a12ac534ef97f22565bea5a3`;
- Issue #39 CLOSED / COMPLETED;
- docs head `c7712f025da84050085ae1017b9f659c6f58d01a`;
- PR #40 MERGED;
- PR-context Backend Quality Gate `34658090539` PASS on Python 3.12 / 3.14;
- backend merge/main `44f18e462f63c625bc02e07ef93c15f1c385dcd0`;
- post-main Backend Quality Gate `34658179049` PASS on Python 3.12 / 3.14;
- no Python/model/migration/serializer/view/URL/settings/dependency/workflow/phase-registry runtime implementation added.

Runtime remains:

`FRONTEND MOCK / BACKEND PENDING`

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

## 7. Exact implementation diff evidence

START → final reviewed implementation head:
- ahead `2`;
- behind `0`;
- `12` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- final package delta only appends the F21 contract spec to the existing test command;
- frozen F16/F17/F18/F19/F20/F02 route source and `/players/$username` are absent from the implementation diff.

## 8. Exact-head QA evidence

Final reviewed implementation head:

`b8aaad067ce64a376e8758daa2eda43e374fee65`

Normal Frontend Quality Gate:
- run `34658428081` — PASS;
- artifact `10286695439`;
- digest `sha256:37d32b0dee9d269dae0d946198953e0dfeb32c8a6bdfdadf3d01ab1b5c66130b`.

Focused F21 Quality Gate:
- run `34658428161` — PASS;
- artifact `10285498773`;
- digest `sha256:7b5aed1406fa617e3ab33d1a9a56ba45916a580c6252f0d80cdebf1eb95a2e44`.

Manual visual evidence:
- base and filtered ranking states inspected at `375 / 390 / 430 / 768 / 1024 / 1440`;
- no observed horizontal overflow, clipping or overlap.

## 9. Implementation PR-context QA evidence

Implementation PR #99 pre-merge:
- mergeable `true`;
- unresolved review threads `0`;
- exact pre-merge main remained START_SHA;
- expected head `b8aaad067ce64a376e8758daa2eda43e374fee65` used.

PR-context gates:
- Full `34685943363` — PASS; artifact `10295436520`; digest `sha256:1e7ac92a19138641ba3f9ba82d8623b11344e46b785aeea23dcefd4b9ee1c8e2`;
- F21 `34685943377` — PASS; artifact `10295681648`; digest `sha256:10a78d4e220de71af3f2144d2597eb8d3bb123a2b093be8a826c39de36606f28`;
- F20 `34685943390` — PASS; artifact `10295901294`; digest `sha256:c4b50d127896add40caede3e123e7406989f236131d4e485bc368c027c02c52d`;
- F19 `34685943358` — PASS; artifact `10295482086`; digest `sha256:82c5696e8993be95d85c131e34f3594438ee8997d2299ddab566a07d136db35b`;
- F18 `34685943344` — PASS; artifact `10296005938`; digest `sha256:0eb32164b263129ae2c8bf8235e4ad7c0e9016373b12391e340476a9009342f7`;
- F17 `34685943345` — PASS; artifact `10296085682`; digest `sha256:7dd2d6ab1e13505c6ba1509338cfce4447febba24114863231f93d31a3254231`;
- F16 `34685943368` — PASS; artifact `10295681634`; digest `sha256:2573564544240e8fb052b3b1d9cdc78617d21c2f12f9ceaad994d8a6854a9f8`.

## 10. Post-main implementation QA evidence

Accepted implementation main:

`7868d191f07f038ba757e3a2593ffc400bb0c883`

Post-main gates:
- Full `34686214152` — PASS; artifact `10295279066`; digest `sha256:b5bc70fe4337256eeffe534ada2660ee2d1bcc2c54fe44555c3751a9d15af683`;
- F21 `34686214160` — PASS; artifact `10295836799`; digest `sha256:7ae813642945ff350419f94513b826ad24bd9f28201deefed6029ff15f3a2bfd`;
- F20 `34686214190` — PASS; artifact `10296091142`; digest `sha256:35fdaaacdfc5f51cdf95a4633497d731dfbb7d61af67b25e4e67df2bb1108b39`;
- F19 `34686214168` — PASS; artifact `10295457457`; digest `sha256:66fcc833e7095dd7ee987ba2b846cc656182927a71e8cee59e70376460720e26`;
- F18 `34686214210` — PASS; artifact `10296096060`; digest `sha256:b62f4bcb39828bc153a43e6ab0b7791f0713d16b9d029616aac1cdb90998652a`;
- F17 `34686214170` — PASS; artifact `10295427724`; digest `sha256:0dae7233c3da60d6e85b41f904df5a2945c3abeb04c76ec059d6a33418bab3d4`;
- F16 `34686214212` — PASS; artifact `10295742002`; digest `sha256:4da8ac415b26a422b0df806f79266bfa4cc9d52b165954b299c68a15ae27ad93`.

Live frontend `main` was exact implementation SHA before closeout branch creation.

## 11. Route registry decision

Because implementation is merged and required post-main implementation gates are green, `/ranking` is eligible for non-recursive promotion to:

`FINAL_CURRENT`

This route-level promotion does not itself mean the F21 workstream is terminally frozen. Terminal workstream status still requires closeout merge and terminal frozen-main evidence in Issue #98.

## 12. Documentation-only closeout scope

This closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F21_PUBLIC_PLAYER_RANKING.md`;
4. `docs/workstreams/F21_CLOSEOUT.md`.

Exactly one closeout commit is allowed. No source code, package, lockfile, workflow, runtime configuration, dependency or backend runtime phase change is authorized.

## 13. Remaining terminal gates

After this closeout snapshot is committed, F21 still requires:
1. exact closeout compare: ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to main without auto-closing Issue #98;
3. PR-context Full + F21 + F20/F19/F18/F17/F16 gates PASS;
4. mergeable=true and unresolved review threads=0;
5. exact live-main lock at implementation merge SHA before closeout merge;
6. expected-head closeout merge;
7. terminal frozen-main Full + F21 + regressions PASS;
8. terminal artifact IDs and SHA-256 digests recorded in Issue #98;
9. exact live frontend main reverified;
10. Issue #98 updated with terminal evidence and CLOSED / COMPLETED.

Only after those future facts exist may the workstream be reported:

`F21 — DONE / MERGED / FROZEN — FINAL_CURRENT`

## 14. NEXT after F21 terminal freeze

The next public current-law workstream is:

`/players/$username`

Then:

`/host` → `/rules`.
