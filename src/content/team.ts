/**
 * Team page copy.
 *
 * Photos live in public/team/<slug>.<ext> and are turned into WebP portraits
 * at build time (scripts/images.mjs). A builder with no photo gets a monogram
 * tile — never a stock image. The slugs are fixed: they are also the
 * /team#<slug> links.
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

export const intro = [
  'Most firms were built for the industrial age: lots of paperwork, slow updates, generic plans. At Bays Horizon, we\'re building our own AI-driven engine instead. It\'s private, secure, and designed so the work it supports becomes more proactive than reactive, more personal than generic, and more transparent and auditable than "trust us".',
  "We don't bolt AI tools onto the old machine. We build from first principles, harden real systems rather than toys, keep human welfare in view as we go, and redesign processes so they actually work.",
  "Why is there a vertical farm on our website? Because it's our first proving ground. Crops, sensors, cameras, partners and customers give the engine a real, physical system to run, where we can test ingestion, digital twins, thresholds, authentication and tests against reality, and prove the approach before we carry the same patterns into energy, housing, local production and, in time, advisory.",
  'Below are the people building it.',
];

export interface Person {
  slug: string;
  name: string;
  role: string;
  bio: string[];
  building: string[];
}

export const buildingHeading = "What he's building at BHA";

export const founder: Person = {
  slug: 'jason-bays',
  name: 'Jason Bays',
  role: 'Founder & Principal',
  bio: [
    'Jason founded Bays Horizon Advisory as a planning practice built around real families, real plans and resilient wealth. Bays Horizon Network is the other half of that story: the team, the experiments and the engine behind it.',
    'His bet is that a small firm can build its own engine instead of renting someone else\'s. That means digital twins that read their own logs and help pay the builders; support that gives a customer a live answer or an honest "no data yet" instead of a guess; and workflows that let people work less like typists and more like architects. The vertical farm is where that bet gets tested in the open, from renders to real cabinets.',
    'Jason sets the direction, reviews the work in every lane, and holds one standard across all of it: engine, not toy.',
  ],
  building: [],
};

export const builders: Person[] = [
  {
    slug: 'destiny-arupi',
    name: 'Destiny Arupi',
    role: 'Engine Steward',
    bio: [
      'Destiny is the Engine Steward for Bays Horizon, keeping the whole engine running, observable and honest across every builder lane. He started on integration quality, logging standards and the builder experience, designing the Log Engine posture, error-resilient ingestion flows and the narrated build patterns that make the ecosystem auditable and teachable instead of opaque.',
      "Today he owns the engine's operational core. He moved every engine record off Airtable and onto the engine's own database in a single cutover, built the live dashboard the whole team runs on, and designed a self-healing layer that catches failed jobs, retries them, repairs what is safe to repair, and hands the rest to a person with full context.",
    ],
    building: [
      'The engine dashboard: one live view of every lane, open loop, session log, build pattern and payment, updating the moment anything changes.',
      "Self-healing for the engine's workflows: failures classified, recovered where safe, and escalated with a traceable record when not.",
      "The review gate every session log passes through, checking it for completeness before it reaches the permanent record, and sending it back with a specific ask when it isn't.",
      'Robust logging and narration patterns that turn one-off builds into reusable playbooks, so the team never pays twice for the same mistake.',
      "The pay ledger and open-loop tracking that keep every builder's work, and what's owed for it, visible and accurate.",
    ],
  },
  {
    slug: 'jeganathan',
    name: 'Jeganathan',
    role: 'Senior Architect – Data Architecture & vFarm Platform',
    bio: [
      'Jegan is a senior architect responsible for hardening the data spine of the vFarm and its digital twin. He led the migration from fragile, hard-coded sensor columns to a JSONB-based model with generic stats, thresholds and tests: the kind of deep refactor that quietly multiplies what the system can do without needing another rewrite later. He now writes the contracts the rest of the engine relies on, from vision to device status to the production rack itself.',
    ],
    building: [
      'A JSONB-driven sensor readings model, with values as the single source of truth, that supports any current or future signal: temperature, humidity, pH, EC, light and beyond.',
      'Generic stats and thresholds infrastructure, so new signals plug into the same health and alerting logic without schema churn.',
      'The vFarm vision contracts and promotion gate that decide when camera-based readings are trustworthy enough for the engine to act on.',
      'Security and tenant-isolation hardening across the vFarm backend and edge code, including session-backed authentication, device auto-registration and test suites.',
      'The rack and cabinet configuration and procurement behind the first production build.',
      "OTEL-based telemetry and the RAG infrastructure behind the engine's knowledge layer, so the engine can see what's happening in production and learn from it.",
    ],
  },
  {
    slug: 'kaiqi-yang',
    name: 'Kaiqi Yang',
    role: 'Advanced Builder – Engine Automation & Integrations',
    bio: [
      "Kaiqi is an advanced builder focused on turning messy, real-world data flows into clean, modular engines with solid UX on top. He was central to standing up the Stage 1 ingestion application for Bays Horizon, wiring CRUD APIs, Postgres integration, tests and interface patterns that other builders reuse instead of reinventing. His focus has since moved to the automation layer that lets the engine do real work on its own, safely. That means coding sub-agents, the GitHub integration and the pipelines that keep the engine's knowledge current, each designed to fail closed rather than guess.",
    ],
    building: [
      'Coding sub-agents that can read, reason about and propose changes under strict permissions and telemetry.',
      'The GitHub integration for the engine, starting with its security layer.',
      "Knowledge ingestion pipelines, including the RAG ingester and news feeds, that keep the engine's memory fresh.",
      'Hardening across the automation stack (timeouts, payload validation, session memory, version pinning) so small failures never cascade.',
      "A catalogue of patterns for environment edge cases (sandbox permissions, cron scheduling, DNS, port collisions) so future builders don't pay the same tuition.",
    ],
  },
  {
    slug: 'ahad',
    name: 'Ahad',
    role: 'Advanced Builder – Customer Service Twin & Reliability Infrastructure',
    bio: [
      'Ahad builds the parts of the engine that have to hold up when real people depend on them. He began on the reliability layer, building structured error logging and a unified error surface so automations fail loudly, visibly and fixably instead of breaking in the dark. He now leads the Customer Service Twin, the part of the engine customers actually talk to. A vFarm customer can text for a live answer drawn from the farm\'s real data, or an honest "no data yet", with every problem logged as an incident a human sees.',
    ],
    building: [
      'SMS and voice support for vFarm customers, with strict caller verification.',
      'Multi-tenant isolation and role-based access, so every customer only ever sees their own system, enforced by tests rather than convention.',
      'An admin console that pairs each customer conversation with any incident it raised.',
      'Telemetry fallbacks that keep answers accurate when a sensor goes quiet.',
      'JSON-based error logging patterns and a unified error channel that give the engine structured, analysable failure data to learn from.',
    ],
  },
  {
    slug: 'hardik-bhatt',
    name: 'Hardik Bhatt',
    role: 'Automation & AI Systems Builder – vFarm Product & Launch',
    bio: [
      "Hardik lives at the interface between architecture and storytelling, turning the engine's work into systems and narratives people can see and trust. He validates live behaviour, shapes how the digital twins talk about the engine, and makes sure progress is legible to clients, partners and future builders. For the vFarm launch he owns the product contracts and the rule that nothing goes public without evidence behind it.",
    ],
    building: [
      'The vFarm design and CAD contracts, tracing every part from CAD source to bill of materials to approved render.',
      'The 10/31 launch plan and the early-access path for founding buyers.',
      'Claim discipline for everything public: every statement on the site or in media is backed by verified evidence before it ships.',
      'Live validation and auditing of vFarm APIs and telemetry, to confirm the twin, tests and instrumentation behave as designed.',
      'Digital-twin-driven content that explains deep backend work in plain language for growers, restaurant partners and serious builders.',
    ],
  },
  {
    slug: 'kavin-g-n',
    name: 'Kavin G N',
    role: 'Advanced Builder – vFarm Vision & IoT Control Layer',
    bio: [
      "Kavin is an advanced builder working on the vFarm's eyes and hands: the layer that turns digital decisions into real-world actions and real-world conditions into data the engine can trust. He works across the vFarm ecosystem from rack hardware through kiosk and real-time event flows, and with three years of hands-on IoT work across hardware, embedded systems and cloud-connected applications, he bridges the farm's physical systems with the engine's software.",
    ],
    building: [
      'The rack camera system and vision pipeline, from scheduled capture on ESP32 cameras through to alerts, with a power system tested in the real world at 11.2 hours measured on battery.',
      'A relay-driven load device family for lights, pumps and drains, so each physical actuator is modelled, attached and controllable through one command path.',
      'The first production rack control lane, taking vFarm from monitoring-only to real actuation.',
      "The kiosk and real-time WebSocket event layer that shows operators the farm's status and control actions simply and reliably.",
      'Reusable IoT integration patterns that future vFarm units and other physical twins can adopt.',
    ],
  },
];

export const cta = {
  heading: "See what they're building.",
  button: { to: '/vfarm', label: 'See vFarm' },
};
