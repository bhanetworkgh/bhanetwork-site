import type { StatusTile } from '../../../types/landing';
import { StatusTiles } from '../../../components/StatusTiles';

export function VFarmStatus({ tile }: { tile: StatusTile }) {
  if (!tile.enabled) return null;
  return (
    <section className="container section status-section">
      <StatusTiles tile={tile} />
      <p className="t-kicker status-caption">Written by the engine, not by hand</p>
    </section>
  );
}
