import { countdown } from '../content/site';
import { useNow } from './Countdown';
import { remaining } from '../lib/flagship';

/** How much of the run-up the bar spans: the sixty days before the launch. */
const RUN_UP_MS = 60 * 86_400_000;

/**
 * "N days to the vFarm launch", with a thin lime bar filling as the date
 * nears. Before hydration there is no clock, so the label is a skeleton and
 * the bar is empty — the pre-rendered HTML never shows a stale number.
 */
export function LaunchBar({
  label,
  end,
  compact = false,
}: {
  label: (days: number) => string;
  end: number;
  compact?: boolean;
}) {
  const now = useNow();
  const days = now === null ? null : remaining(now).days;
  const pct = now === null ? 0 : Math.min(100, Math.max(0, ((now - (end - RUN_UP_MS)) / RUN_UP_MS) * 100));
  return (
    <div className={`launch-bar${compact ? ' is-compact' : ''}`}>
      <div className="launch-bar-text mono">
        {days === null ? <span className="skeleton skeleton-line on-forest" /> : <span>{label(days)}</span>}
        {!compact && <span>{countdown.dateLabel}</span>}
      </div>
      {!compact && (
        <div className="launch-bar-track" aria-hidden="true">
          <span className="launch-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      )}
    </div>
  );
}
