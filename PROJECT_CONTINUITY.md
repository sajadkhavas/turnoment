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

F14 START_SHA / previous frozen main:

`80d367fbf9da858a2c1cfb64df4714f136ff2c4c`

Current implementation main / closeout base:

`7ac7028d99d7088d0d3e079602a8ea3820ddb599`

Active frontend workstream:

`F14 — Player Teams Hub`

Status:

`MERGED / CLOSEOUT IN PROGRESS`

Route: `/dashboard/teams`

Tracking Issue: `#71`

Implementation branch: `phase/f14-player-teams`

Closeout branch: `closeout/f14-player-teams`

Target route status: `FINAL_PRIVATE`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 3. F14 accepted implementation evidence

- START_SHA: `80d367fbf9da858a2c1cfb64df4714f136ff2c4c`
- implementation branch: `phase/f14-player-teams`
- final reviewed implementation head: `2b66225dea1d30bb15a5dd7429fccab768440100`
- compare from START: ahead 1 / behind 0 / exactly one commit
- changed files: exactly 11 F14-owned files
- dependency/version drift: `NONE`; `package.json` only appended `player-teams-contract.spec.ts` to the existing test chain
- exact-head Frontend Quality Gate: `34539835524` — PASS
- exact-head artifact: `10176949167`
- exact-head digest: `sha256:c139d6bdc7a170966b2cc1bd1800cb43d45b065fc5ddcfaffe5c6d2ee89a41d1`
- manual visual QA at `375 / 390 / 430 / 768 / 1024 / 1440`: PASS
- browser regression: 90 screenshots
- implementation PR: `#72`
- PR-context Frontend Quality Gate: `34540376537` — PASS
- PR-context artifact: `10177139859`
- PR-context digest: `sha256:fc8651125bf59c1311baa63d49dc6f9285a7172e194f97bd6800b694f329f4a1`
- mergeable before merge: `true`
- unresolved implementation PR review threads before merge: `0`
- pre-merge frontend `main` reverified exact START_SHA
- expected-head implementation merge used
- implementation merge / current main: `7ac7028d99d7088d0d3e079602a8ea3820ddb599`
- post-implementation main Frontend Quality Gate: `34568920416` — PASS
- post-main artifact: `10187123251`
- post-main digest: `sha256:8596f2fcbc58a7e290ce5d82cb43bae62a35e0defcd59887ed9bb411c6c1b2ac`

The implementation is accepted. F14 is not terminally `DONE / MERGED / FROZEN` until the documentation-only closeout is merged, the frozen-main terminal Quality Gate/artifact/digest belongs to that exact frozen SHA, live `main` is reverified, and Issue #71 closes `completed`.

## 4. F14 permanent product / architecture truth

F14 is a private, read-only Player Teams Hub.

Permanent boundary:

`private dashboard access policy → validated team/page search → loader → typed PlayerTeamsRepository → runtime-validated current-player team membership/roster projection → UI`

Backend/repository owns:
- current team membership list;
- stable team identity/name;
- current-player role per membership (`captain | member`);
- member counts;
- explicit/default selected-team resolution;
- roster membership and stable player identity;
- roster member roles;
- summary and roster pagination.

Frontend owns only:
- validated URL navigation;
- final Persian presentation;
- membership switcher interaction;
- roster/role hierarchy;
- responsive/accessibility behavior;
- deterministic QA fixture behind the same permanent interface.

Frontend MUST NOT reconstruct current membership or role from tournament history.

Unknown/unauthorized requested team IDs collapse to `selectionState=unavailable`; the frontend shows only memberships already authorized in the current-player projection and does not reveal whether another team exists.

F14 explicitly introduces no:
- create/rename/delete team;
- invite/request/accept/decline membership;
- kick/remove/leave/captain transfer/promotion/demotion;
- roster-capacity rule;
- public/private team visibility policy;
- team rating/ranking;
- tournament/challenge eligibility inference;
- friend/social graph;
- Team Detail route;
- Challenge Hub mutation.

Validated URL state:
- `team=<stable-team-id>`; absence lets repository/server choose the authoritative default membership when one exists;
- `page=<positive integer>`; absence = 1.

Private metadata remains `noindex,nofollow`. Django web authentication truth remains Session; read requests use `credentials: include`; no localStorage/sessionStorage bearer contract exists.

## 5. Official documentation / design audit retained

Official references used by F14:
- TanStack Router Data Loading: `https://tanstack.com/router/latest/docs/guide/data-loading`;
- TanStack Start Selective SSR: `https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr`;
- TanStack Start Environment Variables: `https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables`;
- W3C WCAG 2.2: `https://www.w3.org/TR/WCAG22/`;
- GitHub organization People/role-list reference: `https://docs.github.com/en/account-and-profile/how-tos/organization-membership/viewing-peoples-roles-in-an-organization`.

Applied implications remain:
- only loader-consumed search state enters `loaderDeps`;
- SSR remains enabled/default and no browser-only dependency enters loader/repository selection;
- no client secret/bearer environment behavior is added;
- controls expose visible focus, touch-safe targets, semantic headings/status text and textual role labels;
- external member-list patterns informed information hierarchy only, not Turnoment permissions/actions.

Public SEO research is not applicable because F14 is private.

## 6. Backend F14 cross-repo alignment — terminal documentation truth

Repository: `sajadkhavas/turnoment-backend`

Backend START_SHA: `ddfdceaa9746cc6a60ad2b5e18e630c53904f00c`

Terminal evidence:
- Issue `#25` — CLOSED / COMPLETED;
- docs branch `docs/f14-player-teams-contract`;
- accepted docs head `26a2182f6d67a63a4a1dc9eef3daf7a030c85b50`;
- compare: ahead 1 / behind 0 / exactly one commit / exactly two Markdown files;
- PR `#26` — MERGED;
- PR Backend Quality Gate `34539140468` — PASS on Python 3.12 and 3.14;
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

- `/dashboard/challenges` remains isolated under its own Challenge Hub/Lovable acceptance chain and MUST NOT be modified by unrelated workstreams.
- `/dashboard/teams` is implementation-accepted as F14 and may be promoted non-recursively to `FINAL_PRIVATE` in closeout governance, but F14 remains non-terminal until Issue #71 closes after frozen-main evidence.
- public `/`, `/tournaments`, `/games`, `/centers`, `/centers/$id`, `/ranking`, `/players/$username`, `/host`, `/rules` require current-law recertification.
- inherited ecommerce/service/general routes remain `LEGACY_REVIEW` until explicit keep/remove/repurpose decisions.

## 9. Competitive truth retained

- Tournament Rating and Challenge Rating are separate;
- Challenge unlock = 30 finalized valid matches, not wins;
- no wager/betting/stake mechanics;
- frontend never determines finalized result/rating/dispute/challenge truth;
- F14 introduces no new Challenge or eligibility rule.

## 10. Exact NEXT

F14 closeout:
1. closeout branch is based on exact implementation merge `7ac7028d99d7088d0d3e079602a8ea3820ddb599`;
2. closeout diff must be one commit ahead / zero behind and exactly four Markdown files;
3. no runtime/workflow/package/contract/repository/adapter/test/Challenge/backend mutation is allowed;
4. closeout PR must pass the full Frontend Quality Gate;
5. require mergeable=true, unresolved review threads=0 and exact pre-merge main lock;
6. merge closeout with expected-head lock;
7. require terminal frozen-main Frontend Quality Gate plus artifact/digest belonging to exact frozen SHA;
8. reverify live frontend `main` exact frozen SHA;
9. record all terminal evidence in Issue #71 and close `completed`;
10. only then report `F14 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.

After F14 terminal freeze, no independent dashboard placeholder remains except the deliberately isolated Challenge Hub. The next non-Challenge workstream must be selected from current-law public recertification or an explicitly approved legacy/product decision.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
