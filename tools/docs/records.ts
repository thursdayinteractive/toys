// Builds the documentation model from file contents: records, anchors and
// specs. Pure over a map of path to text.

import { RECORD_KINDS, folderOf, parseFields, validateFields, type Fields, type RecordKind } from './frontMatter';
import { definedAnchors, level2Sections, splitFrontMatter } from './markdown';

export interface DocRecord {
  id: string;
  kind: RecordKind;
  path: string;
  fields: Fields;
  /** Front matter and placement problems. */
  errors: string[];
  body: string;
}

export interface SpecSection {
  /** `preamble` for the text above section 1. */
  number: string;
  /** The section's own text, without its subsections. */
  text: string;
}

export interface Spec {
  /** '' for the repository spec, the toy's folder name for a toy spec. */
  prefix: string;
  path: string;
  sections: SpecSection[];
}

export interface Model {
  files: Map<string, string>;
  docPaths: string[];
  records: DocRecord[];
  anchors: Map<string, string[]>;
  specs: Map<string, Spec>;
  claudeMd: string | null;
}

const RECORD_NAME = /^(DEC|EXC|ITEM|PROC)-\d{6}-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;
const ANCHOR_PREFIX = /^(bm|fact|prod|rule)-/;
const TOY_DOCS = /^toys\/([a-z0-9]+(?:-[a-z0-9]+)*)\/docs\//;

export function isDocPath(path: string): boolean {
  if (path === 'CLAUDE.md' || path === 'README.md') return true;
  if (!path.endsWith('.md')) return false;
  return path.startsWith('docs/') || TOY_DOCS.test(path);
}

/** The `docs/` root a documentation path sits in: `docs/` or `toys/<toy>/docs/`. */
export function docsRoot(path: string): string | null {
  if (path.startsWith('docs/')) return 'docs/';
  const m = TOY_DOCS.exec(path);
  return m ? m[0] : null;
}

export function toyOf(path: string): string | null {
  const m = TOY_DOCS.exec(path);
  return m ? (m[1] ?? null) : null;
}

function basename(path: string): string {
  return path.slice(path.lastIndexOf('/') + 1);
}

export function recordOf(path: string, text: string): DocRecord | null {
  const name = basename(path);
  if (!RECORD_NAME.test(name)) return null;
  const id = name.slice(0, -3);
  const kind = id.slice(0, id.indexOf('-')) as RecordKind;
  if (!RECORD_KINDS.includes(kind)) return null;
  const errors: string[] = [];
  const root = docsRoot(path);
  if (root === null || path !== `${root}${folderOf(kind)}/${name}`) {
    errors.push(`a ${kind} record belongs in a docs/${folderOf(kind)}/ folder`);
  }
  const { frontMatter, body } = splitFrontMatter(text);
  let fields: Fields = new Map();
  if (frontMatter === null) {
    errors.push('record has no front matter');
  } else {
    const parsed = parseFields(frontMatter);
    fields = parsed.fields;
    errors.push(...parsed.errors, ...validateFields(kind, id, fields));
  }
  return { id, kind, path, fields, errors, body };
}

/** Splits a spec into sections keyed by number (`3`, `4.2`). */
export function specSections(text: string): SpecSection[] {
  const sections: SpecSection[] = [{ number: 'preamble', text: '' }];
  for (const line of text.split('\n')) {
    const m = /^#{1,2} (\d+(?:\.\d+)*)\.? /.exec(line);
    if (m && m[1] !== undefined) sections.push({ number: m[1], text: line + '\n' });
    else {
      const current = sections[sections.length - 1];
      if (current) current.text += line + '\n';
    }
  }
  return sections;
}

export function hasListItem(section: SpecSection, n: number): boolean {
  return section.text.split('\n').some((l) => new RegExp(`^\\s*${n}\\.\\s`).test(l));
}

export function clausesOf(record: DocRecord): Set<string> {
  return new Set([...record.body.matchAll(/\*\*(clause-\d+)\.\*\*/g)].map((m) => m[1] ?? ''));
}

/** Clauses listed as superseded in a decision's `## Supersessions` section. */
export function supersededClauses(record: DocRecord): Set<string> {
  const section = level2Sections(record.body).find((s) => s.heading === 'Supersessions');
  if (!section) return new Set();
  return new Set([...section.text.matchAll(/\b(clause-\d+)\b[^\n]*superseded/g)].map((m) => m[1] ?? ''));
}

/** Benchmark anchors defined as the first cell of a roadmap table row. */
function roadmapTableAnchors(text: string): string[] {
  return [...text.matchAll(/^\|\s*(bm-[a-z0-9-]+)\s*\|/gm)].map((m) => m[1] ?? '');
}

export function buildModel(files: Map<string, string>): Model {
  const docPaths = [...files.keys()].filter(isDocPath).sort();
  const records: DocRecord[] = [];
  const anchors = new Map<string, string[]>();
  const specs = new Map<string, Spec>();
  const addAnchor = (name: string, path: string): void => {
    anchors.set(name, [...(anchors.get(name) ?? []), path]);
  };
  for (const path of docPaths) {
    const text = files.get(path) ?? '';
    const record = recordOf(path, text);
    if (record) records.push(record);
    for (const a of definedAnchors(text, ANCHOR_PREFIX)) addAnchor(a, path);
    if (path.endsWith('/roadmap.md')) for (const a of roadmapTableAnchors(text)) addAnchor(a, path);
    if (path.endsWith('/architecture/Architecture.md')) {
      const root = docsRoot(path);
      if (root !== null && path === `${root}architecture/Architecture.md`) {
        const prefix = toyOf(path) ?? '';
        specs.set(prefix, { prefix, path, sections: specSections(text) });
      }
    }
  }
  return { files, docPaths, records, anchors, specs, claudeMd: files.get('CLAUDE.md') ?? null };
}

export function field(record: DocRecord, key: string): string | undefined {
  return record.fields.get(key);
}

export function recordById(model: Model): Map<string, DocRecord> {
  return new Map(model.records.map((r) => [r.id, r]));
}
