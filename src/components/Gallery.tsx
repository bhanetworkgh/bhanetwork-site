import { useCallback, useState } from 'react';
import type { Render } from '../lib/images';
import { RenderPanel } from './RenderPanel';
import { Modal } from './Modal';

/** The /vfarm gallery. A click opens the render large, in a lightbox. */
export function Gallery({ items, closeLabel }: { items: Render[]; closeLabel: string }) {
  const [open, setOpen] = useState<Render | null>(null);
  const close = useCallback(() => setOpen(null), []);
  return (
    <>
      <ul className="gallery">
        {items.map((r) => (
          <li key={r.src}>
            <button type="button" className="gallery-item" onClick={() => setOpen(r)}>
              <RenderPanel render={r} sizes="(min-width: 1200px) 380px, (min-width: 700px) 33vw, 100vw" showCaption={false} />
              <span className="sr-only">{r.alt}</span>
            </button>
          </li>
        ))}
      </ul>
      {open && (
        <Modal label={open.alt} closeLabel={closeLabel} onClose={close} className="lightbox">
          <RenderPanel render={open} sizes="(min-width: 1100px) 1040px, 100vw" priority />
        </Modal>
      )}
    </>
  );
}
