import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CountUp } from './CountUp';

interface ComparisonAndTransformationSectionProps {
  onOpenContact: (defaultPlan?: string) => void;
}

const HEYDOTS_ADVANTAGES = [
  'Guaranteed 240% ROI within 6-12 months',
  'Risk-free implementation with 30-day money-back guarantee',
  'Transparent pricing with no hidden fees or surprises',
  'Industry-specific solutions tailored to your business needs',
  '24/7 dedicated support with real-time monitoring',
  'Proven track record with 500+ successful implementations',
];

const COMPETITOR_DRAWBACKS = [
  'Vague ROI promises without measurable guarantees',
  'Hidden costs and surprise fees throughout the project',
  "Generic one-size-fits-all solutions that don't fit your needs",
  'Slow implementation timelines exceeding 6+ months',
  'Limited support after initial deployment phase ends',
  'Unproven methodologies with inconsistent success rates',
];

const DONUT_LEGEND_ITEMS = [
  { label: 'Cost Reduction', value: '68%', color: '#34d399' },
  { label: 'Weekly Savings', value: '62hr', color: '#8b5cf6' },
  { label: 'Return (ROI)', value: '380%', color: '#f59e0b' },
];

const INVENTORY_SUB_CARDS = [
  {
    value: '$75K',
    label: 'Monthly Savings',
    activeBars: 10,
    totalBars: 12,
    activeColor: 'bg-[#34d399]',
  },
  {
    value: '99.5%',
    label: 'Accuracy',
    activeBars: 11,
    totalBars: 12,
    activeColor: 'bg-[#8b5cf6]',
  },
  {
    value: '340%',
    label: 'ROI',
    activeBars: 6,
    totalBars: 12,
    activeColor: 'bg-[#f59e0b]',
  },
];

export const ComparisonAndTransformationSection: React.FC<
  ComparisonAndTransformationSectionProps
> = ({ onOpenContact }) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredTransformCard, setHoveredTransformCard] = useState<number | null>(null);
  const [autoRowIdx, setAutoRowIdx] = useState(0);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setAutoRowIdx((prev) => (prev + 1) % HEYDOTS_ADVANTAGES.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  const activeRow = hoveredRow !== null ? hoveredRow : autoRowIdx;

  return (
    <section className="max-w-[1200px] mx-auto px-5 py-20 space-y-28">
      {/* ====================================================================
          PART 1: WHY CHOOSE US — HeyDots vs Competitor Comparison
          ==================================================================== */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#0f1d3d] border border-[#3b82f6]/40 text-[11.5px] font-medium text-[#93c5fd] shadow-[0_0_20px_rgba(59,130,246,0.25)] mb-4">
            Why Choose Us
          </span>

          <h2
            className="text-[#f3f5fa] font-semibold tracking-[-0.03em] leading-[1.12] max-w-[650px] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.1rem)', textWrap: 'balance' }}
          >
            <span className="font-pacifico font-normal text-white mr-1">HeyDots</span> is the
            clear choice for business automation
          </h2>

          <p className="text-[14px] sm:text-[15px] text-[#9ca5b5] leading-[1.6] max-w-[540px]">
            <span className="font-pacifico text-[#e2e8f0]">HeyDots</span> dominates the AI
            automation landscape, delivering unmatched ROI and proven results compared to
            traditional consultancies.
          </p>
        </motion.div>

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* LEFT CARD: HeyDots (Blue Glowing Card) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
            whileHover={{ y: -4 }}
            className="relative rounded-[18px] border border-[#2563eb]/50 bg-gradient-to-b from-[#0b1938]/95 via-[#071024]/95 to-[#060a17]/95 overflow-hidden shadow-[0_20px_60px_rgba(37,99,235,0.18)] flex flex-col"
          >
            {/* Subtle top-left blue radial spotlight */}
            <div
              className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-45"
              style={{
                background:
                  'radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0) 70%)',
              }}
            />

            {/* Card Header */}
            <div className="relative z-10 p-6 sm:p-7 border-b border-[#1e3a8a]/40">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-7 h-7 rounded-[8px] bg-[#1d4ed8]/30 border border-[#3b82f6]/50 flex items-center justify-center text-[#60a5fa] shadow-[0_0_14px_rgba(59,130,246,0.4)]">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="font-pacifico text-[21px] text-white tracking-[0.01em]">
                  HeyDots
                </h3>
              </div>
              <p className="text-[13px] sm:text-[13.5px] text-[#9ca5b5] leading-[1.55]">
                <span className="font-pacifico text-[#d5dce6]">HeyDots</span> delivers superior AI
                automation solutions that drive measurable business outcomes with guaranteed ROI
                and transparent results.
              </p>
            </div>

            {/* 6 Advantage Rows */}
            <div className="relative z-10 divide-y divide-[#1e3a8a]/35 flex-1 flex flex-col justify-between">
              {HEYDOTS_ADVANTAGES.map((item, idx) => {
                const isActive = activeRow === idx;
                return (
                  <div
                    key={item}
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`flex items-center gap-3.5 px-6 sm:px-7 py-4 text-[13px] sm:text-[13.5px] transition-all duration-300 ${
                      isActive
                        ? 'comparison-advantage-active bg-[#1e3a8a]/25 text-white translate-x-1.5'
                        : 'text-[#d5dce6]'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-[#1d4ed8]/25 border border-[#3b82f6]/60 flex items-center justify-center text-[#60a5fa] shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.35)]">
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="font-medium">{item}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT CARD: Competitor (Red/Crimson Glowing Card) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.7, delay: 0.08 }}
            whileHover={{ y: -4 }}
            className="relative rounded-[18px] border border-[#dc2626]/40 bg-gradient-to-b from-[#230b12]/90 via-[#12070c]/95 to-[#08060c]/95 overflow-hidden shadow-[0_20px_60px_rgba(220,38,38,0.12)] flex flex-col"
          >
            {/* Subtle top-right crimson spotlight */}
            <div
              className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-40"
              style={{
                background:
                  'radial-gradient(circle, rgba(239,68,68,0.3) 0%, rgba(239,68,68,0) 70%)',
              }}
            />

            {/* Card Header */}
            <div className="relative z-10 p-6 sm:p-7 border-b border-[#7f1d1d]/35">
              <div className="flex items-center gap-2.5 mb-3">
                <h3 className="text-[20px] font-semibold text-[#f3f5fa] tracking-[-0.02em]">
                  Competitor
                </h3>
              </div>
              <p className="text-[13px] sm:text-[13.5px] text-[#9ca5b5] leading-[1.55]">
                Traditional automation consultancies often over-promise and under-deliver, leaving
                businesses frustrated with unclear results.
              </p>
            </div>

            {/* 6 Drawback Rows */}
            <div className="relative z-10 divide-y divide-[#7f1d1d]/30 flex-1 flex flex-col justify-between">
              {COMPETITOR_DRAWBACKS.map((item, idx) => {
                const isActive = activeRow === idx;
                return (
                  <div
                    key={item}
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`flex items-center gap-3.5 px-6 sm:px-7 py-4 text-[13px] sm:text-[13.5px] transition-all duration-300 ${
                      isActive
                        ? 'comparison-drawback-active bg-[#7f1d1d]/20 text-[#f3f5fa] translate-x-1.5'
                        : 'text-[#aeb5c0]'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-[#991b1b]/25 border border-[#ef4444]/55 flex items-center justify-center text-[#f87171] shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          d="M6 6l12 12M18 6L6 18"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Horizontal Section Divider Line matching Image 4 */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#1e3a8a]/50 to-transparent" />

      {/* ====================================================================
          PART 2: CASE STUDY — How we transformed these businesses
          ==================================================================== */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#0f1d3d] border border-[#3b82f6]/40 text-[11.5px] font-medium text-[#93c5fd] shadow-[0_0_20px_rgba(59,130,246,0.25)] mb-4">
            Case Study
          </span>

          <h2
            className="text-[#f3f5fa] font-semibold tracking-[-0.03em] leading-[1.12] max-w-[520px] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.1rem)' }}
          >
            How we transformed
            <br />
            these businesses
          </h2>

          <p className="text-[14px] sm:text-[15px] text-[#9ca5b5] leading-[1.6] max-w-[490px]">
            Don’t just take our word for it. See how{' '}
            <span className="font-pacifico text-[#e2e8f0]">HeyDots</span> has helped companies
            across industries eliminate manual work.
          </p>
        </motion.div>

        {/* 2-Column Case Study Analytics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* LEFT CASE STUDY CARD: IT services & software development */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
            whileHover={{ y: -5 }}
            onMouseEnter={() => setHoveredTransformCard(0)}
            onMouseLeave={() => setHoveredTransformCard(null)}
            onClick={() => onOpenContact('IT Services & Software Automation Case Study')}
            className="group rounded-[20px] border border-[#1e3a8a]/50 hover:border-[#3b82f6]/65 bg-gradient-to-b from-[#081229]/95 to-[#050a17]/95 p-5 sm:p-7 shadow-[0_20px_55px_rgba(0,0,0,0.65)] hover:shadow-[0_24px_65px_rgba(37,99,235,0.2)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            {/* Top Inner Analytics Widget: Solutions & Result */}
            <div className="rounded-[15px] border border-[#1e3a8a]/45 bg-gradient-to-b from-[#0b1938] to-[#071024] p-4 sm:p-5 mb-6 shadow-inner">
              {/* Widget Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#2563eb] flex items-center justify-center text-white shadow-[0_0_16px_rgba(37,99,235,0.75)]">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[14px] font-medium text-[#f3f5fa]">
                    Solutions &amp; Result
                  </span>
                </div>
                <span className="text-[#64748b] text-lg leading-none select-none">⋮</span>
              </div>

              {/* Inner Chart Panel */}
              <div className="rounded-[12px] bg-[#060c1c]/90 border border-white/[0.06] p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 items-center gap-5">
                {/* Multi-Segment Donut Chart (80.9% Total) */}
                <div className="sm:col-span-5 flex items-center justify-center">
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <motion.svg
                      animate={{ rotate: hoveredTransformCard === 0 ? 12 : 0 }}
                      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                      className="w-full h-full -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="9"
                      />
                      {/* Green Segment (Cost Reduction) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="9"
                        strokeDasharray="92 240"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                      />
                      {/* Purple Segment (Weekly Savings) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="9"
                        strokeDasharray="68 240"
                        strokeDashoffset="-100"
                        strokeLinecap="round"
                      />
                      {/* Amber Segment (Return ROI) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="9"
                        strokeDasharray="55 240"
                        strokeDashoffset="-176"
                        strokeLinecap="round"
                      />
                    </motion.svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[15px] font-bold text-white leading-tight">
                        <CountUp to={80.9} decimals={1} suffix="%" loopMs={6000} />
                      </span>
                      <span className="text-[10px] text-[#9ca5b5]">Total</span>
                    </div>
                  </div>
                </div>

                {/* Right Legend Metrics */}
                <div className="sm:col-span-7 flex flex-col gap-3">
                  {DONUT_LEGEND_ITEMS.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex items-center justify-between gap-2 text-[12.5px]"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: metric.color }}
                        />
                        <span className="text-[#9ca5b5]">{metric.label}</span>
                      </div>
                      <span className="font-mono-tech font-semibold text-[#f3f5fa]">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Case Study Description */}
            <div>
              <h3 className="text-[18px] sm:text-[19px] font-semibold text-[#f3f5fa] group-hover:text-white tracking-[-0.015em] mb-2.5">
                IT services &amp; software development
              </h3>
              <p className="text-[13.5px] text-[#9ca5b5] leading-[1.6]">
                TechFlow Solutions was drowning in manual processes that were killing their growth
                potential. Their development team spent 60+ hours weekly on administrative tasks
                instead of building.
              </p>
            </div>
          </motion.div>

          {/* RIGHT CASE STUDY CARD: Manufacturing & supply chain */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.7, delay: 0.08 }}
            whileHover={{ y: -5 }}
            onMouseEnter={() => setHoveredTransformCard(1)}
            onMouseLeave={() => setHoveredTransformCard(null)}
            onClick={() => onOpenContact('Manufacturing & Supply Chain Automation Case Study')}
            className="group rounded-[20px] border border-[#1e3a8a]/50 hover:border-[#3b82f6]/65 bg-gradient-to-b from-[#081229]/95 to-[#050a17]/95 p-5 sm:p-7 shadow-[0_20px_55px_rgba(0,0,0,0.65)] hover:shadow-[0_24px_65px_rgba(37,99,235,0.2)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            {/* Top Inner Analytics Widget: Total Inventory */}
            <div className="rounded-[15px] border border-[#1e3a8a]/45 bg-gradient-to-b from-[#0b1938] to-[#071024] p-4 sm:p-5 mb-6 shadow-inner">
              {/* Widget Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-[#2563eb] flex items-center justify-center text-white shadow-[0_0_16px_rgba(37,99,235,0.75)]">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path
                        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-[14px] font-medium text-[#f3f5fa]">Total Inventory</span>
                </div>
                <span className="text-[#64748b] text-lg leading-none select-none">⋮</span>
              </div>

              {/* Inner KPI + 3 Mini Sub-Cards */}
              <div className="rounded-[12px] bg-[#060c1c]/90 border border-white/[0.06] p-4 sm:p-5 space-y-4">
                {/* Top KPI Row: $35K | ↗ 25.4% | Increase from last month */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[20px] font-bold text-white tracking-tight"><CountUp to={35} prefix="$" suffix="K" loopMs={6000} /></span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#10b981]/15 text-[#34d399] font-mono-tech text-[11px] font-semibold">
                    ↗ 25.4%
                  </span>
                  <span className="text-[11px] text-[#9ca5b5]">Increase from last month</span>
                </div>

                {/* 3 Segmented Barcode Metric Sub-Cards */}
                <div className="grid grid-cols-3 gap-2.5">
                  {INVENTORY_SUB_CARDS.map((sub) => (
                    <div
                      key={sub.label}
                      className="rounded-[9px] bg-[#0b152b] border border-white/[0.06] p-2.5 flex flex-col justify-between"
                    >
                      <div>
                        <p className="text-[13px] sm:text-[14px] font-bold text-white leading-tight">
                          {sub.value}
                        </p>
                        <p className="text-[9.5px] text-[#9ca5b5] truncate mt-0.5 mb-2">
                          {sub.label}
                        </p>
                      </div>

                      {/* Segmented Barcode Bars */}
                      <div className="flex items-center gap-[2px] h-3">
                        {Array.from({ length: sub.totalBars }).map((_, barIdx) => {
                          const isFilled =
                            barIdx <
                            (hoveredTransformCard === 1
                              ? Math.min(sub.totalBars, sub.activeBars + 1)
                              : sub.activeBars);
                          return (
                            <span
                              key={barIdx}
                              className={`flex-1 h-full rounded-[1px] transition-colors duration-300 ${
                                isFilled ? sub.activeColor : 'bg-white/10'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Case Study Description */}
            <div>
              <h3 className="text-[18px] sm:text-[19px] font-semibold text-[#f3f5fa] group-hover:text-white tracking-[-0.015em] mb-2.5">
                Manufacturing &amp; supply chain
              </h3>
              <p className="text-[13.5px] text-[#9ca5b5] leading-[1.6]">
                NexaCorp was losing $75K monthly due to inventory management errors, manual quality
                control processes, and disconnected systems that created operational chaos.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
