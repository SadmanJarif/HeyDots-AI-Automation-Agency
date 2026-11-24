export const FORMBOLD_ENDPOINT = 'https://formbold.com/s/3pVPY';

export interface FormBoldSubmissionPayload {
  name: string;
  email: string;
  company?: string;
  plan?: string;
  message: string;
  source?: string;
}

export async function submitToFormBold(
  payload: FormBoldSubmissionPayload
): Promise<{ ok: boolean; error?: string }> {
  const response = await fetch(FORMBOLD_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      company: payload.company || '',
      plan: payload.plan || 'General Inquiry',
      message: payload.message,
      source: payload.source || 'HeyDots Website',
      pageUrl: typeof window !== 'undefined' ? window.location.href : 'https://heydots.com',
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    return {
      ok: false,
      error: data?.message || data?.error || 'Unable to submit request. Please try again.',
    };
  }

  return { ok: true };
}
