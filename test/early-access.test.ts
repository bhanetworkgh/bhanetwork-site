/**
 * NZPQ Early Access form: the four-field contract, checked with Node's own
 * test runner (`npm test`). No network, no DOM, no dependency: these exercise
 * the pure functions the form component calls, and read the shipped copy.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  FORM_A_QUESTIONS,
  FORM_A_STEPS,
  LANES,
  buildIntakePayload,
  emptyAnswers,
  isAccepted,
  problemWith,
  problemsIn,
  serialiseAnswers,
  type Answers,
} from '../src/lib/formA.ts';
import { readUtm } from '../src/lib/attribution.ts';

const filled = (over: Partial<Record<string, string>> = {}): Answers => ({
  ...emptyAnswers(),
  full_name: '  Ama Mensah ',
  email: ' Ama.Mensah@Example.org ',
  lane: 'Household',
  goal: ' Year-round greens for the family. ',
  ...over,
});

const envelope = {
  source_campaign: 'vfarm_flagship_1031',
  page: '/vfarm',
  utm: { utm_source: 'linkedin', utm_campaign: 'nzpq' },
  hp: '',
};

test('the form is one step of exactly four questions, in order', () => {
  assert.equal(FORM_A_STEPS.length, 1);
  assert.deepEqual(
    FORM_A_QUESTIONS.map((q) => q.key),
    ['full_name', 'email', 'lane', 'goal'],
  );
  assert.ok(FORM_A_QUESTIONS.every((q) => q.required), 'all four are required');
});

test('the lane has exactly the two NZPQ values', () => {
  assert.deepEqual([...LANES], ['Household', 'Industrial / Building Owner']);
  const lane = FORM_A_QUESTIONS.find((q) => q.key === 'lane')!;
  assert.deepEqual([...(lane.options ?? [])], [...LANES]);
});

test("the lane question reads exactly Jason's approved label", () => {
  const lane = FORM_A_QUESTIONS.find((q) => q.key === 'lane')!;
  assert.equal(lane.title, 'Which fits you best?');
});

test('payload: four answers plus the envelope, nothing else', () => {
  const body = buildIntakePayload(filled(), envelope);
  assert.deepEqual(Object.keys(body).sort(), ['email', 'full_name', 'goal', 'hp', 'lane', 'page', 'source_campaign', 'utm']);
  assert.equal(body.full_name, 'Ama Mensah');
  assert.equal(body.email, 'ama.mensah@example.org');
  assert.equal(body.lane, 'Household');
  assert.equal(body.goal, 'Year-round greens for the family.');
  assert.equal(body.source_campaign, 'vfarm_flagship_1031');
  assert.equal(body.page, '/vfarm');
  /* None of the retired Form A keys travel any more. */
  for (const gone of ['organization_name', 'describes_you', 'city', 'budget_readiness', 'reservation_openness']) {
    assert.ok(!(gone in body), `${gone} is not sent`);
  }
});

test('both lane values are accepted and sent unchanged', () => {
  for (const lane of LANES) {
    assert.deepEqual(problemsIn(filled({ lane })), {});
    assert.equal(buildIntakePayload(filled({ lane }), envelope).lane, lane);
  }
});

test('required fields: each missing one is named, nothing else', () => {
  assert.deepEqual(Object.keys(problemsIn(emptyAnswers())).sort(), ['email', 'full_name', 'goal', 'lane']);
  for (const key of ['full_name', 'email', 'lane', 'goal']) {
    const found = problemsIn(filled({ [key]: '   ' }));
    assert.deepEqual(Object.keys(found), [key]);
    assert.equal(found[key], 'This is a required question.');
  }
});

test('validation: a bad email, an unknown lane and an over-long note are refused', () => {
  const q = (k: string) => FORM_A_QUESTIONS.find((x) => x.key === k)!;
  assert.equal(problemWith(q('email'), 'not-an-email'), 'Enter a valid email address.');
  assert.equal(problemWith(q('lane'), 'Commercial'), 'Choose one of the options.');
  assert.equal(problemWith(q('lane'), 'household'), 'Choose one of the options.', 'case matters: Form A matches the option text');
  assert.equal(problemWith(q('goal'), 'x'.repeat(1000)), null);
  assert.match(problemWith(q('goal'), 'x'.repeat(1001)) ?? '', /1000 characters/);
  assert.match(problemWith(q('full_name'), 'x'.repeat(201)) ?? '', /200 characters/);
});

test('UTM: every utm_* kept as-is, first value wins, nothing else read', () => {
  const utm = readUtm('?utm_source=linkedin&utm_source=x&utm_medium=social&utm_content=Post%201&ref=abc&source_campaign=hijack');
  assert.deepEqual(utm, { utm_source: 'linkedin', utm_medium: 'social', utm_content: 'Post 1' });
  assert.deepEqual(readUtm(''), {});
  const body = buildIntakePayload(filled(), { ...envelope, utm });
  assert.deepEqual(body.utm, utm);
  assert.equal(body.source_campaign, 'vfarm_flagship_1031', 'a URL parameter never changes the campaign');
});

test('honeypot: sent as-is, so the webhook can drop a filled one', () => {
  assert.equal(buildIntakePayload(filled(), envelope).hp, '');
  assert.equal(buildIntakePayload(filled(), { ...envelope, hp: 'http://spam' }).hp, 'http://spam');
});

test('success is fail-closed: only HTTP 200 with {"ok": true}', () => {
  assert.equal(isAccepted(200, { ok: true }), true);
  assert.equal(isAccepted(200, { ok: 'true' }), false);
  assert.equal(isAccepted(200, { ok: false }), false);
  assert.equal(isAccepted(200, {}), false);
  assert.equal(isAccepted(200, null), false);
  assert.equal(isAccepted(201, { ok: true }), false);
  assert.equal(isAccepted(400, { ok: false, error: 'missing_answers', fields: ['organization_name'] }), false);
  assert.equal(isAccepted(502, { ok: false, error: 'could_not_save' }), false);
});

test('serialiseAnswers ignores keys the form does not ask', () => {
  const out = serialiseAnswers({ ...filled(), organization_name: 'Mensah Farm', city: 'Kumasi' });
  assert.deepEqual(Object.keys(out), ['full_name', 'email', 'lane', 'goal']);
});

/* ---------------------------------------------------------------- the copy */

const config = JSON.parse(readFileSync(new URL('../public/landing-config.json', import.meta.url), 'utf8'));
const ea = config.early_access;
const vfarmLabels = readFileSync(new URL('../src/content/vfarm.ts', import.meta.url), 'utf8');
const faq = readFileSync(new URL('../src/content/faq.ts', import.meta.url), 'utf8');

test('copy: the approved interest-only lines are present (DOC-VFARM-COMMERCIAL-001 / NZPQ)', () => {
  assert.match(ea.body, /Early Access interest only\./);
  assert.match(ea.body, /Preliminary planning only/);
  assert.match(ea.qualifier, /No paid offer is currently approved for public use\./);
  assert.match(ea.success_message, /No paid offer is currently approved for public use|no paid offer is currently approved for public use/);
  assert.match(ea.success_message, /first we contact/);
});

test('copy: the specific retired claims are gone from the /vfarm copy', () => {
  /* Targeted phrases, not a keyword ban: "subscription" may still appear in an approved negative. */
  const shipped = [JSON.stringify(config), vfarmLabels, faq].join('\n');
  for (const retired of [
    /founding buyer/i,
    /priority consideration for future cabinet availability/i,
    /You're on the list/,
    /preferential pricing/i,
  ]) {
    assert.doesNotMatch(shipped, retired);
  }
});

test('copy: no price, paid link or live claim in the early-access copy', () => {
  const text = Object.values(ea).filter((v) => typeof v === 'string').join(' ');
  assert.doesNotMatch(text, /[$€£₹]\s?\d/, 'no currency amount');
  assert.doesNotMatch(text, /\b\d+\s?(?:\/|per)\s?(?:mo|month|rack)\b/i, 'no per-month or per-rack figure');
  assert.doesNotMatch(text, /\bnow available\b|\bavailable now\b|\breserve (?:your|a)\b|\bsubscribe\b/i);
  assert.equal(config.paid_subscription_url, null);
  assert.equal(config.claim_state, 'interest_only_live');
});

test('config: the contract version names NZPQ and the endpoint is unchanged', () => {
  assert.equal(config.page_contract_version, 'VFARM_LANDING_CONFIG_FUNNEL_v0.2_NZPQ');
  assert.equal(config.early_access_endpoint, 'https://bayshorizonnetwork.app.n8n.cloud/webhook/vfarm-website-intake');
  assert.equal(config.source_campaign, 'vfarm_flagship_1031');
});
