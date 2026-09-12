# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-12`

## 1. Mandatory continuation law

Every chat/agent MUST read `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable work, and `docs/ROUTE_COMPLIANCE_REGISTRY.md`; verify exact live `main`; use a dedicated branch/Issue/PR; preserve frozen routes; keep production fail-closed; and never claim `DONE / MERGED / FROZEN` from chat memory alone.

Terminal closeout SHA/CI belongs in the tracking Issue after merge. Do not create recursive documentation commits to self-record their own SHA.

## 2. Current frontend baseline

Repository: `sajadkhavas/turnoment`.

Accepted F22 implementation merge / exact `main` at closeout creation:

`d1b1ff3bd24318e9714a6af7585c5b7299479db5`

F21 `/ranking` remains terminally frozen at the prior baseline chain, and all earlier frozen public routes remain protected:
- F16 `/`;
- F17 `/tournaments`;
- F18 `/games`;
- F19 `/centers`;
- F20 `/centers/$id`;
- F21 `/ranking`;
- F02 `/games/$slug`.

## 3. Active closeout — F22 Public Player Profile

Route: `/players/$username`.

Tracking Issue: `#101` — OPEN.

F22 START_SHA:

`36e8685192fede45da8c4e82c32bdc41a2db1be2`

Implementation branch:

`phase/f22-public-player-profile`

Source implementation head:

`d8e2cb8448837b3d63cb9727ae44b1a892ab7d64`

Final reviewed implementation head:

`1e234e1c9877cb2c62f1b8e677d64356c5725a58`

Implementation PR:

`#102` — MERGED with expected-head lock.

Implementation merge / accepted `main`:

`d1b1ff3bd24318e9714a6af7585c5b7299479db5`

Closeout branch:

`closeout/f22-public-player-profile`

Current workstream status:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Because the implementation merge and all required post-main gates are accepted, route-level `/players/$username` is eligible for non-recursive promotion to `FINAL_CURRENT`. F22 itself is not terminally frozen until closeout merge + terminal frozen-main evidence are recorded in Issue #101.

## 4. Permanent F22 architecture

`validated username param → SSR loader → typed PublicPlayerProfileRepository → strict runtime-validated public profile projection → Public Player Profile UI`

Production target:

`GET /api/v1/players/{username}/public-profile/`

Production behavior:
- production defaults to Django adapter;
- `VITE_API_BASE_URL` required;
- GET + `credentials: include` + JSON Accept;
- 404 maps to one public not-found state;
- other non-2xx/contract failures fail closed;
- strict runtime validation;
- requested/returned username identity must match;
- deterministic fixtures remain dev/test/visual-QA only;
- no production fixture fallback.

Runtime remains exactly:

`FRONTEND MOCK / BACKEND PENDING`

## 5. Identity / publication / privacy truth

- `playerId` = stable backend relation identity;
- `username` = stable public profile-navigation identity;
- `gamerTag` = public display text only, never a relation key.

Private, unpublished, nonexistent, or otherwise non-public identities collapse to the same public not-found surface.

The accepted public DTO excludes phone/email/private real identity/`interview_opt_in`, auth/session/OTP data, staff/groups/permissions, moderation/verification evidence, payment/refund/settlement data, secrets/configuration and other private account fields.

Backend/repository eventually owns publication/search visibility and competitive rank/rating/record/movement/result truth. Frontend owns presentation, SEO/canonical/robots, accessibility/responsive behavior and deterministic QA fixtures only. Frontend MUST NOT calculate authoritative win rate, rating, rank, movement, result validity or challenge eligibility.

## 6. SEO / indexing truth

Found profile title pattern:

`{gamerTag} | پروفایل بازیکن Turnoment`

Canonical found profile:

`/players/{username}`

Robots:
- `searchVisibility=indexable` → `index,follow`;
- `searchVisibility=noindex` → `noindex,follow`;
- public not-found → `noindex,nofollow`.

No ProfilePage JSON-LD is emitted merely for schema coverage. No unsupported “best player”, national/official authority, popularity or inferred-achievement claim is authorized.

## 7. Reviewed-head evidence

START → reviewed head `1e234e1c9877cb2c62f1b8e677d64356c5725a58`:
- ahead `2` / behind `0`;
- `2` commits;
- `12` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- package delta is test wiring only;
- frozen F16/F17/F18/F19/F20/F21/F02 route source is untouched.

Exact reviewed-head QA:
- Full `34689322978` PASS — artifact `10297071463` — digest `sha256:105d1dabb65b9ebf73b1efd03a573bfbd17e31959a00b2c03a88be59b01b831b`;
- F22 `34689323008` PASS — artifact `10296652097` — digest `sha256:f4dad751ad6f231d0307b34ee065ccb303a806c4af429122a47d42e6190e1d46`.

Manual visual review covered indexable/noindex states at 375/390/430/768/1024/1440 with no observed horizontal overflow, clipping or overlap.

## 8. Implementation PR #102 acceptance

Before merge:
- `mergeable=true`;
- unresolved review threads `0`;
- exact live `main` remained F22 START;
- expected head `1e234e1c9877cb2c62f1b8e677d64356c5725a58` was used.

PR-context gates — all PASS:
- Full `34689564225` — artifact `10296866945` — digest `sha256:b68d26de41197e7532ea2d1a59be3743797e0887888d93c7c22b43e1b7e18b5f`;
- F22 `34689564335` — artifact `10297046557` — digest `sha256:1d3bb290a5fc798905a2f42f34aebf4e37782d93fc1c18d356709ae5eb75ec7e`;
- F21 `34689564304` — artifact `10297266039` — digest `sha256:cd5eeb5b6a08bc32011a68a1b2b9e66e9ebe1f8814ed97f97f648f624f12d6f6`;
- F20 `34689564262` — artifact `10296257681` — digest `sha256:686ac9397ecf0d2c802ceec530ec9d3d83139e1db96aff18fe5362ebe7632661`;
- F19 `34689564295` — artifact `10296807097` — digest `sha256:d9373e5a0cd79ec232d4273d514482fd1880f34f92e86a15b2d786c298a3578e`;
- F18 `34689564267` — artifact `10296452384` — digest `sha256:f63dd625784117e5d98eaaf124c4074f17563e040230ff4c9cbdb0c4d94b6a7e`;
- F17 `34689564297` — artifact `10296646522` — digest `sha256:5edccb80166527973db55c079260c6025f33f04ae3da284404b750b574313371`;
- F16 `34689564243` — artifact `10296966747` — digest `sha256:9f85ae977cd0571e3f29207b92bee861a7e4f3eab2b01f2949aa16bdac3c2589`.

## 9. Post-main implementation QA

Accepted implementation main:

`d1b1ff3bd24318e9714a6af7585c5b7299479db5`

Post-main gates — all PASS:
- Full `34696582708` — artifact `10298279733` — digest `sha256:6f20fcbc83b3a55b4420e4a86b6e5539be645df57ec767f679ec53af9aa0b475`;
- F22 `34696582677` — artifact `10299246223` — digest `sha256:c4628d6350affda50284c07a5a02ed66b9033a7b62a39ffebb2cccf908777320`;
- F21 `34696582664` — artifact `10299570131` — digest `sha256:1193aba9e605029f7d296bd9819192b96144117a829296d5acf4272ef4e7581a`;
- F20 `34696582676` — artifact `10298309370` — digest `sha256:b3cb6ae34c1a01f5697a1e1f1fc157cb7c7584f756449f1ee57ad543bd5d0541`;
- F19 `34696582758` — artifact `10298812119` — digest `sha256:1b1fbd512ae7dce313ced3cabd81c69a95cdaf7859d190540775608358899677`;
- F18 `34696582743` — artifact `10298324552` — digest `sha256:8fa737d685aadedd33e77041e6aa0373a7497be95642235cdf8a603dfb23d67c`;
- F17 `34696582642` — artifact `10298099830` — digest `sha256:f18d15feb42d150000882f8a5ea6498846e21b14ba954d2e631b2c41c18dca24`;
- F16 `34696582648` — artifact `10299291014` — digest `sha256:181a47040bc99cdcb4bb1bb29d15978dcc234ed2ce477b560400ff16c8191340`.

Exact live `main` was reverified at the implementation merge after these gates. Implementation evidence is recorded in Issue #101 comment `5646216302`.

## 10. Backend F22 alignment

Backend F22 documentation alignment is terminal:
- Issue #41 CLOSED / COMPLETED;
- PR #42 MERGED;
- docs head `be805235925af8b70a6e8d183e5f8f363dd7c9cb`;
- backend merge/main `215fae68d8003b8df6c034b228d1121d96b0be18`;
- exact-head `34688994229`, PR-context `34689064802`, and post-main `34689119713` all PASS on Python 3.12 / 3.14.

Current P01 `GET /api/v1/players/<gamer_tag>/` remains gamer-tag runtime truth and is not silently reinterpreted as stable username. The F22 target endpoint remains planned until the owning backend runtime phase supplies stable username/compatibility/competitive projection.

Backend NEXT remains exactly `P02 — Games / Catalog Foundation`.

## 11. Documentation-only closeout law

F22 closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F22_PUBLIC_PLAYER_PROFILE.md`;
4. `docs/workstreams/F22_CLOSEOUT.md`.

Exactly one closeout commit is allowed. No source, package, lockfile, workflow, dependency or runtime configuration mutation is authorized.

The future closeout merge/frozen-main SHA and terminal CI/artifact/digest evidence are intentionally not self-recorded here. They belong in Issue #101 after they exist.

## 12. Remaining terminal chain

1. verify closeout compare = ahead 1 / behind 0 / exactly one commit / exactly four Markdown files;
2. open closeout PR without auto-closing Issue #101;
3. require PR-context Full + F22 + F21/F20/F19/F18/F17/F16 PASS;
4. require mergeable=true, unresolved review threads=0 and exact live-main lock at implementation merge SHA;
5. expected-head closeout merge;
6. require terminal frozen-main Full + F22 + regressions PASS with artifact IDs/digests;
7. reverify exact live `main`;
8. record terminal evidence in Issue #101 and close `completed`;
9. only then report `F22 — DONE / MERGED / FROZEN — FINAL_CURRENT`.

## 13. NEXT after terminal F22

`/host` → `/rules`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
