import { FORM_A_STEPS } from '../lib/formA';

/**
 * Where the visitor is in Form A's seven sections.
 *
 * `step` is the section on screen; `reached` is the furthest one they have
 * got to. A section before `reached` has passed its checks, so it is ticked
 * and can be revisited; nothing past `reached` can be jumped to.
 */

/** The bar and its label, above the section heading. */
export function StepProgress({ step }: { step: number }) {
  const total = FORM_A_STEPS.length;
  return (
    <div className="step-progress">
      <span className="t-kicker tabular step-progress-label">
        Step {step + 1} of {total}
      </span>
      <div
        className="step-progress-track"
        role="progressbar"
        aria-label={`Step ${step + 1} of ${total}`}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step + 1}
      >
        <span className="step-progress-fill" style={{ width: `${((step + 1) / total) * 100}%` }} />
      </div>
    </div>
  );
}

function Tick() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <path
        d="M3.5 8.5l3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The seven section names, for the side panel. */
export function StepList({
  step,
  reached,
  disabled,
  onSelect,
}: {
  step: number;
  reached: number;
  disabled: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <ol className="step-list">
      {FORM_A_STEPS.map((s, i) => {
        const current = i === step;
        const done = !current && i < reached;
        const state = current ? 'is-current' : done ? 'is-done' : 'is-todo';
        const body = (
          <>
            <span className="step-list-mark">{done ? <Tick /> : i + 1}</span>
            <span className="step-list-title">{s.title}</span>
          </>
        );
        return (
          <li key={s.title} className={`step-list-item ${state}`}>
            {!current && i <= reached ? (
              <button
                type="button"
                className="step-list-row"
                disabled={disabled}
                onClick={() => onSelect(i)}
              >
                {body}
              </button>
            ) : (
              <span className="step-list-row" aria-current={current ? 'step' : undefined}>
                {body}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
