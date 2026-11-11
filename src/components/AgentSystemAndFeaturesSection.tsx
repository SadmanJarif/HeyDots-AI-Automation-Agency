import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface AgentSystemAndFeaturesSectionProps {
  onOpenContact: (defaultPlan?: string) => void;
  onBookCall: () => void;
}

const AGENT_OS_CAPABILITIES = [
  'Understand context',
  'Follow rules and logic',
  'Connect to your existing systems',
  'Execute tasks without constant supervision',
];

const USED_BY_TAGS = [
  'SERVICE PROVIDERS',
  'SAAS COMPANIES',
  'AGENCIES',
  'E-COMMERCE BRANDS',
];

const LEAD_QUALIFICATION_ROWS = [
  {
    name: 'Luca Bianchi',
    avatar: '/assets/clavion/r4hCpcC2BSjUh7yG1NodeQGem9k.jpg',
    badge: 'COLD LEAD',
    emoji: '❄️',
    badgeClass: 'bg-[#eef2ff] text-[#4f46e5] border-[#c7d2fe]',
  },
  {
    name: 'Daniel Weiss',
    avatar: '/assets/clavion/mTPhSAaQlUSkjdTXB0TZUqi3E.jpg',
    badge: 'HOT LEAD',
    emoji: '🔥',
    badgeClass: 'bg-[#fef2f2] text-[#ef4444] border-[#fecaca]',
  },
  {
    name: 'Sofia Novak',
    avatar: '/assets/clavion/C1EN7t1PkviRju6c2OgDIdKVBo.jpg',
    badge: 'QUALIFIED',
    emoji: '✅',
    badgeClass: 'bg-[#ecfdf5] text-[#10b981] border-[#a7f3d0]',
  },
  {
    name: 'Marcus Reed',
    avatar: '/assets/clavion/VF9V184MwL6lVi1H5HxAgomY5M.jpg',
    badge: 'COLD LEAD',
    emoji: '❄️',
    badgeClass: 'bg-[#eef2ff] text-[#4f46e5] border-[#c7d2fe]',
  },
];

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: 'bolt' | 'dollar' | 'chart' | 'timer' | 'scale' | 'sync';
}

const BENEFITS_GRID: BenefitItem[] = [
  {
    id: 'faster-execution',
    title: 'Faster execution across teams',
    description:
      'Agents coordinate workflows across tools and teams, removing delays caused by manual reviews, follow-ups, and handoffs.',
    icon: 'bolt',
  },
  {
    id: 'reduced-costs',
    title: 'Reduced operational costs',
    description:
      'Automating repetitive operational tasks reduces overhead while maintaining accuracy and consistency.',
    icon: 'dollar',
  },
  {
    id: 'consistent-performance',
    title: 'Consistent performance, 24/7',
    description:
      'Agents operate continuously without fatigue, ensuring critical workflows run reliably at all hours.',
    icon: 'chart',
  },
  {
    id: 'fewer-handoffs',
    title: 'Fewer manual handoffs',
    description:
      'Workflows move automatically between systems and teams, eliminating bottlenecks.',
    icon: 'timer',
  },
  {
    id: 'scale-demand',
    title: 'Systems that scale with demand',
    description:
      'Agents handle increased volume without additional headcount, adapting execution as workload grows.',
    icon: 'scale',
  },
  {
    id: 'predictable-decisions',
    title: 'Predictable decision-making',
    description:
      'Agents follow defined logic and rules, producing outcomes that are consistent, explainable, and aligned with business processes.',
    icon: 'sync',
  },
];

const BenefitGradientIcon: React.FC<{ icon: BenefitItem['icon']; isHovered: boolean }> = ({
  icon,
  isHovered,
}) => {
  return (
    <div
      className={`relative w-12 h-12 rounded-[13px] flex items-center justify-center shrink-0 overflow-hidden border border-white/15 shadow-[0_8px_24px_rgba(79,70,229,0.35)] transition-all duration-300 ${
        isHovered ? 'scale-110 -translate-y-1 shadow-[0_12px_32px_rgba(124,93,250,0.6)]' : ''
      }`}
      style={{
        background:
          'linear-gradient(180deg, #070810 0%, #1c1954 38%, #4f46e5 74%, #a59eff 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            'radial-gradient(circle at 50% 100%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 75%)',
        }}
      />
      <div className="relative z-10 text-white">
        {icon === 'bolt' && (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2L4.5 13.5h6L9.5 22 19.5 10.5h-6L13 2z" />
          </svg>
        )}
        {icon === 'dollar' && (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
            <circle cx="12" cy="12" r="9" />
            <path d="M14.5 9.5c0-1.1-1.1-2-2.5-2s-2.5.9-2.5 2 1.1 1.7 2.5 2 2.5.9 2.5 2-1.1 2-2.5 2-2.5-.9-2.5-2M12 6v12" strokeLinecap="round" />
          </svg>
        )}
        {icon === 'chart' && (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
            <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
            <path d="M8 15v-3M12 15V9M16 15v-5" strokeLinecap="round" />
          </svg>
        )}
        {icon === 'timer' && (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
            <circle cx="12" cy="13" r="8" />
            <path d="M12 9v4l2.5 1.5M9.5 2.5h5M12 2.5v2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {icon === 'scale' && (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
            <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
            <path d="M8 15v-2M12 15v-4M16 15V9" strokeLinecap="round" />
          </svg>
        )}
        {icon === 'sync' && (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
            <path d="M17 2.1l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 12.2v-2a4 4 0 0 1 4-4h14" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 21.9l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 11.8v2a4 4 0 0 1-4 4H3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
};

export const AgentSystemAndFeaturesSection: React.FC<AgentSystemAndFeaturesSectionProps> = ({
  onOpenContact,
  onBookCall,
}) => {
  const [hoveredCapabilityIdx, setHoveredCapabilityIdx] = useState<number | null>(null);
  const [autoCapIdx, setAutoCapIdx] = useState<number>(0);
  const [hoveredFeatureIdx, setHoveredFeatureIdx] = useState<number | null>(null);
  const [autoLeadIdx, setAutoLeadIdx] = useState<number>(1);
  const [kanbanPhase, setKanbanPhase] = useState<number>(0);
  const [hoveredBenefitId, setHoveredBenefitId] = useState<string | null>(null);

  // Continuous live motion across AgentOS pills, Lead Qualification rows, and Kanban card
  useEffect(() => {
    const timer = window.setInterval(() => {
      setAutoCapIdx((prev) => (prev + 1) % AGENT_OS_CAPABILITIES.length);
      setAutoLeadIdx((prev) => (prev + 1) % LEAD_QUALIFICATION_ROWS.length);
      setKanbanPhase((prev) => (prev + 1) % 3);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  const activeCapIdx = hoveredCapabilityIdx !== null ? hoveredCapabilityIdx : autoCapIdx;

  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-5 py-16 sm:py-20 space-y-20 sm:space-y-28 overflow-hidden">
      {/* ====================================================================
          SECTION 1A: WHAT WE MEAN BY "AI AGENT"
          ==================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Visual Card: Deep Midnight -> Electric Royal Purple -> Lavender Gradient Stage */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="agent-stage-gradient lg:col-span-6 relative rounded-[22px] p-5 sm:p-10 min-h-[370px] sm:min-h-[440px] flex flex-col items-center justify-center overflow-hidden border border-[#8b5cf6]/50 hover:border-[#a78bfa] shadow-[0_24px_70px_rgba(109,40,217,0.34)] hover:shadow-[0_30px_80px_rgba(124,58,237,0.48)] hover:-translate-y-1 transition-all duration-300"
          style={{
            background:
              'linear-gradient(180deg, #070814 0%, #1d1559 36%, #5b3df5 72%, #c4b5fd 100%)',
          }}
        >
          {/* Ambient Radial Glow */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-36 opacity-75"
            style={{
              background:
                'radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 75%)',
            }}
          />

          <div className="relative z-10 w-full max-w-[395px] flex flex-col items-center">
            {/* AgentOS / HeyDots Header Badge */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-[8px] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#5b3df5]">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 3a9 9 0 1 0 9 9c0-1.5-.4-2.9-1-4.1" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="3.5" />
                </svg>
              </div>
              <span className="agent-os-badge-text font-mono-tech text-[15px] sm:text-[16px] font-medium text-white tracking-tight">
                AgentOS <span className="font-pacifico text-[#ede9fe] ml-0.5">HeyDots</span>:
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 border border-white/25 font-mono-tech text-[9.5px] uppercase tracking-wider text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-ping" />
                LIVE
              </span>
            </div>

            {/* 4 White Pill Checklist Bars with Smooth CSS Highlight */}
            <div className="w-full flex flex-col gap-2.5">
              {AGENT_OS_CAPABILITIES.map((item, idx) => {
                const isActive = activeCapIdx === idx;
                return (
                  <div
                    key={item}
                    onMouseEnter={() => setHoveredCapabilityIdx(idx)}
                    onMouseLeave={() => setHoveredCapabilityIdx(null)}
                    className={`w-full rounded-[10px] bg-white px-3.5 sm:px-4 py-3 flex items-center justify-between gap-3 transition-all duration-300 ease-out cursor-default ${
                      isActive
                        ? 'shadow-[0_12px_30px_rgba(15,23,42,0.38)] ring-2 ring-[#a78bfa] translate-x-1'
                        : 'shadow-[0_8px_22px_rgba(10,13,20,0.22)] opacity-95 translate-x-0'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          isActive ? 'bg-[#5b3df5] text-white' : 'bg-[#ede9fe] text-[#5b3df5]'
                        }`}
                      >
                        <svg
                          className="w-3 h-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.8"
                        >
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="font-mono-tech text-[11px] sm:text-[12.5px] text-[#0f172a] font-medium tracking-[-0.01em] truncate">
                        {item}
                      </span>
                    </div>
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 transition-opacity duration-300 ${
                        isActive ? 'bg-[#5b3df5] opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right Copy Column */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          className="lg:col-span-6 flex flex-col items-start"
        >
          <p className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#9ca5b5] mb-3.5">
            WHAT WE MEAN BY &ldquo;AI AGENT&rdquo;
          </p>

          <h2
            className="text-clavion-gradient font-normal tracking-[-0.035em] leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(2.1rem, 4vw, 3.25rem)', textWrap: 'balance' }}
          >
            Not a chatbot. Not a script. A system that actually works.
          </h2>

          <div className="space-y-4 text-[14.5px] sm:text-[15.5px] text-[#9ca5b5] leading-[1.65] max-w-[500px] mb-8">
            <p>
              An AI agent is a software system designed to observe information, make decisions, and take action inside your business—automatically.
            </p>
            <p className="text-[#d5dce6] font-medium">They don’t replace your team.</p>
            <p>
              They remove repetitive work so your team can operate at a higher level.
            </p>
          </div>

          <button
            type="button"
            onClick={onBookCall}
            className="strategy-cta-btn group inline-flex items-center min-h-[44px] rounded-[11px] bg-[#121521] hover:bg-[#191d2e] border border-white/15 hover:border-[#8b5cf6]/60 p-1.5 pl-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
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
      </div>

      {/* ====================================================================
          SECTION 1B: FEATURES — Real workflows. Real automation.
          ==================================================================== */}
      <div>
        {/* Top Header + Used by Tags */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
        >
          <div>
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#9ca5b5] mb-3">
              FEATURES
            </p>
            <h2
              className="text-clavion-gradient font-normal tracking-[-0.035em] leading-[1.08]"
              style={{ fontSize: 'clamp(2.1rem, 4vw, 3.2rem)' }}
            >
              Real workflows.
              <br />
              Real automation.
            </h2>
          </div>

          {/* Right: Used by pill tags */}
          <div className="flex flex-wrap items-center gap-2 max-w-[440px]">
            <span className="text-[12.5px] text-[#9ca5b5] mr-1">Used by:</span>
            {USED_BY_TAGS.map((tag) => (
              <span
                key={tag}
                className="used-by-pill px-3 py-1 rounded-full border border-white/15 bg-white/[0.03] hover:bg-[#8b5cf6]/15 hover:border-[#8b5cf6]/55 font-mono-tech text-[10.5px] uppercase tracking-[0.08em] text-[#d5dce6] transition-all duration-200 hover:-translate-y-0.5 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1: Lead qualification and routing */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHoveredFeatureIdx(0)}
            onMouseLeave={() => setHoveredFeatureIdx(null)}
            onClick={() => onOpenContact('Lead Qualification & Routing Agent')}
            className="premium-interactive-card group rounded-[18px] border border-white/12 hover:border-[#8b5cf6]/60 bg-[#0e121e]/95 overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_60px_rgba(109,40,217,0.28)] hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
          >
            {/* Gradient Visual Stage */}
            <div
              className="agent-stage-gradient relative h-[250px] p-5 flex items-center justify-center overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, #070814 0%, #1d1559 38%, #5b3df5 76%, #c4b5fd 100%)',
              }}
            >
              <div className="w-full max-w-[290px] rounded-[14px] bg-white/95 p-2.5 shadow-[0_14px_34px_rgba(10,13,20,0.35)] flex flex-col gap-1.5">
                {LEAD_QUALIFICATION_ROWS.map((lead, i) => {
                  const isRowHighlighted =
                    hoveredFeatureIdx === 0 ? i === 1 || i === 2 : autoLeadIdx === i;
                  return (
                    <div
                      key={lead.name}
                      className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-[9px] bg-white border transition-all duration-300 ease-out ${
                        isRowHighlighted
                          ? 'border-[#8b5cf6]/60 shadow-[0_4px_12px_rgba(91,61,245,0.18)] translate-x-1'
                          : 'border-slate-100 shadow-xs translate-x-0'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={lead.avatar}
                          alt={lead.name}
                          className="w-6 h-6 rounded-full object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[11.5px] font-medium text-slate-800 truncate">
                          {lead.name}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-mono-tech text-[9px] font-semibold tracking-wider shrink-0 ${lead.badgeClass}`}
                      >
                        <span>{lead.badge}</span>
                        <span>{lead.emoji}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Copy */}
            <div className="p-6 flex-1 flex flex-col justify-between bg-[#0e121e]">
              <div>
                <h3 className="text-[17px] font-medium text-[#f3f5fa] group-hover:text-white tracking-[-0.015em] mb-2">
                  Lead qualification and routing
                </h3>
                <p className="text-[13.5px] text-[#9ca5b5] leading-[1.55]">
                  Purpose-built agents designed for your unique systems, data, and business logic.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CARD 2: Pipeline management */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
            onMouseEnter={() => setHoveredFeatureIdx(1)}
            onMouseLeave={() => setHoveredFeatureIdx(null)}
            onClick={() => onOpenContact('Pipeline Management Agent')}
            className="premium-interactive-card group rounded-[18px] border border-white/12 hover:border-[#8b5cf6]/60 bg-[#0e121e]/95 overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_60px_rgba(109,40,217,0.28)] hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
          >
            {/* Gradient Visual Stage */}
            <div
              className="agent-stage-gradient relative h-[250px] p-5 flex items-center justify-center overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, #070814 0%, #1d1559 38%, #5b3df5 76%, #c4b5fd 100%)',
              }}
            >
              {/* 3-Column Mini Kanban Board */}
              <div className="relative w-full max-w-[295px] rounded-[14px] bg-white p-2.5 shadow-[0_14px_34px_rgba(10,13,20,0.35)] grid grid-cols-3 gap-2 h-[155px]">
                {/* Column 1: NEW */}
                <div className="rounded-[9px] bg-[#fbcfe8]/75 p-2 flex flex-col items-center">
                  <span className="font-mono-tech text-[8.5px] font-semibold uppercase tracking-wider text-rose-900/80">
                    NEW
                  </span>
                </div>

                {/* Column 2: IN PROGRESS */}
                <div className="rounded-[9px] bg-[#fde68a]/80 p-2 flex flex-col items-center">
                  <span className="font-mono-tech text-[8.5px] font-semibold uppercase tracking-wider text-amber-900/80 whitespace-nowrap">
                    IN PROGRESS
                  </span>
                </div>

                {/* Column 3: CLOSED */}
                <div className="rounded-[9px] bg-[#bbf7d0]/80 p-2 flex flex-col items-center">
                  <span className="font-mono-tech text-[8.5px] font-semibold uppercase tracking-wider text-emerald-900/80">
                    CLOSED
                  </span>
                </div>

                {/* Floating Draggable Deal Card with Smooth CSS Transition */}
                <div
                  className={`absolute right-3.5 bottom-4 w-[142px] rounded-[10px] bg-white border border-slate-200/90 p-2.5 shadow-[0_12px_28px_rgba(15,23,42,0.24)] transition-transform duration-500 ease-out ${
                    hoveredFeatureIdx === 1
                      ? 'translate-x-1 -translate-y-1.5'
                      : kanbanPhase === 0
                      ? '-translate-x-3 translate-y-0'
                      : kanbanPhase === 1
                      ? 'translate-x-0 -translate-y-1'
                      : 'translate-x-1.5 translate-y-0'
                  }`}
                >
                  <p className="text-[10px] font-semibold text-slate-800 mb-1">New Deal</p>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="h-1 w-8 rounded-full bg-slate-300" />
                    <span className="h-1 w-5 rounded-full bg-slate-200" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="h-1.5 w-6 rounded-full bg-emerald-400" />
                    <span className="font-mono-tech text-[10.5px] font-bold text-slate-900">
                      $12,000
                    </span>
                  </div>

                  {/* Pointer Hand Icon */}
                  <div className="absolute -bottom-2.5 left-4 w-6 h-6 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-900">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 11.24V7.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.37-.08-.76.04-1.03.31-.43.44-.43 1.14 0 1.58l4.01 4.01c.38.37.89.58 1.42.58h6.5c1 0 1.84-.73 1.98-1.72l.63-4.47c.12-.85-.32-1.69-1.24-1.94z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Copy */}
            <div className="p-6 flex-1 flex flex-col justify-between bg-[#0e121e]">
              <div>
                <h3 className="text-[17px] font-medium text-[#f3f5fa] group-hover:text-white tracking-[-0.015em] mb-2">
                  Pipeline management
                </h3>
                <p className="text-[13.5px] text-[#9ca5b5] leading-[1.55]">
                  Purpose-built agents designed for your unique systems, data, and business logic.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CARD 3: Customer support and FAQ handling */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            onMouseEnter={() => setHoveredFeatureIdx(2)}
            onMouseLeave={() => setHoveredFeatureIdx(null)}
            onClick={() => onOpenContact('Customer Support & FAQ Agent')}
            className="premium-interactive-card group rounded-[18px] border border-white/12 hover:border-[#8b5cf6]/60 bg-[#0e121e]/95 overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_60px_rgba(109,40,217,0.28)] hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
          >
            {/* Gradient Visual Stage */}
            <div
              className="agent-stage-gradient relative h-[250px] p-5 flex items-center justify-center overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, #070814 0%, #1d1559 38%, #5b3df5 76%, #c4b5fd 100%)',
              }}
            >
              <div className="w-full max-w-[295px] rounded-[14px] bg-white p-3.5 shadow-[0_14px_34px_rgba(10,13,20,0.35)] flex flex-col gap-2">
                <span className="text-[9.5px] font-medium text-slate-400">Customer</span>
                <div className="self-start px-3 py-1.5 rounded-[10px] rounded-tl-xs bg-slate-100 text-[11px] font-medium text-slate-800 transition-transform duration-300 group-hover:translate-x-0.5">
                  How do I reset my password?
                </div>
                <div className="self-start px-3 py-1.5 rounded-[10px] rounded-tl-xs bg-slate-100 text-[11px] font-medium text-slate-800 transition-transform duration-300 group-hover:translate-x-1">
                  From the mobile app
                </div>

                <div className="flex flex-col items-end mt-1">
                  <span className="text-[9.5px] font-medium text-slate-400 mb-1">Agent</span>
                  <div
                    className={`keep-white-text px-3.5 py-1.5 rounded-full bg-[#4f46e5] text-white text-[11px] font-medium shadow-[0_6px_16px_rgba(79,70,229,0.42)] transition-transform duration-300 ${
                      hoveredFeatureIdx === 2 || kanbanPhase === 1 ? '-translate-x-1' : 'translate-x-0'
                    }`}
                  >
                    To reset your password...
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Copy */}
            <div className="p-6 flex-1 flex flex-col justify-between bg-[#0e121e]">
              <div>
                <h3 className="text-[17px] font-medium text-[#f3f5fa] group-hover:text-white tracking-[-0.015em] mb-2">
                  Customer support and FAQ handling
                </h3>
                <p className="text-[13.5px] text-[#9ca5b5] leading-[1.55]">
                  Purpose-built agents designed for your unique systems, data, and business logic.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ====================================================================
          SECTION 1C: BENEFITS — More output & fewer constraints
          ==================================================================== */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#9ca5b5] mb-3">
            BENEFITS
          </p>
          <h2
            className="text-clavion-gradient font-normal tracking-[-0.035em] leading-[1.08]"
            style={{ fontSize: 'clamp(2.1rem, 4vw, 3.2rem)' }}
          >
            More output &amp;
            <br />
            fewer constraints
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BENEFITS_GRID.map((benefit, idx) => {
            const isHovered = hoveredBenefitId === benefit.id;
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: idx * 0.04,
                }}
                onMouseEnter={() => setHoveredBenefitId(benefit.id)}
                onMouseLeave={() => setHoveredBenefitId(null)}
                className="premium-interactive-card group relative rounded-[18px] border border-white/[0.08] hover:border-[#8b5cf6]/60 bg-[#0d111d]/85 hover:bg-[#111626] p-6 hover:-translate-y-1 transition-all duration-300 shadow-[0_12px_34px_rgba(0,0,0,0.35)] hover:shadow-[0_22px_52px_rgba(109,40,217,0.22)] overflow-hidden"
              >
                {/* Bottom animated purple progress accent bar on hover */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#5b3df5] via-[#8b5cf6] to-[#c4b5fd] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

                <div className="mb-5">
                  <BenefitGradientIcon icon={benefit.icon} isHovered={isHovered} />
                </div>
                <h3 className="text-[17.5px] font-medium text-[#f3f5fa] group-hover:text-white tracking-[-0.015em] mb-2.5 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-[13.5px] sm:text-[14px] text-[#9ca5b5] group-hover:text-[#c4ccd9] leading-[1.6] transition-colors">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
