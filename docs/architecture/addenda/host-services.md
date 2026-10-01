# Addendum: host services

Set by the turn tracker, whose full-screen features needed the screen to stay awake, the device turned sideways, an exit, and the host's own colors and sizes, 2026-10-01 ([[§7]], [[§8]]). Every later toy follows it.

1. **What a host supplies.** Besides storage and the button, a host passes each toy's screen the design tokens, `Back`, `KeepAwake` and `Overlay`. A toy imports no native package and no host file; its folder imports only React, React Native, the contract and this repository's own `assets/icons/`.
2. **The tokens.** The design tokens are plain colors, spacing, radii and font sizes and weights, passed as one value. A toy builds its styles from them, once per value, so a host's own colors and sizes show in the toy.
3. **Back.** `Back` is a component the host draws, in the style of its own back controls, with no text. It leaves a full-screen feature to the shell that launched the toy: in the standalone app, the toy menu. A toy places it and gives it no handler. The device's back key inside a full-screen feature does the same. A toy with several screens may have its own ordinary back controls inside the toy.
4. **Overlay.** `Overlay` draws a full-screen feature over the whole screen, header band included, and is the only thing a toy puts in the way of the host's screen. `orientation="landscape"` turns the device sideways while it is open and puts it back upright when it closes. Only one overlay is open at a time.
5. **KeepAwake.** `KeepAwake` keeps the screen on while it is rendered and releases it when it is not.
6. **The same components each time.** A host passes the same components on every render, so a screen's state survives its re-renders.
7. **The standalone app.** The app builds these once for each running toy, from its own tokens and `expo-keep-awake` and `expo-screen-orientation`. Its overlay is a full-screen modal, and `Back` and the device's back key leave to the toy menu.
8. **Other hosts.** The curriculum app supplies the same components from its own, when it lists the toys. The website supplies its own versions when its route is built.
