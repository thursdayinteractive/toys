# Randomizer User Guide

The toy's one page besides its spec. It describes what exists now and how to use it; the behavior itself is set in the spec.

## What it does now

- **prod-randomizer-core.** The randomizer core is built: items, chances, the pick, and the weight entry and display rules ([[randomizer§1]]–[[randomizer§4]], [[randomizer§7]]). It takes plain data in and gives plain data out, so it can be used inside the curriculum app unchanged.
- **prod-randomizer-dice-core.** The dice roller core is built: rolls of one or more dice, and the "Faces:" and "Quantity:" entry rules ([[randomizer§5]], [[randomizer§8]]). It is a separate core, also plain data in and out.
- **prod-randomizer-screen.** The screen is built in the standalone app: the dice roller, the item rows with their chances, "Add item" and "Clear", "Randomize", and the spinning die before each result ([[randomizer§9]]).
- **prod-randomizer-saved-lists.** Saved lists are built: save under a title, open, replace and delete, kept on the device through the storage interface ([[randomizer§6]], [[randomizer§9 item 9]]).

## Using the toys

For the people who use the randomizer and dice roller. This section contains no internal IDs.

**Dice.** Enter how many faces each die has (2 to 999) and how many dice to roll (up to 99; blank rolls one). Tap "Roll": a die spins for a second, then each die's number shows.

**Picking an item.** Type each item's name and, if you like, a weight: 2 makes an item twice as likely as one with weight 1, and 0 means it is never picked. Blank weights count as 1. Each item's chance shows beside it. Tap "+ Add item" for more rows, or the trash icon to remove one; there are always at least two. Tap "Clear", the red text at the right end of the "+ Add item" row, to put back two blank rows; your title and saved lists stay. Tap "Randomize": a die spins for a second, then the picked item shows.

**Saving a list.** Type a title (up to 14 characters) and tap "Save". Your saved lists appear under "Saved lists": tap one to bring it back, or its trash icon to delete it. Saving again under the same title replaces that list.

## Adding a toy to a host

Nothing is built yet.
