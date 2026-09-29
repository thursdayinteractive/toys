// The talk clicker ([[turn-tracker§3]]): four counters, one per person.
// Plain data in and out ([[§3]]).

export type Counts = readonly [number, number, number, number];

/** Four counters at 0: the start, and what Reset returns to. */
export const NO_CLICKS: Counts = [0, 0, 0, 0];

/** The counts with one added to the counter at this corner, 0 to 3. */
export function click(counts: Counts, corner: 0 | 1 | 2 | 3): Counts {
  const next: [number, number, number, number] = [...counts];
  next[corner] += 1;
  return next;
}
