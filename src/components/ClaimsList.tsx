/**
 * The supporting claims, exactly as the config states them.
 *
 * This component writes nothing. If a claim is not in
 * `supporting_claims`, this site does not say it.
 */
export function ClaimsList({ claims }: { claims: string[] }) {
  if (claims.length === 0) return null;
  return (
    <ul className="claims">
      {claims.map((claim) => (
        <li key={claim} className="claim t-body-lg dim">
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
export function Qualifier({ text }: { text: string }) {
  if (!text) return null;
  return <p className="qualifier t-body dim">{text}</p>;
}
