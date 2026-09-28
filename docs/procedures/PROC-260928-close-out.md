---
id: PROC-260928-close-out
governance: yes
---

# Close-out

Run when the owner asks to close the session ([[DEC-260928-documentation-baseline#clause-62]], [[DEC-260928-documentation-baseline#clause-63]]). Each session lands its work through its own pull request. Every close-out edits shared documents, so two close-outs written against the same starting point conflict in git even when their content is unrelated. The fix is ordering: each close-out is written on top of whatever merged before it.

1. **Merge `origin/main`.** `git fetch origin`, then `git merge origin/main` into the session's branch: a merge, never a rebase. A conflict in code: stop and show the owner. A conflict in a foundational file: stop and surface it ([[rule-stop-and-surface]]).
2. **Confirm new and changed items and decisions with the owner.** Closing an item needs the owner's explicit yes ([[rule-closing-items]]). Ask which `proposed` decision records the owner accepts.
3. **Write only the records the work touched.**
4. **Remove the temporary records** (comparison, review and vetting records committed on the branch), after the reasoning for any decision that persists is in its decision record, and a plan's process reasoning is in its plan item.
5. **Acceptance commit.** Set `status: accepted` only on the decision records the owner accepted in step 2; the others stay `proposed`. This is the last commit before steps 6 and 7.
6. **Run the checks.** Until the checker exists ([[ITEM-260928-documentation-checker]]), carry out the checks in [[DEC-260928-documentation-baseline#clause-65]] by hand, and state which were carried out and what they found. Everything must pass.
7. **Open the pull request.** The description gives the review report as [[DEC-260928-documentation-baseline#clause-60]] lists it, with a summary plus commit for each change, and a `Refs:` line with the union of the branch's `Refs:` tags. The report shows each record's acceptance. Full diffs go to the owner in conversation, as Markdown files if the owner asks.
8. **Record the owner's answers** in the report. Revert any foundational change the owner rejects, including an acceptance set in step 5, then finalize the description.
9. **Merge, only after the owner approves** that pull request at its current head commit and description. Approval of the session's work, of an earlier pull request, or of an earlier head is not approval to merge this one. Immediately before merging, `git fetch origin` and confirm `origin/main` hasn't moved since step 1 (`git merge-base --is-ancestor origin/main HEAD`). If it has, go back to step 1, regenerate the report, and ask again. Any change after approval needs approval again. Merge with a merge commit, never a squash or rebase, passing the approved head commit and the approved description as the merge message. If approval doesn't come before the session ends, the pull request stays open and the next session asks about it.

**Afterwards.**
- **Changes after the merge need a second pull request.** Say so before starting: `git fetch origin`, then `git merge --ff-only origin/main` on the same branch, do the work, and run this close-out again.
- **A session that changes nothing opens no pull request.** Its pushed branch is its record.
- **Parked work.** A pull request or branch the owner chooses to park is recorded as a `parked` item (`branch:` or `pr:`). Whenever it's finally merged, its close-out runs again first.
- **No CI.** A pull request here is a record and a merge point, not an automated gate: the checks run in-session, before committing.
