// Shared builders for the documentation tools' tests. Citation brackets are
// joined from pieces so test files hold no live citations of their own.

import type { CheckContext } from './checks';
import { buildModel, type Model } from './records';

export const L = '[' + '[';
export const R = ']' + ']';
export const cite = (inner: string): string => L + inner + R;

export const CLAUDE_TABLE = [
  '| Form | Points to | Example |',
  '|---|---|---|',
  '| `' + cite('DEC-<yymmdd>-<name>') + '` | a decision | x |',
  '| `' + cite('DEC-<yymmdd>-<name>#clause-<n>') + '` | a clause | x |',
  '| `' + cite('ITEM-<yymmdd>-<name>') + '` | an item | x |',
  '| `' + cite('bm-<name>') + '` | a benchmark | x |',
  '| `' + cite('rule-<name>') + '` | a rule | x |',
  '| `' + cite('§<section>') + '` | a spec section | x |',
  '| `' + cite('§<section> item <n>') + '` | a spec item | x |',
  '| `' + cite('<toy>§<section>') + '` | a toy spec section | x |',
].join('\n');

export const DEC_ACCEPTED = [
  '---',
  'id: DEC-260101-sample',
  'status: accepted',
  '---',
  '# Sample',
  '',
  '## Clauses',
  '',
  '- **clause-1.** **One.** First.',
  '- **clause-2.** **Two.** Second.',
  '',
  '## Options considered',
  '',
  'None.',
  '',
].join('\n');

export const SPEC = [
  '# Spec',
  '',
  '# 1. First',
  '',
  'Text.',
  '',
  '# 2. Second',
  '',
  '1. An item.',
  '',
  '## 2.1 Sub',
  '',
  'Sub text.',
  '',
].join('\n');

export function model(files: Record<string, string>): Model {
  return buildModel(new Map(Object.entries(files)));
}

export const BASE_FILES: Record<string, string> = {
  'CLAUDE.md': '# Rules\n\n- **rule-one.** [conduct] A rule.\n\n' + CLAUDE_TABLE + '\n',
  'docs/decisions/DEC-260101-sample.md': DEC_ACCEPTED,
  'docs/architecture/Architecture.md': SPEC,
  'docs/roadmap.md': '# Roadmap\n\n## Now\nPhase 1.\n\n- **bm-first.** First. Status: not started.\n',
};

export function ctx(head: Record<string, string>, base: Record<string, string> | null = BASE_FILES): CheckContext {
  return { head: model(head), base: base === null ? null : model(base), commits: [] };
}
