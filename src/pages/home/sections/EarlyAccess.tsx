import type { CtaMode, LandingConfig } from '../../../types/landing';
import { ClaimsGrid, Qualifier } from '../../../components/ClaimsList';
import { EarlyAccessCta } from '../../../components/EarlyAccessCta';

/**
 * The home page's Early Access section.
 *
 * The claims as cards on the left; the headline, the button and the
 * qualifier on the right. One column on a phone. There is no form here: a
 * visitor who wants in goes to /vfarm, where the qualifying language sits
 * next to the thing it qualifies.
 *
 * The qualifier sits directly under the button: the button is a commercial
 * call to action wherever it appears, so the line that qualifies it appears
 * wherever it does.
 */
export function EarlyAccess({ config, ctaMode }: { config: LandingConfig; ctaMode: CtaMode }) {
  const copy = config.early_access;
  return (
    <section className="container section" id="early-access">
      <div className="card card-pad-lg ea-home">
        <div className="ea-home-claims">
          <ClaimsGrid claims={config.supporting_claims} />
        </div>
        <div className="ea-home-ask stack">
          <div className="stack section-head-tight">
            <span className="t-kicker">Early access</span>
            <h2 className="t-title">{copy.headline}</h2>
          </div>
          <div className="stack cta-block">
            <EarlyAccessCta config={config} ctaMode={ctaMode} className="btn-fit" />
            <Qualifier text={copy.qualifier} />
          </div>
        </div>
      </div>
    </section>
  );
}
