import { useEffect, useState } from 'react';
import { remaining } from '../lib/flagship';
import { countdown } from '../content/site';

/**
 * The current time, ticking once a second — but only after the page has
 * hydrated. The pre-rendered HTML and the first client render both see
 * `null`, so they match, and the numbers fill in a moment later.
 */
export function useNow(): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Days, hours, minutes and seconds to the launch. Shared by Home and /vfarm. */
export function Countdown({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const now = useNow();
  const r = now === null ? null : remaining(now);
  const cells: [string, string][] = [
    [countdown.units.days, r ? String(r.days) : '–'],
    [countdown.units.hours, r ? pad(r.hours) : '–'],
    [countdown.units.minutes, r ? pad(r.minutes) : '–'],
    [countdown.units.seconds, r ? pad(r.seconds) : '–'],
  ];
  return (
    <div className={`countdown countdown-${tone}`}>
      <p className="countdown-label">
        <span>{countdown.label}</span>
        <span className="countdown-date">{countdown.dateLabel}</span>
      </p>
      {/* The seconds tick every second; announcing them would be noise. */}
      <div className="countdown-cells" aria-hidden="true">
        {cells.map(([unit, value]) => (
          <div key={unit} className="countdown-cell">
            <span className="countdown-value tabular">{value}</span>
            <span className="countdown-unit">{unit}</span>
          </div>
        ))}
      </div>
      {r && (
        <p className="sr-only">
          {countdown.label}: {countdown.dateLabel}. {countdown.daysToGo(r.days)}.
        </p>
      )}
    </div>
  );
}
