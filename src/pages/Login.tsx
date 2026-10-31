import { Link } from 'react-router-dom';
import { login } from '../content/site';
import { Icon } from '../components/Icon';

/**
 * Where vFarm owners will sign in. There are no owner accounts yet, so this
 * page has no form: a sign-in box that cannot sign anyone in would be a fake.
 * It says what the account will be and sends people to Early Access.
 */
export function Login() {
  return (
    <section className="hero-wrap">
      <div className="hero hero-login">
        <div className="hero-glow" aria-hidden="true" />
        <div className="login-grid">
          <div>
            <p className="pill-label on-dark">{login.eyebrow}</p>
            <h1 className="display display-accent login-title">{login.heading}</h1>
            <p className="lead on-dark">{login.body}</p>
            <div className="btn-row">
              <Link to={login.primary.to} className="btn btn-gold btn-lg">
                <span className="btn-dot" aria-hidden="true" />
                {login.primary.label}
              </Link>
              <Link to={login.secondary.to} className="btn btn-ghost btn-lg">
                {login.secondary.label}
              </Link>
            </div>
          </div>
          <div className="login-card">
            <span className="login-status">
              <span className="login-status-dot" aria-hidden="true" />
              {login.status}
            </span>
            <ul className="login-points">
              {login.points.map((p) => (
                <li key={p}>
                  <span className="login-point-icon">
                    <Icon name="check" size={16} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <p className="login-note">{login.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
