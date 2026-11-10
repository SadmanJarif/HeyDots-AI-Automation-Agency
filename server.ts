import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  generateWorkflowBlueprintSummary,
  validateContactForm,
} from './src/utils/clavionLogic.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface StoredLead {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: string;
  message: string;
  receivedAt: string;
}

const storedLeads: StoredLead[] = [];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Lead capture API endpoint (DEF-1)
  app.post('/api/contact', (req, res) => {
    const { name = '', email = '', company = '', plan = 'General Inquiry', message = '' } = req.body || {};
    const validation = validateContactForm({ name, email, company, plan, message });

    if (!validation.valid) {
      res.status(400).json({
        ok: false,
        error: validation.error || 'Invalid form submission.',
      });
      return;
    }

    const newLead: StoredLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name: String(name).trim(),
      email: String(email).trim(),
      company: String(company || '').trim(),
      plan: String(plan || 'General Inquiry').trim(),
      message: String(message).trim(),
      receivedAt: new Date().toISOString(),
    };

    storedLeads.push(newLead);

    res.status(201).json({
      ok: true,
      id: newLead.id,
      receivedAt: newLead.receivedAt,
      lead: newLead,
    });
  });

  app.get('/api/contact', (_req, res) => {
    res.status(200).json({
      ok: true,
      count: storedLeads.length,
      leads: storedLeads,
    });
  });

  // Interactive AI workflow prompt endpoint (DEF-7)
  app.post('/api/workflow-preview', (req, res) => {
    const promptText = String(req.body?.prompt || '');
    const blueprint = generateWorkflowBlueprintSummary(promptText);
    res.status(200).json({
      ok: true,
      prompt: promptText,
      ...blueprint,
    });
  });

  // Serve public static assets (robots.txt, sitemap.xml, favicon.ico, assets/*)
  const publicDir = path.resolve(__dirname, 'public');
  app.use(express.static(publicDir));

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      try {
        const reqPath = req.originalUrl.split('?')[0];
        const isKnownRoute = reqPath === '/' || reqPath === '/index.html';

        const templatePath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(templatePath, 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);

        res
          .status(isKnownRoute ? 200 : 404)
          .set({ 'Content-Type': 'text/html' })
          .end(template);
      } catch (err) {
        next(err);
      }
    });
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir, { index: false }));

    app.use('*', (req, res) => {
      const reqPath = req.originalUrl.split('?')[0];
      const isKnownRoute = reqPath === '/' || reqPath === '/index.html';
      const indexHtmlPath = path.resolve(distDir, 'index.html');

      if (fs.existsSync(indexHtmlPath)) {
        res.status(isKnownRoute ? 200 : 404).sendFile(indexHtmlPath);
      } else {
        res.status(404).send('Not Found');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HeyDots server running on http://localhost:${PORT}`);
  });
}

startServer();
