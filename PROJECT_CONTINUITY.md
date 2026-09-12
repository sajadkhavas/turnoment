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

Exact accepted implementation `main` / F23 closeout base:

`78c7d3b33c1d785ae444bb0f4d1e0385ca1ced93`

F22 `/players/$username` is terminally frozen:
- Issue #101 — CLOSED / COMPLETED;
- implementation PR #102 — MERGED;
- closeout completed and terminal frozen-main evidence recorded in Issue #101;
- final workstream status `F22 — DONE / MERGED / FROZEN — FINAL_CURRENT`.

F23 `/host` implementation is merged and post-main accepted:
- Tracking Issue #104 remains OPEN;
- implementation PR #105 — MERGED;
- reviewed implementation head `3a464f69578102aa8c2e79c0725a4361e46c663f`;
- implementation merge/main `78c7d3b33c1d785ae444bb0f4d1e0385ca1ced93`;
- required post-main Full/F23/F22/F21/F20/F19/F18/F17/F16 gates are all PASS on that exact SHA;
- live `main` was reverified at the implementation merge after post-main acceptance;
- route-level `/host` is eligible for `FINAL_CURRENT`, but terminal workstream freeze still requires closeout merge + frozen-main evidence.

Protected/frozen or accepted-current public routes:
- F16 `/`;
- F17 `/tournaments`;
- F18 `/games`;
- F19 `/centers`;
- F20 `/centers/$id`;
- F21 `/ranking`;
- F22 `/players/$username`;
- F23 `/host` — route-level current implementation accepted, closeout still in progress;
- F02 `/games/$slug`.

## 3. Active workstream — F23 Host Acquisition closeout

Route:

`/host`

Tracking Issue:

`#104` — OPEN

Original F23 START_SHA:

`e1aa1667f3c70a9e00d9664b1e20d3019587cab0`

Implementation branch:

`phase/f23-host-acquisition`

Source implementation head:

`e70de8ee4acc20014da6a0d10a4343ea26f3e1de`

Final reviewed implementation head:

`3a464f69578102aa8c2e79c0725a4361e46c663f`

Implementation PR:

`#105` — MERGED with expected-head lock.

Accepted implementation main / closeout base:

`78c7d3b33c1d785ae444bb0f4d1e0385ca1ced93`

Closeout branch:

`closeout/f23-host-acquisition`

Current status:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

F23 is not terminally `DONE / MERGED / FROZEN` until the closeout PR is accepted, merged with expected-head lock, terminal frozen-main gates pass, artifacts/digests are recorded, exact live `main` is reverified, and Issue #104 is closed completed.

## 4. Permanent F23 architecture

`host application draft → normalization + typed validation → HostApplicationRepository → strict production HTTP adapter / deterministic dev-test fixture → Host Acquisition UI`

Production behavior:
- target endpoint `POST /api/v1/host-applications/`;
- production defaults to the Django HTTP repository path and requires `VITE_API_BASE_URL`;
- no production fixture fallback;
- request uses JSON and `credentials: include`;
- 400/422 → validation;
- 429 → rate limited;
- other non-2xx/network failures → unavailable;
- successful HTTP response is not trusted until the v1 receipt is runtime-validated;
- malformed 2xx receipt → `invalid_response`;
- UI never fabricates success.

Runtime remains exactly:

`FRONTEND MOCK / BACKEND PENDING`

## 5. F23 request / receipt boundary

Accepted external request fields:
- `venueName`: 2..120 chars;
- `managerName`: 2..120 chars;
- `phone`: canonical Iranian mobile `+989xxxxxxxxx`;
- `city`: 2..80 chars;
- `area`: 2..120 chars;
- `stationCount`: integer 1..1000;
- `games`: 2..300 chars;
- `description`: null or max 1200 chars.

Frontend normalization handles Persian/Arabic digits and accepted Iranian mobile variants before the typed submission boundary. Frontend validation is defense in depth only; backend validation remains authoritative when runtime is implemented.

Accepted successful receipt:
- `schemaVersion=1`;
- server-issued opaque `applicationId`;
- `state=received`;
- offset-aware `submittedAt`.

`received` means only that the accepted runtime endpoint received/stored the application according to the create contract. It never means approved, verified, licensed or activated.

## 6. Backend F23 documentation alignment — terminal

Backend repository: `sajadkhavas/turnoment-backend`.

F23 backend documentation alignment is terminal:
- Backend START `215fae68d8003b8df6c034b228d1121d96b0be18`;
- Issue #43 — CLOSED / COMPLETED;
- docs head `bb481f5c7fbb37d680665c2f397d13ef2f232b55`;
- PR #44 — MERGED;
- exact-head Backend Quality Gate `34702635677` — PASS on Python 3.12 / 3.14;
- PR-context Backend Quality Gate `34702687868` — PASS on Python 3.12 / 3.14;
- backend merge/main `46b3f47b38068675ed8a0941a871438e51abd6a2`;
- post-main Backend Quality Gate `34702740266` — PASS on Python 3.12 / 3.14;
- exact live backend `main` reverified at `46b3f47b38068675ed8a0941a871438e51abd6a2`;
- no Python/model/migration/serializer/view/URL/settings/dependency/workflow/phase-registry runtime implementation was added.

Backend NEXT remains exactly:

`P02 — Games / Catalog Foundation`

The planned F23 endpoint remains absent from runtime.

## 7. Public-write authentication / CSRF decision

Current backend global DRF defaults use `SessionAuthentication` and `IsAuthenticated`.

The future F23 host-application create route is intentionally public. Backend documentation requires both:
- explicit `AllowAny`;
- explicit session-independent per-view authentication policy so an existing browser session does not accidentally introduce SessionAuthentication CSRF behavior or attach public submission semantics to `request.user` merely because a cookie exists.

An empty per-view authentication class list is one acceptable implementation consistent with the frozen contract. This rule changes no global authentication defaults and does not implement runtime code.

Server-side validation, receipt identity/time, abuse/rate policy, duplicate/idempotency behavior, PII access and retention remain backend-owned future runtime concerns.

## 8. SEO / final-copy lock

Route purpose: convert qualified gaming-center owners/managers into host applicants while explaining the real review path and conditions without claiming automatic acceptance.

Primary audience: gaming-center owners/managers and local operators considering tournament hosting.

Final H1:

`گیم‌نتت را به میزبان رقابت‌های واقعی تبدیل کن`

Final title:

`میزبانی مسابقات گیمینگ برای گیم‌نت | Turnoment`

Final description:

`برای میزبانی مسابقات حضوری گیمینگ در گیم‌نت خود در Turnoment درخواست بدهید؛ شرایط میزبانی، روند بررسی و مسیر ثبت‌نام بازیکنان را ببینید.`

Canonical:

`/host`

Robots:

`index,follow`

The final page includes Hero, host benefits, process, requirements, experience preview, application form, FAQ and final CTA. Copy avoids engineering-stage language and unsupported “official / best / guaranteed approval” claims. Acceptance remains explicitly non-automatic.

## 9. F23 implementation evidence

START → source head `e70de8ee4acc20014da6a0d10a4343ea26f3e1de`:
- ahead `1` / behind `0`;
- exactly `1` commit;
- exactly `9` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- frozen F16/F17/F18/F19/F20/F21/F22/F02 route source untouched.

Final reviewed implementation head:

`3a464f69578102aa8c2e79c0725a4361e46c663f`

Reviewed-head QA:
- F23 `34702956137` — PASS — artifact `10301600267` — digest `sha256:57c572d6246e2988909ece2effb643ced9af92786562b46cc646c39b785ec6b8`;
- Full `34702956119` — PASS — artifact `10301031536` — digest `sha256:622b57ecc7af264f422dc37d994d07e6e48f87be160ff84aa9397633d5173953`.

Implementation PR #105 PR-context Full/F23/F22/F21/F20/F19/F18/F17/F16 gates all passed; pre-merge `mergeable=true`, unresolved review threads `0`, and live `main` remained exact F23 START before the expected-head merge.

Implementation merge/main:

`78c7d3b33c1d785ae444bb0f4d1e0385ca1ced93`

Post-main implementation acceptance — all PASS on exact merge SHA:
- Full `34703531366` — artifact `10301511456` — digest `sha256:bb1c4606e5976dee23d2b48a94d361825238c6c07aa02547231239933534c7a2`;
- F23 `34703531387` — artifact `10300582171` — digest `sha256:a29b97ad3a966a15babb76b6557001f96c4499dab4f0f14e220894591ed1f566`;
- F22 `34703531403` — artifact `10301466264` — digest `sha256:a6532b5d6311932eda655b26700c4af13b73bf0645d883a13c05a4d46827abca`;
- F21 `34703531297` — artifact `10301491369` — digest `sha256:0373c9e2fb021fd64528a64ff6a07b2c90d5fabc50e6edcdea7b661ee7db8a2d`;
- F20 `34703531473` — artifact `10301032161` — digest `sha256:87a0d9541c290d9f94e5a0a86468346a547168e1e6e112709978111649ea9bfb`;
- F19 `34703531395` — artifact `10301296618` — digest `sha256:bb7fa33ebdd8394a431f88fde1ccbb8c6f45049e3710ee27c327df5eb1e6e4c8`;
- F18 `34703531437` — artifact `10301156811` — digest `sha256:6b3cd7e5633613df0222613f77e7bc42255cd2bffe4abecd64cf62aaa092a459`;
- F17 `34703531424` — artifact `10301311626` — digest `sha256:aefc34255d4b681d32a5e08a0c29e3fe8bd02b24eecaae2b0fd01d2172408ef0`;
- F16 `34703531410` — artifact `10301316540` — digest `sha256:f9e40a9e3ce8ed813244cd04509631e7a09a1851f930591c35f6d2cdc2fbef6b`.

Exact live frontend `main` was reverified at the implementation SHA after post-main QA. Implementation acceptance evidence is recorded in Issue #104.

## 10. Official/current guidance applied

F23 review applied current official guidance for:
- TanStack Router / Start route, SSR and document-head behavior;
- Google people-first content, metadata/canonical/indexing principles;
- WCAG 2.2 focus visibility, semantics and practical target sizing;
- Django REST framework permissions, authentication, settings, serializers, AJAX/CSRF/CORS and throttling for the cross-repo backend contract.

Key decisions: route-owned final metadata; one `<main>` via `TournamentLayout`; strict typed form boundary; no fake success; production fail-closed; public backend write requires explicit permission **and** authentication policy; built-in throttling is a policy layer rather than complete DoS protection.

## 11. Documentation-only closeout law

Closeout branch:

`closeout/f23-host-acquisition`

Closeout is exactly one commit changing exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F23_HOST_ACQUISITION.md`;
4. `docs/workstreams/F23_CLOSEOUT.md`.

No source/package/lockfile/workflow/dependency/runtime mutation is authorized in closeout.

Route-level `/host` may be promoted to `FINAL_CURRENT` in this non-recursive closeout snapshot because implementation merge + required post-main acceptance already exist.

Terminal closeout SHA/merge/frozen-main QA facts must be recorded in Issue #104 after they exist, not recursively self-recorded in this commit.

## 12. Remaining terminal chain

After this closeout commit exists, F23 still requires:
1. exact closeout compare = ahead 1 / behind 0 / exactly one commit / exactly four Markdown files;
2. closeout PR to `main` without auto-closing Issue #104;
3. all triggered PR-context Full/F23/F22/F21/F20/F19/F18/F17/F16 gates PASS;
4. `mergeable=true` and unresolved review threads=0;
5. exact live-main lock at implementation merge `78c7d3b33c1d785ae444bb0f4d1e0385ca1ced93` before merge;
6. expected-head closeout merge;
7. terminal frozen-main Full/F23/frozen-route regressions PASS;
8. terminal artifact IDs and SHA-256 digests recorded in Issue #104;
9. exact live frontend `main` reverified;
10. Issue #104 updated with terminal evidence and CLOSED / COMPLETED.

Only after those facts exist may F23 be reported:

`F23 — DONE / MERGED / FROZEN — FINAL_CURRENT`

## 13. Protected NEXT

After terminal F23:

`/rules`

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
