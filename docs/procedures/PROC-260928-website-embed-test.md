---
id: PROC-260928-website-embed-test
governance: no
---

# Website embed test

Finds out what a ThursdayInteractive.com embed allows, for [[ITEM-260928-website-delivery]]. The owner runs it on the site; nothing outside the embed's own box changes.

1. **Capabilities.** Paste all of `tools/website-embed-test/embed-test.html` into an embed section, preview it, and note each numbered line it shows:
   - the CSS line is dark red if embedded CSS applies;
   - 1: inline JavaScript runs;
   - 2: whether it runs inside a frame;
   - 3: the frame's size;
   - 4: whether browser storage works;
   - 5: whether secure random numbers are available;
   - 6: whether a script hosted elsewhere loads (it may take a moment to appear);
   - 7: whether module scripts run.
2. **Size.** Run `node tools/website-embed-test/make-size-files.mjs 100 500`, which writes `embed-size-100kb.html` and `embed-size-500kb.html` to the current folder. Paste each into an embed section. If the box says the whole block arrived and ran, that size works; if it says the script did not run, or the site refuses the paste, it doesn't.
3. **Record** the results as facts in `docs/facts/website.md`, then remove the test embeds from the site.
