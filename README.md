# bhanetwork-site

The public site for **bhanetwork.org**: Home, vFarm, Team and Privacy, built as
one Vite + React + React Router app (React Router v6, as in the BHA Engine
Dashboard). Clicking between pages swaps them in place — no full reload — and
every route is also pre-rendered at build time into its own HTML file with its
own `<title>`, description, Open Graph and Twitter tags.

Deployed as the Render static site **bhanetwork-site**
(`srv-dao309oae00c73aj4uhg`) from `main`: `npm install && npm run build`,
publishing `dist/`.

## Who owns what

- **`public/landing-config.json` is Hardik's file. This repo never edits it.**
  Every vFarm headline, subhead, call to action, claim, link and
  `claim_state` comes from it. A /vfarm section whose key is missing or empty
  is simply not rendered — nothing is invented to fill it.
- **Everything else a visitor reads lives in `src/content/*.ts`** (site,
  home, team, privacy, and the /vfarm section labels), so copy can change
  without touching a component.
- **The vFarm form mirrors Hardik's Form A** (`src/lib/formA.ts`; entry IDs in
  `docs/form-a-entry-ids.md`) and posts JSON to the n8n intake webhook named
  in the config. Success shows only on HTTP 200 with `{"ok": true}`.
  `source_campaign` is always the config's value — no URL parameter can
  change it — and `utm_*` parameters travel separately in `utm`.
- **Images:** vFarm images only from approved renders in the config
  (`render_asset`, `gallery`), each carrying `asset_id`, `config_hash` and
  `cad_revision`. With none, nothing is drawn. Team photos go in
  `public/team/<slug>.<ext>` (jpg, jpeg, png, webp or avif) with the slugs in
  `src/content/team.ts`; a builder with no photo gets a monogram tile.

## Optional landing-config keys the vFarm page reads

These render only when present:

| Key | Shape | Section |
| --- | --- | --- |
| `render_asset.caption` | string | caption under the Home visual strip |
| `gallery` | array of approved assets (same shape as `render_asset`) | /vfarm gallery + lightbox |
| `early_access.steps` | array of `{ title, body }` (first three used) | /vfarm "How early access works" |
| `faq` | array of `{ question, answer }` | /vfarm FAQ accordion |

## How the build works

```
npm run build
  tsc -b                                         typecheck
  vite build                                     the client → dist/
  vite build --ssr src/entry-server.tsx          a renderer → dist-ssr/
  node scripts/prerender.mjs                     dist/index.html, dist/vfarm/index.html,
                                                 dist/team/index.html, dist/privacy/index.html,
                                                 dist/404.html
```

The pre-render reads `dist/landing-config.json` (the file exactly as it
ships), renders each route from it and embeds it in the page, so the browser
hydrates from the same config the HTML was built from.

Direct visits and refreshes on `/`, `/vfarm`, `/team` and `/privacy` are served
straight from those files. Anything else needs this rewrite on the Render
service (also recorded in `render.yaml`): **Source `/*` → Destination
`/404.html`, Action Rewrite.** Render applies it only when no file matches.

`public/sitemap.xml` and `public/robots.txt` ship as-is.

## Theme

Light and dark follow the device setting. The sun/moon toggle overrides it,
stamps `<html data-theme>`, and remembers the choice in `localStorage`
(`bha.theme`) — the only thing the site stores. An inline script in
`index.html` applies it before first paint, so there is no flash of the wrong
theme. Tokens are the dashboard's (`src/styles/tokens.css`), with black and
gold as the accent.

## Structure

```
index.html                  template: theme script, <!--app-head-->, <!--app-html-->
scripts/prerender.mjs       writes one HTML file per route
src/main.tsx                hydrates the app
src/entry-server.tsx        renders one route for the pre-render
src/App.tsx                 the routes
src/pages/                  Home, VFarm, Team, Privacy, NotFound
src/components/             nav, footer, layout, countdown, modal, form…
src/content/                all non-vFarm copy
src/config/                 reads and gates landing-config
src/lib/                    Form A, attribution, meta tags, countdown target
src/styles/                 tokens.css, app.css, forms.css
public/                     landing-config.json, icons, og.png, sitemap, robots, team/
```

## Running it

```
npm install
npm run dev        # dev server (client-rendered)
npm run build      # typecheck, build, pre-render → dist/
npm run preview
```
