import { Link } from 'react-router-dom';
import { footer } from '../content/site';

/**
 * The forest footer: one line about what we're doing, the contact address,
 * the site links, and the network's name set large as a watermark.
 */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <p className="footer-line">{footer.line}</p>
          <p className="footer-contact">
            {footer.contactLabel}{' '}
            <a className="footer-email" href={`mailto:${footer.email}`}>
              {footer.email}
            </a>
          </p>
        </div>
        {footer.groups.map((g) => (
          <nav key={g.label} className="footer-group" aria-label={g.label}>
            <span className="footer-group-label">{g.label}</span>
            {g.links.map((l) => (
              <Link key={l.to} to={l.to} className="footer-link">
                {l.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="container footer-base">
        <span>{footer.copyright}</span>
        <span>{footer.launch}</span>
      </div>
      <div className="container footer-mark" aria-hidden="true">
        {footer.watermark}
      </div>
    </footer>
  );
}
