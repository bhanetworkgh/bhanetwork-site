import { Link } from 'react-router-dom';
import { siFacebook, siInstagram, siTiktok, siX } from 'simple-icons';
import { footer } from '../content/site';
import { images } from '../lib/images';
import { Icon } from './Icon';

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
 * The footer, after VerdaAgro: the network's name set huge in butter over a
 * photo (or the forest ground until one is chosen), and a frosted glass card
 * over its lower half. Left: the motto, the address and the text line in large
 * butter, the text-message opt-in word for word with the A2P campaign, and the
 * social pills. Middle: useful links. Right: vFarm updates. A butter button
 * takes you back to the top.
 */
export function Footer() {
  const bg = images.photos.footer;
  const toTop = () =>
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  return (
    <footer className={`footer${bg ? ' has-photo' : ''}`}>
      {bg && (
        <img className="footer-photo" src={bg.src} srcSet={bg.srcset} sizes="100vw" alt="" loading="lazy" decoding="async" />
      )}
      <div className="footer-shade" aria-hidden="true" />
      <div className="container footer-stage">
        <p className="footer-mark" aria-hidden="true">
          {footer.watermark}
        </p>
        <div className="footer-card">
          <div className="footer-top">
            <div className="footer-brand">
              <p className="footer-motto">
                {footer.motto.map((m) => (
                  <span key={m}>{m} </span>
                ))}
              </p>
              <a className="footer-big" href={`mailto:${footer.email}`}>
                {footer.email}
              </a>
              <a className="footer-big" href={footer.sms.href}>
                {footer.textLabel} {footer.sms.number}
              </a>
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
                        <span>{s.label}</span>
                      </a>
                    ) : (
                      <span
                        className="footer-social-pill is-soon"
                        title={`${s.label}: coming ${footer.socialSoon}`}
                      >
                        <SocialIcon id={s.id} />
                        <span>
                          {s.label} · {footer.socialSoon}
                        </span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <nav className="footer-group" aria-label={footer.linksLabel}>
              <span className="footer-group-title">{footer.linksLabel}</span>
              {footer.groups
                .flatMap((g) => g.links)
                .map((l) => (
                  <Link key={l.to} to={l.to} className="footer-link">
                    {l.label}
                  </Link>
                ))}
            </nav>

            <div className="footer-updates">
              <span className="footer-group-title">{footer.updates.heading}</span>
              <p>{footer.updates.body}</p>
              <Link to={footer.updates.button.to} className="footer-updates-link">
                {footer.updates.button.label}
                <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>

          <p className="footer-sms" id="text-us">
            <span className="footer-sms-label">{footer.sms.label}. </span>
            {footer.sms.before}
            <strong>{footer.sms.keyword}</strong>
            {footer.sms.to}
            <a href={footer.sms.href}>{footer.sms.number}</a>
            {footer.sms.after}{' '}
            <Link to="/terms">{footer.sms.termsLabel}</Link>
            {' · '}
            <Link to="/privacy">{footer.sms.privacyLabel}</Link>
          </p>

          <div className="footer-base">
            <span>{footer.copyright}</span>
          </div>
        </div>
        <button type="button" className="footer-top-btn" onClick={toTop}>
          <Icon name="arrowUp" size={20} />
          <span className="sr-only">{footer.backToTop}</span>
        </button>
      </div>
    </footer>
  );
}
