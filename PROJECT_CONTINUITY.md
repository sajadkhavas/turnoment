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

Current frozen main / F15 START_SHA:

`398e963f1ecdbe86013ce3b0052c4e1891f48854`

That SHA is terminal F14 frozen main.

F14 terminal evidence:
- route `/dashboard/teams` → `DONE / MERGED / FROZEN — FINAL_PRIVATE`;
- Issue `#71` — CLOSED / COMPLETED;
- closeout PR `#76` — MERGED;
- frozen main `398e963f1ecdbe86013ce3b0052c4e1891f48854`;
- terminal Frontend Quality Gate `34574038117` — PASS;
- terminal artifact `10189030449`;
- digest `sha256:e4f1a951192fc1d6a5a6d7d17b0b8c634ecbd2a3921eb3abef63d1bb6987bf2c`.

Active frontend workstream:

`F15 — Player Challenge Hub`

Status:

`IN PROGRESS — LOVABLE PRODUCTIONIZATION`

Route: `/dashboard/challenges`

Tracking Issue: `#77`

Implementation branch: `phase/f15-player-challenge-hub`

Target route status: `FINAL_PRIVATE`

Runtime truth: `FRONTEND MOCK / BACKEND PENDING`

## 3. F15 preflight truth

The preserved Lovable Challenge Hub source was intentionally retained during integrity reconciliation but was never certified/frozen.

Source audit at F15 START proved:
- private route/search/loader/read scaffold exists;
- visual list/filter/access cards exist;
- create button was dead and only displayed implementation-stage placeholder copy;
- accept/decline/cancel only set local pending text and did not call a repository command;
- `view` was a no-op;
- existing repository contract was read-only;
- browser regression did not include `/dashboard/challenges`.

F15 therefore productionizes the existing design rather than rebuilding it blindly.

## 4. F15 permanent architecture truth

Permanent boundary:

`private dashboard access policy → validated status/page search → loader → typed ChallengeHubRepository → runtime-validated Challenge projection/commands → authoritative reload → UI`

Backend/repository owns:
- Challenge unlock/access and `canCreate`;
- Challenge Rating;
- current-player Challenge list/scope;
- stable Challenge identity and opaque revision;
- direction/lifecycle/status/action-required truth;
- allowed commands;
- creation games/formats/policy;
- opponent-search eligibility and stable player identity;
- Match/result/rating projection;
- typed navigation target;
- summary/pagination;
- create/respond/cancel authorization, stale state and command outcomes.

Frontend owns:
- validated URL navigation;
- final Persian presentation;
- creation form state and server-projected option selection;
- confirmation UX;
- mutation pending/feedback presentation;
- deterministic QA adapter behind the same permanent contract;
- route invalidation after mutations so authoritative truth reloads.

Frontend MUST NOT optimistically own Challenge lifecycle/result/rating/eligibility.

## 5. Permanent competitive/security truth

- Tournament Rating and Challenge Rating are separate.
- Challenge unlock = exactly `30` finalized valid Matches under current product law, not wins.
- no wager/betting/stake mechanics.
- opponent relationship uses stable `playerId` returned by authoritative opponent search; display text is not the relationship key.
- create uses server-approved stable `gameId` and `formatId`.
- respond/cancel use opaque Challenge revision.
- create/respond/cancel use one idempotency key per logical attempt.
- unsafe requests use accepted P01 Django Session + CSRF bootstrap + `X-CSRFToken` + `credentials: include`.
- no localStorage/sessionStorage bearer contract.
- no Challenge Detail route is invented in F15.
- Hub navigation is limited to typed targets for already accepted Match routes.

## 6. Official documentation audit

Current official references reviewed:
- TanStack Router Data Mutations: `https://tanstack.com/router/latest/docs/guide/data-mutations`;
- TanStack Router Data Loading/search dependency guidance: `https://tanstack.com/router/latest/docs/guide/data-loading`;
- Django CSRF: `https://docs.djangoproject.com/en/6.0/ref/csrf/`;
- Django AJAX CSRF: `https://docs.djangoproject.com/en/dev/howto/csrf/`;
- DRF SessionAuthentication: `https://www.django-rest-framework.org/api-guide/authentication/`;
- W3C WAI-ARIA Modal Dialog Pattern: `https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/`;
- W3C Alert Dialog Pattern: `https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/`.

Applied implications:
- loader-consumed `status/page` remain the only loader dependencies;
- accepted/stale/unavailable mutations reload route truth via router invalidation; no optimistic lifecycle authority;
- unsafe SessionAuthentication commands require CSRF;
- create and destructive confirmations use modal/alert-dialog focus semantics;
- final controls remain keyboard reachable and visibly focusable.

Public SEO research is not applicable because F15 is private; explicit `noindex,nofollow` is required.

## 7. Backend F15 cross-repo alignment

Backend repo: `sajadkhavas/turnoment-backend`.

Backend START_SHA at F15 alignment start:

`1977db3c9995336166907b9fd85ac26093e6c254`

Backend tracking Issue: `#27`.

Docs branch: `docs/f15-player-challenge-hub-contract`.

Dedicated contract: `docs/F15_PLAYER_CHALLENGE_HUB_CONTRACT.md`.

Planned API family:
- `GET /api/v1/me/challenges/`;
- `GET /api/v1/me/challenges/opponents/`;
- `POST /api/v1/me/challenges/`;
- `POST /api/v1/me/challenges/{challengeId}/response/`;
- `POST /api/v1/me/challenges/{challengeId}/cancel/`.

Alignment is documentation-only; no Challenge runtime Python implementation is authorized here. Backend NEXT remains exactly `P02 — Games / Catalog Foundation`.

## 8. F15 owned implementation scope

Owned implementation/governance files:
- `.github/workflows/frontend-quality.yml` — add F15 SSR/final-copy/six-width evidence and expand regression 90 → 96 PNGs;
- `PROJECT_CONTINUITY.md`;
- `docs/workstreams/F15_PLAYER_CHALLENGE_HUB.md`;
- `src/components/dashboard/challenge-hub-page.tsx`;
- `src/components/dashboard/challenge-hub-card.tsx`;
- `src/components/dashboard/challenge-hub-create-dialog.tsx`;
- `src/lib/challenge-hub-contract.ts`;
- `src/lib/challenge-hub-contract.spec.ts`;
- `src/lib/challenge-hub-data.ts`;
- `src/lib/challenge-hub-http-repository.ts`;
- `src/lib/challenge-hub-repository.ts`;
- `src/routes/dashboard.challenges.tsx`.

No dependency/version/lockfile change is required. Existing `package.json` already runs `challenge-hub-contract.spec.ts` in the accepted test chain.

## 9. Required F15 states

- pending skeleton;
- load error/retry through router invalidation;
- unauthenticated/session-expired redirect;
- locked access;
- create-enabled/create-disabled access;
- populated list;
- filtered empty / account empty;
- pagination;
- create dialog;
- opponent search pending/empty/error/results;
- local create validation;
- backend validation/conflict/unavailable feedback;
- accept pending/success/error;
- decline confirmation/pending/success/error;
- cancel confirmation/pending/success/error;
- stale state authoritative reload;
- typed navigation to accepted Match routes;
- completed result/rating presentation.

No dead button or implementation-stage engineering copy may remain.

## 10. Previously frozen frontend truth

F01–F14 accepted/frozen truth remains unchanged. In particular:
- F13 `/dashboard/achievements` → `FINAL_PRIVATE` terminal;
- F14 `/dashboard/teams` → `FINAL_PRIVATE` terminal;
- `/dashboard/challenges` alone is the active controlled dashboard workstream.

Public `/`, `/tournaments`, `/games`, `/centers`, `/centers/$id`, `/ranking`, `/players/$username`, `/host`, `/rules` still require current-law recertification. Legacy commerce/service/general routes remain `LEGACY_REVIEW` until an explicit product decision.

## 11. Exact F15 NEXT

1. complete backend docs alignment Issue #27 terminally without phase reordering;
2. build one clean frontend implementation commit from exact START_SHA containing only F15-owned files;
3. compare must prove no dependency drift and no unrelated frozen-route mutation;
4. exact-head Frontend Quality Gate must PASS with 96-image regression;
5. manually inspect F15 screenshots at `375 / 390 / 430 / 768 / 1024 / 1440`;
6. open implementation PR without auto-closing Issue #77;
7. require PR CI green, mergeable=true, review threads=0 and exact pre-merge `main` lock;
8. expected-head implementation merge;
9. require post-main gate/artifact/digest;
10. create documentation-only closeout;
11. require closeout PR CI + expected-head merge + terminal frozen-main gate/artifact/digest;
12. reverify live frontend `main` exact frozen SHA;
13. record terminal evidence in Issue #77 and close completed;
14. only then report `F15 — DONE / MERGED / FROZEN — FINAL_PRIVATE`.

Backend NEXT remains `P02 — Games / Catalog Foundation`.
