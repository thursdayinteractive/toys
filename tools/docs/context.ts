// Builds the checks' inputs from a real repository, through git.ts.

import type { CommitInfo, Git } from './git';
import { buildModel, type Model } from './records';

const BINARY = /\.(png|jpe?g|gif|webp|ico|icns|ttf|otf|woff2?|pdf|zip|gz|mp3|mp4|mov|wav|db|sqlite|bin)$/i;

/** Problems that stop every command: a shallow clone, or no origin/main. */
export function preflight(git: Git): string[] {
  const problems: string[] = [];
  if (git.isShallow()) problems.push('This is a shallow clone. Run `git fetch --unshallow` first.');
  if (git.revParse('origin/main') === null) problems.push('origin/main is missing. Run `git fetch origin main` first.');
  return problems;
}

/** The documentation and other text files at a revision. */
export function modelAt(git: Git, rev: string): Model {
  const paths = git.lsFiles(rev).filter((p) => !BINARY.test(p) && !p.startsWith('node_modules/'));
  return buildModel(git.readBlobs(rev, paths));
}

/** The merge base with origin/main, or null when HEAD and main share no history. */
export function baseRev(git: Git): string | null {
  try {
    return git.mergeBase('HEAD', 'origin/main');
  } catch {
    return null;
  }
}

/** Non-merge commits on HEAD and not on origin/main. */
export function branchCommits(git: Git): CommitInfo[] {
  return git.log(['--no-merges', 'origin/main..HEAD']);
}
