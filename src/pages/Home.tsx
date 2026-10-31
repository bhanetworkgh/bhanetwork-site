import { Link } from 'react-router-dom';
import { buildLog, ctaBand, faqIntro, hero, lanes, whatVfarm, whatWeDo, whyFarm } from '../content/home';
import { team } from '../content/team';
import { faq } from '../content/faq';
import { useLanding } from '../config/landingConfig';
import { Accordion } from '../components/Accordion';
import { Avatar } from '../components/Avatar';
import { Icon, type IconName } from '../components/Icon';
import { RenderPanel } from '../components/RenderPanel';
import { images } from '../lib/images';

/** A small outlined label above a heading. */
function Eyebrow({ children, tone = 'light' }: { children: string; tone?: 'light' | 'dark' }) {
  return <p className={`pill-label${tone === 'dark' ? ' on-dark' : ''}`}>{children}</p>;
}

export function Home() {
  const { config } = useLanding();
  const what = config?.what_vfarm_is.slice(0, 4) ?? [];
  /* Only real entries. Anything the config marks as a sample stays off the page. */
  const log = (config?.build_feed ?? []).filter((e) => !e.sample).slice(0, 6);
  const { strip, gallery } = images.renders;
  /* The internals render beside "what vFarm is"; the rack render beside "why a farm". */
  const internals = gallery[1] ?? null;
  const rack = gallery[0] ?? null;

  return (
    <>
      {/* Hero: one deep green card, the headline in two halves at opposite corners. */}
      <section className="hero-wrap">
        <div className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-top">
            <div className="hero-copy">
              <p className="pill-label on-dark">{hero.eyebrow}</p>
              <h1 className="display">
                <span className="display-accent">{hero.headlineLead}</span>
                {/* The second half is drawn in the opposite corner; read here, once. */}
                <span className="sr-only"> {hero.headlineAccent}</span>
              </h1>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value tabular">{hero.stat.value}</span>
              <span className="hero-stat-label">{hero.stat.label}</span>
            </div>
          </div>

          {strip && (
            <div className="hero-media">
              <RenderPanel render={strip} sizes="(min-width: 1100px) 640px, 100vw" priority />
            </div>
          )}

          <div className="hero-bottom">
            <div className="hero-side">
              <p className="lead on-dark">{hero.subhead}</p>
              <div className="btn-row">
                <Link to={hero.primary.to} className="btn btn-gold btn-lg">
                  <span className="btn-dot" aria-hidden="true" />
                  {hero.primary.label}
                </Link>
                <Link to={hero.secondary.to} className="btn btn-ghost btn-lg">
                  {hero.secondary.label}
                </Link>
              </div>
              <ul className="hero-chips">
                {hero.facts.map((f) => (
                  <li key={f.label} className="glass-chip">
                    <span className="glass-chip-icon">
                      <Icon name={f.icon as IconName} size={20} />
                    </span>
                    <span>
                      <span className="glass-chip-label">{f.label}</span>
                      <span className="glass-chip-value">{f.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="display display-end" aria-hidden="true">
              {hero.headlineAccent}
            </p>
          </div>
        </div>
      </section>

      {what.length > 0 && (
        <section className="container section">
          <div className="intro-split">
            <div className="reveal">
              <Eyebrow>{whatVfarm.eyebrow}</Eyebrow>
              <h2 className="h-section">{whatVfarm.heading}</h2>
              <Link to={whatVfarm.link.to} className="btn btn-gold">
                <span className="btn-dot" aria-hidden="true" />
                {whatVfarm.link.label}
              </Link>
            </div>
            {internals && (
              <div className="reveal">
                <RenderPanel render={internals} className="media-card" sizes="(min-width: 1100px) 560px, 100vw" />
              </div>
            )}
          </div>
          <ol className="feature-row">
            {what.map((item, i) => (
              <li key={item.title} className="feature reveal">
                <span className="feature-num tabular">{String(i + 1).padStart(2, '0')}</span>
                <span className="feature-title">{item.title}</span>
                {item.body && <span className="feature-body">{item.body}</span>}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* How we build: big numbered rows on the green band. */}
      <section className="band-forest band-rows">
        <div className="container">
          <div className="band-head reveal">
            <Eyebrow tone="dark">{whatWeDo.eyebrow}</Eyebrow>
            <h2 className="h-section on-dark">{whatWeDo.line}</h2>
          </div>
          <ol className="big-rows">
            {whatWeDo.cards.map((c, i) => (
              <li key={c.title} className="big-row reveal">
                <span className="big-row-num tabular">({String(i + 1).padStart(2, '0')})</span>
                <span className="big-row-title">{c.title}</span>
                <span className="big-row-body">{c.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What the team works on, running past as pills. */}
      <section className="marquee" aria-label={lanes.label}>
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="marquee-list" aria-hidden={copy === 1 ? 'true' : undefined}>
              {lanes.items.map((item) => (
                <li key={item} className="marquee-pill">
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="split-media">
          {rack && (
            <div className="split-media-img reveal">
              <RenderPanel render={rack} className="media-card media-tall" sizes="(min-width: 1100px) 620px, 100vw" />
            </div>
          )}
          <div className="split-media-copy reveal">
            <Eyebrow>{whyFarm.eyebrow}</Eyebrow>
            <h2 className="h-section">{whyFarm.heading}</h2>
            <p className="body-lg dim">{whyFarm.body}</p>
            <Link to={whyFarm.button.to} className="link-arrow">
              {whyFarm.button.label}
              <span className="link-arrow-ring" aria-hidden="true">
                <Icon name="arrow" size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {log.length > 0 && (
        <section id="log" className="container section">
          <div className="section-head reveal">
            <div>
              <Eyebrow>{buildLog.eyebrow}</Eyebrow>
              <h2 className="h-section">{buildLog.heading}</h2>
            </div>
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

      <section id="team" className="band-paper anchor-section">
        <div className="container section">
          <div className="section-head reveal">
            <div>
              <Eyebrow>{team.heading}</Eyebrow>
              <h2 className="h-section">{team.sub}</h2>
            </div>
          </div>
          <ul className="team-grid">
            {team.members.map((m) => (
              <li key={m.slug} className="team-card reveal">
                <Avatar slug={m.slug} name={m.name} className="team-photo" sizes="96px" />
                <span className="team-text">
                  <span className="team-name">{m.name}</span>
                  <span className="team-role">{m.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="container section anchor-section">
        <div className="faq-split">
          <div className="reveal">
            <Eyebrow>{faqIntro.eyebrow}</Eyebrow>
            <h2 className="h-section">{faq.heading}</h2>
            <p className="body-lg dim">{faqIntro.body}</p>
          </div>
          <div className="reveal">
            <Accordion items={faq.items} />
          </div>
        </div>
      </section>

      <section className="container section-tight">
        <div className="closer reveal">
          <div className="hero-glow" aria-hidden="true" />
          <Eyebrow tone="dark">{ctaBand.eyebrow}</Eyebrow>
          <h2 className="h-closer">{ctaBand.heading}</h2>
          <Link to={ctaBand.button.to} className="btn btn-gold btn-lg">
            <span className="btn-dot" aria-hidden="true" />
            {ctaBand.button.label}
          </Link>
          {config?.early_access.qualifier && <p className="closer-note">{config.early_access.qualifier}</p>}
        </div>
      </section>

      {/* On a phone: the one action, pinned to the bottom. */}
      <div className="dock">
        <Link to={hero.primary.to} className="btn btn-gold dock-btn">
          {hero.primary.label}
        </Link>
      </div>
    </>
  );
}
