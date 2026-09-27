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

/** Who we are, for search engines (schema.org Organization). Only facts we can stand behind. */
export const ORGANIZATION = {
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon-512.png`,
  email: 'admin@bhanetwork.org',
  description:
    'The building side of Bays Horizon: the team, the experiments and the AI engine behind the monitored vFarm.',
};

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
  closeMenuLabel: 'Close menu',
};

export const footer = {
  line: 'Building the monitored vFarm in public.',
  groups: [
    {
      label: 'Site',
      links: [
        { to: '/', label: 'Home' },
        { to: '/vfarm', label: 'vFarm' },
        { to: '/#team', label: 'Team' },
        { to: '/#faq', label: 'FAQ' },
      ],
    },
    {
      label: 'Company',
      links: [{ to: '/privacy', label: 'Privacy' }],
    },
  ],
  contactLabel: 'Contact',
  email: 'admin@bhanetwork.org',
  copyright: '© 2026 Bays Horizon Network',
  launch: 'vFarm launch · Oct 31',
  watermark: 'Bays Horizon',
};

/** Per-page <head> copy. /vfarm's comes from landing-config (see src/lib/meta.ts). */
export const meta = {
  home: {
    title: 'Bays Horizon Network | Building the monitored vFarm in public',
    description:
      'We are wiring a real vertical farm to an AI engine that uses data from each growing cycle to inform future improvements.',
  },
  privacy: {
    title: 'Privacy | Bays Horizon Network',
    description:
      'What the vFarm early-access form collects, why, where it goes, how long it is kept and how to have it removed.',
  },
  vfarmFallbackTitle: 'vFarm | Bays Horizon Network',
  notFound: {
    title: 'Page not found | Bays Horizon Network',
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
