---
id: ITEM-260928-documentation-checker
kind: decision
status: open
queued: no
benchmark: bm-repository-foundation
---
# Whether to build the documentation checker here

The curriculum app enforces its `[check]` rules and generates its brief, triage list and review report with `tools/docs/`, about twenty TypeScript modules run as `npm run docs`. Those modules are tied to that repository: its adoption commit, its record paths and its spec's § numbering. This repository has no checker. Until it has one, the session carries out the checks by hand at close-out ([[DEC-260928-documentation-baseline#clause-64]]).

Owner question: port the curriculum app's checker, adapted to this repository; write a smaller one; or keep the hand checks.

## Done when
The owner has decided, and the answer is recorded as a decision record.
