# bhanetwork-site

The public site for **bhanetwork.org**: Home (with its Team and FAQ
sections), vFarm and Privacy, built as
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
  home, team, faq, privacy, and the /vfarm section labels), so copy can change
  without touching a component.
- **Team and FAQ are sections of Home** (`/#team`, `/#faq`). The nav scrolls
  to them from any page without a reload and follows them with a scrollspy.
  The old `/team` page is gone: `/team` and `/team/…` redirect to `/#team`.
- **The vFarm form mirrors Hardik's Form A** (`src/lib/formA.ts`; entry IDs in
  `docs/form-a-entry-ids.md`) and posts JSON to the n8n intake webhook named
  in the config. Success shows only on HTTP 200 with `{"ok": true}`.
  `source_campaign` is always the config's value — no URL parameter can
  change it — and `utm_*` parameters travel separately in `utm`.
- **Images:** vFarm renders come from `public/renders/manifest.json` (see
  below). Team photos go in `public/team/<slug>.<ext>` (jpg, jpeg, png, webp
  or avif) with the slugs in `src/content/team.ts`; a builder with no photo
  gets a circular monogram.

## Optional landing-config keys the vFarm page reads

These render only when present:

| Key | Shape | Section |
| --- | --- | --- |
| `early_access.steps` | array of `{ title, body }` (first three used) | /vfarm "How early access works" |
| `faq` | array of `{ question, answer }` | /vfarm FAQ accordion |

## vFarm renders

To add renders, put the files in public/renders/ and list them in
manifest.json. Only images from the Approved vFarm renders Drive folder.

```json
{
  "hero": { "file": "rack-front.webp", "alt": "…", "caption": "…" },
  "strip": null,
  "gallery": []
}
```

- `hero` — the image beside the /vfarm headline, and the link-preview (Open
  Graph / Twitter) image for every page. Without it the headline runs full
  width and pages share the default `public/og.png`.
- `strip` — the wide image on Home.
- `gallery` — the /vfarm gallery; a click opens a lightbox.

An empty slot renders nothing: no placeholder, no gap. `alt` is required;
`caption` is optional. At build time `scripts/images.mjs` converts every
listed file to WebP in responsive widths (640–2400px, never upscaled);
everything below the fold loads lazily. A listed file that does not exist
fails the build.

## Team photos

Name them `<slug>.<ext>` in `public/team/`: `jason-bays`, `destiny-arupi`,
`jeganathan`, `kaiqi-yang`, `ahad`, `hardik-bhatt`, `kavin-g-n`. The build
crops each to a 4:5 portrait from the centre-top (so faces stay in frame) and
converts it to WebP. Files with any other name are ignored, with a warning.

## How the build works

```
npm run build
  node scripts/images.mjs                        photos and renders → public/img/*.webp
  tsc -b                                         typecheck
  vite build                                     the client → dist/
  vite build --ssr src/entry-server.tsx          a renderer → dist-ssr/
  node scripts/prerender.mjs                     dist/index.html, dist/vfarm/index.html,
                                                 dist/privacy/index.html, dist/404.html,
                                                 dist/team/index.html (a redirect to /#team)
```

The pre-render reads `dist/landing-config.json` (the file exactly as it
ships), renders each route from it and embeds it in the page, so the browser
hydrates from the same config the HTML was built from.

Direct visits and refreshes on `/`, `/vfarm` and `/privacy` are served
straight from those files. The Render service also needs these rules, in this
order (recorded in `render.yaml`):

1. **Redirect (301)** `/team` → `/#team`
2. **Redirect (301)** `/team/*` → `/#team`
3. **Rewrite** `/*` → `/404.html`

Until they exist, `dist/team/index.html` redirects `/team` in the browser and
the app sends `/team/…` to `/#team`.

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
src/pages/                  Home, VFarm, Privacy, NotFound
src/components/             nav, footer, layout, countdown, modal, form…
src/content/                all non-vFarm copy
src/config/                 reads and gates landing-config
src/lib/                    Form A, attribution, meta tags, countdown target
src/styles/                 tokens.css, app.css, forms.css
public/                     landing-config.json, icons, og.png, sitemap, robots, team/, renders/
scripts/images.mjs          builds public/img/ and src/generated/images.json (not committed)
```

## Running it

```
npm install
npm run dev        # dev server (client-rendered)
npm run build      # typecheck, build, pre-render → dist/
npm run preview
```
