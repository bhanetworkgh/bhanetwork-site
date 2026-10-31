import { useState } from 'react';
import { Link } from 'react-router-dom';
import { about, buildLog, ctaBand, faqIntro, hero, lanes, rows, stats, whatVfarm, whatWeDo, whyFarm } from '../content/home';
import { team } from '../content/team';
import { faq } from '../content/faq';
import { useLanding } from '../config/landingConfig';
import { Accordion } from '../components/Accordion';
import { Avatar } from '../components/Avatar';
import { Icon, type IconName } from '../components/Icon';
import { RenderPanel } from '../components/RenderPanel';
import { RenderStack } from '../components/RenderStack';
import { images, type Photo } from '../lib/images';

/** A photo that fills its box; decorative, so the text beside it says what matters. */
function Fill({ photo, sizes = '100vw', className = '' }: { photo: Photo; sizes?: string; className?: string }) {
  return (
    <img
      className={`fill-photo ${className}`.trim()}
      src={photo.src}
      srcSet={photo.srcset}
      sizes={sizes}
      alt={photo.alt}
      loading="lazy"
      decoding="async"
    />
  );
}

/** A small outlined label above a heading. */
function Eyebrow({ children, tone = 'light' }: { children: string; tone?: 'light' | 'dark' }) {
  return <p className={`pill-label${tone === 'dark' ? ' on-dark' : ''}`}>{children}</p>;
}

export function Home() {
  const [openPrinciple, setOpenPrinciple] = useState(0);
  const [openRow, setOpenRow] = useState(-1);
  const { config } = useLanding();
  const what = config?.what_vfarm_is.slice(0, 4) ?? [];
  /* Only real entries. Anything the config marks as a sample stays off the page. */
  const log = (config?.build_feed ?? []).filter((e) => !e.sample).slice(0, 6);
  const { gallery } = images.renders;
  /* The internals render beside "what vFarm is"; the rack render beside "why a farm". */
  const internals = gallery[1] ?? null;
  const rack = gallery[0] ?? null;
  const { photos } = images;
  /* The principles open with "why a farm", then the three ways we build. */
  const principles = [{ title: whyFarm.heading, body: whyFarm.body }, ...whatWeDo.cards];

  return (
    <>
      {/* Hero, after VerdaAgro: the headline's first half top left, the renders
          stacked and floating on the right, the words and two cards bottom left,
          the second half large bottom right. */}
      <section className="hero-wrap hero-stage">
        <div className={`hero hero-home${photos.hero ? ' has-photo' : ''}`}>
          {photos.hero && <Fill photo={photos.hero} className="hero-photo" />}
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-col hero-col-left">
            <div className="hero-copy">
              <p className="pill-label on-dark">{hero.eyebrow}</p>
              <h1 className="display">
                <span className="display-accent">{hero.headlineLead}</span>
                {/* The second half is drawn in the opposite corner; read here, once. */}
                <span className="sr-only"> {hero.headlineAccent}</span>
              </h1>
            </div>
            <div className="hero-side">
              <p className="hero-small on-dark">{hero.subhead}</p>
              <Link to={hero.primary.to} className="btn btn-gold">
                <span className="btn-dot" aria-hidden="true" />
                {hero.primary.label}
              </Link>
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
          </div>
          <div className="hero-col hero-col-right">
            <div className="hero-stack">
              <RenderStack renders={gallery} note={hero.stackNote} />
            </div>
            <p className="display display-end" aria-hidden="true">
              {hero.headlineAccent}
            </p>
          </div>
        </div>
      </section>

      {/* About: a big lowercase title, a label column and one statement. */}
      <section className="band-forest about">
        <div className="container">
          <ul className="slide-meta" aria-hidden="true">
            {about.meta.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          <h2 className="about-title reveal">{about.title}</h2>
          <div className="about-grid">
            <ul className="about-labels">
              {about.labels.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p className="about-statement reveal">
              <span className="about-lead">{about.lead}</span> {about.body}
            </p>
          </div>
        </div>
      </section>

      {photos.cluster.length >= 5 && (
        <section className="cluster band-forest" aria-hidden="true">
          {photos.cluster.slice(0, 9).map((p, i) => (
            <span key={p.src} className={`cluster-dot cluster-${i}`}>
              <Fill photo={p} sizes="320px" />
            </span>
          ))}
        </section>
      )}

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
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* The engine's own figures over a photo, then the lanes as big numbered rows. */}
      <section className={`stats-band${photos.stats ? ' has-photo' : ''}`}>
        {photos.stats && <Fill photo={photos.stats} className="stats-photo" />}
        <div className="stats-shade" aria-hidden="true" />
        <div className="container stats-inner">
          <ul className="stats">
            {stats.items.map((st) => (
              <li key={st.label} className="stat reveal">
                <span className="stat-value tabular">
                  {st.value}
                  {st.suffix && <span className="stat-suffix">{st.suffix}</span>}
                </span>
                <span className="stat-label">{st.label}</span>
              </li>
            ))}
          </ul>
          <p className="stats-note">{stats.asOf}</p>
          <div className="band-head reveal">
            <Eyebrow tone="dark">{rows.eyebrow}</Eyebrow>
            <h2 className="h-section on-dark">{rows.heading}</h2>
          </div>
          <ol className="big-rows">
            {rows.items.map((r, i) => {
              const isOpen = openRow === i;
              return (
                <li key={r.title} className={`big-row-item reveal${isOpen ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="big-row"
                    aria-expanded={isOpen}
                    aria-controls={`rack-${i}`}
                    onClick={() => setOpenRow(isOpen ? -1 : i)}
                  >
                    <span className="big-row-num tabular">({String(i + 1).padStart(2, '0')})</span>
                    <span className="big-row-title">{r.title}</span>
                    <span className="big-row-toggle" aria-hidden="true">
                      <Icon name="plus" size={22} />
                    </span>
                  </button>
                  <div id={`rack-${i}`} className="big-row-body" role="region" inert={!isOpen}>
                    <div>
                      <p>{r.body}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="stats-note rows-note">{rows.note}</p>
        </div>
      </section>

      {/* What the team works on, running past as pills. */}
      <section className="marquee" aria-label={lanes.label}>
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="marquee-list" aria-hidden={copy === 1 ? 'true' : undefined}>
              {lanes.items.map((item, i) => {
                /* Between the pills, a small photo from the team, when there are any. */
                const p = photos.cluster.length ? photos.cluster[i % photos.cluster.length] : null;
                return [
                  <li key={item} className="marquee-pill">
                    {item}
                  </li>,
                  p && (
                    <li key={`${item}-photo`} className="marquee-photo">
                      <Fill photo={p} sizes="120px" />
                    </li>
                  ),
                ];
              })}
            </ul>
          ))}
        </div>
      </section>

      {/* Our principles: a photo on the left, an accordion on frosted glass on the right. */}
      <section className="principles">
        <div className="principles-media">
          {photos.split ? (
            <Fill photo={photos.split} sizes="(min-width: 1000px) 50vw, 100vw" />
          ) : (
            rack && <RenderPanel render={rack} className="principles-render" sizes="(min-width: 1000px) 50vw, 100vw" />
          )}
        </div>
        <div className="principles-panel">
          {photos.split && <Fill photo={photos.split} className="principles-blur" sizes="50vw" />}
          <div className="principles-copy reveal">
            <Eyebrow tone="dark">{whatWeDo.eyebrow}</Eyebrow>
            <h2 className="h-section on-dark">{whatWeDo.heading}</h2>
            <div className="principles-list">
              {principles.map((p, i) => {
                const isOpen = openPrinciple === i;
                return (
                  <div key={p.title} className={`principle${isOpen ? ' is-open' : ''}`}>
                    <button
                      type="button"
                      className="principle-head"
                      aria-expanded={isOpen}
                      aria-controls={`principle-${i}`}
                      onClick={() => setOpenPrinciple(isOpen ? -1 : i)}
                    >
                      <span>{p.title}</span>
                      <Icon name="plus" size={16} />
                    </button>
                    {/* Height eases open and shut (grid rows 0fr to 1fr). */}
                    <div id={`principle-${i}`} className="principle-body" role="region" inert={!isOpen}>
                      <div>
                        <p>{p.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to={whyFarm.button.to} className="btn btn-gold">
              <span className="btn-dot" aria-hidden="true" />
              {whyFarm.button.label}
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
