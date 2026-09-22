import type { StatusTile } from '../types/landing';

/**
 * What the page is allowed to state as fact.
 *
 * Every vFarm clip from now to 31 Oct points at /vfarm, so nothing on it may
 * show a number the backend cannot prove. Subscription Mechanics v0.2.2 §13.1
 * names the sources:
 *
 *   - configuration identity comes from `LM7W.unit_configs`
 *     (`config_hash` → `effective_at`), and
 *   - a configuration becoming live is `VFARM_CONFIG_APPLIED_V1` on
 *     `vfarm.milestone`, and
 *   - `cad_revision` is a *named* Onshape version ID, never the workspace ID.
 *
 * Those Slice 2 routes and that event are PROPOSED / NOT YET LANDED, so today
 * no value here has a source. The page hides every tile that would need one.
 *
 * `status_tile.source` is the seam. While it reads "static" the values beside
 * it were typed by a person and nothing renders. When a real feed lands,
 * whoever wires it sets `source` to name that feed and the tiles appear — no
 * component below changes. A hidden tile beats a sample, always.
 */

/** Sources that mean "somebody typed this", not "a system reported it". */
const UNPROVEN = new Set(['', 'static', 'sample', 'placeholder', 'manual', 'hand', 'unknown']);

/** True only when `status_tile.source` names a real upstream system. */
export function hasProvenSource(tile: StatusTile): boolean {
  return !UNPROVEN.has(tile.source.trim().toLowerCase());
}

/**
 * The gate for the Config and Last level-up tiles.
 *
 * Both or neither: a `config_hash` with no applied event is a configuration
 * that exists on paper, and a level-up date with no hash is a date with
 * nothing behind it. Mechanics v0.2.2 §7 — "a farm leveled up event requires a
 * new config_hash plus effective_at" — and neither may be invented.
 */
export function showsConfiguration(tile: StatusTile): boolean {
  return hasProvenSource(tile) && tile.config_hash !== '' && tile.last_level_up !== '';
}

/** The spec version, only from a canonical spec source the site can read. */
export function showsSpecVersion(tile: StatusTile): boolean {
  return hasProvenSource(tile) && tile.spec_version !== '';
}

/** The rig status line over the render. */
export function showsRigStatus(tile: StatusTile): boolean {
  return hasProvenSource(tile) && tile.render_status !== '';
}

/** The CAD revision caption — the named Onshape version on the config row. */
export function showsCadRevision(tile: StatusTile): boolean {
  return hasProvenSource(tile) && tile.render_label !== '';
}

/**
 * Whether any tile on the page is reporting real engine data.
 *
 * The days-to-flagship count does not qualify: the page works it out from a
 * fixed date, so "written by the engine" would not be true of it.
 */
export function showsEngineData(tile: StatusTile): boolean {
  return showsSpecVersion(tile) || showsConfiguration(tile);
}
