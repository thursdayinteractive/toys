// The documentation checks. Each check is a pure function of the context:
// the documentation at HEAD, at the merge base with main, and the branch's
// commits. The list of checks is the documentation baseline's clause-40
// ([[DEC-260928-documentation-baseline#clause-40]]).

import { citationProblem, grammarFrom, scanCitations, type Grammar } from './citations';
import type { CommitInfo } from './git';
import { CONFLICT_MARKER, level2Sections, stripCode } from './markdown';
import { field, recordById, toyOf, type DocRecord, type Model } from './records';
import { tokenResolves, refsTokens } from './refs';
import { ADDENDA, addendumToken, covers, diffSpec, newAmendments } from './spec';

export type CheckId =
  | 'citations'
  | 'unique-names'
  | 'front-matter'
  | 'frozen-records'
  | 'spec-amendments'
  | 'tiers'
  | 'conflict-markers'
  | 'scratch'
  | 'user-sections'
  | 'refs-lines'
  | 'rule-tags';

export const CHECK_IDS: readonly CheckId[] = [
  'citations',
  'unique-names',
  'front-matter',
  'frozen-records',
  'spec-amendments',
  'tiers',
  'conflict-markers',
  'scratch',
  'user-sections',
  'refs-lines',
  'rule-tags',
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

/**
 * Changes to the repository spec and its addenda need a new amends: list
 * ([[DEC-260928-documentation-baseline#clause-12]], [[DEC-260928-documentation-baseline#clause-42]]).
 * A toy's spec is edited in place with the owner's approval, so it is not checked.
 */
export function specAmendments(ctx: CheckContext): Finding[] {
  if (ctx.base === null) return [];
  const findings: Finding[] = [];
  const tokens = newAmendments(ctx.base, ctx.head);
  const baseSpec = ctx.base.specs.get('');
  if (baseSpec !== undefined) {
    const diff = diffSpec(baseSpec, ctx.head.specs.get(''));
    const path = baseSpec.path;
    for (const n of diff.removed) findings.push({ check: 'spec-amendments', path, message: `section §${n} was removed or renumbered` });
    if (diff.reordered) findings.push({ check: 'spec-amendments', path, message: 'sections changed order' });
    for (const n of diff.changed) {
      if (!tokens.some((t) => covers(t, '', n))) {
        findings.push({ check: 'spec-amendments', path, message: `section §${n} changed with no amends: list covering it` });
      }
    }
  }
  for (const [path, text] of ctx.base.files) {
    if (!path.startsWith(ADDENDA) || !path.endsWith('.md') || ctx.head.files.get(path) === text) continue;
    const token = addendumToken(path);
    if (!tokens.includes(token)) findings.push({ check: 'spec-amendments', path, message: `addendum changed with no amends: [${token}] covering it` });
  }
  return findings;
}

/** Where a citation's target lives: a toy's folder name, or null for the repository tier. */
function targetToy(inner: string, model: Model): string | null {
  const spec = /^([a-z0-9-]*)§/.exec(inner);
  if (spec) return spec[1] ? (spec[1] ?? null) : null;
  const record = /^((?:DEC|EXC|ITEM|PROC)-[^#]+)/.exec(inner);
  if (record) {
    const r = recordById(model).get(record[1] ?? '');
    return r === undefined ? null : toyOf(r.path);
  }
  const defs = model.anchors.get(inner) ?? [];
  const toys = defs.map(toyOf);
  return toys.length > 0 && toys.every((t) => t !== null) ? (toys[0] ?? null) : null;
}

/**
 * The repository tier cites no toy, and a toy cites no other toy
 * ([[DEC-260928-documentation-baseline#clause-7]]).
 */
export function tiers(ctx: CheckContext): Finding[] {
  const findings: Finding[] = [];
  for (const path of textPaths(ctx.head)) {
    const from = path.startsWith('toys/') ? (path.split('/')[1] ?? null) : null;
    for (const c of scanCitations(ctx.head.files.get(path) ?? '')) {
      const to = targetToy(c.inner, ctx.head);
      if (to === null || to === from) continue;
      const message = from === null ? `the repository tier cites toy "${to}": [[${c.inner}]]` : `toy "${from}" cites toy "${to}": [[${c.inner}]]`;
      findings.push({ check: 'tiers', path, line: c.line, message });
    }
  }
  return findings;
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
    case 'tiers':
      return tiers(ctx);
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

