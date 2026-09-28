---
id: PROC-260928-close-out
governance: yes
---

# Close-out

Follow this when the owner asks to close the session ([[DEC-260928-documentation-baseline#clause-37]]). Close-outs all touch shared documents, so each one is written on top of whatever merged before it.

1. **Merge `main` in.** `git fetch origin`, then `git merge origin/main`: a merge, not a rebase. On a conflict in code, stop and show the owner; in a foundational file, stop and surface it ([[rule-stop-and-surface]]).
2. **Confirm with the owner** which items close ([[rule-closing-items]]) and which proposed decision records are accepted.
3. **Update only the records the work touched.**
4. **Remove temporary records** once their lasting reasoning is in a decision record or plan ([[DEC-260928-documentation-baseline#clause-39]]).
5. **Acceptance commit.** Set `status: accepted` on the decision records the owner accepted, and on no others.
6. **Run the checks:** `npm run docs -- check` ([[DEC-260928-documentation-baseline#clause-40]]), plus `npm run typecheck` and `npm test`. All must pass.
7. **Open the pull request.** Its description holds the review ([[DEC-260928-documentation-baseline#clause-38]]), a summary with the commit for each change, and a `Refs:` line. Show the owner full diffs on request.
8. **Record the owner's answers** in the review, revert anything the owner rejects, and finalize the description.
9. **Merge only on the owner's approval of this pull request at its current head.** Just before merging, `git fetch origin` and check `git merge-base --is-ancestor origin/main HEAD`; if `main` has moved, go back to step 1 and ask again. Merge with a merge commit, never squash or rebase. Without approval, the pull request stays open for the next session.

**After a merge**, further changes need a new pull request: fast-forward the branch to `origin/main`, do the work, and close out again. A session that changed nothing opens no pull request.
