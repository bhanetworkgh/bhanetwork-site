import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { nav } from '../content/site';
import { Wordmark } from './Wordmark';
import { ThemeToggle } from './ThemeToggle';
import { Icon } from './Icon';

type Spy = 'home' | 'team' | 'faq';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Scrollspy for Home: which of Home (the top), Team or FAQ is in view. A
 * section counts once its top has passed a line a third of the way down the
 * screen, below the nav; the very bottom of the page counts as FAQ.
 */
function useScrollSpy(active: boolean): Spy {
  const [spy, setSpy] = useState<Spy>('home');
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = 60 + window.innerHeight * 0.3;
      const top = (id: string) =>
        document.getElementById(id)?.getBoundingClientRect().top ?? Infinity;
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      setSpy(atBottom || top('faq') <= line ? 'faq' : top('team') <= line ? 'team' : 'home');
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active]);
  return spy;
}

/**
 * The sticky nav: wordmark left; Home · vFarm · Team · FAQ in the middle;
 * the theme toggle and the gold call to action right. Team and FAQ are
 * sections of Home: from any page they switch to Home without a reload and
 * scroll to the section. On a phone the links fold into a menu that closes
 * after a tap; the gold button stays visible.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const onHome = pathname === '/';
  const spy = useScrollSpy(onHome);

  /* Close the menu whenever the route changes, and on Escape. */
  useEffect(() => setOpen(false), [pathname, hash]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (id: string) =>
    id === 'vfarm' ? pathname.startsWith('/vfarm') : onHome && spy === id;

  /*
   * A link to where we already are changes no location, so the router would
   * do nothing. Scroll anyway: Home (or the logo) to the top, Team or FAQ
   * back to its section.
   */
  function onNavClick(e: MouseEvent, to: string) {
    setOpen(false);
    const [path, id = ''] = to.split('#');
    if (path !== pathname || `#${id}` !== (hash || '#')) return;
    e.preventDefault();
    const behavior = reducedMotion() ? 'auto' : 'smooth';
    if (id) document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
    else window.scrollTo({ top: 0, behavior });
  }

  const link = (l: (typeof nav.links)[number], className: string) => (
    <Link
      key={l.id}
      to={l.to}
      className={`${className}${isActive(l.id) ? ' active' : ''}`}
      aria-current={isActive(l.id) ? 'page' : undefined}
      onClick={(e) => onNavClick(e, l.to)}
    >
      {l.label}
    </Link>
  );

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Wordmark onClick={(e) => onNavClick(e, '/')} />
        <nav className="nav-links" aria-label="Primary">
          {nav.links.map((l) => link(l, 'nav-link'))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <Link
            to={nav.cta.to}
            className="btn btn-gold btn-sm nav-cta"
            onClick={(e) => onNavClick(e, nav.cta.to)}
          >
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
        {nav.links.map((l) => link(l, 'nav-menu-link'))}
      </nav>
    </header>
  );
}
