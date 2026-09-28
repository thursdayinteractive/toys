---
id: ITEM-260928-architecture-simplification
kind: task
status: open
queued: yes
benchmark: bm-standalone-delivery
---
# Simplify the architecture

The architecture was carried over from the curriculum app, which is far larger than these toys. The owner asked, 2026-09-28, to look for simplifications before the standalone app fixes it in place. The toys' behavior is not in scope; only the architecture is. Findings go to the owner with their evidence, and no spec or decision changes without approval. Covers:
- **Storage.** The smallest interface every host can supply, such as reading and writing one saved value by name ([[§2]], [[§6]]).
- **One set of screens.** Whether a web export of the standalone app's screens runs through the website embed, loaded from the hosted script ([[DEC-260928-website-hosting]]). If it does, each toy's screens are built once, not once per host ([[§7]], [[DEC-260928-standalone-app#clause-3]]).
- **Anything else** in the repository spec that exists only because of the curriculum app's size.

## Accepted simplifications
The owner accepted these, 2026-09-28. Done: vetting only on request ([[DEC-260928-documentation-baseline#clause-34]]); the documentation checker disabled until it is rewritten; the vetting-only and plan rules moved or dropped; item statuses cut to open, blocked and closed, with no plan kind and no `verified` field; the adapters layer replaced by values passed in and one storage interface ([[§2]], [[§5]], [[§6]]); the caps removed. Also done: decision records kept only for choices that cross toys or last; each toy's behavior in its own spec, with one guide page saying what exists now; two tiers kept: the repository's documents never cite a toy, and each toy's documents cite up to them ([[DEC-260928-documentation-baseline#clause-7]], [[DEC-260928-documentation-baseline#clause-13]]). Still to do:
- none. The checker is rewritten for what remains, with a new check that the repository tier cites no toy.

Storage and web versions left this item, by owner direction: each becomes an addendum when the first toy that needs it has a working solution ([[DEC-260928-documentation-baseline#clause-42]]). The finding below is kept as evidence for the web versions addendum.

## Findings
- **One set of screens, local test, 2026-09-28.** A throwaway app on the curriculum app's stack (Expo 57, React Native 0.86, React 19.2.3), holding one small list screen built on a toy core, was exported for the web. The export is one ordinary script of 347 KB, 103 KB when gzipped. Loaded inside a frame by an ordinary `<script src>` from a second local origin, as a website embed would load it ([[DEC-260928-website-hosting#clause-2]]), it rendered and ran. Not yet tested: on the site itself, which needs the hosting set up ([[ITEM-260928-website-hosting-setup]]); and whether the host serves it compressed (an inference, unverified). By owner direction, the repository spec is not changed on this until it has run on the site: the architecture records what is proven, not what is expected.

## Done when
Each area has findings with evidence, and the owner has decided what changes.
