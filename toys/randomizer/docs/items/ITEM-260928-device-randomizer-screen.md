---
id: ITEM-260928-device-randomizer-screen
kind: task
status: open
queued: no
benchmark: bm-randomizer-standalone
---
# Device check: the randomizer screen

The randomizer's screen ([[randomizer§9]]) was verified only by typecheck and tests, an Android bundle export, and a scripted local web build. Nothing below has been seen on a device.

## Found on a device

On an iPhone (reported as "16, 26.6.2"), from an EAS build, 2026-10-02: with the keyboard open on an item name or the title, the field being typed in was hidden under the keyboard and the list did not scroll to it. Reported by the owner with a screenshot. The scrolling list had no keyboard handling. The change: `automaticallyAdjustKeyboardInsets` on the list, an iOS setting that adds the keyboard's height as space and scrolls the focused field into view. It does nothing on Android. Not yet checked on a device after the change; the last bullet below stays open until it is.

## Clear button

By the owner's direction, 2026-10-03, after testing a long list that was hard to clear one row at a time: a "Clear" text link in the destructive color at the right end of the "+ Add item" row ([[randomizer§9 item 10]]). Built on the new Destructive link tier of the host button. Not yet seen on a device; the checks are the last bullets below.

## Done when
On an Android device and an iPhone, from a preview build:
- "Faces:" takes only up to three digits and "Quantity:" up to two, on a number keypad; a weight field refuses a minus sign and a second decimal place, on a decimal keypad;
- the result spaces above the dice and above the item rows are large and centered, and a result or warning there is readable at arm's length;
- "Roll" and "Randomize" each spin the die for about one second, do nothing when tapped while it spins, then show the result;
- "Invalid entry" shows for faces of 0 or 1, and for a weight of only a decimal point;
- the list starts with two rows; trash icons appear only with three or more; chances update as weights change;
- the screen scrolls with the keyboard open, and fields are not hidden behind it.
- a saved list is still there after the app is closed and reopened; opening, replacing and deleting it work; the title field stops at 14 characters;
- with a long list entered, "Clear" in red sits at the right end of the "+ Add item" row, far enough from "+ Add item" that tapping one does not hit the other; tapping it leaves two blank rows with no chances shown, no result or warning, the title and saved lists untouched;
- tapping "Clear" while the die is spinning for a pick does nothing, and the result still shows;
- **In the curriculum app, once its button draws the new tier:** "Clear" looks like that app's "Remove" link, bold and in the same red.
