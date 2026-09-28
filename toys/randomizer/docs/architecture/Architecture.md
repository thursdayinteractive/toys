# Randomizer: Architecture

This toy meets the repository's architecture: its core is platform-free, takes its randomness from its host, and stays usable as a curriculum app add-on. The randomizer and the dice roller are separate cores in this toy.

---

# 1. Items

A randomizer list is an ordered list of items. Each item has:

```
label        text the person entered
multiplier   decimal number; how much more or less likely than other items
```

A list starts empty.

---

# 2. Weighting

An item's chance of being picked is its multiplier divided by the sum of the multipliers of every item in the active set ([[randomizer§3]]). The chances therefore always total 100%, whatever multipliers are entered. Chances are displayed as percentages derived this way. The percentage is never itself entered or stored.

When all multipliers are equal, every item is equally likely.

---

# 3. Active set

The active set is the set of items that can currently be picked. With no temporary removal, it is the whole list.

Temporary removal takes an item out of the active set without deleting it from the list. Restoring it puts it back. Because chances are computed from the active set ([[randomizer§2]]), removing or restoring an item needs no change to any multiplier.

---

# 4. Pick

A pick returns one item from the active set, chosen with the chances in [[randomizer§2]], using one value from the host's randomness source.

---

# 5. Dice roller

A die has a number of sides, entered as a number. A roll is of one or more dice with the same number of sides. For each die it returns a whole number from 1 to that number, each equally likely, using one value from the host's randomness source. The numbers are returned individually, not totaled.

---

# 6. Storage

A new list starts empty. A list can be saved under a title the person chooses, keeping each item's label and multiplier. Saved lists are kept as an array of titled lists. Saving goes through a storage adapter, and the core does not change.
