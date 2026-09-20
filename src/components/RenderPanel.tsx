import type { StatusTile } from '../types/landing';
import { SampleTag } from './Tag';

/**
 * The vFarm render panel: the gradient ground with a frosted status strip
 * floating over it.
 *
 * The strip's words come from `status_tile.render_status` and its caption from
 * `render_label`. There is no illustration file yet, so the panel draws the
 * rig's four tiers as plain shapes — geometry, not a claim. It is decorative,
 * so it is hidden from assistive technology and the caption carries the
 * meaning instead.
 */
export function RenderPanel({ tile }: { tile: StatusTile }) {
  return (
    <figure className="render">
      <div className="render-ground hero-grad">
        <div className="render-rig" aria-hidden="true">
          <span className="render-tier" />
          <span className="render-tier" />
          <span className="render-tier" />
          <span className="render-tier" />
        </div>
        {tile.render_status && (
          <div className="frost render-strip">
            <span className="t-body ink">{tile.render_status}</span>
            <SampleTag when={tile.sample} />
          </div>
        )}
      </div>
      {tile.render_label && (
        <figcaption className="t-kicker render-caption">{tile.render_label}</figcaption>
      )}
    </figure>
  );
}
