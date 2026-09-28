---
id: ITEM-260928-device-randomizer-screen
kind: task
status: open
queued: no
benchmark: bm-randomizer-standalone
---
# Device check: the randomizer screen

The randomizer's screen ([[randomizer§9]]) was verified only by typecheck and tests, an Android bundle export, and a scripted local web build. Nothing below has been seen on a device.

## Done when
On an Android device and an iPhone, from a preview build:
- "Faces:" takes only up to three digits and "Quantity:" up to two, on a number keypad; a weight field refuses a minus sign and a second decimal place, on a decimal keypad;
- the result spaces above the dice and above the item rows are large and centered, and a result or warning there is readable at arm's length;
- "Roll" and "Randomize" each spin the die for about one second, stay disabled while it spins, then show the result;
- "Invalid entry" shows for faces of 0 or 1, and for a weight of only a decimal point;
- the list starts with two rows; trash icons appear only with three or more; chances update as weights change;
- the screen scrolls with the keyboard open, and fields are not hidden behind it.
- a saved list is still there after the app is closed and reopened; opening, replacing and deleting it work; the title field stops at 14 characters.
