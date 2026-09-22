/**
 * The shape of public/landing-config.json.
 *
 * This file describes the contract; src/config/landingConfig.ts is what
 * enforces it. Nothing here is optional at the type level after validation —
 * the loader fills every field with a safe value or drops it.
 */

/**
 * The claim state gates what the site is allowed to offer.
 *
 * Only `interest_only_live` and `paid_v0_1_live` are meaningful. Everything
 * else — including a value nobody has defined yet — is treated as "not cleared
 * for a paid call to action".
 */
export type ClaimState =
  | 'interest_only_live'
  | 'paid_v0_1_live'
  | 'paid_v0_1_pending'
  | 'pending'
  | 'needs_review'
  | 'unknown';

/** What the page is allowed to put in front of a visitor. */
export type CtaMode = 'interest' | 'paid' | 'none';

export interface HomeCopy {
  headline: string;
  subhead: string;
  kicker: string;
  /** The home page's meta description. A sentence, so the config owns it. */
  meta_description: string;
}

export interface EarlyAccessCopy {
  headline: string;
  body: string;
  qualifier: string;
  cta_label: string;
  success_message: string;
  error_message: string;
}

export interface WhatVFarmIsItem {
  title: string;
  body: string;
}

export interface StatusTile {
  enabled: boolean;
  source: string;
  render_status: string;
  render_label: string;
  days_to_flagship: string;
  spec_version: string;
  config_hash: string;
  last_level_up: string;
  sample: boolean;
}

export interface BuildFeedItem {
  title: string;
  body: string;
  date: string;
  lane: string;
  duration: string;
  featured: boolean;
  sample: boolean;
}

export interface LandingConfig {
  page_contract_version: string;
  mechanics_contract_version: string;
  claim_state: string;
  interest_url: string;
  paid_subscription_url: string | null;
  source_campaign: string;
  early_access_endpoint: string;
  home: HomeCopy;
  early_access: EarlyAccessCopy;
  supporting_claims: string[];
  what_vfarm_is: WhatVFarmIsItem[];
  status_tile: StatusTile;
  build_feed: BuildFeedItem[];
}

/** What the pages actually consume. */
export interface LandingState {
  /** null until the fetch settles. Components render a quiet skeleton meanwhile. */
  config: LandingConfig | null;
  status: 'loading' | 'ready' | 'failed';
  /**
   * Derived once, here, from claim_state and paid_subscription_url together.
   * No component reads claim_state and decides for itself.
   */
  ctaMode: CtaMode;
  /** The vetted paid link, and only when ctaMode is 'paid'. */
  paidUrl: string | null;
}

/**
 * Where a lead came from, captured at submit time.
 *
 * Every field is a string and may be empty. Empty means "the URL did not say"
 * — it never means a value was inferred.
 */
export interface Attribution {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  asset_id: string;
  source_channel: string;
  landing_variant: string;
  /** Defaults to the config's campaign key when the URL is silent. */
  source_campaign: string;
  /** The mechanics contract this page was built against. */
  contract_version: string;
}

/** The page a submission came from. Matches the upstream lead envelope. */
export type SourcePage = '/' | '/vfarm';

export interface EarlyAccessLead extends Attribution {
  full_name: string;
  email: string;
  organization_name: string;
  source_surface: 'bhanetwork_site';
  source_page: SourcePage;
  page_contract_version: string;
  mechanics_contract_version: string;
  claim_state: string;
  submitted_at: string;
}
