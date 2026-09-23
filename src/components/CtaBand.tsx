import { Link } from 'react-router-dom';

/** The dark call-to-action band: one line, one gold button. */
export function CtaBand({ heading, to, label }: { heading: string; to: string; label: string }) {
  return (
    <section className="container section reveal">
      <div className="cta-band">
        <h2 className="cta-band-heading">{heading}</h2>
        <Link to={to} className="btn btn-gold btn-lg">
          {label}
        </Link>
      </div>
    </section>
  );
}
