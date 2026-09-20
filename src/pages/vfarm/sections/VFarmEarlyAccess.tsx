import type { CtaMode, LandingConfig } from '../../../types/landing';
import { ClaimsList, Qualifier } from '../../../components/ClaimsList';
import { EarlyAccessForm } from '../../../components/EarlyAccessForm';

/** The claims, the form, the qualifier. Nothing else belongs on this page. */
export function VFarmEarlyAccess({
  config,
  ctaMode,
}: {
  config: LandingConfig;
  ctaMode: CtaMode;
}) {
  return (
    <section className="container section" id="early-access">
      <div className="card card-pad-lg early-access">
        <ClaimsList claims={config.supporting_claims} />
        <EarlyAccessForm config={config} ctaMode={ctaMode} sourcePage="/vfarm" />
        <Qualifier text={config.early_access.qualifier} />
      </div>
    </section>
  );
}
