/**
 * Build-time image pipeline. Runs before `vite build` and `vite dev`.
 *
 * Team photos: public/team/<slug>.<jpg|jpeg|png|webp|avif> → a 4:5 portrait,
 * cropped from the centre-top so faces stay in frame, as WebP in a few widths.
 *
 * vFarm renders: public/renders/manifest.json names the files for three
 * slots — "hero", "strip", "gallery" — each { file, alt, caption }. Every
 * listed file is converted to WebP in responsive widths. A hero also gets a
 * 1200×630 JPEG for link previews.
 *
 * Output goes to public/img/ (served as /img/…) and src/generated/images.json,
 * which the app imports. Both are build products and are not committed.
 * A manifest entry whose file is missing, or that has no alt text, fails the
 * build loudly rather than shipping a broken image.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, parse } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const pub = resolve(root, 'public');
const out = resolve(pub, 'img');
const gen = resolve(root, 'src/generated');

const TEAM_SLUGS = ['jason-bays', 'destiny-arupi', 'jeganathan', 'kaiqi-yang', 'ahad', 'hardik-bhatt', 'kavin-g-n'];
const TEAM_EXT = ['webp', 'jpg', 'jpeg', 'png', 'avif'];
const TEAM_WIDTHS = [240, 480, 720];
const RENDER_WIDTHS = [640, 1024, 1600, 2400];

rmSync(out, { recursive: true, force: true });
mkdirSync(resolve(out, 'team'), { recursive: true });
mkdirSync(resolve(out, 'renders'), { recursive: true });
mkdirSync(gen, { recursive: true });

/**
 * Widths to emit: every standard width the source can fill, plus the source's
 * own width when it falls short of the largest — never upscaled.
 */
function widthsFor(sourceWidth, candidates) {
  const w = candidates.filter((c) => c < sourceWidth);
  if (sourceWidth <= Math.max(...candidates)) w.push(sourceWidth);
  return w;
}

async function variants(input, dir, name, candidates, prepare) {
  const base = prepare(sharp(input).rotate());
  const { data, info } = await base.clone().toBuffer({ resolveWithObject: true });
  const ratio = info.height / info.width;
  const list = [];
  for (const w of widthsFor(info.width, candidates)) {
    const file = `${name}-${w}.webp`;
    await sharp(data).resize({ width: w }).webp({ quality: 80 }).toFile(resolve(out, dir, file));
    list.push({ url: `/img/${dir}/${file}`, w });
  }
  const largest = list[list.length - 1];
  return {
    src: largest.url,
    srcset: list.map((v) => `${v.url} ${v.w}w`).join(', '),
    width: largest.w,
    height: Math.round(largest.w * ratio),
  };
}

/* Team ------------------------------------------------------------------- */

const team = {};
const teamDir = resolve(pub, 'team');
const teamFiles = existsSync(teamDir) ? readdirSync(teamDir) : [];
for (const slug of TEAM_SLUGS) {
  const file = TEAM_EXT.map((e) => `${slug}.${e}`).find((f) => teamFiles.includes(f));
  if (!file) continue; /* no photo: the site shows a monogram */
  const input = resolve(teamDir, file);
  const meta = await sharp(input).rotate().metadata();
  /* The largest 4:5 portrait the photo holds, anchored centre-top. */
  const w = Math.min(meta.width, Math.round((meta.height * 4) / 5));
  const h = Math.round((w * 5) / 4);
  team[slug] = await variants(input, 'team', slug, TEAM_WIDTHS, (img) =>
    img.resize({ width: w, height: h, fit: 'cover', position: 'top' }),
  );
}
const unknown = teamFiles.filter((f) => !f.startsWith('.') && !TEAM_SLUGS.includes(parse(f).name));
if (unknown.length) console.warn(`[images] ignored in public/team (name is not a team slug): ${unknown.join(', ')}`);

/* Renders ---------------------------------------------------------------- */

const manifestPath = resolve(pub, 'renders/manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};

async function render(entry, slot) {
  if (!entry) return null;
  const { file, alt, caption = '' } = entry;
  const input = resolve(pub, 'renders', String(file ?? ''));
  if (!file || !existsSync(input)) throw new Error(`[images] renders/manifest.json ${slot}: file "${file}" not found in public/renders/`);
  if (!String(alt ?? '').trim()) throw new Error(`[images] renders/manifest.json ${slot}: "alt" is required`);
  const img = await variants(input, 'renders', parse(file).name, RENDER_WIDTHS, (i) => i);
  return { ...img, alt: String(alt).trim(), caption: String(caption).trim() };
}

const renders = {
  hero: await render(manifest.hero, 'hero'),
  strip: await render(manifest.strip, 'strip'),
  gallery: [],
};
for (const [i, entry] of (Array.isArray(manifest.gallery) ? manifest.gallery : []).entries()) {
  renders.gallery.push(await render(entry, `gallery[${i}]`));
}

/* The link-preview image: the hero, cropped to 1200×630. */
let og = null;
if (manifest.hero) {
  await sharp(resolve(pub, 'renders', manifest.hero.file))
    .rotate()
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 82 })
    .toFile(resolve(out, 'og-hero.jpg'));
  og = '/img/og-hero.jpg';
}

writeFileSync(resolve(gen, 'images.json'), JSON.stringify({ team, renders, og }, null, 2) + '\n');
console.log(
  `[images] team: ${Object.keys(team).length}/${TEAM_SLUGS.length} photos · renders: hero ${renders.hero ? 'yes' : 'no'}, strip ${renders.strip ? 'yes' : 'no'}, gallery ${renders.gallery.length}`,
);
