---
id: ITEM-260928-randomizer-input-rules
kind: decision
status: open
queued: yes
benchmark: bm-randomizer-core
---
# Randomizer input rules

Multipliers are decimals and chances are derived from them ([[DEC-260928-randomizer-weighting]]). These questions are not yet answered:
- the multiplier an item gets when the person enters none (the owner's example, "1, 1.2, 2.0", suggests 1; this is an inference);
- whether zero is allowed, and what a zero-multiplier item means;
- whether negative values are refused, and whether there is a maximum;
- how many decimal places are accepted, and how many are shown in the displayed percentage;
- whether blank or duplicate labels are allowed;
- what a pick does when the list is empty.

## Done when
The owner has answered each question, and the answers are recorded in a decision record.
