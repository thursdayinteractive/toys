import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deleteList, isBlankTitle, isTitleEntry, listsFromText, listsToText, saveList, type SavedList } from './savedLists';

const list = (title: string, weight = 1): SavedList => ({ title, items: [{ label: 'a', multiplier: weight }, { label: 'b', multiplier: 2 }] });

test('a title holds at most 14 characters and cannot be blank', () => {
  assert.equal(isTitleEntry('12345678901234'), true);
  assert.equal(isTitleEntry('123456789012345'), false);
  assert.equal(isBlankTitle(''), true);
  assert.equal(isBlankTitle('   '), true);
  assert.equal(isBlankTitle(' x '), false);
});

test('saving adds a new title at the end and replaces an existing one in place', () => {
  const two = saveList(saveList([], list('One')), list('Two'));
  assert.deepEqual(two.map((l) => l.title), ['One', 'Two']);
  const replaced = saveList(two, list('One', 5));
  assert.deepEqual(replaced.map((l) => l.title), ['One', 'Two']);
  assert.equal(replaced[0]?.items[0]?.multiplier, 5);
});

test('deleting removes the list of that title', () => {
  assert.deepEqual(deleteList([list('One'), list('Two')], 'One').map((l) => l.title), ['Two']);
});

test('lists round-trip through text, and nothing saved reads as no lists', () => {
  const lists = [list('One', 0), list('Two', 1.5)];
  assert.deepEqual(listsFromText(listsToText(lists)), lists);
  assert.deepEqual(listsFromText(null), []);
});
