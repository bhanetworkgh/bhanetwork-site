import { Link } from 'react-router-dom';
import { terms } from '../content/terms';

export function Terms() {
  const s = terms.sections;
  return (
    <section className="container section narrow prose">
      <h1 className="display-sm">{terms.heading}</h1>
      <p>
        <strong>{terms.program}</strong>
      </p>
      <p className="dim">{terms.updated}</p>
      <p>{terms.intro}</p>

      <h2>{s.program.heading}</h2>
      <p>{s.program.body}</p>

      <h2>{s.consent.heading}</h2>
      <p>{s.consent.body}</p>

      <h2>{s.frequency.heading}</h2>
      <p>{s.frequency.body}</p>

      <h2>{s.rates.heading}</h2>
      <p>
        <strong>{s.rates.body}</strong>
      </p>
      <p>{s.rates.extra}</p>

      <h2>{s.optOut.heading}</h2>
      <p>
        <strong>{s.optOut.body}</strong>
      </p>
      <p>{s.optOut.extra}</p>

      <h2>{s.support.heading}</h2>
      <p>
        {s.support.bodyBefore}
        <a className="link" href={`mailto:${terms.contactEmail}`}>
          {terms.contactEmail}
        </a>
        {s.support.bodyAfter}
      </p>

      <h2>{s.carriers.heading}</h2>
      <p>{s.carriers.body}</p>

      <h2>{s.privacy.heading}</h2>
      <p>
        {s.privacy.bodyBefore}
        <Link className="link" to="/privacy">
          {s.privacy.linkLabel}
        </Link>
        {s.privacy.bodyAfter}
      </p>

      <h2>{s.changes.heading}</h2>
      <p>{s.changes.body}</p>
    </section>
  );
}
