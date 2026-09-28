# Randomizer product

What the randomizer does now. Only its core exists; no host shows it yet.

- **prod-randomizer-items.** A list is an ordered set of items, each a label and a multiplier. Blank and duplicate labels are allowed, and each entry is a separate item ([[DEC-260928-randomizer-input-rules#clause-6]]).
- **prod-randomizer-chances.** Each item's chance is its multiplier divided by the sum of every item's multiplier, so the chances total 100%. An item with multiplier 0 has a 0% chance ([[randomizer§2]], [[DEC-260928-randomizer-input-rules#clause-2]]).
- **prod-randomizer-percentages.** A chance is shown as a percentage to two decimal places, such as 33.33%. The chances themselves are not rounded, so the shown percentages may not add to exactly 100.00% ([[DEC-260928-randomizer-input-rules#clause-5]]).
- **prod-randomizer-pick.** A pick takes one random number from the host and returns one item, chosen with the chances above. An item with multiplier 0 is never picked. The result is the item's position in the list, since labels may repeat ([[randomizer§4]]).
- **prod-randomizer-no-viable-options.** When the list is empty or every multiplier is 0, the core computes no chances and makes no pick. It reports that no viable option remains, for the host to show as "No viable options remain." ([[DEC-260928-randomizer-input-rules#clause-7]]).
- **prod-randomizer-weight-entry.** A weight field holds digits with at most one decimal place and no minus sign. An empty field gives a multiplier of 1.0. A decimal works as a decimal: ".5" is 0.5 and "3." is 3 ([[DEC-260928-randomizer-input-rules#clause-1]], [[DEC-260928-randomizer-input-rules#clause-3]], [[DEC-260928-randomizer-input-rules#clause-4]]).
- **prod-randomizer-invalid-entry.** A weight field holding only a decimal point is an invalid entry. The core reports it, for the host to show the warning "Invalid entry" and block the pick ([[DEC-260928-randomizer-invalid-entry]]).
