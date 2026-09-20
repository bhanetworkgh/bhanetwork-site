import { useEffect, type ReactNode } from 'react';
import { TopBar } from './TopBar';
import { Footer } from './Footer';

/** Page chrome. Renders whatever state the config is in — it never blanks. */
export function Shell({
  cta,
  footerNote,
  children,
}: {
  cta?: ReactNode;
  footerNote?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <TopBar cta={cta} />
      <main id="main">{children}</main>
      <Footer note={footerNote} />
    </>
  );
}

/**
 * What a page shows when the config could not be read.
 *
 * It says nothing about vFarm. Every claim this site makes lives in the
 * config, so with no config there is nothing to claim — and, by the same
 * rules, no call to action of any kind.
 */
export function ConfigUnavailable() {
  return (
    <section className="container section">
      <h1 className="t-title">Bays Horizon Network</h1>
      <p className="t-body-lg dim" style={{ marginTop: 'var(--sp-4)' }}>
        This page can't load its content right now. Try again shortly, or email{' '}
        <a className="link" href="mailto:hello@bhanetwork.org">
          hello@bhanetwork.org
        </a>
        .
      </p>
    </section>
  );
}

/** A quiet placeholder while the config is in flight. */
export function ConfigLoading() {
  return (
    <section className="container section" aria-busy="true">
      <p className="t-body dim">Loading…</p>
    </section>
  );
}

/**
 * The page's own description comes from the config too, once it has loaded.
 * The static tag in the HTML head makes no claim about vFarm on purpose.
 */
export function useDescription(text: string | undefined) {
  useEffect(() => {
    if (!text) return;
    document.querySelector('meta[name="description"]')?.setAttribute('content', text);
  }, [text]);
}
