---
id: ITEM-260928-dice-roller-core
kind: task
status: closed
queued: no
benchmark: bm-dice-roller-core
---
# Build the dice roller core

A die with a number of sides entered as a number, rolled with an injected randomness source ([[randomizer§5]], [[§5]]). The core must meet [[§3]]. Its entry rules are in [[randomizer§8]].

## Done when
Tests with a fixed randomness source show every face from 1 to the number of sides reachable, and none outside it.

## Resolution
Closed 2026-09-28, by owner direction: the core and its tests are in `toys/randomizer/core/`.
