import type { CtaMode, LandingConfig } from '../../../types/landing';
import { RenderPanel } from '../../../components/RenderPanel';
import { Qualifier } from '../../../components/ClaimsList';

/**
 * The hero.
 *
 * Every word of it is config: the kicker, the headline, the subhead. The one
 * string written here is the pending marker, which is a note about the config
 * rather than a claim about vFarm — it says a headline is still owed.
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
  const { home, status_tile } = config;

  return (
    <section className="hero">
      <div className="wash" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy stack">
          {home.kicker && <span className="t-kicker">{home.kicker}</span>}
          {home.headline_pending && (
            <span className="pending-marker t-body">Pending — Jason's headline</span>
          )}
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
        <div className="hero-render">
          <RenderPanel tile={status_tile} />
        </div>
      </div>
    </section>
  );
}
