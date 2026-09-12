# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-12`

## 1. Mandatory continuation law

Every chat/agent MUST read `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable work, and `docs/ROUTE_COMPLIANCE_REGISTRY.md`; verify exact live `main`; use a dedicated branch/Issue/PR; preserve frozen routes; keep production fail-closed; and never claim `DONE / MERGED / FROZEN` from chat memory alone.

Terminal closeout SHA/CI belongs in the tracking Issue after merge. Do not create recursive documentation commits to self-record their own SHA.

## 2. Current frontend main / terminal baseline

Repository: `sajadkhavas/turnoment`.

Accepted F21 implementation merge / `main` at closeout creation:

`7868d191f07f038ba757e3a2593ffc400bb0c883`

Last terminal frozen baseline before F21 remains F20:

`b585e1e421c2e0febedf53e43349a23666004338`

F20 `/centers/$id` remains `DONE / MERGED / FROZEN — FINAL_CURRENT` with Issue #95 CLOSED / COMPLETED.

Previously frozen public routes remain protected:
- F16 `/`;
- F17 `/tournaments`;
- F18 `/games`;
- F19 `/centers`;
- F20 `/centers/$id`;
- F02 `/games/$slug`.

## 3. Active workstream — F21 Public Player Ranking

Route: `/ranking`.

Tracking Issue: `#98` — OPEN.

START_SHA:

`b585e1e421c2e0febedf53e43349a23666004338`

Implementation branch:

`phase/f21-public-player-ranking`

Final reviewed implementation head:

`b8aaad067ce64a376e8758daa2eda43e374fee65`

Implementation PR:

`#99` — MERGED with expected-head lock.

Implementation merge / accepted `main`:

`7868d191f07f038ba757e3a2593ffc400bb0c883`

Closeout branch:

`closeout/f21-public-player-ranking`

Current workstream status:

`MERGED / CLOSEOUT IN PROGRESS`

Because implementation merge and all required post-main implementation gates are accepted, route-level `/ranking` is eligible for non-recursive promotion to:

`FINAL_CURRENT`

F21 is not terminally frozen until closeout merge + terminal frozen-main CI/artifact evidence are recorded in Issue #98.

## 4. Permanent F21 architecture

`validated ranking search → loaderDeps → SSR loader → typed PlayerRankingRepository → strict runtime-validated ranking projection → Ranking UI`

Validated navigation state:
- `game`;
- `season`;
- `region`;
- `type=tournament|challenge`;
- `page`.

Planned production endpoint:

`GET /api/v1/rankings/`

Production behavior:
- production defaults to Django adapter;
- `VITE_API_BASE_URL` required;
- GET + `credentials: include` + JSON Accept;
- non-2xx fails closed;
- strict runtime validation;
- no production fixture fallback;
- no browser derivation of official rank, rating, movement or challenge eligibility.

## 5. Ranking ownership / identity truth

Backend/repository eventually owns leaderboard membership/order, stable player/profile/game/city identities, Tournament Rating and Challenge Rating projections, match record, movement, facets, filtering and pagination.

Frontend owns URL navigation state, presentation/final copy, SEO/canonical/robots, accessibility/responsive behavior and deterministic dev/test/visual-QA fixtures only.

Identity:
- `playerId` = stable relation identity;
- `username` = stable public profile-navigation identity;
- `gamerTag` = display text only, never a relation key.

Tournament Rating and Challenge Rating remain separate. F21 projects one authoritative `rating` paired with the active `ratingType`. Challenge eligibility is not calculated or inferred by the ranking page.

Runtime remains exactly:

`FRONTEND MOCK / BACKEND PENDING`

## 6. SEO / final-copy truth

H1:

`رتبه‌بندی بازیکنان مسابقات Turnoment`

Title:

`رتبه‌بندی بازیکنان مسابقات | Turnoment`

Description:

`جدول رتبه‌بندی بازیکنان Turnoment را بر اساس بازی، نوع امتیاز، فصل و محدوده ببین و جایگاه، امتیاز و روند رقابتی هر بازیکن را مقایسه کن.`

Indexing:
- base `/ranking` → canonical `/ranking`, robots `index,follow`;
- active game/season/region/type/page variants → canonical `/ranking`, robots `noindex,follow`.

No unsupported “best players”, national/official authority, popularity, search-volume or ranking-guarantee claims are authorized. No ranking structured data is emitted merely for schema coverage.

## 7. Implementation diff / exact-head evidence

Final reviewed head:

`b8aaad067ce64a376e8758daa2eda43e374fee65`

START → reviewed head:
- ahead `2`, behind `0`;
- `12` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- package delta only appends the F21 contract spec to the existing test command;
- frozen F16/F17/F18/F19/F20/F02 route source and `/players/$username` are untouched.

Exact-head QA:
- Full `34658428081` PASS — artifact `10286695439` — digest `sha256:37d32b0dee9d269dae0d946198953e0dfeb32c8a6bdfdadf3d01ab1b5c66130b`;
- F21 `34658428161` PASS — artifact `10285498773` — digest `sha256:7b5aed1406fa617e3ab33d1a9a56ba45916a580c6252f0d80cdebf1eb95a2e44`;
- base + filtered states manually inspected at 375/390/430/768/1024/1440 without observed horizontal overflow, clipping or overlap.

## 8. Implementation PR #99 acceptance

Before merge:
- `mergeable=true`;
- unresolved review threads `0`;
- exact live `main` remained START_SHA;
- expected head `b8aaad067ce64a376e8758daa2eda43e374fee65` was used.

PR-context gates:
- Full `34685943363` PASS — artifact `10295436520` — digest `sha256:1e7ac92a19138641ba3f9ba82d8623b11344e46b785aeea23dcefd4b9ee1c8e2`;
- F21 `34685943377` PASS — artifact `10295681648` — digest `sha256:10a78d4e220de71af3f2144d2597eb8d3bb123a2b093be8a826c39de36606f28`;
- F20 `34685943390` PASS — artifact `10295901294` — digest `sha256:c4b50d127896add40caede3e123e7406989f236131d4e485bc368c027c02c52d`;
- F19 `34685943358` PASS — artifact `10295482086` — digest `sha256:82c5696e8993be95d85c131e34f3594438ee8997d2299ddab566a07d136db35b`;
- F18 `34685943344` PASS — artifact `10296005938` — digest `sha256:0eb32164b263129ae2c8bf8235e4ad7c0e9016373b12391e340476a9009342f7`;
- F17 `34685943345` PASS — artifact `10296085682` — digest `sha256:7dd2d6ab1e13505c6ba1509338cfce4447febba24114863231f93d31a3254231`;
- F16 `34685943368` PASS — artifact `10295681634` — digest `sha256:2573564544240e8fb052b3b1d9cdc78617d21c2f12f9ceaad994d8a6854a9f8`.

## 9. Post-main implementation QA

Accepted implementation main:

`7868d191f07f038ba757e3a2593ffc400bb0c883`

Post-main gates:
- Full `34686214152` PASS — artifact `10295279066` — digest `sha256:b5bc70fe4337256eeffe534ada2660ee2d1bcc2c54fe44555c3751a9d15af683`;
- F21 `34686214160` PASS — artifact `10295836799` — digest `sha256:7ae813642945ff350419f94513b826ad24bd9f28201deefed6029ff15f3a2bfd`;
- F20 `34686214190` PASS — artifact `10296091142` — digest `sha256:35fdaaacdfc5f51cdf95a4633497d731dfbb7d61af67b25e4e67df2bb1108b39`;
- F19 `34686214168` PASS — artifact `10295457457` — digest `sha256:66fcc833e7095dd7ee987ba2b846cc656182927a71e8cee59e70376460720e26`;
- F18 `34686214210` PASS — artifact `10296096060` — digest `sha256:b62f4bcb39828bc153a43e6ab0b7791f0713d16b9d029616aac1cdb90998652a`;
- F17 `34686214170` PASS — artifact `10295427724` — digest `sha256:0dae7233c3da60d6e85b41f904df5a2945c3abeb04c76ec059d6a33418bab3d4`;
- F16 `34686214212` PASS — artifact `10295742002` — digest `sha256:4da8ac415b26a422b0df806f79266bfa4cc9d52b165954b299c68a15ae27ad93`.

Live `main` was reverified exact implementation merge before closeout branch creation.

## 10. Backend F21 alignment

Backend Issue #39 is CLOSED / COMPLETED and PR #40 is MERGED. Backend main after documentation-only alignment is:

`44f18e462f63c625bc02e07ef93c15f1c385dcd0`

PR-context Backend Quality Gate `34658090539` and post-main Backend Quality Gate `34658179049` both PASS on Python 3.12 / 3.14. No ranking runtime implementation or backend phase reorder was added.

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

## 11. Documentation-only closeout law

F21 closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F21_PUBLIC_PLAYER_RANKING.md`;
4. `docs/workstreams/F21_CLOSEOUT.md`.

Exactly one closeout commit is allowed. No source, package, lockfile, workflow, dependency or runtime configuration mutation is authorized.

The future closeout merge/frozen-main SHA and terminal CI/artifact/digest evidence are intentionally not self-recorded here. They belong in Issue #98 after they exist.

## 12. Remaining terminal chain

1. verify closeout compare = ahead 1 / behind 0 / exactly one commit / exactly four Markdown files;
2. open closeout PR without auto-closing Issue #98;
3. require PR-context Full + F21 + F20/F19/F18/F17/F16 regressions PASS;
4. require mergeable=true, unresolved review threads=0 and exact live-main lock at implementation merge SHA;
5. expected-head closeout merge;
6. require terminal frozen-main Full + F21 + regressions PASS with artifact IDs/digests;
7. reverify exact live `main`;
8. record terminal evidence in Issue #98 and close `completed`;
9. only then report `F21 — DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 13. NEXT after terminal F21

`/players/$username` → `/host` → `/rules`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
