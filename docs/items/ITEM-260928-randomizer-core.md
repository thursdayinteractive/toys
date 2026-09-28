---
id: ITEM-260928-randomizer-core
kind: task
status: open
queued: no
verified: n/a
benchmark: bm-randomizer-core
---
# Build the randomizer core

Items with a label and a decimal multiplier, chances derived from the multipliers, and a pick using an injected randomness source ([[§4]], [[§6]], [[DEC-260928-randomizer-weighting]]). The core must meet [[§3]]. The input rules are an open decision ([[ITEM-260928-randomizer-input-rules]]) and are settled before this is built.

## Done when
Tests with a fixed randomness source show each chance matching [[§4.2]], chances totaling 100%, and picks landing on the expected items.
