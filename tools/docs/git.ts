// The only module in the documentation tools that runs git. Every other
// module works on plain strings, so the rules can be tested on real text
// without a repository.
//
// A full clone is required: ancestry questions give wrong answers on a
// shallow one.

import { execFileSync } from 'node:child_process';

export interface CommitInfo {
  sha: string;
  parents: string[];
  time: number;
  message: string;
}

const MAX_BUFFER = 256 * 1024 * 1024;

export class Git {
  readonly cwd: string;

  constructor(cwd: string) {
    this.cwd = cwd;
  }

  run(args: string[]): string {
    return execFileSync('git', args, {
      cwd: this.cwd,
      encoding: 'utf8',
      maxBuffer: MAX_BUFFER,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
  }

  tryRun(args: string[]): string | null {
    try {
      return this.run(args);
    } catch {
      return null;
    }
  }

  isShallow(): boolean {
    return this.run(['rev-parse', '--is-shallow-repository']).trim() === 'true';
  }

  isClean(): boolean {
    return this.run(['status', '--porcelain']).trim() === '';
  }

  revParse(rev: string): string | null {
    const out = this.tryRun(['rev-parse', '--verify', '--quiet', rev + '^{commit}']);
    return out === null ? null : out.trim();
  }

  currentBranch(): string | null {
    const out = this.tryRun(['symbolic-ref', '--short', '-q', 'HEAD']);
    return out === null ? null : out.trim() || null;
  }

  mergeBase(a: string, b: string): string {
    return this.run(['merge-base', a, b]).trim();
  }

  /** Tracked paths at a revision. */
  lsFiles(rev: string): string[] {
    return this.run(['ls-tree', '-r', '-z', '--name-only', rev]).split('\0').filter((p) => p !== '');
  }

  /** Reads many files at one revision with a single `git cat-file --batch`. */
  readBlobs(rev: string, paths: string[]): Map<string, string> {
    const result = new Map<string, string>();
    if (paths.length === 0) return result;
    const raw = execFileSync('git', ['cat-file', '--batch'], {
      cwd: this.cwd,
      input: paths.map((p) => `${rev}:${p}`).join('\n') + '\n',
      maxBuffer: MAX_BUFFER,
    });
    let pos = 0;
    for (const path of paths) {
      const nl = raw.indexOf(10, pos);
      const header = raw.subarray(pos, nl).toString('utf8');
      pos = nl + 1;
      if (header.endsWith(' missing')) continue;
      const size = Number(header.split(' ')[2]);
      result.set(path, raw.subarray(pos, pos + size).toString('utf8'));
      pos += size + 1;
    }
    return result;
  }

  /** Commits (hash, parents, committer time, full message) for a log range. */
  log(args: string[]): CommitInfo[] {
    const out = this.run(['log', '--format=%H%x00%P%x00%ct%x00%B%x1e', ...args]);
    const commits: CommitInfo[] = [];
    for (const rec of out.split('\x1e')) {
      const trimmed = rec.replace(/^\n/, '');
      if (trimmed === '') continue;
      const [sha = '', parents = '', time = '0', message = ''] = trimmed.split('\0');
      commits.push({ sha, parents: parents.split(' ').filter((p) => p !== ''), time: Number(time), message });
    }
    return commits;
  }

  /** Remote branches other than main, with their tip commits. */
  remoteBranches(): { name: string; sha: string }[] {
    return this.run(['for-each-ref', '--format=%(refname:short)%00%(objectname)', 'refs/remotes/origin'])
      .split('\n')
      .filter((l) => l !== '')
      .map((l) => {
        const [name = '', sha = ''] = l.split('\0');
        return { name, sha };
      })
      .filter((b) => b.name !== 'origin' && b.name !== 'origin/HEAD' && b.name !== 'origin/main');
  }

  /** Commits on `branch` whose change is not already on `upstream`. */
  uniqueCommits(upstream: string, branch: string): string[] {
    return this.run(['cherry', upstream, branch])
      .split('\n')
      .filter((l) => l.startsWith('+ '))
      .map((l) => l.slice(2).trim());
  }
}
