---
id: DEC-260928-code-tooling
status: accepted
---

# Code tooling matches the curriculum app

## Context

Toy cores are TypeScript and must run inside the curriculum app without change ([[§3]]). By owner direction, 2026-09-28, the code tooling matches the curriculum app's unless it does not fit. Checked the same day: the curriculum app runs its TypeScript tests directly on Node's built-in test runner, with no build step, through a small resolve hook that maps extensionless relative imports to `.ts` files. A sample core module and test ran that way on Node 22.22 and passed.

## Clauses

- **clause-1.** **Same tools.** The same TypeScript major version as the curriculum app, the same strict compiler settings, and Node's built-in test runner run directly on `.ts` files.
- **clause-2.** **Same import style.** Core source uses extensionless relative imports, as the curriculum app does, so a core's files can be placed in that app unchanged. Tests resolve them through the same kind of resolve hook, kept in `tools/`.
- **clause-3.** **Erasable syntax only.** The compiler setting `erasableSyntaxOnly` is on, so cores use no TypeScript syntax that must be compiled away, such as `enum` or `namespace`. This is the one departure from the curriculum app's settings. It is needed because tests run the `.ts` files directly (owner direction, 2026-09-28, accepting the recommendation).

## Options considered

- **A separate test framework or build step.** Lost: by owner direction, matching the curriculum app comes first, and the check above found it fits.

## Precept conflicts resolved

None found.
