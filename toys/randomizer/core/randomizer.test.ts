import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chances, formatChance, isMultiplierEntry, pick, type Item } from './randomizer';

const items = (...multipliers: number[]): Item[] =>
  multipliers.map((multiplier, i) => ({ label: `item ${i}`, multiplier }));

function chancesOf(list: readonly Item[]): readonly number[] {
  const result = chances(list);
  assert.equal(result.kind, 'chances');
  return result.kind === 'chances' ? result.chances : [];
}

function pickedIndex(list: readonly Item[], random: number): number {
  const result = pick(list, random);
  assert.equal(result.kind, 'picked');
  return result.kind === 'picked' ? result.index : -1;
}

const sum = (xs: readonly number[]): number => xs.reduce((a, b) => a + b, 0);

test('each chance is its multiplier over the sum of multipliers', () => {
  assert.deepEqual(chancesOf(items(1, 1.2, 2.0)), [1 / 4.2, 1.2 / 4.2, 2 / 4.2]);
  assert.deepEqual(chancesOf(items(1, 3)), [0.25, 0.75]);
});

test('equal multipliers give equal chances', () => {
  assert.deepEqual(chancesOf(items(2.5, 2.5, 2.5, 2.5)), [0.25, 0.25, 0.25, 0.25]);
});

test('chances total 100%', () => {
  for (const list of [items(1, 1.2, 2.0), items(0.1, 0.1, 0.1), items(7, 0, 3.3, 999.9), items(5)]) {
    assert.ok(Math.abs(sum(chancesOf(list)) - 1) < 1e-12);
  }
});

test('a zero multiplier has a 0% chance and is never picked', () => {
  const list = items(0, 1, 0, 1, 0);
  assert.deepEqual(chancesOf(list), [0, 0.5, 0, 0.5, 0]);
  for (const random of [0, 0.25, 0.4999, 0.5, 0.75, 1 - Number.EPSILON / 2]) {
    assert.ok([1, 3].includes(pickedIndex(list, random)));
  }
});

test('picks land on the item whose share of the range holds the random value', () => {
  const list = items(1, 3); // item 0 holds [0, 0.25), item 1 holds [0.25, 1)
  assert.equal(pickedIndex(list, 0), 0);
  assert.equal(pickedIndex(list, 0.2499), 0);
  assert.equal(pickedIndex(list, 0.25), 1);
  assert.equal(pickedIndex(list, 1 - Number.EPSILON / 2), 1);

  const three = items(1, 1.2, 2.0);
  assert.equal(pickedIndex(three, 0.1), 0);
  assert.equal(pickedIndex(three, 0.3), 1);
  assert.equal(pickedIndex(three, 0.6), 2);
});

test('duplicate labels are separate items, picked by position', () => {
  const list: Item[] = [
    { label: 'same', multiplier: 1 },
    { label: 'same', multiplier: 1 },
  ];
  assert.equal(pickedIndex(list, 0.1), 0);
  assert.equal(pickedIndex(list, 0.9), 1);
});

test('an empty list or all-zero multipliers reports no viable options', () => {
  for (const list of [items(), items(0), items(0, 0, 0)]) {
    assert.deepEqual(chances(list), { kind: 'no-viable-options' });
    assert.deepEqual(pick(list, 0.5), { kind: 'no-viable-options' });
  }
});

test('chances display as percentages to two decimal places', () => {
  assert.equal(formatChance(1 / 3), '33.33%');
  assert.equal(formatChance(0.25), '25.00%');
  assert.equal(formatChance(1), '100.00%');
  assert.equal(formatChance(0), '0.00%');
});

test('the weight field holds digits with at most one decimal place and no minus sign', () => {
  for (const text of ['', '1', '12', '1.', '1.2', '.5', '0', '0.0', '999999']) {
    assert.equal(isMultiplierEntry(text), true, text);
  }
  for (const text of ['-1', '-', '1.25', '1..2', '1.2.', 'a', '1a', ' 1', '1,2']) {
    assert.equal(isMultiplierEntry(text), false, text);
  }
});
