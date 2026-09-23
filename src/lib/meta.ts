import type { LandingConfig } from '../types/landing';
import { meta as copy, OG_IMAGE, SITE_NAME, SITE_URL } from '../content/site';

/**
 * Each route's <head>: title, description, canonical, Open Graph and Twitter.
 *
 * The pre-render writes these into every route's HTML so a shared link
 * previews the right page; the app updates them on client-side navigation.
 * /vfarm's title and description come from landing-config.
 */

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  image: string;
  noindex?: boolean;
}

export const ROUTES = ['/', '/vfarm', '/team', '/privacy'] as const;

export function metaFor(path: string, config: LandingConfig | null): PageMeta {
  const base = { path, image: OG_IMAGE };
  switch (path) {
    case '/':
      return { ...base, ...copy.home };
    case '/team':
      return { ...base, ...copy.team };
    case '/privacy':
      return { ...base, ...copy.privacy };
    case '/vfarm': {
      const headline = config?.early_access.headline.trim();
      return {
        ...base,
        title: headline ? `${headline} — ${SITE_NAME}` : copy.vfarmFallbackTitle,
        description: config?.early_access.body.trim() ?? '',
      };
    }
    default:
      return { ...base, ...copy.notFound, noindex: true };
  }
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** The tags as HTML, for the pre-render. */
export function headHtml(m: PageMeta): string {
  const url = SITE_URL + (m.path === '/' ? '/' : m.path);
  const t = escapeAttr(m.title);
  const d = escapeAttr(m.description);
  const tags = [
    `<title>${t}</title>`,
    m.description && `<meta name="description" content="${d}" />`,
    m.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    !m.noindex && `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${t}" />`,
    m.description && `<meta property="og:description" content="${d}" />`,
    `<meta property="og:image" content="${m.image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    m.description && `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${m.image}" />`,
  ];
  return tags.filter(Boolean).join('\n    ');
}

/** The same tags, applied to the live document after a client-side navigation. */
export function applyMeta(m: PageMeta): void {
  document.title = m.title;
  const url = SITE_URL + (m.path === '/' ? '/' : m.path);
  const set = (selector: string, attr: string, value: string) => {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  set('meta[name="description"]', 'content', m.description);
  set('link[rel="canonical"]', 'href', url);
  set('meta[property="og:url"]', 'content', url);
  set('meta[property="og:title"]', 'content', m.title);
  set('meta[property="og:description"]', 'content', m.description);
  set('meta[name="twitter:title"]', 'content', m.title);
  set('meta[name="twitter:description"]', 'content', m.description);
}
