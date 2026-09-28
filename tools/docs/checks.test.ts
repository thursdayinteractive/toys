import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runAll, runCheck, splitAppended, type CheckId } from './checks';
import { grammarFrom } from './citations';
import { BASE_FILES, DEC_ACCEPTED, SPEC, cite, ctx } from './testSupport';

function run(id: CheckId, head: Record<string, string>, base: Record<string, string> | null = BASE_FILES) {
  const c = ctx(head, base);
  return runCheck(id, c, grammarFrom(c.head.claudeMd ?? ''));
}

const DEC_PATH = 'docs/decisions/DEC-260101-sample.md';

test('the sample repository passes every check', () => {
  assert.deepEqual(runAll(ctx(BASE_FILES)), []);
});

test('citations: a broken citation in code or docs fails', () => {
  assert.equal(run('citations', { ...BASE_FILES, 'src/a.ts': '// see ' + cite('bm-nothing') }).length, 1);
});

test('unique-names: an anchor defined twice fails', () => {
  assert.equal(run('unique-names', { ...BASE_FILES, 'docs/facts/x.md': '- **bm-first.** again\n' }).length, 1);
});

test('front-matter: record errors and bad fact dates fail', () => {
  const head = { ...BASE_FILES, 'docs/items/ITEM-260101-x.md': '---\nid: ITEM-260101-x\nkind: plan\nstatus: open\n---\n# X\n', 'docs/facts/y.md': '- **fact-y.** Y. (verified: soon)\n' };
  const found = run('front-matter', head);
  assert.ok(found.some((f) => f.message.includes('kind')) && found.some((f) => f.path === 'docs/facts/y.md'));
  assert.equal(run('front-matter', { ...BASE_FILES, 'docs/items/ITEM-260101-y.md': '# no header\n' }).length, 1);
});

test('frozen-records: accepted text is frozen, appended sections may grow', () => {
  const changed = DEC_ACCEPTED.replace('First.', 'Changed.');
  assert.equal(run('frozen-records', { ...BASE_FILES, [DEC_PATH]: changed }).length, 1);
  const appended = DEC_ACCEPTED + '\n## Corrections\n\n- clause-1: fixed wording.\n';
  assert.deepEqual(run('frozen-records', { ...BASE_FILES, [DEC_PATH]: appended }), []);
  const status = DEC_ACCEPTED.replace('status: accepted', 'status: proposed');
  assert.equal(run('frozen-records', { ...BASE_FILES, [DEC_PATH]: status }).length, 1);
  const { [DEC_PATH]: _removed, ...without } = BASE_FILES;
  assert.equal(run('frozen-records', without).length, 1);
});

test('frozen-records: appended sections keep their order', () => {
  const base = { ...BASE_FILES, [DEC_PATH]: DEC_ACCEPTED + '\n## Corrections\n\n- a\n' };
  const bad = DEC_ACCEPTED + '\n## Supersessions\n\n- b\n\n## Corrections\n\n- a\n';
  assert.ok(run('frozen-records', { ...BASE_FILES, [DEC_PATH]: bad }, base).length > 0);
  assert.equal(splitAppended(DEC_ACCEPTED + '\n## Corrections\n\nx\n', ['Corrections']).appended.length, 1);
});

test('spec-amendments: a change needs a new amends: list covering it', () => {
  const edited = SPEC.replace('Sub text.', 'New sub text.');
  assert.equal(run('spec-amendments', { ...BASE_FILES, 'docs/architecture/Architecture.md': edited }).length, 1);
  const amendment = '---\nid: DEC-260103-fix\nstatus: proposed\n---\n# Fix\n\n- **clause-1.** Fix the sub.\n  amends: [§2]\n';
  const head = { ...BASE_FILES, 'docs/architecture/Architecture.md': edited, 'docs/decisions/DEC-260103-fix.md': amendment };
  assert.deepEqual(run('spec-amendments', head), []);
  const renumbered = SPEC.replace('## 2.1 Sub', '## 2.2 Sub');
  assert.ok(run('spec-amendments', { ...BASE_FILES, 'docs/architecture/Architecture.md': renumbered }).some((f) => f.message.includes('removed')));
});

test('spec-amendments: a toy spec is edited in place, an addendum needs its own amends token', () => {
  const toySpec = 'toys/demo/docs/architecture/Architecture.md';
  const base = { ...BASE_FILES, [toySpec]: SPEC };
  assert.deepEqual(run('spec-amendments', { ...base, [toySpec]: SPEC.replace('Text.', 'Changed.') }, base), []);
  const addendum = 'docs/architecture/addenda/storage.md';
  const withAddendum = { ...BASE_FILES, [addendum]: '# Storage\n\nOne interface.\n' };
  const edited = { ...withAddendum, [addendum]: '# Storage\n\nTwo interfaces.\n' };
  assert.equal(run('spec-amendments', edited, withAddendum).length, 1);
  const amendment = '---\nid: DEC-260103-store\nstatus: proposed\n---\n# Store\n\n- **clause-1.** Two.\n  amends: [addenda/storage]\n';
  assert.deepEqual(run('spec-amendments', { ...edited, 'docs/decisions/DEC-260103-store.md': amendment }, withAddendum), []);
});

test('tiers: the repository tier cites no toy, and a toy cites no other toy', () => {
  const toys = {
    ...BASE_FILES,
    'toys/demo/docs/architecture/Architecture.md': SPEC,
    'toys/demo/docs/roadmap.md': '# Demo\n\n- **bm-demo.** Demo. Status: not started.\n',
    'toys/other/docs/architecture/Architecture.md': SPEC,
  };
  assert.deepEqual(run('tiers', { ...toys, 'toys/demo/docs/guide/User_Guide.md': 'See ' + cite('demo§1') + ', ' + cite('bm-demo') + ' and ' + cite('§1') + '.\n' }), []);
  assert.equal(run('tiers', { ...toys, 'docs/facts/x.md': 'See ' + cite('demo§1') + ' and ' + cite('bm-demo') + '.\n' }).length, 2);
  assert.equal(run('tiers', { ...toys, 'toys/other/docs/guide/User_Guide.md': 'See ' + cite('demo§1') + '.\n' }).length, 1);
});

test('conflict-markers and scratch', () => {
  assert.equal(run('conflict-markers', { ...BASE_FILES, 'a.md': 'x\n' + '='.repeat(7) + '\ny' }).length, 1);
  assert.equal(run('scratch', { ...BASE_FILES, 'docs/facts/z.md': 'see scratch' + '/notes.md\n' }).length, 1);
  assert.deepEqual(run('scratch', { ...BASE_FILES, 'docs/facts/z.md': 'see `scratch' + '/`\n' }), []);
});

test('user-sections: internal names in the section for people using the toys fail', () => {
  const guide = '# Guide\n\n## Using the toys\n\nSee DEC-260101-sample and bm-first and §2.\n\n## Adding a toy to a host\n\nDEC-260101-sample is fine here.\n';
  assert.equal(run('user-sections', { ...BASE_FILES, 'docs/guide/User_Guide.md': guide }).length, 3);
});

test('refs-lines: each branch commit needs a resolving Refs: token', () => {
  const c = ctx(BASE_FILES);
  c.commits = [
    { sha: 'a'.repeat(40), parents: [], time: 0, message: 'good\n\nRefs: bm-first DEC-260101-sample#clause-1' },
    { sha: 'b'.repeat(40), parents: [], time: 0, message: 'bad\n\nRefs: bm-missing' },
    { sha: 'c'.repeat(40), parents: [], time: 0, message: 'none' },
  ];
  assert.equal(runCheck('refs-lines', c, []).length, 2);
});

test('rule-tags', () => {
  assert.equal(run('rule-tags', { ...BASE_FILES, 'CLAUDE.md': '- **rule-x.** No tag.\n' }).length, 1);
});
