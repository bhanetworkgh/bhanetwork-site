import type { LandingConfig } from '../../../types/landing';
import { RenderPanel } from '../../../components/RenderPanel';

/**
 * The vFarm hero. The h1 is `early_access.headline` — the page's one heading,
 * and the config's own words for what this page is.
 */
export function VFarmHero({ config }: { config: LandingConfig }) {
  return (
    <section className="hero">
      <div className="wash" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy stack">
          <h1 className="t-title-xl">{config.early_access.headline}</h1>
          {config.early_access.body && (
            <p className="t-body-lg dim hero-subhead">{config.early_access.body}</p>
          )}
        </div>
        <div className="hero-render">
          <RenderPanel tile={config.status_tile} />
        </div>
      </div>
    </section>
  );
}
