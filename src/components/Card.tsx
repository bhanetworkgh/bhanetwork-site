import type { ReactNode } from 'react';

/** A panel surface: the gloss lip, the soft shadow, 18px corners. */
export function Card({
  children,
  className = '',
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div className={`card ${padded ? 'card-pad' : ''} ${className}`.trim()}>{children}</div>
  );
}
