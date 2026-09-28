---
id: DEC-260928-several-dice
status: proposed
---

# Rolling several dice

## Context

The spec's dice roller rolls one die and returns one number ([[randomizer§5]]). The owner asked for a second field that lets the dice roller return several numbers at once, in conversation, 2026-09-28.

## Clauses

- **clause-1.** **Several dice, each returned individually.** A roll is of one or more dice with the same number of sides. It returns one number per die, each on its own, not a total.
  amends: [randomizer§5]
- **clause-2.** **A second field.** The number of dice is entered in a second field beside the dice roller's "Dice Faces" field ([[DEC-260928-dice-roller-placement#clause-3]]). Its label and input rules are open ([[ITEM-260928-dice-roller-input-rules]]).

## Options considered

- **A total of the dice.** Lost: by owner direction, each number is returned individually.

## Precept conflicts resolved

None found. The spec is amended by clause-1 (owner direction, 2026-09-28).
