import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * One app, pre-rendered.
 *
 * `vite build` builds the client; `vite build --ssr src/entry-server.tsx`
 * builds a renderer; scripts/prerender.mjs uses it to write every route to its
 * own HTML file (dist/index.html, dist/vfarm/index.html, …) with its own
 * <head>. The browser then hydrates and navigates client-side.
 *
 * Images are prepared before this by scripts/images.mjs (team photos and
 * vFarm renders → WebP in public/img/, described in src/generated/images.json).
 */
export default defineConfig({
  plugins: [react()],
  build: {
    cssTarget: ['chrome107', 'edge107', 'firefox104', 'safari15.4'],
  },
});
