---
id: DEC-260928-standalone-app
status: proposed
---

# The standalone app and the website version

## Context

The standalone app is the first host for every toy ([[DEC-260928-roadmap-phasing#clause-1]]). The owner narrowed it to a store-distributed app or a web app, leaning toward store-distributed, and asked for recommendations. The recommendations were accepted, 2026-09-28. Apple's App Store review guidelines turn away apps with too little functionality (guideline 4.2) and treat many near-identical apps as spam (guideline 4.3); those guideline numbers are from general knowledge and not yet checked against Apple's current text.

## Clauses

- **clause-1.** **One app for all toys.** The standalone app is a single store-distributed app containing every toy ([[§7 item 1]]). A single-toy app risks rejection as too little functionality, and one app per toy risks rejection as spam.
- **clause-2.** **Expo and React Native.** The app uses the same stack as the curriculum app, so its toy screens can later serve as the add-on's interface.
- **clause-3.** **The website version is separate.** Each toy's website version is a single plain JavaScript file of its core and a small web interface, not a web export of the standalone app, which would be far heavier than an embed needs ([[§7 item 2]]).
- **clause-4.** **Where the app lives.** The app's own files are at the top of the repository, as the curriculum app's are. Each toy keeps its own folder under `toys/`, from which it supplies its screens (owner direction, 2026-09-28).

## Options considered

- **A web app.** Lost: no store presence and no head start on the add-on's interface, though it would have been free to publish and updated instantly.
- **One store app per toy.** Lost: review risk under guidelines 4.2 and 4.3.
- **Building the website version from the standalone app.** Lost: bundle weight in an embed.

## Precept conflicts resolved

None found.
