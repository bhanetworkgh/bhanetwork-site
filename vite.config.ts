import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

/**
 * Two HTML entries, not a single-page app.
 *
 * A static host serves `/` from dist/index.html and `/vfarm` from
 * dist/vfarm/index.html with no rewrite rules and no client-side router. Each
 * entry boots its own React tree; the two pages share components, tokens and
 * the landing config, nothing else.
 */
export default defineConfig({
  plugins: [react()],
  build: {
    cssTarget: ['chrome107', 'edge107', 'firefox104', 'safari15.4'],
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        vfarm: resolve(import.meta.dirname, 'vfarm/index.html'),
      },
    },
  },
});
