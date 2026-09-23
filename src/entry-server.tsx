import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';
import { LandingProvider, landingStateFrom } from './config/landingConfig';
import { headHtml, metaFor, ROUTES } from './lib/meta';

export { ROUTES };

/** Render one route to HTML plus its <head> tags. Used only by scripts/prerender.mjs. */
export function render(url: string, rawConfig: unknown): { html: string; head: string } {
  const state = landingStateFrom(rawConfig);
  const html = renderToString(
    <StrictMode>
      <LandingProvider state={state}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </LandingProvider>
    </StrictMode>,
  );
  const known = (ROUTES as readonly string[]).includes(url);
  return { html, head: headHtml(metaFor(known ? url : '*', state.config)) };
}
