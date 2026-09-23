import type { CtaMode, LandingConfig } from '../../../types/landing';
import { EarlyAccessForm } from '../../../components/EarlyAccessForm';

/**
 * The form card. The form lays out its own two columns — the questions, and
 * a side panel with the step list and the qualifier — and keeps the qualifier
 * beside its button on every step.
 */
export function VFarmEarlyAccess({ config, ctaMode }: { config: LandingConfig; ctaMode: CtaMode }) {
  return (
    <section className="container section section-tight" id="early-access">
      <div className="card card-pad-lg early-access">
        <EarlyAccessForm config={config} ctaMode={ctaMode} />
      </div>
    </section>
  );
}
