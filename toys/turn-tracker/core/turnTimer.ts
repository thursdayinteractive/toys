// The turn timer ([[turn-tracker§2]]). The host passes in the time the turn
// started and the time now, in milliseconds; this core never reads a clock
// ([[§5]]). Plain data in and out ([[§3]]).

export const DRAGON_AT_MS = 120_000;
export const GROW_AT_MS = 150_000;
export const FULL_AT_MS = 180_000;

const START_FLASHES_PER_S = 1;
const FULL_FLASHES_PER_S = 5;

/** What the turn timer shows: the time, or the dragon. */
export type TurnView =
  | { readonly kind: 'time'; readonly text: string }
  | {
      readonly kind: 'dragon';
      /** From 0 at its starting size to 1 filling the screen. */
      readonly growth: number;
      /** False during the off half of a flash. */
      readonly visible: boolean;
    };

export function turnView(startedAt: number, now: number): TurnView {
  const elapsed = Math.max(0, now - startedAt);
  if (elapsed < DRAGON_AT_MS) return { kind: 'time', text: formatTime(elapsed) };
  if (elapsed < GROW_AT_MS) return { kind: 'dragon', growth: 0, visible: true };
  const growMs = Math.min(elapsed, FULL_AT_MS) - GROW_AT_MS;
  const growth = growMs / (FULL_AT_MS - GROW_AT_MS);
  return { kind: 'dragon', growth, visible: flashesSinceGrowing(elapsed) % 1 < 0.5 };
}

/** Minutes and seconds, counting up from 0:00. */
function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

/**
 * Flashes completed since 2:30. The rate rises evenly from one to five a
 * second until 3:00 and stays at five, so the count is the area under that
 * rate: the dragon never jumps between on and off as the rate changes.
 */
function flashesSinceGrowing(elapsed: number): number {
  const rampS = (FULL_AT_MS - GROW_AT_MS) / 1000;
  const t = Math.min(elapsed - GROW_AT_MS, FULL_AT_MS - GROW_AT_MS) / 1000;
  const rise = (FULL_FLASHES_PER_S - START_FLASHES_PER_S) / rampS;
  const ramped = START_FLASHES_PER_S * t + (rise * t * t) / 2;
  const afterS = Math.max(0, elapsed - FULL_AT_MS) / 1000;
  return ramped + FULL_FLASHES_PER_S * afterS;
}
