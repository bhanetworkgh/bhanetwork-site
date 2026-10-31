import { Link } from 'react-router-dom';
import { useLanding } from '../config/landingConfig';
import { vfarmLabels } from '../content/vfarm';
import { Qualifier } from '../components/ClaimsList';
import { EarlyAccessForm } from '../components/EarlyAccessForm';
import { Gallery } from '../components/Gallery';
import { RenderPanel } from '../components/RenderPanel';
import { images } from '../lib/images';
import { ConfigUnavailable } from './ConfigUnavailable';

/**
 * The vFarm page: the hero, the renders, then Early Access and the form
 * (31 Oct 2026, Destiny). Section order is fixed here; every word about vFarm comes
 * from landing-config. A section whose config key is absent or empty is not
 * rendered at all — no placeholder, no invented copy.
 */
export function VFarm() {
  const { config, ctaMode } = useLanding();
  if (!config) return <ConfigUnavailable />;

  const ea = config.early_access;
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

      {ctaMode !== 'none' && (
        <section className="band-paper anchor-section" id="signup">
          <div className="container section signup">
            <div className="signup-head">
              <p className="pill-label">{vfarmLabels.signupEyebrow}</p>
              {ea.cta_label && <h2 className="h-signup">{ea.cta_label}</h2>}
            </div>
            <EarlyAccessForm config={config} ctaMode={ctaMode} />
          </div>
        </section>
      )}
    </>
  );
}
