---
id: PROC-260928-vetting
governance: yes
---

# Vetting a schema or architecture change

**When it applies** ([[rule-vetting-directive]]): any change touching a core schema or type shape, or a mechanism multiple layers depend on — the class of decision precept 3 calls out as carrying real weight, distinct from a routine bug fix or additive change. Sound-seeming reasoning that hasn't produced a working result is not evidence the reasoning was right — it's evidence the problem needs a different process, not just another pass. Discovery has to happen before implementation, not during it.

**Checking against what's already decided.** Every candidate is checked for internal soundness (does it break a consumer, a test, a hand-traced case) and, separately, for consistency with what's already decided. Steps 2 and 11 do the second, using the spec and the four precepts ([[rule-precepts]]) — deliberately kept separate from consumer and test correctness, and deliberately narrow: broader sources create their own risk of misinterpretation rather than reducing it.

The conduct rules that govern every step are in `CLAUDE.md`: [[rule-facts-not-direction]], [[rule-running-is-not-solving]], [[rule-narration-lags-work]], [[rule-check-existing-mechanisms]], [[rule-dont-open-by-declaring]], and the reporting standard, [[rule-reporting-standard]]. Steps are both numbered and named, so references survive renumbering ([[DEC-260928-documentation-baseline#clause-46]]).

## Discovery

1. **Consumer and reuse search** (independent agent). It produces two separate outputs: the consumer checklist — every real consumer of the thing being changed across the whole codebase, including layers a first read wouldn't expect to be affected — and the existing mechanisms that do all or part of the job, with file references.
2. **Early precept and architecture check** (independent agent). The input is the request plus step 1's outputs. Conflicts are reported as data.

## Checkpoint

3. **Report** the step 1–2 results as findings, with no recommendation mixed in.
4. **Conflict response.** The owner responds to each flagged conflict: proceed anyway, change direction, deliberately supersede the architecture (a recorded decision), or first request analysis (a fact-only dispatch) or a justified recommendation. No candidate work starts until every conflict has a response.
5. **Route recommendation**, with justification: reuse, build directly, or the full candidate process. It must argue both the reuse case and the new-mechanism case, judged by real cost once working. Building directly fits a change that is additive, narrow, and matches an already-shipped precedent closely enough that there's no real shape left to choose between — a decision documented in the new code's own comment. If a reuse or direct route needs a fix during the build that the approved plan doesn't cover, stop and return to step 5.
6. **Explicit go-ahead** naming the route. On a skip or reuse route, enter plan mode here to write the plan the owner approves.
7. **Record the route.** On the full route, freeze the checklist and choose the hard cases for tracing now, before candidates exist: real existing content that stresses the edges, not synthetic examples. A skip route's rationale goes in the same temporary file as the plan, because it is about the process, not the implementation.

## Candidates

8. **Candidates.** Three independent agents. Every dispatch gets the identical fact packet: the checklist, the reuse list, the precept findings, the conflict responses, the decisions already made, and prior candidates with why each failed. Nothing else. No migration detail is required unless the owner directs it. A candidate named by the owner or the session becomes a fourth candidate, scored identically, never a seed handed to an agent.
9. **Comparison.**
   - (a) An independent agent writes a neutral table: each candidate on its own terms against every checklist item, including its real cost once working. A scoring axis phrased as what one candidate lacks relative to another is itself a bias. The table is written and committed before the recommendation.
   - (b) An independent agent then writes a blended recommendation, labeled as such and placed after the table. For each piece it names the source candidate, the seams the blend introduces, and the justification.
   - (c) The owner chooses a candidate, the blend, or directed changes; that is "the chosen design". A blend is treated as a new design.
   - (d) The session adds its own view only if the owner asks, labeled separately.
10. **Hand traces** (independent agent) of the step 7 cases, including the blend's seams.
11. **Adversarial and precept review.** Three parallel independent agents, none seeing another's output: two adversarial ("find a consumer this breaks", not "does this look reasonable"), and one precept and architecture check. A finding is confirmed when it is shown against real code or content, not argued. There is no automatic send-back. The owner and session work through each confirmed finding, and the owner chooses: proceed with a fix; a limited external review on one or more of code, architecture and precepts, or downstream consumers; or return to step 8 with the finding as a new checklist item. Precept findings go through step 4. A running list of the fixes applied to the chosen design is shown at each of these decisions, so a growing retrofit is visible.
12. **Mechanical proof,** when it applies: the typecheck for a real discriminated union with exhaustive switches at every read site (a `_exhaustive: never` pattern); the documentation checks for documentation-system work. If it doesn't apply, say so explicitly.
13. **Written plan,** written only after every step's results are in. Precept-conflict resolutions are separate bullets. The build is split into stages. The owner approves explicitly. On the full route, enter plan mode here to write it. If the design is revised after approval, step 11 re-runs.

## Mechanics

- **Records.** Every step's output is committed and pushed as it is produced, in a temporary folder on the session's branch. Plan mode can't come first, because it blocks commits; exiting plan mode is the gate before any building. The temporary records are removed before merge, once the reasoning they hold is carried into the plan and, for any decision that persists, into its decision record ([[DEC-260928-documentation-baseline#clause-49]]).
- **Build stages.** After each stage, report what changed, which checks ran and what they returned, and every departure from the plan — or "none", checked against the stage's diff. A departure stops the work ([[DEC-260928-documentation-baseline#clause-47]]).
