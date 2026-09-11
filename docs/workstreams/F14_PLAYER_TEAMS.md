# F14 — Player Teams Hub

Status: `MERGED / CLOSEOUT IN PROGRESS`

Route: `/dashboard/teams`

Tracking Issue: `#71`

START_SHA: `80d367fbf9da858a2c1cfb64df4714f136ff2c4c`

Implementation branch: `phase/f14-player-teams`

Current closeout branch: `closeout/f14-player-teams-v2`

Target: `FINAL_PRIVATE`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 1. Mandatory preflight

Read before implementation/closeout:
- `PROJECT_CONTINUITY.md`;
- `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`;
- `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
- accepted F03 team-participation and F01 tournament-registration truth;
- backend continuity/protocol/registry/contract/engineering rules for cross-repo alignment.

Exact frontend main at F14 start:

`80d367fbf9da858a2c1cfb64df4714f136ff2c4c`

That SHA was terminal F13 frozen main. `/dashboard/teams` was only a placeholder before F14. `/dashboard/challenges` is outside F14 ownership and remains isolated.

## 2. Product truth audit

Accepted project contracts established only these team truths before F14:
- stable `teamId` and `teamName` in tournament participation;
- current-player role can be `captain | member`;
- team-mode registration can expose `memberCount`/eligible-team projection;
- tournament registration eligibility is backend-authoritative.

F14 MUST NOT reconstruct authoritative current membership or role from tournament history.

The earlier broad “Team / Clan operations” placeholder did not authorize inventing a mutation model. F14 therefore finalizes the evidence-supported read hub only. Team command/mutation behavior requires a later explicit domain workstream.

## 3. Official documentation audit

Official sources reviewed:
- TanStack Router Data Loading — `https://tanstack.com/router/latest/docs/guide/data-loading`;
- TanStack Start Selective SSR — `https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr`;
- TanStack Start Environment Variables — `https://tanstack.com/start/latest/docs/framework/react/guide/environment-variables`;
- W3C WCAG 2.2 — `https://www.w3.org/TR/WCAG22/`;
- GitHub organization People/role-list reference — `https://docs.github.com/en/account-and-profile/how-tos/organization-membership/viewing-peoples-roles-in-an-organization`.

Applied decisions:
- loader owns the private critical projection;
- only `team` and `page` consumed by loader enter `loaderDeps`;
- default SSR remains enabled; no browser-only dependency enters loader/repository selection;
- Django adapter reads with `credentials: include` and treats 401/403 as unauthenticated;
- no client secret/bearer-token environment behavior is added;
- member/role states use semantic text, visible keyboard focus and touch-safe controls;
- external member-list patterns informed hierarchy only, not Turnoment permissions/actions.

Public SEO research is not applicable. Private `noindex,nofollow` and final Persian product copy are mandatory.

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
- roster member roles;
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
- `team=<stable-team-id>`; absence lets repository/backend return the authoritative default membership;
- `page=<positive-integer>`; absence = page 1.

Unknown/unauthorized requested team IDs return `selectionState=unavailable`. The UI exposes only the caller's authorized memberships and does not reveal whether another team exists.

Projection truth:

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

Runtime validation rejects summary/membership drift, duplicate stable IDs, selected-team drift, impossible pagination, duplicate roster identities, captain inconsistencies and current-player role mismatch.

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

A future command workstream must define capability projection, server authorization, P01 CSRF, stale/concurrency handling, idempotency where relevant and typed outcomes before these controls may exist.

## 7. Backend cross-repo alignment — terminal

Backend repo: `sajadkhavas/turnoment-backend`.

Backend START_SHA: `ddfdceaa9746cc6a60ad2b5e18e630c53904f00c`.

Terminal evidence:
- Issue `#25` — CLOSED / COMPLETED;
- docs branch `docs/f14-player-teams-contract`;
- accepted docs head `26a2182f6d67a63a4a1dc9eef3daf7a030c85b50`;
- compare: ahead 1 / behind 0 / exactly one commit / exactly two Markdown files;
- PR `#26` — MERGED;
- PR Backend Quality Gate `34539140468` — PASS on Python 3.12 and 3.14;
- expected-head merge used;
- accepted backend main `1977db3c9995336166907b9fd85ac26093e6c254`;
- post-main Backend Quality Gate `34539329509` — PASS on Python 3.12 and 3.14;
- live backend main reverified exact accepted SHA.

Planned future endpoint: `GET /api/v1/me/teams/`.

No Teams runtime Python/model/migration/serializer/view/URL/dependency/phase-registry implementation was added. Backend NEXT remains `P02 — Games / Catalog Foundation`. Runtime remains `FRONTEND MOCK / BACKEND PENDING`.

## 8. Accepted frontend implementation evidence

- implementation head `2b66225dea1d30bb15a5dd7429fccab768440100`;
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
- unresolved implementation PR review threads: 0;
- exact pre-merge `main`: START_SHA;
- expected-head implementation merge used;
- implementation merge `7ac7028d99d7088d0d3e079602a8ea3820ddb599`;
- post-main Frontend Quality Gate `34568920416` — PASS;
- post-main artifact `10187123251`;
- post-main digest `sha256:8596f2fcbc58a7e290ce5d82cb43bae62a35e0defcd59887ed9bb411c6c1b2ac`.

The implementation and route architecture are accepted. `/dashboard/teams` may be promoted non-recursively to `FINAL_PRIVATE` in closeout governance.

## 9. Integrity reconciliation before closeout

The first closeout attempt was superseded before merge because live `main` advanced to Lovable merge `27cd5966cb46261b5b13c68572fc8bd78efe1906` and that drift removed/downgraded frozen F07–F14 truth while adding desired Challenge Hub work.

The stale closeout PR #73 was closed unmerged.

Dedicated reconciliation evidence:
- Issue `#74` — CLOSED / COMPLETED;
- branch `phase/reconcile-lovable-main-drift-f07-f14`;
- reconciliation head `5234c95ec886a745da9e5e5692a9f50fd8a17ee8`;
- PR `#75` — MERGED;
- Challenge Hub source preserved without declaring it final;
- accepted F07–F14 runtime/contracts/tests/docs restored;
- full Frontend Quality Gate restored;
- exact-head gate `34569833815` PASS; artifact `10187454962`; digest `sha256:972b7fdd4d8fb213136674e5172a286f8ac7d89c392563c8f83874d0d0858446`;
- PR-context gate `34570279191` PASS; artifact `10187585168`; digest `sha256:37519e695e8a4da546d225b40decfa84015d0dd9bbeafd22e50c1084d4d0042c`;
- reconciliation merge / healthy main `ad9fb57a2cf9d7d0e3bf927c90a3141880accd49`;
- post-main gate `34570626754` PASS;
- post-main artifact `10187726327`;
- post-main digest `sha256:31ff3b68eac75198489fc1115f25496e9141fdf87d8e77c41dd47f99d44ed33a`;
- live `main` reverified exact `ad9fb57a2cf9d7d0e3bf927c90a3141880accd49` before new closeout branch creation.

## 10. Accessibility / responsive acceptance

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

## 11. Closeout boundary

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

## 12. Non-recursive completion law

Committed closeout documentation intentionally does not self-record its own future merge SHA or terminal frozen-main run/artifact/digest. Those facts only exist after closeout merge and therefore belong in Issue #71.

Until terminal frozen-main QA is green and Issue #71 closes `completed`, F14 remains:

`MERGED / CLOSEOUT IN PROGRESS`

## 13. Exact NEXT

1. closeout base is exact healthy `main` `ad9fb57a2cf9d7d0e3bf927c90a3141880accd49`;
2. closeout compare must prove one commit ahead / zero behind and exactly four Markdown files;
3. closeout PR full Frontend Quality Gate must pass;
4. closeout PR must be mergeable with unresolved review threads = 0;
5. pre-merge `main` must remain exact `ad9fb57a2cf9d7d0e3bf927c90a3141880accd49`;
6. closeout must merge with expected-head lock;
7. terminal frozen-main Frontend Quality Gate must pass;
8. terminal artifact/digest must belong to exact frozen main SHA;
9. live `main` must be reverified exact frozen SHA;
10. Issue #71 must record terminal evidence and close `completed`;
11. only then report `F14 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.
