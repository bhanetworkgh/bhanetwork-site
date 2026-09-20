import { useLandingConfig } from '../../config/landingConfig';
import { ConfigLoading, ConfigUnavailable, Shell, useDescription } from '../../components/Shell';
import { Hero } from './sections/Hero';
import { StatusRow } from './sections/StatusRow';
import { BuildFeed } from './sections/BuildFeed';
import { WhatVFarmIs } from './sections/WhatVFarmIs';
import { EarlyAccess } from './sections/EarlyAccess';
import { EngineLine } from './sections/EngineLine';
import { BuildLog } from './sections/BuildLog';

/**
 * The home page.
 *
 * It reads the config once and hands the pieces down. The claim-state decision
 * is made in one place — `ctaMode`, derived in src/config/landingConfig.ts —
 * and every section that could put an offer on screen takes it as a prop.
 * No section reads `claim_state` and makes up its own mind.
 */
export function Home() {
  const { config, status, ctaMode } = useLandingConfig();
  useDescription(config?.home.subhead);

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

  /*
   * One call to action, and its label comes from the config. The top bar's
   * button is the same offer anchored to the same form, not a second one.
   */
  const navCta =
    ctaMode === 'none' ? undefined : (
      <a className="btn btn-primary btn-sm" href="#early-access">
        {config.early_access.cta_label}
      </a>
    );

  const heroCta =
    ctaMode === 'none' ? null : (
      <a className="btn btn-primary" href="#early-access">
        {config.early_access.cta_label}
      </a>
    );

  return (
    <Shell cta={navCta}>
      <Hero config={config} ctaMode={ctaMode} onCta={heroCta} />
      <StatusRow tile={config.status_tile} />
      <BuildFeed items={config.build_feed} />
      <WhatVFarmIs items={config.what_vfarm_is} />
      <EarlyAccess config={config} ctaMode={ctaMode} />
      <EngineLine />
      <BuildLog config={config} ctaMode={ctaMode} />
    </Shell>
  );
}
