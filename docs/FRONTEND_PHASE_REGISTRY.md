# Frontend Phase Registry

> Operational continuity is tracked in root `PROJECT_CONTINUITY.md`. This file stores frontend phase history and acceptance evidence.

## Discovery baseline

### Tournament Discovery completion

Status: `DONE / MERGED / BUILD GREEN`

- Baseline before completion: `a280ccd4c4177477980a340d5cf742d51bffee8f`
- Implementation branch: `phase/tournament-discovery-completion`
- Implementation head: `45cc746fce95ad721cf0664cf5101d080b01aa10`
- PR: `#1`
- Merge SHA: `4d714579fc97d1400b5a2b50b680d93b090ceac5`
- Post-merge quality run: `34104818438` — PASS

Note: the page was subsequently chosen as the reference route for F00 production data-access migration.

---

## F00 — Frontend Production Architecture Foundation

Status: `IN PROGRESS`

- Tracking Issue: `#3`
- START_SHA: `fca358aa15b3d088809011fc451a30518d888344`
- Branch: `phase/f00-frontend-production-foundation`

### Acceptance gates

- [x] Root cross-chat continuity checkpoint exists on main
- [x] Typed tournament frontend contract boundary
- [x] Runtime Zod validation for future HTTP payloads
- [x] Repository port
- [x] Mock adapter behind repository port
- [x] Future Django HTTP adapter boundary
- [x] Central public API client boundary
- [x] Validated tournament search parser
- [x] Deterministic loader dependency conversion
- [x] Central public/private SEO helpers
- [x] Tournament Discovery loader/repository reference migration
- [x] Tournament Detail read-path repository migration
- [x] Pending/loading reference components
- [x] Frontend quality scripts: lint + typecheck + contract checks + build
- [x] Frontend engineering rules documented
- [ ] Final branch CI green
- [ ] PR reviewed with zero unresolved blockers
- [ ] F00 merged to main
- [ ] Post-merge main CI green
- [ ] `PROJECT_CONTINUITY.md` terminal checkpoint updated

### Known non-F00 debt

- Tournament Detail registration UI remains a prototype and must be replaced in the dedicated final Tournament Detail workstream.
- Legacy ecommerce routes contain inherited formatting/product debt and are not tournament architecture.
- Browser/E2E coverage will be introduced as critical flows become executable; F00 establishes the gate direction but does not fake browser tests without a stable runtime flow.
