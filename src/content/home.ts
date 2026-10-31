/** Home page copy. Anything said about vFarm here restates landing-config; it never adds a claim. */

export const hero = {
  eyebrow: 'Bays Horizon Network',
  /* The headline is set in two halves: the lead, then the butter accent. */
  /* Jason's approved line, 27 Sep 2026. */
  headlineLead: 'A farm the size of a bookshelf,',
  /* Second half changed 31 Oct (Destiny): the site is about vFarm, not the team's
     internals. From landing-config: "vFarm is being developed as a monitored
     growing system." Jason's original second half was "run by an engine that learns." */
  headlineAccent: 'built to be monitored.',
  subhead:
    'We are wiring a real vertical farm to an AI engine that will use data from each growing cycle to inform future improvements as it comes online. Join Early Access to see the builds, system diagrams, and monthly progress as we build toward an increasingly automated vFarm twin.',
  primary: { to: '/vfarm#signup', label: 'Join vFarm early access' },
  secondary: { to: '/#team', label: 'Meet the team' },
  /* Two facts about vFarm, both from landing-config's what_vfarm_is. */
  facts: [
    { icon: 'sprout', label: 'Sized for', value: 'A spare room' },
    { icon: 'activity', label: 'Built for', value: 'Monitored operation' },
  ],
} as const;

/** The about block: a big lowercase title, a label column and one statement. */
export const about = {
  /* The three small lines across the top of the band, after VerdaAgro. */
  meta: ['bha network', 'About the project', 'vFarm P1.0'],
  title: 'about bha',
  labels: ['vFarm P1.0', 'A vertical farm', 'built in the open'],
  lead: 'vFarm is a vertical farm for a spare room, being built in the open.',
  body: 'P1.0 is a two-tier open rack, roughly the footprint of a bookshelf, with trays, lights and pumps. It is being built for monitored operation, and what we show of it is only what has been verified.',
};

/** P1.0 in three figures, all from landing-config's what_vfarm_is. */
export const stats = {
  asOf: 'P1.0 as described in the current vFarm spec. Final dimensions and power follow mechanical confirmation.',
  items: [
    { value: '2', suffix: '', label: 'Tiers in the P1.0 open rack' },
    { value: '1', suffix: '', label: 'Bookshelf of floor space, roughly' },
    { value: '4', suffix: '', label: 'Parts of the base build: frame, trays, lights and pumps' },
  ],
};

/**
 * The base build, as big numbered rows that open. Each line restates the
 * approved P1.0 renders' own labels (CAD intent, reference-informed); nothing
 * here is a verified capability.
 */
export const rows = {
  eyebrow: 'The base build',
  heading: 'What comes in the rack.',
  note: 'From the current P1.0 design: CAD intent, reference-informed. Control and automation capabilities are shown only when verified.',
  items: [
    {
      title: 'The frame',
      body: 'A two-tier open steel rack, roughly the footprint of a bookshelf. It holds two grow trays, one above the other, with the water reservoir underneath. Final dimensions and power are published after mechanical confirmation.',
    },
    {
      title: 'Trays',
      body: 'Two trays, each laid out for eight pots in a two by four grid. Each tray drains through its own valve into a shared drain riser, so one tier can be emptied without touching the other.',
    },
    {
      title: 'Lights',
      body: 'An LED tube runs over each tray, one upper and one lower, so every tier has its own light rather than sharing one from above.',
    },
    {
      title: 'Pumps',
      body: 'A submersible pump sits inside a 150 litre reservoir at the bottom of the rack and tops up each tray through a riser. Water drains back to the reservoir by gravity, and a gate valve gives a manual top-up bypass.',
    },
  ],
};

export const whatWeDo = {
  eyebrow: 'Our principles',
  heading: 'How we build.',
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
  /* Twelve words each, so the four sit evenly. Same meaning as landing-config's what_vfarm_is. */
  lines: [
    'Sized for a spare room: two growing tiers, roughly a bookshelf’s footprint.',
    'Base build: frame, trays, lights and pumps; automation shown only when verified.',
    'Monitoring captures supported signals and surfaces verified events for people to review.',
    'Being built for monitored operation, with more automation as the development goal.',
  ],
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
