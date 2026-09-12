# F23 — Host Acquisition Closeout

Status at document creation:

`IMPLEMENTATION MERGED / POST-MAIN ACCEPTED / CLOSEOUT IN PROGRESS`

Route: `/host`

Target route status: `FINAL_CURRENT`

Tracking Issue: `#104`

This is a non-recursive closeout snapshot. It records only evidence that already exists when this document is created. The future closeout head/merge/frozen-main SHA and terminal post-closeout CI/artifact/digest facts are intentionally not self-recorded here; they belong in Issue #104 after they exist.

## 1. Exact source lock

Frontend START_SHA:

`e1aa1667f3c70a9e00d9664b1e20d3019587cab0`

Implementation branch:

`phase/f23-host-acquisition`

Source implementation head:

`e70de8ee4acc20014da6a0d10a4343ea26f3e1de`

Final reviewed implementation head:

`3a464f69578102aa8c2e79c0725a4361e46c663f`

Implementation PR:

`#105` — MERGED with expected-head lock.

Implementation merge / accepted main / closeout base:

`78c7d3b33c1d785ae444bb0f4d1e0385ca1ced93`

Closeout branch:

`closeout/f23-host-acquisition`

## 2. Accepted permanent architecture

`host application draft → normalization + typed validation → HostApplicationRepository → strict production HTTP adapter / deterministic dev-test fixture → Host Acquisition UI`

Accepted production behavior:
- planned endpoint `POST /api/v1/host-applications/`;
- production defaults to Django HTTP repository path;
- `VITE_API_BASE_URL` required;
- POST JSON with `credentials: include`;
- 400/422 → validation;
- 429 → rate limited;
- other non-2xx/network failures → unavailable;
- successful payload must pass strict runtime validation;
- malformed 2xx → invalid response;
- fixtures remain dev/test/visual-QA only;
- no silent production success fallback.

Runtime remains `FRONTEND MOCK / BACKEND PENDING` because the backend endpoint is documented but not implemented.

## 3. Request / receipt acceptance

Accepted request boundary:
- `venueName`: 2..120 chars;
- `managerName`: 2..120 chars;
- `phone`: canonical Iranian mobile `+989xxxxxxxxx`;
- `city`: 2..80 chars;
- `area`: 2..120 chars;
- `stationCount`: integer 1..1000;
- `games`: 2..300 chars;
- `description`: null or max 1200 chars.

Frontend normalizes Persian/Arabic digits and accepted Iranian mobile variants before transport.

Accepted receipt:
- `schemaVersion=1`;
- server-issued opaque `applicationId`;
- `state=received`;
- offset-aware `submittedAt`.

`received` means receipt/storage acknowledgement only. It does not mean approval, verification, licensing, activation or tournament eligibility.

## 4. Public SEO / final-copy acceptance

Page purpose: qualified gaming-center host acquisition with transparent requirements and review flow.

Audience: gaming-center owners/managers and local operators.

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

Accepted section order:

`Hero → benefits → process → requirements → experience preview → application form → FAQ → final CTA`

No unsupported best/official/largest/guaranteed-approval claims are authorized. No engineering-stage wording belongs in rendered public copy. Structured data is intentionally omitted because no current supported search feature was required to represent this acquisition form more accurately than ordinary semantic page/head content.

## 5. Official documentation applied

Current official guidance reviewed/applied during F23 included:
- TanStack Router / Start route, SSR and document-head behavior;
- Google Search people-first content, titles/descriptions, canonical/indexing and structured-data policy;
- WCAG 2.2 focus, keyboard, semantics and practical target-size/accessibility baseline;
- Django REST framework Permissions, Authentication, Settings, Serializers, AJAX/CSRF/CORS and Throttling for cross-repo backend contract alignment.

Key decisions: route-owned metadata, production fail-closed, strict typed/runtime validation, no fake success, public backend write must explicitly define both permission and authentication policy, and backend remains authoritative for validation/receipt truth.

## 6. Cross-repo backend alignment

Backend repository: `sajadkhavas/turnoment-backend`.

F23 backend documentation alignment is terminal:
- Issue #43 CLOSED / COMPLETED;
- PR #44 MERGED;
- docs head `bb481f5c7fbb37d680665c2f397d13ef2f232b55`;
- exact-head gate `34702635677` PASS on Python 3.12 / 3.14;
- PR-context gate `34702687868` PASS on Python 3.12 / 3.14;
- backend merge/main `46b3f47b38068675ed8a0941a871438e51abd6a2`;
- post-main gate `34702740266` PASS on Python 3.12 / 3.14;
- no Python/model/migration/serializer/view/URL/settings/dependency/workflow/phase-registry runtime implementation was added.

Current backend globals remain `SessionAuthentication` + `IsAuthenticated`. The future public create route must explicitly use `AllowAny` and deliberate session-independent per-view authentication policy so an existing browser session does not accidentally introduce SessionAuthentication CSRF behavior or authenticated-user semantics.

Backend NEXT remains exactly `P02 — Games / Catalog Foundation`.

## 7. Exact implementation diff evidence

START → source head `e70de8ee4acc20014da6a0d10a4343ea26f3e1de`:
- ahead `1` / behind `0`;
- exactly `1` source commit;
- exactly `9` changed files;
- no `bun.lock` mutation;
- no dependency/version drift;
- frozen F16/F17/F18/F19/F20/F21/F22/F02 route source untouched.

START → final reviewed implementation head `3a464f69578102aa8c2e79c0725a4361e46c663f`:
- ahead `2` / behind `0`;
- exactly `2` commits;
- source implementation plus exactly three governance Markdown files;
- no frozen-route source drift.

## 8. Exact-head QA evidence

Reviewed head `3a464f69578102aa8c2e79c0725a4361e46c663f`:
- Full `34702956119` — PASS — artifact `10301031536` — digest `sha256:622b57ecc7af264f422dc37d994d07e6e48f87be160ff84aa9397633d5173953`;
- F23 `34702956137` — PASS — artifact `10301600267` — digest `sha256:57c572d6246e2988909ece2effb643ced9af92786562b46cc646c39b785ec6b8`.

Manual responsive evidence covered the full page at 375/768/1440, while the focused workflow covered 375/390/430/768/1024/1440. No observed horizontal overflow, clipping or overlap remained at acceptance.

## 9. Implementation PR-context QA evidence

PR #105 pre-merge:
- mergeable `true`;
- unresolved review threads `0`;
- exact pre-merge main remained F23 START_SHA;
- expected head `3a464f69578102aa8c2e79c0725a4361e46c663f` used.

PR-context gates — all PASS:
- Full `34703227523` — artifact `10302479241` — digest `sha256:e48fc3e445856a808f4f0ced6945708a4dd08dd51e9886ed1b591175e07ec02a`;
- F23 `34703227503` — artifact `10302006962` — digest `sha256:b74bd55c7de5de095fdd9d2f77a369909bf2fa6381df48e87911db182779fcff`;
- F22 `34703227490` — artifact `10301792290` — digest `sha256:a32e1943de4c7ca34338d49be7da75ff0fec9b62fa940c00fa54e66314625eb7`;
- F21 `34703227495` — artifact `10301786177` — digest `sha256:1a42891544f606fa0573f31527917bcd88a0832088547203c6ab68bc7aa550f6`;
- F20 `34703227519` — artifact `10301868997` — digest `sha256:6656a725f3b6d447533972498653c68e13b55e0bd8f50464a79852be59000137`;
- F19 `34703227494` — artifact `10301827966` — digest `sha256:67f86c6d1899e04333e117cb6495cbde7ee344b011c3f9e3990c2e45ad3d68a3`;
- F18 `34703227489` — artifact `10301791744` — digest `sha256:274020f1b39357e190524f778383793add396ace0511460282639002106916d8`;
- F17 `34703227485` — artifact `10301873276` — digest `sha256:36126382cf850d7ea88ece75a0cfdb9c14d74dbbf08cf19103f08ce0d19b5bf4`;
- F16 `34703227512` — artifact `10301794091` — digest `sha256:27a3927aeb2db3761ef6ebc0f25d1736e3f91007b6056b447983eb2ef1a75f5a`.

## 10. Post-main implementation QA evidence

Accepted implementation main `78c7d3b33c1d785ae444bb0f4d1e0385ca1ced93`:
- Full `34703531366` — PASS — artifact `10301511456` — digest `sha256:bb1c4606e5976dee23d2b48a94d361825238c6c07aa02547231239933534c7a2`;
- F23 `34703531387` — PASS — artifact `10300582171` — digest `sha256:a29b97ad3a966a15babb76b6557001f96c4499dab4f0f14e220894591ed1f566`;
- F22 `34703531403` — PASS — artifact `10301466264` — digest `sha256:a6532b5d6311932eda655b26700c4af13b73bf0645d883a13c05a4d46827abca`;
- F21 `34703531297` — PASS — artifact `10301491369` — digest `sha256:0373c9e2fb021fd64528a64ff6a07b2c90d5fabc50e6edcdea7b661ee7db8a2d`;
- F20 `34703531473` — PASS — artifact `10301032161` — digest `sha256:87a0d9541c290d9f94e5a0a86468346a547168e1e6e112709978111649ea9bfb`;
- F19 `34703531395` — PASS — artifact `10301296618` — digest `sha256:bb7fa33ebdd8394a431f88fde1ccbb8c6f45049e3710ee27c327df5eb1e6e4c8`;
- F18 `34703531437` — PASS — artifact `10301156811` — digest `sha256:6b3cd7e5633613df0222613f77e7bc42255cd2bffe4abecd64cf62aaa092a459`;
- F17 `34703531424` — PASS — artifact `10301311626` — digest `sha256:aefc34255d4b681d32a5e08a0c29e3fe8bd02b24eecaae2b0fd01d2172408ef0`;
- F16 `34703531410` — PASS — artifact `10301316540` — digest `sha256:f9e40a9e3ce8ed813244cd04509631e7a09a1851f930591c35f6d2cdc2fbef6b`.

Exact live frontend `main` was reverified at implementation SHA after post-main QA. Implementation evidence is recorded in Issue #104 comment `5647020555`.

## 11. Route registry decision

Because implementation is merged and required post-main implementation gates are green, `/host` is eligible for non-recursive promotion to `FINAL_CURRENT`.

This route-level promotion does not itself mean the F23 workstream is terminally frozen. Terminal workstream status still requires closeout merge and terminal frozen-main evidence in Issue #104.

## 12. Documentation-only closeout scope

This closeout is restricted to exactly four Markdown files:
1. `PROJECT_CONTINUITY.md`;
2. `docs/ROUTE_COMPLIANCE_REGISTRY.md`;
3. `docs/workstreams/F23_HOST_ACQUISITION.md`;
4. `docs/workstreams/F23_CLOSEOUT.md`.

Exactly one closeout commit is allowed. No source code, package, lockfile, workflow, runtime configuration, dependency or backend runtime phase change is authorized.

## 13. Remaining terminal gates

After this closeout snapshot is committed, F23 still requires:
1. exact closeout compare: ahead 1 / behind 0 / one commit / exactly four Markdown files;
2. closeout PR to main without auto-closing Issue #104;
3. PR-context Full + F23 + F22/F21/F20/F19/F18/F17/F16 gates PASS;
4. mergeable=true and unresolved review threads=0;
5. exact live-main lock at implementation merge SHA before closeout merge;
6. expected-head closeout merge;
7. terminal frozen-main Full + F23 + regressions PASS;
8. terminal artifact IDs and SHA-256 digests recorded in Issue #104;
9. exact live frontend main reverified;
10. Issue #104 updated with terminal evidence and CLOSED / COMPLETED.

Only after those future facts exist may the workstream be reported:

`F23 — DONE / MERGED / FROZEN — FINAL_CURRENT`

## 14. NEXT after F23 terminal freeze

`/rules`.

Backend NEXT independently remains `P02 — Games / Catalog Foundation`.
