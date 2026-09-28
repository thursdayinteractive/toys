import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Git } from './git';
import { branchCommits, modelAt } from './context';

test('reads files and branch commits from a real repository', () => {
  const dir = mkdtempSync(join(tmpdir(), 'toys-docs-'));
  try {
    const git = new Git(dir);
    const commit = (msg: string) => git.run(['-c', 'user.email=t@t', '-c', 'user.name=t', 'commit', '-q', '--allow-empty', '-m', msg]);
    git.run(['init', '-q', '-b', 'main']);
    writeFileSync(join(dir, 'README.md'), '# Readme\n');
    git.run(['add', '.']);
    commit('first');
    git.run(['update-ref', 'refs/remotes/origin/main', 'HEAD']);
    git.run(['checkout', '-q', '-b', 'work']);
    writeFileSync(join(dir, 'README.md'), '# Readme, changed\n');
    git.run(['add', '.']);
    commit('second\n\nRefs: bm-x');
    assert.equal(modelAt(git, 'HEAD').files.get('README.md'), '# Readme, changed\n');
    assert.equal(modelAt(git, 'origin/main').files.get('README.md'), '# Readme\n');
    const commits = branchCommits(git);
    assert.equal(commits.length, 1);
    assert.ok(commits[0]?.message.includes('Refs: bm-x'));
    assert.equal(git.uniqueCommits('origin/main', 'work').length, 1);
    assert.equal(git.isShallow(), false);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
