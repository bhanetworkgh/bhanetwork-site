import type { StatusTile } from '../types/landing';
import { daysToFlagship } from '../lib/flagship';
import { showsConfiguration, showsSpecVersion } from '../lib/provenance';

/**
 * The status tiles.
 *
 * A tile renders only when something can prove its value. The rules live in
 * src/lib/provenance.ts; this component asks and renders, and there is no
 * "Sample" pill any more — a tile with nothing behind it is not shown at all.
 *
 * Days to the flagship is the one tile that always shows, because the page
 * works it out from the fixed 31 Oct date on every load rather than reading a
 * number somebody typed.
 */
export function StatusTiles({ tile }: { tile: StatusTile }) {
  if (!tile.enabled) return null;

  const days = daysToFlagship();

  const tiles: { label: string; value: string; mono?: boolean }[] = [];

  /* Past the date the count stops rather than going negative. */
  if (days >= 0) {
    tiles.push({ label: 'Days to the flagship', value: String(days) });
  }
  if (showsSpecVersion(tile)) {
    tiles.push({ label: 'Spec version', value: tile.spec_version });
  }
  if (showsConfiguration(tile)) {
    tiles.push({ label: 'Config', value: tile.config_hash, mono: true });
    tiles.push({ label: 'Last level-up', value: tile.last_level_up });
  }

  if (tiles.length === 0) return null;

  return (
    <ul className="status-row">
      {tiles.map((t) => (
        <li key={t.label} className="card card-pad status-tile">
          <span className="t-kicker">{t.label}</span>
          <span className={`t-title-sm ${t.mono ? 'mono' : 'tabular'}`}>{t.value}</span>
        </li>
      ))}
    </ul>
  );
}
