// Record kinds and their front matter. Front matter is a block of
// `key: value` lines; the value is everything after the first colon.
// Kinds and fields follow the documentation baseline's clauses on
// decisions, exceptions, items and procedures.

export type RecordKind = 'DEC' | 'EXC' | 'ITEM' | 'PROC';
export const RECORD_KINDS: readonly RecordKind[] = ['DEC', 'EXC', 'ITEM', 'PROC'];

/** The folder, under a `docs/` folder, that holds each kind. */
export function folderOf(kind: RecordKind): string {
  switch (kind) {
    case 'DEC':
      return 'decisions';
    case 'EXC':
      return 'architecture/exceptions';
    case 'ITEM':
      return 'items';
    case 'PROC':
      return 'procedures';
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

interface FieldSpec {
  required: boolean;
  values?: readonly string[];
}

function schemaFor(kind: RecordKind): Record<string, FieldSpec> {
  switch (kind) {
    case 'DEC':
      return { status: { required: true, values: ['proposed', 'accepted'] } };
    case 'EXC':
      return {
        deviates_from: { required: true },
        status: { required: true, values: ['active', 'retired'] },
        review_when: { required: true },
        amendment_candidate: { required: true, values: ['yes', 'no'] },
      };
    case 'ITEM':
      return {
        kind: { required: true, values: ['task', 'decision'] },
        status: { required: true, values: ['open', 'blocked', 'closed'] },
        queued: { required: false, values: ['yes', 'no'] },
        phase: { required: false },
        benchmark: { required: false },
        blocked_on: { required: false },
      };
    case 'PROC':
      return { governance: { required: true, values: ['yes', 'no'] } };
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

export type Fields = Map<string, string>;

/** Parses front matter lines. Returns the fields and any errors. */
export function parseFields(block: string): { fields: Fields; errors: string[] } {
  const fields: Fields = new Map();
  const errors: string[] = [];
  for (const line of block.split('\n')) {
    if (line.trim() === '') continue;
    const colon = line.indexOf(':');
    if (colon <= 0) {
      errors.push(`front matter line is not "key: value": ${line}`);
      continue;
    }
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();
    if (fields.has(key)) errors.push(`duplicate front matter key: ${key}`);
    if (value === '') errors.push(`empty front matter value: ${key}`);
    fields.set(key, value);
  }
  return { fields, errors };
}

/** Validates a record's fields against its kind. `id` must equal the file's name. */
export function validateFields(kind: RecordKind, id: string, fields: Fields): string[] {
  const errors: string[] = [];
  if (fields.get('id') !== id) errors.push(`id must be ${id}`);
  const schema = schemaFor(kind);
  for (const [key, value] of fields) {
    if (key === 'id') continue;
    const spec = schema[key];
    if (spec === undefined) {
      errors.push(`unknown front matter key for ${kind}: ${key}`);
      continue;
    }
    if (spec.values !== undefined && !spec.values.includes(value)) {
      errors.push(`${key} must be one of ${spec.values.join(' | ')}, not "${value}"`);
    }
  }
  for (const [key, spec] of Object.entries(schema)) {
    if (spec.required && !fields.has(key)) errors.push(`missing front matter key: ${key}`);
  }
  if (kind === 'ITEM') {
    const status = fields.get('status');
    if (status === 'blocked' && (!fields.has('blocked_on') || !fields.has('phase'))) {
      errors.push('a blocked item needs blocked_on and phase');
    }
    const benchmark = fields.get('benchmark');
    if (benchmark !== undefined && !benchmark.startsWith('bm-')) errors.push('benchmark must be a bm- anchor');
  }
  return errors;
}
