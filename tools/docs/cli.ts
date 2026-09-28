// The documentation tools, run as `npm run docs -- <command>`:
//
//   check   disabled until the checker is rewritten
//   brief   print the session-start brief
//
// Both need a full clone with origin/main fetched. They never fetch and never
// write to the repository.

import { branchesInFlight } from './branches';
import { modelAt, preflight } from './context';
import { Git } from './git';
import { brief } from './views';

function fail(message: string): never {
  process.stderr.write(message + '\n');
  process.exit(2);
}

function main(argv: string[]): void {
  const [command = ''] = argv;
  const git = new Git(process.cwd());
  const problems = preflight(git);
  if (problems.length) fail(problems.join('\n'));
  const originMain = git.revParse('origin/main') ?? '';
  switch (command) {
    case 'check': {
      // Disabled by owner direction until it is rewritten for the simplified
      // documentation; its checks are done by hand at close-out.
      process.stdout.write('The documentation checker is disabled until it is rewritten.\n');
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
