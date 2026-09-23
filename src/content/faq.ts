/**
 * The FAQ on Home. Separate from the /vfarm FAQ, which comes from
 * landing-config.
 *
 * An answer is a list of parts: plain text, an in-site link ({ text, to }) or
 * an outside link ({ text, href }).
 */

export type AnswerPart = string | { text: string; to: string } | { text: string; href: string };

export interface FaqEntry {
  q: string;
  a: AnswerPart[];
}

export const faq: { heading: string; items: FaqEntry[] } = {
  heading: 'Questions, answered.',
  items: [
    {
      q: 'What is Bays Horizon Network?',
      a: [
        "The building side of Bays Horizon: the team, the experiments and the engine we're creating. Bays Horizon Advisory remains a planning practice focused on real families, real plans and resilient wealth. The Network is where the engine behind it gets built.",
      ],
    },
    {
      q: 'What do you mean by "our own engine"?',
      a: [
        'A set of AI systems and workflows we build and run ourselves, rather than rent. They log their own work, check it, flag what breaks, and leave a record a person can read, so we can always see why something happened.',
      ],
    },
    {
      q: 'Why a vertical farm?',
      a: [
        "It's our proving ground. A real farm with real crops, sensors and cameras gives the engine a physical system to run, where mistakes show up as data rather than slides. What works there carries forward to other domains.",
      ],
    },
    {
      q: 'What is vFarm?',
      a: [
        'A vertical farm cabinet for homes and shops, and the first product our engine runs. ',
        { text: 'The vFarm page', to: '/vfarm' },
        " has what's being built and where it stands.",
      ],
    },
    {
      q: 'Is joining vFarm early access a purchase?',
      a: [
        "No. It's an expression of interest: not a purchase, a paid subscription, a hardware reservation or a delivery commitment. You'll receive build-progress updates and help shape what we prioritise.",
      ],
    },
    {
      q: 'What happens to the details I share?',
      a: [
        'We use them only to follow up about vFarm early access, and we never sell them. Our ',
        { text: 'privacy notice', to: '/privacy' },
        ' has the full detail, and you can ask us to delete your details at any time.',
      ],
    },
    {
      q: 'How do I get in touch?',
      a: [
        'Email ',
        { text: 'admin@bhanetwork.org', href: 'mailto:admin@bhanetwork.org' },
        ". We're glad to hear from partners, growers, builders and anyone curious about how the engine works.",
      ],
    },
  ],
};
