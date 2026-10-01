---
id: DEC-261001-toy-plug-in-contract
status: proposed
---

# One copy of a toy's screens in both React Native hosts

## Context

The curriculum app is to list the toys as components built into it. The owner directed, 2026-09-30, that the toys be edited so one copy of each runs in both the standalone app and the curriculum app, rather than being copied into the app and edited there. The first step, a host-supplied button, is [[ITEM-260930-toy-host-button-seam]]. The owner then set the rest of the contract, 2026-10-01: the host supplies the design tokens, the full-screen view, the screen-awake setting and the exit, so a toy's folder holds no native import, and the exit from a full-screen feature leaves to the shell that launched the toy, in either host. This record states what that changes in the spec and addenda.

## Clauses

- **clause-1.** **Shared screens in the two React Native hosts.** A toy's screens are one copy in this repository, and the standalone app and the curriculum app both run it, each supplying what clause-2 lists. A toy's core stays free of any host ([[§2]]). The website keeps its own plain JavaScript interface ([[§7]]). This replaces clause-2 of [[DEC-260928-architecture-baseline]] for the two React Native hosts only.
- **clause-2.** **The contract.** A host passes each screen: storage, a button, the design tokens, `Back`, `KeepAwake` and `Overlay`. The button takes a label, an action and an optional tier: Primary when omitted, Secondary, Destructive, or Link (plain clickable text). `Back`, `KeepAwake` and `Overlay` are components, so a toy imports no native package. A toy's folder imports only React, React Native, the contract and this repository's own `assets/icons/`.
  amends: [§7, addenda/host-button, addenda/host-services]
- **clause-3.** **Back leaves the toy.** `Back` is the host's own exit from a full-screen feature to the shell that launched the toy, and the device's back key inside a full-screen feature does the same. A toy places `Back` and gives it no handler. In the standalone app the exit goes to the toy menu. A toy with several screens may have its own ordinary back controls inside the toy.
- **clause-4.** **Order.** The curriculum app host is built now, ahead of the website, by owner direction, 2026-09-30. This replaces clause-1 of [[DEC-260928-roadmap-phasing]] to that extent. The Roadmap's phases are not changed by this record.
- **clause-5.** **How the code reaches the curriculum app.** The curriculum app takes this repository as one npm git dependency pinned to a commit on `main`. Only `react` and `react-native` are peer dependencies here, with wide ranges; every other package is a dependency at the curriculum app's ranges. No submodule and no copy. A change to a toy reaches the curriculum app only when it moves that pin.

## Options considered

- **Copy the toys into the curriculum app and edit them there.** Lost: by owner direction, two copies drift.
- **A git submodule.** Lost: a submodule adds fetch, pin and dirty-state handling to ordinary git work, and the pinned dependency already covers the pin.
- **The toys import the native packages themselves.** Lost: a toy's folder would then depend on which packages a host has installed.

## Precept conflicts resolved

Clause-2 of [[DEC-260928-architecture-baseline]] preferred each host building its own interface. The owner's direction of 2026-09-30 chose shared screens for the two React Native hosts, so clause-1 here replaces it for them, and the baseline record notes it in an appended section. Clause-1 of [[DEC-260928-roadmap-phasing]] set the order; clause-4 replaces it for the curriculum app host, and that record notes it in an appended section.
