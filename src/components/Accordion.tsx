import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import type { AnswerPart, FaqEntry } from '../content/faq';
import { Icon } from './Icon';

function Answer({ parts }: { parts: AnswerPart[] }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          part
        ) : 'to' in part ? (
          <Link key={i} to={part.to} className="link">
            {part.text}
          </Link>
        ) : (
          <a key={i} href={part.href} className="link">
            {part.text}
          </a>
        ),
      )}
    </>
  );
}

/**
 * The FAQ accordion: one item open at a time, one column split by hairlines.
 * Each question is a real <button> with aria-expanded and aria-controls, so
 * Tab, Enter and Space work and screen readers hear the state.
 */
export function Accordion({ items }: { items: FaqEntry[] }) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-q${i}`;
        const panel = `${base}-a${i}`;
        return (
          <div key={item.q} className={`accordion-item${isOpen ? ' is-open' : ''}`}>
            <h3 className="accordion-heading">
              <button
                type="button"
                id={btn}
                className="accordion-q"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <span className="accordion-icon">
                  <Icon name="plus" size={20} />
                </span>
              </button>
            </h3>
            <div id={panel} role="region" aria-labelledby={btn} className="accordion-a" hidden={!isOpen}>
              <p>
                <Answer parts={item.a} />
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
