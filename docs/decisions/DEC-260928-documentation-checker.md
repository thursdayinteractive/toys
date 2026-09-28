---
id: DEC-260928-documentation-checker
status: proposed
---

# A documentation checker is built

## Context

The `[check]` rules, the brief and the close-out review are done by hand until a checker exists ([[DEC-260928-documentation-baseline#clause-41]]). The owner was asked whether to build one, what it covers and where it lives, 2026-09-28. The answers: yes, everything, and a `tools/` folder structured like the curriculum app's.

## Clauses

- **clause-1.** **Build a checker.** The project builds a checker for its documentation.
- **clause-2.** **Scope.** It runs every check in [[DEC-260928-documentation-baseline#clause-40]] and builds the brief in [[DEC-260928-documentation-baseline#clause-36]].
- **clause-3.** **Location.** Its code is in `tools/docs/`, run as `npm run docs -- <command>`. Its folder structure follows the curriculum app's documentation tools as closely as this project allows.

## Options considered

- **Keep the hand checks.** Lost: by owner direction.

## Precept conflicts resolved

None found.
