import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseFields, validateFields } from './frontMatter';

const fields = (block: string) => parseFields(block).fields;

test('parseFields reports duplicates, empties and malformed lines', () => {
  assert.equal(parseFields('a: 1\na: 2').errors.length, 1);
  assert.equal(parseFields('a:').errors.length, 1);
  assert.equal(parseFields('nonsense').errors.length, 1);
  assert.equal(fields('review_when: when X: then Y').get('review_when'), 'when X: then Y');
});

test('a valid task passes', () => {
  const f = fields('id: ITEM-260101-x\nkind: task\nstatus: open\nbenchmark: bm-x');
  assert.deepEqual(validateFields('ITEM', 'ITEM-260101-x', f), []);
});

test('item rules: blocked, removed statuses and fields, benchmark prefix', () => {
  const v = (block: string) => validateFields('ITEM', 'ITEM-260101-x', fields('id: ITEM-260101-x\n' + block));
  assert.ok(v('kind: decision\nstatus: blocked').some((e) => e.includes('blocked_on')));
  assert.ok(v('kind: decision\nstatus: parked').some((e) => e.includes('status must be')));
  assert.ok(v('kind: plan\nstatus: open').some((e) => e.includes('kind must be')));
  assert.ok(v('kind: task\nstatus: open\nverified: none').some((e) => e.includes('unknown')));
  assert.ok(v('kind: decision\nstatus: open\nbenchmark: x').some((e) => e.includes('bm-')));
});

test('id must match, values must be allowed, keys must be known', () => {
  const errors = validateFields('DEC', 'DEC-260101-a', fields('id: DEC-260101-b\nstatus: done\ncolor: red'));
  assert.equal(errors.length, 3);
});
