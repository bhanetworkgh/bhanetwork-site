import { useLandingConfig } from '../../config/landingConfig';
import { ConfigLoading, ConfigUnavailable, Shell, useDescription } from '../../components/Shell';
import { VFarmHero } from './sections/VFarmHero';
import { VFarmEarlyAccess } from './sections/VFarmEarlyAccess';
import { VFarmClaims } from './sections/VFarmClaims';
import { ContractVersions } from '../../components/ContractVersions';

/**
 * The vFarm Early Access page.
 *
 * This page carries the full approved block, all of it from the config, in
 * this order and visible without interaction:
 *
 *   1. early_access.headline, as the h1                   VFarmHero
 *   2. early_access.body, as the lead paragraph           VFarmHero
 *   3. the status tiles that can be proven, as stats      VFarmHero
 *   4. every entry in supporting_claims, as cards         VFarmClaims
 *   5. the Early Access form, with a step panel           VFarmEarlyAccess
 *   6. early_access.qualifier, beside the button on every
 *      step and in the step panel                         EarlyAccessForm
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
    <Shell cta={navCta} footerNote={<ContractVersions config={config} />} tight>
      <VFarmHero config={config} />
      <VFarmClaims claims={config.supporting_claims} />
      <VFarmEarlyAccess config={config} ctaMode={ctaMode} />
    </Shell>
  );
}
