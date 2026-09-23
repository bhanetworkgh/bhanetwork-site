import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME } from '../content/site';

/**
 * The logo: the BHA mark — the same gold-on-black square as the favicon
 * (public/favicon.svg) — with the network name beside it. Links home.
 */
export function Wordmark({ onClick }: { onClick?: (e: MouseEvent) => void }) {
  return (
    <Link to="/" className="wordmark" aria-label={`${SITE_NAME} — Home`} onClick={onClick}>
      <img className="wordmark-mark" src="/favicon.svg?v=3" width={36} height={36} alt="" />
      <span className="wordmark-text" aria-hidden="true">
        {SITE_NAME}
      </span>
    </Link>
  );
}
