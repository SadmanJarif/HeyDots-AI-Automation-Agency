import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getNextSlideIndex,
  getPrevSlideIndex,
  toggleAccordionItem,
  validateEmail,
  validateContactForm,
  computeAsciiWaveCell,
  generateWorkflowBlueprintSummary,
} from './clavionLogic';

test('carousel navigation wraps around forward and backward', () => {
  assert.equal(getNextSlideIndex(0, 3), 1);
  assert.equal(getNextSlideIndex(2, 3), 0);
  assert.equal(getPrevSlideIndex(0, 3), 2);
  assert.equal(getPrevSlideIndex(2, 3), 1);
});

test('toggleAccordionItem adds and removes IDs cleanly', () => {
  const step1 = toggleAccordionItem([], 'faq-1');
  assert.deepEqual(step1, ['faq-1']);
  const step2 = toggleAccordionItem(step1, 'faq-2');
  assert.deepEqual(step2, ['faq-1', 'faq-2']);
  const step3 = toggleAccordionItem(step2, 'faq-1');
  assert.deepEqual(step3, ['faq-2']);
});

test('validateEmail rejects empty or malformed emails and accepts valid ones', () => {
  assert.equal(validateEmail('').valid, false);
  assert.equal(validateEmail('not-an-email').valid, false);
  assert.equal(validateEmail('founder@company.com').valid, true);
});

test('validateContactForm checks name, email, and message', () => {
  assert.equal(
    validateContactForm({ name: 'A', email: 'test@example.com', message: 'Hello world' }).valid,
    false
  );
  assert.equal(
    validateContactForm({ name: 'Ethan Parker', email: 'bad', message: 'Need AI automation' }).valid,
    false
  );
  assert.equal(
    validateContactForm({ name: 'Ethan Parker', email: 'ethan@clavion.ai', message: 'Automate support tickets' }).valid,
    true
  );
});

test('computeAsciiWaveCell returns valid character and bounded intensity', () => {
  const cell = computeAsciiWaveCell(5, 3, 20, 10, 4);
  assert.equal(typeof cell.char, 'string');
  assert.equal(cell.char.length, 1);
  assert.ok(cell.intensity >= 0 && cell.intensity <= 1);
});

test('generateWorkflowBlueprintSummary tailors pipeline to prompt keywords', () => {
  const supportRes = generateWorkflowBlueprintSummary('How can we use AI to handle inquiries, tasks, and follow-ups automatically?');
  assert.ok(supportRes.pipeline.length === 4);
  assert.ok(supportRes.estimatedSavings.includes('50%'));
});

