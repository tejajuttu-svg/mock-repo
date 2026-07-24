# tenant-banner-mock

A small, deterministic TypeScript app used to test the **FusionAuth Code
Generation Agent** end to end. It is deliberately generic: it reproduces the
*shape* of the "Tenant Login Maintenance Banner" Linear issues (tenant config
storage, locale message fallback, schedule/enabled gating, message validation)
without the FusionAuth Java/Prime MVC stack, so tests run in seconds with no JVM.

## Setup

```bash
npm install
```

## Test

```bash
npm test          # vitest run — the full suite
npm run typecheck # tsc --noEmit
```

A fresh clone should show a **green** baseline: all tests pass, with exactly one
`describe.skip` block reserved for the first agent target.

## What maps to which issue

| Module | Behavior | Linear issue | State |
| --- | --- | --- | --- |
| `src/resolveMessage.ts` | locale fallback: exact → language → default | AIS-136 | implemented (green) |
| `src/shouldDisplay.ts` | enabled + optional UTC schedule gating | AIS-135 | implemented (green) |
| `src/validateMessage.ts` | reject markup / over-length, allow punctuation | AIS-132 | implemented (green) |
| `src/tenantStore.ts` | persist banner inside tenant JSON, no migration | **AIS-134** | **stubbed — first agent target** |

## First agent target: AIS-134

`TenantStore.saveBanner` throws, and the `describe.skip(...)` block in
`test/tenantStore.test.ts` is reserved for it. Implementing AIS-134 means adding
a `maintenanceBanner` field to `TenantConfig`, implementing `saveBanner` so the
banner round-trips through `load()`, and un-skipping that test. No new storage
structure — everything stays in the single JSON blob.

## Keeping a clean reference

The intended AIS-134 solution is kept **outside** the agent's view (see the
`SOLUTION.md` note held separately by the operator, not committed to `main`) so
an evaluator can compare the agent's PR against a known-good implementation.
