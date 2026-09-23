import type { Question } from '../lib/formA';

/**
 * One Form A question, rendered as the question type Form A uses: a text
 * input, a textarea, a radio group, a checkbox group or a 1–5 scale.
 *
 * The wording is Form A's, passed in from src/lib/formA.ts. This component
 * writes none of it.
 */

const AUTOCOMPLETE: Record<string, string> = {
  full_name: 'name',
  email: 'email',
  organization_name: 'organization',
  city: 'address-level2',
  region: 'address-level1',
  country: 'country-name',
};

export function FormAField({
  q,
  id,
  value,
  error,
  disabled,
  onChange,
}: {
  q: Question;
  id: string;
  value: string | string[];
  error: string | null;
  disabled: boolean;
  onChange: (value: string | string[]) => void;
}) {
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const describedBy =
    [q.help ? helpId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined;

  const title = (
    <>
      {q.title}
      {q.required && (
        <span className="form-required" aria-hidden="true">
          {' '}
          *
        </span>
      )}
    </>
  );
  const help = q.help && (
    <span className="t-body dim form-help" id={helpId}>
      {q.help}
    </span>
  );
  const problem = error && (
    <span className="form-error t-body" id={errorId}>
      {error}
    </span>
  );

  if (q.type === 'short' || q.type === 'email' || q.type === 'paragraph') {
    const text = typeof value === 'string' ? value : '';
    const common = {
      id,
      name: q.key,
      value: text,
      required: q.required,
      disabled,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': describedBy,
    };
    return (
      <div className="form-field">
        <label className="form-label t-body" htmlFor={id}>
          {title}
        </label>
        {help}
        {q.type === 'paragraph' ? (
          <textarea
            {...common}
            className="input textarea"
            rows={4}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input
            {...common}
            className="input"
            type={q.type === 'email' ? 'email' : 'text'}
            inputMode={q.type === 'email' ? 'email' : undefined}
            autoComplete={AUTOCOMPLETE[q.key]}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        {problem}
      </div>
    );
  }

  /* Radio, checkbox and scale: a group of choices under one legend. */
  const multi = q.type === 'checkbox';
  const chosen = multi ? (Array.isArray(value) ? value : []) : [];
  const options = q.options ?? [];
  /* More than five options split into two columns on a wide screen. */
  const layout =
    q.type === 'scale' ? 'form-scale' : `form-choices${options.length > 5 ? ' is-two-col' : ''}`;
  const toggle = (option: string) =>
    onChange(chosen.includes(option) ? chosen.filter((o) => o !== option) : [...chosen, option]);

  return (
    <fieldset
      className="form-field form-group"
      /* A single-choice group is a radiogroup, the role aria-required belongs to. */
      role={multi ? undefined : 'radiogroup'}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
      aria-required={q.required && !multi ? true : undefined}
    >
      <legend className="form-label t-body">{title}</legend>
      {help}
      {q.type === 'scale' && q.scaleLabels && (
        <span className="form-scale-ends t-body dim" aria-hidden="true">
          <span>1 = {q.scaleLabels[0]}</span>
          <span>5 = {q.scaleLabels[1]}</span>
        </span>
      )}
      <div className={layout}>
        {options.map((option, i) => {
          const checked = multi ? chosen.includes(option) : value === option;
          return (
            <label key={option} className={`form-choice t-body${checked ? ' is-selected' : ''}`}>
              <input
                type={multi ? 'checkbox' : 'radio'}
                name={q.key}
                value={option}
                checked={checked}
                disabled={disabled}
                onChange={() => (multi ? toggle(option) : onChange(option))}
                aria-label={
                  q.type === 'scale' && q.scaleLabels && (i === 0 || i === 4)
                    ? `${option} — ${q.scaleLabels[i === 0 ? 0 : 1]}`
                    : undefined
                }
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
      {problem}
    </fieldset>
  );
}
