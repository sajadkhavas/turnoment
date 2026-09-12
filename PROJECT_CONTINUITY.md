# TURNOMENT — PROJECT CONTINUITY CHECKPOINT

> **MANDATORY FIRST READ FOR EVERY CHAT / AGENT / SESSION**
>
> Operational source of truth for continuing Turnoment without duplicate work.

Last update: `2026-09-12`

## 1. Mandatory continuation law

Every chat/agent MUST read `PROJECT_CONTINUITY.md`, `FRONTEND_PAGE_DELIVERY_PROTOCOL.md`, `SEO_FINAL_COPY_PROTOCOL.md` for public/indexable work, and `docs/ROUTE_COMPLIANCE_REGISTRY.md`; verify exact live `main`; use a dedicated branch/Issue/PR; preserve frozen routes; keep production fail-closed; and never claim `DONE / MERGED / FROZEN` from chat memory alone.

Terminal closeout SHA/CI belongs in the tracking Issue after merge. Do not create recursive documentation commits to self-record their own SHA.

## 2. Current frozen frontend baseline

Repository: `sajadkhavas/turnoment`.

Exact live frontend `main` / F23 START_SHA:

`e1aa1667f3c70a9e00d9664b1e20d3019587cab0`

F22 `/players/$username` is terminally frozen:
- Issue #101 — CLOSED / COMPLETED;
- implementation PR #102 — MERGED;
- closeout completed and terminal frozen-main evidence recorded in Issue #101;
- final workstream status `F22 — DONE / MERGED / FROZEN — FINAL_CURRENT`.

Protected/frozen public routes:
- F16 `/`;
- F17 `/tournaments`;
- F18 `/games`;
- F19 `/centers`;
- F20 `/centers/$id`;
- F21 `/ranking`;
- F22 `/players/$username`;
- F02 `/games/$slug`.

## 3. Active workstream — F23 Host Acquisition

Route:

`/host`

Tracking Issue:

`#104` — OPEN

START_SHA:

`e1aa1667f3c70a9e00d9664b1e20d3019587cab0`

Implementation branch:

`phase/f23-host-acquisition`

Accepted source implementation head before governance checkpoint:

`e70de8ee4acc20014da6a0d10a4343ea26f3e1de`

Current status:

`IMPLEMENTATION ACTIVE / GOVERNANCE CHECKPOINT`

F23 is not merged, route-level `FINAL_CURRENT`, or terminally frozen until the implementation PR, post-main QA, documentation-only closeout and terminal frozen-main evidence are all accepted.

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

The future F23 host-application create route is intentionally public. Backend documentation now requires both:
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

Canonical:

`/host`

Robots:

`index,follow`

The final page includes Hero, host benefits, process, requirements, experience preview, application form, FAQ and final CTA. Copy avoids engineering-stage language and unsupported “official / best / guaranteed approval” claims. Acceptance remains explicitly non-automatic.

## 9. Exact source diff / QA evidence

START → source head `e70de8ee4acc20014da6a0d10a4343ea26f3e1de`:
- ahead `1` / behind `0`;
- exactly `1` commit;
- exactly `9` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- `package.json` delta is F23 test wiring only;
- frozen F16/F17/F18/F19/F20/F21/F22/F02 route source is untouched.

Exact-source QA:
- F23 Host Acquisition Quality Gate `34702167115` — PASS — artifact `10300084668` — digest `sha256:d1de24c54a127f66cc097d05e0ef17e9cc631ec61aa3e687421bc782bb8c87d3`;
- Full Frontend Quality Gate `34702167120` — PASS — browser artifact `10300094875` — digest `sha256:363f125ae1c2e476383ad660ab7fca3ef3094f23a0a6916c55e1837eed02c649`.

Focused workflow evidence covers 375/390/430/768/1024/1440. Manual full-page evidence review covered 375/768/1440 and included Hero, benefits, process, requirements, preview, form, FAQ and final CTA with no observed horizontal overflow, clipping or overlap.

## 10. Official/current guidance applied

F23 review applied current official guidance for:
- TanStack Router / Start route, SSR and document-head behavior;
- Google people-first content, metadata/canonical/indexing principles;
- WCAG 2.2 focus visibility, semantics and practical target sizing;
- Django REST framework permissions, authentication, settings, serializers, AJAX/CSRF/CORS and throttling for the cross-repo backend contract.

Key decisions: route-owned final metadata; one `<main>` via `TournamentLayout`; strict typed form boundary; no fake success; production fail-closed; public backend write requires explicit permission **and** authentication policy; built-in throttling is a policy layer rather than complete DoS protection.

## 11. Implementation PR acceptance chain — remaining

1. governance checkpoint must remain one commit / exactly three Markdown files and preserve source behavior;
2. rerun Full + F23 exact-head QA on the reviewed branch head;
3. verify exact live frontend `main` still equals F23 START;
4. open implementation PR without auto-closing Issue #104;
5. require all triggered Full/F23/F22/F21/F20/F19/F18/F17/F16 PR-context gates PASS with artifacts/digests;
6. require `mergeable=true` and unresolved review threads=0;
7. expected-head implementation merge;
8. require exact post-main Full/F23 and frozen-route regressions PASS;
9. reverify exact live frontend `main` and record implementation checkpoint in Issue #104;
10. only then create the documentation-only closeout branch.

## 12. Closeout law after implementation acceptance

F23 closeout will be exactly one commit changing exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F23_HOST_ACQUISITION.md`;
4. `docs/workstreams/F23_CLOSEOUT.md`.

No source/package/lockfile/workflow/dependency/runtime mutation is authorized in closeout.

Terminal closeout SHA/merge/frozen-main QA facts must be recorded in Issue #104 after they exist, not recursively self-recorded in the closeout commit.

## 13. Protected NEXT

After terminal F23:

`/rules`

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
