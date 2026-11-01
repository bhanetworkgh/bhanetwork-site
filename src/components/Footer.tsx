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
  /* simple-icons no longer ships LinkedIn's mark (LinkedIn asked for it to
     come out), so its 24 by 24 "in" square is kept here, as last published
     there (CC0). */
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
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
