import { Link } from 'react-router-dom';
import { SITE_NAME } from '../content/site';

/** The BHA mark, gold on black, with the network name beside it. Links home. */
export function Wordmark() {
  return (
    <Link to="/" className="wordmark" aria-label={`${SITE_NAME} — Home`}>
      <span className="wordmark-mark" aria-hidden="true">
        BHA
      </span>
      <span className="wordmark-text" aria-hidden="true">
        {SITE_NAME}
      </span>
    </Link>
  );
}
