---
id: ITEM-260928-randomizer-core
kind: task
status: closed
queued: yes
benchmark: bm-randomizer-core
---
# Build the randomizer core

Items with a label and a decimal multiplier, chances derived from the multipliers, and a pick using an injected randomness source ([[randomizer§1]]–[[randomizer§4]], [[randomizer§7]]). The core must meet [[§3]]. The input rules were settled first ([[ITEM-260928-randomizer-input-rules]]).

## Done when
Tests with a fixed randomness source show each chance matching [[randomizer§2]], chances totaling 100%, and picks landing on the expected items.

## Resolution
Closed 2026-09-28, by owner direction: the core and its tests are in `toys/randomizer/core/`.
