# F22 — Public Player Profile Closeout

Status at document creation:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/players/$username`

Target route status: `FINAL_CURRENT`

Tracking Issue: `#101`

This is a non-recursive closeout snapshot. It records only evidence that already exists when this document is created. The future closeout head/merge/frozen-main SHA and terminal post-closeout CI/artifact/digest are intentionally not self-recorded here; they belong in Issue #101 after they exist.

## 1. Exact source lock

Frontend START_SHA:

`36e8685192fede45da8c4e82c32bdc41a2db1be2`

Implementation branch:

`phase/f22-public-player-profile`

Source implementation head:

`d8e2cb8448837b3d63cb9727ae44b1a892ab7d64`

Final reviewed implementation head:

`1e234e1c9877cb2c62f1b8e677d64356c5725a58`

Implementation PR:

`#102` — MERGED with expected-head lock.

Implementation merge / accepted main / closeout base:

`d1b1ff3bd24318e9714a6af7585c5b7299479db5`

Closeout branch:

`closeout/f22-public-player-profile`

## 2. Accepted permanent architecture

`validated username param → SSR loader → typed PublicPlayerProfileRepository → strict runtime-validated public profile projection → Public Player Profile UI`

Accepted production behavior:
- planned endpoint `GET /api/v1/players/{username}/public-profile/`;
- production defaults to Django HTTP repository;
- `VITE_API_BASE_URL` required;
- GET + credentials + JSON Accept;
- 404 collapses to public not-found;
- other non-2xx/contract failures fail closed;
- strict response validation;
- requested/returned username identity lock;
- fixtures remain dev/test/visual-QA only;
- no silent production fallback.

## 3. Identity / privacy / competitive truth acceptance

- `playerId` = stable backend relation identity;
- `username` = stable public profile-navigation identity;
- `gamerTag` = display text only and never a relation key.

Nonexistent, private/unpublished and otherwise non-public profiles collapse to the same public not-found surface.

Public projection excludes private account/contact/auth/moderation/verification/payment/secret data, including phone, email, private real identity and `interview_opt_in`.

Backend/repository eventually owns publication/search visibility, competitive rank/rating/record/movement and finalized public-result truth. Frontend owns presentation, SEO/canonical/robots, accessibility/responsive behavior and deterministic QA fixtures only. Frontend never derives authoritative win rate, rating, rank, movement, result validity or challenge eligibility.

## 4. Public SEO / final-copy acceptance

Title pattern:

`{gamerTag} | پروفایل بازیکن Turnoment`

Canonical:

`/players/{username}`

Robots:
- indexable public profile → `index,follow`;
- noindex public profile → `noindex,follow`;
- not-found → `noindex,nofollow`.

No ProfilePage JSON-LD is emitted merely for schema coverage. No fabricated best-player, popularity, official/national authority, ranking prestige or achievement claims are authorized.

Intent boundary remains:
- `/players/$username` = one public player entity/profile;
- `/ranking` = multi-player leaderboard/discovery;
- games routes = game discovery/detail;
- tournaments routes = event discovery;
- dashboard surfaces = private player-owned state.

## 5. Official documentation applied

Current official guidance reviewed/applied during F22 included:
- TanStack Router data loading / SSR and document head management;
- Google Search people-first/indexing metadata and ProfilePage applicability boundaries;
- WCAG 2.2 focus visibility and target-size/accessibility baseline;
- Django REST framework Permissions, Generic Views, Serializers, Validators and Exceptions for cross-repo contract alignment.

Key decisions: primary profile data is SSR-loaded, production fails closed, publication/privacy is backend-owned, stable public username is distinct from display gamer tag, anonymous future backend projection explicitly opts into `AllowAny`, and structured data is not added merely for coverage.

## 6. Cross-repo backend alignment

Backend repository: `sajadkhavas/turnoment-backend`.

F22 backend documentation alignment is terminal:
- Issue #41 CLOSED / COMPLETED;
- PR #42 MERGED;
- docs head `be805235925af8b70a6e8d183e5f8f363dd7c9cb`;
- exact-head gate `34688994229` PASS on Python 3.12 / 3.14;
- PR-context gate `34689064802` PASS on Python 3.12 / 3.14;
- backend merge/main `215fae68d8003b8df6c034b228d1121d96b0be18`;
- post-main gate `34689119713` PASS on Python 3.12 / 3.14;
- no Python/model/migration/serializer/view/URL/settings/dependency/workflow/phase-registry runtime implementation was added.

Current P01 `GET /api/v1/players/<gamer_tag>/` remains gamer-tag runtime truth. It is not silently reinterpreted as username identity.

Runtime remains `FRONTEND MOCK / BACKEND PENDING`.

Backend NEXT remains exactly `P02 — Games / Catalog Foundation`.

## 7. Exact implementation diff evidence

START → final reviewed head:
- ahead `2`;
- behind `0`;
- `2` commits;
- `12` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- package delta only appends F22 contract testing;
- frozen F16/F17/F18/F19/F20/F21/F02 route source is absent from the implementation diff.

## 8. Exact-head QA evidence

Reviewed head `1e234e1c9877cb2c62f1b8e677d64356c5725a58`:
- Full `34689322978` — PASS — artifact `10297071463` — digest `sha256:105d1dabb65b9ebf73b1efd03a573bfbd17e31959a00b2c03a88be59b01b831b`;
- F22 `34689323008` — PASS — artifact `10296652097` — digest `sha256:f4dad751ad6f231d0307b34ee065ccb303a806c4af429122a47d42e6190e1d46`.

Manual responsive evidence covered indexable and noindex states at `375 / 390 / 430 / 768 / 1024 / 1440` without observed horizontal overflow, clipping or overlap.

## 9. Implementation PR-context QA evidence

PR #102 pre-merge:
- mergeable `true`;
- unresolved review threads `0`;
- exact pre-merge main remained START_SHA;
- expected head `1e234e1c9877cb2c62f1b8e677d64356c5725a58` used.

PR-context gates — all PASS:
- Full `34689564225` — artifact `10296866945` — digest `sha256:b68d26de41197e7532ea2d1a59be3743797e0887888d93c7c22b43e1b7e18b5f`;
- F22 `34689564335` — artifact `10297046557` — digest `sha256:1d3bb290a5fc798905a2f42f34aebf4e37782d93fc1c18d356709ae5eb75ec7e`;
- F21 `34689564304` — artifact `10297266039` — digest `sha256:cd5eeb5b6a08bc32011a68a1b2b9e66e9ebe1f8814ed97f97f648f624f12d6f6`;
- F20 `34689564262` — artifact `10296257681` — digest `sha256:686ac9397ecf0d2c802ceec530ec9d3d83139e1db96aff18fe5362ebe7632661`;
- F19 `34689564295` — artifact `10296807097` — digest `sha256:d9373e5a0cd79ec232d4273d514482fd1880f34f92e86a15b2d786c298a3578e`;
- F18 `34689564267` — artifact `10296452384` — digest `sha256:f63dd625784117e5d98eaaf124c4074f17563e040230ff4c9cbdb0c4d94b6a7e`;
- F17 `34689564297` — artifact `10296646522` — digest `sha256:5edccb80166527973db55c079260c6025f33f04ae3da284404b750b574313371`;
- F16 `34689564243` — artifact `10296966747` — digest `sha256:9f85ae977cd0571e3f29207b92bee861a7e4f3eab2b01f2949aa16bdac3c2589`.

## 10. Post-main implementation QA evidence

Accepted implementation main `d1b1ff3bd24318e9714a6af7585c5b7299479db5`:
- Full `34696582708` — PASS — artifact `10298279733` — digest `sha256:6f20fcbc83b3a55b4420e4a86b6e5539be645df57ec767f679ec53af9aa0b475`;
- F22 `34696582677` — PASS — artifact `10299246223` — digest `sha256:c4628d6350affda50284c07a5a02ed66b9033a7b62a39ffebb2cccf908777320`;
- F21 `34696582664` — PASS — artifact `10299570131` — digest `sha256:1193aba9e605029f7d296bd9819192b96144117a829296d5acf4272ef4e7581a`;
- F20 `34696582676` — PASS — artifact `10298309370` — digest `sha256:b3cb6ae34c1a01f5697a1e1f1fc157cb7c7584f756449f1ee57ad543bd5d0541`;
- F19 `34696582758` — PASS — artifact `10298812119` — digest `sha256:1b1fbd512ae7dce313ced3cabd81c69a95cdaf7859d190540775608358899677`;
- F18 `34696582743` — PASS — artifact `10298324552` — digest `sha256:8fa737d685aadedd33e77041e6aa0373a7497be95642235cdf8a603dfb23d67c`;
- F17 `34696582642` — PASS — artifact `10298099830` — digest `sha256:f18d15feb42d150000882f8a5ea6498846e21b14ba954d2e631b2c41c18dca24`;
- F16 `34696582648` — PASS — artifact `10299291014` — digest `sha256:181a47040bc99cdcb4bb1bb29d15978dcc234ed2ce477b560400ff16c8191340`.

Exact live frontend `main` was reverified at implementation SHA after post-main QA. Implementation evidence is recorded in Issue #101 comment `5646216302`.

## 11. Route registry decision

Because implementation is merged and required post-main implementation gates are green, `/players/$username` is eligible for non-recursive promotion to `FINAL_CURRENT`.

This route-level promotion does not itself mean the F22 workstream is terminally frozen. Terminal workstream status still requires closeout merge and terminal frozen-main evidence in Issue #101.

## 12. Documentation-only closeout scope

This closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F22_PUBLIC_PLAYER_PROFILE.md`;
4. `docs/workstreams/F22_CLOSEOUT.md`.

Exactly one closeout commit is allowed. No source code, package, lockfile, workflow, runtime configuration, dependency or backend runtime phase change is authorized.

## 13. Remaining terminal gates

After this closeout snapshot is committed, F22 still requires:
1. exact closeout compare: ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to main without auto-closing Issue #101;
3. PR-context Full + F22 + F21/F20/F19/F18/F17/F16 gates PASS;
4. mergeable=true and unresolved review threads=0;
5. exact live-main lock at implementation merge SHA before closeout merge;
6. expected-head closeout merge;
7. terminal frozen-main Full + F22 + regressions PASS;
8. terminal artifact IDs and SHA-256 digests recorded in Issue #101;
9. exact live frontend main reverified;
10. Issue #101 updated with terminal evidence and CLOSED / COMPLETED.

Only after those future facts exist may the workstream be reported:

`F22 — DONE / MERGED / FROZEN — FINAL_CURRENT`

## 14. NEXT after F22 terminal freeze

`/host` → `/rules`.
