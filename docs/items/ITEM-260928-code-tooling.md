---
id: ITEM-260928-code-tooling
kind: task
status: open
queued: no
verified: n/a
benchmark: bm-repository-foundation
---
# Set up the code tooling

The tooling matches the curriculum app's ([[DEC-260928-code-tooling]]): TypeScript, strict settings, Node's built-in test runner on `.ts` files, and extensionless imports. The repository has no `package.json`, TypeScript configuration or test runner yet.

## Done when
A typecheck and a test run both pass on an empty core module, from a clean clone.
