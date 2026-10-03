---
id: ITEM-261003-randomizer-clear-button
kind: task
status: open
queued: no
benchmark: bm-randomizer-standalone
---
# A "Clear" button on the randomizer

By the owner's direction, 2026-10-03. With a long list, clearing meant deleting one row at a time. The owner tested it and asked for a "Clear" button, in the destructive color as text. The host button had no such tier, so the owner directed a new one: Destructive link, since the curriculum app already has clickable destructive text (its "Remove" link), and the owner said the turn tracker also has a clear button.

## Decisions
- **Settled, owner, 2026-10-03.** "Clear" puts the item rows back to two blank rows and removes the result and any warning. It leaves the title and the saved lists alone, asks nothing first, and is not on the dice roller.
- **Settled, owner, 2026-10-03.** It sits at the right end of the "+ Add item" row, apart from "+ Add item" so a tap does not land on the wrong one.
- **Settled, owner, 2026-10-03.** The host button gets a fifth tier, Destructive link, rather than the randomizer drawing its own text ([[DEC-261001-toy-plug-in-contract#clause-2]], [[ITEM-260930-toy-host-button-seam]]).
- **Not settled by the owner.** "Clear" does nothing while a pick is spinning, as "Randomize" does, so the spin's result cannot appear for a list that has been cleared. Raised with the owner afterwards.

## Built
`variant: 'destructiveLink'` in `src/toy.ts`, drawn by the standalone app's button in the destructive text color; "Clear" in `RandomizerScreen.tsx`; the spec's screen section, the user guide, the host-button addendum and the contract decision's clause-2. `npm run typecheck`, `npm test` (51 passing) and an Android bundle export are clean. Not seen on a device or in a web render.

## Not covered
- **The curriculum app's host adapter.** Its toy button (`toolHost.tsx`) draws only the primary-colored link, so it must draw Destructive link before the app's pin moves to a commit with this change; until then its typecheck fails on the new tier. That is work in the curriculum app, done when the pin is bumped.
- **The turn tracker.** Its talk clicker's "Reset" is a filled Destructive button. Not changed.

## Done when
The device checks in [[ITEM-260928-device-randomizer-screen]] pass, and the curriculum app draws the new tier.
