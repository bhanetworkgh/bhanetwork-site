import type { WhatVFarmIsItem } from '../../../types/landing';

/** The four items from `what_vfarm_is`. Title in ink, body in dim, nothing added. */
export function WhatVFarmIs({ items }: { items: WhatVFarmIsItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="container section">
      <h2 className="t-title section-head">What vFarm is</h2>
      <ul className="what-grid">
        {items.map((item) => (
          <li key={item.title} className="what-item stack">
            <h3 className="t-card-title ink">{item.title}</h3>
            {item.body && <p className="t-body-lg dim">{item.body}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
