/**
 * Where a lead came from.
 *
 * Two things, kept apart on purpose:
 *
 *   - `source_campaign` is the lane's campaign key. It is always the config's
 *     `source_campaign` (Mechanics v0.2.2 §3: `vfarm_flagship_1031`) and it is
 *     read nowhere else. No query parameter can override it — the form does
 *     not even look for one. That lives in EarlyAccessForm, which reads it
 *     straight off the config.
 *
 *   - `utm` is every `utm_*` query parameter the visitor arrived with, as-is:
 *     the key and the value exactly as they were in the URL. Nothing is
 *     inferred from the referrer or anything else, and a URL with no utm_*
 *     parameters sends an empty object — a guessed attribution is worse than
 *     a blank one, because it looks like evidence.
 */
export function readUtm(search: string): Record<string, string> {
  const utm: Record<string, string> = {};
  for (const [key, value] of new URLSearchParams(search)) {
    /* First occurrence wins, so a repeated key cannot overwrite the original. */
    if (key.startsWith('utm_') && !(key in utm)) utm[key] = value;
  }
  return utm;
}
