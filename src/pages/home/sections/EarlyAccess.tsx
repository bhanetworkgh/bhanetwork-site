import type { CtaMode, LandingConfig } from '../../../types/landing';
import { ClaimsList, Qualifier } from '../../../components/ClaimsList';
import { EarlyAccessForm } from '../../../components/EarlyAccessForm';

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
        <EarlyAccessForm config={config} ctaMode={ctaMode} sourcePage="/" />
        <Qualifier text={copy.qualifier} />
      </div>
    </section>
  );
}
