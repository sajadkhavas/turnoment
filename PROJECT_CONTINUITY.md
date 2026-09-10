# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-11`

## 1. Mandatory continuation law

Every chat/agent MUST:
1. read this file before implementation;
2. read `FRONTEND_PAGE_DELIVERY_PROTOCOL.md` for frontend page work;
3. read `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable pages or material public-copy changes;
4. read `docs/ROUTE_COMPLIANCE_REGISTRY.md` before modifying/accepting an existing route;
5. verify current `main` SHA of every repository it will change;
6. read relevant Issue/PR/workstream evidence before repeating work;
7. use a dedicated branch;
8. never claim `DONE / MERGED / FROZEN` from chat memory alone;
9. record exact branch/SHA/PR/CI/artifact evidence;
10. update both repositories when a cross-repo contract/global product truth changes.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `READY TO MERGE`, `MERGED / CLOSEOUT IN PROGRESS`, `DONE / MERGED / FROZEN`.

## 2. Current frontend repository truth

Repository: `sajadkhavas/turnoment`

Current frozen main / F14 START_SHA:

`80d367fbf9da858a2c1cfb64df4714f136ff2c4c`

That SHA is terminal F13 frozen main. F13 terminal Frontend Quality Gate `34537474356` passed; artifact `10176084983` digest is `sha256:f7af1a069ed839cdec7da9bfa6b2f2ee0b8d95c8609811e24903aa2c9d01397b`; Issue #68 is CLOSED / COMPLETED.

Active frontend workstream:

`F14 — Player Teams Hub`

Status:

`IN PROGRESS — IMPLEMENTATION / EXACT-HEAD QA`

Route: `/dashboard/teams`

Tracking Issue: `#71`

Branch: `phase/f14-player-teams`

Target: `FINAL_PRIVATE`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 3. F14 permanent product / architecture truth

Source audit proved `/dashboard/teams` was only a `DashboardSectionPlaceholder`. No previous F14/Teams Issue, PR or branch existed.

Existing accepted Turnoment truth before F14:
- team participation uses stable `teamId` and `teamName`;
- current-player role is `captain | member` when team participation is projected;
- team registration context can expose member count;
- tournament/team eligibility is backend-owned and MUST NOT be inferred by frontend.

F14 narrows the previously broad “Team / Clan operations” placeholder to the evidence-supported private read surface. No unsupported mutation policy is invented.

Permanent boundary:

`private dashboard access policy → validated team/page search → loader → typed PlayerTeamsRepository → runtime-validated current-player team membership/roster projection → UI`

Backend/repository owns:
- whether the current player belongs to any team;
- stable team IDs/names;
- current-player role per membership;
- team member counts;
- selected-team resolution;
- roster membership, player identity and role;
- summary and roster pagination.

Frontend owns only validated URL navigation, final Persian presentation, role/member-list hierarchy, responsive/accessibility behavior and deterministic QA fixture under the same contract.

Frontend MUST NOT reconstruct current membership or current role from tournament history.

F14 explicitly introduces no:
- create/rename/delete team;
- invite/request/accept/decline membership;
- kick/leave/captain transfer/promotion/demotion;
- team rating/ranking;
- tournament/challenge eligibility inference;
- friend/social graph;
- Team Detail route;
- Challenge Hub mutation.

Validated URL state:
- `team=<stable-team-id>`; absence lets repository/server choose the authoritative default membership when one exists;
- `page=<positive integer>`; absence = 1.

Required states: loading, populated, no-membership empty, unavailable/stale team-selection reset, error/retry, unauthenticated redirect and roster pagination.

## 4. F14 owned implementation scope

Exactly these implementation/governance files may change before closeout:
- `.github/workflows/frontend-quality.yml` for F14 SSR/browser/six-width evidence only;
- `PROJECT_CONTINUITY.md`;
- `docs/workstreams/F14_PLAYER_TEAMS.md`;
- `package.json` only to append F14 contract test;
- `src/components/dashboard/player-teams-page.tsx`;
- `src/lib/player-teams-contract.spec.ts`;
- `src/lib/player-teams-contract.ts`;
- `src/lib/player-teams-data.ts`;
- `src/lib/player-teams-http-repository.ts`;
- `src/lib/player-teams-repository.ts`;
- `src/routes/dashboard.teams.tsx`.

No dependency additions/removals/version changes are permitted. No Challenge Hub/Detail files are owned.

Browser regression target is 90 PNGs: previous 84 plus F14 at `375 / 390 / 430 / 768 / 1024 / 1440`.

## 5. Official documentation / design audit

Official sources reviewed before implementation:
- TanStack Router Data Loading: `https://tanstack.com/router/latest/docs/guide/data-loading`;
- TanStack Start Selective SSR: `https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr`;
- TanStack Start Environment Variables: `https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables`;
- W3C WCAG 2.2: `https://www.w3.org/TR/WCAG22/`;
- GitHub role-list pattern reference: `https://docs.github.com/en/account-and-profile/how-tos/organization-membership/viewing-peoples-roles-in-an-organization`.

Applied implications:
- only search inputs actually consumed by the loader are exposed through `loaderDeps`;
- SSR remains enabled/default and the loader contains no browser-only dependency;
- no secret is introduced into client environment state;
- focus-visible controls, touch-safe targets, semantic headings/status text and role labels are mandatory;
- external role/member UI informed hierarchy only; Turnoment permissions/actions were not copied.

Public SEO research is not applicable because F14 is private and explicit `noindex,nofollow` remains mandatory.

## 6. Backend F14 cross-repo alignment — terminal

Repository: `sajadkhavas/turnoment-backend`

Backend START_SHA:
`ddfdceaa9746cc6a60ad2b5e18e630c53904f00c`

Terminal evidence:
- Issue `#25` — CLOSED / COMPLETED;
- branch `docs/f14-player-teams-contract`;
- accepted docs head `26a2182f6d67a63a4a1dc9eef3daf7a030c85b50`;
- compare from START: ahead 1 / behind 0 / exactly one commit / exactly two Markdown files;
- PR `#26` — MERGED;
- PR Backend Quality Gate `34539140468` — PASS on Python 3.12 and 3.14;
- mergeable before merge `true`;
- unresolved review threads before merge `0`;
- pre-merge backend main exact START_SHA;
- expected-head merge used;
- accepted backend main `1977db3c9995336166907b9fd85ac26093e6c254`;
- post-main Backend Quality Gate `34539329509` — PASS on Python 3.12 and 3.14;
- live backend main reverified exact accepted SHA.

Planned future endpoint:
`GET /api/v1/me/teams/`

No Teams Python/model/migration/serializer/view/URL/dependency/phase-registry implementation was added. Runtime remains exactly `FRONTEND MOCK / BACKEND PENDING`.

Backend NEXT remains exactly `P02 — Games / Catalog Foundation`.

## 7. Previously frozen frontend truth

- F13 `/dashboard/achievements` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; frozen main `80d367fbf9da858a2c1cfb64df4714f136ff2c4c`; Issue #68 completed.
- F12 `/dashboard/rivalries` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #65 completed.
- F11 `/dashboard/settings` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #62 completed.
- F10 `/dashboard/notifications` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #59 completed.
- F09 `/dashboard/profile` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #56 completed.
- F08 `/register` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #53 completed.
- F07 `/login` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #50 completed.
- F06 `/matches/$id/dispute` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #47 completed.
- F05 `/matches/$id/result` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #44 completed.
- F04 `/dashboard/matches` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #41 completed.
- F03 `/dashboard/tournaments` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`; Issue #38 completed.
- F02 `/games/$slug` → `DONE / MERGED / FROZEN — FINAL_CURRENT`; Issue #29 contains terminal truth.
- F01 `/tournaments/$id` → `FINAL_PRE_SEO`; `/tournaments/$id/register` → `FINAL_PRIVATE`.

## 8. Remaining known work

- `/dashboard/challenges` remains isolated under its own Challenge Hub/Lovable acceptance chain and MUST NOT be modified by F14.
- `/dashboard/teams` is active F14 and non-final until terminal acceptance/closeout completes.
- public `/`, `/tournaments`, `/games`, `/centers`, `/centers/$id`, `/ranking`, `/players/$username`, `/host`, `/rules` require current-law recertification.
- inherited ecommerce/service/general routes remain `LEGACY_REVIEW` until explicit keep/remove/repurpose decisions.

## 9. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth;
- F14 introduces no new Challenge or eligibility rule.

## 10. Exact NEXT

F14 frontend:
1. create one clean implementation commit from exact START_SHA containing only the 11 F14-owned files;
2. compare must prove one commit ahead / zero behind, no dependency drift and no Challenge changes;
3. require exact-head Frontend Quality Gate PASS including 90-image regression;
4. manually inspect F14 at all six widths;
5. open implementation PR without auto-closing Issue #71;
6. require PR CI green, mergeable true, review threads 0 and exact pre-merge main lock;
7. expected-head merge;
8. require post-main Frontend Quality Gate/artifact/digest;
9. create documentation-only closeout from exact implementation merge;
10. require closeout PR CI + expected-head merge + terminal frozen-main Quality Gate/artifact/digest;
11. reverify exact live main;
12. record terminal evidence in Issue #71 and close completed;
13. only then report `F14 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
