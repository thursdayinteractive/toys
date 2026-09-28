---
id: ITEM-260928-website-delivery
kind: decision
status: open
queued: no
benchmark: bm-website-delivery
---
# How the toys are delivered on ThursdayInteractive.com

Each toy's website version is a single JavaScript file ([[DEC-260928-standalone-app#clause-3]]), placed through the site's embed ([[fact-website-hosting]]), which runs inside a frame ([[fact-website-embed-frame]]). Not yet known: whether an embed can load a script file hosted elsewhere, and any limit on its size. Not yet decided: whether the file is pasted into the embed or hosted elsewhere and loaded by it.

## Done when
The test embed ([[PROC-260928-website-embed-test]]) has answered the unknowns, the answers are recorded as facts, and the delivery route is decided in a decision record.
