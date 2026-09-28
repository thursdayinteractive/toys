import { test } from 'node:test';
import assert from 'node:assert/strict';
import { citationProblem, grammarFrom, scanCitations } from './citations';
import { BASE_FILES, CLAUDE_TABLE, L, R, cite, model } from './testSupport';

const grammar = grammarFrom(CLAUDE_TABLE);
const withToy = model({
  ...BASE_FILES,
  'toys/dice/docs/architecture/Architecture.md': '# Dice\n\n# 1. Roll\n\nText.\n',
  'docs/decisions/DEC-260102-old.md':
    '---\nid: DEC-260102-old\nstatus: accepted\n---\n# Old\n\n- **clause-1.** a\n- **clause-2.** b\n\n## Supersessions\n\n- clause-2 superseded by another record\n',
});
const problem = (inner: string) => citationProblem(inner, withToy, grammar);

test('scanCitations ignores code spans and unprefixed brackets', () => {
  const text = 'see ' + cite('bm-first') + ' and `' + cite('bm-hidden') + '` and ' + L + 'note' + R;
  assert.deepEqual(scanCitations(text).map((c) => c.inner), ['bm-first']);
});

test('live targets resolve', () => {
  for (const inner of ['DEC-260101-sample', 'DEC-260101-sample#clause-2', 'bm-first', 'rule-one', '§2', '§2.1', '§2 item 1', 'dice§1']) {
    assert.equal(problem(inner), null, inner);
  }
});

test('broken or dead targets fail', () => {
  assert.match(problem('DEC-260101-missing') ?? '', /no record/);
  assert.match(problem('DEC-260101-sample#clause-9') ?? '', /no clause/);
  assert.match(problem('DEC-260102-old#clause-2') ?? '', /superseded/);
  assert.match(problem('bm-missing') ?? '', /no anchor/);
  assert.match(problem('§9') ?? '', /no section/);
  assert.match(problem('§2 item 4') ?? '', /no item/);
  assert.match(problem('cards§1') ?? '', /no spec for toy/);
  assert.match(problem('HO-260101-x') ?? '', /not one of the citation forms/);
});
