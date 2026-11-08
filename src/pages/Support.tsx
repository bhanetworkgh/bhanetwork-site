import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { support, SUPPORT_EMAIL } from '../content/support';

/**
 * /support: how a customer reaches us, what Genie can and cannot do, and how
 * to reach a person. Same white reading card as Privacy and Terms, with the
 * three ways in shown first as cards.
 */
export function Support() {
  const s = support;
  return (
    <section className="container section narrow prose support">
      <p className="pill-label">{s.eyebrow}</p>
      <h1 className="display-sm">{s.heading}</h1>
      <p className="dim">{s.updated}</p>
      <p>{s.intro}</p>

      <ul className="support-channels" aria-label="Ways to reach us">
        {s.channels.map((c) => (
          <li key={c.id} className="support-channel">
            <span className="support-channel-icon">
              <Icon name={c.icon} size={22} />
            </span>
            <span className="support-channel-label">{c.label}</span>
            <a className="support-channel-value" href={c.href}>
              {c.value}
            </a>
            <p>{c.body}</p>
          </li>
        ))}
      </ul>

      <h2 id="hours">{s.hours.heading}</h2>
      <p>{s.hours.body}</p>

      <h2 id="person">{s.person.heading}</h2>
      <p>{s.person.body}</p>
      <p>
        {s.person.directBefore}
        <a className="link" href={`mailto:${SUPPORT_EMAIL}`}>
          {SUPPORT_EMAIL}
        </a>
        {s.person.directAfter}
      </p>

      <h2 id="genie">{s.genie.heading}</h2>
      <p>{s.genie.intro}</p>
      <div className="support-split">
        <div className="support-list">
          <h3>{s.genie.can.label}</h3>
          <ul className="support-checks">
            {s.genie.can.items.map((item) => (
              <li key={item}>
                <span className="support-check-icon yes">
                  <Icon name="check" size={14} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="support-list">
          <h3>{s.genie.cannot.label}</h3>
          <ul className="support-checks">
            {s.genie.cannot.items.map((item) => (
              <li key={item}>
                <span className="support-check-icon no">
                  <Icon name="close" size={14} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p>
        {s.genie.recordingBefore}
        <Link className="link" to="/privacy">
          {s.genie.recordingLink}
        </Link>
        {s.genie.recordingAfter}
      </p>

      <div className="support-urgent" id="urgent" role="note">
        <span className="support-urgent-icon">
          <Icon name="warning" size={22} />
        </span>
        <div>
          <h2>{s.urgent.heading}</h2>
          <p>{s.urgent.body}</p>
          <p>{s.urgent.then}</p>
        </div>
      </div>

      <h2 id="texts">{s.texts.heading}</h2>
      <p>{s.texts.body}</p>
      <p>
        <strong>{s.texts.optOut}</strong>
      </p>
      <p>
        {s.texts.termsBefore}
        <Link className="link" to="/terms">
          {s.texts.termsLink}
        </Link>
        {s.texts.termsAfter}
      </p>

      <h2>{s.more.heading}</h2>
      <ul>
        <li>
          <Link className="link" to={s.more.faq.to}>
            {s.more.faq.label}
          </Link>
        </li>
        <li>
          <Link className="link" to={s.more.vfarm.to}>
            {s.more.vfarm.label}
          </Link>
        </li>
      </ul>
    </section>
  );
}
