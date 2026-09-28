// `Refs:` lines in commit messages. Every line starting `Refs:` is read,
// wherever it sits in the message.

import { recordById, type Model } from './records';

const TOKEN = /^((?:DEC|EXC|ITEM|PROC)-\d{6}-[a-z0-9]+(?:-[a-z0-9]+)*|bm-[a-z0-9]+(?:-[a-z0-9]+)*)(?:#(clause-\d+))?$/;

export function refsTokens(message: string): string[] {
  return message
    .split('\n')
    .filter((l) => l.startsWith('Refs:'))
    .flatMap((l) => l.slice(5).split(/[\s,]+/))
    .filter((t) => t !== '');
}

export function tokenResolves(token: string, model: Model): boolean {
  const m = TOKEN.exec(token);
  if (!m) return false;
  const target = m[1] ?? '';
  if (target.startsWith('bm-')) return model.anchors.has(target);
  const record = recordById(model).get(target);
  if (record === undefined) return false;
  return m[2] === undefined || record.body.includes(`**${m[2]}.**`);
}
