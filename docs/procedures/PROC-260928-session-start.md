---
id: PROC-260928-session-start
governance: yes
---

# Session start

Follow this at the start of every session ([[DEC-260928-documentation-baseline#clause-35]]). Other sessions may be working on their own branches at the same time; the first steps account for them by asking the owner, not by reading their diffs.

1. **Read this procedure.**
2. **Bring git up to date.**
   - If the clone is shallow (`git rev-parse --is-shallow-repository`), run `git fetch --unshallow`, since branch comparisons give wrong answers on a shallow clone.
   - `git fetch --all --prune`, then fast-forward local `main` with `git checkout main && git merge --ff-only origin/main`. If that fails, stop and show the owner `git log origin/main..main`; never reset it away.
3. **Account for other work.**
   - List open pull requests. For each one, ask the owner whether to leave it, merge it (after running its close-out), or close it.
   - List other branches with commits of their own (`git branch -r --no-merged origin/main`). For each one, give the owner its last commit (`git log -1 --format='%ad %s' <branch>`) and ask whether it is live or abandoned. Investigate only abandoned or unknown ones.
   - List branches already merged (`git branch -r --merged origin/main`) for the owner to delete.
4. **Switch to the session's branch** (assigned by the platform, or created from `main`). If it already holds commits `main` doesn't have, stop and surface them. Push it before the first commit, so other sessions can see it. Title the session "<the work> · <branch short name>".
5. **Read in full:** `CLAUDE.md`, `docs/roadmap.md` and `docs/architecture/Architecture.md`, and for work on a toy, that toy's `docs/roadmap.md` and `docs/architecture/Architecture.md`.
6. **Present the brief:** `npm run docs -- brief` ([[DEC-260928-documentation-baseline#clause-36]]). Run `npm install` first in a fresh clone.
7. **Confirm the work with the owner.** When it is assigned, restate [[rule-stop-and-surface]].
8. **Read on demand** the item being worked on and what it cites.
