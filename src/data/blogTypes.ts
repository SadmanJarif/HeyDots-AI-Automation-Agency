export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: {
    label: string;
    text: string;
  };
}

export interface BlogComparisonTable {
  title: string;
  subtitle: string;
  headers: string[];
  rows: string[][];
}

export interface BlogVisualBlock {
  badge: string;
  title: string;
  subtitle: string;
  metrics: { label: string; value: string }[];
  steps: string[];
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export type BlogCategory =
  | 'US AI Agencies 2027'
  | 'AI Agents'
  | 'Workflow Automation'
  | 'SaaS Development'
  | 'AI Search & GEO'
  | 'Industry Playbooks'
  | 'ROI & Strategy';

export const BLOG_CATEGORIES: ('All' | BlogCategory)[] = [
  'All',
  'US AI Agencies 2027',
  'AI Agents',
  'Workflow Automation',
  'SaaS Development',
  'AI Search & GEO',
  'Industry Playbooks',
  'ROI & Strategy',
];

export interface BlogPost {
  id: string;
  slug: string;
  category: BlogCategory;
  date: string;
  isoDate: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  location?: string;
  author: {
    name: string;
    role: string;
  };
  image: string;
  accent: 'violet' | 'cyan' | 'emerald' | 'indigo' | 'amber' | 'rose';
  heroStat: string;
  excerpt: string;
  readTime: string;
  keyTakeaways: string[];
  sections: BlogSection[];
  visualBlock: BlogVisualBlock;
  comparisonTable: BlogComparisonTable;
  faqs: BlogFaq[];
  /** Legacy flat paragraphs kept for compatibility */
  body: string[];
}
