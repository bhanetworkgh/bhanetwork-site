/**
 * The supporting claims, exactly as the config states them. This file writes
 * nothing: if a claim is not in `supporting_claims`, this site does not say it.
 */
export function ClaimsGrid({ claims }: { claims: string[] }) {
  if (claims.length === 0) return null;
  return (
    <ul className="claims-grid">
      {claims.map((claim) => (
        <li key={claim} className="card claim-card t-body-lg dim">
          <span className="claim-dot" aria-hidden="true" />
          <span>{claim}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The qualifier renders visibly, beside the call to action. Never in a
 * footer, never in a tooltip.
 */
export function Qualifier({ text, className = '' }: { text: string; className?: string }) {
  if (!text) return null;
  return <p className={`qualifier t-body dim ${className}`.trim()}>{text}</p>;
}
