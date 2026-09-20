# bhanetwork-site

This repository is the public front door for **bhanetwork.org** — the Bays
Horizon Network website that the world sees. It is not the product and it is
not the engine. It is two pages, built with Vite, React and TypeScript, that
read their content from a file and render it.

It serves exactly two routes:

- **`/`** — the home page: the hero, the engine's status tiles, the build
  feed, what vFarm is, and the Early Access ask.
- **`/vfarm`** — the vFarm Early Access page: the render, the claims, the
  form, the qualifier, the status tiles. Short and honest, nothing more.

**Leads are taken on `/vfarm` and nowhere else.** The home page has no form in
it at all; every Early Access call to action there is a plain link to
`/vfarm`. That is deliberate. `/vfarm` is the page that carries the supporting
claims and the qualifying language, so nobody can complete the funnel without
passing them — and the qualifier renders next to every call to action on the
home page too, because a button that asks for a commitment is a commercial
call to action wherever it appears.

The build is multi-page rather than a single-page app. `index.html` and
`vfarm/index.html` are separate entries wired up in `vite.config.ts`, so a
static host serves both routes straight from disk with no rewrite rules and no
client-side router. `npm run build` produces `dist/index.html` and
`dist/vfarm/index.html`.

## The ownership split, which is the thing to understand first

**`public/landing-config.json` owns every word this site says about vFarm.**
The headline, the subhead, the meta description, the Early Access copy, the
qualifier, the button label, the success and error messages, the supporting
claims, the four "what vFarm is" items, the status tile values, the build
feed, the contract versions the pages state, and every link — all of it is
read from that file at runtime, on every page load. Nothing about
vFarm's claims, copy, links or state is hardcoded in a component.

That is deliberate, and it is a hard requirement rather than a convention. A
different person owns what the site is allowed to claim than owns the code that
displays it. So:

**Changing vFarm copy means editing `public/landing-config.json`. It does not
mean editing a component.** If a sentence needs to change, change it in the
config and deploy — no code review, no TypeScript, no build knowledge
required. If a section would need a sentence that is not in the config, then
either the sentence goes into the config, or the section does not get built.
There is no third option, and there is no marketing copy about vFarm anywhere
in `src/`.

## The claim-state rules, which fail closed

`claim_state` in the config decides what this site is allowed to offer a
visitor. The rules are enforced in code, in exactly one place —
`src/config/landingConfig.ts` — which derives a `ctaMode` of `interest`,
`paid` or `none`. No component reads `claim_state` and decides for itself;
every component that could put an offer on screen takes `ctaMode` as a prop.

Today's value is `interest_only_live`, which means one call to action, labelled
from the config, collecting an expression of interest. **A paid call to action
renders only when `claim_state` is `paid_v0_1_live` *and*
`paid_subscription_url` is a non-empty string — both, not either.** Every other
input lands on interest-only with no paid call to action anywhere in the DOM:
not disabled, not greyed out, not "coming soon", not a paid waitlist. It simply
is not rendered.

That includes the cases nobody planned for. A `claim_state` of
`paid_v0_1_pending`, a value nobody has defined yet, an empty string, a missing
key, a corrupt JSON file, a 404 on the config — all of them fall back to
interest-only, and a config that cannot be read at all produces a page with no
call to action of any kind. There is no code path that turns an unknown into a
payment. Nothing on this site reads, writes, stores or infers payment,
subscriber status, entitlement, hardware ownership, reservation, allocation,
price protection or a delivery date; a successful submission means "we received
your interest" and the success message says exactly that and no more.

Anything in the config carrying `"sample": true` renders with a small `Sample`
pill beside it, so placeholder data can never be mistaken for a real reading.
No code path calls a vFarm API — the status tiles read the config only, and
`src/components/StatusTiles.tsx` carries the marked seam where a live fetch
will slot in later.

## The Early Access form

The site hosts its own form; it does not send anyone away to an external one.
`src/components/EarlyAccessForm.tsx` is rendered on `/vfarm` only and collects
exactly three fields — full name (required), email (required, validated) and
organisation (optional). Those three match the upstream lead envelope, and
adding a fourth breaks it.

**Submissions `POST` as JSON to the BHA Engine Dashboard endpoint named in the
config**, at `early_access_endpoint` — today
`https://dashboard.bhanetwork.org/api/public/vfarm-early-access`. The site
therefore depends on the dashboard being reachable for a lead to land: if that
endpoint is down, the form shows the config's error message, keeps what the
visitor typed, and lets them retry. If `early_access_endpoint` is removed from
the config entirely, `/vfarm`'s call to action degrades to a plain link to
`interest_url`; the home page's links still point at `/vfarm`, so the home page
is never the thing that dead-ends.

The form disables its submit button in flight so a double click cannot create
two leads, trims and lowercases the email before sending, and carries a
honeypot field that silently drops bot submissions. It sets no cookies and no
storage, and tracks nothing about the submitter beyond the request itself.

## Structure

```
index.html                 entry for /
vfarm/index.html           entry for /vfarm
public/landing-config.json the content contract — see above
src/
  pages/home/              Home.tsx, main.tsx and the home page's sections
  pages/vfarm/             VFarm.tsx, main.tsx and the vFarm page's sections
  components/              anything two pages share
  config/                  fetch, validate and gate the config
  styles/tokens.css        every design token, light and dark
  styles/base.css          reset, type scale, layout primitives
  types/                   the shape of the config and the lead envelope
public/favicon.svg         the icon set, drawn from the wordmark
public/favicon.ico         32px fallback
public/apple-touch-icon.png
```

A page owns its sections; anything two pages share moves to `src/components/`.
No component file runs much past 200 lines — split it instead.

## Design

The design system is the BHA Engine Dashboard's, lifted from that repo's
`src/index.css` so the public site and the internal dashboard read as one
product. Plain CSS with custom properties: no Tailwind, no component library,
no CSS-in-JS. Light and dark are the same variable names with different values,
switched on `prefers-color-scheme` — there is no theme toggle and nothing is
stored. Inter comes from Google Fonts, which is the only third-party request
the site makes; there are no analytics and no trackers.

The top bar is transparent over the hero wash and takes a near-opaque surface,
a hairline and a blur once the page scrolls past a sentinel in the top 24px.
The background does the work and the blur is only the finish: a browser that
ignores `backdrop-filter` must still get a bar you cannot read through. One
trap worth knowing about is documented in `src/styles/base.css` — the CSS
minifier treats `backdrop-filter` and `-webkit-backdrop-filter` as one
property and keeps whichever is written last, so the prefixed one goes first
and the standard one last. Reversing them silently ships a site with no blur
anywhere.

## Running it

```
npm install
npm run dev        # the dev server, both routes
npm run build      # tsc -b && vite build → dist/
npm run typecheck
npm run preview
```
