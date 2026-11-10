export interface BrandLogo {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
}

export interface ChaosIcon {
  id: string;
  src: string;
  size: number;
  top: string;
  left: string;
  rotate: number;
}

export interface GuardrailNode {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  shape: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface ProcessStep {
  id: string;
  stepTag: string;
  title: string;
  description: string;
  toggleLabel: string;
  expandedType: 'pipeline' | 'checklist' | 'paragraph' | 'metrics';
  expandedItems?: string[];
  expandedParagraph?: string;
}

export interface PlatformItem {
  name: string;
  icon: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  description: string;
  metrics: string[];
  image: string;
  clientLogo: string;
  clientName: string;
  challenge: string;
  solution: string;
  outcome: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  subtitle: string;
  price: string;
  period: string;
  featuresLeft: string[];
  featuresRight: string[];
  ctaText: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  summaryText: string;
  metricHighlight: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  date: string;
  title: string;
  image: string;
  excerpt: string;
  readTime: string;
  body: string[];
}

export const BRAND_LOGOS: BrandLogo[] = [
  { id: 'brand-1', name: 'Haptick', src: '/assets/clavion/YhXDnmFoqguccWFqV0Qk63lz8Q.svg', width: 96, height: 24 },
  { id: 'brand-2', name: 'Natie', src: '/assets/clavion/uQSyjqWEH54ruHoZV3lknUnFXY0.svg', width: 92, height: 23 },
  { id: 'brand-3', name: 'Wallab', src: '/assets/clavion/yPKlUqib0ZCNYtwWUOgrR9ozNo.svg', width: 96, height: 21 },
  { id: 'brand-4', name: 'Monve', src: '/assets/clavion/nhzysJ4TGgMZVWMiF53iyLoJ6nE.svg', width: 73, height: 24 },
  { id: 'brand-5', name: 'Void', src: '/assets/clavion/6uJvC8IBXTNd82kGEHyFiILi8NA.svg', width: 61, height: 26 },
  { id: 'brand-6', name: 'Kobe', src: '/assets/clavion/fwzzYaCZASBtAblmo5MRFJ89Eew.svg', width: 55, height: 40 },
  { id: 'brand-7', name: 'Z-Line', src: '/assets/clavion/c1NPZhXQpRJIvw1ofReJ7m45h24.svg', width: 81, height: 18 },
];

export const DIY_CHAOS_ICONS: ChaosIcon[] = [
  { id: 'c1', src: '/assets/clavion/iyX9R7wSj5r4DdJBsC4krJoqvw.png', size: 62, top: '12%', left: '6%', rotate: -14 },
  { id: 'c2', src: '/assets/clavion/gULBYssTqPdDRimmsceW5PsY.png', size: 70, top: '18%', left: '29%', rotate: 12 },
  { id: 'c3', src: '/assets/clavion/1aHS7j3OGPH62INar3h8DaPydk.png', size: 78, top: '8%', left: '49%', rotate: -8 },
  { id: 'c4', src: '/assets/clavion/R9bblMTNfzg5MrZ9oDpLT0JkvI.png', size: 62, top: '26%', left: '69%', rotate: 18 },
  { id: 'c5', src: '/assets/clavion/bnD1S7yL3wmAZsYRVyyElWalsvw.png', size: 62, top: '42%', left: '84%', rotate: -12 },
  { id: 'c6', src: '/assets/clavion/6HxpnYstUqVKPDC2pxUEvoWQXg.png', size: 62, top: '48%', left: '12%', rotate: 9 },
  { id: 'c7', src: '/assets/clavion/AUfRYTo76BtSBuKZhLWYAdY.png', size: 62, top: '54%', left: '38%', rotate: -16 },
  { id: 'c8', src: '/assets/clavion/ln6zE9xGFMcLOm8SFBhoFadthh8.png', size: 62, top: '56%', left: '62%', rotate: 14 },
  { id: 'c9', src: '/assets/clavion/Cmw1sXw05Y5LPJ2SNvTtsMPZyU.png', size: 32, top: '76%', left: '24%', rotate: -6 },
  { id: 'c10', src: '/assets/clavion/CSf3MY2tIWoqduTsNwMNuzsHcQ.png', size: 28, top: '36%', left: '48%', rotate: 22 },
  { id: 'c11', src: '/assets/clavion/CSf3MY2tIWoqduTsNwMNuzsHcQ.png', size: 28, top: '74%', left: '78%', rotate: -18 },
];

export const GUARDRAIL_NODES: GuardrailNode[] = [
  {
    id: 'g1',
    title: 'Unified data access',
    subtitle: 'CRM • Docs • Email',
    icon: '/assets/clavion/fzgplDPboxkPhrsg9HYv5Fujo.svg',
    shape: '/assets/clavion/qXUIlfS8Ou2RV4amkIXEYG7utI.svg',
    position: 'top-left',
  },
  {
    id: 'g2',
    title: 'Safety & compliance',
    subtitle: 'Access controls',
    icon: '/assets/clavion/HDFTqEo8VfRmBtXJBQvWDZwhLE.svg',
    shape: '/assets/clavion/K6CqsDkVDmKFziV7watclSAzA28.svg',
    position: 'top-right',
  },
  {
    id: 'g3',
    title: 'Human oversight',
    subtitle: 'Review when needed',
    icon: '/assets/clavion/Lf9MzLMvSAQVcJMlu7dNlDVKn8.svg',
    shape: '/assets/clavion/dp5Scx7Sp3lZ45iFgy2R6COu7IQ.svg',
    position: 'bottom-left',
  },
  {
    id: 'g4',
    title: 'Reliable execution',
    subtitle: 'Tickets • Updates',
    icon: '/assets/clavion/75CeReWwa23836Qzhn7DZdLnb8.svg',
    shape: '/assets/clavion/WIGDeSFD4xZ3MbzeVoRVDUDGAp0.svg',
    position: 'bottom-right',
  },
];

export const WHY_CHOOSE_US_PILLARS = [
  {
    id: 'custom-strategies',
    title: 'Custom Strategies',
    description: 'Tailored solutions that align with your goals, not one-size-fits-all templates.',
    icon: '/assets/clavion/JlO2vgIzvlqHQ9G0EkMeTo06YTI.svg',
  },
  {
    id: 'seamless-integration',
    title: 'Seamless Integration',
    description: 'We connect AI with your tools, data, and workflows for instant adoption.',
    icon: '/assets/clavion/CCJExsz35wPGwDT6K7tYFfAlFI.svg',
  },
  {
    id: 'human-ai-approach',
    title: 'Human + AI Approach',
    description: 'Balanced solutions that combine automation with real oversight.',
    icon: '/assets/clavion/MPfZ6K6PMhBRw7AV4RzjASB5RL8.svg',
  },
  {
    id: 'end-to-end-delivery',
    title: 'End-to-End Delivery',
    description: 'From idea to deployment, we handle strategy, development, and optimization.',
    icon: '/assets/clavion/LONoUUBAD6meeh9tzvcmmwbdek.svg',
  },
];

export const MARQUEE_TAGLINES = [
  '[ Built for performance ]',
  '[ Designed for people ]',
  '[ Data-driven decisions ]',
  '[ Human + AI synergy ]',
  '[ Automation always ]',
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'step-01',
    stepTag: '[ Step - 01 ]',
    title: 'Discovery & Consultation',
    description: 'We begin by understanding your business goals, challenges, and where AI can drive measurable impact.',
    toggleLabel: 'Identify automation opportunities',
    expandedType: 'pipeline',
    expandedItems: ['Discovery', 'Planning', 'Development', 'Optimization', 'Deployment', 'Review'],
  },
  {
    id: 'step-02',
    stepTag: '[ Step - 02 ]',
    title: 'Strategy & Blueprint',
    description: 'We create a detailed roadmap outlining AI solutions, required data, and integration points.',
    toggleLabel: 'Build your strategy blueprint',
    expandedType: 'checklist',
    expandedItems: [
      'Outline project scope and success metrics',
      'Map AI workflow architecture',
      'Approve the final implementation plan',
    ],
  },
  {
    id: 'step-03',
    stepTag: '[ Step - 03 ]',
    title: 'Development & Implementation',
    description: 'Our engineers and AI specialists build and deploy your custom solution — built to scale and integrate',
    toggleLabel: 'Design, build, and test your AI solution',
    expandedType: 'paragraph',
    expandedParagraph:
      'Our engineers bring the plan to life — developing custom AI agents, automation pipelines, and chat systems. Each component is integrated with your internal tools, tested in real conditions, and optimized for stability before going live.',
  },
  {
    id: 'step-04',
    stepTag: '[ Step - 04 ]',
    title: 'Optimization & Support',
    description: 'After deployment, we monitor performance, refine workflows, and provide ongoing support.',
    toggleLabel: 'Continuous improvement and support',
    expandedType: 'metrics',
    expandedItems: ['↑ Task success rate', '↑ Response accuracy', '↑ Processing speed'],
  },
];

export const PLATFORM_ROWS: PlatformItem[][] = [
  [
    { name: 'LangChain', icon: '/assets/clavion/drphAbVLwgSGwC0DA3Pfnqjk8Kk.svg' },
    { name: 'TensorFlow', icon: '/assets/clavion/ZeApwbs8dFcI5fjQGORBGvg66I.svg' },
    { name: 'PyTorch', icon: '/assets/clavion/YMBf4M9KlHEeohtl6XSFOLKsAn4.svg' },
    { name: 'Zapier', icon: '/assets/clavion/vsiEPfF7hsoZe5KV0C82GSIg8.svg' },
    { name: 'Make (Integromat)', icon: '/assets/clavion/rRmYxyLE9J0p8hiCOAU0IGOUc8.svg' },
    { name: 'n8n', icon: '/assets/clavion/XDVW4spgnkBO9uYwx0RDw2fcQ1I.svg' },
    { name: 'Python', icon: '/assets/clavion/8mj3L0z2CKQHQSV5rXAHTIHaqA.svg' },
  ],
  [
    { name: 'Google Sheets', icon: '/assets/clavion/WFxloEjwwsyKsVrNqPyuqJX6EpM.svg' },
    { name: 'Airtable', icon: '/assets/clavion/ZhdRjdC2nMbJOJLPes6Rwet7sA.svg' },
    { name: 'Notion Database', icon: '/assets/clavion/EADssnHPJEyIsH9gK0MJVjovM.svg' },
    { name: 'PostgreSQL', icon: '/assets/clavion/oQRPvGX0OU77rUuNeokV7kJpg.svg' },
    { name: 'ChatGPT', icon: '/assets/clavion/LqSxI8mua7Ev5SPphsBhYNitxC0.svg' },
    { name: 'HubSpot', icon: '/assets/clavion/M9wz87Zx1nb3lHsBLXryBWusxPE.svg' },
    { name: 'Python', icon: '/assets/clavion/8mj3L0z2CKQHQSV5rXAHTIHaqA.svg' },
  ],
  [
    { name: 'Cloudflare', icon: '/assets/clavion/0tyOs18m7q4FaLOo4aZnxl2o.svg' },
    { name: 'Datadog', icon: '/assets/clavion/wJDFhGmqSRAbZP3E7l3WNlam4iI.svg' },
    { name: 'Vercel', icon: '/assets/clavion/eaL3lk3ByMy9a8cE8tJolI71qHE.svg' },
    { name: 'AWS', icon: '/assets/clavion/xCAIG7GKPRrDloz7Bpc0JKE5gcA.svg' },
    { name: 'Twilio', icon: '/assets/clavion/yBkM8AoQZRmi9oBcMS1hnFgDGt0.svg' },
    { name: 'Gmail', icon: '/assets/clavion/ioeCicGQadZkehMKgOp6kIxUbkk.svg' },
    { name: 'Intercom', icon: '/assets/clavion/pdCs70g3xsBNTtjnYs8YusvvIw.svg' },
  ],
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    slug: 'reducing-support-workload-with-ai-chatbots',
    title: 'Reducing support workload with AI chatbots',
    description: 'A fast-growth SaaS company replaced repetitive support tasks with a contextual AI support bot.',
    metrics: [
      '50% reduction in ticket volume',
      'Consistent, human-like responses',
      'Faster resolutions, automated retrieval',
    ],
    image: '/assets/clavion/hjIl8Wq7VQi0PQzwo2qq4mei1rY.jpg',
    clientLogo: '/assets/clavion/oBm0beC4ogzxkx27NZoYqQkKiw.svg',
    clientName: 'Umbrella',
    challenge:
      'Support agents were spending over 65% of their day answering repetitive tier-1 billing, onboarding, and configuration inquiries across Intercom and email.',
    solution:
      'We engineered a RAG-powered support agent connected directly to their knowledge base, CRM, and billing API with automatic confidence-based human handoff.',
    outcome:
      'Within 30 days of deployment, tier-1 ticket volume dropped by 50%, average first-response time fell from 42 minutes to under 8 seconds, and CSAT rose to 98.4%.',
  },
  {
    id: 'case-2',
    slug: 'automating-financial-reporting-workflows',
    title: 'Automating financial reporting workflows',
    description: 'A finance team used AI + automation to streamline reporting, cleanup, and data validation.',
    metrics: [
      '80% faster monthly reporting',
      'Reduced manual spreadsheet work',
      'Real-time error detection',
    ],
    image: '/assets/clavion/wjj6qVQSIey3k7jBF21z7Z7mZI.jpg',
    clientLogo: '/assets/clavion/1d5BceZwiJVrmp5kLOGTaUx1Rq4.svg',
    clientName: 'Luminous',
    challenge:
      'Monthly close required reconciling data across 14 disparate spreadsheets, ERP exports, and payment gateways, resulting in multi-day delays and manual formula errors.',
    solution:
      'We built an automated Python + n8n reconciliation pipeline with an AI anomaly-detection guardrail layer that flags discrepancies in real time.',
    outcome:
      'Monthly reporting cycles accelerated by 80%, saving 120+ analyst hours per quarter while achieving 99.9% audit accuracy.',
  },
  {
    id: 'case-3',
    slug: 'ai-powered-product-catalog-management',
    title: 'AI-powered product catalog management',
    description: 'An e-commerce brand implemented AI to classify products, write descriptions, and sync inventory.',
    metrics: [
      '5× faster product updates',
      'Unified data across platforms',
      'Better SEO-ready descriptions',
    ],
    image: '/assets/clavion/sn0jpuoURuZFWHJbjus4I84EOc.jpg',
    clientLogo: '/assets/clavion/ug0whOGc1LKcvVlLspYhYSm22Tk.svg',
    clientName: 'Sitemark',
    challenge:
      'Onboarding thousands of new SKUs each season created a massive bottleneck for merchandising teams writing SEO copy, tagging attributes, and syncing across Shopify and ERP.',
    solution:
      'We deployed a multi-modal catalog agent that extracts product attributes from supplier specs and imagery, generates brand-aligned SEO copy, and syncs inventory bi-directionally.',
    outcome:
      'SKU onboarding speed increased 5×, organic search impressions grew by 64%, and cross-platform inventory drift was eliminated.',
  },
];

export const SCALABLE_AI_INDUSTRIES = ['[ Healthcare ]', '[ Finance ]', '[ Logistics ]'];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'essential-automation',
    name: 'Essential Automation',
    subtitle: 'Everything you need to automate simple work.',
    price: '$499',
    period: '/One time',
    featuresLeft: ['1–2 basic automations', 'Basic chatbot or light', 'Email support'],
    featuresRight: ['Integration with 1 tool', 'Workflow testing', '1 revision'],
    ctaText: 'SCHEDULE A CONSULTATION',
  },
  {
    id: 'advanced-ai-build',
    name: 'Advanced AI Build',
    badge: 'Most popular',
    subtitle: 'Built for teams needing powerful, scalable AI automation.',
    price: '$1,500',
    period: '/One time',
    featuresLeft: ['Custom AI agent', 'Multi-tool integrations', 'Automated workflows'],
    featuresRight: ['Full testing + optimization', 'Documentation', 'Two revisions'],
    ctaText: 'BOOK A CONSULTATION',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Aarav Mehta',
    role: 'Operations Manager, Nexora Labs',
    avatar: '/assets/clavion/C1EN7t1PkviRju6c2OgDIdKVBo.jpg',
    quote: 'Their automation work saved our team hours. The AI agent they built handles tasks better than tools we used before.',
    summaryText: 'Automation strategy consulting focused on mapping bottlenecks and prioritizing high-impact tasks.',
    metricHighlight: 'Delivered a clear 3 month automation roadmap.',
  },
  {
    id: 't2',
    name: 'Sara Thompson',
    role: 'Customer Success Lead',
    avatar: '/assets/clavion/r4hCpcC2BSjUh7yG1NodeQGem9k.jpg',
    quote: 'The chatbot they built cut our support workload in half. It responds fast, stays accurate, and fits our brand perfectly.',
    summaryText: 'Custom AI support chatbot with brand-matched UI and automated knowledge routing.',
    metricHighlight: '50 percent reduction in support workload.',
  },
  {
    id: 't3',
    name: 'Daniel Ruiz',
    role: 'Founder, VisionEdge',
    avatar: '/assets/clavion/mTPhSAaQlUSkjdTXB0TZUqi3E.jpg',
    quote: 'The consulting sessions were incredibly useful. They helped us understand what to automate first and gave us absolute clarity.',
    summaryText: 'Internal workflow automation using a custom AI agent integrated with the team’s existing tools.',
    metricHighlight: 'AI agent tested at 95 percent accuracy.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do we get started with HeyDots?',
    answer:
      'Book a free strategy consultation where we map your current workflows, identify high-ROI automation opportunities, and design a customized implementation roadmap tailored to your stack.',
  },
  {
    id: 'faq-2',
    question: 'Do you offer ongoing support and maintenance?',
    answer:
      'Yes, we provide dedicated ongoing support for updates, maintenance, model updates, and proactive system monitoring to ensure your automations perform reliably as your team scales.',
  },
  {
    id: 'faq-3',
    question: 'What tools and platforms do you work with?',
    answer:
      'We work with leading automation and AI tools including Python, LangChain, Zapier, Make, n8n, TensorFlow, PyTorch, and many others — depending on your workflow and goals.',
  },
  {
    id: 'faq-4',
    question: 'How long does an AI project usually take?',
    answer:
      'More advanced builds like custom AI agents or multi-system integrations usually take 2–4 weeks, depending on scope.',
  },
  {
    id: 'faq-5',
    question: 'Do you provide ongoing support after the project?',
    answer:
      'We provide continuous optimization, fixes, updates, and monitoring through our monthly support plan or on-demand support as needed.',
  },
  {
    id: 'faq-6',
    question: 'Can you integrate AI with my existing tools and systems?',
    answer:
      'We specialize in connecting AI with your current CRM, databases, apps, and workflow tools so everything works smoothly without changing your entire setup.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'the-secret-behind-smarter-ai-agents',
    category: 'AI Agents',
    date: 'Nov 19, 2025',
    title: 'The secret behind smarter ai agents',
    image: '/assets/clavion/6dFSwrvEWM8kmka4N6OEWsmsBXs.jpg',
    excerpt: 'Why context engineering, deterministic tool guardrails, and structured memory separate production AI agents from brittle demos.',
    readTime: '5 min read',
    body: [
      'Most AI agent prototypes fail the moment they meet real production data. They hallucinate parameters, loop indefinitely on API timeouts, or lose track of multi-step business logic.',
      'At HeyDots, we architect agents around three foundational pillars: strict schema validation on every tool call, scoped retrieval memory that injects only verified CRM and document state, and human-in-the-loop escalation thresholds.',
      'When your agent operates inside well-defined guardrails, it transitions from an unpredictable experiment into a dependable digital teammate.',
    ],
  },
  {
    id: 'blog-2',
    slug: 'automating-customer-onboarding-with-ai',
    category: 'Productivity',
    date: 'Nov 04, 2025',
    title: 'Automating customer onboarding with ai',
    image: '/assets/clavion/JjtOaMM1lwc8VyMth6MpGCAk9ZE.jpg',
    excerpt: 'How modern B2B teams cut onboarding time by 70% using intelligent document parsing, automated workspace provisioning, and proactive check-ins.',
    readTime: '4 min read',
    body: [
      'Customer onboarding sets the tone for long-term retention, yet most teams still rely on manual email threads, spreadsheet checklists, and repetitive data entry across CRM and project tools.',
      'By combining event-driven workflows in n8n and Make with specialized LLM extraction nodes, teams can automatically parse intake documents, provision workspaces, and schedule personalized kickoff sequences within seconds of contract signature.',
      'The result is a seamless, zero-friction onboarding experience that lets your account managers focus on high-value strategy instead of administrative busywork.',
    ],
  },
  {
    id: 'blog-3',
    slug: 'the-future-of-ai-enhanced-customer-experience',
    category: 'Tools & Integrations',
    date: 'Oct 18, 2025',
    title: 'The future of ai-enhanced customer experience',
    image: '/assets/clavion/QAID9GfL6acm0c8mWGO750n93k.jpg',
    excerpt: 'Moving beyond static FAQ bots: how real-time CRM synchronization and sentiment-aware routing transform support into a growth engine.',
    readTime: '6 min read',
    body: [
      'Legacy chatbots frustrated customers with rigid decision trees and generic fallback answers. Today’s AI-enhanced customer experience looks fundamentally different.',
      'By unifying live order status, subscription history, and documentation into a single real-time retrieval pipeline, modern support agents resolve tier-1 inquiries autonomously while drafting context-rich summaries for complex tier-2 escalations.',
      'Teams that adopt this hybrid human + AI model consistently report faster resolution times, higher agent satisfaction, and measurable gains in net dollar retention.',
    ],
  },
];
