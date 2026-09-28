---
id: ITEM-260928-website-delivery
kind: decision
status: open
queued: no
benchmark: bm-website-delivery
---
# How the toys are delivered on ThursdayInteractive.com

Each toy's website version is a single JavaScript file ([[DEC-260928-standalone-app#clause-3]]), placed through the site's embed. The test embed ([[PROC-260928-website-embed-test]]) found that embeds run in a frame ([[fact-website-embed-frame]]), can load a script hosted on another site ([[fact-website-embed-capabilities]]), and are cut off somewhere below 100 KB ([[fact-website-embed-size]]).

The frame grows to the height its code sets, or takes a fixed height the owner sets ([[fact-website-embed-frame]]). The scripts are hosted on Cloudflare Pages, loaded by a small embed; the draft answer is [[DEC-260928-website-hosting]]. They are served at `toys.thursdayinteractive.com` ([[DEC-260928-website-hosting#clause-3]]); setting that up is [[ITEM-260928-website-hosting-setup]].

## Done when
The owner has accepted the decision record, and a toy's embed loads its hosted script from `toys.thursdayinteractive.com` on the site.
