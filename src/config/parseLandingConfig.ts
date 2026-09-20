import type {
  BuildFeedItem,
  EarlyAccessCopy,
  HomeCopy,
  LandingConfig,
  StatusTile,
  WhatVFarmIsItem,
} from '../types/landing';

/**
 * Validation for public/landing-config.json.
 *
 * Every field is coerced to a safe value or dropped. The parser never throws
 * on a bad field — only on a payload that is not an object at all — so a
 * half-edited config degrades field by field instead of blanking the page.
 * The claim-state rules that decide what may be offered live next door, in
 * landingConfig.ts.
 */

/* Validation ---------------------------------------------------------------- */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** A string, trimmed, or the fallback. Never null, never a number, never NaN. */
function str(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return fallback;
}

function bool(value: unknown, fallback = false): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

function list(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

/** A non-empty, http(s) URL, or null. Anything else — including javascript: — is null. */
function url(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    const parsed = new URL(trimmed, window.location.origin);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? trimmed : null;
  } catch {
    return null;
  }
}

function parseHome(value: unknown): HomeCopy {
  const raw = isRecord(value) ? value : {};
  return {
    headline: str(raw.headline),
    subhead: str(raw.subhead),
    headline_pending: bool(raw.headline_pending),
    kicker: str(raw.kicker),
  };
}

function parseEarlyAccess(value: unknown): EarlyAccessCopy {
  const raw = isRecord(value) ? value : {};
  return {
    headline: str(raw.headline),
    body: str(raw.body),
    qualifier: str(raw.qualifier),
    cta_label: str(raw.cta_label),
    success_message: str(raw.success_message),
    error_message: str(raw.error_message),
  };
}

function parseStatusTile(value: unknown): StatusTile {
  const raw = isRecord(value) ? value : {};
  return {
    enabled: bool(raw.enabled),
    source: str(raw.source, 'static'),
    render_status: str(raw.render_status),
    render_label: str(raw.render_label),
    days_to_flagship: str(raw.days_to_flagship),
    spec_version: str(raw.spec_version),
    config_hash: str(raw.config_hash),
    last_level_up: str(raw.last_level_up),
    sample: bool(raw.sample, true),
  };
}

function parseWhatVFarmIs(value: unknown): WhatVFarmIsItem[] {
  return list(value)
    .filter(isRecord)
    .map((raw) => ({ title: str(raw.title), body: str(raw.body) }))
    .filter((item) => item.title !== '' || item.body !== '');
}

function parseBuildFeed(value: unknown): BuildFeedItem[] {
  return list(value)
    .filter(isRecord)
    .map((raw) => ({
      title: str(raw.title),
      body: str(raw.body),
      date: str(raw.date),
      lane: str(raw.lane),
      duration: str(raw.duration),
      featured: bool(raw.featured),
      /* Unlabelled data is assumed to be sample data, not assumed to be real. */
      sample: bool(raw.sample, true),
    }))
    .filter((item) => item.title !== '');
}

/** Turn whatever came back over the wire into a config, or throw. */
export function parseLandingConfig(value: unknown): LandingConfig {
  if (!isRecord(value)) throw new Error('landing-config.json is not an object');
  return {
    page_contract_version: str(value.page_contract_version),
    mechanics_contract_version: str(value.mechanics_contract_version),
    claim_state: str(value.claim_state, 'unknown'),
    interest_url: url(value.interest_url) ?? '',
    paid_subscription_url: url(value.paid_subscription_url),
    source_campaign: str(value.source_campaign),
    early_access_endpoint: url(value.early_access_endpoint) ?? '',
    home: parseHome(value.home),
    early_access: parseEarlyAccess(value.early_access),
    supporting_claims: list(value.supporting_claims)
      .map((claim) => str(claim))
      .filter((claim) => claim !== ''),
    what_vfarm_is: parseWhatVFarmIs(value.what_vfarm_is),
    status_tile: parseStatusTile(value.status_tile),
    build_feed: parseBuildFeed(value.build_feed),
  };
}
