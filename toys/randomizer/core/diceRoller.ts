// The dice roller core ([[randomizer§5]], [[randomizer§8]]). A separate core
// from the randomizer's. Plain data in and out, no platform imports ([[§3]]).

export type RollRequest =
  | { readonly kind: 'roll'; readonly faces: number; readonly quantity: number }
  | { readonly kind: 'invalid-entry' }
  | { readonly kind: 'blocked' };

/** Whether the "Faces:" field may hold this text: up to three digits ([[randomizer§8 item 1]]). */
export function isFacesEntry(text: string): boolean {
  return /^\d{0,3}$/.test(text);
}

/** Whether the "Quantity:" field may hold this text: up to two digits ([[randomizer§8 item 4]]). */
export function isQuantityEntry(text: string): boolean {
  return /^\d{0,2}$/.test(text);
}

/**
 * What a roll does with the two fields' text ([[randomizer§8]]). Faces below 2
 * is an invalid entry, and that warning wins over a blocked roll
 * ([[randomizer§8 item 7]]). Empty faces, or a quantity of 0, blocks the roll;
 * an empty quantity rolls one die.
 */
export function rollRequest(facesText: string, quantityText: string): RollRequest {
  if (!isFacesEntry(facesText) || !isQuantityEntry(quantityText)) return { kind: 'invalid-entry' };
  const faces = facesText === '' ? null : Number(facesText);
  if (faces !== null && faces < 2) return { kind: 'invalid-entry' };
  const quantity = quantityText === '' ? 1 : Number(quantityText);
  if (faces === null || quantity === 0) return { kind: 'blocked' };
  return { kind: 'roll', faces, quantity };
}

/**
 * One whole number from 1 to `faces` per value from the host's randomness
 * source, each from 0 (inclusive) to 1 (exclusive), in order, not totaled
 * ([[randomizer§5]], [[§5]]).
 */
export function roll(faces: number, randoms: readonly number[]): number[] {
  return randoms.map((r) => 1 + Math.floor(r * faces));
}
