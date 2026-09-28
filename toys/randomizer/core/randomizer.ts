// The randomizer core ([[randomizer§1]]–[[randomizer§4]], [[DEC-260928-randomizer-weighting]],
// [[DEC-260928-randomizer-input-rules]]). Plain data in and out, no platform imports ([[§3]]).

/** One entry in a randomizer list ([[randomizer§1]]). */
export interface Item {
  readonly label: string;
  readonly multiplier: number;
}

/** Reported when the active set is empty or every multiplier in it is 0 ([[DEC-260928-randomizer-input-rules#clause-7]]). */
export interface NoViableOptions {
  readonly kind: 'no-viable-options';
}

export type ChancesResult =
  | { readonly kind: 'chances'; readonly chances: readonly number[] }
  | NoViableOptions;

export type MultiplierEntryResult =
  | { readonly kind: 'multiplier'; readonly multiplier: number }
  | { readonly kind: 'invalid-entry' };

export type PickResult =
  | { readonly kind: 'picked'; readonly index: number }
  | NoViableOptions;

const NO_VIABLE_OPTIONS: NoViableOptions = { kind: 'no-viable-options' };

function totalMultiplier(activeSet: readonly Item[]): number {
  let total = 0;
  for (const item of activeSet) total += item.multiplier;
  return total;
}

/**
 * Each item's chance, from 0 to 1, in list order: its multiplier over the sum of
 * the active set's multipliers ([[randomizer§2]]). Chances are not rounded.
 */
export function chances(activeSet: readonly Item[]): ChancesResult {
  const total = totalMultiplier(activeSet);
  if (total === 0) return NO_VIABLE_OPTIONS;
  return { kind: 'chances', chances: activeSet.map((item) => item.multiplier / total) };
}

/**
 * Picks one item from the active set with the chances in [[randomizer§2]], using one
 * value from the host's randomness source, from 0 (inclusive) to 1 (exclusive) ([[§5]]).
 * Returns the picked item's position in the list, since labels may repeat.
 */
export function pick(activeSet: readonly Item[], random: number): PickResult {
  const total = totalMultiplier(activeSet);
  if (total === 0) return NO_VIABLE_OPTIONS;
  const target = random * total;
  let running = 0;
  const index = activeSet.findIndex((item) => {
    running += item.multiplier;
    return item.multiplier > 0 && target < running;
  });
  return { kind: 'picked', index };
}

/** Chance as a percentage to two decimal places ([[DEC-260928-randomizer-input-rules#clause-5]]). */
export function formatChance(chance: number): string {
  return `${(chance * 100).toFixed(2)}%`;
}

/**
 * Whether the weight field may hold this text: digits with at most one decimal place,
 * and no minus sign ([[DEC-260928-randomizer-input-rules#clause-3]], [[DEC-260928-randomizer-input-rules#clause-4]]).
 */
export function isMultiplierEntry(text: string): boolean {
  return /^\d*(\.\d?)?$/.test(text);
}

/**
 * The multiplier a weight field's text gives. An empty field gives 1.0
 * ([[DEC-260928-randomizer-input-rules#clause-1]]); a lone decimal point is an invalid
 * entry ([[DEC-260928-randomizer-invalid-entry#clause-1]]).
 */
export function multiplierFromEntry(text: string): MultiplierEntryResult {
  if (text === '') return { kind: 'multiplier', multiplier: 1 };
  if (text === '.' || !isMultiplierEntry(text)) return { kind: 'invalid-entry' };
  return { kind: 'multiplier', multiplier: Number(text) };
}
