import { useCallback, useState } from 'react';
import type { RenderAsset } from '../types/landing';
import { RenderPanel } from './RenderPanel';
import { Modal } from './Modal';

/** Approved renders only. A click opens the render large, in a lightbox. */
export function Gallery({ items, closeLabel }: { items: RenderAsset[]; closeLabel: string }) {
  const [open, setOpen] = useState<RenderAsset | null>(null);
  const close = useCallback(() => setOpen(null), []);
  return (
    <>
      <ul className="gallery">
        {items.map((asset) => (
          <li key={asset.asset_id}>
            <button type="button" className="gallery-item" onClick={() => setOpen(asset)}>
              <RenderPanel asset={asset} showCaption={false} />
              <span className="sr-only">{asset.alt}</span>
            </button>
          </li>
        ))}
      </ul>
      {open && (
        <Modal label={open.alt} closeLabel={closeLabel} onClose={close} className="lightbox">
          <RenderPanel asset={open} eager />
        </Modal>
      )}
    </>
  );
}
