/**
 * Pre-render every route into its own HTML file.
 *
 * Reads dist/index.html (the client build's template), dist/landing-config.json
 * (Hardik's config exactly as it ships — read, never written) and the server
 * renderer in dist-ssr/, then writes:
 *
 *   dist/index.html            /
 *   dist/vfarm/index.html      /vfarm
 *   dist/team/index.html       /team
 *   dist/privacy/index.html    /privacy
 *   dist/404.html              anything else
 *
 * Each gets its own <title>, description, canonical, Open Graph and Twitter
 * tags, and the config embedded for hydration.
 */
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const template = await readFile(resolve(dist, 'index.html'), 'utf8');

let rawConfig = null;
try {
  rawConfig = JSON.parse(await readFile(resolve(dist, 'landing-config.json'), 'utf8'));
} catch (error) {
  /* The pages render without a config (no vFarm copy, no call to action). */
  console.warn('[prerender] landing-config.json unreadable:', error.message);
}

const { render, ROUTES } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);

/* Safe inside <script>: nothing in the JSON can close the tag. */
const configScript = `<script>window.__LANDING_CONFIG__=${JSON.stringify(rawConfig)
  .replace(/</g, '\\u003c')
  .replace(/\u2028/g, '\\u2028')
  .replace(/\u2029/g, '\\u2029')}</script>`;

/* Preload the Latin face of the site font, so the headline paints in it sooner. */
const latin = (await readdir(resolve(dist, 'assets'))).find((f) => /^inter-latin-wght-normal-.*\.woff2$/.test(f));
const fontPreload = latin
  ? `<link rel="preload" href="/assets/${latin}" as="font" type="font/woff2" crossorigin />`
  : '';

const targets = [...ROUTES.map((r) => [r, r === '/' ? 'index.html' : `${r.slice(1)}/index.html`]), ['/404', '404.html']];

for (const [url, file] of targets) {
  const { html, head } = render(url, rawConfig);
  /* Replacer functions, so a "$" in the content is never read as a pattern. */
  const page = template
    .replace('<!--app-head-->', () => `${head}\n    ${fontPreload}`)
    .replace('<!--app-html-->', () => html)
    .replace('<!--app-config-->', () => configScript);
  const out = resolve(dist, file);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, page);
  console.log(`[prerender] ${url} → dist/${file}`);
}

await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });
