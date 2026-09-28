---
id: DEC-260928-documentation-baseline
status: proposed
---

# Documentation baseline

## Context

This repository holds small add-on tools and toys. Each one can run on its own as an app, on the ThursdayInteractive.com website, or as an add-on to the curriculum app. By owner direction, 2026-09-28, it uses the same documentation structure as the curriculum app, starting clean. This record sets that structure, and gives each toy its own folder.

## Clauses

### Principles

- **clause-1.** **One fact, one home.** Everything else cites it. Paired links are generated, never hand-kept. The only sanctioned duplicates are outbound handoff snapshots and the capability register.
- **clause-2.** **Three layers.**
  - Current state is edited in place.
  - Foundational records change only in append-only form, or by amendment.
  - History is git.
- **clause-3.** **Permanent identifiers, never positions.**
  - Record IDs are `<PREFIX>-<yymmdd>-<name>`, with spelled-out prefixes `DEC`, `EXC`, `ITEM`, `PROC`, `HO` and `SPEC`.
  - Anchors in files without an ID use `bm-`, `fact-`, `prod-` and `rule-`. Each prefix is unique across the repository.
- **clause-4.** **Parallel sessions add files and don't edit shared spots.**
- **clause-5.** **Lists are generated, not maintained.** Nothing generated is committed. There is no committed index, brief or topic list.
- **clause-6.** **Classification.**
  - Foundational records:
    - `CLAUDE.md`;
    - the spec;
    - decision records;
    - exceptions;
    - governance procedures;
    - Roadmap benchmark definitions and phase scope;
    - `tools/docs/`.
  - Working state:
    - item fields;
    - Roadmap status lines;
    - facts;
    - product pages;
    - the User Guide;
    - the capability register;
    - runbooks;
    - commit tags.

  The classification decides what is surfaced and how the review report groups it, not what an agent is permitted to do. `.claude/` is outside the documentation system.
- **clause-7.** **Stop and surface before acting** (`[conduct]`). At the first instance of any of the following, the agent stops and brings it to the owner before writing any change:
  - an unanticipated issue during approved work;
  - a change to a foundational record;
  - going beyond or against what was approved;
  - a conflict with the spec, a decision or an exception;
  - a change to scope or order;
  - resolving a merge conflict in a foundational file.

  The worked example is the cascade: an unanticipated issue solved with unvetted code, which creates a bug, then another fix, and so on.
- **clause-8.** **The rule is restated when implementation starts.** The session restates clause-7 to the owner in its acknowledgement, once a plan is approved or work is assigned.
- **clause-9.** **Reporting standard** (`[conduct]`). Anything surfaced, during vetting or building, is self-contained. It states:
  - what happened and where (file, line or step);
  - the evidence;
  - what it affects;
  - whether the approved plan covers it;
  - what is proposed and why.
- **clause-10.** **Approval has a strict meaning** (`[conduct]`). Approval exists only as an affirmative answer to an explicit question that names the specific change. General positive responses are never approval.
- **clause-11.** **Rule categories.** Every rule is one of:
  - `[check]`, enforced by the checker;
  - `[review]`, shown in the review report;
  - `[conduct]`, which acts in conversation and lives only in the always-read `CLAUDE.md`, with worked examples.
- **clause-12.** **Start-file caps.** Every start-of-session file except the spec has its own cap.
- **clause-13.** **Self-contained audience material.** Material for people using the toys, and content-agent material, are self-contained.
- **clause-14.** **Boundaries.**
  - The spec is the intended design.
  - Product pages describe current behavior.
  - The capability register is an inventory of what exists.
  - The Roadmap is the plan.
- **clause-15.** **Where reasoning goes.**
  - Reasoning about the process, including a skip route's rationale, goes in the plan, alongside the temporary vetting records.
  - Reasoning for any decision that persists goes into its decision record.

### Layout and `CLAUDE.md`

- **clause-16.** **Layout.**
  - Top level: `CLAUDE.md`, `data/`, `external/<source>/`, `scratch/` (git-ignored), `tools/docs/` and `toys/`.
  - `docs/` holds:
    - `roadmap.md`;
    - `architecture/Architecture.md` and `architecture/exceptions/`;
    - `decisions/`, `items/`, `facts/<area>.md`, `product/<subject>.md` and `product/capabilities.md`;
    - `guide/User_Guide.md` and `procedures/`;
    - `exchange/out/` and `exchange/in/`.
  - `toys/<toy>/` holds one toy each (clause-65).
  - Work items live in the repository, not in GitHub Issues.
  - Screenshots are not committed.
- **clause-17.** **What `CLAUDE.md` holds.**
  - Rules: each has an anchor, a tag, a one-to-two-sentence reason, and a citation of the clause it implements.
  - Worked examples, each in a marked block under its rule.
  - The citation-tag table.
- **clause-18.** **`CLAUDE.md` caps.** Rules are capped at 2,200 words and examples at 1,500, counted separately.
- **clause-19.** **Examples.**
  - Incidents are placed by cause, so agent-caused incidents are conduct examples.
  - The disclosure-after-shipping example keeps its exact current text.
  - Consolidating examples at the cap is the owner's call.
- **clause-20.** **Vetting in `CLAUDE.md`.** `CLAUDE.md` keeps the vetting conduct rules, each with its worked example:
  - facts, not direction;
  - running the process is not solving the problem;
  - narration lags the work;
  - check for existing mechanisms before assuming new infrastructure;
  - don't open by declaring the full process.

  It also states that any change touching a core schema or type shape, or a mechanism multiple layers depend on, requires reading and following the vetting procedure in full before any design work starts.

### Roadmap

- **clause-21.** **What `roadmap.md` holds.**
  - `## Now`;
  - each phase's scope;
  - benchmark lines, each with an anchor, a done-criterion and a status: `not started | in progress | done | dropped`.

  Blocked state and verification are generated from items. A benchmark with no testable items shows verification as "n/a".
- **clause-22.** **Roadmap scope and cap.**
  - Finished phases collapse into a compact table, and their anchors stay citable.
  - Scope: product and development milestones only.
  - Cap: 2,000 words.
- **clause-23.** **Roadmap changes.** Status lines are working state, changed in the PR that changes the status. Benchmark definitions and phase scope are foundational.

### Architecture spec

- **clause-24.** **Self-contained.** The spec cites nothing outside itself; its citations are its own § anchors only. Other records cite the spec, never the reverse.
- **clause-25.** **No status content.** The spec carries no status registers, no version history, and no open-items or verification lists.
- **clause-26.** **Anchors.** § numbers are the anchors. The spec is never renumbered, and its sections are never removed, only emptied into stubs that state in plain words where their content went, never by citation (clause-24). It is read in full at every session start, with no cap.
- **clause-27.** **Amendments.** An amendment is a decision clause carrying `amends: [§N, …]`, and every spec change must match one.
  - Amendments are ideally never needed.

### Exceptions

- **clause-28.** **What an exception is.** A local or temporary code departure from the spec, where the spec's rule still stands elsewhere. It is not unbuilt scope and not a change to the rule.
- **clause-29.** **Exception records.**
  - Front matter:
    - `deviates_from`;
    - `status: active | retired`;
    - `review_when` (one free-text line);
    - `amendment_candidate: yes | no`.

    The last two are editable, and editing them triggers clause-7.
  - Body: the original terms, frozen, plus append-only **Scope changes** and **Retirement** sections. A retirement cites what happened.

### Decisions

- **clause-30.** **Batch records.** Each decision record covers one topic. Its clauses are anchored and are always cited with their record (`#clause-N`).
- **clause-31.** **Record states.**
  - `status: proposed | accepted`. A record is accepted when its PR merges with the owner's approval, and frozen from then on.
  - A pending decision has one home: the item holds the question, and the proposed record holds the draft answer.
- **clause-32.** **Body.**
  - context;
  - the clauses;
  - options considered, one line each with why it lost;
  - a citation of the commit that held the comparison and review files;
  - precept conflicts resolved.
- **clause-33.** **Corrections and supersessions.**
  - Both are append-only sections. A correction means the record was wrong; a supersession means a change of mind.
  - Supersession markers are appended along the whole chain, so a lookup stays one hop.
  - New citations target live clauses only.
### Work items

- **clause-34.** **Type and state.**
  - `kind: task | decision | plan`.
  - `status: open | blocked | parked | closed | dropped`.
  - `blocked` requires `blocked_on` and `phase`.
  - `parked` means only real work on an unmerged branch or open PR, and requires `branch` or `pr`. An item set aside with no work is never parked.
  - There is no priority field.
- **clause-35.** **Queue.** `queued: yes | no` is set only on the owner's direction. Action Items are the queued items. About 3 to 5 is a guideline, not a limit.
- **clause-36.** **Verification.** `verified: none | web | device | n/a`.
  - It defaults to `n/a` for decisions and plans, and is set when a task is created.
  - Closed tasks marked `n/a` are listed in the review report.
- **clause-37.** **Resolution and body.**
  - `resolution` is generated from `Refs:` tags.
  - The body holds what is needed and the definition of done, capped at 400 words.
- **clause-38.** **Plans.** A plan is an item with `kind: plan`. It is exempt from the item cap, carries its process reasoning, and is reduced to a stub when closed.
- **clause-39.** **Closing.** Closing an item needs the owner's explicit yes, recorded in the review report.

### Facts, product, guide

- **clause-40.** **Facts.**
  - Facts are anchored entries in one file per area.
  - Facts that change carry `verified` and `recheck_after`.
  - Account and business setup state lives here once done.
- **clause-41.** **Product pages** describe current behavior, and are updated with any behavior change (`[review]`).
- **clause-42.** **Capability register.** It is written as current fact: unused, switched off, removed (with its recovery commit), or rejected (citing the decision clause). Changing a "by direction" or "rejected" entry triggers clause-7.
- **clause-43.** **User Guide.** One document per guide, with separate sections for the people using the toys and for adding a toy to a host.
  - It describes and doesn't govern.
  - The section for people using the toys contains no internal IDs.
  - It is updated with any user-visible change (`[review]`).

### Procedures

- **clause-44.** **Governance marker.** Procedures carry `governance: yes | no`.
  - Governance procedures are foundational.
  - Runbooks are working state.
  - Creating a procedure, or changing its marker, triggers clause-7.
- **clause-45.** **Session-start procedure.** It is read every session and is capped at 1,000 words.
- **clause-46.** **Vetting procedure.** It holds the thirteen named steps:
  - **Discovery:**
    1. consumer and reuse search;
    2. early precept and architecture check.
  - **Checkpoint:**
    3. report;
    4. conflict response;
    5. route recommendation, arguing both the reuse case and the new-mechanism case;
    6. explicit go-ahead;
    7. record the route, and choose the hard cases.
  - **Candidates:**
    8. candidates, from an identical fact packet;
    9. neutral comparison, blended recommendation, owner's choice;
    10. hand traces;
    11. adversarial and precept review, worked through with the owner, with no automatic send-back and a running fix list;
    12. mechanical proof, when it applies;
    13. written plan with build stages, and approval.
- **clause-47.** **Vetting mechanics.**
  - Step outputs are committed and pushed as produced.
  - Plan mode is entered to write the plan the owner approves: step 6 on a skip or reuse route, step 13 on the full route.
  - After each build stage, the agent reports what changed, which checks ran and what they returned, and any departure from the plan. A departure stops the work.

### Exchange and temporary material

- **clause-48.** **Content-agent exchange.**
  - Outbound snapshots are self-contained and stamped with their source commit.
  - Inbound specs are stored verbatim, and their claims are verified against the code.
  - Both are frozen once created.
- **clause-49.** **Temporary material.**
  - `scratch/` is never committed or cited.
  - Comparison, review and vetting records are committed on the branch and removed before merge, once the persisting reasoning is in its decision record.
  - `external/` is never an authority.

### Citations and commit tags

- **clause-50.** **Citation forms** come only from the `CLAUDE.md` table:
  - records: `[[DEC-…]]` and `[[DEC-…#clause-N]]`, and the same form for `EXC`, `ITEM`, `PROC`, `HO` and `SPEC`;
  - anchors: `[[bm-…]]`, `[[fact-…]]`, `[[prod-…]]`, `[[rule-…]]`;
  - the spec: `[[§8.9]]`, `[[§1 item 3]]`.

  Adding a form is foundational.
- **clause-51.** **Code comments** (`[review]`).
  - No paths or positions, except spec § numbers.
  - Code may cite the spec for design reasons.
  - Code does not cite work items, Roadmap rows or spec status lists.
- **clause-52.** **Qualifiers in code.** A claim in code that rests on an unverified or inferred basis keeps that qualifier in plain words. The open question itself is tracked as an item.
- **clause-53.** **`Refs:` tags.**
  - Every non-merge branch commit names at least one benchmark or record.
  - The PR description gets the union of the branch's tags.
  - A helper expands a benchmark search to its items.
### Generated views

- **clause-54.** **The brief's action part.** Shown at session start and on request, capped at 1,000 words. It contains:
  - the active phase;
  - Action Items;
  - the backlog of open, unqueued tasks and plans;
  - items and proposed decisions awaiting the owner;
  - blocked items, by phase;
  - parked items;
  - the device-pass count;
  - facts past their recheck point;
  - work in flight.

  When it exceeds its cap, the agent returns the list to the owner, who is the arbiter of triage.
- **clause-55.** **Work in flight.** For each session branch it shows:
  - the branch's short name;
  - "started", or its items and changed areas;
  - overlaps with other branches;
  - "possibly abandoned" when the last commit is over 7 days old. Parked items' branches and branches with an open PR are excluded.

  It is not a lock.
- **clause-56.** **Reference views,** on request and uncapped:
  - exceptions by spec section, and amendment candidates;
  - benchmark verification;
  - decision records' current clauses.
- **clause-57.** **The device test list** is its own view. It is shown when a build is prepared or queued, and on request. It is a checklist grouped by area, drawn from closed items not yet device-verified.
- **clause-58.** **The review report** is generated at close-out from the full diff. It lists:
  - foundational changes, each with the owner's accept or reject; rejected changes are reverted before merge;
  - working-state changes;
  - possible documentation drift;
  - code citations of documents;
  - items being closed;
  - closed tasks marked `n/a`;
  - concurrent-work overlaps.

  The owner reads full diffs in conversation. The PR description gives a summary plus the commit for each change.

### Session start and close-out

- **clause-59.** **Session start.**
  1. Read the start procedure.
  2. Git hygiene and branch triage.
  3. Push the assigned branch with no commit, and title the session "<work> · <branch short name>".
  4. Read `CLAUDE.md`, `roadmap.md` and `Architecture.md`.
  5. Present the brief.
  6. Confirm the work.
  7. Read the item and what it cites on demand.
- **clause-60.** **Close-out.**
  1. Merge `origin/main`.
  2. Confirm items and decisions with the owner.
  3. Write only the records the work touched.
  4. Remove the temporary records.
  5. Run the checker.
  6. Put the review report and the `Refs:` line in the PR description, and present it.
  7. Record the owner's answers.
- **clause-61.** **Merge.** Approval covers the head commit and the PR description as shown.
  - Merge with a merge commit, never a squash, passing the description as the message.
  - If main moved, re-sync, regenerate the report and ask again.
  - Any later change requires asking again.

### Checker

- **clause-62.** **When the checker runs.** At close-out, and whenever a session runs it. It requires a full clone. There are no hooks. Until the checker exists in this repository, the session carries out the clause-63 checks by hand at close-out and reports which it carried out.
- **clause-63.** **Checks.**
  - Citations resolve and target live clauses.
  - IDs and anchors are unique.
  - Front matter and statuses are valid.
  - Frozen bodies are unchanged, apart from their append-only sections.
  - Spec changes match an `amends:` list.
  - Supersession markers are present.
  - Nothing cites `scratch/`, and there are no conflict markers.
  - Caps are respected.
  - The sections for people using the toys and handoffs contain no internal IDs.
  - Commits carry `Refs:` tags.
  - Closed plans are stubbed.
  - Every rule carries a tag.
  - Spec citations are internal only.

  Reported, not failed:
  - overlaps;
  - possibly abandoned branches;
  - history words in current-state files;
  - secret patterns in facts.
### Conduct rules and toys

- **clause-64.** **Standing conduct rules.** Beyond the rules above, `CLAUDE.md` holds these as `[conduct]` rules, citing this clause, each with its worked examples:
  - surface before solving;
  - the four precepts and the simplest-sufficient-mechanism lens;
  - the reachability check;
  - disclosing a decision is not approval;
  - verifying a named precedent;
  - weighing the owner's own recommendation;
  - plan and decision integrity;
  - long-running operations.
- **clause-65.** **Toy folders.** Each toy has its own folder, `toys/<toy>/`. Repository-level documents cover only what toys have in common and do not mention individual toys.
  - A toy's folder holds its code and a `docs/` folder with the same structure as the repository's, as far as the toy needs it: `roadmap.md`, `architecture/Architecture.md`, `decisions/`, `items/`, `product/` and `guide/`.
  - The rules for records, anchors, the spec and the roadmap apply to a toy's documents the same way. IDs and anchors are unique across the whole repository.
  - A toy's spec is cited as `[[<toy>§<section>]]`. The bare `[[§<section>]]` form is the repository's spec.
  - A toy's spec meets the repository's spec, and says so in plain words rather than by citation (clause-24).

## Options considered

None. The structure was set by owner direction, 2026-09-28.

## Comparison and review files

None.

## Precept conflicts resolved

None.
