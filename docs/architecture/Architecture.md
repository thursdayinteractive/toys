# Thursday Interactive Toys: Architecture

---

# 1. Irreversible decisions

Reversing any of these decisions touches every toy and every host. Everything else in this document can be replaced in place.

1. A toy's logic is a platform-free core, separate from any interface.
2. A core receives every non-deterministic input, such as randomness or the time, from its host and never obtains one itself.
3. Every toy stays usable as an add-on to the curriculum app, as well as on its own.

---

# 2. Layer map

Each layer depends only on the layers below it.

| Layer | Contents | Depends on |
|---|---|---|
| Host | One per delivery target: the standalone app, the website, the curriculum app add-on. Screens, input, display, and the values and storage a core needs ([[§5]], [[§6]]) | Core |
| Core | One per toy: types, validation, the toy's logic | none |

The core contains no platform imports, no UI and no global state. It does not read clocks, the network, storage or a random source directly.

A host builds a toy's interface from that toy's core. A host holds none of the toy's logic, so every host gives the same result for the same input.

---

# 3. Add-on compatibility

A toy's core must be usable inside the curriculum app without change. The reference for compatibility is the curriculum app's architecture, in the `thursdayinteractive/curriculum-app` repository at `docs/architecture/Architecture.md`. Its layer map and platform split are what a core must fit. To that end:

1. The core is written in TypeScript, with no platform imports and no UI.
2. The core has no runtime dependencies. A dependency added later must also be one the curriculum app can take.
3. The core's public surface is plain data in and plain data out. It passes no callbacks into a host and holds no host objects.
4. Non-deterministic inputs enter as described in [[§5]].

The toys are designed first as standalone tools and are not led by the curriculum app's architecture. This section is the whole of the constraint that app places on them.

---

# 4. Toy layout

Each toy lives in its own folder, with its own core, its own interface for each host, and its own documentation. A toy's design is its own spec, which meets this one. Toys do not depend on one another.

---

# 5. Non-deterministic inputs

A host passes each non-deterministic input a core needs into it as a plain value. A random value is a number uniformly distributed from 0 (inclusive) to 1 (exclusive). Tests supply fixed values, so every core result can be reproduced exactly.

---

# 6. Storage

A toy that keeps anything between uses does so through one small storage interface that every host supplies ([[§2]]), and its core does not change.

---

# 7. Hosts

1. **Standalone.** One store-distributed app contains every toy. It is built with Expo and React Native. Each toy supplies its screens to the app from its own folder; the app holds no toy's logic.
2. **Website.** Each toy's website version is one plain JavaScript file: its core and a small web interface. It is placed on the site through the site's embed, which runs it inside a frame. It is not built from the standalone app.
3. **Curriculum app.** Each toy's core is added to the curriculum app as [[§3]] describes. How its interface is added there is not yet designed.
