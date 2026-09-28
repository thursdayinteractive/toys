// Citation grammar and resolution. The allowed forms are read from the
// citation table in CLAUDE.md, so the table stays their only home.

import { stripCode } from './markdown';
import { clausesOf, hasListItem, recordById, supersededClauses, type Model } from './records';

export type Grammar = RegExp[];

const PLACEHOLDERS: Record<string, string> = {
  '<yymmdd>': '\\d{6}',
  '<name>': '[a-z0-9]+(?:-[a-z0-9]+)*',
  '<toy>': '[a-z0-9]+(?:-[a-z0-9]+)*',
  '<n>': '\\d+',
  '<section>': '\\d+(?:\\.\\d+)*',
};

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Compiles the forms in the `| Form | Points to | Example |` table. */
export function grammarFrom(claudeMd: string): Grammar {
  const forms: RegExp[] = [];
  for (const line of claudeMd.split('\n')) {
    const m = /^\|\s*`\[\[(.+?)\]\]`\s*\|/.exec(line);
    if (!m || m[1] === undefined) continue;
    let pattern = escapeRegExp(m[1]);
    for (const [ph, re] of Object.entries(PLACEHOLDERS)) pattern = pattern.split(escapeRegExp(ph)).join(re);
    forms.push(new RegExp(`^${pattern}$`));
  }
  return forms;
}

/** Text inside `[[…]]` that claims to be a citation, by its prefix. */
export function isCitationLike(inner: string): boolean {
  return /^(DEC|EXC|ITEM|PROC|HO|SPEC)-/.test(inner) || /^(bm|fact|prod|rule)-/.test(inner) || /^[a-z0-9-]*§/.test(inner);
}

export interface Citation {
  inner: string;
  line: number;
}

/** Citations in a file's text, outside code spans and fences. */
export function scanCitations(text: string): Citation[] {
  const found: Citation[] = [];
  stripCode(text)
    .split('\n')
    .forEach((line, i) => {
      for (const m of line.matchAll(/\[\[([^\]\n]+)\]\]/g)) {
        const inner = m[1] ?? '';
        if (isCitationLike(inner)) found.push({ inner, line: i + 1 });
      }
    });
  return found;
}

/** Why a citation fails, or null when it resolves to a live target. */
export function citationProblem(inner: string, model: Model, grammar: Grammar): string | null {
  if (!grammar.some((re) => re.test(inner))) return 'is not one of the citation forms in CLAUDE.md';
  const record = /^((?:DEC|EXC|ITEM|PROC)-[^#]+)(?:#(clause-\d+))?$/.exec(inner);
  if (record) {
    const target = recordById(model).get(record[1] ?? '');
    if (target === undefined) return 'names no record';
    const clause = record[2];
    if (clause === undefined) return null;
    if (!clausesOf(target).has(clause)) return `names no clause of ${target.id}`;
    if (supersededClauses(target).has(clause)) return 'names a superseded clause';
    return null;
  }
  if (/^(bm|fact|prod|rule)-/.test(inner)) return model.anchors.has(inner) ? null : 'names no anchor';
  const spec = /^([a-z0-9-]*)§(\d+(?:\.\d+)*)(?: item (\d+))?$/.exec(inner);
  if (spec) {
    const target = model.specs.get(spec[1] ?? '');
    if (target === undefined) return spec[1] ? `names no spec for toy "${spec[1]}"` : 'names no repository spec';
    const section = target.sections.find((s) => s.number === spec[2]);
    if (section === undefined) return `names no section of ${target.path}`;
    if (spec[3] !== undefined && !hasListItem(section, Number(spec[3]))) return `names no item ${spec[3]} in that section`;
    return null;
  }
  return 'is not one of the citation forms in CLAUDE.md';
}
