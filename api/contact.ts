import { validateContactForm } from '../src/utils/clavionLogic';

export default function handler(req: any, res: any) {
  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      count: 0,
      leads: [],
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const {
    name = '',
    email = '',
    company = '',
    plan = 'General Inquiry',
    message = '',
  } = req.body || {};

  const validation = validateContactForm({ name, email, company, plan, message });

  if (!validation.valid) {
    return res.status(400).json({
      ok: false,
      error: validation.error || 'Invalid form submission.',
    });
  }

  const newLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: String(name).trim(),
    email: String(email).trim(),
    company: String(company || '').trim(),
    plan: String(plan || 'General Inquiry').trim(),
    message: String(message).trim(),
    receivedAt: new Date().toISOString(),
  };

  return res.status(201).json({
    ok: true,
    id: newLead.id,
    receivedAt: newLead.receivedAt,
    lead: newLead,
  });
}
