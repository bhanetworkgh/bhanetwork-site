import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME } from '../content/site';

/**
 * The logo: the green BHA tree (public/mark-tree.png, cut from the BHA logo,
 * public/Untitled Design.png) with the network name beside it. Links home.
 * The favicon is the same tree on a black square.
 */
export function Wordmark({ onClick }: { onClick?: (e: MouseEvent) => void }) {
  return (
    <Link to="/" className="wordmark" aria-label={`${SITE_NAME}, Home`} onClick={onClick}>
      <img className="wordmark-mark" src="/mark-tree.png?v=4" width={36} height={36} alt="" />
      <span className="wordmark-text" aria-hidden="true">
        {SITE_NAME}
      </span>
    </Link>
  );
}
