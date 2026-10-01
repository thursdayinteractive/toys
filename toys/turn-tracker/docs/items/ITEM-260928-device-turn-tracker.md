---
id: ITEM-260928-device-turn-tracker
kind: task
status: open
queued: no
benchmark: bm-turn-tracker-standalone
---
# Device check: the turn tracker

The turn tracker's screens ([[turn-tracker§4]]) were verified only by typecheck and tests of the cores, and Android and iOS bundle exports. Nothing below has been seen on a device. Turning the screen sideways uses a native package added with these screens, so it needs a new preview build.

## Done when
On an Android device and an iPhone, from a preview build:
- the menu and the randomizer stay upright when the device is turned;
- "Turn timer" and "Talk clicker" each turn the screen sideways, cover the header band, and Back (and Android's back button) returns upright to the toy menu;
- the turn timer shows only "Start", then the time, then the dragon, with Back at the bottom left; tapping the time or the dragon restarts at 0:00;
- the dragon starts at about 1.5 cm across, which rests on an assumed screen density; it flashes once a second from 2:30, speeding to five a second, and fills the screen at 3:00;
- the screen does not dim or lock during a turn;
- the talk clicker's four corners count separately, "Reset" and Back sit clear of them in the middle, and leaving and reopening shows all zeros.

Also on an iPad, which may need an extra app setting before it honors the upright lock; that is unverified against Expo's and Apple's current documentation.
