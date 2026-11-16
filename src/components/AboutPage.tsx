import React from 'react';
import { motion } from 'motion/react';
import { RainbowButton, SectionKicker } from './RainbowButton';

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
