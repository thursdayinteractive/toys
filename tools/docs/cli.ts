// The documentation tools, run as `npm run docs -- <command>`:
//
//   check   run every documentation check (exit 1 on any failure)
//   brief   print the session-start brief
//
// Both need a full clone with origin/main fetched. They never fetch and never
// write to the repository.

import { branchesInFlight } from './branches';
import { runAll, type Finding } from './checks';
import { baseRev, branchCommits, modelAt, preflight } from './context';
import { Git } from './git';
import { brief } from './views';

function fail(message: string): never {
  process.stderr.write(message + '\n');
  process.exit(2);
}

function printFindings(findings: Finding[], originMain: string): void {
  process.stdout.write(`origin/main: ${originMain.slice(0, 7)}\n`);
  if (findings.length === 0) {
    process.stdout.write('All documentation checks pass.\n');
    return;
  }
  for (const f of findings) {
    const where = f.path === undefined ? '' : `${f.path}${f.line === undefined ? '' : `:${f.line}`}: `;
    process.stdout.write(`[${f.check}] ${where}${f.message}\n`);
  }
  process.stdout.write(`${findings.length} problem(s).\n`);
}

function main(argv: string[]): void {
  const [command = ''] = argv;
  const git = new Git(process.cwd());
  const problems = preflight(git);
  if (problems.length) fail(problems.join('\n'));
  const originMain = git.revParse('origin/main') ?? '';
  switch (command) {
    case 'check': {
      if (!git.isClean()) fail('check reads committed content: commit or stash working-tree changes first.');
      const base = baseRev(git);
      const findings = runAll({
        head: modelAt(git, 'HEAD'),
        base: base === null ? null : modelAt(git, base),
        commits: branchCommits(git),
      });
      printFindings(findings, originMain);
      if (findings.length) process.exit(1);
      return;
    }
    case 'brief': {
      const today = new Date().toISOString().slice(0, 10);
      process.stdout.write(brief(modelAt(git, 'HEAD'), branchesInFlight(git), today) + '\n');
      return;
    }
    default:
      fail('usage: npm run docs -- check | brief');
  }
}

main(process.argv.slice(2));
