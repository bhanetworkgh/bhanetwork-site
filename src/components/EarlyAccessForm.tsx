import { useId, useMemo, useRef, useState } from 'react';
import type { CtaMode, IntakePayload, LandingConfig } from '../types/landing';
import { readUtm } from '../lib/attribution';
import {
  emptyAnswers,
  FORM_A_STEPS,
  problemWith,
  serialiseAnswers,
  type Answers,
} from '../lib/formA';
import { FormAField } from './FormAField';
import { StepList, StepProgress } from './FormSteps';
import { Qualifier } from './ClaimsList';
import { Button, LinkButton } from './Button';

/**
 * The Early Access form.
 *
 * The site hosts this itself and asks every question Hardik's Form A asks —
 * same wording, same options, same order, same required flags, mirrored in
 * src/lib/formA.ts — one Form A section per step, so it never reads as one
 * wall. It POSTs JSON to the n8n intake webhook named in the config at
 * `early_access_endpoint`, which writes the answers into Form A's response
 * sheet.
 *
 * A submission means "we received your interest" and nothing else. Nothing
 * here reads, writes, stores or infers payment, subscriber status,
 * entitlement, ownership, allocation, price protection or a delivery date.
 * There are no cookies and no storage: the request is the only thing that
 * leaves the page.
 *
 * Success is never optimistic: it is shown only after HTTP 200 whose body is
 * `{"ok": true}`. Anything else — another status, no body, a body that is not
 * JSON, `{"ok": false}`, no response at all — shows a plain error and keeps
 * every answer on screen so the person can retry.
 */

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function EarlyAccessForm({ config, ctaMode }: { config: LandingConfig; ctaMode: CtaMode }) {
  const ids = useId();
  const formRef = useRef<HTMLFormElement>(null);
  /*
   * Read once, at mount, from the URL this visitor actually arrived on — so a
   * later history change cannot rewrite where a lead came from.
   */
  const utm = useMemo(() => readUtm(window.location.search), []);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  /** The furthest section reached. Every section before it has passed its checks. */
  const [reached, setReached] = useState(0);
  const [trap, setTrap] = useState('');
  const [state, setState] = useState<FormState>('idle');

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
      <div className="stack">
        <LinkButton href={config.interest_url} variant="primary" className="btn-fit">
          {copy.cta_label}
        </LinkButton>
        <Qualifier text={copy.qualifier} />
      </div>
    );
  }

  if (state === 'success') {
    return (
      <div className="stack">
        <p className="form-success t-body-lg" role="status">
          {copy.success_message}
        </p>
        <Qualifier text={copy.qualifier} />
      </div>
    );
  }

  const current = FORM_A_STEPS[step];
  const last = step === FORM_A_STEPS.length - 1;
  const busy = state === 'submitting';

  /** The problems in one section, keyed by question. Empty when it is complete. */
  function problemsIn(index: number): Record<string, string> {
    const found: Record<string, string> = {};
    for (const q of FORM_A_STEPS[index].questions) {
      const problem = problemWith(q, answers[q.key]);
      if (problem) found[q.key] = problem;
    }
    return found;
  }

  function focusFirstProblem() {
    requestAnimationFrame(() => {
      const bad = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      const target = bad?.matches('fieldset') ? bad.querySelector<HTMLElement>('input') : bad;
      target?.focus();
    });
  }

  /** Check the current step. True when it is complete; otherwise flag it and focus the first gap. */
  function checkStep(): boolean {
    const found = problemsIn(step);
    setErrors(found);
    if (Object.keys(found).length === 0) return true;
    focusFirstProblem();
    return false;
  }

  function goTo(next: number) {
    setStep(next);
    setReached((r) => Math.max(r, next));
    setState('idle');
    requestAnimationFrame(() => {
      const heading = document.getElementById(`${ids}-step`);
      heading?.focus({ preventScroll: true });
      formRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return; /* a double click cannot make two leads */
    if (!checkStep()) return;
    if (!last) {
      goTo(step + 1);
      return;
    }

    /*
     * The step list lets a visitor go back and change an earlier answer, so
     * the whole form is checked again before anything is sent.
     */
    const firstBad = FORM_A_STEPS.findIndex((_, i) => Object.keys(problemsIn(i)).length > 0);
    if (firstBad !== -1) {
      goTo(firstBad);
      setErrors(problemsIn(firstBad));
      focusFirstProblem();
      return;
    }

    setState('submitting');

    const payload: IntakePayload = {
      ...serialiseAnswers(answers),
      /* Always the config's key. No URL parameter is consulted for it. */
      source_campaign: config.source_campaign,
      page: window.location.pathname,
      utm,
      hp: trap,
    };

    try {
      const response = await fetch(config.early_access_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let body: { ok?: unknown } = {};
      try {
        body = (await response.json()) as typeof body;
      } catch {
        /* No body, or not JSON. A failure, below. */
      }

      /* HTTP 200 and {"ok": true}, both — nothing else is a success. */
      if (response.status === 200 && body.ok === true) {
        setState('success');
        return;
      }
      console.error(`[bhanetwork] early access not accepted: HTTP ${response.status}`);
      setState('error');
    } catch (error) {
      /* No response at all — offline, DNS, CORS. */
      console.error('[bhanetwork] early access submission failed', error);
      setState('error');
    }
    /* Every answer stays where it was. Retrying is one more click. */
  }

  /** Back is free; forward through the list only past a complete section. */
  function selectStep(index: number) {
    if (index > step && !checkStep()) return;
    setErrors({});
    goTo(index);
  }

  return (
    <div className="ea-layout">
      <form className="form ea-main" ref={formRef} onSubmit={submit} noValidate>
        <StepProgress step={step} />
        <div className="form-step-head stack">
          <h2 className="t-title-sm" id={`${ids}-step`} tabIndex={-1}>
            {current.title}
          </h2>
          {current.description && <p className="t-body dim">{current.description}</p>}
          <p className="t-body dim">
            <span className="form-required" aria-hidden="true">
              *
            </span>{' '}
            Indicates required question
          </p>
        </div>

        {current.questions.map((q) => (
          <FormAField
            key={q.key}
            q={q}
            id={`${ids}-${q.key}`}
            value={answers[q.key]}
            error={errors[q.key] ?? null}
            disabled={busy}
            onChange={(value) => {
              setAnswers((prev) => ({ ...prev, [q.key]: value }));
              if (errors[q.key]) setErrors(({ [q.key]: _cleared, ...rest }) => rest);
            }}
          />
        ))}

        {/* The honeypot. Hidden from people, offered to bots. Sent as `hp`. */}
        <div className="form-trap" aria-hidden="true">
          <label htmlFor={`${ids}-trap`}>Leave this field empty</label>
          <input
            id={`${ids}-trap`}
            name="hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={trap}
            onChange={(e) => setTrap(e.target.value)}
          />
        </div>

        <div className="form-footer">
          <div className="form-actions">
            {step > 0 && (
              <Button
                type="button"
                variant="default"
                disabled={busy}
                onClick={() => goTo(step - 1)}
              >
                Back
              </Button>
            )}
            <Button type="submit" variant="primary" disabled={busy}>
              {last ? (busy ? 'Sending…' : copy.cta_label) : 'Next'}
            </Button>
          </div>
          {state === 'error' && (
            <p className="form-error t-body" role="alert">
              {copy.error_message}
            </p>
          )}
          {/* Beside the button on every step, whatever the screen. */}
          <Qualifier text={copy.qualifier} className="qualifier-inline" />
        </div>
      </form>

      <aside className="ea-side">
        <div className="ea-side-inner">
          <StepList step={step} reached={reached} disabled={busy} onSelect={selectStep} />
          <Qualifier text={copy.qualifier} className="qualifier-side" />
        </div>
      </aside>
    </div>
  );
}
