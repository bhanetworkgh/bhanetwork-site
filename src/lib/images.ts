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

/** A real photo from the team. Never of the vFarm rig itself; that is what the renders are for. */
export interface Photo extends Img {
  alt: string;
}

interface Photos {
  hero: Photo | null;
  stats: Photo | null;
  about: Photo | null;
  split: Photo | null;
  footer: Photo | null;
  cluster: Photo[];
}

interface Images {
  team: Record<string, Img>;
  photos: Photos;
  renders: { hero: Render | null; strip: Render | null; gallery: Render[] };
  /** A 1200×630 crop of the hero for link previews, or null. */
  og: string | null;
}

export const images = generated as Images;
