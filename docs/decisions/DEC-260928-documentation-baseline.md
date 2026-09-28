---
id: DEC-260928-documentation-baseline
status: accepted
---

# Documentation baseline

## Context

This repository holds small tools and toys. Each toy runs on its own as an app, on the ThursdayInteractive.com website, or as an add-on to the curriculum app. Several working sessions may run at once, each on its own branch. This record sets how the project is documented so that every session finds the same facts in the same places, and nothing is decided without the owner.

## Clauses

### Principles

- **clause-1.** **One home per fact.** Each fact is written once and cited everywhere else.
- **clause-2.** **Three kinds of content.**
  - Foundational records set direction: `CLAUDE.md`, the specs, decision records, exceptions, governance procedures, and roadmap phase scopes and benchmark definitions. They change only by owner approval.
  - Working state records where things stand: item fields, roadmap status lines, facts, product pages and guides. It is edited in place.
  - History is git.
- **clause-3.** **Permanent names.** Records are named `<PREFIX>-<yymmdd>-<name>` with the prefixes `DEC` (decision), `EXC` (exception), `ITEM` (work item) and `PROC` (procedure). Anchors in other files use `bm-` (benchmark), `fact-`, `prod-` (product page entry) and `rule-`. Names and anchors are unique across the repository and never reused. Nothing is cited by file position or line number.
- **clause-4.** **Parallel sessions.** Sessions add files rather than editing shared lines where they can, and each lands its work through its own pull request.
- **clause-5.** **Generated, not kept.** Lists that can be built from the records (the brief, indexes) are built on demand and never committed.

### Layout

- **clause-6.** **Repository layout.**
  - Top level: `CLAUDE.md`, `README.md`, `docs/`, `toys/`, `tools/`, `scratch/` (never committed), and the standalone app's own files.
  - `tools/` holds the project's own scripts: `tools/docs/` for the documentation checker, and the test runner's import hook at `tools/` itself.
  - `docs/` holds what all toys share: `roadmap.md`, `architecture/Architecture.md`, `architecture/exceptions/`, `decisions/`, `items/`, `procedures/`, `facts/<area>.md`, `product/<subject>.md` and `guide/User_Guide.md`.
  - Work items live in the repository, not in an external tracker.
- **clause-7.** **Toy folders.** Each toy has its own folder, `toys/<toy>/`, holding its code and its own `docs/` with whichever of `roadmap.md`, `architecture/`, `decisions/`, `items/`, `product/` and `guide/` it needs. Repository-level documents cover only what toys share and do not name individual toys. A toy's records follow the same rules as the repository's.

### Specs

- **clause-8.** **What a spec is.** A spec states the intended design. The repository spec holds what every toy follows; each toy's spec holds that toy's design and meets the repository spec.
- **clause-9.** **Self-contained.** A spec cites only its own sections. The one exception is the repository spec's pointer to the curriculum app's architecture, in its add-on compatibility section, which is plain text rather than a citation.
- **clause-10.** **No status.** A spec carries no status, history or open questions. Open questions are items.
- **clause-11.** **Stable sections.** Section numbers are anchors. Sections are never renumbered or removed; a section no longer needed is emptied, with a plain sentence saying where its content went.
- **clause-12.** **Amendments.** Once accepted, a spec changes only through a decision clause carrying `amends: [§N, …]` (or `amends: [<toy>§N, …]`) that covers every changed section.

### Decisions and exceptions

- **clause-13.** **Decision records.** One topic per record. Front matter: `status: proposed | accepted`. A record is accepted when the pull request carrying it merges with the owner's approval, and is frozen from then on. Body: context, numbered clauses, options considered (each with why it lost), and precept conflicts resolved.
- **clause-14.** **Changing a decision.** An accepted record is never edited. A mistake is fixed in an appended `## Corrections` section; a change of mind is recorded in a new record and noted in an appended `## Supersessions` section of the old one. Citations point at live clauses only.
- **clause-15.** **Exceptions.** An exception records code that departs from a spec in one place, where the spec's rule still stands elsewhere. Front matter: `deviates_from`, `status: active | retired`, `review_when`, and `amendment_candidate: yes | no`. The terms are frozen; `## Scope changes` and `## Retirement` sections are appended.

### Roadmaps and items

- **clause-16.** **Roadmaps.** A roadmap holds `## Now`, each phase's scope, and benchmark lines, each with an anchor, a done-criterion and a status: `not started | in progress | done | dropped`. Finished phases collapse into a table whose anchors stay citable. Scope is product and development milestones only.
- **clause-17.** **Items.** Front matter:
  - `kind: task | decision`;
  - `status: open | blocked | closed`; `blocked` needs `blocked_on` and `phase`;
  - `queued: yes | no`, set only by the owner;
  - `benchmark`, when the item serves one.

  The body says what is needed and when it is done. A decision item holds the question; its draft answer is a proposed decision record.
- **clause-18.** **Plans.** Removed by owner direction, 2026-09-28. The reasoning for a piece of work goes in its item.
- **clause-19.** **Closing.** An item is closed only with the owner's explicit yes, and is never deleted.

### Facts, product pages and guides

- **clause-20.** **Facts.** Anchored entries, one file per area. A fact that can change carries `(verified: <date>)`, and `recheck_after` when it should be checked again.
- **clause-21.** **Product pages** describe current behavior and are updated with every behavior change.
- **clause-22.** **Guides.** One guide for the repository and one per toy, each with a section for the people using the toys and a section for adding a toy to a host. The section for people using the toys contains no internal names. Guides are updated with every user-visible change.

### Procedures

- **clause-23.** **Procedures.** Front matter: `governance: yes | no`. Governance procedures (session start, close-out, vetting) are foundational; runbooks are working state.

### Citations, code and commits

- **clause-24.** **Citation forms** are only those in the `CLAUDE.md` table. Adding a form is a foundational change.
- **clause-25.** **Code comments** cite no document paths or positions. They may cite spec sections and decision and exception records, never items or roadmap lines.
- **clause-26.** **Qualified claims.** A claim in code that rests on something unverified says so in plain words, and the open question is tracked as an item.
- **clause-27.** **`Refs:` lines.** Every non-merge commit names at least one record or benchmark on a line starting `Refs:`. A pull request's description carries the union of its commits' `Refs:` tokens.

### Caps

- **clause-28.** **Caps.** Removed by owner direction, 2026-09-28.

### Rules and conduct

- **clause-29.** **What `CLAUDE.md` holds.** Rules, each with an anchor, a tag, a short reason and the clause it implements; examples in marked blocks under their rules; and the citation table.
- **clause-30.** **Rule tags.** `[check]` rules are verified mechanically; `[review]` rules are listed in the close-out review; `[conduct]` rules govern how the session works with the owner.
- **clause-31.** **Stop and surface.** At the first sign of any of the following, the session stops and brings it to the owner before writing a change: an issue the approved work didn't anticipate; a change to a foundational record; going beyond or against what was approved; a conflict with a spec, decision or exception; a change of scope or order; a merge conflict in a foundational file. The session restates this when work is assigned.
- **clause-32.** **Reporting.** Anything surfaced stands on its own: what happened and where, the evidence, what it affects, whether the approved plan covers it, and what is proposed and why.
- **clause-33.** **Approval.** Approval is a yes to an explicit question that names the change. General agreement is not approval.
- **clause-34.** **Standing conduct.** `CLAUDE.md` also holds these as `[conduct]` rules: surface problems before solutions; the four precepts; check that a scenario is reachable before guarding against it; ask before a content or behavior decision ships, not after; verify a precedent the owner names; give the owner's own recommendation a full hearing; keep plan decisions intact through rewrites; treat the owner's account over the written record; act on corrections first; submit long-running jobs and stop; follow vetting for changes many parts depend on.

### Sessions

- **clause-35.** **Session start.** Read the start procedure; account for other branches and open pull requests; switch to the session's branch; read `CLAUDE.md`, the repository roadmap and spec (and the toy's, for toy work); present the brief; confirm the work.
- **clause-36.** **The brief** lists: the active phase, queued items, other open tasks, items and proposed decisions awaiting the owner, blocked items by phase, facts past their recheck date, and other branches in flight.
- **clause-37.** **Close-out.** Merge the main branch in; confirm items and decisions with the owner; write only the records the work touched; remove temporary records; run the checks; open the pull request with its review and `Refs:` line; record the owner's answers; merge only on approval of that exact head.
- **clause-38.** **The review** lists foundational changes (each with the owner's accept or reject), working-state changes, possible drift between code and documents, items being closed, and overlaps with other branches.
- **clause-39.** **Temporary material.** Vetting and comparison records are committed on the branch while work is in progress and removed before merge, once their lasting reasoning is in a decision record or item. `scratch/` is never committed or cited.

### Checks

- **clause-40.** **What is checked.** Citations resolve to live targets; names and anchors are unique; front matter is valid; frozen records are unchanged except in their appended sections; spec changes are covered by amendments; no conflict markers; nothing cites `scratch/`; user sections carry no internal names; commits carry `Refs:` lines; every `CLAUDE.md` rule has a tag.
- **clause-41.** **How it is checked.** By the documentation checker, `npm run docs -- check`, which also prints the brief (`npm run docs -- brief`). A check the checker cannot run is carried out by hand at close-out, and the session says which.

## Options considered

None. The structure follows owner direction, 2026-09-28.

## Precept conflicts resolved

None.

## Supersessions

- The phrase "follow vetting for changes many parts depend on" in clause-34 is superseded by [[DEC-260928-vetting-on-request]]: vetting is run only when the owner asks. The rest of clause-34 stands.
