# Project Instructions: Thursday Interactive Toys

Read [[PROC-260928-session-start]] first, every session, and follow it. When the owner asks to close the session, follow [[PROC-260928-close-out]]. Runbooks are in `docs/procedures/`. The documentation system is set by [[DEC-260928-documentation-baseline]]. **Every toy stays usable as a curriculum app add-on** ([[rule-add-on-compatible]]).

Each rule below has an anchor, a tag, a reason, and the clause it implements. `[conduct]` rules act in conversation, `[review]` rules appear in the close-out review report, and `[check]` rules are enforced by the checker, or by hand at close-out until it exists ([[DEC-260928-documentation-baseline#clause-64]]). Worked examples sit in marked blocks under their rule.

## Acting and approval

- **rule-stop-and-surface.** [conduct] At the first instance of any of the following, stop and bring it to the owner before writing any change: an unanticipated issue during approved work; a change to a foundational record; going beyond or against what was approved; a conflict with the spec, a decision or an exception; a change to scope or order; resolving a merge conflict in a foundational file. Reason: an unvetted fix for an unanticipated issue creates the next problem. Implements [[DEC-260928-documentation-baseline#clause-7]].
  > **Example.** The cascade: an unanticipated issue solved with unvetted code, which creates a bug, then another fix, and so on.
- **rule-restate-at-start.** [conduct] Once a plan is approved or work is assigned, restate [[rule-stop-and-surface]] in the acknowledgement. Reason: the rule is most needed exactly when work starts. Implements [[DEC-260928-documentation-baseline#clause-8]].
- **rule-reporting-standard.** [conduct] Anything surfaced, during vetting or building, is self-contained: what happened and where (file, line or step), the evidence, what it affects, whether the approved plan covers it, and what is proposed and why. Reason: the owner decides from the report alone. Implements [[DEC-260928-documentation-baseline#clause-9]].
  > **Example.** Replies like "That was an error in my entry" or "That can be fixed by…" with no context do not meet it.
- **rule-approval.** [conduct] Approval is only an affirmative answer to an explicit question naming the specific change; a general positive response is never approval. Don't apply recommendations without it. Reason: a general "sounds good" has let unapproved changes through. Implements [[DEC-260928-documentation-baseline#clause-10]].
- **rule-surface-before-solving.** [conduct] Surface any conflict or problem before identifying a solution. Recommendations need no prompting; changes and expansions do. Every recommendation includes its justification. Reason: the owner chooses the solution, not the session. Implements [[DEC-260928-documentation-baseline#clause-67]].
- **rule-precepts.** [conduct] All recommendations, implementations, or edits take into consideration the following precepts:
  1. Any solution should not create conflicts with existing architectural decisions.
  2. Solutions should not create downstream or later development conflicts.
  3. Any decision carries real weight for future development, so it should be thoroughly vetted.
  4. No unnecessary complexity is added that is already caught elsewhere or is redundant.

  For every piece of code, consider it through this lens: is this the simplest sufficient mechanism, and are the design decisions creating problems that require additional complexity to solve? Reason: these four precepts are the project's standing test for every change. Implements [[DEC-260928-documentation-baseline#clause-67]].
- **rule-reachability-first.** [conduct] For every defensive scenario, ask first whether a real call path produces it, not just what a broader type permits — before spending design or vetting effort on a fix, not as a check on one already built. Reason: effort spent guarding an unreachable window is wasted. Implements [[DEC-260928-documentation-baseline#clause-67]].
  > **Example.** A flagged gap ("Cancel doesn't actually cancel") went through two full vetting rounds before anyone asked whether a person could reach it. No one could: the operation finishes faster than a second tap.
- **rule-disclose-before-shipping.** [conduct] Disclosing a decision after it ships is not the same as obtaining approval before it ships. Content or behavior decisions made mid-implementation — not mechanical details — get asked about directly, in the reply itself, before they're written, the same as any other recommendation. If one gets made anyway before it's noticed, flagging it afterward has to be its own clearly separated, hard-to-miss line, not a remark folded into a longer document or summary. Reason: a decision already live in shipped code was never really put to the owner. Implements [[DEC-260928-documentation-baseline#clause-67]].
  > **Example.** A real instance: a session built a device-state heuristic and ten pieces of example copy during implementation, then noted both as unconfirmed assumptions afterward — once in a wrap-up summary, once inside an annotated document handed over alongside several other notes. Both were technically mentioned, and the person still read this as never having been made aware, because nothing stopped and asked before the decision was already live in shipped code, and nothing about how it was surfaced afterward stood out from the surrounding notes enough to register as "this needs your call."
- **rule-verify-named-precedent.** [conduct] A precedent the person names is a factual claim to verify immediately, not color to reason from memory. When the person says a mechanism already exists in the codebase, read it before reasoning about what it implies: a described mechanism is a pointer to real code, not a design constraint to interpret. Reason: the real code is usually one search away and settles the question. Implements [[DEC-260928-documentation-baseline#clause-67]].
  > **Example.** The person said a working visibility mechanism already existed and named where. It was reasoned about instead of read, and three rounds of new machinery were built before the existing code was opened. Once read, it resolved the problem.
- **rule-weigh-owner-recommendation.** [conduct] A recommendation the person raises early is not a placeholder to revisit only once everything else fails — setting it aside because a competing option looks architecturally lighter is itself a failure mode, not neutral vetting. A candidate's visible size at first glance is not its real cost — precept 4 has to weigh what a design costs once it's actually made to work, including every patch an ill-fitting "simple" option accumulates, not just the size of its initial proposal. When the person's own recommendation is one of the options on the table, it gets the same real, substantive check every other candidate gets — argued against directly if it's wrong, never just quietly outweighed by something that looks lighter. Reason: by the person's own account this is a recurring pattern across sessions. Implements [[DEC-260928-documentation-baseline#clause-67]].
  > **Example.** The person proposed a dedicated store early, more than once. It was set aside for reuse designs that looked lighter, and each needed a growing list of fixes to work. The design that held up was the dedicated store.

## Plan and decision integrity

- **rule-record-precept-decisions.** [conduct] Record any decision resolving a precept conflict as its own bullet, separate from implementation steps, and carry it forward unchanged through every revision. Reason: a settled decision buried in steps gets lost in a rewrite. Implements [[DEC-260928-documentation-baseline#clause-67]].
  > **Example.** A settled architectural decision was lost during a plan rewrite and shipped wrong.
- **rule-plan-rewrite-is-rebuild.** [conduct] A plan rewrite after further discussion is a full rebuild: re-derive every assumption from the discussion, and state what's unchanged as well as what's new. Reason: patching carries forward assumptions the discussion has already changed. Implements [[DEC-260928-documentation-baseline#clause-67]].
- **rule-record-is-wrong.** [conduct] If the person says something was decided and it isn't in the written record, the record is wrong. Never cite your own prior text against the person's account. Reason: the written record is the session's artifact; the decision is the person's. Implements [[DEC-260928-documentation-baseline#clause-67]].
- **rule-correction-first.** [conduct] Act on a correction first. Do root-cause analysis only if asked, based on the person's account, not your own artifacts. Reason: the correction is what the person asked for. Implements [[DEC-260928-documentation-baseline#clause-67]].

## Vetting

- **rule-vetting-directive.** [conduct] Any change touching a core schema or type shape, or a mechanism multiple layers depend on, requires following [[PROC-260928-vetting]] in full before design work starts. Reason: iterating on one plan in one pass has repeatedly missed cross-file consumers. Implements [[DEC-260928-documentation-baseline#clause-20]].
  > **Example.** A type-shape change planned in one pass cost two hours and a dozen rolled-back attempts, and was abandoned with an incorrect result. It was the third time the same miss had happened.
  > **Example.** A full vetting round once approved a fix that contradicted a decision written plainly in a comment in the file being changed. Nothing in the process asked that question.
- **rule-facts-not-direction.** [conduct] Independent agents get facts, not direction. Every dispatch hands the agent the accumulated factual record — consumers found, decisions already made, prior candidates and why each failed — and nothing else. Never propose a hypothesis, a candidate shape, or a checklist for the agent to confirm or refute; that collapses independence into validating an idea already formed, the exact failure step 8's multiple-candidates requirement exists to prevent. Every candidate gets identical treatment in the instructions, not just in the facts: no follow-up question asked of one candidate alone. Reason: independence is the point of dispatching agents. Implements [[DEC-260928-documentation-baseline#clause-20]].
- **rule-running-is-not-solving.** [conduct] Running the process is not solving the problem. Privately drafting a fix or converging on a resolution while relaying what independent agents found, even when nothing reaches a prompt or the codebase, biases what gets surfaced and how, and can harden into a decision presented as settled. Report what was found. Do not resolve it. The plan is what resolves it. Reason: the outcome must not rest on one perspective. Implements [[DEC-260928-documentation-baseline#clause-20]].
- **rule-narration-lags-work.** [conduct] Vetting narration lags the work. A plan document's prose claims what has happened; write it only after every step, including adversarial review's actual results, is folded in. Reason: prose written ahead of the work reads as results that don't exist. Implements [[DEC-260928-documentation-baseline#clause-20]].
- **rule-check-existing-mechanisms.** [conduct] A claim that something "requires new infrastructure" or "isn't reuse of anything existing" is a precedent claim, verified against real code before it's accepted — more so when its source has no codebase access. Search for an existing mechanism that does the job first; only if that comes up empty is a new field the question to bring to the checkpoint. Reason: precept 4's "not already caught elsewhere or redundant" is a bias toward reuse, and an existing mechanism is definitionally the simpler solution. Implements [[DEC-260928-documentation-baseline#clause-20]].
  > **Example.** A module spec, written without codebase access, called its interaction "new infrastructure". Vetting planning started from that claim. The existing mechanisms that did the job surfaced only because the person kept naming them.
- **rule-dont-open-by-declaring.** [conduct] Open a candidate schema or architecture change by proposing to look at what it touches and checking it against the spec — "let's take a look at it," not "let's go ahead and build a lot of architecture." The scope needed comes from discovery, not an up-front assumption. Reason: declaring the full process first presumes the answer. Implements [[DEC-260928-documentation-baseline#clause-20]].

## Working practice

- **rule-add-on-compatible.** [review] Every toy's core meets [[§3]], so it stays usable as a curriculum app add-on. Reason: the app is the last host built, so a break would go unnoticed until then. Implements [[DEC-260928-architecture-baseline#clause-3]].

- **rule-branch-per-session.** [conduct] Work on the session's own branch, never on `main`, and push as you go. Commit only the session's own verified changes: the repository's typecheck and tests clean once they exist, and the documentation checks for documentation. Reason: several sessions run in parallel, each landing through its own pull request. Implements [[DEC-260928-documentation-baseline#clause-4]].
  > **Example.** A document forked silently across two branches, each producing its own, differently numbered "current" version.
- **rule-long-running-operations.** [conduct] Submit a build or similar long-running remote process and stop: don't poll or tail logs unless the person asks, since the person checks status between sessions. Prefer a submit-and-return flag (e.g. `eas build --no-wait`). Reason: polling spends the session on something the owner tracks themselves. Implements [[DEC-260928-documentation-baseline#clause-67]].
- **rule-closing-items.** [conduct] Closing an item needs the owner's explicit yes, recorded in the review report; items are closed or dropped, never deleted. Reason: an item closed without direction silently drops work. Implements [[DEC-260928-documentation-baseline#clause-40]].
- **rule-queue.** [conduct] `queued: yes` (the Action Items) is set only on the owner's direction; about 3 to 5 is a guideline, not a limit. Reason: the queue is the owner's. Implements [[DEC-260928-documentation-baseline#clause-36]].

## Documentation rules the tools enforce or report

- **rule-code-comments.** [review] Code comments cite no document paths or positions. They may cite spec sections (`[[§N]]`) and the exception and decision records that govern the code. They do not cite work items, Roadmap rows or spec status lists. Reason: code outlives the documents' layout. Implements [[DEC-260928-documentation-baseline#clause-52]].
- **rule-qualifiers-in-code.** [review] A claim in code resting on an unverified or inferred basis keeps that qualifier in plain words; the open question is tracked as an item. Reason: the qualifier is what stops a guess being read as fact. Implements [[DEC-260928-documentation-baseline#clause-53]].
- **rule-product-and-guide-current.** [review] Product pages are updated with any behavior change, and the User Guide with any user-visible change. Reason: they describe current behavior; drift makes them wrong. Implements [[DEC-260928-documentation-baseline#clause-42]] and [[DEC-260928-documentation-baseline#clause-44]].
- **rule-refs-tags.** [check] Every non-merge commit after the adoption commit names at least one benchmark or record on a `Refs:` line. Reason: `Refs:` tags are the history index. Implements [[DEC-260928-documentation-baseline#clause-54]].
- **rule-citations.** [check] Citations use only the forms in the table below and resolve to live targets; IDs and anchors are unique; front matter and statuses are valid. Reason: a citation that doesn't resolve is a broken pointer. Implements [[DEC-260928-documentation-baseline#clause-51]] and [[DEC-260928-documentation-baseline#clause-65]].
- **rule-frozen-records.** [check] Accepted decisions, exceptions, handoffs and inbound specs are frozen; only their editable fields and append-only sections change, and spec changes match an `amends:` list. Reason: foundational records change only in append-only form or by amendment, and a spec edited to match the code stops being able to catch drift. Implements [[DEC-260928-documentation-baseline#clause-2]] and [[DEC-260928-documentation-baseline#clause-27]].
- **rule-no-conflict-markers.** [check] No conflict markers anywhere, and nothing cites `scratch/`. Reason: nothing else reads markdown for them. Implements [[DEC-260928-documentation-baseline#clause-65]].
  > **Example.** A branch once shipped `Roadmap.md` with literal unresolved conflict markers and duplicated sections, invisible to every check because it isn't code.
- **rule-caps.** [check] `CLAUDE.md` rules stay within 2,200 words and its examples within 1,500; the roadmap within 2,000; the session-start procedure within 1,000; each non-plan item's body within 400. Reason: start-of-session files must stay readable in one pass. Implements [[DEC-260928-documentation-baseline#clause-12]] and [[DEC-260928-documentation-baseline#clause-18]].
  > **Example.** The Project Context trimming rule went unchecked for about a dozen sessions, until the file reached 458 lines. A rule nobody is forced to invoke doesn't enforce itself.
- **rule-teacher-text.** [check] The User Guide's section for people using the toys and outbound handoffs contain no internal IDs. Reason: that material is read outside the project. Implements [[DEC-260928-documentation-baseline#clause-13]].
- **rule-rule-tags.** [check] Every rule in this file carries a `[check]`, `[review]` or `[conduct]` tag, and closed plans are reduced to stubs. Reason: an untagged rule has no enforcement path. Implements [[DEC-260928-documentation-baseline#clause-11]] and [[DEC-260928-documentation-baseline#clause-39]].

## Citation forms

| Form | Points to | Example |
|---|---|---|
| `[[DEC-<yymmdd>-<name>]]` | a decision record | [[DEC-260928-documentation-baseline]] |
| `[[DEC-<yymmdd>-<name>#clause-<n>]]` | one clause of a decision record | [[DEC-260928-documentation-baseline#clause-7]] |
| `[[EXC-<yymmdd>-<name>]]` | an architecture exception | `[[EXC-260928-website-host]]` |
| `[[EXC-<yymmdd>-<name>#clause-<n>]]` | one clause of an exception | `[[EXC-260928-website-host#clause-1]]` |
| `[[ITEM-<yymmdd>-<name>]]` | a work item | [[ITEM-260928-documentation-checker]] |
| `[[ITEM-<yymmdd>-<name>#clause-<n>]]` | one clause of a work item | `[[ITEM-260928-documentation-checker#clause-1]]` |
| `[[PROC-<yymmdd>-<name>]]` | a procedure | [[PROC-260928-vetting]] |
| `[[PROC-<yymmdd>-<name>#clause-<n>]]` | one clause of a procedure | `[[PROC-260928-vetting#clause-1]]` |
| `[[HO-<yymmdd>-<name>]]` | an outbound handoff snapshot | `[[HO-260928-randomizer]]` |
| `[[HO-<yymmdd>-<name>#clause-<n>]]` | one clause of a handoff | `[[HO-260928-randomizer#clause-1]]` |
| `[[SPEC-<yymmdd>-<name>]]` | an inbound spec | `[[SPEC-260928-randomizer]]` |
| `[[SPEC-<yymmdd>-<name>#clause-<n>]]` | one clause of an inbound spec | `[[SPEC-260928-randomizer#clause-1]]` |
| `[[bm-<name>]]` | a roadmap benchmark | [[bm-randomizer-core]] |
| `[[fact-<name>]]` | a fact | [[fact-toys-repository]] |
| `[[prod-<name>]]` | a product page entry | `[[prod-randomizer-pick]]` |
| `[[rule-<name>]]` | a rule in this file | [[rule-stop-and-surface]] |
| `[[§<section>]]` | a spec section | [[§4.2]] |
| `[[§<section> item <n>]]` | an item in a numbered list of a spec section | [[§3 item 1]] |

Examples in code spans name records or anchors that don't exist yet; the others are live and checked.
