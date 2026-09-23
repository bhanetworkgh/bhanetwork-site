import { footer } from '../content/site';

/**
 * What /vfarm shows if landing-config could not be read. It says nothing
 * about vFarm: every claim lives in the config, so with no config there is
 * nothing to claim and no call to action.
 */
export function ConfigUnavailable() {
  return (
    <section className="container section narrow">
      <p className="lead">
        This page can't load its content right now. Try again shortly, or email{' '}
        <a className="link" href={`mailto:${footer.email}`}>
          {footer.email}
        </a>
        .
      </p>
    </section>
  );
}
