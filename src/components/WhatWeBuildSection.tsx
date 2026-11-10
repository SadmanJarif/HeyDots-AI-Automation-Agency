import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface WhatWeBuildSectionProps {
  onOpenContact: (defaultPlan?: string) => void;
  onBookCall: () => void;
}

interface AgentBuildItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconType: 'sales' | 'support' | 'operations' | 'marketing' | 'internal';
}

const WHAT_WE_BUILD_AGENTS: AgentBuildItem[] = [
  {
    id: 'sales',
    title: 'AI Sales Agents',
    description:
      'Qualify leads, send follow-ups, update CRMs, and move deals forward automatically—without missing opportunities.',
    badge: 'AUTO-QUALIFY',
    iconType: 'sales',
  },
  {
    id: 'support',
    title: 'AI Customer Support Agents',
    description:
      'Answer customer questions instantly, resolve common issues, and escalate only when human input is needed.',
    badge: '< 2S RESPONSE',
    iconType: 'support',
  },
  {
    id: 'operations',
    title: 'AI Operations Agents',
    description:
      'Automate internal processes like reporting, data handling, task coordination, and documentation management.',
    badge: '24/7 SYNC',
    iconType: 'operations',
  },
  {
    id: 'marketing',
    title: 'Marketing & Outreach Agents',
    description:
      'Personalize outreach, generate content drafts, and manage campaigns across platforms at scale.',
    badge: 'OMNICHANNEL',
    iconType: 'marketing',
  },
  {
    id: 'internal',
    title: 'Custom Internal AI Agents',
    description:
      'Purpose-built agents designed for your unique systems, data, and business logic.',
    badge: 'BESPOKE LOGIC',
    iconType: 'internal',
  },
];

const PROBLEMS_LIST = [
  'Manual work slows everything down',
  'Leads go cold due to slow follow-ups',
  'Support teams are overwhelmed',
  'Internal knowledge is scattered',
  'Scaling means hiring more people',
];

const OUTCOMES_LIST = [
  'Workflows run automatically, 24/7',
  'Leads are qualified and routed instantly',
  'Customers get immediate responses',
  'Internal systems answer questions on demand',
  'You scale operations without scaling headcount',
];

const AgentGradientIcon: React.FC<{ type: AgentBuildItem['iconType']; isHovered: boolean }> = ({
  type,
  isHovered,
}) => {
  return (
    <div
      className={`relative w-12 h-12 sm:w-13 sm:h-13 rounded-[13px] flex items-center justify-center shrink-0 overflow-hidden border border-white/15 shadow-[0_8px_24px_rgba(79,70,229,0.35)] transition-transform duration-300 ${
        isHovered ? 'scale-108 -translate-y-0.5 shadow-[0_10px_30px_rgba(124,93,250,0.55)]' : ''
      }`}
      style={{
        background:
          'linear-gradient(180deg, #070810 0%, #1c1954 38%, #4f46e5 74%, #9b95ff 100%)',
      }}
    >
      {/* Subtle bottom inner glow matching reference icon tiles */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            'radial-gradient(circle at 50% 100%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 75%)',
        }}
      />

      <div className="relative z-10 text-white">
        {type === 'sales' && (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <rect x="5" y="6" width="3.2" height="12" rx="1" />
            <rect x="10.4" y="10" width="3.2" height="8" rx="1" />
            <rect x="15.8" y="8" width="3.2" height="10" rx="1" />
          </svg>
        )}
        {type === 'support' && (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
          >
            <path
              d="M4 13v-1a8 8 0 0 1 16 0v1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="3" y="12" width="3.5" height="6" rx="1.5" fill="currentColor" />
            <rect x="17.5" y="12" width="3.5" height="6" rx="1.5" fill="currentColor" />
            <path d="M19 18a3 3 0 0 1-3 3h-3" strokeLinecap="round" />
            <circle cx="10" cy="14" r="0.8" fill="currentColor" />
            <circle cx="14" cy="14" r="0.8" fill="currentColor" />
            <path d="M10 16.5c.6.5 1.3.8 2 .8s1.4-.3 2-.8" strokeLinecap="round" />
          </svg>
        )}
        {type === 'operations' && (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.85"
          >
            <circle cx="12" cy="12" r="3.2" />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.77 1.02 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {type === 'marketing' && (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.85"
          >
            <path
              d="m3 11 14-5v12L3 13v-2z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M6 14v4a2 2 0 0 0 2 2h1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 8.5c1 .9 1 3.1 0 4M22 6.5c2 2 2 6 0 8" strokeLinecap="round" />
          </svg>
        )}
        {type === 'internal' && (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.85"
          >
            <path d="M4 20 18 6v14H4z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="14.5" cy="16.5" r="1.8" />
          </svg>
        )}
      </div>
    </div>
  );
};

export const WhatWeBuildSection: React.FC<WhatWeBuildSectionProps> = ({
  onOpenContact,
  onBookCall,
}) => {
  const [hoveredAgentId, setHoveredAgentId] = useState<string | null>(null);
  const [hoveredRowIdx, setHoveredRowIdx] = useState<number | null>(null);
  const [autoRowIdx, setAutoRowIdx] = useState<number>(0);

  // Continuous live motion across the 5 problem/outcome comparison rows when not hovered
  useEffect(() => {
    if (hoveredRowIdx !== null) return;
    const timer = window.setInterval(() => {
      setAutoRowIdx((prev) => (prev + 1) % PROBLEMS_LIST.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [hoveredRowIdx]);

  const activeComparisonRow = hoveredRowIdx !== null ? hoveredRowIdx : autoRowIdx;

  return (
    <section id="solutions" className="max-w-[1200px] mx-auto px-5 py-16 space-y-24 scroll-mt-20">
      {/* ====================================================================
          PART 1: WHAT WE BUILD — Custom AI agents designed around your workflows
          ==================================================================== */}
      <div>
        {/* Header Row with Title on Left and "Book a Free Strategy Call [->]" on Right */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#9ca5b5] mb-3">
              WHAT WE BUILD
            </p>
            <h2
              className="text-clavion-gradient font-normal tracking-[-0.035em] leading-[1.1] max-w-[540px]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.1rem)', textWrap: 'balance' }}
            >
              Custom AI agents designed around your workflows
            </h2>
          </div>

          {/* "Book a Free Strategy Call [->]" Split Button matching screenshot */}
          <button
            type="button"
            onClick={onBookCall}
            className="strategy-cta-btn group self-start md:self-end inline-flex items-center min-h-[44px] rounded-[11px] bg-[#121521] hover:bg-[#191d2e] border border-white/15 hover:border-[#8b5cf6]/60 p-1.5 pl-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer shrink-0"
          >
            <span className="strategy-cta-label text-[13px] font-medium text-[#f3f5fa] pr-3.5 whitespace-nowrap">
              Book a Free Strategy Call
            </span>
            <span className="strategy-cta-arrow relative w-8 h-8 rounded-[8px] bg-white text-[#0b0d14] flex items-center justify-center overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105">
              <svg
                className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg
                className="w-4 h-4 absolute -translate-x-6 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
              >
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </motion.div>

        {/* 5 Horizontal Agent Cards Stack */}
        <div className="flex flex-col gap-3.5">
          {WHAT_WE_BUILD_AGENTS.map((agent, idx) => {
            const isHovered = hoveredAgentId === agent.id;
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -24, y: 12 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: 'spring',
                  bounce: 0.18,
                  duration: 0.6,
                  delay: idx * 0.06,
                }}
                whileHover={{ y: -4, x: 4 }}
                onMouseEnter={() => setHoveredAgentId(agent.id)}
                onMouseLeave={() => setHoveredAgentId(null)}
                onClick={() => onOpenContact(agent.title)}
                className="premium-interactive-card group relative rounded-[16px] border border-white/[0.08] hover:border-[#8b5cf6]/55 bg-gradient-to-r from-[#111522]/95 via-[#0e121d]/95 to-[#121625]/95 px-5 py-5 sm:px-7 sm:py-6 shadow-[0_12px_34px_rgba(0,0,0,0.45)] hover:shadow-[0_18px_48px_rgba(124,58,237,0.22)] transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Subtle left-to-right violet hover wash */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(124, 58, 237, 0.12) 0%, rgba(139, 92, 246, 0.05) 55%, rgba(10, 13, 20, 0) 100%)',
                  }}
                />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-6">
                  {/* Left: Gradient Icon Tile + Agent Title */}
                  <div className="md:col-span-5 flex items-center gap-4">
                    <AgentGradientIcon type={agent.iconType} isHovered={isHovered} />
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-[17px] sm:text-[18.5px] font-medium text-[#f3f5fa] group-hover:text-white tracking-[-0.015em] transition-colors">
                          {agent.title}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/35 font-mono-tech text-[9.5px] uppercase tracking-wider text-[#a78bfa]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse" />
                          {agent.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Description + Subtle Interactive Arrow */}
                  <div className="md:col-span-7 flex items-center justify-between gap-4">
                    <p className="text-[13.5px] sm:text-[14px] text-[#aeb5c0] group-hover:text-[#d5dce6] leading-[1.55] max-w-[540px] transition-colors">
                      {agent.description}
                    </p>
                    <span className="hidden sm:flex w-9 h-9 rounded-full border border-white/15 group-hover:border-[#8b5cf6] bg-white/[0.04] group-hover:bg-[#8b5cf6] items-center justify-center text-[#858b94] group-hover:text-white shrink-0 transition-all duration-300 group-hover:translate-x-1.5 shadow-sm">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ====================================================================
          PART 2: WHY AI AGENTS — The Reality for Most Teams
          ==================================================================== */}
      <div id="benefits" className="scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#9ca5b5] mb-3">
            WHY AI AGENTS
          </p>
          <h2
            className="text-clavion-gradient font-normal tracking-[-0.035em] leading-[1.1]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.1rem)', textWrap: 'balance' }}
          >
            The Reality for Most Teams
          </h2>
        </motion.div>

        {/* 2-Column Comparison Grid: The Problems vs The Outcome With AI Agents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* LEFT CARD: The Problems */}
          <motion.div
            initial={{ opacity: 0, x: -24, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.65 }}
            className="premium-interactive-card rounded-[18px] border border-white/[0.08] bg-[#0e121e]/95 p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.55)] flex flex-col"
          >
            <div className="flex items-center justify-between mb-5 px-1">
              <h3 className="text-[19px] sm:text-[21px] font-medium text-[#d5dce6] tracking-[-0.02em]">
                The Problems
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-[#ef4444]/15 border border-[#ef4444]/30 font-mono-tech text-[10px] uppercase tracking-wider text-[#f87171]">
                MANUAL BOTTLENECKS
              </span>
            </div>

            <div className="rounded-[12px] border border-white/[0.07] bg-[#131726]/80 divide-y divide-white/[0.07] overflow-hidden flex-1 flex flex-col justify-between">
              {PROBLEMS_LIST.map((problem, idx) => {
                const isRowActive = activeComparisonRow === idx;
                return (
                  <div
                    key={problem}
                    onMouseEnter={() => setHoveredRowIdx(idx)}
                    onMouseLeave={() => setHoveredRowIdx(null)}
                    className={`flex items-center gap-3.5 px-4 sm:px-5 py-4 text-[13.5px] sm:text-[14px] transition-all duration-300 cursor-default ${
                      isRowActive
                        ? 'bg-[#1b2033] text-[#edf0f5] translate-x-1'
                        : 'text-[#9ca5b5]'
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold shrink-0 transition-all duration-300 ${
                        isRowActive
                          ? 'bg-[#ef4444]/20 text-[#f87171] scale-110'
                          : 'text-[#7c8496]'
                      }`}
                      aria-hidden="true"
                    >
                      ✕
                    </span>
                    <span>{problem}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT CARD: The Outcome With AI Agents (Rich Royal Purple Gradient Stage in BOTH Dark & Light Mode) */}
          <motion.div
            initial={{ opacity: 0, x: 24, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.65, delay: 0.08 }}
            className="outcome-gradient-card relative rounded-[18px] border border-[#8b5cf6]/50 hover:border-[#a78bfa] p-5 sm:p-7 shadow-[0_24px_65px_rgba(109,40,217,0.35)] hover:shadow-[0_28px_75px_rgba(124,58,237,0.48)] flex flex-col overflow-hidden transition-all duration-300"
            style={{
              background:
                'linear-gradient(180deg, #070814 0%, #1d1654 38%, #5b3df5 78%, #a78bfa 100%)',
            }}
          >
            {/* Bottom atmospheric lavender-violet glow */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-75"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 100%, rgba(196, 181, 253, 0.55) 0%, rgba(167, 139, 250, 0) 75%)',
              }}
            />

            <div className="relative z-10 flex items-center justify-between mb-5 px-1">
              <h3 className="outcome-card-heading text-[19px] sm:text-[21px] font-semibold text-white tracking-[-0.02em]">
                The Outcome With AI Agents
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 border border-white/25 font-mono-tech text-[10px] uppercase tracking-wider text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-ping" />
                AUTONOMOUS SCALE
              </span>
            </div>

            <div className="outcome-card-list relative z-10 rounded-[12px] border border-white/[0.16] bg-[#141236]/75 backdrop-blur-md divide-y divide-white/[0.1] overflow-hidden flex-1 flex flex-col justify-between">
              {OUTCOMES_LIST.map((outcome, idx) => {
                const isRowActive = activeComparisonRow === idx;
                return (
                  <div
                    key={outcome}
                    onMouseEnter={() => setHoveredRowIdx(idx)}
                    onMouseLeave={() => setHoveredRowIdx(null)}
                    className={`outcome-card-row flex items-center gap-3.5 px-4 sm:px-5 py-4 text-[13.5px] sm:text-[14px] font-medium transition-all duration-300 cursor-default ${
                      isRowActive
                        ? 'bg-white/[0.14] text-white translate-x-1.5'
                        : 'text-white/90'
                    }`}
                  >
                    <svg
                      className={`outcome-card-icon w-4.5 h-4.5 shrink-0 transition-transform duration-300 ${
                        isRowActive ? 'text-[#c4b5fd] scale-115' : 'text-white/85'
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="m8.5 12.5 2.3 2.3 4.7-4.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{outcome}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
