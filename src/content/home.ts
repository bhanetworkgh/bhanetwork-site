/** Home page copy. Nothing here is about vFarm's product claims; those live in landing-config. */

export const hero = {
  eyebrow: 'Bays Horizon Network',
  /* The headline is set in two halves: the lead, then the butter accent. */
  /* Jason's approved line, 27 Sep 2026. */
  headlineLead: 'A farm the size of a bookshelf,',
  headlineAccent: 'run by an engine that learns.',
  subhead:
    'We are wiring a real vertical farm to an AI engine that uses data from each growing cycle to inform future improvements. Join Early Access to see the builds, system diagrams, and monthly progress as we build toward an increasingly automated vFarm twin.',
  primary: { to: '/vfarm#signup', label: 'Join vFarm early access' },
  secondary: { to: '/#team', label: 'Meet the team' },
  /* Facts beside the headline. Only facts that cannot go stale. */
  stat: { value: '6', label: 'Founding builders, and a founder' },
  facts: [
    { icon: 'log', label: 'Every session', value: 'Logged, reviewed, on the record' },
    { icon: 'sprout', label: 'Proving ground', value: 'Real crops. Real sensors.' },
  ],
} as const;

export const whatWeDo = {
  eyebrow: 'How we build',
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

/** The running strip of what the team works on. Names only, no claims. */
export const lanes = {
  label: 'What the team works on',
  items: [
    'vFarm P1.0',
    'Monitoring Twin',
    'Research Twin',
    'North Star',
    'Customer Service Twin',
    'Genie',
    'Media Twin',
    'Engine dashboard',
  ],
};

export const whyFarm = {
  eyebrow: 'Why a farm',
  heading: 'Why is there a vertical farm here?',
  body: 'Because the farm is our proving ground. Crops, sensors, cameras and customers give our engine a real, physical system to run, where mistakes show up as data rather than slides. What we learn here carries forward into energy, housing, local production and, in time, advisory.',
  button: { to: '/vfarm', label: 'See vFarm' },
};

export const ctaBand = {
  eyebrow: 'Building in public',
  heading: 'Follow the build.',
  button: { to: '/vfarm#signup', label: 'Join vFarm early access' },
};

/** The /vfarm facts on Home come from landing-config; these are only their headings. */
export const whatVfarm = {
  eyebrow: 'vFarm P1.0',
  heading: 'What vFarm is, in four lines.',
  link: { to: '/vfarm', label: 'See vFarm' },
};

/** Shown only once landing-config's build_feed holds real (non-sample) entries. */
export const buildLog = {
  eyebrow: 'Build log',
  heading: 'The build log',
  body: 'Every entry is a real clip from the build. What worked, what broke, what fixed itself.',
};

export const faqIntro = {
  eyebrow: 'Questions',
  body: 'Anything else, write to us and a person replies.',
};
