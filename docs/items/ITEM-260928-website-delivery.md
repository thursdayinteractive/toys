---
id: ITEM-260928-website-delivery
kind: decision
status: open
queued: no
benchmark: bm-website-delivery
---
# How the toys are delivered on ThursdayInteractive.com

Each toy's website version is a single JavaScript file ([[DEC-260928-standalone-app#clause-3]]), placed through the site's embed. The test embed ([[PROC-260928-website-embed-test]]) found that embeds run in a frame ([[fact-website-embed-frame]]), can load a script hosted on another site ([[fact-website-embed-capabilities]]), and are cut off somewhere below 100 KB ([[fact-website-embed-size]]).

Not yet decided: where a toy's script file is hosted, for the embed to load it. Not yet known: whether the frame grows when a toy's content grows after it loads, or clips it.

## Done when
The hosting location is decided in a decision record, and a toy's embed loads its hosted script on the site.
