---
id: DEC-260928-architecture-baseline
status: proposed
---

# The first architecture spec and add-on compatibility

## Context

This repository's toys must work in three places: on their own as an app, on the ThursdayInteractive.com website, and as add-ons to the curriculum app. The owner's direction, 2026-09-28: the toys are to be compatible with the curriculum app's architecture but not necessarily led by it. Dropping a toy into the curriculum app as a component would be ideal. Self-contained logic is more likely to pass that app's architecture tests and to be supported on every platform. The owner also directed that the documentation carry a flag that the toys must stay compatible as add-ons.

## Clauses

- **clause-1.** **The first spec.** `docs/architecture/Architecture.md`, as it stands when this record is accepted, is the spec. Later changes follow [[DEC-260928-documentation-baseline#clause-27]].
- **clause-2.** **Self-contained cores.** Each toy's logic is a platform-free TypeScript core, and each host builds its own interface on it ([[§2]]). This is preferred over a single shared interface component because a core with no platform imports and no UI meets the curriculum app's rule for its engine layers, and runs on every target.
- **clause-3.** **The add-on flag.** Every toy stays usable as a curriculum app add-on ([[§3]]). This is carried into `CLAUDE.md` as [[rule-add-on-compatible]] so every session reads it.
- **clause-4.** **Injected randomness.** A core receives randomness from its host ([[§6]]). This follows the curriculum app's practice of injecting non-deterministic inputs. It also makes every result reproducible in tests.

## Options considered

- **Each toy as one shared React Native component.** Lost: by owner direction, a self-contained core is the likelier fit with the curriculum app's architecture tests and with every platform. A component can still be built on the core as the app host.
- **Citing the curriculum app's spec rather than writing one here.** Lost: citations cannot resolve across repositories ([[DEC-260928-documentation-baseline]], context).

## Comparison and review files

None. The clauses come from owner direction in conversation, 2026-09-28, not from a vetting round.

## Precept conflicts resolved

None found.
