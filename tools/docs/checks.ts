// The documentation checks. Each check is a pure function of the context:
// the documentation at HEAD, at the merge base with main, and the branch's
// commits. The list of checks is the documentation baseline's clause-40
// ([[DEC-260928-documentation-baseline#clause-40]]).

import { citationProblem, grammarFrom, scanCitations, type Grammar } from './citations';
import type { CommitInfo } from './git';
import { CONFLICT_MARKER, level2Sections, stripCode, wordCount } from './markdown';
import { field, recordById, type DocRecord, type Model } from './records';
import { tokenResolves, refsTokens } from './refs';
import { covers, diffSpec, newAmendments } from './spec';

export type CheckId =
  | 'citations'
  | 'unique-names'
  | 'front-matter'
  | 'frozen-records'
  | 'spec-amendments'
  | 'caps'
  | 'conflict-markers'
  | 'scratch'
  | 'user-sections'
  | 'refs-lines'
  | 'rule-tags'
  | 'plan-stubs';

export const CHECK_IDS: readonly CheckId[] = [
  'citations',
  'unique-names',
  'front-matter',
  'frozen-records',
  'spec-amendments',
  'caps',
  'conflict-markers',
  'scratch',
  'user-sections',
  'refs-lines',
  'rule-tags',
  'plan-stubs',
];

export interface Finding {
  check: CheckId;
  path?: string;
  line?: number;
  message: string;
}

export interface CheckContext {
  head: Model;
  /** The documentation at the merge base with main; null when there is none. */
  base: Model | null;
  /** Non-merge commits on the branch and not on main. */
  commits: CommitInfo[];
}

const BINARY = /\.(png|jpe?g|gif|webp|ico|icns|ttf|otf|woff2?|pdf|zip|gz|mp3|mp4|mov|wav|db|sqlite|bin)$/i;

function textPaths(model: Model): string[] {
  return [...model.files.keys()].filter((p) => !BINARY.test(p) && p !== 'package-lock.json').sort();
}

export function citations(ctx: CheckContext, grammar: Grammar): Finding[] {
  const findings: Finding[] = [];
  for (const path of textPaths(ctx.head)) {
    for (const c of scanCitations(ctx.head.files.get(path) ?? '')) {
      const problem = citationProblem(c.inner, ctx.head, grammar);
      if (problem !== null) findings.push({ check: 'citations', path, line: c.line, message: `[[${c.inner}]] ${problem}` });
    }
  }
  return findings;
}

export function uniqueNames(ctx: CheckContext): Finding[] {
  const findings: Finding[] = [];
  const paths = new Map<string, string[]>();
  for (const r of ctx.head.records) paths.set(r.id, [...(paths.get(r.id) ?? []), r.path]);
  for (const [id, ps] of paths) {
    if (ps.length > 1) findings.push({ check: 'unique-names', path: ps[1] ?? '', message: `record ${id} also exists at ${ps[0]}` });
  }
  for (const [anchor, ps] of ctx.head.anchors) {
    if (ps.length > 1) findings.push({ check: 'unique-names', path: ps[1] ?? '', message: `anchor ${anchor} is defined ${ps.length} times (${ps.join(', ')})` });
  }
  return findings;
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function frontMatter(ctx: CheckContext): Finding[] {
  const findings: Finding[] = [];
  for (const r of ctx.head.records) {
    for (const message of r.errors) findings.push({ check: 'front-matter', path: r.path, message });
  }
  for (const path of ctx.head.docPaths.filter((p) => /\/facts\/[^/]+\.md$/.test(p))) {
    const text = ctx.head.files.get(path) ?? '';
    text.split('\n').forEach((line, i) => {
      for (const m of line.matchAll(/\b(verified|recheck_after): ([^,)]*)/g)) {
        if (!DATE.test((m[2] ?? '').trim())) {
          findings.push({ check: 'front-matter', path, line: i + 1, message: `${m[1]} must be a YYYY-MM-DD date` });
        }
      }
    });
  }
  return findings;
}

const APPENDED: Record<'DEC' | 'EXC', readonly string[]> = {
  DEC: ['Corrections', 'Supersessions'],
  EXC: ['Scope changes', 'Retirement'],
};
const EDITABLE_EXC_FIELDS = new Set(['status', 'review_when', 'amendment_candidate']);

interface Parts {
  frozen: string;
  appended: { heading: string; text: string }[];
}

/** Splits a frozen record body at its first appended section. */
export function splitAppended(body: string, allowed: readonly string[]): Parts {
  const sections = level2Sections(body);
  const first = sections.findIndex((s) => allowed.includes(s.heading));
  if (first === -1) return { frozen: body, appended: [] };
  const frozen = sections
    .slice(0, first)
    .map((s) => (s.heading === '' ? s.text : `## ${s.heading}\n${s.text}`))
    .join('');
  return { frozen, appended: sections.slice(first) };
}

function frozenChanges(base: DocRecord, head: DocRecord): string[] {
  if (base.kind !== 'DEC' && base.kind !== 'EXC') return [];
  const problems: string[] = [];
  for (const [key, value] of base.fields) {
    const editable = base.kind === 'EXC' && EDITABLE_EXC_FIELDS.has(key) && field(base, 'status') !== 'retired';
    if (!editable && head.fields.get(key) !== value) problems.push(`front matter "${key}" of a frozen record changed`);
  }
  const allowed = APPENDED[base.kind];
  if (base.kind === 'EXC' && field(base, 'status') === 'retired') {
    if (base.body !== head.body) problems.push('a retired exception is frozen whole');
    return problems;
  }
  const b = splitAppended(base.body, allowed);
  const h = splitAppended(head.body, allowed);
  if (b.frozen.trimEnd() !== h.frozen.trimEnd()) problems.push('the frozen part of the record changed');
  let last = -1;
  const seen = new Set<string>();
  for (const s of h.appended) {
    const order = allowed.indexOf(s.heading);
    if (order === -1) problems.push(`"## ${s.heading}" may not follow the appended sections`);
    else if (seen.has(s.heading) || order < last) problems.push(`"## ${s.heading}" is out of order or repeated`);
    seen.add(s.heading);
    last = Math.max(last, order);
  }
  for (const s of b.appended) {
    const now = h.appended.find((x) => x.heading === s.heading);
    if (now === undefined || !now.text.startsWith(s.text.trimEnd())) problems.push(`"## ${s.heading}" may only grow at its end`);
  }
  return problems;
}

export function frozenRecords(ctx: CheckContext): Finding[] {
  if (ctx.base === null) return [];
  const findings: Finding[] = [];
  const headById = recordById(ctx.head);
  for (const b of ctx.base.records) {
    const frozen = (b.kind === 'DEC' && field(b, 'status') === 'accepted') || b.kind === 'EXC';
    if (!frozen) continue;
    const h = headById.get(b.id);
    if (h === undefined) {
      findings.push({ check: 'frozen-records', path: b.path, message: `frozen record ${b.id} was removed` });
      continue;
    }
    for (const message of frozenChanges(b, h)) findings.push({ check: 'frozen-records', path: h.path, message });
  }
  return findings;
}

export function specAmendments(ctx: CheckContext): Finding[] {
  if (ctx.base === null) return [];
  const findings: Finding[] = [];
  const tokens = newAmendments(ctx.base, ctx.head);
  for (const [prefix, baseSpec] of ctx.base.specs) {
    const diff = diffSpec(baseSpec, ctx.head.specs.get(prefix));
    const path = baseSpec.path;
    for (const n of diff.removed) findings.push({ check: 'spec-amendments', path, message: `section ${prefix}§${n} was removed or renumbered` });
    if (diff.reordered) findings.push({ check: 'spec-amendments', path, message: 'sections changed order' });
    for (const n of diff.changed) {
      if (!tokens.some((t) => covers(t, prefix, n))) {
        findings.push({ check: 'spec-amendments', path, message: `section ${prefix}§${n} changed with no amends: list covering it` });
      }
    }
  }
  return findings;
}

export interface CapLine {
  what: string;
  path: string;
  words: number;
  cap: number;
}

/** Splits CLAUDE.md into rule text and example text (lines in `>` blocks). */
export function splitClaude(claudeMd: string): { rules: string; examples: string } {
  const lines = claudeMd.split('\n');
  return {
    rules: lines.filter((l) => !l.trimStart().startsWith('>')).join('\n'),
    examples: lines.filter((l) => l.trimStart().startsWith('>')).join('\n'),
  };
}

/** Every capped text and its size ([[DEC-260928-documentation-baseline#clause-28]]). */
export function capLines(model: Model): CapLine[] {
  const lines: CapLine[] = [];
  if (model.claudeMd !== null) {
    const split = splitClaude(model.claudeMd);
    lines.push({ what: 'CLAUDE.md rules', path: 'CLAUDE.md', words: wordCount(split.rules), cap: 2200 });
    lines.push({ what: 'CLAUDE.md examples', path: 'CLAUDE.md', words: wordCount(split.examples), cap: 1500 });
  }
  for (const path of model.docPaths.filter((p) => p.endsWith('/roadmap.md'))) {
    lines.push({ what: 'roadmap', path, words: wordCount(model.files.get(path) ?? ''), cap: 2000 });
  }
  for (const r of model.records) {
    if (r.kind === 'PROC' && r.id.endsWith('-session-start')) lines.push({ what: 'session-start procedure', path: r.path, words: wordCount(r.body), cap: 1000 });
    if (r.kind === 'ITEM' && field(r, 'kind') !== 'plan') lines.push({ what: 'item body', path: r.path, words: wordCount(r.body), cap: 400 });
  }
  return lines;
}

export function caps(ctx: CheckContext): Finding[] {
  return capLines(ctx.head)
    .filter((c) => c.words > c.cap)
    .map((c) => ({ check: 'caps' as const, path: c.path, message: `${c.what} is ${c.words} words; the cap is ${c.cap}` }));
}

export function conflictMarkers(ctx: CheckContext): Finding[] {
  const findings: Finding[] = [];
  for (const path of textPaths(ctx.head)) {
    (ctx.head.files.get(path) ?? '').split('\n').forEach((line, i) => {
      if (CONFLICT_MARKER.test(line)) findings.push({ check: 'conflict-markers', path, line: i + 1, message: 'conflict marker' });
    });
  }
  return findings;
}

// Written in two parts so this file does not itself cite the folder.
const SCRATCH = 'scratch' + '/';

export function scratch(ctx: CheckContext): Finding[] {
  const findings: Finding[] = [];
  for (const path of textPaths(ctx.head).filter((p) => p !== '.gitignore')) {
    stripCode(ctx.head.files.get(path) ?? '')
      .split('\n')
      .forEach((line, i) => {
        if (/(^|[^A-Za-z0-9_./-])scratch\//.test(line)) findings.push({ check: 'scratch', path, line: i + 1, message: `cites ${SCRATCH}` });
      });
  }
  return findings;
}

/** The guide section for people using the toys ([[DEC-260928-documentation-baseline#clause-22]]). */
export const USER_SECTION = 'Using the toys';

export function userSections(ctx: CheckContext): Finding[] {
  const findings: Finding[] = [];
  for (const path of ctx.head.docPaths.filter((p) => /\/guide\/[^/]+\.md$/.test(p))) {
    for (const s of level2Sections(ctx.head.files.get(path) ?? '').filter((x) => x.heading === USER_SECTION)) {
      const names = [
        ...s.text.matchAll(/\b(?:DEC|EXC|ITEM|PROC)-\d{6}-[a-z0-9-]+/g),
        ...[...s.text.matchAll(/\b(?:bm|fact|prod|rule)-[a-z0-9-]+/g)].filter((m) => ctx.head.anchors.has(m[0])),
        ...s.text.matchAll(/§\d/g),
      ];
      for (const m of names) findings.push({ check: 'user-sections', path, message: `internal name "${m[0]}" in "${USER_SECTION}"` });
    }
  }
  return findings;
}

export function refsLines(ctx: CheckContext): Finding[] {
  return ctx.commits
    .filter((c) => !refsTokens(c.message).some((t) => tokenResolves(t, ctx.head)))
    .map((c) => ({
      check: 'refs-lines' as const,
      message: `commit ${c.sha.slice(0, 7)} ("${c.message.split('\n')[0]}") has no Refs: line naming an existing record or benchmark`,
    }));
}

export function ruleTags(ctx: CheckContext): Finding[] {
  const findings: Finding[] = [];
  (ctx.head.claudeMd ?? '').split('\n').forEach((line, i) => {
    if (/^\s*[-*]\s+\*\*rule-[a-z0-9-]+\.\*\*/.test(line) && !/\*\*\s+\[(check|review|conduct)\]/.test(line)) {
      findings.push({ check: 'rule-tags', path: 'CLAUDE.md', line: i + 1, message: 'rule has no [check], [review] or [conduct] tag' });
    }
  });
  return findings;
}

export function planStubs(ctx: CheckContext): Finding[] {
  return ctx.head.records
    .filter((r) => r.kind === 'ITEM' && field(r, 'kind') === 'plan' && field(r, 'status') === 'closed')
    .filter((r) => !/\b[0-9a-f]{7,40}\b/.test(r.body))
    .map((r) => ({ check: 'plan-stubs' as const, path: r.path, message: 'a closed plan is a stub naming the commit that holds the full plan' }));
}

export function runCheck(id: CheckId, ctx: CheckContext, grammar: Grammar): Finding[] {
  switch (id) {
    case 'citations':
      return citations(ctx, grammar);
    case 'unique-names':
      return uniqueNames(ctx);
    case 'front-matter':
      return frontMatter(ctx);
    case 'frozen-records':
      return frozenRecords(ctx);
    case 'spec-amendments':
      return specAmendments(ctx);
    case 'caps':
      return caps(ctx);
    case 'conflict-markers':
      return conflictMarkers(ctx);
    case 'scratch':
      return scratch(ctx);
    case 'user-sections':
      return userSections(ctx);
    case 'refs-lines':
      return refsLines(ctx);
    case 'rule-tags':
      return ruleTags(ctx);
    case 'plan-stubs':
      return planStubs(ctx);
    default: {
      const exhaustive: never = id;
      return exhaustive;
    }
  }
}

export function runAll(ctx: CheckContext): Finding[] {
  const grammar = grammarFrom(ctx.head.claudeMd ?? '');
  return CHECK_IDS.flatMap((id) => runCheck(id, ctx, grammar));
}

