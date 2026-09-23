import type { RenderAsset } from '../types/landing';

/**
 * An approved vFarm render.
 *
 * Only an asset that landing-config marks approved and that carries its
 * `asset_id`, `config_hash` and `cad_revision` ever reaches here (checked in
 * parseLandingConfig). With none, callers render nothing: no drawn cabinet,
 * no placeholder art. The asset's identity rides on the <figure> as data
 * attributes, so anyone inspecting the page can see which approved asset it is.
 */
export function RenderPanel({
  asset,
  className = '',
  eager = false,
  showCaption = true,
}: {
  asset: RenderAsset;
  className?: string;
  eager?: boolean;
  showCaption?: boolean;
}) {
  return (
    <figure
      className={`render ${className}`.trim()}
      data-asset-id={asset.asset_id}
      data-config-hash={asset.config_hash}
      data-cad-revision={asset.cad_revision}
    >
      <img
        className="render-img"
        src={asset.src}
        alt={asset.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
      {showCaption && asset.caption && <figcaption className="render-caption">{asset.caption}</figcaption>}
    </figure>
  );
}
