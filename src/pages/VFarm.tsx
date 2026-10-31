import { Link } from 'react-router-dom';
import { useLanding } from '../config/landingConfig';
import { vfarmLabels } from '../content/vfarm';
import { ClaimsGrid, Qualifier } from '../components/ClaimsList';
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
      <section className="hero-wrap">
        <div className={`hero hero-vfarm${hero ? ' has-media' : ''}`}>
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-vfarm-grid">
            <div className="hero-copy">
              <p className="pill-label on-dark">{vfarmLabels.kicker}</p>
              {ea.headline && <h1 className="display display-vfarm display-accent">{ea.headline}</h1>}
              {ea.body && <p className="lead on-dark">{ea.body}</p>}
              {ctaMode !== 'none' && ea.cta_label && (
                <div className="cta-stack">
                  <div className="btn-row">
                    <Link to="/vfarm#signup" className="btn btn-gold btn-lg">
                      <span className="btn-dot" aria-hidden="true" />
                      {ea.cta_label}
                    </Link>
                  </div>
                  <Qualifier text={ea.qualifier} className="on-dark" />
                </div>
              )}
            </div>
            {hero && (
              <RenderPanel render={hero} className="hero-media-card" sizes="(min-width: 960px) 620px, 100vw" priority />
            )}
          </div>
        </div>
      </section>

      {what.length > 0 && (
        <section className="container section">
          <div className="section-head reveal">
            <div>
              <p className="pill-label">{vfarmLabels.whatItIsEyebrow}</p>
              <h2 className="h-section">
                {vfarmLabels.whatItIs} {vfarmLabels.whatItIsAccent}
              </h2>
            </div>
          </div>
          <dl className="spec-list">
            {what.map((item, i) => (
              <div key={item.title} className="spec-row reveal">
                <span className="spec-num tabular" aria-hidden="true">
                  ({String(i + 1).padStart(2, '0')})
                </span>
                <dt>{item.title}</dt>
                {item.body && <dd>{item.body}</dd>}
              </div>
            ))}
            <div className="spec-row spec-pending reveal">
              <span className="spec-num" aria-hidden="true" />
              <dt>{vfarmLabels.specsPending}</dt>
            </div>
          </dl>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="band-olive">
          <div className="container section">
            <div className="section-head reveal">
              <div>
                <p className="pill-label on-dark">{vfarmLabels.galleryEyebrow}</p>
                <h2 className="h-section on-dark">{vfarmLabels.gallery}</h2>
              </div>
              <p className="body-lg on-dark-dim">{vfarmLabels.galleryNote}</p>
            </div>
            <Gallery items={gallery} closeLabel={vfarmLabels.closeLabel} />
          </div>
        </section>
      )}

      {ea.steps.length > 0 && (
        <section className="container section">
          <div className="section-head reveal">
            <div>
              <p className="pill-label">{vfarmLabels.howItWorksEyebrow}</p>
              <h2 className="h-section">{vfarmLabels.howItWorks}</h2>
            </div>
          </div>
          <ol className="steps">
            {ea.steps.slice(0, 3).map((step, i) => (
              <li key={step.title || i} className={`step-card reveal${i === 0 ? ' is-first' : ''}`}>
                <span className="step-num tabular">{String(i + 1).padStart(2, '0')}</span>
                {step.title && <h3 className="step-title">{step.title}</h3>}
                {step.body && <p className="step-body">{step.body}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      {config.faq.length > 0 && (
        <section className="container section">
          <div className="faq-split reveal">
            <div>
              <p className="pill-label">{vfarmLabels.faqEyebrow}</p>
              <h2 className="h-section">{vfarmLabels.faq}</h2>
            </div>
            <Faq items={config.faq} />
          </div>
        </section>
      )}

      {ctaMode !== 'none' && (
        <section className="band-paper anchor-section" id="signup">
          <div className="container section signup">
            <div className="section-head">
              <div>
                <p className="pill-label">{vfarmLabels.signupEyebrow}</p>
                {ea.cta_label && <h2 className="h-signup">{ea.cta_label}</h2>}
              </div>
              {ea.body && (
                <p className="body-lg dim signup-intro">
                  {ea.body}
                  {config.early_access_endpoint ? ` ${vfarmLabels.signupSteps}` : ''}
                </p>
              )}
            </div>
            <ClaimsGrid claims={config.supporting_claims} />
            <EarlyAccessForm config={config} ctaMode={ctaMode} />
          </div>
        </section>
      )}
    </>
  );
}
