# F14 — Player Teams Hub

Status: `MERGED / CLOSEOUT IN PROGRESS`

Route: `/dashboard/teams`

Tracking Issue: `#71`

START_SHA: `80d367fbf9da858a2c1cfb64df4714f136ff2c4c`

Implementation branch: `phase/f14-player-teams`

Closeout branch: `closeout/f14-player-teams`

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

That SHA is terminal F13 frozen main. F13 Issue #68 is CLOSED / COMPLETED; terminal Frontend Quality Gate `34537474356` PASS and artifact `10176084983` has digest `sha256:f7af1a069ed839cdec7da9bfa6b2f2ee0b8d95c8609811e24903aa2c9d01397b`.

The existing `/dashboard/teams` route was only `DashboardSectionPlaceholder`, with no loader, repository, runtime contract, roster projection, pagination or final Teams UI. No earlier F14/Teams Issue, PR or branch existed.

`/dashboard/challenges` remains isolated and outside F14 ownership.

## 2. Existing product truth audit

Accepted project contracts established only these team truths before F14:
- stable `teamId` and `teamName` in tournament participation;
- current-player team role can be `captain | member`;
- team-mode registration can expose `memberCount`/eligible-team projection;
- tournament registration eligibility is backend-authoritative.

F14 MUST NOT fold tournament history into authoritative current team membership or current role.

The registry's earlier broad “Team / Clan operations” description did not authorize inventing a mutation model. F14 therefore finalized the evidence-supported read hub only. Team management commands require a later explicit product/domain contract.

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

## 5. Query / projection truth

Validated search:
- `team=<stable-team-id>`; absence allows the repository/backend to return the authoritative default membership;
- `page=<positive-integer>`; absence = page 1.

A requested stable team ID that is not in the current player's permitted membership projection returns `selectionState=unavailable`; UI exposes only the caller's valid memberships and a reset path. It does not reveal whether an external team exists.

Projection:

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

Runtime validation rejects summary/membership drift, duplicate stable IDs, selected-team drift, impossible pagination, duplicate roster identities, captain inconsistencies, and current-player role mismatch.

## 6. Explicitly deferred behavior

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

## 7. Backend cross-repo alignment — terminal

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
- expected-head merge used;
- accepted backend main `1977db3c9995336166907b9fd85ac26093e6c254`;
- post-main Backend Quality Gate `34539329509` — PASS on Python 3.12 and 3.14;
- live backend main reverified exact accepted SHA.

Planned future endpoint: `GET /api/v1/me/teams/`.

No runtime Python/model/migration/serializer/view/URL/dependency/phase-registry implementation was added. Backend NEXT remains `P02 — Games / Catalog Foundation`. Runtime remains `FRONTEND MOCK / BACKEND PENDING`.

## 8. Accepted frontend implementation evidence

- implementation head: `2b66225dea1d30bb15a5dd7429fccab768440100`;
- compare from START: ahead 1 / behind 0 / exactly one commit / exactly 11 F14-owned files;
- dependency/version drift: NONE;
- exact-head Frontend Quality Gate `34539835524` — PASS;
- exact-head artifact `10176949167`;
- exact-head digest `sha256:c139d6bdc7a170966b2cc1bd1800cb43d45b065fc5ddcfaffe5c6d2ee89a41d1`;
- manual visual QA at `375 / 390 / 430 / 768 / 1024 / 1440` — PASS;
- browser regression: 90 screenshots;
- implementation PR `#72`;
- PR-context Frontend Quality Gate `34540376537` — PASS;
- PR-context artifact `10177139859`;
- PR-context digest `sha256:fc8651125bf59c1311baa63d49dc6f9285a7172e194f97bd6800b694f329f4a1`;
- PR mergeable before merge: true;
- unresolved review threads before merge: 0;
- exact pre-merge `main`: START_SHA;
- expected-head implementation merge used;
- implementation merge / closeout base: `7ac7028d99d7088d0d3e079602a8ea3820ddb599`;
- post-main Frontend Quality Gate `34568920416` — PASS;
- post-main artifact `10187123251`;
- post-main digest `sha256:8596f2fcbc58a7e290ce5d82cb43bae62a35e0defcd59887ed9bb411c6c1b2ac`.

The implementation and route architecture are accepted. `/dashboard/teams` may be promoted non-recursively to `FINAL_PRIVATE` in closeout governance.

## 9. Accessibility / responsive acceptance

Accepted widths:
`375 / 390 / 430 / 768 / 1024 / 1440`

Acceptance evidence includes:
- no horizontal overflow/clipping observed;
- safe Persian and LTR gamer-tag wrapping;
- touch-safe membership/pagination controls;
- visible focus states;
- semantic headings/list/status content;
- role meaning visible as text, never color-only;
- stable mobile/tablet/desktop hierarchy.

## 10. Closeout boundary

Closeout is documentation-only and must contain exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`
3. `docs/workstreams/F14_PLAYER_TEAMS.md`
4. `docs/workstreams/F14_CLOSEOUT.md`

Forbidden in closeout:
- runtime/application source changes;
- `.github/workflows` changes;
- `package.json`/lockfile/dependency changes;
- contract/repository/adapter/fixture/test changes;
- Challenge Hub/Detail changes;
- backend changes.

## 11. Non-recursive completion law

Committed closeout documentation intentionally does not self-record its own future merge SHA or terminal frozen-main run/artifact/digest. Those facts only exist after closeout merge and therefore belong in Issue #71.

Until terminal frozen-main QA is green and Issue #71 closes `completed`, F14 remains:

`MERGED / CLOSEOUT IN PROGRESS`

## 12. Exact NEXT

1. closeout compare must prove one commit ahead / zero behind and exactly four Markdown files;
2. closeout PR full Frontend Quality Gate must pass;
3. closeout PR must be mergeable and unresolved review threads must be zero;
4. pre-merge `main` must remain exact implementation merge `7ac7028d99d7088d0d3e079602a8ea3820ddb599`;
5. closeout must merge with expected-head lock;
6. terminal frozen-main Frontend Quality Gate must pass;
7. terminal artifact/digest must belong to exact frozen main SHA;
8. live `main` must be reverified exact frozen SHA;
9. Issue #71 must record terminal evidence and close `completed`;
10. only then report `F14 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.
