import { useId, useMemo, useState } from 'react';
import type { CtaMode, EarlyAccessLead, LandingConfig, SourcePage } from '../types/landing';
import { readAttribution } from '../lib/attribution';
import { Button, LinkButton } from './Button';

/**
 * The Early Access form.
 *
 * The site hosts this itself — it does not send anyone away to an external
 * form — and posts to the BHA Engine Dashboard endpoint named in the config.
 *
 * Three fields, and only three: they match the upstream lead envelope, and
 * adding a fourth breaks it.
 *
 * A submission means "we received your interest" and nothing else. Nothing
 * here reads, writes, stores or infers payment, subscriber status,
 * entitlement, ownership, allocation, price protection or a delivery date.
 * There are no cookies and no storage: the request is the only thing that
 * leaves the page.
 *
 * Success is never optimistic: it is shown only after a 2xx whose body says
 * `{"ok": true}`. Anything else keeps what was typed and shows the server's
 * own message where it sent one.
 */

type FormState = 'idle' | 'submitting' | 'success' | 'error';

/** Deliberately loose: the endpoint is the authority, this only catches typos. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EarlyAccessForm({
  config,
  ctaMode,
  sourcePage,
}: {
  config: LandingConfig;
  ctaMode: CtaMode;
  sourcePage: SourcePage;
}) {
  const ids = useId();
  /*
   * Read once, at mount, from the URL this visitor actually arrived on — so a
   * later history change cannot rewrite where a lead came from.
   */
  const attribution = useMemo(
    () => readAttribution(config, window.location.search),
    [config],
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [trap, setTrap] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [fieldError, setFieldError] = useState<string | null>(null);
  /** What the server said went wrong, when it said anything. */
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const copy = config.early_access;

  /* The claim-state rules decide whether a call to action may exist at all. */
  if (ctaMode === 'none') return null;

  /*
   * Fallback: with no endpoint configured, the call to action becomes a plain
   * link to the interest URL. The page never dead-ends on a missing endpoint.
   */
  if (!config.early_access_endpoint) {
    if (!config.interest_url) return null;
    return (
      <LinkButton href={config.interest_url} variant="primary">
        {copy.cta_label}
      </LinkButton>
    );
  }

  if (state === 'success') {
    return (
      <p className="form-success t-body-lg" role="status">
        {copy.success_message}
      </p>
    );
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'submitting') return; /* a double click cannot make two leads */

    /* The honeypot is invisible to a person. Filled means a bot: drop it. */
    if (trap.trim() !== '') {
      setState('success');
      return;
    }

    const full_name = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!full_name) {
      setFieldError('Enter your full name.');
      return;
    }
    if (!EMAIL.test(cleanEmail)) {
      setFieldError('Enter a valid email address.');
      return;
    }
    setFieldError(null);
    setServerMessage(null);
    setState('submitting');

    const lead: EarlyAccessLead = {
      full_name,
      email: cleanEmail,
      organization_name: org.trim(),
      source_surface: 'bhanetwork_site',
      source_page: sourcePage,
      page_contract_version: config.page_contract_version,
      mechanics_contract_version: config.mechanics_contract_version,
      claim_state: config.claim_state,
      submitted_at: new Date().toISOString(),
      /* utm_*, asset_id, source_channel, landing_variant, source_campaign,
         contract_version — empty where the URL was silent, never guessed. */
      ...attribution,
    };

    try {
      const response = await fetch(config.early_access_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });

      /*
       * The endpoint answers 201 {"ok":true} when the lead is stored, and
       * {"ok":false,"message":"…"} with a 4xx or 5xx when it is not.
       *
       * Success is shown only when the status and the body agree. A 2xx with
       * no body, a body that is not JSON, or {"ok":false} is a failure —
       * telling somebody they are on the list when no row was written is the
       * one outcome this form must never produce.
       */
      let payload: { ok?: unknown; message?: unknown } = {};
      try {
        payload = (await response.json()) as typeof payload;
      } catch {
        /* No body, or not JSON. Handled as a failure below. */
      }

      if (response.ok && payload.ok === true) {
        setState('success');
        return;
      }

      /* 403, 429, 5xx: show what the server said, so "too many submissions"
         does not read as "something went wrong". */
      const message =
        typeof payload.message === 'string' && payload.message.trim()
          ? payload.message.trim()
          : copy.error_message;
      console.error(`[bhanetwork] early access refused: HTTP ${response.status}`);
      setServerMessage(message);
      setState('error');
    } catch (error) {
      /* No response at all — offline, DNS, CORS. There is no server message. */
      console.error('[bhanetwork] early access submission failed', error);
      setServerMessage(null);
      setState('error');
    }
    /* Whatever was typed stays typed, either way. Retrying is one more click. */
  }

  const busy = state === 'submitting';

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="form-row">
        <label className="form-field">
          <span className="t-kicker">Full name</span>
          <input
            className="input"
            id={`${ids}-name`}
            name="full_name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={busy}
          />
        </label>
        <label className="form-field">
          <span className="t-kicker">Email</span>
          <input
            className="input"
            id={`${ids}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={busy}
          />
        </label>
        <label className="form-field">
          <span className="t-kicker">Organisation (optional)</span>
          <input
            className="input"
            id={`${ids}-org`}
            name="organization_name"
            autoComplete="organization"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            disabled={busy}
          />
        </label>
      </div>

      {/*
        The attribution the visitor arrived with, as real hidden fields. They
        are submitted in the JSON body above; carrying them on the form too
        means what was captured is visible to anyone inspecting the page, and
        that a non-JS fallback would carry them as well.
      */}
      {Object.entries(attribution).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} readOnly />
      ))}

      {/* The honeypot. Hidden from people, offered to bots. */}
      <div className="form-trap" aria-hidden="true">
        <label htmlFor={`${ids}-trap`}>Leave this field empty</label>
        <input
          id={`${ids}-trap`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <Button type="submit" variant="primary" disabled={busy}>
          {busy ? 'Sending…' : copy.cta_label}
        </Button>
        {fieldError && (
          <p className="form-error t-body" role="alert">
            {fieldError}
          </p>
        )}
        {state === 'error' && (
          <p className="form-error t-body" role="alert">
            {serverMessage ?? copy.error_message}
          </p>
        )}
      </div>
    </form>
  );
}
