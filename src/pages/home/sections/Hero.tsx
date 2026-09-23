import type { CtaMode, LandingConfig } from '../../../types/landing';
import { RenderPanel } from '../../../components/RenderPanel';
import { Qualifier } from '../../../components/ClaimsList';
import { HeroStats } from '../../../components/StatusTiles';

/**
 * The hero.
 *
 * Every word of it is config: the kicker, the headline, the subhead. Nothing
 * here is written in this file. The status tiles that can be proven sit under
 * the subhead as small stats, as they do on /vfarm.
 */
export function Hero({
  config,
  ctaMode,
  onCta,
}: {
  config: LandingConfig;
  ctaMode: CtaMode;
  onCta: React.ReactNode;
}) {
  const { home, status_tile, render_asset } = config;

  return (
    <section className="hero hero-compact">
      <div className="wash" aria-hidden="true" />
      <div className={`container hero-inner${render_asset ? '' : ' hero-inner-solo'}`}>
        <div className={`hero-copy stack${render_asset ? '' : ' hero-copy-wide'}`}>
          {home.kicker && <span className="t-kicker">{home.kicker}</span>}
          <h1 className="t-title-xl">{home.headline}</h1>
          {home.subhead && <p className="t-body-lg dim hero-subhead">{home.subhead}</p>}
          <HeroStats tile={status_tile} />
          {ctaMode !== 'none' && (
            <div className="stack cta-block">
              <div className="hero-actions">
                {onCta}
                <a className="t-body-lg link" href="#the-build">
                  Watch the build →
                </a>
              </div>
              {/* The button is a commercial call to action, so the line that
                  qualifies it sits directly under it. */}
              <Qualifier text={config.early_access.qualifier} />
            </div>
          )}
        </div>
        {/* Only an approved asset renders; with none, the column is not there. */}
        {render_asset && (
          <div className="hero-render">
            <RenderPanel asset={render_asset} tile={status_tile} />
          </div>
        )}
      </div>
    </section>
  );
}
