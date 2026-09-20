import { Wordmark } from './Wordmark';

/**
 * The top bar. It sits over the hero wash, frosted, so the colour behind it
 * reads through rather than stopping at a hard edge.
 *
 * `cta` is passed in rather than built here: whether a call to action may
 * exist at all is a claim-state decision, and that is made once, by the page.
 */
export function TopBar({ cta }: { cta?: React.ReactNode }) {
  return (
    <header className="topbar frost-bar">
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
  );
}
