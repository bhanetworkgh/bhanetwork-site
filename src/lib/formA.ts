/**
 * Form A, mirrored.
 *
 * Every question, every option, every help line and every required flag below
 * is copied from Hardik's live Google Form A ("vFarm Digital Twin Early Access
 * - Founding Buyer / Pilot Interest"):
 *
 *   https://docs.google.com/forms/d/e/1FAIpQLSfQkBm4lz4UuyL0TnbuJ7iUeE4PmWfDlfTLrKkDd23WL7gtnQ/viewform
 *
 * Same wording, same order, same question types. The steps are Form A's own
 * sections; the first one has no title in Form A, so it is labelled here. The
 * answers land in Form A's response sheet through the n8n intake webhook, so
 * this file must not drift from the form. If Form A changes, this file
 * changes to match it — a question is never added, reworded or dropped here
 * alone.
 *
 * `key` is the JSON key each answer is sent under; `entry` is the Form A
 * entry ID, kept so the two can be checked against each other.
 */

export type QuestionType = 'short' | 'email' | 'paragraph' | 'radio' | 'checkbox' | 'scale';

export interface Question {
  key: string;
  entry: number;
  title: string;
  type: QuestionType;
  required: boolean;
  help?: string;
  options?: readonly string[];
  /** Linear scale only: the end labels, low then high. */
  scaleLabels?: readonly [string, string];
}

export interface Step {
  title: string;
  description?: string;
  questions: readonly Question[];
}

const YES_NO_MAYBE_NOT_SURE = ['Yes', 'No', 'Maybe/Not sure yet'] as const;

export const FORM_A_STEPS: readonly Step[] = [
  {
    title: 'About You',
    questions: [
      { key: 'full_name', entry: 50840312, title: 'Full name', type: 'short', required: true },
      { key: 'email', entry: 2104531410, title: 'Email address', type: 'email', required: true },
      {
        key: 'organization_name',
        entry: 2077476838,
        title: 'Organization / household name',
        type: 'short',
        required: true,
      },
      {
        key: 'describes_you',
        entry: 1936985677,
        title: 'Which best describes you or your organization?',
        type: 'radio',
        required: true,
        options: [
          'Individual / Household',
          'Multi-unit residential',
          'School / Education',
          'Grocery / Retail',
          'Restaurant / Hospitality',
          'Community / Nonprofit',
          'City / Municipality',
          'Commercial operator',
          'Research institution',
          'Other',
        ],
      },
    ],
  },
  {
    title: 'Location',
    description: 'Help us understand where a future vFarm might operate.',
    questions: [
      { key: 'city', entry: 1514885324, title: 'City', type: 'short', required: true },
      {
        key: 'region',
        entry: 1163339328,
        title: 'State / Province / Region',
        type: 'short',
        required: true,
      },
      { key: 'country', entry: 1604495871, title: 'Country', type: 'short', required: true },
    ],
  },
  {
    title: 'What Would You Use vFarm For?',
    questions: [
      {
        key: 'primary_use_case',
        entry: 1058215081,
        title: 'What is your primary use case for vFarm?',
        type: 'radio',
        required: true,
        options: [
          'Home food production',
          'Multi-unit / residential food production',
          'School / education',
          'Grocery / local produce',
          'Restaurant / food service',
          'Community food access',
          'City / local resilience',
          'Research / testing',
          'Commercial growing',
          'Other',
        ],
      },
      {
        key: 'goal',
        entry: 1682579475,
        title: 'What would you like vFarm to help you accomplish?',
        type: 'paragraph',
        required: true,
        help: 'A few sentences is enough. For example: year-round fresh produce for a school, local production for a grocer, household food resilience, or a controlled growing environment for research.',
      },
    ],
  },
  {
    title: 'Your Potential Site',
    description:
      "You don't need final engineering details. We only need a rough idea of your current setup.",
    questions: [
      {
        key: 'space_available',
        entry: 999495372,
        title: 'Approximately how much space could you make available?',
        type: 'radio',
        required: true,
        options: [
          'Less than approximately 4 ft × 6 ft',
          'Approximately 4 ft × 6 ft',
          'Larger than 4 ft × 6 ft',
          'Space for multiple units may be available',
          'Not sure yet',
        ],
      },
      {
        key: 'indoor_space',
        entry: 9402884,
        title: 'Do you have an indoor or protected space available?',
        type: 'radio',
        required: true,
        options: YES_NO_MAYBE_NOT_SURE,
      },
      {
        key: 'power_available',
        entry: 882046320,
        title: 'Is electrical power available near the potential installation area?',
        type: 'radio',
        required: true,
        options: YES_NO_MAYBE_NOT_SURE,
      },
      {
        key: 'water_available',
        entry: 2133981396,
        title: 'Is a water source available near the potential installation area?',
        type: 'radio',
        required: true,
        options: YES_NO_MAYBE_NOT_SURE,
      },
      {
        key: 'environment',
        entry: 1585575209,
        title: 'What type of environment would the first vFarm most likely operate in?',
        type: 'radio',
        required: true,
        options: [
          'Indoor residential',
          'Indoor commercial',
          'School / education environment',
          'Grocery / retail environment',
          'Community / municipal environment',
          'Controlled research environment',
          'Protected non-indoor environment',
          'Site not selected yet',
          'Other',
        ],
      },
      {
        key: 'site_constraints',
        entry: 987370645,
        title: 'Are there any site constraints we should know about?',
        type: 'paragraph',
        required: false,
        help: 'For example: ceiling height, doorway/access limitations, shared space, landlord approval, drainage restrictions, or other installation concerns.',
      },
    ],
  },
  {
    title: 'How You’d Use the vFarm Experience',
    description:
      'Help us understand how you would most want to monitor and interact with a future vFarm.',
    questions: [
      {
        key: 'monitor_preference',
        entry: 644207337,
        title: 'How would you most want to monitor or interact with your vFarm?',
        type: 'checkbox',
        required: false,
        options: [
          'On-unit kiosk / display',
          'Mobile phone',
          'Web dashboard',
          'Alerts / notifications',
          'API / system integration',
          'Not sure yet',
        ],
      },
    ],
  },
  {
    title: 'Early Access Readiness',
    questions: [
      {
        key: 'interest_level',
        entry: 1676035490,
        title: 'How serious is your interest in becoming an early vFarm buyer or pilot partner?',
        type: 'scale',
        required: true,
        options: ['1', '2', '3', '4', '5'],
        scaleLabels: ['Just exploring', 'Ready to discuss an early pilot'],
      },
      {
        key: 'timeline',
        entry: 1671208608,
        title: 'When could you realistically consider a vFarm pilot or purchase?',
        type: 'radio',
        required: true,
        options: [
          'Just exploring - no timeline yet',
          'More than 12 months',
          'Within 6–12 months',
          'Within 3–6 months',
          'Ready to discuss within the next 3 months',
        ],
      },
      {
        key: 'budget_readiness',
        entry: 1863155229,
        title: 'Which best describes your current budget readiness?',
        type: 'radio',
        required: true,
        options: [
          'Exploring - no budget identified yet',
          'Planning / evaluating a budget',
          'Budget may be available once details and pricing are clearer',
          'Ready to discuss a paid pilot',
        ],
      },
      {
        key: 'reservation_openness',
        entry: 1934982349,
        title:
          'Would you consider a small Early Access reservation commitment in exchange for priority consideration as pilot units become available?',
        type: 'radio',
        required: true,
        options: ['Yes', "Maybe - I'd like more details first", "No - I'm interested in updates only"],
      },
    ],
  },
  {
    title: 'Founding Buyer Fit',
    questions: [
      {
        key: 'feedback_willingness',
        entry: 693333079,
        title: 'Would you be willing to provide structured feedback during an Early Access pilot?',
        type: 'radio',
        required: true,
        options: ['Yes', 'No', 'Maybe'],
      },
      {
        key: 'anything_else',
        entry: 1384991095,
        title: "Anything else you'd like us to know?",
        type: 'paragraph',
        required: false,
      },
      {
        key: 'heard_about',
        entry: 1893119528,
        title: 'How did you hear about vFarm?',
        type: 'radio',
        required: false,
        options: [
          'LinkedIn',
          'Short-form video',
          'Bays Horizon team',
          'Referral',
          'Event',
          'Partner',
          'Search',
          'Other',
        ],
      },
    ],
  },
];

/** Every question, in Form A order. */
export const FORM_A_QUESTIONS: readonly Question[] = FORM_A_STEPS.flatMap((s) => s.questions);

/** What the form holds while someone fills it in. Checkboxes hold a list. */
export type Answers = Record<string, string | string[]>;

export function emptyAnswers(): Answers {
  return Object.fromEntries(
    FORM_A_QUESTIONS.map((q) => [q.key, q.type === 'checkbox' ? [] : '']),
  );
}

/** Deliberately loose: the sheet is the authority, this only catches typos. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The first problem with one answer, or null. */
export function problemWith(q: Question, value: string | string[]): string | null {
  const text = Array.isArray(value) ? value.join('') : value.trim();
  if (q.required && text === '') return 'This is a required question.';
  if (q.type === 'email' && text !== '' && !EMAIL.test(text)) return 'Enter a valid email address.';
  return null;
}

/**
 * The answers as the webhook takes them, one key per question.
 *
 * Text is trimmed. A multi-select is sent the way Google Forms writes it into
 * the response sheet: the chosen options in form order, joined with ", ". The
 * interest scale is sent as the number. An unanswered optional question is "".
 */
export function serialiseAnswers(answers: Answers): Record<string, string | number | null> {
  return Object.fromEntries(
    FORM_A_QUESTIONS.map((q) => {
      const value = answers[q.key];
      if (q.type === 'checkbox') {
        const chosen = Array.isArray(value) ? value : [];
        return [q.key, (q.options ?? []).filter((o) => chosen.includes(o)).join(', ')];
      }
      const text = typeof value === 'string' ? value.trim() : '';
      if (q.type === 'scale') return [q.key, text === '' ? null : Number(text)];
      return [q.key, text];
    }),
  );
}
