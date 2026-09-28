# Project Instructions: Thursday Interactive Toys

Start every session with [[PROC-260928-session-start]]. When the owner asks to close the session, follow [[PROC-260928-close-out]]. How this project is documented is set by [[DEC-260928-documentation-baseline]].

**Every toy stays usable as a curriculum app add-on** ([[rule-add-on-compatible]]).

Each rule has an anchor, a tag, a reason and the clause it implements. `[conduct]` rules govern how the session works with the owner, `[review]` rules are listed in the close-out review, and `[check]` rules are verified by `npm run docs -- check` ([[DEC-260928-documentation-baseline#clause-41]]). Examples sit in marked blocks under their rules.

The documentation checker is disabled until it is rewritten, so `[check]` rules are checked by hand at close-out. Until [[ITEM-260928-architecture-simplification]] closes, foundational records are edited in place with the owner's approval, without amendments or supersessions (owner direction, 2026-09-28).

## Working with the owner

- **rule-stop-and-surface.** [conduct] At the first sign of an unanticipated issue, a change to a foundational record, a step beyond or against what was approved, a conflict with a spec, decision or exception, a change of scope or order, or a merge conflict in a foundational file, stop and bring it to the owner before writing anything. Reason: a quick fix nobody vetted tends to cause the next problem. Implements [[DEC-260928-documentation-baseline#clause-31]].
  > **Example.** A test fails for a reason the plan didn't foresee. Patching it on the spot introduces a second failure, and patching that introduces a third. Stopping at the first one would have cost one conversation.
- **rule-restate-at-start.** [conduct] When work is assigned or a plan approved, restate [[rule-stop-and-surface]] in the acknowledgement. Reason: that is when it matters most. Implements [[DEC-260928-documentation-baseline#clause-31]].
- **rule-reporting-standard.** [conduct] Anything surfaced stands on its own: what happened and where, the evidence, what it affects, whether the approved plan covers it, and what is proposed and why. Reason: the owner should be able to decide from the report alone. Implements [[DEC-260928-documentation-baseline#clause-32]].
  > **Example.** "That was my mistake, I can fix it" is not a report. "A core test fails at this line because of this input; the plan doesn't cover it; here is the proposed fix and why" is.
- **rule-approval.** [conduct] Approval is a yes to an explicit question that names the change. "Sounds good" is not approval, and recommendations are not applied without it. Reason: general agreement is easy to misread as consent to specifics. Implements [[DEC-260928-documentation-baseline#clause-33]].
- **rule-surface-before-solving.** [conduct] Raise a problem before settling on a fix. Offer recommendations freely, each with its reasoning, but make no change or expansion without approval. Reason: the owner chooses the solution. Implements [[DEC-260928-documentation-baseline#clause-34]].
- **rule-precepts.** [conduct] Every recommendation and change is weighed against four precepts:
  1. It does not conflict with existing decisions or the spec.
  2. It does not create conflicts for later work.
  3. Decisions carry weight for the future, so they are vetted properly.
  4. It adds no complexity that something else already handles.

  Ask of every piece of code: is this the simplest mechanism that works, and does its design create problems that need more machinery to solve? Reason: these are the project's standing test for any change. Implements [[DEC-260928-documentation-baseline#clause-34]].
- **rule-reachability-first.** [conduct] Before designing a guard against a scenario, check whether any real path produces it, not just whether the types allow it. Reason: effort spent guarding an unreachable case is wasted. Implements [[DEC-260928-documentation-baseline#clause-34]].
  > **Example.** Guarding against a double-tap on a toy's main button is only worth building if the action is slow enough for a second tap to land before it finishes.
- **rule-disclose-before-shipping.** [conduct] A content or behavior decision made during implementation is asked about in the reply, before it is written. If one slips through, flag it afterwards on its own, clearly separated line, not inside a summary. Reason: a decision already in shipped code was never really put to the owner. Implements [[DEC-260928-documentation-baseline#clause-34]].
  > **Example.** Choosing a default input value, or writing the wording of an error message, while building a screen, and mentioning it only in a closing summary, counts as shipping it without asking.
- **rule-verify-named-precedent.** [conduct] When the owner says a mechanism already exists, read it before reasoning about it. Reason: the real code is usually one search away and settles the question. Implements [[DEC-260928-documentation-baseline#clause-34]].
- **rule-weigh-owner-recommendation.** [conduct] An option the owner raises gets the same full check as every other candidate, including what each option really costs once made to work. It is argued against directly if it is wrong, never quietly outweighed by something that merely looks lighter. Reason: a design that looks small at first can gather fixes until it is the heavier one. Implements [[DEC-260928-documentation-baseline#clause-34]].
  > **Example.** The owner suggests a dedicated store; a reuse design looks lighter and is chosen; it then needs a patch per edge case until it outgrows the store it replaced.

## Decisions

- **rule-record-is-wrong.** [conduct] If the owner says something was decided and the record doesn't show it, the record is wrong. Never cite your own earlier text against the owner's account. Reason: the decision is the owner's; the record only writes it down. Implements [[DEC-260928-documentation-baseline#clause-34]].
- **rule-correction-first.** [conduct] Act on a correction first. Analyze causes only if asked, from the owner's account. Reason: the correction is what was asked for. Implements [[DEC-260928-documentation-baseline#clause-34]].

## Vetting

- **rule-vetting-directive.** [conduct] A change follows [[PROC-260928-vetting]] only when the owner asks for it. Every other change is planned directly and brought to the owner for approval. Reason: full vetting is sized for a large app, and these toys are small. Implements [[DEC-260928-documentation-baseline#clause-34]].
- **rule-check-existing-mechanisms.** [conduct] Before accepting that something needs new machinery, search the code for a mechanism that already does the job. Reason: an existing mechanism is the simpler solution by definition. Implements [[DEC-260928-documentation-baseline#clause-34]].
  > **Example.** Before adding a new flag to a core's data, check whether an existing field or rule already expresses it.
- **rule-dont-open-by-declaring.** [conduct] Open a design change by proposing to look at what it touches, not by announcing a large build. Reason: the scope comes from what discovery finds. Implements [[DEC-260928-documentation-baseline#clause-34]].

## Working practice

- **rule-add-on-compatible.** [review] Every toy's core meets [[§3]], so it stays usable as a curriculum app add-on. Reason: the app is the last host built, so a break would surface late. Implements [[DEC-260928-architecture-baseline#clause-3]].
- **rule-branch-per-session.** [conduct] Work on the session's own branch, never `main`, and push as you go. Commit only verified changes: typecheck and tests clean, and the documentation checks for documentation. Reason: sessions run in parallel and each lands through its own pull request. Implements [[DEC-260928-documentation-baseline#clause-4]].
- **rule-long-running-operations.** [conduct] Submit a build or other long remote job and stop; don't poll it unless asked. Reason: the owner checks status between sessions. Implements [[DEC-260928-documentation-baseline#clause-34]].
- **rule-closing-items.** [conduct] Close an item only with the owner's explicit yes, recorded in the review; never delete one. Reason: an item closed without direction drops work silently. Implements [[DEC-260928-documentation-baseline#clause-19]].
- **rule-queue.** [conduct] Only the owner sets `queued: yes`. Reason: the queue is the owner's. Implements [[DEC-260928-documentation-baseline#clause-17]].

## Documentation

- **rule-code-comments.** [review] Code comments cite spec sections and decision or exception records only: no paths, positions, items or roadmap lines. Reason: code outlives the documents' layout. Implements [[DEC-260928-documentation-baseline#clause-25]].
- **rule-qualifiers-in-code.** [review] A claim in code that rests on something unverified says so, and the question is tracked as an item. Reason: the qualifier keeps a guess from reading as fact. Implements [[DEC-260928-documentation-baseline#clause-26]].
- **rule-product-and-guide-current.** [review] A toy's guide changes with behavior and with anything user-visible. Reason: they describe what exists now. Implements [[DEC-260928-documentation-baseline#clause-21]] and [[DEC-260928-documentation-baseline#clause-22]].
- **rule-refs-tags.** [check] Every non-merge commit names a record or benchmark on a `Refs:` line. Reason: `Refs:` lines are how history is searched. Implements [[DEC-260928-documentation-baseline#clause-27]].
- **rule-citations.** [check] Citations use only the forms below and resolve; names and anchors are unique; front matter is valid. Reason: an unresolved citation is a broken pointer. Implements [[DEC-260928-documentation-baseline#clause-24]] and [[DEC-260928-documentation-baseline#clause-40]].
- **rule-frozen-records.** [check] Accepted decisions and exceptions change only in their appended sections, and repository spec changes match an `amends:` list. Reason: a record edited to match the code can no longer catch drift. Implements [[DEC-260928-documentation-baseline#clause-12]] and [[DEC-260928-documentation-baseline#clause-14]].
- **rule-no-conflict-markers.** [check] No conflict markers anywhere, and nothing cites `scratch/`. Reason: nothing else scans documents for them. Implements [[DEC-260928-documentation-baseline#clause-40]].
- **rule-user-text.** [check] Guide sections for people using the toys carry no internal names. Reason: they are read outside the project. Implements [[DEC-260928-documentation-baseline#clause-22]].
- **rule-rule-tags.** [check] Every rule here has a tag. Reason: an untagged rule has no way to be enforced. Implements [[DEC-260928-documentation-baseline#clause-30]].

## Citation forms

| Form | Points to | Example |
|---|---|---|
| `[[DEC-<yymmdd>-<name>]]` | a decision record | [[DEC-260928-documentation-baseline]] |
| `[[DEC-<yymmdd>-<name>#clause-<n>]]` | one clause of a decision | [[DEC-260928-documentation-baseline#clause-31]] |
| `[[EXC-<yymmdd>-<name>]]` | an exception | `[[EXC-260928-example]]` |
| `[[EXC-<yymmdd>-<name>#clause-<n>]]` | one clause of an exception | `[[EXC-260928-example#clause-1]]` |
| `[[ITEM-<yymmdd>-<name>]]` | a work item | [[ITEM-260928-documentation-checker]] |
| `[[PROC-<yymmdd>-<name>]]` | a procedure | [[PROC-260928-vetting]] |
| `[[bm-<name>]]` | a roadmap benchmark | [[bm-repository-foundation]] |
| `[[fact-<name>]]` | a fact | [[fact-toys-repository]] |
| `[[prod-<name>]]` | an entry in a toy's guide saying what exists now | `[[prod-example]]` |
| `[[rule-<name>]]` | a rule in this file | [[rule-stop-and-surface]] |
| `[[§<section>]]` | a repository spec section | [[§2]] |
| `[[§<section> item <n>]]` | a numbered item in a repository spec section | [[§3 item 1]] |
| `[[<toy>§<section>]]` | a toy spec section | `[[example§1]]` |
| `[[<toy>§<section> item <n>]]` | a numbered item in a toy spec section | `[[example§1 item 1]]` |

Examples in code spans name things that don't exist yet; the others are live.
