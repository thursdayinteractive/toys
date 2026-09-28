---
id: ITEM-260928-architecture-simplification
kind: task
status: open
queued: yes
verified: n/a
benchmark: bm-standalone-delivery
---
# Simplify the architecture

The architecture was carried over from the curriculum app, which is far larger than these toys. The owner asked, 2026-09-28, to look for simplifications before the standalone app fixes it in place. The toys' behavior is not in scope; only the architecture is. Findings go to the owner with their evidence, and no spec or decision changes without approval. Covers:
- **Storage.** The smallest interface every host can supply, such as reading and writing one saved value by name ([[§2]], [[§6]]).
- **One set of screens.** Whether a web export of the standalone app's screens runs through the website embed, loaded from the hosted script ([[DEC-260928-website-hosting]]). If it does, each toy's screens are built once, not once per host ([[§7]], [[DEC-260928-standalone-app#clause-3]]).
- **Anything else** in the repository spec that exists only because of the curriculum app's size.

## Done when
Each area has findings with evidence, and the owner has decided what changes.
