---
id: PROC-260928-vetting
governance: yes
---

# Vetting a change many parts depend on

Use this for a change to a core type shape, or to a mechanism several parts depend on ([[rule-vetting-directive]]). Discovery comes before design. The conduct rules for every step are [[rule-facts-not-direction]], [[rule-running-is-not-solving]], [[rule-narration-lags-work]], [[rule-check-existing-mechanisms]], [[rule-dont-open-by-declaring]] and [[rule-reporting-standard]].

## Discovery

1. **Find what depends on it.** An independent agent lists every consumer of what is changing, across cores, hosts and adapters, and every existing mechanism that already does some or all of the job.
2. **Check it against what's decided.** An independent agent checks the request and step 1's findings against the specs and the precepts ([[rule-precepts]]) and reports conflicts as facts.

## Checkpoint

3. **Report** steps 1 and 2 to the owner as findings, with no recommendation.
4. **Resolve conflicts.** The owner answers each one: proceed, change direction, supersede a decision, or ask for more analysis. Nothing proceeds until every conflict has an answer.
5. **Recommend a route**, arguing both the reuse case and the new-mechanism case: reuse something existing, build directly (for a narrow, additive change with a close precedent), or run the candidate steps below.
6. **Get the owner's go-ahead** on the route. For reuse or a direct build, write the plan for approval here.

## Candidates

7. **Pick hard cases** from real content to test candidates against, before any candidate exists.
8. **Candidates.** Three independent agents each design one from the same facts: the consumer list, the reuse list, the conflict answers, the decisions already made, and any earlier candidates with why they failed. A candidate the owner or the session proposes is scored the same way, never handed to an agent as a starting point.
9. **Compare.** An independent agent writes a neutral comparison of every candidate against every consumer, including what each costs once working. A second agent then writes a blended recommendation, naming each part's source. The owner chooses.
10. **Trace** the chosen design by hand through the hard cases.
11. **Review.** Two agents look for consumers the design breaks, and one checks it against the specs and precepts, each without seeing the others. Confirmed findings, shown against real code, go to the owner, who chooses a fix, further review, or a return to step 8. Keep a running list of the fixes applied.
12. **Prove it mechanically** where possible: the typecheck for exhaustive handling of a type, the documentation checks for documentation. Say so if it doesn't apply.
13. **Write the plan** once every step is done, with precept decisions as separate bullets and the build split into stages, and get the owner's approval.

## Mechanics

Each step's output is committed on the branch as it is produced, and removed before merge once its lasting reasoning is recorded ([[DEC-260928-documentation-baseline#clause-39]]). After each build stage, report what changed, which checks ran and their results, and any departure from the plan. A departure stops the work.
