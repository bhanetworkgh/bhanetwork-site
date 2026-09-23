import { images } from '../lib/images';

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
 * A builder's photo — public/team/<slug>.<ext>, turned into a 4:5 WebP
 * portrait at build time — or, when there is no photo, a neutral monogram
 * tile. Never a stock image.
 */
export function Avatar({
  slug,
  name,
  className = '',
  sizes = '(min-width: 900px) 360px, 50vw',
  eager = false,
}: {
  slug: string;
  name: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
}) {
  const photo = images.team[slug];
  if (photo) {
    return (
      <img
        className={`avatar ${className}`.trim()}
        src={photo.src}
        srcSet={photo.srcset}
        sizes={sizes}
        width={photo.width}
        height={photo.height}
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
