import { Link } from 'react-router-dom';
import { footer } from '../content/site';

/**
 * The forest footer: one line about what we're doing, the contact address,
 * the social pages (live ones link out, the rest say "soon"), the site links, and the network's name set large as a watermark.
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
          <div className="footer-social">
            <span className="footer-group-label">{footer.socialLabel}</span>
            <ul className="footer-social-list">
              {footer.social.map((s) => (
                <li key={s.id}>
                  {s.href ? (
                    <a
                      className="footer-social-pill"
                      href={s.href}
                      target="_blank"
                      rel="me noopener noreferrer"
                      aria-label={`${s.label}${s.handle ? `, ${s.handle}` : ''} (opens in a new tab)`}
                    >
                      {s.label}
                      <span className="footer-social-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="footer-social-pill is-soon" aria-label={`${s.label}, coming soon`}>
                      {s.label}
                      <span className="footer-social-soon" aria-hidden="true">
                        {footer.socialSoon}
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
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
