import type { LandingConfig } from '../types/landing';

/**
 * What this page was built against, stated on the page.
 *
 * Both versions come from the config, so the line cannot drift from the
 * contract it names. It is a sentence, so it takes --dim rather than --faint,
 * at the quiet size.
 */
export function ContractVersions({ config }: { config: LandingConfig }) {
  const { mechanics_contract_version, page_contract_version } = config;
  if (!mechanics_contract_version && !page_contract_version) return null;
  return (
    <p className="contract-line">
      Mechanics {mechanics_contract_version} · Landing config {page_contract_version}
    </p>
  );
}
