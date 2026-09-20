import { useEffect, useState } from 'react';
import type { CtaMode, LandingConfig, LandingState } from '../types/landing';
import { parseLandingConfig } from './parseLandingConfig';

/**
 * The content contract.
 *
 * public/landing-config.json owns every word and every link this site says
 * about vFarm. This module is the only place that reads it, the only place
 * that decides what call to action is permitted, and the only place allowed to
 * know what `claim_state` means. Components ask for `ctaMode` and render.
 *
 * Every rule below fails closed. A missing field, a wrong type, a corrupt
 * file, a 404, a claim state nobody has defined yet — all of them land on
 * interest-only with no paid call to action. There is no code path that turns
 * an unknown into a payment.
 */

const CONFIG_URL = '/landing-config.json';

/* The claim-state rules ----------------------------------------------------- */

/**
 * A paid call to action needs BOTH a claim state of `paid_v0_1_live` AND a
 * non-empty paid_subscription_url. Not either. Every other input — including
 * `paid_v0_1_pending`, `unknown`, an empty string and a missing key — is
 * interest-only.
 *
 * `none` is the last stop: the config loaded but offers no way to express
 * interest at all (no endpoint and no interest URL). The page then shows no
 * call to action rather than a dead end.
 */
export function deriveCtaMode(config: LandingConfig | null): CtaMode {
  if (!config) return 'none';

  if (config.claim_state === 'paid_v0_1_live' && config.paid_subscription_url) {
    return 'paid';
  }

  const canTakeInterest = config.early_access_endpoint !== '' || config.interest_url !== '';
  if (!canTakeInterest) return 'none';

  /* Everything that is not a cleared paid state, including an unknown one. */
  return 'interest';
}

/** The vetted paid link, and only when the paid state is actually cleared. */
function derivePaidUrl(config: LandingConfig | null, mode: CtaMode): string | null {
  return mode === 'paid' && config ? config.paid_subscription_url : null;
}

/* The hook ------------------------------------------------------------------ */

/**
 * Fetch, validate and gate the config. This is the only supported way for a
 * page to read it.
 *
 * On any failure the state is `failed` with a null config, which derives to
 * `ctaMode: 'none'`. The page still renders its chrome: no blank screen, and
 * no paid call to action.
 */
export function useLandingConfig(): LandingState {
  const [state, setState] = useState<LandingState>({
    config: null,
    status: 'loading',
    ctaMode: 'none',
    paidUrl: null,
  });

  useEffect(() => {
    let live = true;

    async function load() {
      try {
        const response = await fetch(CONFIG_URL, { cache: 'no-cache' });
        if (!response.ok) throw new Error(`landing-config.json: HTTP ${response.status}`);
        const config = parseLandingConfig(await response.json());
        if (!live) return;
        const ctaMode = deriveCtaMode(config);
        setState({ config, status: 'ready', ctaMode, paidUrl: derivePaidUrl(config, ctaMode) });
      } catch (error) {
        if (!live) return;
        console.error('[bhanetwork] landing config unavailable', error);
        setState({ config: null, status: 'failed', ctaMode: 'none', paidUrl: null });
      }
    }

    void load();
    return () => {
      live = false;
    };
  }, []);

  return state;
}
