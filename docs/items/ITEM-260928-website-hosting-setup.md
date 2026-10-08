---
id: ITEM-260928-website-hosting-setup
kind: task
status: closed
queued: no
benchmark: bm-website-delivery
---
# Set up the Cloudflare Pages project and the toys.thursdayinteractive.com subdomain

The toys' website scripts are hosted on Cloudflare Pages at `toys.thursdayinteractive.com` ([[DEC-260928-website-hosting]]). Creating the Pages project on the existing Cloudflare account, connecting it to this repository, and adding the CNAME record in GoDaddy's DNS are the owner's account tasks. What the project builds and publishes is decided with the first toy's website version.

## Done when
The Cloudflare Pages project exists, is connected to this repository, and `toys.thursdayinteractive.com` resolves to it.

## Set up, 2026-10-08
By the owner. The Pages project `toys-a54` exists and is connected to `thursdayinteractive/toys`, with the build settings left at their defaults (framework none, no build command, output directory `/`). It therefore publishes the whole repository, and the bare address returns a 404 because the repository has no `index.html` at its root. `toys.thursdayinteractive.com` is active, through a CNAME record `toys` pointing to `toys-a54.pages.dev` in GoDaddy's DNS. What the project builds is still to be decided with the first toy's website version. If the domain's DNS later moves to Cloudflare, this record must be copied into the new zone.

## Resolution
Closed 2026-10-08, by owner direction.
