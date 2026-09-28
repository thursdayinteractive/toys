---
id: ITEM-260928-code-tooling
kind: task
status: open
queued: no
verified: n/a
benchmark: bm-repository-foundation
---
# Set up the code tooling

The repository has no `package.json`, TypeScript configuration or test runner yet. Cores are TypeScript ([[§3 item 1]]). Which TypeScript version and test runner to use is for the owner when this starts; whatever is chosen has to let a core's code and tests also run as part of the curriculum app ([[§3]]).

## Done when
A typecheck and a test run both pass on an empty core module, from a clean clone.
