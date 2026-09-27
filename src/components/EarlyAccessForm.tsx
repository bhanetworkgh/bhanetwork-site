import { useEffect, useId, useMemo, useRef, useState } from 'react';
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
import { StepList, StepProgress, TOTAL_QUESTIONS, questionNumber } from './FormSteps';
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
 * On a phone the form asks one question per screen, so nobody faces a wall of
 * fields on a small screen; the answers, checks and payload are identical.
 *
 * Success is never optimistic: it is shown only after HTTP 200 whose body is
 * `{"ok": true}`. Anything else — another status, no body, a body that is not
 * JSON, `{"ok": false}`, no response at all — shows a plain error and keeps
 * every answer on screen so the person can retry.
 */

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const PHONE = '(max-width: 699px)';

/**
 * True on a phone-width screen. False on the server and on the first client
 * render, so hydration matches the pre-rendered HTML; it flips a moment later.
 */
function usePhone(): boolean {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(PHONE);
    const update = () => setPhone(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return phone;
}

export function EarlyAccessForm({ config, ctaMode }: { config: LandingConfig; ctaMode: CtaMode }) {
  const ids = useId();
  const formRef = useRef<HTMLFormElement>(null);
  /*
   * Read once, at mount, from the URL this visitor actually arrived on — so a
   * later history change cannot rewrite where a lead came from.
   */
  const utm = useMemo(
    /* The pre-render has no window; the browser reads the real URL on hydration. */
    () => (typeof window === 'undefined' ? {} : readUtm(window.location.search)),
    [],
  );
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  /** On a phone, which question of the current section is on screen. */
  const [qi, setQi] = useState(0);
  const phone = usePhone();
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
  const lastStep = step === FORM_A_STEPS.length - 1;
  /* On a phone only one question shows; qi is kept in range if the screen widens. */
  const q = Math.min(qi, current.questions.length - 1);
  const lastQuestion = !phone || q === current.questions.length - 1;
  const last = lastStep && lastQuestion;
  const shown = phone ? [current.questions[q]!] : current.questions;
  const busy = state === 'submitting';

  /** The problems in one section, keyed by question. Empty when it is complete. */
  function problemsIn(index: number): Record<string, string> {
    const found: Record<string, string> = {};
    for (const question of FORM_A_STEPS[index].questions) {
      const problem = problemWith(question, answers[question.key]);
      if (problem) found[question.key] = problem;
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

  /** Check what is on screen. True when it is complete; otherwise flag it and focus the first gap. */
  function checkShown(): boolean {
    const found: Record<string, string> = {};
    for (const question of shown) {
      const problem = problemWith(question, answers[question.key]);
      if (problem) found[question.key] = problem;
    }
    setErrors(found);
    if (Object.keys(found).length === 0) return true;
    focusFirstProblem();
    return false;
  }

  /** Check a whole section, wherever it is shown. */
  function checkStep(): boolean {
    const found = problemsIn(step);
    setErrors(found);
    if (Object.keys(found).length === 0) return true;
    /* On a phone, jump to the first unanswered question in the section. */
    if (phone) {
      const firstBad = current.questions.findIndex((question) => found[question.key]);
      if (firstBad !== -1) setQi(firstBad);
    }
    focusFirstProblem();
    return false;
  }

  function goTo(next: number, question = 0) {
    setStep(next);
    setQi(question);
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
    if (!checkShown()) return;
    if (!lastQuestion) {
      setQi(q + 1);
      setErrors({});
      requestAnimationFrame(() => formRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' }));
      return;
    }
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
      const found = problemsIn(firstBad);
      goTo(firstBad, Math.max(0, FORM_A_STEPS[firstBad].questions.findIndex((question) => found[question.key])));
      setErrors(found);
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

  /** Back one screen: the previous question on a phone, the previous section otherwise. */
  function back() {
    setErrors({});
    if (phone && q > 0) {
      setQi(q - 1);
      return;
    }
    const prev = step - 1;
    goTo(prev, phone ? FORM_A_STEPS[prev].questions.length - 1 : 0);
  }

  /** Back is free; forward through the list only past a complete section. */
  function selectStep(index: number) {
    if (index > step && !checkStep()) return;
    setErrors({});
    goTo(index);
  }

  const canGoBack = step > 0 || (phone && q > 0);

  return (
    <div className="ea-card">
      <aside className="ea-steps" aria-label="Sections">
        <StepList step={step} reached={reached} disabled={busy} onSelect={selectStep} />
      </aside>
      <form className="ea-main" ref={formRef} onSubmit={submit} noValidate>
        <div className="ea-progress-row">
          <StepProgress
            step={step}
            question={phone ? questionNumber(step, q) : null}
            totalQuestions={TOTAL_QUESTIONS}
          />
          <span className="ea-required mono">
            <span aria-hidden="true">*</span> Required
          </span>
        </div>
        <div className="ea-head">
          <h3 className="ea-title" id={`${ids}-step`} tabIndex={-1}>
            {current.title}
          </h3>
          {current.description && (!phone || q === 0) && <p className="ea-desc">{current.description}</p>}
        </div>

        {shown.map((question) => (
          <FormAField
            key={question.key}
            q={question}
            id={`${ids}-${question.key}`}
            value={answers[question.key]}
            error={errors[question.key] ?? null}
            disabled={busy}
            onChange={(value) => {
              setAnswers((prev) => ({ ...prev, [question.key]: value }));
              if (errors[question.key]) setErrors(({ [question.key]: _cleared, ...rest }) => rest);
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

        <div className="ea-actions">
          {canGoBack && (
            <Button type="button" variant="ghost" disabled={busy} onClick={back}>
              Back
            </Button>
          )}
          <span className="ea-actions-gap" />
          {last ? (
            <Button type="submit" variant="primary" className="btn-lg" disabled={busy} aria-busy={busy}>
              {busy ? 'Sending…' : copy.cta_label}
            </Button>
          ) : (
            <Button type="submit" variant="forest">
              Continue
            </Button>
          )}
        </div>
        {state === 'error' && (
          <p className="form-error ea-error" role="alert">
            {copy.error_message}
          </p>
        )}
        {/* Beside the button on every step, whatever the screen. */}
        <Qualifier text={copy.qualifier} className="ea-qualifier" />
      </form>
    </div>
  );
}
