import { useLandingConfig } from '../../config/landingConfig';
import { ConfigLoading, ConfigUnavailable, Shell, useDescription } from '../../components/Shell';
import { VFarmHero } from './sections/VFarmHero';
import { VFarmEarlyAccess } from './sections/VFarmEarlyAccess';
import { VFarmStatus } from './sections/VFarmStatus';

/**
 * The vFarm Early Access page.
 *
 * Short and honest. No pricing, no tiers, no comparison table, no
 * testimonials, no countdown, no "limited spots" — a section that would need a
 * sentence the config does not carry is a section that does not exist.
 */
export function VFarm() {
  const { config, status, ctaMode } = useLandingConfig();
  useDescription(config?.early_access.body);

  if (status === 'loading') {
    return (
      <Shell>
        <ConfigLoading />
      </Shell>
    );
  }

  if (status === 'failed' || !config) {
    return (
      <Shell>
        <ConfigUnavailable />
      </Shell>
    );
  }

  const navCta =
    ctaMode === 'none' ? undefined : (
      <a className="btn btn-primary btn-sm" href="#early-access">
        {config.early_access.cta_label}
      </a>
    );

  return (
    <Shell cta={navCta}>
      <VFarmHero config={config} />
      <VFarmEarlyAccess config={config} ctaMode={ctaMode} />
      <VFarmStatus tile={config.status_tile} />
    </Shell>
  );
}
