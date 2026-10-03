# Addendum: host-supplied button

Set by the first toy screens that needed a button drawn in the host's own look, 2026-09-30 ([[§7]], [[§8]]). Every later toy follows it.

1. **The component.** A host supplies one button component to each toy's screen. It takes the label to show, what to do when it is tapped, and an optional tier. It has no disabled state.
2. **No disabled buttons.** A screen that must not act at some moment, such as while a result is spinning or while a title is blank, checks that in the handler. The button stays as it is.
3. **The host's look.** The host draws the button in its own style. A toy sets no color, size or shape for it; it chooses only the tier. The tiers are Primary, which is the default and the main action, Secondary for a lower-emphasis action, Destructive for an action that discards, Link, plain clickable text for a small action such as adding a row, and Destructive link, the same plain text in the destructive color for a small action that discards, such as clearing a list.
4. **The same component each time.** A host passes the same component on every render, so a screen's buttons keep their state.
5. **Passing it on.** A screen passes the component to any part of itself that needs a button. It does not import a host's button.
6. **The standalone app.** The app supplies its own button in all five tiers: Primary, Secondary and Destructive are solid with a white bold label, Link is bold text in the structural color, and Destructive link is bold text in the destructive color.
7. **Other hosts.** The website and the curriculum app each supply a button with the same three things from their own components when their routes are built.
