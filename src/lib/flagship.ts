/**
 * The flagship date.
 *
 * Fixed by the 10/31 contract, so it lives in code rather than in copy: a
 * countdown somebody can hand-edit is a countdown that can be wrong.
 */
export const FLAGSHIP_DATE = '2026-10-31';

/**
 * Whole days from today to the flagship date, computed live on every load.
 *
 * Both ends are taken as UTC calendar days so the answer does not change with
 * the reader's clock time, only with their date. Negative once the date has
 * passed, which the caller decides what to do with.
 */
export function daysToFlagship(now: Date = new Date()): number {
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const [y, m, d] = FLAGSHIP_DATE.split('-').map(Number);
  return Math.round((Date.UTC(y, m - 1, d) - today) / 86_400_000);
}
