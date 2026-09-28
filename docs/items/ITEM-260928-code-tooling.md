---
id: ITEM-260928-code-tooling
kind: task
status: closed
queued: yes
verified: n/a
benchmark: bm-repository-foundation
---
# Set up the code tooling

The tooling matches the curriculum app's ([[DEC-260928-code-tooling]]): TypeScript, strict settings, Node's built-in test runner on `.ts` files, and extensionless imports. `package.json`, `tsconfig.json` and the test import hook are in place, and the documentation tools' tests run with them. No toy core exists yet to run them against.

## Done when
A typecheck and a test run both pass on an empty core module, from a clean clone.

## Verification
2026-09-28, by owner direction: verified in a fresh clone of commit `13f28f8`, with a throwaway empty core that was not committed, so a core's folder layout is left to [[ITEM-260928-randomizer-core]]. The clone had `toys/empty/core.ts` (`export {};`) and `toys/empty/core.test.ts`, which imports it with an extensionless specifier. On Node 22.22.2, `npm install`, then `npm run typecheck` exited 0, and `npm test` ran 26 tests, 26 passing, including the empty core's.

## Resolution
Closed 2026-09-28, by owner direction: a typecheck and a test run pass on an empty core module from a clean clone, as recorded under Verification.
