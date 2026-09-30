---
id: ITEM-260930-toy-host-button-seam
kind: task
status: open
queued: no
benchmark: bm-app-add-on-route
---
# Let a toy's screens run unchanged in the standalone app and the curriculum app

Owner direction, 2026-09-30: edit the toys so one copy of each runs in both hosts, rather than copying them into the curriculum app and editing there. This draft plan covers only the toys repository. Placing the toys in the curriculum app, and how their code reaches it, stay under [[ITEM-260928-app-add-on-integration]]. This work is ahead of the Phase 3 order in the Roadmap, by owner direction.

## What was found
- Five screen files import from outside their folders: `tokens` (all five) and `Button` (three: the randomizer screen, the turn tracker screen and the talk clicker). The toy folders' index files also import the `Toy` type.
- The curriculum app's `tokens` has every key the toys use. Its `Button` requires a `variant` and has no `disabled` prop, so the toys' `Button` cannot stand in for it.
- The standalone shell's header band is not used by any toy folder, so it needs no change.
- Three buttons rely on `disabled`: Roll and Randomize during the one-second spin, and Save while the title is blank. `saveList` does not reject a blank title, so today only `disabled` enforces that rule.
- The turn tracker screen takes no props today.

## Decisions
- **Settled, owner, 2026-09-30.** Guard in the handlers. No `disabled` prop on a button.
- **Settled, owner, 2026-09-30.** The randomizer spec's screen items 8 and 9 now say the button "does nothing when tapped", and the device-check item matches. Done in this branch.
- **Settled, owner, 2026-09-30.** A host supplies the `Button` to a toy's screen as a prop, the way it already supplies `storage`. The toys' `Button` contract becomes `{ label, onPress }`. Reason: the button differs per host, as storage does, so the same channel serves. Only the turn tracker needs one hand-off, from its screen to the talk clicker.
- **Proposed.** `tokens` stays a relative import. It works wherever a host keeps `tokens` at `src/presentation/tokens` and the toys under `toys/`, as the curriculum app does. This constrains how the toys' code is delivered there.
- **Proposed.** The addendum for this capability is written after the solution works, per the spec's addendum rule.

## Alternative considered
Give the toys their own `Button` inside the toys folder, with no contract change. Smaller to build. Cost: the curriculum app would hold a second button implementation outside its own design system, and its look would have to be kept in step by hand. The curriculum app's design system record has not been read for this.

## Steps
1. In the randomizer screen, return early from the roll and randomize handlers while a spin runs, and from the save handler while the title is blank. Remove the three `disabled` props and the `disabled` prop of the toys' `Button`.
2. Add `Button` to `ToyScreenProps`. Read it in `RandomizerScreen`, `TurnTrackerScreen` and `TalkClicker`. The shell passes its own.
3. Write the addendum. Check whether the User Guide needs a line for the lost dimming.
4. Run `npm run typecheck`, `npm test`, `npm run docs -- check` and an Android bundle export.

## Built
Steps 1 and 2 were built 2026-09-30, with `npm run typecheck`, `npm test` (51 passing) and an Android bundle export clean. Step 3 is waiting for the owner's approval. What remains to see on a device is in the randomizer's and the turn tracker's device-check items.

## Not covered
- Screen behavior has no automated tests, so the new guards are checked only by typecheck, the bundle export and the device check.
- Everything on the curriculum app side: native packages, orientation, the storage adapter, the Toys & Tools block, its architecture exception and documents.

## Done when
The toys' screens hold no import of a host `Button` and no `disabled`; the standalone app behaves as before except for the dimming; the checks in step 4 pass.
