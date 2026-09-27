import { useEffect } from 'react';

/**
 * Scroll motion, with GSAP and its ScrollTrigger plugin (27 Sep 2026).
 *
 * - Sections and cards rise into place as they scroll into view, a grid's
 *   cards one after another.
 * - The hero's panel drifts up a little slower than the page (parallax).
 * - The principles band grows to full size as it arrives.
 * - The "Bays Horizon" footer mark rises as the footer comes up.
 *
 * GSAP is loaded after the page is interactive, so it never delays the first
 * paint. Nothing moves for anyone who has asked their device for less motion,
 * and if GSAP fails to load, everything is simply shown.
 */
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function showAll() {
  document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)').forEach((el) => el.classList.add('is-in'));
}

export function useScrollMotion(key: string) {
  useEffect(() => {
    if (reducedMotion()) {
      showAll();
      return;
    }
    let cancelled = false;
    let revert: (() => void) | undefined;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          ScrollTrigger.batch('.reveal:not(.is-in)', {
            start: 'top 88%',
            once: true,
            onEnter: (batch) => {
              batch.forEach((el) => {
                el.classList.add('is-in');
                /* Hover lifts use a CSS transition on transform; pause it while GSAP moves the card. */
                (el as HTMLElement).style.transition = 'none';
              });
              gsap.fromTo(
                batch,
                { y: 44, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.09, clearProps: 'transform,opacity,transition' },
              );
            },
          });

          if (document.querySelector('.hero .hero-panel, .hero .hero-media')) {
            gsap.to('.hero .hero-panel, .hero .hero-media', {
              yPercent: -10,
              ease: 'none',
              scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
            });
          }

          if (document.querySelector('.band-card')) {
            gsap.fromTo(
              '.band-card',
              { scale: 0.93 },
              {
                scale: 1,
                ease: 'none',
                scrollTrigger: { trigger: '.band-card', start: 'top bottom', end: 'top 45%', scrub: true },
              },
            );
          }

          gsap.fromTo(
            '.footer-mark',
            { yPercent: 45 },
            {
              yPercent: 0,
              ease: 'none',
              scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: true },
            },
          );
        });
        revert = () => ctx.revert();
        /* Pages that change height after hydration (photos, the form) need fresh measurements. */
        window.setTimeout(() => ScrollTrigger.refresh(), 400);
      })
      .catch(showAll);

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [key]);
}
