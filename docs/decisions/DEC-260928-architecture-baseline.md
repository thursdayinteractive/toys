---
id: DEC-260928-architecture-baseline
status: accepted
---

# The first architecture spec and add-on compatibility

## Context

This repository's toys must work in three places: on their own as an app, on the ThursdayInteractive.com website, and as add-ons to the curriculum app. The owner's direction, 2026-09-28: the toys are to be compatible with the curriculum app's architecture but not necessarily led by it. Dropping a toy into the curriculum app as a component would be ideal. Self-contained logic is more likely to fit that app's architecture and to be supported on every platform. The owner also directed that the documentation carry a flag that the toys must stay compatible as add-ons.

## Clauses

- **clause-1.** **The first spec.** `docs/architecture/Architecture.md`, as it stands when this record is accepted, is the repository spec. Later changes follow [[DEC-260928-documentation-baseline#clause-12]].
- **clause-2.** **Self-contained cores.** Each toy's logic is a platform-free TypeScript core, and each host builds its own interface on it ([[§2]]). This is preferred over a single shared interface component because a core with no platform imports and no UI fits the curriculum app's architecture ([[§3]]) and runs on every target.
- **clause-3.** **The add-on flag.** Every toy stays usable as a curriculum app add-on ([[§3]]). This is carried into `CLAUDE.md` as [[rule-add-on-compatible]] so every session reads it.
- **clause-4.** **Injected inputs.** A core receives randomness and every other non-deterministic input from its host ([[§5]]). This keeps cores free of platform code and makes every result reproducible in tests.

## Options considered

- **Each toy as one shared React Native component.** Lost: by owner direction, a self-contained core is the likelier fit with the curriculum app and with every platform. A component can still be built on the core as the app host.
- **Letting the curriculum app lead the design.** Lost: by owner direction, the toys are compatible with it but not led by it; [[§3]] is the whole of the constraint.

## Precept conflicts resolved

None found.

## Supersessions

- clause-2 is superseded, for the standalone app and the curriculum app, by [[DEC-261001-toy-plug-in-contract#clause-1]]: a toy's screens are one copy that both run. It stands for the website host and for every core.
