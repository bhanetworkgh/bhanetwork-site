import { useEffect, useRef, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanding } from '../config/landingConfig';
import { applyMeta, metaFor } from '../lib/meta';
import { Nav } from './Nav';
import { Footer } from './Footer';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Scroll and head bookkeeping for client-side navigation.
 *
 * Scrolling on navigation (below), and the <head> tags following the route,
 * so the tab title and a copied link match the page on screen.
 */
function useRouteEffects(notFound: boolean) {
  const { pathname, hash } = useLocation();
  const { config } = useLanding();

  useEffect(() => {
    applyMeta(metaFor(notFound ? '*' : pathname, config));
  }, [pathname, notFound, config]);

  /*
   * - A new page starts at the top.
   * - A #hash scrolls smoothly to its section, clear of the sticky nav (the
   *   sections carry scroll-margin-top). Arriving from another page — Team or
   *   FAQ clicked on /vfarm — the new page starts at the top and then glides
   *   down to the section.
   * - Clearing the hash on the same page (Home clicked while on /#faq) glides
   *   back to the top.
   * - On first load the browser has already placed the page; leave it.
   */
  const lastPath = useRef<string | null>(null);
  useEffect(() => {
    const firstLoad = lastPath.current === null;
    const newPage = lastPath.current !== pathname;
    lastPath.current = pathname;
    if (firstLoad) return;
    const behavior: ScrollBehavior = reducedMotion() ? 'auto' : 'smooth';
    if (newPage) window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    if (!hash) {
      if (!newPage) window.scrollTo({ top: 0, behavior });
      return;
    }
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior, block: 'start' }));
  }, [pathname, hash]);

  /* Fade-and-rise on scroll: each .reveal gets .is-in once it is on screen. */
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)'));
    if (typeof IntersectionObserver === 'undefined' || reducedMotion()) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}

export function Layout({
  children,
  notFound = false,
}: {
  children: ReactNode;
  notFound?: boolean;
}) {
  useRouteEffects(notFound);
  return (
    <div className="app aurora">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
