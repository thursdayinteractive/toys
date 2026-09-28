# User Guide

This guide covers what all toys share. Each toy has its own guide in its folder. It describes and doesn't govern.

## Using the toys

For the people who use the toys. This section contains no internal IDs.

The RL Toys app opens on a menu of its toys. Each toy shows its name, a short description and a "Let's roll!" button that opens it. Inside a toy, the ☰ button at the top left goes back to the menu. The app is not yet published.

## Adding a toy to a host

For whoever puts a toy into the standalone app, the website or the curriculum app.

**Standalone app.** A toy exports its entry from `toys/<toy>/index.ts`: an id, a title, a description and its screen ([[§7 item 1]]). Adding the entry to the list in `src/toys.ts` puts the toy on the menu. The website and the curriculum app routes are not yet written.
