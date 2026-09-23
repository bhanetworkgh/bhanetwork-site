import { Link } from 'react-router-dom';
import { notFound } from '../content/site';

export function NotFound() {
  return (
    <section className="container section narrow not-found">
      <p className="eyebrow">{notFound.eyebrow}</p>
      <h1 className="display-sm">{notFound.heading}</h1>
      <p className="lead">{notFound.body}</p>
      <div className="btn-row">
        <Link to="/" className="btn btn-gold btn-lg">
          {notFound.home}
        </Link>
      </div>
    </section>
  );
}
