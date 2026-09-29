import { test } from 'node:test';
import assert from 'node:assert/strict';
import { NO_CLICKS, click } from './talkClicker';

test('each tap adds one to its own counter, and the others stay put', () => {
  let counts = NO_CLICKS;
  counts = click(counts, 0);
  counts = click(counts, 0);
  counts = click(counts, 3);
  assert.deepEqual(counts, [2, 0, 0, 1]);
  assert.deepEqual(NO_CLICKS, [0, 0, 0, 0]);
});
