import { Link } from 'react-router-dom';
import { buildLog, ctaBand, hero, launchBar, whatVfarm, whatWeDo, whyFarm } from '../content/home';
import { team } from '../content/team';
import { faq } from '../content/faq';
import { useLanding } from '../config/landingConfig';
import { Accordion } from '../components/Accordion';
import { Avatar } from '../components/Avatar';
import { Countdown } from '../components/Countdown';
import { Icon } from '../components/Icon';
import { RenderPanel } from '../components/RenderPanel';
import { LaunchBar } from '../components/LaunchBar';
import { FLAGSHIP_AT } from '../lib/flagship';
import { images } from '../lib/images';

/**
 * The facts panel beside the headline: facts that cannot go stale. A render
 * replaces it once the approved renders folder has one for the strip.
 */
function HeroPanel() {
  const strip = images.renders.strip;
  if (strip) {
    return (
      <RenderPanel
        render={strip}
        className="hero-media"
        sizes="(min-width: 1100px) 420px, 100vw"
        priority
      />
    );
  }
  const { cards } = hero;
  return (
    <div className="hero-panel">
      <dl className="hero-panel-facts">
        <div>
          <dt>{cards.builders.label}</dt>
          <dd className="hero-panel-big">{cards.builders.value}</dd>
        </div>
        <div>
          <dt>{cards.sessions.label}</dt>
          <dd>{cards.sessions.value}</dd>
        </div>
        <div>
          <dt>{cards.ground.label}</dt>
          <dd>{cards.ground.value}</dd>
        </div>
      </dl>
    </div>
  );
}

/** The bento tiles take turns: card, forest, card, lime. */
const TILE_TONES = ['tile-card', 'tile-forest', 'tile-card', 'tile-lime'] as const;

export function Home() {
  const { config } = useLanding();
  const what = config?.what_vfarm_is.slice(0, 4) ?? [];
  /* Only real entries. Anything the config marks as a sample stays off the page. */
  const log = (config?.build_feed ?? []).filter((e) => !e.sample).slice(0, 6);
  const render = images.renders.hero;

  return (
    <>
      <section className="band-forest hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="kicker lime">{hero.eyebrow}</p>
            <h1 className="display">
              {hero.headlineLead} <em className="accent">{hero.headlineAccent}</em>
            </h1>
            <p className="lead on-forest">{hero.subhead}</p>
            <div className="btn-row">
              <Link to={hero.primary.to} className="btn btn-gold btn-lg">
                {hero.primary.label}
              </Link>
              <Link to={hero.secondary.to} className="btn-text on-forest">
                <span className="btn-text-ring">
                  <Icon name="users" size={16} />
                </span>
                {hero.secondary.label}
              </Link>
            </div>
            <div className="hero-count">
              <Countdown tone="dark" />
            </div>
          </div>
          <HeroPanel />
        </div>
      </section>

      {what.length > 0 && (
        <section className="container section">
          <div className="section-head reveal">
            <h2 className="h-section">
              {whatVfarm.heading}{' '}
              {what.length === 4 && <em>{whatVfarm.accentFour}</em>}
            </h2>
            <Link to={whatVfarm.link.to} className="link-underline">
              {whatVfarm.link.label}
            </Link>
          </div>
          <ul className={`bento${render ? ' has-render' : ''}`}>
            {render && (
              <li className="bento-render reveal">
                <RenderPanel render={render} sizes="(min-width: 1100px) 660px, 100vw" />
              </li>
            )}
            {what.map((item, i) => (
              <li key={item.title} className={`bento-tile ${TILE_TONES[i % 4]} reveal`}>
                <span className="bento-title">{item.title}</span>
                {item.body && <span className="bento-body">{item.body}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {log.length > 0 && (
        <section id="log" className="container section split">
          <div className="split-head reveal">
            <h2 className="h-section">{buildLog.heading}</h2>
            <p className="body-lg dim">{buildLog.body}</p>
          </div>
          <ol className="log">
            {log.map((e) => (
              <li key={e.title} className="log-row reveal">
                <span className="log-date mono">{e.date}</span>
                <span className="log-text">
                  <span className="log-title">{e.title}</span>
                  {e.body && <span className="log-body">{e.body}</span>}
                </span>
                <span className="log-dur mono">{e.duration}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="container section-tight">
        <div className="band-card">
          <h2 className="h-section">{whatWeDo.line}</h2>
          <ol className="principles">
            {whatWeDo.cards.map((c, i) => (
              <li key={c.title}>
                <span className="kicker lime">
                  {String(i + 1).padStart(2, '0')} · <Icon name={c.icon} size={14} />
                </span>
                <span className="principle-title">{c.title}</span>
                <span className="principle-body">{c.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container section split">
        <h2 className="h-section reveal">{whyFarm.heading}</h2>
        <div className="split-body reveal">
          <p className="body-lg dim">{whyFarm.body}</p>
          <Link to={whyFarm.button.to} className="link-underline">
            {whyFarm.button.label}
          </Link>
        </div>
      </section>

      <section id="team" className="container section split anchor-section">
        <div className="split-head reveal">
          <h2 className="h-section">{team.heading}</h2>
          <p className="body-lg dim">{team.sub}</p>
        </div>
        <ul className="team-grid">
          {team.members.map((m) => (
            <li key={m.slug} className="team-card reveal">
              <Avatar slug={m.slug} name={m.name} className="team-photo" sizes="72px" />
              <span className="team-text">
                <span className="team-name">{m.name}</span>
                <span className="team-role">{m.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section id="faq" className="container section split anchor-section">
        <h2 className="h-section reveal">{faq.heading}</h2>
        <div className="reveal">
          <Accordion items={faq.items} />
        </div>
      </section>

      <section className="container section closer reveal">
        <h2 className="h-closer">{ctaBand.heading}</h2>
        <Link to={ctaBand.button.to} className="btn btn-gold btn-lg">
          {ctaBand.button.label}
        </Link>
        {config?.early_access.qualifier && <p className="closer-note">{config.early_access.qualifier}</p>}
      </section>

      {/* On a phone: the countdown and the one action, pinned to the bottom. */}
      <div className="dock">
        <LaunchBar label={launchBar.daysToShort} end={FLAGSHIP_AT} compact />
        <Link to={hero.primary.to} className="btn btn-gold dock-btn">
          {hero.primary.label}
        </Link>
      </div>
    </>
  );
}
