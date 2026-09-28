---
id: ITEM-260928-list-storage
kind: task
status: open
queued: no
benchmark: bm-randomizer-standalone
verified: none
---
# Keep lists between uses

A list can be saved under a title the person chooses, keeping each item's label and multiplier, in Phase 1 ([[DEC-260928-saved-lists]]). Saving goes through a storage adapter with no change to the core ([[randomizer§6]], [[§6]]). Not yet answered:
- how the person saves, and how a saved list is loaded again;
- what saving does when a list is already saved;
- whether a title can be blank, and how long it can be;
- whether a saved list can be deleted.

## Done when
The owner has answered those questions, and a list saved under a title is still there on the next use, in the standalone app.
