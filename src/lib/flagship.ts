/**
 * The vFarm launch countdown target.
 *
 * Fixed by the 10/31 contract, so it lives in code rather than in copy: a
 * countdown somebody can hand-edit is a countdown that can be wrong.
 *
 * The previous site counted whole UTC calendar days to 2026-10-31, so the
 * target here is the same date and time zone: 31 October 2026 at 00:00 UTC.
 */
export const FLAGSHIP_AT = Date.UTC(2026, 9, 31, 0, 0, 0);

export interface Remaining {
  done: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Time left until the target, in whole units. All zero once it has passed. */
export function remaining(now: number): Remaining {
  const ms = Math.max(0, FLAGSHIP_AT - now);
  const s = Math.floor(ms / 1000);
  return {
    done: ms === 0,
    days: Math.floor(s / 86_400),
    hours: Math.floor((s % 86_400) / 3_600),
    minutes: Math.floor((s % 3_600) / 60),
    seconds: s % 60,
  };
}
