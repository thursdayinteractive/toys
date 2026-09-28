// The brief, shown at session start
// ([[DEC-260928-documentation-baseline#clause-36]]).

import type { Flight } from './branches';
import { wordCount } from './markdown';
import { field, type DocRecord, type Model } from './records';

function titleOf(r: DocRecord): string {
  const m = /^# (.+)$/m.exec(r.body);
  return m ? (m[1] ?? '').trim() : '';
}

function itemLine(r: DocRecord): string {
  return `- ${r.id}: ${titleOf(r)}`;
}

/** The `## Now` text of each roadmap, labeled by its folder. */
function nowSections(model: Model): string[] {
  const lines: string[] = [];
  for (const path of model.docPaths.filter((p) => p.endsWith('/roadmap.md'))) {
    const text = model.files.get(path) ?? '';
    const m = /^## Now\n([\s\S]*?)(?=^## |$(?![\s\S]))/m.exec(text);
    const label = path === 'docs/roadmap.md' ? 'Repository' : path.split('/')[1] ?? path;
    lines.push(`${label}: ${(m?.[1] ?? '(no Now section)').trim().replace(/\n+/g, ' ')}`);
  }
  return lines;
}

/** Facts whose `recheck_after` date has passed. */
function staleFacts(model: Model, today: string): string[] {
  const lines: string[] = [];
  for (const path of model.docPaths.filter((p) => /\/facts\/[^/]+\.md$/.test(p))) {
    for (const line of (model.files.get(path) ?? '').split('\n')) {
      const due = /recheck_after: (\d{4}-\d{2}-\d{2})/.exec(line)?.[1];
      const name = /\*\*(fact-[a-z0-9-]+)\.\*\*/.exec(line)?.[1];
      if (due !== undefined && name !== undefined && due < today) lines.push(`- ${name} (recheck after ${due})`);
    }
  }
  return lines;
}

function section(title: string, lines: string[]): string {
  return `## ${title}\n${lines.length ? lines.join('\n') : '- none'}\n`;
}

export function brief(model: Model, flights: Flight[], today: string): string {
  const items = model.records.filter((r) => r.kind === 'ITEM');
  const is = (r: DocRecord, key: string, value: string): boolean => field(r, key) === value;
  const queued = items.filter((r) => is(r, 'queued', 'yes') && (is(r, 'status', 'open') || is(r, 'status', 'blocked')));
  const backlog = items.filter((r) => is(r, 'status', 'open') && !is(r, 'queued', 'yes') && !is(r, 'kind', 'decision'));
  const awaiting = [
    ...items.filter((r) => is(r, 'status', 'open') && is(r, 'kind', 'decision')).map(itemLine),
    ...model.records.filter((r) => r.kind === 'DEC' && is(r, 'status', 'proposed')).map((r) => `- ${r.id} (proposed): ${titleOf(r)}`),
  ];
  const blocked = items.filter((r) => is(r, 'status', 'blocked'));
  const phases = [...new Set(blocked.map((r) => field(r, 'phase') ?? '?'))].sort();
  const blockedLines = phases.flatMap((p) => [
    `Phase ${p}:`,
    ...blocked.filter((r) => (field(r, 'phase') ?? '?') === p).map((r) => `${itemLine(r)} (blocked on ${field(r, 'blocked_on') ?? '?'})`),
  ]);
  const parked = items.filter((r) => is(r, 'status', 'parked')).map((r) => `${itemLine(r)} (${field(r, 'branch') ?? field(r, 'pr') ?? ''})`);
  const text = [
    `# Brief, ${today}`,
    '',
    section('Active phase', nowSections(model)),
    section('Queued', queued.map(itemLine)),
    section('Other open tasks and plans', backlog.map(itemLine)),
    section('Awaiting the owner', awaiting),
    section('Blocked', blockedLines),
    section('Parked', parked),
    section('Facts past their recheck date', staleFacts(model, today)),
    section('Other branches in flight', flights.map((f) => `- ${f.branch}: ${f.commits} commit(s), last ${f.lastDate}: ${f.lastSubject}`)),
  ].join('\n');
  const words = wordCount(text);
  return words > 1000 ? `${text}\n(The brief is ${words} words, over its 1,000-word cap: the owner decides what to cut.)\n` : text;
}
