import { useLandingConfig } from '../../config/landingConfig';
import { ConfigLoading, ConfigUnavailable, Shell, useDescription } from '../../components/Shell';
import { Hero } from './sections/Hero';
import { BuildFeed } from './sections/BuildFeed';
import { WhatVFarmIs } from './sections/WhatVFarmIs';
import { EarlyAccess } from './sections/EarlyAccess';
import { EarlyAccessCta } from '../../components/EarlyAccessCta';

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
  /*
   * The description is its own config key rather than the subhead: the subhead
   * is two sentences written to be read on the page, and a description is one
   * sentence written to be read in a search result.
   */
  useDescription(config?.home.meta_description);

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
   * Every Early Access call to action on this page is a link to /vfarm. There
   * is no form here and no modal: the funnel cannot be completed without
   * passing the page that carries the claims and the qualifier.
   *
   * One call to action per section, two on the page (the hero's and the
   * Early Access section's), each with the qualifier directly under it. The
   * top bar carries the same link.
   */
  const navCta =
    ctaMode === 'none' ? undefined : <EarlyAccessCta config={config} ctaMode={ctaMode} size="sm" />;

  const heroCta = <EarlyAccessCta config={config} ctaMode={ctaMode} />;

  return (
    <Shell cta={navCta} tight>
      <Hero config={config} ctaMode={ctaMode} onCta={heroCta} />
      <BuildFeed items={config.build_feed} />
      <WhatVFarmIs items={config.what_vfarm_is} />
      <EarlyAccess config={config} ctaMode={ctaMode} />
    </Shell>
  );
}
