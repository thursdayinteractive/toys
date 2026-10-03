# Randomizer: Architecture

This toy meets the repository's architecture: its core is platform-free, takes its randomness from its host, and stays usable as a curriculum app add-on. The randomizer and the dice roller are separate cores in this toy. This spec is the one home for the toy's behavior.

---

# 1. Items

A randomizer list is an ordered list of items. Each item has:

```
label        text the person entered
multiplier   decimal number; how much more or less likely than other items
```

The person enters a multiplier for each item, such as 1, 1.2 or 2.0, never a percentage.

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

A new list starts with two rows, so the person sees how a list works. Saving goes through the storage interface, and the core does not change.

1. A list is saved under a title the person chooses, keeping each item's label and multiplier.
2. A save button saves the list.
3. A saved list is loaded by choosing it from a list of saved lists.
4. A title cannot be blank, and is at most 14 characters long.
5. A saved list can be deleted.
6. One saved list is enough for now. Saved lists are kept as an array of titled lists, so more can be kept later without changing how a list is saved.

---

# 7. Weight entry and display

1. An item entered without a multiplier gets 1.0.
2. A weight field holds digits with at most one decimal place. It does not accept a minus sign or a second decimal place, and no message is shown. There is no maximum.
3. A decimal works as a decimal: ".5" is 0.5 and "3." is 3. A field holding only a decimal point is an invalid entry: the warning "Invalid entry" shows, and the pick is not made while any weight field is invalid.
4. A multiplier of 0 is allowed. The item's chance is 0% and it is never picked.
5. Chances are displayed as percentages to two decimal places. The chances themselves are never rounded, so the displayed percentages may not add to exactly 100.00%.
6. Blank and duplicate labels are allowed. Each entry is a separate item.
7. When the active set is empty, or every multiplier in it is 0, no chances are computed and no pick is made. The core reports that no viable option remains, and the host shows "No viable options remain." Because this stops first, chances always total 100% and a pick always returns one item ([[randomizer§2]], [[randomizer§4]]).

---

# 8. Dice roller entry

1. The number of sides is entered in a field labeled "Faces:". It takes whole numbers of up to three digits, so the largest is 999.
2. The smallest number of sides is 2. A number below 2, such as 0 or 1, is an invalid entry, and the warning "Invalid entry" shows.
3. With "Faces:" empty, the roll is blocked and nothing happens.
4. The number of dice is entered in a field labeled "Quantity:". It takes whole numbers of up to two digits, so the largest is 99.
5. With "Quantity:" empty, a roll returns one number. A quantity of 0 blocks the roll, with no message.
6. "Faces:" and "Quantity:" start blank, and so does the place where a roll's numbers are shown.
7. When "Faces:" is below 2 and "Quantity:" is 0, the warning "Invalid entry" shows.

---

# 9. Screen

1. The dice roller and the randomizer share one screen. The dice roller sits at the top, and a divider separates it from the randomizer below.
2. The randomizer has a label field and a weight field in pairs, repeated for each item, with one submit button under all the pairs. Pressing it makes the pick in one step.
3. The screen is built from the toy's cores and holds none of the toy's logic, so it can also serve as the toy's interface inside the curriculum app.
4. The dice roller: "Faces:" and "Quantity:" side by side with a "Roll" button beside them. The numbers rolled show on one line, separated by commas, in a large centered result space above the fields. "Invalid entry" shows in that space, in the warning text color.
5. Each item row: a label field with the hint "Item", a weight field with the hint "1.0", and the item's chance at the right. Two blank rows are two items, each 50%.
6. A trash icon on each row deletes it. The icons are hidden while only two rows remain, so the list never has fewer than two. An "+ Add item" text link sits under the rows.
7. The submit button reads "Randomize". The picked item's label shows in a large centered result space above the item rows, or "No viable options remain.", or "Invalid entry".
8. Before a roll's numbers or a pick's result appear, a large die icon spins for one second in the result space. The button that started it does nothing when tapped until the result appears.
9. Below "Randomize": a "Title" field, which takes at most 14 characters, and a "Save" button, which does nothing when tapped while the title is blank. Saving under a title already saved replaces that list; a new title is added at the end. Under them, a "Saved lists" heading and one row per saved list: tapping its title opens it, putting its items and title in place, and its trash icon deletes it at once. An opened item's weight shows as its number, so a blank weight saved comes back as 1.
10. A "Clear" text link in the destructive color sits at the right end of the "+ Add item" row, apart from "+ Add item" so a tap meant for one does not land on the other. Tapping it puts the item rows back to two blank rows and removes the result and any warning. It leaves the title and the saved lists as they are, asks nothing first, and does nothing while a pick is spinning.
