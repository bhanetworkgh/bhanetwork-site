import { Link } from 'react-router-dom';
import { useLanding } from '../config/landingConfig';
import { vfarmLabels } from '../content/vfarm';
import { ClaimsGrid, Qualifier } from '../components/ClaimsList';
import { Countdown } from '../components/Countdown';
import { EarlyAccessForm } from '../components/EarlyAccessForm';
import { Faq } from '../components/Faq';
import { Gallery } from '../components/Gallery';
import { Icon, type IconName } from '../components/Icon';
import { RenderPanel } from '../components/RenderPanel';
import { images } from '../lib/images';
import { ConfigUnavailable } from './ConfigUnavailable';

const WHAT_ICONS: IconName[] = ['cube', 'layers', 'activity', 'grid', 'leaf', 'eye'];

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
      <section className="hero">
        <div className={`container hero-grid${hero ? '' : ' hero-solo'}`}>
          <div className="hero-copy">
            {ea.headline && <h1 className="display">{ea.headline}</h1>}
            {ea.body && <p className="lead">{ea.body}</p>}
            {ctaMode !== 'none' && ea.cta_label && (
              <div className="cta-stack">
                <div className="btn-row">
                  <Link to="/vfarm#signup" className="btn btn-gold btn-lg">
                    {ea.cta_label}
                  </Link>
                </div>
                <Qualifier text={ea.qualifier} />
              </div>
            )}
          </div>
          {hero && (
            <RenderPanel
              render={hero}
              className="hero-render"
              sizes="(min-width: 960px) 520px, 100vw"
              priority
            />
          )}
        </div>
      </section>

      {what.length > 0 && (
        <section className="container section">
          <h2 className="section-title reveal">{vfarmLabels.whatItIs}</h2>
          <ul className={`feature-grid ${what.length === 4 ? 'four' : 'three'}`}>
            {what.map((item, i) => (
              <li key={item.title} className="frost card-lg reveal">
                <span className="icon-tile">
                  <Icon name={WHAT_ICONS[i % WHAT_ICONS.length]!} />
                </span>
                <h3 className="card-title">{item.title}</h3>
                {item.body && <p className="card-body">{item.body}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="container section reveal">
          <h2 className="section-title">{vfarmLabels.gallery}</h2>
          <Gallery items={gallery} closeLabel={vfarmLabels.closeLabel} />
        </section>
      )}

      <section className="container section reveal">
        <div className="count-panel frost">
          <Countdown />
        </div>
      </section>

      {ea.steps.length > 0 && (
        <section className="container section">
          <h2 className="section-title reveal">{vfarmLabels.howItWorks}</h2>
          <ol className="steps">
            {ea.steps.slice(0, 3).map((step, i) => (
              <li key={step.title || i} className="frost card-lg reveal">
                <span className="step-num tabular">{i + 1}</span>
                {step.title && <h3 className="card-title">{step.title}</h3>}
                {step.body && <p className="card-body">{step.body}</p>}
              </li>
            ))}
          </ol>
        </section>
      )}

      {config.faq.length > 0 && (
        <section className="container section narrow reveal">
          <h2 className="section-title">{vfarmLabels.faq}</h2>
          <Faq items={config.faq} />
        </section>
      )}

      {ctaMode !== 'none' && (
        <section className="container section signup" id="signup">
          {ea.cta_label && <h2 className="section-title">{ea.cta_label}</h2>}
          <ClaimsGrid claims={config.supporting_claims} />
          <div className="card form-card">
            <EarlyAccessForm config={config} ctaMode={ctaMode} />
          </div>
        </section>
      )}
    </>
  );
}
