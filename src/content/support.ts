/**
 * The support page (8 Nov 2026, Destiny). How a customer reaches Bays Horizon
 * Network, what Genie (the automated assistant on the phone line) can and
 * cannot do, and how to reach a person.
 *
 * Keep it true to what runs. Genie's limits here are the limits in its own
 * instructions (ElevenLabs agent "BHA Customer Service Twin"); change both
 * together. The text-message lines reuse the fixed wording on /terms and in
 * the footer, which the Twilio A2P campaign reads: do not reword them here.
 * WhatsApp is not listed until it is live.
 */

import type { IconName } from '../components/Icon';

export const SUPPORT_PHONE = '(971) 588-5823';
export const SUPPORT_PHONE_E164 = '+19715885823';
export const SUPPORT_EMAIL = 'support@bhanetwork.org';

export const support = {
  eyebrow: 'Support',
  heading: 'How to reach us',
  updated: 'Last updated 8 November 2026',
  intro:
    'Questions about vFarm or Bays Horizon Network? Call, email or text us. Here is what each one does and what happens next.',

  channels: [
    {
      id: 'call',
      icon: 'phone' as IconName,
      label: 'Call',
      value: SUPPORT_PHONE,
      href: `tel:${SUPPORT_PHONE_E164}`,
      body: 'Genie, our automated assistant, answers straight away, day or night. It answers from our help pages and can pass your question to a person.',
    },
    {
      id: 'email',
      icon: 'envelope' as IconName,
      label: 'Email',
      value: SUPPORT_EMAIL,
      href: `mailto:${SUPPORT_EMAIL}`,
      body: 'A person on the team reads every email and replies during support hours.',
    },
    {
      id: 'text',
      icon: 'chat' as IconName,
      label: 'Text',
      value: SUPPORT_PHONE,
      href: `sms:${SUPPORT_PHONE_E164}?&body=HELP`,
      body: 'Text HELP for our contact details, START to join our customer care texts, or STOP to opt out.',
    },
  ],

  hours: {
    heading: 'Support hours',
    body: 'People on the team answer from 9am to 5pm New York time. Genie answers calls at any hour, and a request for a person made outside those hours is waiting for the team when they are back.',
  },

  person: {
    heading: 'Talking to a person',
    body: 'Ask Genie for a person at any point in a call. It takes your name, your email and what you need, reads the email back to check it, and sends it to the team. A person replies by email during support hours.',
    directBefore: 'You can also skip Genie and email ',
    directAfter: ' directly.',
  },

  genie: {
    heading: 'About Genie',
    intro: 'Genie is an automated assistant, not a person, and it says so when it answers.',
    can: {
      label: 'Genie can',
      items: [
        'Explain the vFarm pilot and how the rack works.',
        'Walk you through looking after your rack.',
        'Tell you how to reach the team.',
        'Take your name, email and question and pass them to a person.',
      ],
    },
    cannot: {
      label: 'Genie cannot',
      items: [
        "See your farm's readings or change your rack's settings.",
        'Quote prices, take payments or confirm an order. Buying questions go to a person.',
        'Promise harvests, yields, shipping dates or feature dates.',
      ],
    },
    recordingBefore:
      'Calls are recorded and transcribed so the team can follow up and improve the answers. Our ',
    recordingLink: 'Privacy',
    recordingAfter: ' page says what we keep and how to have it removed.',
  },

  urgent: {
    heading: 'If something is unsafe',
    body: 'If water is leaking near anything electrical, you smell burning or you see sparks, keep away from the water and switch the rack off at the wall only if it is safe to reach. If anyone is in danger, call 911.',
    then: 'Then tell us. If you are on the vFarm pilot, post URGENT in your pilot channel. Otherwise call us, or email with URGENT at the start of the subject.',
  },

  texts: {
    heading: 'Text messages',
    /* Fixed wording from /terms and the A2P campaign. */
    body: 'Texts to and from (971) 588-5823 are Bays Horizon SMS Customer Care. Messages are sent as needed in response to your inquiries or account activity. Message and data rates may apply.',
    optOut: 'Text STOP to opt out. Text HELP for help.',
    termsBefore: 'The full terms are on our ',
    termsLink: 'Terms and Conditions',
    termsAfter: ' page.',
  },

  more: {
    heading: 'More answers',
    faq: { to: '/#faq', label: 'Common questions about vFarm' },
    vfarm: { to: '/vfarm', label: 'What vFarm is and how Early Access works' },
  },
};
