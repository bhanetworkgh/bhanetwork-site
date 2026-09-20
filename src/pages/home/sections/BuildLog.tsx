import type { CtaMode, LandingConfig } from '../../../types/landing';
import { EarlyAccessCta } from '../../../components/EarlyAccessCta';
import { Qualifier } from '../../../components/ClaimsList';

/**
 * The second ask, at the foot of the page. It keeps its heading and its body
 * and gets the same button as everywhere else — it does not collect an email
 * inline. Every lead on this site is taken on /vfarm.
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
        <EarlyAccessCta config={config} ctaMode={ctaMode} />
        <Qualifier text={config.early_access.qualifier} />
      </div>
    </section>
  );
}
