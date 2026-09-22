import type { StatusTile } from '../types/landing';
import { showsCadRevision, showsRigStatus } from '../lib/provenance';

/**
 * The vFarm render panel: the gradient ground, and — only when something can
 * prove them — the rig status line and the CAD revision caption.
 *
 * The CAD revision must be the named Onshape version on the configuration row
 * (Mechanics v0.2.2 §13.1), never a workspace ID and never hand-typed, so with
 * no configuration source the caption is simply absent.
 *
 * There is no illustration file yet, so the panel draws the rig's four tiers
 * as plain shapes — geometry, not a claim. It is decorative, so it is hidden
 * from assistive technology.
 */
export function RenderPanel({ tile }: { tile: StatusTile }) {
  const status = showsRigStatus(tile);
  const revision = showsCadRevision(tile);

  return (
    <figure className="render">
      <div className="render-ground hero-grad">
        <div className="render-rig" aria-hidden="true">
          <span className="render-tier" />
          <span className="render-tier" />
          <span className="render-tier" />
          <span className="render-tier" />
        </div>
        {status && (
          <div className="frost render-strip">
            <span className="t-body ink">{tile.render_status}</span>
          </div>
        )}
      </div>
      {revision && (
        <figcaption className="t-kicker render-caption">{tile.render_label}</figcaption>
      )}
    </figure>
  );
}
