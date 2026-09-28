import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CONFLICT_MARKER, definedAnchors, level2Sections, splitFrontMatter, stripCode, wordCount } from './markdown';

test('stripCode blanks code spans and fences but keeps line count', () => {
  const text = 'a `b` c\n```\nfenced\n```\nd';
  const out = stripCode(text);
  assert.equal(out.split('\n').length, text.split('\n').length);
  assert.ok(!out.includes('b`') && !out.includes('fenced'));
  assert.ok(out.includes('a') && out.includes('d'));
});

test('splitFrontMatter separates the header block', () => {
  assert.deepEqual(splitFrontMatter('---\nid: X\n---\nbody'), { frontMatter: 'id: X', body: 'body' });
  assert.equal(splitFrontMatter('no header').frontMatter, null);
});

test('level2Sections splits at level-2 headings only', () => {
  const s = level2Sections('intro\n## A\none\n### deeper\n## B\ntwo\n');
  assert.deepEqual(s.map((x) => x.heading), ['', 'A', 'B']);
  assert.ok(s[1]?.text.includes('### deeper'));
});

test('definedAnchors finds bold anchors at line starts, not in code', () => {
  const text = '- **bm-one.** x\n**fact-two.** y\n`**rule-three.**`\ninline **bm-four.** no';
  assert.deepEqual(definedAnchors(text, /^(bm|fact|rule)-/), ['bm-one', 'fact-two']);
});

test('wordCount and conflict markers', () => {
  assert.equal(wordCount(' a  b\nc '), 3);
  assert.ok(CONFLICT_MARKER.test('<'.repeat(7) + ' HEAD'));
  assert.ok(!CONFLICT_MARKER.test('<'.repeat(6) + ' HEAD'));
});
