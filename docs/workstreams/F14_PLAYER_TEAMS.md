# F14 — Player Teams Hub

Status: `IN PROGRESS — IMPLEMENTATION / EXACT-HEAD QA`

Route: `/dashboard/teams`

Tracking Issue: `#71`

START_SHA: `80d367fbf9da858a2c1cfb64df4714f136ff2c4c`

Implementation branch: `phase/f14-player-teams`

Target: `FINAL_PRIVATE`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 1. Mandatory preflight

Read before implementation:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- current `src/routes/dashboard.teams.tsx` placeholder;
- accepted F03 team-participation and F01 tournament-registration contract truth;
- backend `PROJECT_CONTINUITY.md`, `PHASE_COMPLETION_PROTOCOL.md`, `docs/PHASE_REGISTRY.md`, `docs/FRONTEND_BACKEND_CONTRACT.md`, and `docs/ENGINEERING_RULES.md` before cross-repo alignment.

Exact frontend main at start:

`80d367fbf9da858a2c1cfb64df4714f136ff2c4c`

This is terminal F13 frozen main. F13 Issue #68 is CLOSED / COMPLETED; terminal Frontend Quality Gate `34537474356` PASS and artifact `10176084983` has digest `sha256:f7af1a069ed839cdec7da9bfa6b2f2ee0b8d95c8609811e24903aa2c9d01397b`.

The existing `/dashboard/teams` route was only `DashboardSectionPlaceholder`, with no loader, repository, runtime contract, roster projection, pagination or final Teams UI. No earlier F14/Teams Issue, PR or branch existed.

`/dashboard/challenges` remains isolated and outside F14 ownership.

## 2. Existing product truth audit

Accepted project contracts already establish only these team truths:
- stable `teamId` and `teamName` in tournament participation;
- current-player team role can be `captain | member`;
- team-mode registration can expose `memberCount`/eligible-team projection;
- tournament registration eligibility is backend-authoritative.

F14 MUST NOT fold tournament history into authoritative current team membership or current role.

The registry's earlier broad “Team / Clan operations” description does not authorize inventing a mutation model. F14 therefore finalizes the evidence-supported read hub only. Team management commands require a later explicit product/domain contract.

## 3. Official documentation audit

Official sources reviewed:
- TanStack Router Data Loading — `https://tanstack.com/router/latest/docs/guide/data-loading`;
- TanStack Start Selective SSR — `https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr`;
- TanStack Start Environment Variables — `https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables`;
- W3C WCAG 2.2 — `https://www.w3.org/TR/WCAG22/`;
- GitHub organization People/role-list reference — `https://docs.github.com/en/account-and-profile/how-tos/organization-membership/viewing-peoples-roles-in-an-organization`.

Applied decisions:
- loader owns the private critical projection;
- only `team` and `page` search state consumed by the loader enters `loaderDeps`;
- default SSR remains enabled; no browser-only dependency enters loader/repository selection;
- Django adapter reads with `credentials: include` and treats 401/403 as unauthenticated;
- no secret/client bearer-token environment behavior is added;
- member/role states have semantic text, touch-safe controls and visible keyboard focus;
- external member-list patterns inform hierarchy only; Turnoment permissions/actions are not copied.

Public SEO research is not applicable. Explicit `noindex,nofollow` and final Persian product copy are mandatory.

## 4. Permanent boundary

F14 is a private read-only Player Teams Hub.

`private dashboard access policy → validated team/page search → loader → typed PlayerTeamsRepository → runtime-validated current-player team membership/roster projection → UI`

Backend/repository owns:
- current team membership list;
- stable team identity/name;
- current-player role per membership;
- member counts;
- explicit/default selected-team resolution;
- roster membership and stable player identity;
- each roster member's role;
- summary and roster pagination.

Frontend owns:
- validated URL navigation;
- final Persian labels/copy;
- membership switcher interaction;
- roster/role presentation;
- responsive/accessibility behavior;
- deterministic QA fixture behind the same interface.

## 5. Query contract

Validated search:
- `team=<stable-team-id>`; absence allows the repository/backend to return the authoritative default membership;
- `page=<positive-integer>`; absence = page 1.

Invalid client search is normalized away. Backend validation/authorization remains authoritative.

A requested stable team ID that is not in the current player's permitted membership projection returns `selectionState=unavailable`; UI exposes only the caller's other valid memberships and a reset path. It does not reveal whether an external team exists.

## 6. Projection

```text
player
  playerId
  gamerTag

summary
  totalTeams
  captainOf
  memberOf

memberships[]
  teamId
  name
  role                 # captain | member
  memberCount

selectionState         # none | selected | unavailable
selectedTeam?
  teamId
  name
  currentPlayerRole    # captain | member
  memberCount
  roster[]
    playerId
    gamerTag
    role               # captain | member
  rosterPagination
    currentPage
    totalPages
    totalItems
```

Runtime validation rejects:
- role summary counts that do not partition memberships;
- summary total that differs from membership list size;
- duplicate membership team IDs;
- selected team outside returned memberships;
- selected name/role/member-count drift;
- member-count vs roster-total drift;
- impossible pagination;
- duplicate roster player IDs;
- multiple captains on one roster page;
- complete single-page roster without exactly one captain;
- current-player roster role inconsistent with selected-team role;
- selected state without selectedTeam;
- none state with nonzero memberships.

## 7. Explicitly deferred behavior

F14 does not introduce:
- create/rename/delete team;
- invite/request/accept/decline membership;
- kick/remove/leave actions;
- captain transfer/promotion/demotion;
- roster capacity rules;
- public/private team visibility;
- team rating/ranking;
- tournament/challenge eligibility inference;
- social/friend graph;
- Team Detail route/link;
- any Challenge Hub mutation.

A future command workstream must define capability projection, server authorization, P01 CSRF, stale/concurrency handling, idempotency where relevant and typed outcomes before these controls may appear as real product actions.

## 8. Backend cross-repo alignment — terminal

Backend repo: `sajadkhavas/turnoment-backend`.

Backend START_SHA: `ddfdceaa9746cc6a60ad2b5e18e630c53904f00c`.

Terminal evidence:
- Issue `#25` — CLOSED / COMPLETED;
- docs branch `docs/f14-player-teams-contract`;
- docs head `26a2182f6d67a63a4a1dc9eef3daf7a030c85b50`;
- compare: ahead 1 / behind 0 / exactly one commit / exactly two Markdown files;
- PR `#26` — MERGED;
- PR Backend Quality Gate `34539140468` — PASS on Python 3.12 and 3.14;
- mergeable before merge `true`;
- review threads before merge `0`;
- pre-merge backend main exact START;
- expected-head merge used;
- accepted backend main `1977db3c9995336166907b9fd85ac26093e6c254`;
- post-main Backend Quality Gate `34539329509` — PASS on Python 3.12 and 3.14;
- live backend main reverified exact accepted SHA.

Planned future endpoint: `GET /api/v1/me/teams/`.

No runtime Python/model/migration/serializer/view/URL/dependency/phase-registry implementation was added. Backend NEXT remains `P02 — Games / Catalog Foundation`. Runtime remains `FRONTEND MOCK / BACKEND PENDING`.

## 9. Required UI states

F14 owns:
- loading/pending skeleton;
- populated memberships and selected roster;
- no-membership empty state;
- unavailable/stale team-selection reset state;
- error/retry state;
- unauthenticated/session-expired redirect to Login;
- team switcher;
- roster pagination.

No mutation state exists because F14 is read-only.

## 10. Accessibility / responsive acceptance

Required widths:
`375 / 390 / 430 / 768 / 1024 / 1440`

Acceptance requires:
- no horizontal overflow/clipping;
- safe Persian and LTR gamer-tag wrapping/truncation;
- touch-safe team/pagination controls;
- visible focus states;
- semantic headings/list/navigation/status roles;
- role meaning visible as text, never color-only;
- stable mobile/desktop hierarchy.

## 11. Quality/evidence gate

Before implementation merge:
1. exact compare reviewed;
2. only F14-owned files changed;
3. no Challenge Hub/Detail mutations;
4. no dependency drift; `package.json` only appends F14 contract test;
5. frozen install PASS;
6. lint PASS;
7. production build/route generation PASS;
8. typecheck PASS;
9. F14 runtime contract tests PASS;
10. SSR/noindex/final-copy browser gate PASS;
11. browser regression expands 84 → 90 screenshots by adding F14 at all six widths;
12. manual six-width visual QA PASS;
13. implementation PR CI green, mergeable true, review threads 0;
14. expected-head implementation merge;
15. post-main QA/artifact green;
16. documentation-only closeout + terminal frozen-main QA before Issue #71 may close.

## 12. Exact NEXT

1. accept only one clean F14 implementation commit from exact START_SHA;
2. compare must prove only the 11 owned files, one commit ahead / zero behind and no dependency/Challenge drift;
3. require exact-head Frontend Quality Gate PASS and manually inspect all six F14 screenshots;
4. open implementation PR without auto-closing Issue #71;
5. require PR CI green, mergeable true, review threads 0 and exact pre-merge main lock;
6. expected-head implementation merge;
7. require post-main gate/artifact/digest;
8. create documentation-only closeout from exact implementation merge;
9. require closeout PR gate + expected-head merge + terminal frozen-main gate/artifact/digest;
10. reverify live main;
11. record terminal evidence in Issue #71 and close completed;
12. only then report `F14 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.
