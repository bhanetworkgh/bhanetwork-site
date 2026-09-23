import type { Render } from '../lib/images';

/**
 * A vFarm render from public/renders/manifest.json — only files from the
 * Approved vFarm renders Drive folder go there. An empty slot never reaches
 * this component: callers render nothing, with no placeholder and no gap.
 * Below-the-fold renders load lazily; `priority` is for the one above it.
 */
export function RenderPanel({
  render,
  sizes,
  className = '',
  priority = false,
  showCaption = true,
}: {
  render: Render;
  sizes: string;
  className?: string;
  priority?: boolean;
  showCaption?: boolean;
}) {
  return (
    <figure className={`render ${className}`.trim()}>
      <img
        className="render-img"
        src={render.src}
        srcSet={render.srcset}
        sizes={sizes}
        width={render.width}
        height={render.height}
        alt={render.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
      {showCaption && render.caption && (
        <figcaption className="render-caption">{render.caption}</figcaption>
      )}
    </figure>
  );
}
