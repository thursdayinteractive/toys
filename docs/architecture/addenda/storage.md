# Addendum: storage

Set by the first toy that needed to keep something between uses, 2026-09-28 ([[§6]], [[§8]]). Every later toy follows it.

1. **The interface.** A host supplies one storage interface to each toy's screen, with two operations: read the text saved under a name, and write text under a name. Both finish later rather than at once. Reading a name never written gives nothing.
2. **Names.** A toy keeps what it saves under names that start with its own folder name and a dot, so toys never share a name.
3. **Text only.** A toy turns what it keeps into text before writing it and back after reading it. That turning is logic, so it lives in the toy's core; the core never touches storage itself.
4. **The standalone app.** The app supplies the interface through the device's SQLite key-value store (`expo-sqlite`), the same package the curriculum app uses.
5. **Other hosts.** The website and the curriculum app each supply the same two operations from their own storage when their routes are built.
