import type { Attribution, LandingConfig } from '../types/landing';

/**
 * Where a lead came from.
 *
 * Every field is read from the URL query string, or defaulted from the landing
 * config where the contract names a default, or stored empty. **Nothing here
 * is ever guessed.** An absent `utm_source` is stored as "" — it is not
 * inferred from the referrer, the page, or anything else, because a guessed
 * attribution is worse than a blank one: it looks like evidence.
 *
 * Mechanics v0.2.2 §3 fixes the campaign key (`vfarm_flagship_1031`) and §17.1
 * fixes `contract_version`, so those two default from the config rather than
 * from the URL when the URL is silent.
 */

/** The query keys, in the order the lead envelope lists them. */
const FROM_URL = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'asset_id',
  'source_channel',
  'landing_variant',
] as const;

function param(params: URLSearchParams, key: string): string {
  /* Trimmed and clipped; the server clips too, this just keeps the body small. */
  return (params.get(key) ?? '').trim().slice(0, 200);
}

export function readAttribution(config: LandingConfig, search: string): Attribution {
  const params = new URLSearchParams(search);
  const fields = Object.fromEntries(FROM_URL.map((k) => [k, param(params, k)])) as Record<
    (typeof FROM_URL)[number],
    string
  >;

  return {
    ...fields,
    /*
     * The one campaign key for this lane. A URL may override it — a clip can
     * carry its own — but with nothing in the URL it is the contract value
     * from the config, never blank.
     */
    source_campaign: param(params, 'source_campaign') || config.source_campaign,
    /* Which version of the mechanics contract this page was built against. */
    contract_version: config.mechanics_contract_version,
  };
}
