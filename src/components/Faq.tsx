import type { FaqItem } from '../types/landing';
import { Icon } from './Icon';

/** The FAQ accordion. Native <details>, so it works before hydration and with a keyboard. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.question} className="faq-item">
          <summary className="faq-q">
            <span>{item.question}</span>
            <span className="faq-icon">
              <Icon name="plus" size={18} />
            </span>
          </summary>
          <p className="faq-a">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
