---
id: ITEM-261001-toy-plug-in-contract
kind: task
status: open
queued: no
benchmark: bm-app-add-on-route
---
# Let a toy's screens run unchanged in the standalone app and as a component in the curriculum app

Owner direction, 2026-09-30 and 2026-10-01. This item covers the toys repository only. The curriculum app's side, its menu entry and its architecture records are its own work. Builds on [[ITEM-260930-toy-host-button-seam]]; the contract is [[DEC-261001-toy-plug-in-contract]].

## Steps
1. Widen the toy contract: the design tokens, `Back`, `KeepAwake`, `Overlay` and a button tier ([[DEC-261001-toy-plug-in-contract#clause-2]]).
2. Rebuild the five screens from the tokens they are passed, and remove the turn tracker's sideways wrapper and back arrow. The standalone app supplies the new props from its own tokens and its native packages.
3. Move `react` and `react-native` to wide peer dependencies, and put the Expo packages at the curriculum app's ranges ([[DEC-261001-toy-plug-in-contract#clause-5]]).
4. Update the spec's section 7, the two addenda, the turn tracker's and the randomizer's own specs, guides and device-check items.
5. Run `npm run typecheck`, `npm test`, `npm run docs -- check`, and an Android bundle export.

## Built
Steps 1 to 5 were built 2026-10-01, with typecheck and 51 tests passing and an Android bundle export clean. A new `src/presentation/hostServices.tsx` holds the standalone app's `Back`, `KeepAwake` and `Overlay`.

## Not covered
- Screen behavior has no automated tests, so the sideways view, the back control, the screen-awake setting and the new button tiers are checked only by typecheck, the bundle export and the device check.
- The mirrored back arrow's centring is from a measurement of the icon's artwork and has not been seen on a device.
- Everything on the curriculum app side.

## Done when
The toys' screens import no native package and no host file; the standalone app behaves as before except for the exit, which now leaves to the toy menu; the checks in step 5 pass; the owner has merged this branch.
