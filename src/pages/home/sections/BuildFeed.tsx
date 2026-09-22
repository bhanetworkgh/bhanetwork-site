import type { BuildFeedItem } from '../../../types/landing';

/** The date as the feed shows it: "14 Sep 2026", or the raw string if it isn't a date. */
function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function Duration({ value }: { value: string }) {
  if (!value) return null;
  return (
    <span className="duration tabular">
      <span className="sr-only">Duration </span>
      {value}
    </span>
  );
}

function Featured({ item }: { item: BuildFeedItem }) {
  const meta = [item.date ? formatDate(item.date) : '', item.lane].filter(Boolean).join(' · ');
  return (
    <article className="card feed-featured">
      <div className="feed-featured-art hero-grad">
        <Duration value={item.duration} />
      </div>
      <div className="feed-featured-copy stack">
        <h3 className="t-title-sm">{item.title}</h3>
        {item.body && <p className="t-body-lg dim">{item.body}</p>}
        {meta && <span className="t-kicker">{meta}</span>}
      </div>
    </article>
  );
}

function Small({ item }: { item: BuildFeedItem }) {
  return (
    <article className="card card-pad feed-card stack">
      <Duration value={item.duration} />
      <h3 className="t-card-title">{item.title}</h3>
      {item.body && <p className="t-body dim">{item.body}</p>}
    </article>
  );
}

export function BuildFeed({ items }: { items: BuildFeedItem[] }) {
  /*
   * Placeholder entries are hidden, not labelled. There is no "Sample" pill on
   * this site any more: an item nobody can stand behind does not appear.
   */
  const real = items.filter((item) => !item.sample);
  if (real.length === 0) return null;

  const featured = real.find((item) => item.featured);
  const rest = real.filter((item) => item !== featured).slice(0, 4);

  return (
    <section className="container section" id="the-build">
      <div className="section-head stack">
        <span className="t-kicker">Built in public</span>
        <h2 className="t-title">Latest from the build</h2>
      </div>
      {featured && <Featured item={featured} />}
      {rest.length > 0 && (
        <div className="feed-grid">
          {rest.map((item) => (
            <Small key={item.title} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
