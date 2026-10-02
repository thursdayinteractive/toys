---
id: DEC-261001-public-repository
status: accepted
---

# The toys repository is public

## Context

The curriculum app takes this repository as one npm git dependency ([[DEC-261001-toy-plug-in-contract#clause-5]]). While the repository was private, that needed a read-only access token that expires, kept in the build service's secrets. The owner decided, 2026-10-01, to make the repository public instead. A scan of the repository's history found no credentials, personal data or business-sensitive content, and the owner has no concern about the code being public. The icons were generated with Gemini (owner's statement). Once public, the code and history can be copied by anyone, and making the repository private again does not recall the copies.

## Clauses

- **clause-1.** **The repository is public.** Anyone can read its files, its history, its pull requests and its issues. Nothing committed or posted here, including commit messages, pull request text and comments, may contain a credential, personal data, or anything not meant for public readers. Code, documents and assets are written and reviewed on that basis.
  amends: [§1]
- **clause-2.** **Assets carry provenance.** Before an image, icon, font or other third-party or generated asset is added, where it came from and under what terms is recorded in a fact. The existing icons and app icon files are recorded as generated with Gemini, on the owner's statement; Gemini's terms of use were not checked.
- **clause-3.** **Statements that the repository is private are superseded.** `fact-toys-repository` is reworded. The reasons recorded in [[DEC-260928-website-hosting]] for not choosing GitHub Pages and jsDelivr rested on the repository being private; that record notes it, and its choice of Cloudflare Pages stands.
- **clause-4.** **History was rewritten once.** On 2026-10-02, before the repository became public, the author email on seven commits was changed to a team address by rewriting every branch; every commit hash changed, and the curriculum app's pin moved to match. Many commit messages still carry a link to the working session, and the old commits may stay reachable through GitHub's hidden pull request references until GitHub removes them on request. History is not rewritten again.

## Options considered

- **A read-only access token.** Lost: it expires, so it has to be replaced on a schedule, and a lapse fails the build with a message that never mentions credentials.
- **A read-only deploy key.** Lost: it does not expire, but it needs a build script that is unbuilt and untested on the build service, to protect code the owner does not need protected.
- **An access token with no expiry.** Lost: a long-lived secret kept for the same purpose, with no prompt to review it.
- **Keep history as it was.** Lost: by owner direction, the author email is changed before the repository is public.

## Precept conflicts resolved

None found.
