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

/** One step of "How early access works". */
export interface EarlyAccessStep {
  title: string;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EarlyAccessCopy {
  /** Optional in the config; empty when absent. */
  steps: EarlyAccessStep[];
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
  /** The /vfarm FAQ. Optional; empty when absent. */
  faq: FaqItem[];
  build_feed: BuildFeedItem[];
}

/** What the pages actually consume. */
export interface LandingState {
  /** null only when the config could not be read. */
  config: LandingConfig | null;
  status: 'ready' | 'failed';
  /**
   * Derived once, here, from claim_state and paid_subscription_url together.
   * No component reads claim_state and decides for itself.
   */
  ctaMode: CtaMode;
  /** The vetted paid link, and only when ctaMode is 'paid'. */
  paidUrl: string | null;
}

/**
 * What the Early Access form POSTs to the n8n intake webhook, which writes it
 * into Form A's response sheet.
 *
 * One key per Form A question (see src/lib/formA.ts for the full list and
 * order), plus the four keys below. Nothing else is sent.
 */
export type IntakePayload = {
  [questionKey: string]: string | number | null | Record<string, string>;
} & {
  /** Always the config's source_campaign. Never read from the URL. */
  source_campaign: string;
  /** The path the form was submitted from. */
  page: string;
  /** Every utm_* query parameter, as-is. Empty when the URL had none. */
  utm: Record<string, string>;
  /** The honeypot, sent as-is. A person never fills it; the webhook decides what a filled one means. */
  hp: string;
};
