import { useState } from 'react';
import type { Render } from '../lib/images';

/**
 * The hero's three vFarm renders, stacked and floating. Hovering the stack
 * fans the cards out; hovering one card brings it forward and zooms it. On a
 * touch screen a tap brings a card forward. One caption under the stack says
 * what every card is, because each card's own banner is too small to read here.
 */
export function RenderStack({ renders, note }: { renders: Render[]; note: string }) {
  const [front, setFront] = useState(0);
  const cards = renders.slice(0, 3);
  if (!cards.length) return null;
  return (
    <figure className="stack">
      <div className="stack-cards">
        {cards.map((r, i) => {
          /* Positions round the stack: the front card sits in the middle. */
          const slot = (i - front + cards.length) % cards.length;
          return (
            <button
              key={r.src}
              type="button"
              className={`stack-card stack-slot-${slot}`}
              onMouseEnter={() => setFront(i)}
              onFocus={() => setFront(i)}
              onClick={() => setFront(i)}
              aria-label={r.alt}
              aria-pressed={slot === 0}
            >
              <img
                src={r.src}
                srcSet={r.srcset}
                sizes="(min-width: 1100px) 520px, 90vw"
                width={r.width}
                height={r.height}
                alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </button>
          );
        })}
      </div>
      <figcaption className="stack-note">{note}</figcaption>
    </figure>
  );
}
