---
id: DEC-260928-randomizer-input-rules
status: proposed
---

# Randomizer input rules

## Context

The randomizer's input rules were open ([[ITEM-260928-randomizer-input-rules]]). The owner answered them in conversation, 2026-09-28. Multipliers and derived chances are set by [[DEC-260928-randomizer-weighting]].

## Clauses

- **clause-1.** **Default multiplier.** An item entered without a multiplier gets 1.0.
- **clause-2.** **Zero allowed.** A multiplier of 0 is allowed. The item's chance is 0% and it is never picked.
- **clause-3.** **No negatives, no maximum.** A multiplier cannot be negative: the entry does not accept a minus sign, so no message is needed. There is no maximum.
- **clause-4.** **One decimal place entered.** A multiplier has at most one decimal place: the entry does not accept a second one, and no message is shown.
- **clause-5.** **Two decimal places displayed.** Chances are displayed as percentages to two decimal places. The chances themselves are never rounded, so the displayed percentages may not add to exactly 100.00%.
- **clause-6.** **Labels.** Blank and duplicate labels are allowed. Each entry is a separate item.
- **clause-7.** **No viable options.** When the active set is empty, or every multiplier in it is 0, the core computes no chances and makes no pick. It reports that no viable option remains, and the host shows "No viable options remain." Because this stops first, chances always total 100% and a pick always returns one item ([[randomizer§2]], [[randomizer§4]]).

## Options considered

None. The rules follow owner direction, 2026-09-28.

## Precept conflicts resolved

None found. The spec is not amended: clause-7 stops before [[randomizer§2]] and [[randomizer§4]] apply (owner direction, 2026-09-28).
