# Thursday Interactive Toys: Architecture

---

# 1. Irreversible decisions

Reversing any of these decisions touches every toy and every host. Everything else in this document can be replaced in place.

1. A toy's logic is a platform-free core, separate from any interface.
2. A core receives randomness as an input and never obtains it itself.
3. Every toy stays usable as an add-on to the curriculum app, as well as on its own.

---

# 2. Layer map

Each layer depends only on the layers below it.

| Layer | Contents | Depends on |
|---|---|---|
| Host | One per delivery target: the standalone app, the website, the curriculum app add-on. Screens, input, display | Core, Adapters |
| Adapters | Randomness source, and storage when it is added | none |
| Core | One module per toy: types, validation, selection | none |

The core contains no platform imports, no UI and no global state. It does not read clocks, the network, storage or a random source directly.

A host builds a toy's interface from that toy's core. A host holds no selection logic of its own, so every host gives the same result for the same input and the same random values.

---

# 3. Add-on compatibility

A toy's core must be usable inside the curriculum app without change. To that end:

1. The core is written in TypeScript and meets the curriculum app's rule for its engine layers: no platform imports and no UI.
2. The core has no runtime dependencies. A dependency added later must also be one the curriculum app can take.
3. The core's public surface is plain data in and plain data out. It passes no callbacks into a host and holds no host objects.
4. Randomness enters through the interface in [[§6]], the same way the curriculum app injects other non-deterministic inputs.

The toys are designed first as standalone tools and are not led by the curriculum app's architecture. This section is the whole of the constraint that app places on them.

---

# 4. Randomizer

## 4.1 Items

A randomizer list is an ordered list of items. Each item has:

```
label        text the person entered
multiplier   decimal number; how much more or less likely than other items
```

A list starts empty.

## 4.2 Weighting

An item's chance of being picked is its multiplier divided by the sum of the multipliers of every item in the active set ([[§4.3]]). The chances therefore always total 100%, whatever multipliers are entered. Chances are displayed as percentages derived this way. The percentage is never itself entered or stored.

When all multipliers are equal, every item is equally likely.

## 4.3 Active set

The active set is the set of items that can currently be picked. With no temporary removal, it is the whole list.

Temporary removal takes an item out of the active set without deleting it from the list. Restoring it puts it back. Because chances are computed from the active set ([[§4.2]]), removing or restoring an item needs no change to any multiplier.

## 4.4 Pick

A pick returns one item from the active set, chosen with the chances in [[§4.2]], using one value from the randomness source ([[§6]]).

---

# 5. Dice roller

A die has a number of sides, entered as a number. A roll returns a whole number from 1 to that number, each equally likely, using one value from the randomness source ([[§6]]).

---

# 6. Randomness source

A randomness source supplies numbers uniformly distributed from 0 (inclusive) to 1 (exclusive). Each host supplies one. Tests supply a fixed sequence, so every core result can be reproduced exactly.

---

# 7. Storage

Lists start empty and are not kept between uses. When storage is added, it is an adapter ([[§2]]) behind one interface, and the core does not change.
