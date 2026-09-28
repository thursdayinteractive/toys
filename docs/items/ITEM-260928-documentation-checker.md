---
id: ITEM-260928-documentation-checker
kind: task
status: closed
queued: no
benchmark: bm-repository-foundation
---
# Build the documentation checker

The checker is built in `tools/docs/`, running every documentation check and building the brief ([[DEC-260928-documentation-checker]], [[DEC-260928-documentation-baseline#clause-41]]). 

## Done when
`npm run docs -- check` runs every check in [[DEC-260928-documentation-baseline#clause-40]] clean on the repository, and `npm run docs -- brief` prints the brief.

## Resolution
Closed 2026-09-28, by owner direction: the checker is built and `npm run docs -- check` passes on the repository.
