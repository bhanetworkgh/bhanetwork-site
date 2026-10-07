/**
 * The privacy notice. Plain English, and true to what the site actually does:
 * the field list is read from the form itself (src/lib/formA.ts), so the two
 * cannot drift.
 *
 * 7 Oct 2026: the phone and text-message section was added for the
 * "Bays Horizon SMS Customer Care" program (Twilio A2P registration reads this
 * page). The opt-out line is fixed wording; change it only with Jason.
 */

export const privacy = {
  heading: 'Privacy',
  updated: 'Last updated 7 October 2026',
  intro:
    'Bays Horizon Network collects personal information in two ways. This site collects it in one place only: the vFarm early-access form on the vFarm page. Separately, we hold phone numbers and messages when you use our customer care by text or phone. This page explains what is collected in each case and what happens to it.',
  sections: {
    collects: {
      heading: 'What the form collects',
      body: 'The answers you give to these questions, required ones marked:',
      extra:
        'Alongside your answers the form sends three things about the visit itself: the campaign the page belongs to, the page address you sent it from, and any utm_ tags that were in the link you followed (these say which post or email a link came from). The form sets no cookies and reads nothing else from your device.',
    },
    phone: {
      heading: 'Phone numbers and text messages',
      collects:
        'We collect your phone number, and related details such as your name, the organisation or farm you belong to and your role, when you give them to us for early access, a subscription or customer support, or when you text or call our customer care number. We also keep the messages you send us, our replies, and whether each message was delivered.',
      use: 'We use this information to run your account, to get you set up, and to support you. Text messages (SMS) may be used for customer care and for operational notifications about your account or service. We do not use your number for unrelated marketing.',
      sharing:
        'Your phone number and message details are never sold. No mobile information is shared with third parties or affiliates for marketing or promotional purposes, and text messaging opt-in data and consent are not shared with any third party. The only outside parties that handle your number are the service providers that carry our messages and calls (our messaging provider and the mobile carriers), and they may use it only to deliver them.',
      optOut: 'Text STOP to opt out. Text HELP for help.',
      termsBefore: 'The full terms of the text-message program are on our ',
      termsLabel: 'Terms and Conditions',
      termsAfter: ' page.',
    },
    why: {
      heading: 'Why we collect the form answers',
      body: 'To follow up with you about vFarm early access: to understand your use case, site and timing, and to decide who to talk to first as the programme develops. Nothing else.',
    },
    where: {
      heading: 'Where the form answers go',
      body: "When you submit, your answers go to our intake workflow (run on n8n), which writes them into the vFarm team's lead tracking: the response sheet behind our early-access intake form. Only the Bays Horizon team can see it.",
    },
    sold: {
      heading: 'We never sell it',
      body: 'Your information is never sold, rented or traded. It is not shared with anyone outside the Bays Horizon team, except the service providers that carry our text messages and calls, who may use it only to deliver them.',
    },
    kept: {
      heading: 'How long we keep it',
      body: 'Early-access form answers are kept until you ask us to delete them, or until the vFarm early-access programme ends, whichever comes first. Phone numbers and message records are kept while you are a customer or in conversation with us, and are deleted when you ask.',
    },
    removal: {
      heading: 'Getting it removed',
      bodyBefore: 'Email ',
      bodyAfter:
        ' and ask us to delete your details. Tell us the email address you used on the form, or the phone number you texted or called from, so we can find them.',
    },
    browser: {
      heading: 'What this site stores in your browser',
      body: 'Nothing. This site stores nothing in your browser: no cookies, no local storage, no tracking, no analytics and no advertising scripts.',
    },
  },
  contactEmail: 'admin@bhanetwork.org',
};
