import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/inter/wght.css';
import './styles/app.css';
import { App } from './App';
import { LandingProvider, landingStateFrom } from './config/landingConfig';

/*
 * Every route's HTML is pre-rendered at build time with landing-config
 * embedded as window.__LANDING_CONFIG__. Hydrate from exactly that, so the
 * first client render matches the HTML.
 */
/*
 * /team became a section of Home. A browser that still arrives at /team or
 * /team/… (through the 404 fallback) goes straight to /#team before anything
 * renders, so there is no flash of the 404 page.
 */
if (/^\/team(\/|$)/.test(window.location.pathname)) window.location.replace('/#team');

const root = document.getElementById('root')!;
const app = (raw: unknown) => (
  <StrictMode>
    <LandingProvider state={landingStateFrom(raw)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LandingProvider>
  </StrictMode>
);

if (window.__LANDING_CONFIG__ !== undefined) {
  hydrateRoot(root, app(window.__LANDING_CONFIG__));
} else {
  /* `npm run dev` serves the bare template: nothing pre-rendered, so fetch and render. */
  fetch('/landing-config.json', { cache: 'no-cache' })
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null)
    .then((raw) => createRoot(root).render(app(raw)));
}
