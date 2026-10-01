# Turn Tracker User Guide

The toy's one page besides its spec. It describes what exists now and how to use it; the behavior itself is set in the spec.

## What it does now

- **prod-turn-tracker-timer-core.** The turn timer core is built: the time counting up, the dragon at two minutes, and its flashing and growth from two and a half minutes ([[turn-tracker§2]]). It takes the start time and the time now as plain numbers, so it can be used inside the curriculum app unchanged.
- **prod-turn-tracker-clicker-core.** The talk clicker core is built: four counters and reset ([[turn-tracker§3]]). It is a separate core, also plain data in and out.
- **prod-turn-tracker-screens.** The screens are built in the standalone app: the first screen's two buttons, and the turn timer and talk clicker shown sideways over the whole screen ([[turn-tracker§4]]). They have not yet been seen on a device.

## Using the toys

For the people who use the turn timer and talk clicker. This section contains no internal IDs.

Open "Your Turn" and choose "Turn timer" or "Talk clicker". Both turn the phone sideways and fill the screen; the small back arrow leaves to the toy menu.

**Turn timer.** Tap "Start" and the time counts up from 0:00. When the next person speaks, tap the time and it starts again at 0:00. At two minutes a dragon replaces the time; tap it to start the next turn. At two and a half minutes the dragon starts to flash and grow, flashing faster as it grows, until at three minutes it fills the screen. The phone's screen stays on while the turn timer is open.

**Talk clicker.** Up to four people each take a corner and tap it each time they lead or direct the discussion. Each corner shows its own count. "Reset" puts all four back to 0, and so does leaving the talk clicker.

## Adding a toy to a host

**Standalone app.** The toy's entry is in `toys/turn-tracker/index.ts` and is listed in `src/toys.ts`. The turn timer and talk clicker open over the app's header band and turn the device sideways while open, putting it back upright when closed; the back arrow and the device's back key leave to the toy menu. The website and the curriculum app routes are not yet written.
