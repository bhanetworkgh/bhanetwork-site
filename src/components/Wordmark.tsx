/** The BHA mark: a monogram tile and the network name. */
export function Wordmark({ href = '/' }: { href?: string }) {
  return (
    <a href={href} className="wordmark">
      <span className="wordmark-mark" aria-hidden="true">
        B
      </span>
      <span className="wordmark-text">Bays Horizon Network</span>
    </a>
  );
}
