import type { CtaMode, LandingConfig } from '../../../types/landing';
import { EarlyAccessForm } from '../../../components/EarlyAccessForm';
import { Qualifier } from '../../../components/ClaimsList';

/**
 * The second ask, at the foot of the page. Same component, same endpoint,
 * same three fields — so a lead from here is indistinguishable upstream from
 * one taken higher up the page.
 */
export function BuildLog({ config, ctaMode }: { config: LandingConfig; ctaMode: CtaMode }) {
  if (ctaMode === 'none') return null;
  return (
    <section className="container section">
      <div className="card card-pad-lg">
        <div className="section-head stack">
          <h2 className="t-title">Get the build log before it goes public</h2>
          <p className="t-body-lg dim">
            One email a week: what the engine did, what broke, and where vFarm actually is.
          </p>
        </div>
        <EarlyAccessForm config={config} ctaMode={ctaMode} sourcePage="/" />
        <Qualifier text={config.early_access.qualifier} />
      </div>
    </section>
  );
}
