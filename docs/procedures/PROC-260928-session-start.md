---
id: PROC-260928-session-start
governance: yes
---

# Session start

Read this first, every session ([[DEC-260928-documentation-baseline#clause-61]]). Several sessions may be running at once, each on its own branch, so the goal of steps 1–2 is to account for every other line of work cheaply, by asking rather than diffing, and to investigate only what the owner can't account for.

1. **Read this procedure.**
2. **Git hygiene and branch triage.**
   - **Unshallow, fetch, fast-forward.** If `git rev-parse --is-shallow-repository` is true, run `git fetch --unshallow` first. `git merge-base` silently fails against a shallow clone instead of reporting a real fork. Then `git fetch --all --prune`. Then fast-forward local `main` to `origin/main` (`git checkout main && git merge --ff-only origin/main`). `git fetch` never moves the local `main` pointer. If `--ff-only` fails, stop and show the owner what local `main` has that `origin/main` doesn't (`git log origin/main..main`). Never reset it away.
   - **Open pull requests.** List the repository's open pull requests. One recorded by a `parked` item is known, parked work. Any other is either another session in its close-out or an earlier session that ended before its merge. Name it to the owner by number and branch and ask which, and whether to leave it, merge it (after the owner's approval, running its close-out first, per [[PROC-260928-close-out]]), close it, or park it as an item. Don't read its diff unless the owner asks.
   - **Triage.** Until the checker exists ([[ITEM-260928-documentation-checker]]), list by hand, for the owner's pruning decision: branches already merged into `main` (`git branch -r --merged origin/main`); branches whose content is already on `main` (`git cherry origin/main <branch>` prints no `+` line); and branches with no commits of their own. Delete a local-only branch already in `main` (`git branch -d <branch>`). The owner deletes remote branches.
   - **Other branches with their own commits** and no open pull request: if one is recorded by a `parked` item, it's known, parked work. Otherwise name it to the owner with its last commit's date and subject (`git log -1 --format='%ad %s' <branch>`) and ask whether it's live, parked or abandoned. Live: leave it alone. Parked: record it as a `parked` item. Abandoned or unknown: only then investigate, and if it touched `docs/` or `CLAUDE.md`, reconcile with the owner before continuing.
3. **Branch and title.** Switch to the session's own branch: the one the platform assigned (cloud), or a new one created from `main` (local). If it already exists and holds commits `main` doesn't have, stop and surface them; otherwise bring it level with `git merge --ff-only main`. Push it with no commit, so other sessions can see it. Title the session "<what the work is> · <branch short name>", where the short name is the branch name without its prefix and random suffix (`thursday/nifty-rubin-3c347h` → "nifty-rubin").
4. **Read in full:** `CLAUDE.md`, `docs/roadmap.md` and `docs/architecture/Architecture.md`.
5. **Present the brief.** Until the checker exists, assemble it by hand from the items' front matter, in the parts [[DEC-260928-documentation-baseline#clause-56]] lists. If it is over its cap, say so and hand the list to the owner, who decides the triage.
6. **Confirm the work with the owner.**
7. **When implementation starts** (a plan is approved or work is assigned), restate [[rule-stop-and-surface]] in the acknowledgement.
8. **Read on demand:** the item being worked on, and what it cites.

**Limits.** A session is invisible to others until its branch is pushed. The owner's assignment is what prevents duplicate work; work in flight is not a lock.
