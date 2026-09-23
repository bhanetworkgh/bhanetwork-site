import type { RenderAsset, StatusTile } from '../types/landing';
import { showsCadRevision, showsRigStatus } from '../lib/provenance';

/**
 * The vFarm render.
 *
 * It renders only an approved asset from landing-config — one that carries
 * its `asset_id`, the `config_hash` it shows and the `cad_revision` it was
 * drawn from (parsed and checked in parseLandingConfig). With no such asset
 * it renders nothing at all: no drawn cabinet, no gradient, no placeholder
 * art. A picture of the rig is a claim about the rig, so it needs provenance
 * like any other.
 *
 * The asset's identity rides on the <figure> as data attributes, so anyone
 * inspecting the page can see which approved asset they are looking at. The
 * rig status line and the caption keep their own provenance gates.
 */
export function RenderPanel({ asset, tile }: { asset: RenderAsset | null; tile: StatusTile }) {
  if (!asset) return null;

  const status = showsRigStatus(tile);
  const revision = showsCadRevision(tile);

  return (
    <figure
      className="render"
      data-asset-id={asset.asset_id}
      data-config-hash={asset.config_hash}
      data-cad-revision={asset.cad_revision}
    >
      <div className="render-ground">
        <img className="render-img" src={asset.src} alt={asset.alt} />
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
