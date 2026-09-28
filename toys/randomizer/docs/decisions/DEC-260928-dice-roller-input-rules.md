---
id: DEC-260928-dice-roller-input-rules
status: proposed
---

# Dice roller input rules

## Context

The dice roller's input rules were open ([[ITEM-260928-dice-roller-input-rules]]). The owner answered some of them in conversation, 2026-09-28. The number of sides is entered in the "Faces:" field ([[DEC-260928-dice-roller-placement#clause-3]]).

## Clauses

- **clause-1.** **Whole numbers.** The number of sides is a whole number. The entry is a numeric field that takes whole numbers only.
- **clause-2.** **Smallest.** The smallest number of sides is 2.
- **clause-3.** **Largest.** The field holds three digits, so the largest number of sides is 999.
- **clause-4.** **Empty faces.** With the "Faces:" field empty, the roll is blocked and nothing happens.
- **clause-5.** **Too few sides.** A number of sides below 2, such as 0 or 1, is an invalid entry, and the host shows the warning "Invalid entry".
- **clause-6.** **Blank to start.** The "Faces:" and "Quantity:" fields start blank, and so does the place where a roll's numbers are shown.
- **clause-7.** **Quantity.** The number of dice ([[DEC-260928-several-dice]]) is entered in a field labeled "Quantity:". It is a two-digit whole-number field, so the largest quantity is 99.
- **clause-8.** **Empty quantity.** With the "Quantity:" field empty, a roll returns one number.
- **clause-9.** **Zero quantity.** A quantity of 0 blocks the roll, with no message.

## Options considered

None. The rules follow owner direction, 2026-09-28.

## Precept conflicts resolved

None found.
