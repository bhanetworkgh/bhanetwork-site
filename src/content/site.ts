/**
 * Site-wide copy: the nav, the footer and each page's <head>.
 *
 * Everything a visitor reads that is not about vFarm lives in src/content/, so
 * it can be edited without touching a component. Anything about vFarm — its
 * headline, subhead, calls to action, claims and state — comes from
 * public/landing-config.json and nowhere else.
 */

export const SITE_URL = 'https://bhanetwork.org';
export const SITE_NAME = 'Bays Horizon Network';

/** The Open Graph / Twitter image every page shares. A brand card, not a vFarm image. */
export const OG_IMAGE = `${SITE_URL}/og.png`;

export const nav = {
  /* Team and FAQ are sections of Home; the nav scrolls to them. */
  links: [
    { id: 'home', to: '/', label: 'Home' },
    { id: 'vfarm', to: '/vfarm', label: 'vFarm' },
    { id: 'team', to: '/#team', label: 'Team' },
    { id: 'faq', to: '/#faq', label: 'FAQ' },
  ],
  cta: { to: '/vfarm#signup', label: 'Join vFarm early access' },
  menuLabel: 'Menu',
  themeToLight: 'Switch to light theme',
  themeToDark: 'Switch to dark theme',
};

export const footer = {
  links: [
    { to: '/', label: 'Home' },
    { to: '/vfarm', label: 'vFarm' },
    { to: '/#team', label: 'Team' },
    { to: '/privacy', label: 'Privacy' },
  ],
  contactLabel: 'Contact',
  email: 'admin@bhanetwork.org',
  teamLogin: { href: 'https://dashboard.bhanetwork.org', label: 'Team login' },
  copyright: '© 2026 Bays Horizon Network',
};

/** Per-page <head> copy. /vfarm's comes from landing-config (see src/lib/meta.ts). */
export const meta = {
  home: {
    title: "Bays Horizon Network — building our own engine, not renting someone else's",
    description:
      'We are wiring a real vertical farm to an AI engine that uses data from each growing cycle to inform future improvements.',
  },
  privacy: {
    title: 'Privacy — Bays Horizon Network',
    description:
      'What the vFarm early-access form collects, why, where it goes, how long it is kept and how to have it removed.',
  },
  vfarmFallbackTitle: 'vFarm — Bays Horizon Network',
  notFound: {
    title: 'Page not found — Bays Horizon Network',
    description: 'That page does not exist.',
  },
};

/** The launch countdown, shared by Home and /vfarm. */
export const countdown = {
  label: 'vFarm launch',
  dateLabel: 'Oct 31',
  units: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },
  daysToGo: (n: number) => `${n} ${n === 1 ? 'day' : 'days'} to go`,
};

export const notFound = {
  eyebrow: '404',
  heading: "That page isn't here.",
  body: 'The link may be old, or the address mistyped.',
  home: 'Back to Home',
};
