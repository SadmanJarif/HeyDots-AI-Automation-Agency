export interface ContactFormInput {
  name: string;
  email: string;
  company?: string;
  plan?: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Cycles forward in a carousel list with wrap-around.
 */
export function getNextSlideIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex + 1) % total;
}

/**
 * Cycles backward in a carousel list with wrap-around.
 */
export function getPrevSlideIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex - 1 + total) % total;
}

/**
 * Toggles an item ID in a Set/array of open accordion IDs.
 */
export function toggleAccordionItem(openIds: string[], targetId: string, allowMultiple = true): string[] {
  const isOpen = openIds.includes(targetId);
  if (isOpen) {
    return openIds.filter((id) => id !== targetId);
  }
  return allowMultiple ? [...openIds, targetId] : [targetId];
}

/**
 * Validates an email address for newsletter and contact forms.
 */
export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter your email address.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  return { valid: true };
}

/**
 * Validates a full consultation / project inquiry form.
 */
export function validateContactForm(input: ContactFormInput): ValidationResult {
  if (!input.name || input.name.trim().length < 2) {
    return { valid: false, error: 'Please enter your full name.' };
  }
  const emailCheck = validateEmail(input.email);
  if (!emailCheck.valid) {
    return emailCheck;
  }
  if (!input.message || input.message.trim().length < 5) {
    return { valid: false, error: 'Please share a brief description of your project or goals.' };
  }
  return { valid: true };
}

/**
 * Computes a deterministic character from the Clavion custom character set
 * `@:x.=....c@=.aw.+b_cb.w+b_` for the ASCII wave background.
 */
const CLAVION_ASCII_CHARS = '@:x.=....c@=.aw.+b_cb.w+b_';

export function computeAsciiWaveCell(col: number, row: number, cols: number, rows: number, tick: number): {
  char: string;
  intensity: number;
} {
  const nx = cols > 0 ? col / cols - 0.5 : 0;
  const ny = rows > 0 ? row / rows - 0.5 : 0;
  const distA = Math.sqrt((nx - 0.2 * Math.sin(tick * 0.15)) ** 2 + (ny - 0.15 * Math.cos(tick * 0.12)) ** 2);
  const distB = Math.sqrt((nx + 0.25 * Math.cos(tick * 0.1)) ** 2 + (ny + 0.2 * Math.sin(tick * 0.14)) ** 2);
  const wave = Math.sin(distA * 18 - tick * 0.45) * 0.55 + Math.cos(distB * 12 + tick * 0.3) * 0.45;
  const normalized = (wave + 1) / 2; // 0..1
  const idx = Math.min(
    CLAVION_ASCII_CHARS.length - 1,
    Math.max(0, Math.floor(normalized * CLAVION_ASCII_CHARS.length))
  );
  return {
    char: CLAVION_ASCII_CHARS[idx],
    intensity: normalized,
  };
}

/**
 * Generates an instant architectural recommendation preview when a user submits
 * a workflow prompt in the "Why Choose Us" interactive prompt box.
 */
export function generateWorkflowBlueprintSummary(prompt: string): {
  pipeline: string[];
  estimatedSavings: string;
  summary: string;
} {
  const clean = prompt.trim().toLowerCase();
  if (clean.includes('support') || clean.includes('inquir') || clean.includes('ticket') || clean.includes('chat')) {
    return {
      pipeline: ['Intercom / Email Intake', 'RAG Context Engine', 'Guardrail Validator', 'HubSpot / Desk Sync'],
      estimatedSavings: '50% reduction in tier-1 support tickets',
      summary: 'Contextual AI support agent with instant knowledge retrieval, confidence scoring, and automatic human handoff.',
    };
  }
  if (clean.includes('finance') || clean.includes('report') || clean.includes('sheet') || clean.includes('invoice')) {
    return {
      pipeline: ['ERP / Sheets Ingestion', 'Python Validation Node', 'Anomaly Detection Agent', 'Automated Slack + PDF Report'],
      estimatedSavings: '80% faster monthly reconciliation',
      summary: 'Automated data pipeline that validates cross-platform records, flags anomalies, and compiles executive reports.',
    };
  }
  return {
    pipeline: ['Webhook / CRM Trigger', 'Custom AI Decision Agent', 'Human-in-the-Loop Approval', 'Multi-Tool Execution'],
    estimatedSavings: '15+ hours saved per week per team',
    summary: 'End-to-end multi-agent workflow integrating your existing stack with real-time observability and access controls.',
  };
}
