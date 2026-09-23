import type { StatusTile } from '../types/landing';
import { daysToFlagship } from '../lib/flagship';
import { showsConfiguration, showsSpecVersion } from '../lib/provenance';

/**
 * The status tiles, shown as small stats in each page's hero.
 *
 * A tile renders only when something can prove its value. The rules live in
 * src/lib/provenance.ts; this file asks and renders, and there is no
 * "Sample" pill any more — a tile with nothing behind it is not shown at all.
 *
 * Days to the flagship is the one tile that always shows, because the page
 * works it out from the fixed 31 Oct date on every load rather than reading a
 * number somebody typed.
 */
export interface ShownTile {
  label: string;
  value: string;
  mono?: boolean;
}

/** The tiles that may show right now, in order. Empty when none may. */
export function shownTiles(tile: StatusTile): ShownTile[] {
  if (!tile.enabled) return [];

  const days = daysToFlagship();

  const tiles: ShownTile[] = [];

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

  return tiles;
}

/**
 * The same tiles as small stats, for a hero. Same provenance rules, same
 * labels — only the size changes.
 */
export function HeroStats({ tile }: { tile: StatusTile }) {
  const tiles = shownTiles(tile);
  if (tiles.length === 0) return null;

  return (
    <ul className="hero-stats">
      {tiles.map((t) => (
        <li key={t.label} className="hero-stat">
          <span className={`hero-stat-value ${t.mono ? 'mono' : 'tabular'}`}>{t.value}</span>
          <span className="t-kicker">{t.label}</span>
        </li>
      ))}
    </ul>
  );
}
