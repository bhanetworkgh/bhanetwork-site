import { createContext, useContext, type ReactNode } from 'react';
import type { CtaMode, LandingConfig, LandingState } from '../types/landing';
import { parseLandingConfig } from './parseLandingConfig';

/**
 * The content contract.
 *
 * public/landing-config.json owns every word and every link this site says
 * about vFarm. It is Hardik's file; this repo never edits it. The pre-render
 * (scripts/prerender.mjs) reads the file that ships in the build, renders
 * every page from it, and embeds the same JSON in each page as
 * window.__LANDING_CONFIG__, so the browser hydrates from exactly the config
 * the HTML was rendered from — no second fetch, no flash of other content.
 *
 * This module is the only place that decides what call to action is
 * permitted, and the only place allowed to know what `claim_state` means.
 * Every rule fails closed: a missing field, a wrong type, a corrupt file or a
 * claim state nobody has defined lands on interest-only, and a config that
 * cannot be read at all produces pages with no vFarm call to action.
 */

declare global {
  interface Window {
    __LANDING_CONFIG__?: unknown;
  }
}

/**
 * A paid call to action would need BOTH `paid_v0_1_live` AND a non-empty
 * paid_subscription_url. This site renders no paid call to action in any
 * mode; the derivation stays so the contract's rule is written down once.
 */
export function deriveCtaMode(config: LandingConfig | null): CtaMode {
  if (!config) return 'none';
  if (config.claim_state === 'paid_v0_1_live' && config.paid_subscription_url) return 'paid';
  const canTakeInterest = config.early_access_endpoint !== '' || config.interest_url !== '';
  return canTakeInterest ? 'interest' : 'none';
}

/** Parse raw config JSON into page state. Never throws. */
export function landingStateFrom(raw: unknown): LandingState {
  try {
    const config = parseLandingConfig(raw);
    const ctaMode = deriveCtaMode(config);
    return {
      config,
      status: 'ready',
      ctaMode,
      paidUrl: ctaMode === 'paid' ? config.paid_subscription_url : null,
    };
  } catch (error) {
    console.error('[bhanetwork] landing config unavailable', error);
    return { config: null, status: 'failed', ctaMode: 'none', paidUrl: null };
  }
}

const FAILED: LandingState = { config: null, status: 'failed', ctaMode: 'none', paidUrl: null };
const Ctx = createContext<LandingState>(FAILED);

export function LandingProvider({ state, children }: { state: LandingState; children: ReactNode }) {
  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

/** The only supported way for a component to read the config. */
export function useLanding(): LandingState {
  return useContext(Ctx);
}
