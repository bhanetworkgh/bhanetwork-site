import { useLandingConfig } from '../../config/landingConfig';
import { ConfigLoading, ConfigUnavailable, Shell, useDescription } from '../../components/Shell';
import { VFarmHero } from './sections/VFarmHero';
import { VFarmEarlyAccess } from './sections/VFarmEarlyAccess';
import { VFarmStatus } from './sections/VFarmStatus';
import { ContractVersions } from '../../components/ContractVersions';

/**
 * The vFarm Early Access page.
 *
 * This page carries the full approved block, all of it from the config, in
 * this order and visible without interaction:
 *
 *   1. early_access.headline, as the h1                   VFarmHero
 *   2. early_access.body, as the lead paragraph           VFarmHero
 *   3. every entry in supporting_claims, as a list        VFarmEarlyAccess
 *   4. the Early Access form                              VFarmEarlyAccess
 *   5. early_access.qualifier, directly beneath the form  VFarmEarlyAccess
 *   6. the four status tiles, Sample tags intact          VFarmStatus
 *
 * Nothing is collapsed, deferred behind a link or shown on a tab. The order is
 * fixed here and nowhere else, so it cannot drift section by section.
 *
 * Short and honest otherwise. No pricing, no tiers, no comparison table, no
 * testimonials, no countdown, no scarcity language — a section that would need
 * a sentence the config does not carry is a section that does not exist.
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
      <a className="btn btn-primary btn-sm" href="/vfarm#early-access">
        {config.early_access.cta_label}
      </a>
    );

  return (
    <Shell cta={navCta} footerNote={<ContractVersions config={config} />}>
      <VFarmHero config={config} />
      <VFarmEarlyAccess config={config} ctaMode={ctaMode} />
      <VFarmStatus tile={config.status_tile} />
    </Shell>
  );
}
