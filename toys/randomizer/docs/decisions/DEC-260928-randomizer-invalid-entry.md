---
id: DEC-260928-randomizer-invalid-entry
status: proposed
---

# Invalid weight entry

## Context

A weight field must let the person type a lone decimal point on the way to an entry such as ".5", so a lone decimal point can be left in the field when the pick is made. The input rules did not cover it ([[DEC-260928-randomizer-input-rules]]). The owner answered in conversation, 2026-09-28.

## Clauses

- **clause-1.** **A lone decimal point is invalid.** A weight field holding only a decimal point is an invalid entry, and the host shows the warning "Invalid entry". An entry with digits on either side of the point is a decimal: ".5" is 0.5 and "3." is 3.

## Options considered

None. The rule follows owner direction, 2026-09-28.

## Precept conflicts resolved

None found.
