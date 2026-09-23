import photos from 'virtual:team-photos';

/** "Kavin G N" → "KG", "Ahad" → "A". */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

/**
 * A builder's photo from public/team/<slug>.<ext>, or — when there is no
 * photo yet — a neutral monogram tile. Never a stock image.
 */
export function Avatar({
  slug,
  name,
  className = '',
  eager = false,
}: {
  slug: string;
  name: string;
  className?: string;
  eager?: boolean;
}) {
  const src = photos[slug];
  if (src) {
    return (
      <img
        className={`avatar ${className}`.trim()}
        src={src}
        alt={name}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    );
  }
  return (
    <span className={`avatar avatar-monogram ${className}`.trim()} role="img" aria-label={name}>
      {initials(name)}
    </span>
  );
}
