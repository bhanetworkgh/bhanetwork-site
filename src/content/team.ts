/**
 * Team page copy.
 *
 * Photos live in public/team/<slug>.<ext> (jpg, jpeg, png, webp or avif) and
 * are picked up at build time. A builder with no photo gets a monogram tile —
 * never a stock image. The slugs are fixed: they are also the /team#<slug>
 * links.
 */

export const hero = {
  heading: 'Founding Builders',
  sub: 'The engineers and systems thinkers building the Bays Horizon engine, one real system at a time.',
};

export const principles = [
  'First principles',
  'Real systems, not toys',
  'Human welfare in the loop',
  'Abundance over scarcity',
];

export const founder = {
  slug: 'jason-bays',
  name: 'Jason Bays',
  role: 'Founder & Principal',
  eyebrow: 'Meet the founder',
  paragraphs: [
    'Jason founded Bays Horizon Advisory as a planning practice built around real families, real plans and resilient wealth. Bays Horizon Network is the other half of that story: the team and the engine behind it.',
    'His bet is simple: a small firm can build its own engine instead of renting one. That means systems that read their own records, support that gives an honest "no data yet" instead of a guess, and workflows that let people work less like typists and more like architects. The vertical farm is where that bet gets tested in the open.',
    'Jason sets the direction, reviews every lane, and holds one standard: engine, not toy.',
  ],
};

export interface Builder {
  slug: string;
  name: string;
  role: string;
  bio: string;
  building: string[];
}

export const buildingHeading = "What they're building";
export const closeLabel = 'Close';

export const builders: Builder[] = [
  {
    slug: 'destiny-arupi',
    name: 'Destiny Arupi',
    role: 'Engine Steward',
    bio: "Destiny keeps the engine running and honest. He moved the engine's records onto its own database, built the live dashboard the team runs on, and designed the self-healing layer: failed jobs are caught, retried, repaired where it's safe to, and passed to a person with full context when it isn't.",
    building: [
      'The engine dashboard, one live view of every lane, loop, log and payment.',
      'Self-healing that recovers what it safely can and escalates the rest.',
      'The review gate that checks every session log before it reaches the record.',
      'Build patterns that turn one-off fixes into reusable playbooks.',
    ],
  },
  {
    slug: 'jeganathan',
    name: 'Jeganathan',
    role: 'Senior Architect, Data Spine & vFarm Platform',
    bio: "Jegan hardens the data spine the vertical farm runs on. He moved sensor data to a flexible model so any new signal plugs into the same health checks and alerts, and he writes the contracts that let every other part of the engine rely on the farm's data.",
    building: [
      'The vFarm data spine: a single source of truth for every sensor, rack and device.',
      'Vision contracts and the promotion gate that decides when camera readings are trustworthy enough to act on.',
      "Security and isolation fixes that keep each customer's data separate.",
      'The rack and cabinet configuration behind the first production build.',
    ],
  },
  {
    slug: 'kaiqi-yang',
    name: 'Kaiqi Yang',
    role: 'Advanced Builder, Engine Automation & Integrations',
    bio: "Kaiqi builds the automation layer that lets the engine do work on its own safely. He runs the coding sub-agents, the GitHub integration and the pipelines that feed knowledge into the engine, each built to fail closed rather than guess.",
    building: [
      'Coding sub-agents that can read and propose changes under strict limits.',
      'The GitHub integration, starting with its security layer.',
      "Knowledge pipelines that keep the engine's memory current.",
      'Fixes to timeouts, payloads and memory that stop small failures spreading.',
    ],
  },
  {
    slug: 'ahad',
    name: 'Ahad',
    role: 'Advanced Builder, Customer Service Twin',
    bio: 'Ahad builds the Customer Service Twin, the part of the engine customers actually talk to. Text the vFarm number and you get a live answer from the farm\'s real data, or an honest "no data yet", with voice support on the way.',
    building: [
      'SMS and voice support for vFarm customers.',
      'Multi-tenant isolation, so every customer only ever sees their own system.',
      'An admin console that pairs each conversation with any incident it raised.',
      'Telemetry fallbacks that keep answers accurate when a sensor goes quiet.',
    ],
  },
  {
    slug: 'hardik-bhatt',
    name: 'Hardik Bhatt',
    role: 'Automation & AI Systems Builder, vFarm Product & Launch',
    bio: "Hardik turns the engine's work into something people can see and trust. He owns the vFarm product contracts, the 10/31 launch plan, and the rule that every public claim is backed by evidence.",
    building: [
      'The vFarm design and parts contracts, from CAD source to approved render.',
      'The 10/31 launch plan and the early-access path.',
      'The rule that every public claim has evidence behind it before it ships.',
      'The bridge between the engine room and the outside world.',
    ],
  },
  {
    slug: 'kavin-g-n',
    name: 'Kavin G N',
    role: 'Advanced Builder, vFarm Vision & IoT Control',
    bio: "Kavin builds the vFarm's eyes and hands. His cameras watch every rack on a schedule, and his control layer turns the engine's decisions into real actions on lights, pumps and drains. He brings three years of hands-on IoT work across hardware, embedded systems and cloud.",
    building: [
      'Rack cameras and the vision pipeline, from capture to alert.',
      'A power system tested in the real world: 11.2 hours measured on battery.',
      'A relay-driven control layer for lights, pumps and drains.',
      'IoT patterns every future farm unit can reuse.',
    ],
  },
];

export const cta = {
  heading: "See what they're building.",
  button: { to: '/vfarm', label: 'See vFarm' },
};
