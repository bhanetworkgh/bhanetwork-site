import { FORM_A_STEPS } from '../lib/formA';

/**
 * Where the visitor is in Form A's seven sections.
 *
 * `step` is the section on screen; `reached` is the furthest one they have
 * got to. A section before `reached` has passed its checks, so it is ticked
 * and can be revisited; nothing past `reached` can be jumped to.
 */

/** How many questions Form A asks in all. */
export const TOTAL_QUESTIONS = FORM_A_STEPS.reduce((n, s) => n + s.questions.length, 0);

/** The 1-based number of question `q` in section `step`, across the whole form. */
export function questionNumber(step: number, q: number): number {
  return FORM_A_STEPS.slice(0, step).reduce((n, s) => n + s.questions.length, 0) + q + 1;
}

/**
 * The bar and its label, above the section heading. On a phone, where one
 * question shows at a time, it counts questions as well as sections.
 */
export function StepProgress({
  step,
  question = null,
  totalQuestions = TOTAL_QUESTIONS,
}: {
  step: number;
  question?: number | null;
  totalQuestions?: number;
}) {
  const total = FORM_A_STEPS.length;
  const label =
    question === null
      ? `Step ${step + 1} of ${total}`
      : `Step ${step + 1} of ${total} · question ${question} of ${totalQuestions}`;
  const fill = question === null ? (step + 1) / total : question / totalQuestions;
  return (
    <div className="step-progress">
      <span className="step-progress-label mono tabular">{label}</span>
      <div
        className="step-progress-track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(fill * 100)}
      >
        <span className="step-progress-fill" style={{ width: `${fill * 100}%` }} />
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
