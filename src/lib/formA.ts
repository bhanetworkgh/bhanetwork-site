/**
 * The vFarm Early Access interest form (NZPQ, 13 Nov 2026).
 *
 * Jason's revised front door (Decision Watch DW-1794538347794-NZPQ): a visitor
 * chooses a lane, Household or Industrial / Building Owner, and leaves a name,
 * an email and one short note on what they would hope vFarm would do for them.
 * Early Access interest only. Nothing here sets or implies a price, a
 * reservation, a subscription or available deployment.
 *
 * The answers still travel the existing path: JSON to the n8n intake webhook
 * named in the config (`vFarm Early Access — Website Intake`), which submits
 * them into Hardik's Google Form A by question text, then Hardik's tracker
 * carries the response to the dashboard. The keys below are that webhook's
 * contract:
 *
 *   full_name  → Form A "Full name"                                   (entry.50840312)
 *   email      → Form A "Email address"                               (entry.2104531410)
 *   lane       → Form A "Early Access lane"  NOT ON FORM A YET         (entry: null)
 *   goal       → Form A "What would you like vFarm to help you accomplish?" (entry.1682579475)
 *
 * The other nineteen Form A questions are no longer asked here. They stay on
 * Form A, made optional there, so old responses keep their meaning.
 *
 * RELEASE ORDER (see docs/form-a-entry-ids.md): this form must not go live
 * until (1) Form A has the "Early Access lane" question and the other
 * questions are optional, and (2) the intake workflow's "Check The Signup" no
 * longer requires organization_name and maps `lane`. Released before that,
 * every signup is answered 400 by the webhook, and the form shows its error
 * message rather than a false success.
 */

export type QuestionType = 'short' | 'email' | 'paragraph' | 'radio' | 'checkbox' | 'scale';

export interface Question {
  key: string;
  /** The Form A entry ID, for cross-checking. null where Form A has no such question yet. */
  entry: number | null;
  title: string;
  type: QuestionType;
  required: boolean;
  help?: string;
  options?: readonly string[];
  /** Linear scale only: the end labels, low then high. */
  scaleLabels?: readonly [string, string];
  /** The longest answer accepted, in characters, after trimming. */
  maxLength?: number;
}

export interface Step {
  title: string;
  description?: string;
  questions: readonly Question[];
}

/** The two lanes, exactly as they are sent and as Form A's options must read. */
export const LANES = ['Household', 'Industrial / Building Owner'] as const;
export type Lane = (typeof LANES)[number];

export const FORM_A_STEPS: readonly Step[] = [
  {
    title: 'Early Access interest',
    questions: [
      { key: 'full_name', entry: 50840312, title: 'Full name', type: 'short', required: true, maxLength: 200 },
      { key: 'email', entry: 2104531410, title: 'Email address', type: 'email', required: true, maxLength: 320 },
      {
        key: 'lane',
        entry: null,
        title: 'Which lane fits you?',
        type: 'radio',
        required: true,
        options: LANES,
        help: 'Household: for a home or household. Industrial / Building Owner: for a commercial site, building or operator.',
      },
      {
        key: 'goal',
        entry: 1682579475,
        title: 'What would you hope vFarm would do for you?',
        type: 'paragraph',
        required: true,
        maxLength: 1000,
        help: 'A few sentences is enough.',
      },
    ],
  },
];

/** Every question, in order. */
export const FORM_A_QUESTIONS: readonly Question[] = FORM_A_STEPS.flatMap((s) => s.questions);

/** What the form holds while someone fills it in. Checkboxes hold a list. */
export type Answers = Record<string, string | string[]>;

export function emptyAnswers(): Answers {
  return Object.fromEntries(
    FORM_A_QUESTIONS.map((q) => [q.key, q.type === 'checkbox' ? [] : '']),
  );
}

/** Deliberately loose, and the same as the webhook's and the dashboard's: this only catches typos. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The first problem with one answer, or null. */
export function problemWith(q: Question, value: string | string[]): string | null {
  const text = Array.isArray(value) ? value.join('') : value.trim();
  if (q.required && text === '') return 'This is a required question.';
  if (text === '') return null;
  if (q.type === 'email' && !EMAIL.test(text)) return 'Enter a valid email address.';
  if (q.type === 'radio' && q.options && !q.options.includes(text)) return 'Choose one of the options.';
  if (q.maxLength && text.length > q.maxLength) return `Keep this to ${q.maxLength} characters or fewer.`;
  return null;
}

/** Every problem in the form, keyed by question. Empty when it can be sent. */
export function problemsIn(answers: Answers, questions: readonly Question[] = FORM_A_QUESTIONS): Record<string, string> {
  const found: Record<string, string> = {};
  for (const q of questions) {
    const problem = problemWith(q, answers[q.key] ?? '');
    if (problem) found[q.key] = problem;
  }
  return found;
}

/**
 * The answers as the webhook takes them, one key per question and nothing
 * else. Text is trimmed; the email is lower-cased, as the webhook and the
 * dashboard store it.
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
      if (q.type === 'email') return [q.key, text.toLowerCase()];
      return [q.key, text];
    }),
  );
}

/** What travels beside the answers. */
export interface Envelope {
  /** Always the config's source_campaign. Never read from the URL. */
  source_campaign: string;
  /** The path the form was submitted from. */
  page: string;
  /** Every utm_* parameter the visitor arrived with (src/lib/attribution.ts). */
  utm: Record<string, string>;
  /** The honeypot, sent as-is. The webhook decides what a filled one means. */
  hp: string;
}

/** The whole request body: the four answers plus the envelope. Nothing else is sent. */
export function buildIntakePayload(answers: Answers, envelope: Envelope) {
  return {
    ...serialiseAnswers(answers),
    source_campaign: envelope.source_campaign,
    page: envelope.page,
    utm: { ...envelope.utm },
    hp: envelope.hp,
  };
}

/**
 * Whether the webhook took the signup. Fail-closed: HTTP 200 **and** a body of
 * `{"ok": true}`, both. A 200 with no body, `{"ok": false}`, `{"ok": "true"}`
 * or any other status is not a success.
 */
export function isAccepted(status: number, body: unknown): boolean {
  return status === 200 && typeof body === 'object' && body !== null && (body as { ok?: unknown }).ok === true;
}
