import { ClaimsGrid } from '../../../components/ClaimsList';

/** The supporting claims, in their own band between the hero and the form. */
export function VFarmClaims({ claims }: { claims: string[] }) {
  if (claims.length === 0) return null;
  return (
    <section className="container section section-tight">
      <ClaimsGrid claims={claims} />
    </section>
  );
}
