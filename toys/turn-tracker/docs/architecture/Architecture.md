# Turn Tracker: Architecture

This toy meets the repository's architecture: its core is platform-free, takes the time from its host, and stays usable as a curriculum app add-on. The turn timer and the talk clicker are separate cores in this toy. This spec is the one home for the toy's behavior.

---

# 1. The toy

The toy is listed as "Your Turn", with the description "Help your teams share communication with a talk clicker to show who dominates the conversation or a turn timer to ensure no one does." It has two features, the turn timer ([[turn-tracker§2]]) and the talk clicker ([[turn-tracker§3]]). One device serves the whole group. Nothing is entered about the people taking part, and nothing is kept between uses.

---

# 2. Turn timer

A turn is timed from the moment it starts. The host passes in the time the turn started and the time now, both as plain numbers of milliseconds, and the core returns what to show.

1. The time shows counting up from 0:00, in minutes and seconds.
2. At 2:00 the time is replaced by the dragon. The two minutes are fixed.
3. At 2:30 the dragon starts to flash and to grow. It starts about 1.5 cm across and grows steadily until, at 3:00, it fills the screen. It flashes once a second at 2:30, faster as it grows, up to five times a second at 3:00. It then stays that size, flashing five times a second, until tapped.
4. Tapping the time or the dragon ends the turn and starts the next one at 0:00.

---

# 3. Talk clicker

There are four counters, one per person. Each starts at 0 and adds one per tap. A counter never tapped stays at 0. Reset sets all four to 0. The counts are not kept: leaving the talk clicker resets them.

---

# 4. Screens

1. The first screen shows two buttons, "Turn timer" and "Talk clicker", each opening its feature. It is upright, under the app's header band.
2. The turn timer and the talk clicker are shown sideways, filling the screen with no header band. Each has a small back arrow that returns to the first screen. On the website they are not turned sideways: they fill the space the page gives them, which on a tablet is big enough to use.
3. The turn timer shows nothing but one large element in the middle and the back arrow at the bottom left. The element reads "Start" in the same style as the time, then shows the time, then the dragon. Tapping "Start" starts the first turn at 0:00. The device's screen stays awake while the turn timer is open.
4. The talk clicker has one large tapping area in each of the four corners, each showing its count. A "Reset" button and the back arrow sit small in the middle, away from the tapping areas.
5. The screens are built from the toy's cores and hold none of the toy's logic, so they can also serve as the toy's interface inside the curriculum app.
