---
id: DEC-260928-randomizer-weighting
status: proposed
---

# Randomizer weighting, lists, and the dice roller

## Context

The first tool is a randomizer. The person enters a list of items and the randomizer picks one. The owner wants some items to be more likely than others, with the chances totaling 100%. Later, items must also be removable from the list temporarily. The owner also asked for a dice roller with a simple numeric input for the number of sides. These answers were given in conversation, 2026-09-28.

## Clauses

- **clause-1.** **Multipliers, not percentages.** The person enters a weighting multiplier for each item, for example 1, 1.2 or 2.0. Each item's chance is derived from the multipliers ([[randomizer§2]]), so the chances always total 100%.
- **clause-2.** **Decimals.** Multipliers accept decimal values.
- **clause-3.** **Temporary removal needs no reweighting.** Because chances are derived from the multipliers of the items still in play ([[randomizer§3]]), removing an item needs no change to any other item's weight.
- **clause-4.** **Lists start empty.** Storage comes later ([[randomizer§6]]).
- **clause-5.** **Dice roller.** A dice roller takes a number of sides as a simple numeric input ([[randomizer§5]]).

## Options considered

- **Entered percentages that must total 100%.** Lost: by owner direction, a multiplier is entered and the percentages follow. With multipliers, the total cannot be wrong, and temporary removal does not break it.

## Precept conflicts resolved

None found.
