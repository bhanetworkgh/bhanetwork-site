import type { CtaMode, LandingConfig } from '../../../types/landing';
import { ClaimsList, Qualifier } from '../../../components/ClaimsList';
import { EarlyAccessCta } from '../../../components/EarlyAccessCta';

/**
 * The home page's Early Access section.
 *
 * The headline and the claim lines stay; the form does not. A visitor who
 * wants in goes to /vfarm, where the qualifying language sits next to the
 * thing it qualifies.
 *
 * The qualifier renders here too: the button is a commercial call to action
 * wherever it appears, so the line that qualifies it appears wherever it does.
 */
export function EarlyAccess({ config, ctaMode }: { config: LandingConfig; ctaMode: CtaMode }) {
  const copy = config.early_access;
  return (
    <section className="container section" id="early-access">
      <div className="card card-pad-lg early-access">
        <div className="section-head stack">
          <span className="t-kicker">Early access</span>
          <h2 className="t-title">{copy.headline}</h2>
        </div>
        <ClaimsList claims={config.supporting_claims} />
        <EarlyAccessCta config={config} ctaMode={ctaMode} />
        <Qualifier text={copy.qualifier} />
      </div>
    </section>
  );
}
