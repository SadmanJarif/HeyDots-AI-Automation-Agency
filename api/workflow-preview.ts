import { generateWorkflowBlueprintSummary } from '../src/utils/clavionLogic';

export default function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const promptText = String(req.body?.prompt || '');
  const blueprint = generateWorkflowBlueprintSummary(promptText);

  return res.status(200).json({
    ok: true,
    prompt: promptText,
    ...blueprint,
  });
}
