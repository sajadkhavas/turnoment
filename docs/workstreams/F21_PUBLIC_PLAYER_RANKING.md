# F21 — Public Player Ranking

Status at closeout creation:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/ranking`

Tracking Issue: `#98` — OPEN

START_SHA:

`b585e1e421c2e0febedf53e43349a23666004338`

Implementation branch:

`phase/f21-public-player-ranking`

Final reviewed implementation head:

`b8aaad067ce64a376e8758daa2eda43e374fee65`

Implementation PR:

`#99` — MERGED with expected-head lock.

Implementation merge / accepted main:

`7868d191f07f038ba757e3a2593ffc400bb0c883`

Closeout branch:

`closeout/f21-public-player-ranking`

This document is a non-recursive workstream snapshot. Future closeout merge/frozen-main SHA and terminal post-closeout CI/artifact evidence are intentionally not self-recorded here; those facts belong in Issue #98 after they exist.

## 1. Why F21 existed

The START `/ranking` route was not acceptable under current Turnoment public-page law because it rendered local ranking truth without an SSR loader/repository boundary, kept game selection in local component state, had two frontend ranking sources, authored rank/rating/record/trend in fixtures, lacked stable player identity/profile navigation semantics, used legacy branding and lacked final URL/canonical/error/pagination/fail-closed contracts.

F21 rebuilt the public ranking boundary instead of cosmetically patching it.

## 2. Permanent architecture

`validated ranking search → loaderDeps → SSR loader → typed PlayerRankingRepository → strict runtime-validated ranking projection → Ranking UI`

Repository contract:

`getRanking(query): Promise<PlayerRankingPageData>`

Adapters:
- deterministic mock repository for dev/test/visual QA;
- Django HTTP repository for production.

Selector behavior:
- explicit `VITE_DATA_ADAPTER=mock` → mock;
- explicit `django` → Django;
- otherwise development → mock;
- otherwise production → Django.

Production never silently falls back to fixture data.

## 3. Planned production API / ownership

Planned endpoint:

`GET /api/v1/rankings/`

Query dimensions:
- `game=<stable-game-slug>`;
- `season=<stable-season-slug>`;
- `region=<stable-region-slug>`;
- `type=tournament|challenge`;
- `page=<positive-integer>`.

Backend/repository eventually owns:
- leaderboard membership and authoritative order/rank;
- stable `playerId`;
- public `username` profile identity;
- gamer tag display projection;
- game/city identities;
- Tournament Rating and Challenge Rating truth;
- match record;
- rank movement;
- facets, filtering and pagination.

Frontend owns URL navigation state, presentation/final copy, SEO/canonical/robots, accessibility/responsive behavior and deterministic QA fixtures only.

Production adapter requires `VITE_API_BASE_URL`, uses GET + credentials + JSON Accept, fails closed on non-2xx and strictly validates the response.

Current runtime remains:

`FRONTEND MOCK / BACKEND PENDING`

## 4. Ranking-domain and identity rules

Tournament Rating and Challenge Rating are separate competitive truths. F21 v1 returns one authoritative `rating` paired with the active `ratingType`. Changing ranking type requests another authoritative projection rather than deriving a second score in the browser.

Challenge eligibility is outside F21 listing v1 and is never calculated from public row data.

Identity:
- `playerId` = stable backend relation identity;
- `username` = stable public profile-navigation identity;
- `gamerTag` = display text only, never a relation key.

Public ranking responses must not leak private player/account/contact/auth/moderation/payment data.

## 5. Strict v1 projection / integrity

Projection includes `schemaVersion=1`, game/season/region/type facets, authoritative active query, player rows with identity/game/city/rank/rating/record/movement and page-number pagination.

Validation rejects unknown fields, duplicate facet/player/profile/rank identities, rows outside active game/type, invalid rank ordering, inconsistent match arithmetic, invalid movement semantics and pagination inconsistencies.

## 6. UI and accessibility acceptance

F21 provides:
- final ranking hero/copy;
- URL-backed game/type/season/region controls;
- desktop leaderboard table;
- equivalent mobile ranking cards;
- stable profile links by public username;
- authoritative rating, record and movement display;
- pending skeleton;
- retryable error state;
- empty state;
- pagination and natural navigation to tournaments/games.

Movement is not represented by color alone. Filter, profile and pagination controls preserve visible focus and touch-safe sizing.

The frozen shared Home ranking component and `/players/$username` were not modified.

## 7. SEO / final-copy lock

H1:

`رتبه‌بندی بازیکنان مسابقات Turnoment`

Title:

`رتبه‌بندی بازیکنان مسابقات | Turnoment`

Description:

`جدول رتبه‌بندی بازیکنان Turnoment را بر اساس بازی، نوع امتیاز، فصل و محدوده ببین و جایگاه، امتیاز و روند رقابتی هر بازیکن را مقایسه کن.`

Indexing:
- base `/ranking`: canonical `/ranking`, robots `index,follow`;
- filter/page variants: canonical `/ranking`, robots `noindex,follow`.

No unsupported “best players”, official/national authority, popularity or ranking guarantee is authorized. No ranking structured data is emitted merely for schema coverage.

Intent boundary:
- `/ranking` = multi-player leaderboard/discovery;
- `/players/$username` = one player profile, next separate workstream;
- `/games` + `/games/$slug` = game discovery/detail;
- `/tournaments` = event discovery;
- dashboard rating surfaces = private player-specific state.

## 8. Official documentation applied

Reviewed/applied during F21:
- TanStack Router data loading / SSR;
- runtime-validated search params/navigation;
- document head management;
- Google canonicalization guidance;
- W3C WCAG 2.2 focus/target-size guidance;
- DRF Permissions, Filtering and Pagination for cross-repo contract alignment.

Key decisions: SSR loader owns primary ranking data, URL owns shareable facets/page, production fails closed, base route is canonical/indexable, filter states are navigation variants, and backend eventually owns filtering/order/pagination truth.

## 9. Implementation diff evidence

Source implementation commit:

`2d75596a31440dcd795ea609926a02e7a478e71e`

Final reviewed implementation head after governance checkpoint:

`b8aaad067ce64a376e8758daa2eda43e374fee65`

START → reviewed head:
- ahead `2` / behind `0`;
- `12` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- package delta only adds F21 contract spec;
- frozen F16/F17/F18/F19/F20/F02 route source, shared Home ranking and `/players/$username` are untouched.

## 10. Exact-head QA

On `b8aaad067ce64a376e8758daa2eda43e374fee65`:
- Full `34658428081` PASS — artifact `10286695439` — digest `sha256:37d32b0dee9d269dae0d946198953e0dfeb32c8a6bdfdadf3d01ab1b5c66130b`;
- F21 `34658428161` PASS — artifact `10285498773` — digest `sha256:7b5aed1406fa617e3ab33d1a9a56ba45916a580c6252f0d80cdebf1eb95a2e44`.

Manual visual review covered base + Tekken 8/Challenge/Tehran states at 375/390/430/768/1024/1440; no observed horizontal overflow, clipping or overlap.

## 11. Implementation PR-context acceptance

PR #99 before merge:
- mergeable `true`;
- unresolved review threads `0`;
- exact live main remained START_SHA;
- expected head `b8aaad067ce64a376e8758daa2eda43e374fee65` used.

PR-context QA:
- Full `34685943363` PASS — artifact `10295436520` — digest `sha256:1e7ac92a19138641ba3f9ba82d8623b11344e46b785aeea23dcefd4b9ee1c8e2`;
- F21 `34685943377` PASS — artifact `10295681648` — digest `sha256:10a78d4e220de71af3f2144d2597eb8d3bb123a2b093be8a826c39de36606f28`;
- F20 `34685943390` PASS — artifact `10295901294` — digest `sha256:c4b50d127896add40caede3e123e7406989f236131d4e485bc368c027c02c52d`;
- F19 `34685943358` PASS — artifact `10295482086` — digest `sha256:82c5696e8993be95d85c131e34f3594438ee8997d2299ddab566a07d136db35b`;
- F18 `34685943344` PASS — artifact `10296005938` — digest `sha256:0eb32164b263129ae2c8bf8235e4ad7c0e9016373b12391e340476a9009342f7`;
- F17 `34685943345` PASS — artifact `10296085682` — digest `sha256:7dd2d6ab1e13505c6ba1509338cfce4447febba24114863231f93d31a3254231`;
- F16 `34685943368` PASS — artifact `10295681634` — digest `sha256:2573564544240e8fb052b3b1d9cdc78617d21c2f12f9ceaad994d8a6854a9f8`.

Implementation PR #99 merged to:

`7868d191f07f038ba757e3a2593ffc400bb0c883`

## 12. Post-main implementation QA

On exact implementation main `7868d191f07f038ba757e3a2593ffc400bb0c883`:
- Full `34686214152` PASS — artifact `10295279066` — digest `sha256:b5bc70fe4337256eeffe534ada2660ee2d1bcc2c54fe44555c3751a9d15af683`;
- F21 `34686214160` PASS — artifact `10295836799` — digest `sha256:7ae813642945ff350419f94513b826ad24bd9f28201deefed6029ff15f3a2bfd`;
- F20 `34686214190` PASS — artifact `10296091142` — digest `sha256:35fdaaacdfc5f51cdf95a4633497d731dfbb7d61af67b25e4e67df2bb1108b39`;
- F19 `34686214168` PASS — artifact `10295457457` — digest `sha256:66fcc833e7095dd7ee987ba2b846cc656182927a71e8cee59e70376460720e26`;
- F18 `34686214210` PASS — artifact `10296096060` — digest `sha256:b62f4bcb39828bc153a43e6ab0b7791f0713d16b9d029616aac1cdb90998652a`;
- F17 `34686214170` PASS — artifact `10295427724` — digest `sha256:0dae7233c3da60d6e85b41f904df5a2945c3abeb04c76ec059d6a33418bab3d4`;
- F16 `34686214212` PASS — artifact `10295742002` — digest `sha256:4da8ac415b26a422b0df806f79266bfa4cc9d52b165954b299c68a15ae27ad93`.

Live main was reverified exact implementation merge before closeout branch creation.

## 13. Backend documentation alignment

Backend F21 alignment is terminal as documentation-only work:
- Backend START `e8e48061cba201b3a12ac534ef97f22565bea5a3`;
- Issue #39 CLOSED / COMPLETED;
- docs head `c7712f025da84050085ae1017b9f659c6f58d01a`;
- PR #40 MERGED;
- PR-context gate `34658090539` PASS on Python 3.12 / 3.14;
- backend merge/main `44f18e462f63c625bc02e07ef93c15f1c385dcd0`;
- post-main gate `34658179049` PASS on Python 3.12 / 3.14;
- no ranking runtime implementation or phase reorder.

Backend NEXT remains `P02 — Games / Catalog Foundation`.

## 14. Route-level acceptance

Because implementation is merged and all required post-main implementation gates are green, `/ranking` is promoted non-recursively to:

`FINAL_CURRENT`

This does not mean F21 is terminally frozen. Terminal status still requires closeout merge and terminal frozen-main evidence in Issue #98.

## 15. Closeout scope / remaining terminal chain

F21 closeout is exactly one commit changing exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F21_PUBLIC_PLAYER_RANKING.md`;
4. `docs/workstreams/F21_CLOSEOUT.md`.

No source/package/lockfile/workflow/dependency/runtime mutation is authorized.

Remaining terminal gates:
1. closeout compare = ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR without auto-closing Issue #98;
3. PR-context Full + F21 + F20/F19/F18/F17/F16 PASS;
4. mergeable=true, review threads=0 and exact implementation-main lock;
5. expected-head closeout merge;
6. terminal frozen-main Full + F21 + regressions PASS with artifacts/digests;
7. exact live-main verification;
8. terminal evidence in Issue #98 and close `completed`;
9. only then report `DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 16. Protected NEXT

After terminal F21:

`/players/$username` → `/host` → `/rules`.
