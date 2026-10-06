import { Link } from 'react-router-dom';
import { siFacebook, siInstagram, siTiktok, siX } from 'simple-icons';
import { footer } from '../content/site';

/** The platforms' own marks, from the simple-icons package: one 24 by 24 path each. */
const SOCIAL_ICON: Record<string, string> = {
  x: siX.path,
  instagram: siInstagram.path,
  facebook: siFacebook.path,
  tiktok: siTiktok.path,
};

function SocialIcon({ id }: { id: string }) {
  const d = SOCIAL_ICON[id];
  if (!d) return null;
  return (
    <svg className="footer-social-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path d={d} fill="currentColor" />
    </svg>
  );
}

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
                      title={`${s.label}${s.handle ? ` ${s.handle}` : ''}`}
                      target="_blank"
                      rel="me noopener noreferrer"
                      aria-label={`${s.label}${s.handle ? `, ${s.handle}` : ''} (opens in a new tab)`}
                    >
                      <SocialIcon id={s.id} />
                    </a>
                  ) : (
                    <span
                      className="footer-social-pill is-soon"
                      role="img"
                      aria-label={`${s.label}, coming ${footer.socialSoon}`}
                      title={`${s.label}: coming ${footer.socialSoon}`}
                    >
                      <SocialIcon id={s.id} />
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
