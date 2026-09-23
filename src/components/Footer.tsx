import { Link } from 'react-router-dom';
import { footer } from '../content/site';
import { Wordmark } from './Wordmark';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Wordmark />
          <p className="t-body dim">
            {footer.contactLabel}:{' '}
            <a className="link" href={`mailto:${footer.email}`}>
              {footer.email}
            </a>
          </p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          {footer.links.map((l) => (
            <Link key={l.to} to={l.to}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="container footer-base">
        <span>{footer.copyright}</span>
        <a href={footer.teamLogin.href} className="footer-login">
          {footer.teamLogin.label}
        </a>
      </div>
    </footer>
  );
}
