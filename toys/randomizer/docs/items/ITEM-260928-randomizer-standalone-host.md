---
id: ITEM-260928-randomizer-standalone-host
kind: task
status: blocked
queued: no
phase: 1
benchmark: bm-randomizer-standalone
blocked_on: the standalone app existing, ITEM-260928-standalone-app-shell
---
# Put the randomizer in the standalone app

The randomizer and dice roller screens, supplied to the standalone app from this toy's folder and built on their cores with none of the toy's logic of their own ([[§2]], [[§7 item 1]]).

Screen layout, by owner direction, 2026-09-28: the dice roller at the top, then a divider ([[DEC-260928-dice-roller-placement]]). Below it, the randomizer: a label field and a weight field in pairs, repeated for each item, with one submit button under all the pairs. Pressing it makes the pick in one step.

## Done when
A person can enter a list with multipliers, see each item's chance, pick an item, and roll a die, in the standalone app.
