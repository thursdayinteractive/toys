// Spec changes and the amendments that must cover them. A spec that exists
// on the main branch has been through an approved merge, so every change to
// it needs an `amends:` list on a decision clause added on the branch.

import { clausesOf, type DocRecord, type Model, type Spec } from './records';

export interface SpecDiff {
  changed: string[];
  removed: string[];
  reordered: boolean;
}

export function diffSpec(base: Spec, head: Spec | undefined): SpecDiff {
  if (head === undefined) return { changed: [], removed: base.sections.map((s) => s.number), reordered: false };
  const headByNumber = new Map(head.sections.map((s) => [s.number, s.text]));
  const changed: string[] = [];
  const removed: string[] = [];
  for (const s of base.sections) {
    const now = headByNumber.get(s.number);
    if (now === undefined) removed.push(s.number);
    else if (now.trimEnd() !== s.text.trimEnd()) changed.push(s.number);
  }
  const baseOrder = base.sections.map((s) => s.number);
  const headOrder = head.sections.map((s) => s.number).filter((n) => baseOrder.includes(n));
  const reordered = headOrder.join(',') !== baseOrder.filter((n) => headOrder.includes(n)).join(',');
  for (const s of head.sections) if (!baseOrder.includes(s.number)) changed.push(s.number);
  return { changed, removed, reordered };
}

/** The text of each clause of a decision, keyed by clause name. */
function clauseTexts(record: DocRecord): Map<string, string> {
  const result = new Map<string, string>();
  const parts = record.body.split(/(?=^- \*\*clause-\d+\.\*\*)/m);
  for (const part of parts) {
    const m = /^- \*\*(clause-\d+)\.\*\*/.exec(part);
    if (m && m[1] !== undefined) result.set(m[1], part.split(/^## /m)[0] ?? part);
  }
  return result;
}

/** `amends:` tokens on decision clauses that are new or changed since the base. */
export function newAmendments(base: Model | null, head: Model): string[] {
  const baseClauses = new Map<string, string>();
  for (const r of base?.records ?? []) {
    if (r.kind !== 'DEC') continue;
    for (const [c, t] of clauseTexts(r)) baseClauses.set(`${r.id}#${c}`, t);
  }
  const tokens: string[] = [];
  for (const r of head.records) {
    if (r.kind !== 'DEC' || clausesOf(r).size === 0) continue;
    for (const [c, t] of clauseTexts(r)) {
      if (baseClauses.get(`${r.id}#${c}`) === t) continue;
      for (const m of t.matchAll(/^\s*amends: \[([^\]]*)\]/gm)) {
        tokens.push(...(m[1] ?? '').split(',').map((s) => s.trim()).filter((s) => s !== ''));
      }
    }
  }
  return tokens;
}

/** The folder of the repository spec's addenda. */
export const ADDENDA = 'docs/architecture/addenda/';

/** The amends: token that covers an addendum: `addenda/<file name without .md>`. */
export function addendumToken(path: string): string {
  return 'addenda/' + path.slice(ADDENDA.length).replace(/\.md$/, '');
}

/** Whether an amendment token (`§3`, `randomizer§3.1`) covers a section of a spec. */
export function covers(token: string, specPrefix: string, section: string): boolean {
  const m = /^([a-z0-9-]*)§(\d+(?:\.\d+)*)$/.exec(token);
  if (!m || (m[1] ?? '') !== specPrefix) return false;
  const n = m[2] ?? '';
  return section === n || section.startsWith(n + '.');
}
