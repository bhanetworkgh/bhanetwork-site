import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  builders,
  buildingHeading,
  closeLabel,
  cta,
  founder,
  hero,
  principles,
  type Builder,
} from '../content/team';
import { Avatar } from '../components/Avatar';
import { CtaBand } from '../components/CtaBand';
import { Icon } from '../components/Icon';
import { Modal } from '../components/Modal';

/** Opened from a tile, so closing can step back rather than add history. */
interface OpenedHere {
  fromTile?: boolean;
}

function BuilderPanel({ b, onClose }: { b: Builder; onClose: () => void }) {
  return (
    <Modal label={b.name} closeLabel={closeLabel} onClose={onClose} className="builder-modal">
      <div className="builder-head">
        <Avatar slug={b.slug} name={b.name} className="avatar-md" sizes="88px" eager />
        <div>
          <h2 className="card-title-lg">{b.name}</h2>
          <p className="builder-role">{b.role}</p>
        </div>
      </div>
      <p className="card-body">{b.bio}</p>
      <h3 className="builder-subhead">{buildingHeading}</h3>
      <ul className="builder-list">
        {b.building.map((item) => (
          <li key={item}>
            <span className="builder-check">
              <Icon name="check" size={14} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Modal>
  );
}

export function Team() {
  const { hash, state } = useLocation();
  const navigate = useNavigate();
  /*
   * The pre-rendered HTML cannot know the #hash, so the panel opens only once
   * the page has hydrated; a direct link to /team#<slug> opens it a moment
   * after load.
   */
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const slug = decodeURIComponent(hash.slice(1));
  const open = hydrated ? (builders.find((b) => b.slug === slug) ?? null) : null;

  const close = useCallback(() => {
    if ((state as OpenedHere | null)?.fromTile) navigate(-1);
    else navigate({ pathname: '/team', hash: '' }, { replace: true });
  }, [navigate, state]);

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

      <section className="container section">
        <article className="frost founder reveal">
          <Avatar
            slug={founder.slug}
            name={founder.name}
            className="founder-photo"
            sizes="(min-width: 800px) 300px, 90vw"
            eager
          />
          <div className="founder-copy">
            <p className="eyebrow">{founder.eyebrow}</p>
            <h2 className="card-title-lg">{founder.name}</h2>
            <p className="builder-role">{founder.role}</p>
            {founder.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="card-body">
                {p}
              </p>
            ))}
          </div>
        </article>
      </section>

      <section className="container section">
        <ul className="builder-grid">
          {builders.map((b) => (
            <li key={b.slug} className="reveal">
              <Link
                to={{ pathname: '/team', hash: b.slug }}
                state={{ fromTile: true } satisfies OpenedHere}
                className="builder-tile"
              >
                <Avatar slug={b.slug} name={b.name} className="tile-photo" />
                <span className="tile-name">{b.name}</span>
                <span className="tile-role">{b.role}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand heading={cta.heading} to={cta.button.to} label={cta.button.label} />

      {open && <BuilderPanel b={open} onClose={close} />}
    </>
  );
}
