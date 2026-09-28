---
id: DEC-260928-website-hosting
status: proposed
---

# Where the toys' website scripts are hosted

## Context

Website embeds are cut off below 100 KB but can load a script hosted elsewhere ([[fact-website-embed-size]], [[fact-website-embed-capabilities]]), so a toy's embed loads its script file from a host. By owner direction, 2026-09-28: Cloudflare Pages, if it fits the hosting already planned for the RogueLore web page. That plan uses Cloudflare Pages on its free tier, which allows commercial use and has no bandwidth cap for static files, with a subdomain pointed at the project by a CNAME record in GoDaddy's DNS. The toys need only static script files, so the same service, account and subdomain method fit.

## Clauses

- **clause-1.** **Cloudflare Pages.** Each toy's website script is published by a Cloudflare Pages project for this repository, separate from the RogueLore project, on the same account.
- **clause-2.** **A small embed loads the script.** A toy's embed holds only its markup and one ordinary `<script src>` tag pointing at the hosted file. An ordinary script is used rather than a module script, because a module script loaded from another site needs extra permission headers from the host.

## Options considered

- **Pasting a toy's whole script into the embed.** Lost: embeds are cut off below 100 KB.
- **GitHub Pages.** Lost: publishing from a private repository needs a paid plan (not verified against GitHub's current terms).
- **jsDelivr.** Lost: it serves only public repositories and packages.

## Precept conflicts resolved

None found.
