import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isFacesEntry, isQuantityEntry, roll, rollRequest } from './diceRoller';

test('every face from 1 to the number of sides is reachable, and none outside it', () => {
  for (const faces of [2, 6, 20, 999]) {
    const randoms = Array.from({ length: faces }, (_, i) => (i + 0.5) / faces);
    assert.deepEqual(roll(faces, randoms), Array.from({ length: faces }, (_, i) => i + 1));
    assert.deepEqual(roll(faces, [0, 1 - Number.EPSILON / 2]), [1, faces]);
  }
});

test('several dice return one number each, in order, not totaled', () => {
  assert.deepEqual(roll(6, [0, 0.5, 0.99]), [1, 4, 6]);
  assert.deepEqual(roll(6, []), []);
});

test('the fields hold up to three and up to two digits', () => {
  for (const t of ['', '2', '20', '999']) assert.equal(isFacesEntry(t), true, t);
  for (const t of ['1000', '-2', '2.5', 'a']) assert.equal(isFacesEntry(t), false, t);
  for (const t of ['', '1', '99']) assert.equal(isQuantityEntry(t), true, t);
  for (const t of ['100', '-1', '1.5']) assert.equal(isQuantityEntry(t), false, t);
});

test('a roll request follows the dice entry rules', () => {
  assert.deepEqual(rollRequest('6', ''), { kind: 'roll', faces: 6, quantity: 1 });
  assert.deepEqual(rollRequest('20', '3'), { kind: 'roll', faces: 20, quantity: 3 });
  assert.deepEqual(rollRequest('', '3'), { kind: 'blocked' });
  assert.deepEqual(rollRequest('6', '0'), { kind: 'blocked' });
  assert.deepEqual(rollRequest('1', ''), { kind: 'invalid-entry' });
  assert.deepEqual(rollRequest('0', '2'), { kind: 'invalid-entry' });
  assert.deepEqual(rollRequest('1', '0'), { kind: 'invalid-entry' });
});
