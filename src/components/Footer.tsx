import type { ReactNode } from 'react';
import { Wordmark } from './Wordmark';

export function Footer({ note }: { note?: ReactNode }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="stack" style={{ gap: 'var(--sp-2)' }}>
          <Wordmark />
          <span className="t-body dim">bhanetwork.org</span>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <a href="/vfarm">vFarm</a>
          <a href="/#the-build">The build</a>
          <a href="/#the-engine">The engine</a>
          <a href="mailto:hello@bhanetwork.org">Contact</a>
        </nav>
      </div>
      {note && <div className="container footer-note">{note}</div>}
    </footer>
  );
}
