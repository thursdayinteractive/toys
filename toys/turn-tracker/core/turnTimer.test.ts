import { test } from 'node:test';
import assert from 'node:assert/strict';
import { turnView } from './turnTimer';

const S = 1000;

test('the time counts up from 0:00 in minutes and seconds', () => {
  assert.deepEqual(turnView(5000, 5000), { kind: 'time', text: '0:00' });
  assert.deepEqual(turnView(0, 999), { kind: 'time', text: '0:00' });
  assert.deepEqual(turnView(0, 9 * S), { kind: 'time', text: '0:09' });
  assert.deepEqual(turnView(0, 65 * S), { kind: 'time', text: '1:05' });
  assert.deepEqual(turnView(0, 120 * S - 1), { kind: 'time', text: '1:59' });
});

test('at 2:00 the dragon replaces the time, steady and at its starting size', () => {
  assert.deepEqual(turnView(0, 120 * S), { kind: 'dragon', growth: 0, visible: true });
  assert.deepEqual(turnView(0, 150 * S - 1), { kind: 'dragon', growth: 0, visible: true });
});

test('from 2:30 the dragon grows steadily to fill the screen at 3:00, then stays', () => {
  const growth = (s: number): number => {
    const v = turnView(0, s * S);
    assert.equal(v.kind, 'dragon');
    return v.kind === 'dragon' ? v.growth : NaN;
  };
  assert.equal(growth(150), 0);
  assert.equal(growth(165), 0.5);
  assert.equal(growth(180), 1);
  assert.equal(growth(600), 1);
});

test('the dragon flashes once a second at 2:30, rising to five a second at 3:00', () => {
  const visible = (ms: number): boolean => {
    const v = turnView(0, ms);
    return v.kind === 'dragon' && v.visible;
  };
  // The first flash, at one a second: on for about half a second, then off.
  assert.equal(visible(150 * S), true);
  assert.equal(visible(150 * S + 400), true);
  assert.equal(visible(150 * S + 600), false);
  // After 3:00, five a second: on for the first 0.1 s of each 0.2 s.
  for (const s of [180, 181, 300]) {
    assert.equal(visible(s * S + 50), true, `${s}`);
    assert.equal(visible(s * S + 150), false, `${s}`);
  }
});

test('a clock set back before the turn started reads 0:00', () => {
  assert.deepEqual(turnView(10 * S, 0), { kind: 'time', text: '0:00' });
});
