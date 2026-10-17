/**
 * Terms and Conditions for the text-message program, "Bays Horizon SMS
 * Customer Care". Added 7 Oct 2026 for the Twilio A2P 10DLC registration of
 * the Customer Service Twin's number: Twilio reviews this page with the
 * campaign.
 *
 * Four lines are fixed wording from the registration brief and must not be
 * reworded without Jason: the program name, `rates`, `frequency` and `optOut`.
 *
 * 8 Oct 2026: the intro and "What the program is" now name the same products
 * and message types as the campaign description (Customer Service Twin, vFarm
 * monitoring; account verification, subscription and appointment
 * confirmations, 1:1 support replies) and cover sample 2's YES/NO call
 * confirmation.
 *
 * 12 Oct 2026: "How you join" rewritten to the opt-in that actually exists.
 * The campaign was rejected for its opt-in information: it said people give
 * their number on a site form, and no site form asks for one. People now join
 * by texting START (or a question) to (971) 588-5823; the call to action is in
 * the site footer (#text-us). When the Customer Service Twin onboarding adds
 * its own consent step (LOOP-1791321965741-SBAU), add it here AND to the
 * campaign's Message Flow in the same change.
 *
 * 17 Oct 2026: "Payments" added for Stripe account activation. It sits after
 * the program sections and changes none of the four fixed lines.
 */

export const terms = {
  heading: 'Terms and Conditions',
  program: 'Bays Horizon SMS Customer Care',
  updated: 'Last updated 17 October 2026',
  intro:
    'These terms cover Bays Horizon SMS Customer Care, the text-message customer care program run by Bays Horizon Network for our advisory and automation products, including the Customer Service Twin and vFarm monitoring.',
  sections: {
    program: {
      heading: 'What the program is',
      body: 'Bays Horizon SMS Customer Care lets you reach us, and lets us reach you, by text message about our advisory and automation products, including the Customer Service Twin and vFarm monitoring. Messages are customer care and operational messages: account verification, subscription and appointment confirmations, and one-to-one replies to your customer support questions about your service. An appointment confirmation may ask you to confirm an onboarding call by replying YES or NO. We do not send marketing messages through this program.',
    },
    consent: {
      heading: 'How you join',
      body: 'You join by texting START to (971) 588-5823, our customer care number, or by texting that number with a question. After you text START we send one message confirming you have joined, with how often we message, that message and data rates may apply, and how to opt out. Today we only text people who have texted this number first. Agreeing to receive text messages is not a condition of buying anything from us.',
    },
    frequency: {
      heading: 'How often we message',
      body: 'Messages are sent as needed in response to your inquiries or account activity.',
    },
    rates: {
      heading: 'Cost',
      body: 'Message and data rates may apply.',
      extra: 'We do not charge for these messages. Any cost comes from your mobile plan.',
    },
    optOut: {
      heading: 'Opting out and getting help',
      body: 'Text STOP to opt out. Text HELP for help.',
      extra:
        'After you text STOP we send one message confirming you are opted out, and then no more. You can text START at any time to receive messages again.',
    },
    support: {
      heading: 'Support',
      bodyBefore: 'For help with this program or anything else, email ',
      bodyAfter: '.',
    },
    carriers: {
      heading: 'Delivery',
      body: 'Mobile carriers are not liable for delayed or undelivered messages. Delivery depends on your carrier and your phone being able to receive text messages.',
    },
    privacy: {
      heading: 'Your privacy',
      bodyBefore:
        'We use your phone number to run your account and to support you. It is never sold, and no mobile information is shared with third parties or affiliates for marketing or promotional purposes. The details are in our ',
      linkLabel: 'Privacy Policy',
      bodyAfter: '.',
    },
    payments: {
      heading: 'Payments',
      body: 'We only take a payment from you under a written agreement you have accepted, which sets out what you are paying for, the amount, what happens to a deposit, refunds and delivery. Payments are made by card on a checkout page run by Stripe, our payment processor, and Stripe emails you a receipt. Filling in our early-access form or texting our customer care number never commits you to paying anything. If you have a question about a charge, email us or text (971) 588-5823.',
    },
    changes: {
      heading: 'Changes to these terms',
      body: 'If we change these terms we will update this page and the date at the top.',
    },
  },
  contactEmail: 'admin@bhanetwork.org',
};
