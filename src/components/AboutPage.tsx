import React from 'react';
import { motion } from 'motion/react';
import { RainbowButton, SectionKicker } from './RainbowButton';
import founderPhoto from '../../founder.png';
import hasinPhoto from '../../hasin-cofounder.jpg';

interface AboutPageProps {
  onNavigate: (to: string) => void;
  onOpenContact: (defaultPlan?: string) => void;
  onBookCall: () => void;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const IMPACT_STATS = [
  { value: '120+', label: 'Production AI Systems' },
  { value: '99%', label: 'Client Satisfaction' },
  { value: '< 2s', label: 'Agent Response Latency' },
  { value: '24/7', label: 'Autonomous Operations' },
];

const HOW_WE_BUILD_PILLARS = [
  {
    title: 'Precision Architecture',
    description:
      'Every agent and workflow is engineered around deterministic logic, clean API boundaries, and fault-tolerant retries.',
    accent: 'from-[#8b5cf6] to-[#6366f1]',
  },
  {
    title: 'Guardrails & Oversight',
    description:
      'Human-in-the-loop checkpoints, strict permission scopes, and full audit logs keep critical operations safe.',
    accent: 'from-[#38bdf8] to-[#3b82f6]',
  },
  {
    title: 'Measurable Business ROI',
    description:
      'We tie automation directly to revenue velocity, support deflection, and hours saved—never vanity demos.',
    accent: 'from-[#34d399] to-[#10b981]',
  },
];

const APPROACH_STEPS = [
  {
    title: 'Step 1: Discovery & Strategy',
    description: 'We learn your business inside-out before writing a single line of code.',
    bullets: ['Stakeholder interviews', 'Workflow audit', 'Goal alignment', 'Success metrics'],
    button: 'Start Discovery',
    action: 'contact',
    plan: 'Discovery & Strategy',
  },
  {
    title: 'Step 2: Design & Architecture',
    description: 'Tailored AI workflows mapped to your real operational needs.',
    bullets: ['Custom AI agent design', 'System architecture', 'Integration mapping', 'Security review'],
    button: 'See Approach',
    action: 'services',
  },
  {
    title: 'Step 3: Build & Launch',
    description: 'Rapid iteration with you in the loop every step of the way.',
    bullets: ['Weekly demos', 'Iterative shipping', 'Live training', 'Smooth handoff'],
    button: 'View Process',
    action: 'process',
  },
  {
    title: 'Step 4: Optimize & Scale',
    description: 'We stay with you long after launch — your AI gets smarter over time.',
    bullets: ['Continuous tuning', 'Performance reports', 'New feature rollouts', '24/7 monitoring'],
    button: 'Scale With Us',
    action: 'contact',
    plan: 'Optimize & Scale',
  },
] as const;

const CORE_PRACTICES = [
  {
    kicker: '01 · AUTONOMOUS AGENTS',
    title: 'Custom AI Agents',
    body: 'Context-aware sales, support, and internal operations agents connected directly to your CRM, knowledge base, and internal tools.',
  },
  {
    kicker: '02 · ORCHESTRATION',
    title: 'Workflow Automation',
    body: 'End-to-end data pipelines that eliminate manual handoffs across Slack, HubSpot, Notion, Postgres, and bespoke APIs.',
  },
  {
    kicker: '03 · STRATEGY & DELIVERY',
    title: 'AI Consulting & Enablement',
    body: 'From rapid opportunity audits to production deployment and team training, we ship reliable systems end-to-end.',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenContact,
  onBookCall,
}) => {
  return (
    <div className="relative z-10 pt-9 pb-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5">
        {/* Top HeyDots Brand Link */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <motion.a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: SMOOTH_EASE }}
            className="inline-flex items-center justify-center min-h-[44px] px-3 mb-10 focus:outline-none group"
            aria-label="HeyDots Home"
          >
            <span className="font-pacifico text-[32px] sm:text-[36px] text-[#f3f5fa] tracking-[0.01em] drop-shadow-[0_2px_16px_rgba(255,255,255,0.2)] group-hover:scale-[1.03] transition-transform">
              HeyDots
            </span>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: SMOOTH_EASE, delay: 0.04 }}
            className="mb-4"
          >
            <SectionKicker text="ABOUT HEYDOTS" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: 0.08 }}
            className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.12] max-w-[740px] mb-5"
            style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.65rem)', textWrap: 'balance' }}
          >
            Engineering Intelligent Systems That Scale With You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: 0.13 }}
            className="text-[#aeb5c0] text-[15px] sm:text-[16px] leading-[1.65] max-w-[580px] mb-8"
          >
            <span className="font-pacifico text-[#f3f5fa]">HeyDots</span> is a global remote-first AI automation agency. We replace fragmented manual work with reliable, guardrail-backed AI ecosystems built for real-world operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: 0.18 }}
            className="flex flex-wrap items-center justify-center gap-3.5"
          >
            <RainbowButton
              label="WORK WITH US"
              variant="rainbow"
              onClick={() => onNavigate('/contact')}
            />
            <RainbowButton
              label="BOOK AN INTRO CALL"
              variant="dark"
              iconSrc="/assets/clavion/GukJuD6D51RayodFgi8oQiSRe0.svg"
              onClick={onBookCall}
            />
          </motion.div>
        </div>

        {/* Impact Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12 sm:mb-16">
          {IMPACT_STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: SMOOTH_EASE, delay: idx * 0.05 }}
              className="premium-interactive-card rounded-[18px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-5 sm:p-6 text-center flex flex-col items-center justify-center"
            >
              <span className="text-[30px] sm:text-[38px] font-semibold tracking-tight text-clavion-gradient leading-none mb-2 tabular-nums">
                {stat.value}
              </span>
              <span className="text-[12.5px] sm:text-[13px] text-[#aeb5c0]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Who We Are */}
        <section className="mb-12 sm:mb-16" aria-labelledby="who-we-are-heading">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: SMOOTH_EASE }}
            className="text-center mb-8"
          >
            <SectionKicker text="WHO WE ARE" className="mb-4" />
            <h2
              id="who-we-are-heading"
              className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.15] mb-4"
              style={{ fontSize: 'clamp(1.7rem, 3.4vw, 2.5rem)', textWrap: 'balance' }}
            >
              Building the AI workforce behind HeyDots
            </h2>
            <p className="text-[#aeb5c0] text-[15px] sm:text-[16px] leading-[1.65] max-w-[620px] mx-auto">
              We&apos;re on a mission to revolutionize sales automation with cutting-edge AI — so your pipeline never sleeps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-12">
            <motion.figure
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: SMOOTH_EASE }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] border border-[#858b94]/20 bg-clavion-card lg:aspect-auto lg:h-full lg:min-h-[520px]"
            >
              <img
                src={founderPhoto}
                alt="Sadman Jarif, Founder and CEO of HeyDots"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07090f] via-[#07090f]/75 to-transparent px-5 pb-5 pt-16">
                <p className="text-[20px] font-medium tracking-[-0.02em] text-[#f3f5fa]">Sadman Jarif</p>
                <p className="mt-0.5 text-[13px] text-[#c4b5fd]">Founder &amp; CEO</p>
              </figcaption>
            </motion.figure>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: 0.06 }}
              className="flex flex-col justify-center"
            >
              <p className="mb-4 inline-flex w-fit rounded-full border border-white/10 bg-[#161920] px-3.5 py-1.5 text-[12.5px] text-[#d5dce6]">
                Our Origin Story
              </p>
              <h3 className="mb-5 text-[28px] font-medium leading-[1.12] tracking-[-0.03em] text-[#f3f5fa] sm:text-[36px]">
                From a Bold Idea to a{' '}
                <span className="bg-gradient-to-r from-[#c4b5fd] via-[#a78bfa] to-[#38bdf8] bg-clip-text text-transparent">
                  Global Platform
                </span>
              </h3>
              <div className="flex flex-col gap-4 text-[14.5px] leading-[1.7] text-[#aeb5c0] sm:text-[15.5px]">
                <p>
                  In 2024, Sadman Jarif saw a fundamental problem in sales — teams were losing deals not because of bad products, but because they couldn&apos;t respond fast enough. Leads went cold overnight, follow-ups fell through the cracks, and pipeline momentum was lost to time zones and human limitations.
                </p>
                <p>
                  He founded HeyDots with a single conviction:{' '}
                  <strong className="font-semibold text-[#edf0f5]">sales shouldn&apos;t depend on humans being awake.</strong>{' '}
                  What started as an AI experiment in his apartment quickly proved transformative — early clients saw their pipeline triple within weeks.
                </p>
                <p>
                  Today, HeyDots serves hundreds of companies across 20+ countries, automating everything from lead qualification to meeting booking to intelligent follow-ups. The mission remains the same: let AI handle the grind so your team can focus on what humans do best — building relationships and closing deals.
                </p>
              </div>
              <blockquote className="mt-6 rounded-[18px] border border-[#8b5cf6]/30 bg-[#0c0f17]/85 px-5 py-5">
                <p className="text-[15px] font-medium italic leading-[1.6] tracking-[-0.01em] text-[#edf0f5] sm:text-[16px]">
                  “I built HeyDots because I was tired of watching great companies lose deals to slow response times. AI doesn&apos;t sleep, doesn&apos;t forget, and never misses a follow-up.”
                </p>
                <footer className="mt-3 text-[13px] text-[#a78bfa]">— Sadman Jarif, Founder</footer>
              </blockquote>
            </motion.div>
          </div>
        </section>

        <section className="mb-12 sm:mb-16" aria-labelledby="cofounder-heading">
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.14fr_0.86fr] lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: SMOOTH_EASE }}
              className="order-1 flex flex-col justify-center lg:order-none"
            >
              <p className="mb-4 inline-flex w-fit rounded-full border border-white/10 bg-[#161920] px-3.5 py-1.5 text-[12.5px] text-[#d5dce6]">
                Operations &amp; Growth
              </p>
              <h3
                id="cofounder-heading"
                className="mb-5 text-[28px] font-medium leading-[1.12] tracking-[-0.03em] text-[#f3f5fa] sm:text-[36px]"
              >
                Building at the Intersection of{' '}
                <span className="bg-gradient-to-r from-[#c4b5fd] via-[#a78bfa] to-[#38bdf8] bg-clip-text text-transparent">
                  Tech &amp; Business
                </span>
              </h3>
              <div className="flex flex-col gap-4 text-[14.5px] leading-[1.7] text-[#aeb5c0] sm:text-[15.5px]">
                <p>
                  Hasin Chowdhury is an entrepreneur and business leader focused on building companies at the intersection of technology, AI, and business. He is the{' '}
                  <strong className="font-semibold text-[#edf0f5]">co-founder and COO of HeyDots AI</strong>, where he leads operations and helps turn ambitious ideas into scalable businesses. He is also the founder of Harrow Media and has built and operated multiple businesses, gaining hands-on experience across entrepreneurship, growth, and business development.
                </p>
                <p>
                  HeyDots AI was built with a simple vision: businesses should be able to move faster without being held back by repetitive work and operational limitations. By combining SaaS with AI, HeyDots helps companies automate workflows, improve efficiency, and unlock new opportunities for growth.
                </p>
                <p>
                  Today, HeyDots is focused on solving one of the biggest challenges businesses face — spending too much time and resources on tasks that can be automated. From streamlining operations to improving customer interactions and enabling smarter workflows, HeyDots uses AI to handle the work behind the scenes, allowing teams to focus on what they do best: building, creating, and growing.
                </p>
              </div>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: 0.06 }}
              className="relative order-2 aspect-[4/5] w-full overflow-hidden rounded-[22px] border border-[#858b94]/20 bg-clavion-card lg:order-none lg:aspect-auto lg:h-full lg:min-h-[520px]"
            >
              <img
                src={hasinPhoto}
                alt="Hasin Chowdhury, Co-Founder and COO of HeyDots"
                className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07090f] via-[#07090f]/75 to-transparent px-5 pb-5 pt-16">
                <p className="text-[20px] font-medium tracking-[-0.02em] text-[#f3f5fa]">Hasin Chowdhury</p>
                <p className="mt-0.5 text-[13px] text-[#c4b5fd]">Co-Founder &amp; COO</p>
              </figcaption>
            </motion.figure>
          </div>
        </section>

        <section className="mb-12 sm:mb-16" aria-labelledby="approach-heading">
          <div className="mb-8 text-center">
            <p className="mb-4 inline-flex rounded-full border border-white/10 bg-[#161920] px-3.5 py-1.5 text-[12.5px] text-[#d5dce6]">
              How We Work
            </p>
            <h2
              id="approach-heading"
              className="mb-3 font-medium tracking-[-0.03em] leading-[1.12]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              <span className="text-[#f7f8fb]">Our </span>
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#a78bfa] bg-clip-text text-transparent">
                Approach
              </span>
            </h2>
            <p className="mx-auto max-w-[640px] text-[14.5px] leading-[1.6] text-[#aeb5c0] sm:text-[15.5px]">
              A proven 4-step process that turns ambitious ideas into revenue-generating AI systems.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH_STEPS.map((step, idx) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: SMOOTH_EASE, delay: idx * 0.05 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-[#8b5cf6]/30 bg-[#12131c] p-5 shadow-[inset_0_-48px_56px_-32px_rgba(124,58,237,0.72),0_18px_40px_-28px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-[#c4b5fd]/80 hover:shadow-[inset_0_-72px_70px_-28px_rgba(139,92,246,0.9),0_26px_48px_-18px_rgba(124,58,237,0.55)] motion-safe:hover:-translate-y-1 motion-reduce:hover:translate-y-0"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#6d28d9]/45 via-[#7c3aed]/15 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="relative z-10 flex h-full flex-col">
                  <h3 className="mb-2 text-[16px] font-semibold leading-snug tracking-[-0.02em] text-[#f3f5fa]">
                    {step.title}
                  </h3>
                  <p className="mb-4 text-[13px] leading-[1.55] text-[#b7c0ce]">{step.description}</p>
                  <ul className="mb-5 flex flex-col gap-2.5">
                    {step.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-[13px] text-[#d5dce6]">
                        <span
                          className="mt-[5px] h-2 w-2 shrink-0 rounded-full bg-[#7c3aed] shadow-[0_0_8px_#8b5cf6] transition-all duration-300 group-hover:bg-[#ddd6fe] group-hover:shadow-[0_0_10px_#c4b5fd]"
                          aria-hidden
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      if (step.action === 'contact') onOpenContact(step.plan);
                      else if (step.action === 'services') onNavigate('/#service');
                      else onNavigate('/#process');
                    }}
                    className="mt-auto w-full cursor-pointer rounded-full bg-[#7c5cfc] px-4 py-2.5 text-[14px] font-medium text-white shadow-[0_10px_24px_-12px_rgba(124,92,252,0.9)] transition-all duration-300 hover:bg-[#a78bfa] hover:shadow-[0_14px_28px_-10px_rgba(167,139,250,1)] motion-safe:hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4b5fd]"
                  >
                    {step.button}
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Mission & Philosophy 2-Column Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: SMOOTH_EASE }}
            className="premium-interactive-card rounded-[20px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-6 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <p className="font-mono-tech text-[11.5px] uppercase tracking-[0.1em] text-[#a78bfa] mb-3">
                [ WHY WE EXIST ]
              </p>
              <h2 className="text-[22px] sm:text-[26px] font-medium text-clavion-gradient tracking-[-0.02em] mb-4">
                Beyond Brittle Demos &amp; Quick Hacks
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#aeb5c0] leading-[1.7] mb-4">
                Most teams experiment with disconnected prompts and fragile zaps that break the moment volume scales. We started{' '}
                <span className="font-pacifico text-[#f3f5fa]">HeyDots</span> to bring software engineering rigor to AI automation.
              </p>
              <p className="text-[14px] sm:text-[15px] text-[#aeb5c0] leading-[1.7]">
                From lead qualification and tier-1 support to complex backend data orchestration, we ship production systems your team can trust every hour of the day.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-[12.5px] text-[#d5dce6]">
                <span className="w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399]" />
                Global Remote-First Engineering
              </span>
              <button
                type="button"
                onClick={() => onNavigate('/#service')}
                className="text-[13px] font-medium text-[#a78bfa] hover:text-white transition-colors cursor-pointer"
              >
                Explore Solutions →
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: 0.06 }}
            className="premium-interactive-card rounded-[20px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-6 sm:p-8 flex flex-col justify-between gap-5"
          >
            <div>
              <p className="font-mono-tech text-[11.5px] uppercase tracking-[0.1em] text-[#38bdf8] mb-3">
                [ HOW WE BUILD ]
              </p>
              <h2 className="text-[22px] sm:text-[26px] font-medium text-clavion-gradient tracking-[-0.02em] mb-5">
                Principles Behind Every Deployment
              </h2>

              <div className="flex flex-col gap-4">
                {HOW_WE_BUILD_PILLARS.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="rounded-[14px] bg-[#0c0f17]/85 border border-white/[0.07] p-4 flex items-start gap-3.5"
                  >
                    <span
                      className={`mt-1 w-2.5 h-2.5 rounded-full bg-gradient-to-br ${pillar.accent} shrink-0 shadow-[0_0_12px_rgba(139,92,246,0.5)]`}
                    />
                    <div>
                      <h3 className="text-[15px] font-medium text-[#f3f5fa] mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-[13px] text-[#9ca5b5] leading-[1.55]">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Capabilities Row */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <SectionKicker text="WHAT WE DELIVER" className="mb-3" />
            <h2
              className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.15]"
              style={{ fontSize: 'clamp(1.65rem, 3.2vw, 2.35rem)' }}
            >
              Built for Modern Revenue &amp; Ops Teams
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CORE_PRACTICES.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: SMOOTH_EASE, delay: idx * 0.06 }}
                className="premium-interactive-card rounded-[18px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="font-mono-tech text-[10.5px] uppercase tracking-[0.1em] text-[#8f96a6] mb-2.5">
                    {item.kicker}
                  </p>
                  <h3 className="text-[19px] font-medium text-[#f3f5fa] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-[13.5px] text-[#aeb5c0] leading-[1.6]">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: SMOOTH_EASE }}
          className="rounded-[20px] border border-[#8b5cf6]/35 bg-gradient-to-r from-[#131626]/95 via-[#0f1320]/95 to-[#11192c]/95 p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
        >
          <div>
            <h2 className="text-[22px] sm:text-[26px] font-medium text-[#f3f5fa] tracking-[-0.02em] mb-2">
              Ready to see what AI can automate for your team?
            </h2>
            <p className="text-[14px] text-[#aeb5c0] max-w-[520px]">
              Tell us about your current bottlenecks and we’ll map out a tailored implementation blueprint.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <RainbowButton
              label="GO TO CONTACT"
              variant="rainbow"
              onClick={() => onNavigate('/contact')}
            />
            <RainbowButton
              label="QUICK INQUIRY"
              variant="dark"
              onClick={() => onOpenContact('About Page Inquiry')}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
