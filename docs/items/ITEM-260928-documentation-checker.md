---
id: ITEM-260928-documentation-checker
kind: task
status: open
queued: no
verified: n/a
benchmark: bm-repository-foundation
---
# Build the documentation checker

A checker is to be built in `tools/docs/`, running every documentation check and building the brief ([[DEC-260928-documentation-checker]]). Until it exists, the checks are done by hand ([[DEC-260928-documentation-baseline#clause-41]]).

## Done when
`npm run docs -- check` runs every check in [[DEC-260928-documentation-baseline#clause-40]] clean on the repository, and `npm run docs -- brief` prints the brief.
