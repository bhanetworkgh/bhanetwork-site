import type { StatusTile } from '../types/landing';
import { SampleTag } from './Tag';

/**
 * Four tiles, read from `status_tile` in the config.
 *
 * ── LIVE-DATA SEAM ──────────────────────────────────────────────────────────
 * Nothing here calls a vFarm API, and nothing on this site does. The values
 * are whatever the config says, and `status_tile.source` records where they
 * came from — today, always "static".
 *
 * When a live feed arrives, it slots in at exactly one place: the caller
 * swaps the `tile` prop for a fetched one and sets `source` to name the feed.
 * This component does not change. While `sample` is true, every tile wears the
 * Sample pill, so placeholder numbers can never pass for readings.
 * ────────────────────────────────────────────────────────────────────────────
 */

export function StatusTiles({ tile }: { tile: StatusTile }) {
  if (!tile.enabled) return null;

  const tiles = [
    { label: 'Days to the flagship', value: tile.days_to_flagship, mono: false },
    { label: 'Spec version', value: tile.spec_version, mono: false },
    { label: 'Config', value: tile.config_hash, mono: true },
    { label: 'Last level-up', value: tile.last_level_up, mono: false },
  ].filter((t) => t.value !== '');

  if (tiles.length === 0) return null;

  return (
    <ul className="status-row">
      {tiles.map((t) => (
        <li key={t.label} className="card card-pad status-tile">
          <div className="status-tile-head">
            <span className="t-kicker">{t.label}</span>
            <SampleTag when={tile.sample} />
          </div>
          <span className={`t-title-sm ${t.mono ? 'mono' : 'tabular'}`}>{t.value}</span>
        </li>
      ))}
    </ul>
  );
}
