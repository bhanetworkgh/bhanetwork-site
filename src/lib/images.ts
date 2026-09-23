import generated from '../generated/images.json';

/**
 * The images scripts/images.mjs prepared at build time: team photos (4:5,
 * centre-top) and the vFarm renders listed in public/renders/manifest.json,
 * all as responsive WebP.
 */

export interface Img {
  src: string;
  srcset: string;
  width: number;
  height: number;
}

/** A vFarm render from the manifest. Only files from the approved renders folder go there. */
export interface Render extends Img {
  alt: string;
  caption: string;
}

interface Images {
  team: Record<string, Img>;
  renders: { hero: Render | null; strip: Render | null; gallery: Render[] };
  /** A 1200×630 crop of the hero for link previews, or null. */
  og: string | null;
}

export const images = generated as Images;
