import { useId, useState } from 'react';
import type { CtaMode, EarlyAccessLead, LandingConfig, SourcePage } from '../types/landing';
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [trap, setTrap] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [fieldError, setFieldError] = useState<string | null>(null);

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
    setState('submitting');

    const lead: EarlyAccessLead = {
      full_name,
      email: cleanEmail,
      organization_name: org.trim(),
      source_surface: 'bhanetwork_site',
      source_page: sourcePage,
      source_campaign: config.source_campaign,
      page_contract_version: config.page_contract_version,
      mechanics_contract_version: config.mechanics_contract_version,
      claim_state: config.claim_state,
      submitted_at: new Date().toISOString(),
    };

    try {
      const response = await fetch(config.early_access_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
      if (!response.ok) throw new Error(`early access: HTTP ${response.status}`);
      setState('success');
    } catch (error) {
      console.error('[bhanetwork] early access submission failed', error);
      /* Whatever was typed stays typed. Retrying is one more click. */
      setState('error');
    }
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
            {copy.error_message}
          </p>
        )}
      </div>
    </form>
  );
}
