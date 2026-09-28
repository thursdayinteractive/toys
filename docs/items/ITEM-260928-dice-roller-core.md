---
id: ITEM-260928-dice-roller-core
kind: task
status: open
queued: no
verified: n/a
benchmark: bm-dice-roller-core
---
# Build the dice roller core

A die with a number of sides entered as a number, rolled with an injected randomness source ([[§5]], [[§6]], [[DEC-260928-randomizer-weighting#clause-5]]). The core must meet [[§3]]. The input rules are an open decision ([[ITEM-260928-dice-roller-input-rules]]).

## Done when
Tests with a fixed randomness source show every face from 1 to the number of sides reachable, and none outside it.
