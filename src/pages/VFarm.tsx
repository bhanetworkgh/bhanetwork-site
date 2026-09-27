import { Link } from 'react-router-dom';
import { useLanding } from '../config/landingConfig';
import { vfarmLabels } from '../content/vfarm';
import { ClaimsGrid, Qualifier } from '../components/ClaimsList';
import { Countdown } from '../components/Countdown';
import { EarlyAccessForm } from '../components/EarlyAccessForm';
import { Faq } from '../components/Faq';
import { Gallery } from '../components/Gallery';
import { RenderPanel } from '../components/RenderPanel';
import { images } from '../lib/images';
import { ConfigUnavailable } from './ConfigUnavailable';

/**
 * The vFarm page. Section order is fixed here; every word about vFarm comes
 * from landing-config. A section whose config key is absent or empty is not
 * rendered at all — no placeholder, no invented copy.
 */
export function VFarm() {
  const { config, ctaMode } = useLanding();
  if (!config) return <ConfigUnavailable />;

  const ea = config.early_access;
  const what = config.what_vfarm_is.slice(0, 6);
  /* Renders come from public/renders/manifest.json; an empty slot renders nothing. */
  const { hero, gallery } = images.renders;

  return (
    <>
      <section className="band-forest hero">
        <div className="container hero-grid is-even">
          <div className="hero-copy">
            <p className="kicker lime">{vfarmLabels.kicker}</p>
            {ea.headline && <h1 className="display display-vfarm">{ea.headline}</h1>}
            {ea.body && <p className="lead on-forest">{ea.body}</p>}
            {ctaMode !== 'none' && ea.cta_label && (
              <div className="cta-stack">
                <div className="btn-row">
                  <Link to="/vfarm#signup" className="btn btn-gold btn-lg">
                    {ea.cta_label}
                  </Link>
                </div>
                <Qualifier text={ea.qualifier} className="on-forest" />
              </div>
            )}
          </div>
          {/* The flagship render when there is one; until then, the live countdown. */}
          {hero ? (
            <RenderPanel render={hero} className="hero-media" sizes="(min-width: 960px) 640px, 100vw" priority />
          ) : (
            <div className="hero-panel hero-panel-count">
              <Countdown tone="dark" />
            </div>
          )}
        </div>
      </section>

      {what.length > 0 && (
        <section className="container section split">
          <h2 className="h-section reveal">
            {vfarmLabels.whatItIs} <em>{vfarmLabels.whatItIsAccent}</em>
          </h2>
          <dl className="spec-list reveal">
            {what.map((item) => (
              <div key={item.title} className="spec-row">
                <dt>{item.title}</dt>
                {item.body && <dd>{item.body}</dd>}
              </div>
            ))}
          </dl>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="container section reveal">
          <h2 className="h-section">{vfarmLabels.gallery}</h2>
          <Gallery items={gallery} closeLabel={vfarmLabels.closeLabel} />
        </section>
      )}

      {ea.steps.length > 0 && (
        <section className="container section">
          <h2 className="h-section reveal">{vfarmLabels.howItWorks}</h2>
          <ol className="steps">
            {ea.steps.slice(0, 3).map((step, i) => (
              <li key={step.title || i} className="step-card reveal">
                <span className="kicker">{String(i + 1).padStart(2, '0')}</span>
                {step.title && <h3 className="step-title">{step.title}</h3>}
                {step.body && <p className="step-body">{step.body}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      {config.faq.length > 0 && (
        <section className="container section split reveal">
          <h2 className="h-section">{vfarmLabels.faq}</h2>
          <Faq items={config.faq} />
        </section>
      )}

      {ctaMode !== 'none' && (
        <section className="container section signup anchor-section" id="signup">
          <div className="section-head">
            {ea.cta_label && <h2 className="h-signup">{ea.cta_label}</h2>}
            {ea.body && (
              <p className="body-lg dim signup-intro">
                {ea.body}
                {config.early_access_endpoint ? ` ${vfarmLabels.signupSteps}` : ''}
              </p>
            )}
          </div>
          <ClaimsGrid claims={config.supporting_claims} />
          <EarlyAccessForm config={config} ctaMode={ctaMode} />
        </section>
      )}
    </>
  );
}
