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
The owner accepted these, 2026-09-28. Done: vetting only on request ([[DEC-260928-vetting-on-request]]); the documentation checker disabled until it is rewritten; the vetting-only and plan rules moved or dropped; item statuses cut to open, blocked and closed, with no plan kind and no `verified` field; the adapters layer replaced by values passed in and one storage interface ([[§2]], [[§5]], [[§6]]); the caps removed. Still to do:
- decision records only for choices that cross toys or last; a toy's behavior rules in its own spec, edited with approval;
- one home for toy behavior, with the rest pointing to it;
- a toy keeps one spec and one product-and-guide page, with its items and decisions at repository level;
- the checker rewritten for what remains.

## Done when
Each area has findings with evidence, and the owner has decided what changes.
