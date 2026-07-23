# Agent instructions

This repository is a generic workflow-plumbing test bed for the FusionAuth Code
Generation Agent. It mirrors the *shape* of the Tenant Login Maintenance Banner
Linear issues (config storage, locale fallback, scheduling, validation) without
the FusionAuth Java stack.

## Commands (use these exact commands)

- Install: `npm install`
- Test: `npm test`  (runs `vitest run`)
- Typecheck / lint: `npm run typecheck`

Both `npm test` and `npm run typecheck` must pass before you open a PR.

## Code rules

- TypeScript, ES modules, `strict` mode. Keep imports using the `.js` extension
  in relative paths (matches the module resolution used here).
- Make the smallest change that satisfies the issue's acceptance criteria. Stay
  within the files the issue names.
- Add or update tests so acceptance criteria are actually verified. If an issue
  ships with a `describe.skip(...)` placeholder test, un-skip it and make it
  pass rather than writing a parallel test.
- Do not reformat or refactor unrelated code. Keep the diff focused.

## Safety rules

- Never commit secrets or credentials.
- Work only on an issue-specific feature branch. Never commit to `main`.
- Open a **draft** PR. Never merge, never push to `main`, never force-push.
- If requirements are missing or ambiguous, stop and report — do not guess a
  product decision.

## Branch and PR conventions

- Branch: use the Linear-suggested branch name for the issue when available,
  otherwise `agent/<issue-key>-<short-slug>`.
- PR title: start with the issue key, e.g. `AIS-134: ...`.
- PR body: what changed, tests run + results, risks, and an explicit
  "awaiting human review; not merged or deployed" note.
