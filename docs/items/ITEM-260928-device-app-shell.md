---
id: ITEM-260928-device-app-shell
kind: task
status: open
queued: no
benchmark: bm-standalone-delivery
---
# Device check: the app shell

The standalone app shell ([[ITEM-260928-standalone-app-shell]]) was verified only by typecheck and tests, an Android bundle export, and a local web build. Nothing below has been seen on a device. It needs the first cloud build, which needs the Expo project created with the owner's login.

## Done when
On an Android device and an iPhone, from a preview build:
- the app installs and opens, with the RogueLore app icon and "RL Toys" under it; on Android, the adaptive and themed (monochrome) icons look right;
- the menu shows "RogueLore Toys" in the header with the RL Stamp logo, then each toy's title, description and "Let's roll!" button, separated by a divider;
- "Let's roll!" opens the toy, with ☰ and the toy's title in the header, and ☰ returns to the menu;
- the header sits below the status bar and the notch, not under them;
- the background is the off-white screen color, and the button dims while pressed.
