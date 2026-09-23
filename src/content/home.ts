/** Home page copy. Nothing here is about vFarm's product claims; those live in landing-config. */

export const hero = {
  eyebrow: 'Bays Horizon Network',
  headline: "We're building our own engine, not renting someone else's.",
  subhead:
    'A small team of builders creating AI systems that are real, tested and transparent, starting with a vertical farm you can watch us build.',
  primary: { to: '/vfarm#signup', label: 'Join vFarm early access' },
  secondary: { to: '/#team', label: 'Meet the team' },
  /* The floating cards. Only facts that cannot go stale. The launch card's
     number is worked out live from the countdown target. */
  cards: {
    launch: { label: 'vFarm launch' },
    builders: { label: 'Founding builders', value: '6' },
    sessions: { label: 'Every session', value: 'logged, reviewed, on the record' },
    ground: { label: 'Proving ground', value: 'Real crops. Real sensors.' },
  },
};

export const whatWeDo = {
  line: 'We build from first principles, not on top of old processes.',
  cards: [
    {
      icon: 'compass',
      title: 'Built from first principles',
      body: "We don't bolt AI onto old processes. We redesign the process, then build the system that runs it.",
    },
    {
      icon: 'shield',
      title: 'Real systems, not demos',
      body: 'Everything we ship is hardened, tested and logged, so when it breaks, it breaks loudly and gets fixed.',
    },
    {
      icon: 'eye',
      title: 'Transparent by design',
      body: 'Every decision the engine makes leaves a record a person can read, so you can always see why.',
    },
  ],
} as const;

export const building = {
  heading: "What we're building",
  cards: [
    {
      icon: 'sprout',
      title: 'vFarm',
      body: 'A vertical farm cabinet for homes and shops, and the proving ground for our engine.',
      to: '/vfarm',
      linkLabel: 'See vFarm',
    },
    {
      icon: 'users',
      title: 'The team',
      body: 'Six builders and a founder, building in the open.',
      to: '/#team',
      linkLabel: 'Meet the team',
    },
  ],
} as const;

export const whyFarm = {
  heading: 'Why is there a vertical farm here?',
  body: 'Because the farm is our proving ground. Crops, sensors, cameras and customers give our engine a real, physical system to run, where mistakes show up as data rather than slides. What we learn here carries forward into energy, housing, local production and, in time, advisory.',
  button: { to: '/vfarm', label: 'See vFarm' },
};

export const ctaBand = {
  heading: 'Follow the build.',
  button: { to: '/vfarm#signup', label: 'Join vFarm early access' },
};
