import type { CtaMode, LandingConfig } from '../../../types/landing';
import { RenderPanel } from '../../../components/RenderPanel';
import { Qualifier } from '../../../components/ClaimsList';

/**
 * The hero.
 *
 * Every word of it is config: the kicker, the headline, the subhead. Nothing
 * here is written in this file. The headline and subhead are Jason's final
 * copy, so the pending marker that used to sit above them is gone.
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
    <section className="hero">
      <div className="wash" aria-hidden="true" />
      <div className={`container hero-inner${render_asset ? '' : ' hero-inner-solo'}`}>
        <div className="hero-copy stack">
          {home.kicker && <span className="t-kicker">{home.kicker}</span>}
          <h1 className="t-title-xl">{home.headline}</h1>
          {home.subhead && <p className="t-body-lg dim hero-subhead">{home.subhead}</p>}
          {ctaMode !== 'none' && (
            <>
              <div className="hero-actions">
                {onCta}
                <a className="t-body-lg link" href="#the-build">
                  Watch the build →
                </a>
              </div>
              {/* The button is a commercial call to action, so the line that
                  qualifies it sits with it rather than further down the page. */}
              <Qualifier text={config.early_access.qualifier} />
            </>
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
