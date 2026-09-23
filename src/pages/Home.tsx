import { Link } from 'react-router-dom';
import { building, ctaBand, hero, whatWeDo, whyFarm } from '../content/home';
import { team } from '../content/team';
import { faq } from '../content/faq';
import { Accordion } from '../components/Accordion';
import { Avatar } from '../components/Avatar';
import { countdown } from '../content/site';
import { remaining } from '../lib/flagship';
import { Countdown, useNow } from '../components/Countdown';
import { CtaBand } from '../components/CtaBand';
import { Icon } from '../components/Icon';
import { RenderPanel } from '../components/RenderPanel';
import { images } from '../lib/images';

/** The floating glass cards beside the hero. Facts that cannot go stale. */
function HeroCards() {
  const now = useNow();
  const days = now === null ? null : remaining(now).days;
  const { cards } = hero;
  return (
    <div className="hero-cards">
      <div className="glass float-card float-a">
        <span className="float-icon">
          <Icon name="calendar" size={18} />
        </span>
        <span className="float-label">{cards.launch.label}</span>
        <span className="float-value">{countdown.dateLabel}</span>
        <span className="float-note tabular">{days === null ? ' ' : countdown.daysToGo(days)}</span>
      </div>
      <div className="glass float-card float-b">
        <span className="float-icon">
          <Icon name="users" size={18} />
        </span>
        <span className="float-label">{cards.builders.label}</span>
        <span className="float-value">{cards.builders.value}</span>
      </div>
      <div className="glass float-card float-c">
        <span className="float-icon">
          <Icon name="log" size={18} />
        </span>
        <span className="float-label">{cards.sessions.label}</span>
        <span className="float-line">{cards.sessions.value}</span>
      </div>
      <div className="glass float-card float-d">
        <span className="float-icon">
          <Icon name="leaf" size={18} />
        </span>
        <span className="float-label">{cards.ground.label}</span>
        <span className="float-line">{cards.ground.value}</span>
      </div>
    </div>
  );
}

export function Home() {
  /* The visual strip: the manifest's "strip" render, or nothing at all. */
  const strip = images.renders.strip;

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="display">{hero.headline}</h1>
            <p className="lead">{hero.subhead}</p>
            <div className="btn-row">
              <Link to={hero.primary.to} className="btn btn-gold btn-lg">
                {hero.primary.label}
              </Link>
              <Link to={hero.secondary.to} className="btn btn-lg">
                {hero.secondary.label}
              </Link>
            </div>
          </div>
          <HeroCards />
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title reveal">{whatWeDo.line}</h2>
        <ul className="feature-grid three">
          {whatWeDo.cards.map((c) => (
            <li key={c.title} className="frost card-lg reveal">
              <span className="icon-tile">
                <Icon name={c.icon} />
              </span>
              <h3 className="card-title">{c.title}</h3>
              <p className="card-body">{c.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container section">
        <h2 className="section-title reveal">{building.heading}</h2>
        <ul className="feature-grid two">
          {building.cards.map((c) => (
            <li key={c.title} className="reveal">
              <Link to={c.to} className="frost card-lg card-link">
                <span className="icon-tile">
                  <Icon name={c.icon} />
                </span>
                <h3 className="card-title">{c.title}</h3>
                <p className="card-body">{c.body}</p>
                <span className="card-more">
                  {c.linkLabel} <Icon name="arrow" size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {strip && (
        <section className="container section reveal">
          <RenderPanel render={strip} className="strip" sizes="(min-width: 1200px) 1136px, 100vw" />
        </section>
      )}

      <section id="team" className="container section anchor-section">
        <div className="section-center reveal">
          <h2 className="section-title">{team.heading}</h2>
          <p className="lead">{team.sub}</p>
        </div>
        <ul className="team-grid">
          {team.members.map((m) => (
            <li key={m.slug} className="team-member reveal">
              <Avatar
                slug={m.slug}
                name={m.name}
                className="member-photo"
                sizes="(min-width: 1024px) 132px, (min-width: 700px) 112px, 96px"
              />
              <span className="member-name">{m.name}</span>
              <span className="member-role">{m.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="band-dark">
        <div className="container band-grid">
          <div className="band-copy reveal">
            <h2 className="band-heading">{whyFarm.heading}</h2>
            <p className="band-body">{whyFarm.body}</p>
          </div>
          <div className="band-count reveal">
            <Countdown tone="dark" />
            <Link to={whyFarm.button.to} className="btn btn-gold btn-lg">
              {whyFarm.button.label}
            </Link>
          </div>
        </div>
      </section>

      <section id="faq" className="container section anchor-section">
        <h2 className="section-title reveal">{faq.heading}</h2>
        <div className="reveal">
          <Accordion items={faq.items} />
        </div>
      </section>

      <CtaBand heading={ctaBand.heading} to={ctaBand.button.to} label={ctaBand.button.label} />
    </>
  );
}
