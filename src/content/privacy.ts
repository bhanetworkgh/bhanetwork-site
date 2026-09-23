/**
 * The privacy notice. Plain English, and true to what the site actually does:
 * the field list is read from the form itself (src/lib/formA.ts), so the two
 * cannot drift.
 */

export const privacy = {
  heading: 'Privacy',
  updated: 'Last updated 23 September 2026',
  intro:
    'This site collects personal information in one place only: the vFarm early-access form on the vFarm page. This page explains what that form collects and what happens to it.',
  sections: {
    collects: {
      heading: 'What the form collects',
      body: 'The answers you give to these questions, required ones marked:',
      extra:
        'Alongside your answers the form sends three things about the visit itself: the campaign the page belongs to, the page address you sent it from, and any utm_ tags that were in the link you followed (these say which post or email a link came from). The form sets no cookies and reads nothing else from your device.',
    },
    why: {
      heading: 'Why we collect it',
      body: 'To follow up with you about vFarm early access: to understand your use case, site and timing, and to decide who to talk to first as the programme develops. Nothing else.',
    },
    where: {
      heading: 'Where it goes',
      body: "When you submit, your answers go to our intake workflow (run on n8n), which writes them into the vFarm team's lead tracking — the response sheet behind our early-access intake form. Only the Bays Horizon team can see it.",
    },
    sold: {
      heading: 'We never sell it',
      body: 'Your information is never sold, rented or traded, and it is not shared with anyone outside the Bays Horizon team.',
    },
    kept: {
      heading: 'How long we keep it',
      body: 'Until you ask us to delete it, or until the vFarm early-access programme ends, whichever comes first.',
    },
    removal: {
      heading: 'Getting it removed',
      bodyBefore: 'Email ',
      bodyAfter:
        ' and ask us to delete your early-access details. Tell us the email address you used on the form so we can find them.',
    },
    browser: {
      heading: 'What this site stores in your browser',
      body: 'Only your light or dark theme choice, if you use the toggle in the menu bar, saved in your browser\'s local storage so the site remembers it. There are no tracking cookies, no analytics and no advertising scripts on this site.',
    },
  },
  contactEmail: 'admin@bhanetwork.org',
};
