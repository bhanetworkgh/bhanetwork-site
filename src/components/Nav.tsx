import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav } from '../content/site';
import { Wordmark } from './Wordmark';
import { ThemeToggle } from './ThemeToggle';
import { Icon } from './Icon';

/**
 * The sticky nav: wordmark left, page links in the middle, the theme toggle
 * and the gold call to action right. On a phone the links fold into a menu;
 * the gold button stays visible.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  /* Close the menu whenever the route changes, and on Escape. */
  useEffect(() => setOpen(false), [pathname, hash]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Wordmark />
        <nav className="nav-links" aria-label="Primary">
          {nav.links.map((l) => (
            <NavLink key={l.to} to={l.to} end className="nav-link">
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <Link to={nav.cta.to} className="btn btn-gold btn-sm nav-cta">
            {nav.cta.label}
          </Link>
          <button
            type="button"
            className="icon-btn nav-menu-btn"
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={18} />
            <span className="sr-only">{nav.menuLabel}</span>
          </button>
        </div>
      </div>
      <nav
        id="nav-menu"
        className={`nav-menu${open ? ' is-open' : ''}`}
        aria-label={nav.menuLabel}
        hidden={!open}
      >
        {nav.links.map((l) => (
          <NavLink key={l.to} to={l.to} end className="nav-menu-link">
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
