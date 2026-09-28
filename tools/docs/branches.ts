// Other branches in flight, for the brief.

import type { Git } from './git';

export interface Flight {
  branch: string;
  commits: number;
  lastDate: string;
  lastSubject: string;
}

/** Remote branches, other than the current one, with commits not on main. */
export function branchesInFlight(git: Git): Flight[] {
  const current = git.currentBranch();
  const result: Flight[] = [];
  for (const b of git.remoteBranches()) {
    const short = b.name.replace(/^origin\//, '');
    if (short === current) continue;
    const unique = git.uniqueCommits('origin/main', b.name);
    if (unique.length === 0) continue;
    const [last] = git.log(['-1', b.name]);
    result.push({
      branch: short,
      commits: unique.length,
      lastDate: last ? new Date(last.time * 1000).toISOString().slice(0, 10) : '',
      lastSubject: last ? (last.message.split('\n')[0] ?? '') : '',
    });
  }
  return result;
}
