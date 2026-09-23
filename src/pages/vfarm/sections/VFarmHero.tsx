import type { LandingConfig } from '../../../types/landing';
import { RenderPanel } from '../../../components/RenderPanel';
import { HeroStats } from '../../../components/StatusTiles';
import { showsEngineData } from '../../../lib/provenance';

/**
 * The vFarm hero. The h1 is `early_access.headline` — the page's one heading,
 * and the config's own words for what this page is. The status tiles sit
 * under it as small stats rather than stranded at the foot of the page.
 */
export function VFarmHero({ config }: { config: LandingConfig }) {
  const tile = config.status_tile;
  return (
    <section className="hero hero-compact">
      <div className="wash" aria-hidden="true" />
      <div className={`container hero-inner${config.render_asset ? '' : ' hero-inner-solo'}`}>
        <div className="hero-copy stack">
          <h1 className="t-title-xl">{config.early_access.headline}</h1>
          {config.early_access.body && (
            <p className="t-body-lg dim hero-subhead">{config.early_access.body}</p>
          )}
          <HeroStats tile={tile} />
          {/* True only while something upstream is actually writing a tile. */}
          {showsEngineData(tile) && <p className="t-kicker">Written by the engine, not by hand</p>}
        </div>
        {/* Only an approved asset renders; with none, the column is not there. */}
        {config.render_asset && (
          <div className="hero-render">
            <RenderPanel asset={config.render_asset} tile={tile} />
          </div>
        )}
      </div>
    </section>
  );
}
