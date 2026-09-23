import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  builders,
  buildingHeading,
  cta,
  founder,
  hero,
  intro,
  principles,
  type Person,
} from '../content/team';
import { Avatar } from '../components/Avatar';
import { CtaBand } from '../components/CtaBand';

/**
 * One full profile: photo left, text right (photo on top on a phone).
 * The card's id is the builder's slug, so /team#<slug> lands on it.
 */
function Profile({
  person,
  isFounder = false,
  highlighted,
}: {
  person: Person;
  isFounder?: boolean;
  highlighted: boolean;
}) {
  return (
    <article
      id={person.slug}
      className={`profile${isFounder ? ' profile-founder' : ''}${highlighted ? ' is-highlighted' : ''}`}
      aria-labelledby={`${person.slug}-name`}
    >
      <Avatar
        slug={person.slug}
        name={person.name}
        className="profile-photo"
        sizes={
          isFounder
            ? '(min-width: 1024px) 220px, (min-width: 700px) 150px, 120px'
            : '(min-width: 1024px) 180px, (min-width: 700px) 150px, 120px'
        }
        eager={isFounder}
      />
      <div className="profile-text">
        <h2 className="profile-name" id={`${person.slug}-name`}>
          {person.name}
        </h2>
        <p className="profile-role">{person.role}</p>
        {person.bio.map((p) => (
          <p key={p.slice(0, 32)} className="profile-bio">
            {p}
          </p>
        ))}
        {person.building.length > 0 && (
          <>
            <h3 className="profile-subhead">{buildingHeading}</h3>
            <ul className="profile-list">
              {person.building.map((item) => (
                <li key={item.slice(0, 32)}>{item}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </article>
  );
}

export function Team() {
  const { hash } = useLocation();
  /*
   * /team#<slug>: the layout scrolls to the card (its scroll-margin clears the
   * sticky nav); here the card's border lights up briefly so the eye finds it.
   * Only after hydration — the pre-rendered HTML cannot know the hash.
   */
  const [highlight, setHighlight] = useState<string | null>(null);
  useEffect(() => {
    const slug = decodeURIComponent(hash.slice(1));
    if (!slug) return;
    setHighlight(slug);
    const t = window.setTimeout(() => setHighlight(null), 2200);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <>
      <section className="hero hero-short">
        <div className="container">
          <h1 className="display">{hero.heading}</h1>
          <p className="lead">{hero.sub}</p>
          <ul className="principles">
            {principles.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container section-tight">
        <div className="team-intro">
          {intro.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="profiles">
          <Profile person={founder} isFounder highlighted={highlight === founder.slug} />
          {builders.map((b) => (
            <Profile key={b.slug} person={b} highlighted={highlight === b.slug} />
          ))}
        </div>
      </section>

      <CtaBand heading={cta.heading} to={cta.button.to} label={cta.button.label} />
    </>
  );
}
