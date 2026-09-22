import type { StatusTile } from '../../../types/landing';
import { StatusTiles } from '../../../components/StatusTiles';
import { showsEngineData } from '../../../lib/provenance';

export function StatusRow({ tile }: { tile: StatusTile }) {
  if (!tile.enabled) return null;
  return (
    <section className="container section status-section">
      <StatusTiles tile={tile} />
      {/* True only while something upstream is actually writing a tile. */}
      {showsEngineData(tile) && (
        <p className="t-kicker status-caption">Written by the engine, not by hand</p>
      )}
    </section>
  );
}
