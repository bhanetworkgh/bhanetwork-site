import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * `virtual:team-photos`: which builders have a photo in public/team/.
 *
 * Photos are dropped in as public/team/<slug>.<ext>. This reads the folder at
 * build time and hands the app a map of slug → URL, so a builder with a photo
 * gets it and one without gets a monogram — no broken images, no guessing
 * file extensions in the browser.
 */
function teamPhotos(): Plugin {
  const id = 'virtual:team-photos';
  const resolved = '\0' + id;
  const EXT = ['avif', 'webp', 'jpg', 'jpeg', 'png'];
  return {
    name: 'team-photos',
    resolveId: (source) => (source === id ? resolved : undefined),
    load(source) {
      if (source !== resolved) return;
      const dir = resolve(import.meta.dirname, 'public/team');
      const photos: Record<string, string> = {};
      const files = existsSync(dir) ? readdirSync(dir) : [];
      for (const ext of EXT) {
        for (const file of files) {
          const match = file.match(/^([a-z0-9-]+)\.([a-z0-9]+)$/i);
          if (match && match[2]!.toLowerCase() === ext && !photos[match[1]!]) {
            photos[match[1]!] = `/team/${file}`;
          }
        }
      }
      return `export default ${JSON.stringify(photos)};`;
    },
  };
}

/**
 * One app, pre-rendered.
 *
 * `vite build` builds the client; `vite build --ssr src/entry-server.tsx`
 * builds a renderer; scripts/prerender.mjs uses it to write every route to its
 * own HTML file (dist/index.html, dist/vfarm/index.html, …) with its own
 * <head>. The browser then hydrates and navigates client-side.
 */
export default defineConfig({
  plugins: [react(), teamPhotos()],
  build: {
    cssTarget: ['chrome107', 'edge107', 'firefox104', 'safari15.4'],
  },
});
