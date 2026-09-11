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
5. verify exact live `main` SHA of every repository it will change;
6. read relevant Issue/PR/workstream evidence before repeating work;
7. use a dedicated branch;
8. never claim `DONE / MERGED / FROZEN` from chat memory alone;
9. record exact branch/SHA/PR/CI/artifact evidence;
10. update both repositories when a cross-repo contract/global product truth changes.

Allowed statuses: `PLANNED`, `IN PROGRESS`, `PARTIAL / SAFE CHECKPOINT`, `READY TO MERGE`, `MERGED / CLOSEOUT IN PROGRESS`, `DONE / MERGED / FROZEN`.

## 2. Current frontend repository truth

Repository: `sajadkhavas/turnoment`

F15 START_SHA / previous frozen main:

`398e963f1ecdbe86013ce3b0052c4e1891f48854`

Accepted F15 implementation merge / current healthy closeout base:

`5db25c291a250a94676e143ba11642c86b2f8152`

Active frontend workstream:

`F15 — Player Challenge Hub`

Status:

`MERGED / CLOSEOUT IN PROGRESS`

Route: `/dashboard/challenges`

Tracking Issue: `#77`

Implementation branch: `phase/f15-player-challenge-hub`

Closeout branch: `closeout/f15-player-challenge-hub`

Target route status: `FINAL_PRIVATE`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 3. F15 accepted implementation evidence

- START_SHA: `398e963f1ecdbe86013ce3b0052c4e1891f48854`;
- final reviewed implementation head: `e9110fc6e01220e17e728dc0e491fff1a0b979c0`;
- compare from START: ahead 1 / behind 0 / exactly one implementation commit;
- exactly 12 F15-owned files;
- no dependency/version/lockfile drift;
- exact-head Frontend Quality Gate `34584422266` — PASS;
- exact-head artifact `10193125417`;
- exact-head digest `sha256:c6a547e94003645daccf0acc3dec19181834fe9f46198b9039317b3d6f025e99`;
- browser regression: exactly 96 screenshots;
- manual visual QA at `375 / 390 / 430 / 768 / 1024 / 1440` — PASS;
- implementation PR `#79`;
- PR-context Frontend Quality Gate `34585124291` — PASS;
- PR-context artifact `10193400756`;
- PR-context digest `sha256:9e4fc717f2ad00ad7581acf6215db8ec524772d520f4e4030e90ac7a2075976a`;
- implementation PR mergeable before merge: `true`;
- unresolved implementation PR review threads: `0`;
- exact pre-merge main remained START_SHA;
- expected-head implementation merge used;
- implementation merge `5db25c291a250a94676e143ba11642c86b2f8152`;
- post-implementation main Frontend Quality Gate `34585660833` — PASS;
- post-main artifact `10193629332`;
- post-main digest `sha256:e29f1e77ee9347fc917df4ee4d594f5d9f9896438183ee44edf5391b51da8821`;
- live frontend main reverified exact implementation merge before closeout branch creation.

The implementation/route architecture is accepted. F15 is not terminally `DONE / MERGED / FROZEN` until documentation-only closeout is merged, terminal frozen-main QA/artifact/digest belongs to that exact closeout merge SHA, live `main` is reverified and Issue #77 closes `completed`.

## 4. F15 permanent product / architecture truth

Permanent boundary:

`private dashboard access policy → validated status/page search → loader → typed ChallengeHubRepository → runtime-validated Challenge projection/commands → authoritative reload → UI`

Backend/repository owns:
- Challenge unlock/access and `canCreate`;
- Challenge Rating, separate from Tournament Rating;
- current-player Challenge list/scope;
- stable Challenge identity and opaque revision;
- direction/lifecycle/status/action-required truth;
- allowed commands;
- creation games/formats/policy;
- opponent-search eligibility and stable player identity;
- Match/result/rating projection;
- typed navigation targets;
- summary/pagination;
- create/respond/cancel authorization, stale state and typed outcomes.

Frontend owns only validated navigation/search state, final Persian presentation, form/confirmation/pending feedback, deterministic QA adapter behind the same contract and router invalidation after mutations.

Frontend MUST NOT optimistically own Challenge lifecycle/result/rating/eligibility.

## 5. Competitive/security invariants

- Tournament Rating and Challenge Rating remain separate.
- Challenge unlock = `30` finalized valid Matches, not wins.
- no wager/betting/stake mechanics.
- opponent relationship uses stable `playerId`; display text is not the relationship key.
- create uses server-projected stable `gameId` + `formatId`.
- respond/cancel use opaque Challenge revision.
- create/respond/cancel use one idempotency key per logical attempt.
- unsafe requests use P01 Django Session + CSRF bootstrap + `credentials: include` + `X-CSRFToken`.
- no localStorage/sessionStorage bearer contract.
- no Challenge Detail route is introduced by F15.
- Hub navigation is limited to typed targets for already accepted Match routes.
- private metadata remains `noindex,nofollow`.

## 6. Backend F15 cross-repo alignment — terminal documentation truth

Repository: `sajadkhavas/turnoment-backend`

Backend alignment START_SHA: `1977db3c9995336166907b9fd85ac26093e6c254`.

Terminal evidence:
- Issue `#27` — CLOSED / COMPLETED;
- docs branch `docs/f15-player-challenge-hub-contract`;
- accepted docs head `184c4a5baaa5ddd464d98cd8ae01c2c65397393b`;
- compare: ahead 1 / behind 0 / exactly one commit / exactly two Markdown files;
- PR `#28` — MERGED;
- PR Backend Quality Gate `34583290252` — PASS on Python 3.12 and 3.14;
- accepted backend main `c72ec545782a25719009ae329d74ffd13259d020`;
- post-main Backend Quality Gate `34584360023` — PASS;
- live backend main reverified exact accepted SHA.

Planned authenticated API family:
- `GET /api/v1/me/challenges/`;
- `GET /api/v1/me/challenges/opponents/`;
- `POST /api/v1/me/challenges/`;
- `POST /api/v1/me/challenges/{challengeId}/response/`;
- `POST /api/v1/me/challenges/{challengeId}/cancel/`.

No Challenge Python/model/migration/serializer/view/URL runtime implementation was added by this alignment. Runtime therefore remains exactly `FRONTEND MOCK / BACKEND PENDING`.

Backend NEXT remains exactly `P02 — Games / Catalog Foundation`.

## 7. Official documentation audit retained

Official sources used by F15:
- TanStack Router Data Loading — `https://tanstack.com/router/latest/docs/guide/data-loading`;
- TanStack Router Data Mutations — `https://tanstack.com/router/latest/docs/guide/data-mutations`;
- Django CSRF — `https://docs.djangoproject.com/en/6.0/ref/csrf/`;
- Django AJAX CSRF — `https://docs.djangoproject.com/en/dev/howto/csrf/`;
- DRF SessionAuthentication — `https://www.django-rest-framework.org/api-guide/authentication/`;
- W3C WAI-ARIA modal dialog pattern — `https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/`;
- W3C WAI-ARIA alert dialog pattern — `https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/`.

Applied implications remain: loader-owned validated search, authoritative revalidation after mutations, CSRF for unsafe SessionAuthentication calls, modal/alert-dialog focus semantics, visible focus and touch-safe controls.

## 8. Previously frozen frontend truth

F01–F14 accepted/frozen truth remains unchanged. F14 `/dashboard/teams` terminal frozen main is the F15 START_SHA above.

Public `/`, `/tournaments`, `/games`, `/centers`, `/centers/$id`, `/ranking`, `/players/$username`, `/host`, `/rules` still require current-law recertification. Legacy commerce/service/general routes remain `LEGACY_REVIEW` until an explicit product decision.

After F15 closes, no known player-dashboard placeholder remains. The next independent frontend workstream should therefore come from current-law public recertification or an explicitly approved legacy/product decision, not invented dashboard scope.

## 9. Exact F15 NEXT

1. closeout compare must prove one commit ahead / zero behind and exactly four Markdown files;
2. open closeout PR without auto-closing Issue #77;
3. require closeout PR Frontend Quality Gate PASS, mergeable=true and review threads=0;
4. reverify exact pre-merge main equals implementation merge `5db25c291a250a94676e143ba11642c86b2f8152`;
5. merge closeout with expected-head lock;
6. require terminal frozen-main Frontend Quality Gate PASS and artifact/digest on the exact closeout merge SHA;
7. reverify live main exact frozen SHA;
8. record terminal evidence in Issue #77 and close `completed`;
9. only then report `F15 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.
