import { privacy } from '../content/privacy';
import { FORM_A_QUESTIONS } from '../lib/formA';

export function Privacy() {
  const s = privacy.sections;
  return (
    <section className="container section narrow prose">
      <h1 className="display-sm">{privacy.heading}</h1>
      <p className="dim">{privacy.updated}</p>
      <p>{privacy.intro}</p>

      <h2>{s.collects.heading}</h2>
      <p>{s.collects.body}</p>
      <ul>
        {FORM_A_QUESTIONS.map((q) => (
          <li key={q.key}>
            {q.title}
            {q.required ? ' (required)' : ''}
          </li>
        ))}
      </ul>
      <p>{s.collects.extra}</p>

      <h2>{s.why.heading}</h2>
      <p>{s.why.body}</p>

      <h2>{s.where.heading}</h2>
      <p>{s.where.body}</p>

      <h2>{s.sold.heading}</h2>
      <p>{s.sold.body}</p>

      <h2>{s.kept.heading}</h2>
      <p>{s.kept.body}</p>

      <h2>{s.removal.heading}</h2>
      <p>
        {s.removal.bodyBefore}
        <a className="link" href={`mailto:${privacy.contactEmail}`}>
          {privacy.contactEmail}
        </a>
        {s.removal.bodyAfter}
      </p>

      <h2>{s.browser.heading}</h2>
      <p>{s.browser.body}</p>
    </section>
  );
}
