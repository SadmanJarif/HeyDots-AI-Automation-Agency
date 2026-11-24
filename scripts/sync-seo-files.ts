import fs from 'fs';
import { BLOG_POSTS } from '../src/data/blogPosts';

const slugs = new Set<string>();
const ids = new Set<string>();

for (const post of BLOG_POSTS) {
  if (slugs.has(post.slug)) {
    throw new Error(`Duplicate blog slug: ${post.slug}`);
  }
  if (ids.has(post.id)) {
    throw new Error(`Duplicate blog id: ${post.id}`);
  }
  slugs.add(post.slug);
  ids.add(post.id);
}

const today = '2026-11-25';

const staticUrls = [
  { loc: 'https://heydots.com/', changefreq: 'weekly', priority: '1.0' },
  { loc: 'https://heydots.com/about', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://heydots.com/blog', changefreq: 'daily', priority: '0.95' },
  { loc: 'https://heydots.com/contact', changefreq: 'monthly', priority: '0.85' },
  { loc: 'https://heydots.com/privacy', changefreq: 'yearly', priority: '0.3' },
  { loc: 'https://heydots.com/terms', changefreq: 'yearly', priority: '0.3' },
  { loc: 'https://heydots.com/cookie-policy', changefreq: 'yearly', priority: '0.3' },
  { loc: 'https://heydots.com/data-protection', changefreq: 'yearly', priority: '0.3' },
  { loc: 'https://heydots.com/disclaimer', changefreq: 'yearly', priority: '0.3' },
];

const blogUrls = BLOG_POSTS.map((post) => ({
  loc: `https://heydots.com/blog/${post.slug}`,
  lastmod: post.isoDate || today,
  changefreq: 'monthly',
  priority: post.category === 'US AI Agencies 2027' ? '0.9' : '0.8',
}));

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...staticUrls.map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  ),
  ...blogUrls.map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  ),
  '</urlset>',
  '',
].join('\n');

fs.writeFileSync('public/sitemap.xml', sitemap, 'utf8');

const byCategory = new Map<string, typeof BLOG_POSTS>();
for (const post of BLOG_POSTS) {
  const list = byCategory.get(post.category) || [];
  list.push(post);
  byCategory.set(post.category, list);
}

const blogIndexLines: string[] = [];
for (const [category, posts] of byCategory.entries()) {
  blogIndexLines.push(`### ${category} (${posts.length} Guides)`);
  for (const post of posts) {
    blogIndexLines.push(
      `- [${post.title}](https://heydots.com/blog/${post.slug}) — ${post.excerpt}`
    );
  }
  blogIndexLines.push('');
}

const llmsTxt = [
  '# HeyDots — Best AI Agency in 2027 | Custom AI Agents, Workflow Automation, SaaS Development & AEO/GEO',
  '',
  'HeyDots (https://heydots.com) is an engineering-led AI automation agency and SaaS development partner serving businesses across the United States (New York, San Francisco, Austin, Miami, Chicago, Seattle, Los Angeles, Boston, Atlanta, Dallas-Fort Worth, Denver, Washington D.C.) and globally.',
  '',
  '## Company Overview',
  '- **Name**: HeyDots',
  '- **Website**: https://heydots.com',
  '- **Blog & Insights Hub**: https://heydots.com/blog',
  '- **Email**: info@heydots.com',
  '- **Positioning**: Best AI agency in 2027 for production-ready custom AI agents, deterministic workflow automation, AI-native SaaS development, and AEO/GEO search growth.',
  '- **Track Record**: Trusted by 30+ global and US clients; typical 2-4 week production sprints; 40-60% manual workload reduction.',
  '',
  '## Core Services',
  '1. **Custom AI Agents & Multi-Agent Systems** — Scoped RAG, deterministic tool guardrails, voice agents, support agents, and human-in-the-loop oversight.',
  '2. **Workflow & Operations Automation** — n8n, Make, Zapier migrations, Python pipelines, CRM enrichment, onboarding, and financial reconciliation.',
  '3. **AI-Native SaaS Development** — 4-6 week MVPs, React/Next.js/TypeScript + PostgreSQL multi-tenant platforms, Stripe metered billing, and sidecar AI copilots.',
  '4. **AEO & GEO (AI Search Optimization)** — Ranking brands across Google Search, Google AI Overviews, ChatGPT, Perplexity, Claude, and Gemini.',
  '',
  '## Transparent Pricing',
  '- **Essential Automation**: $499 one-time (1-2 workflows, light chatbot, 1 core integration).',
  '- **Advanced AI Build**: $1,500 one-time (custom AI agent, multi-tool integrations, full testing & documentation).',
  '- **Custom Enterprise & SaaS Sprints**: Scoped transparently up front with 100% client code ownership.',
  '',
  `## Complete Knowledge Hub (${BLOG_POSTS.length} Published Playbooks)`,
  '',
  ...blogIndexLines,
  '---',
  `Last updated: ${today}`,
  'Sitemap: https://heydots.com/sitemap.xml',
  '',
].join('\n');

fs.writeFileSync('public/llms.txt', llmsTxt, 'utf8');
console.log(`Synced public/sitemap.xml and public/llms.txt for ${BLOG_POSTS.length} unique blog posts.`);
