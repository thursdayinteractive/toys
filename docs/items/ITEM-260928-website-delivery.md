---
id: ITEM-260928-website-delivery
kind: decision
status: open
queued: no
benchmark: bm-website-delivery
---
# How the toys are delivered on ThursdayInteractive.com

Each toy's website version is a single JavaScript file ([[DEC-260928-standalone-app#clause-3]]), placed through the site's embed. The test embed ([[PROC-260928-website-embed-test]]) found that embeds run in a frame ([[fact-website-embed-frame]]), can load a script hosted on another site ([[fact-website-embed-capabilities]]), and are cut off somewhere below 100 KB ([[fact-website-embed-size]]).

The frame grows to the height its code sets, or takes a fixed height the owner sets ([[fact-website-embed-frame]]). The scripts are hosted on Cloudflare Pages, loaded by a small embed; the draft answer is [[DEC-260928-website-hosting]]. Not yet decided: the address the scripts are served from (a subdomain of ThursdayInteractive.com, or Cloudflare's own address for the project).

## Done when
The owner has accepted the decision record and chosen the address, the Cloudflare Pages project serves this repository's scripts there, and a toy's embed loads its hosted script on the site.
