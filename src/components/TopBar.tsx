import { useEffect, useRef, useState } from 'react';
import { Wordmark } from './Wordmark';

/**
 * Watch a sentinel pinned to the top 24px of the document.
 *
 * An IntersectionObserver fires only when the sentinel crosses the viewport
 * edge, so nothing runs on a scroll frame at all. Where there is no observer,
 * a passive listener reads window.scrollY — a cheap read that forces no
 * layout — and React bails out of a set that does not change the value, so
 * the class is toggled on the transition and not on every frame.
 */
function useScrolled(sentinel: React.RefObject<HTMLDivElement | null>, threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const node = sentinel.current;
    if (node && typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) => setScrolled(!entry.isIntersecting),
        { threshold: 0 },
      );
      observer.observe(node);
      return () => observer.disconnect();
    }

    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sentinel, threshold]);

  return scrolled;
}

/**
 * The top bar.
 *
 * At the top of the page it is fully transparent and sits over the hero wash,
 * which is the point of the wash. Once the page has scrolled past the
 * sentinel it takes a near-opaque surface, a hairline and a blur, so page
 * text cannot read through it.
 *
 * `cta` is passed in rather than built here: whether a call to action may
 * exist at all is a claim-state decision, and that is made once, by the page.
 */
export function TopBar({ cta }: { cta?: React.ReactNode }) {
  const sentinel = useRef<HTMLDivElement>(null);
  const scrolled = useScrolled(sentinel);

  return (
    <>
      <div className="topbar-sentinel" ref={sentinel} aria-hidden="true" />
      <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container topbar-inner">
          <Wordmark />
          <nav className="topbar-nav" aria-label="Primary">
            <a href="/vfarm">vFarm</a>
            <a href="/#the-build">The build</a>
            <a href="/#the-engine">The engine</a>
          </nav>
          <div className="topbar-cta">{cta}</div>
        </div>
      </header>
    </>
  );
}
