---
id: ITEM-260928-code-tooling
kind: task
status: open
queued: no
verified: n/a
benchmark: bm-repository-foundation
---
# Set up the code tooling

The repository has no `package.json`, TypeScript configuration or test runner yet. The cores are TypeScript ([[§3 item 1]]). The curriculum app runs TypeScript 7 and Node's built-in test runner through a small TypeScript loader. Matching it would keep a core's tests runnable in both repositories. Which versions and runner to use is a choice for the owner when this starts.

## Done when
A typecheck and a test run both pass on an empty core module, from a clean clone.
