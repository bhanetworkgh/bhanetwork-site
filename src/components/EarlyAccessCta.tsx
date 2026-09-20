import type { CtaMode, LandingConfig } from '../types/landing';

/** The one page that carries the qualifying language and the claims. */
export const VFARM_PATH = '/vfarm';

/**
 * The home page's Early Access call to action.
 *
 * It is always a link to /vfarm — never a form, never a modal. The home page
 * does not take a lead, because a visitor must not be able to complete the
 * funnel without passing the page that carries the supporting claims and the
 * qualifier.
 *
 * That holds even when `early_access_endpoint` is missing from the config:
 * this still links to /vfarm, and /vfarm is what falls back to `interest_url`.
 * The home page is never the thing that dead-ends.
 *
 * The label comes from the config. Whether it may exist at all is the
 * claim-state decision, made once and passed in as `ctaMode`.
 */
export function EarlyAccessCta({
  config,
  ctaMode,
  size = 'md',
}: {
  config: LandingConfig;
  ctaMode: CtaMode;
  size?: 'md' | 'sm';
}) {
  if (ctaMode === 'none') return null;
  return (
    <a className={`btn btn-primary${size === 'sm' ? ' btn-sm' : ''}`} href={VFARM_PATH}>
      {config.early_access.cta_label}
    </a>
  );
}
