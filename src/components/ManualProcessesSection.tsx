import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ManualProcessesSectionProps {
  onOpenContact: (defaultPlan?: string) => void;
}

export const ManualProcessesSection: React.FC<ManualProcessesSectionProps> = ({
  onOpenContact,
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [autoPulseCard, setAutoPulseCard] = useState(0);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setAutoPulseCard((prev) => (prev + 1) % 4);
    }, 2400);
    return () => window.clearInterval(timer);
  }, []);

  const activeCard = hoveredCard !== null ? hoveredCard : autoPulseCard;

  return (
    <section className="max-w-[1200px] mx-auto px-5 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* LEFT STICKY COLUMN: Badge + Two-Tone Heading + Subtitle + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
          className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-start"
        >
          {/* Small Circular 4-Point Star Badge */}
          <div className="w-8 h-8 rounded-full bg-[#151927] border border-white/12 shadow-[0_4px_14px_rgba(0,0,0,0.45)] flex items-center justify-center mb-6">
            <svg
              className="w-3.5 h-3.5 text-[#f3f5fa]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
            </svg>
          </div>

          {/* Two-Tone Heading: "Manual Processes Are Slowing Your Growth." */}
          <h2
            className="font-medium tracking-[-0.035em] leading-[1.08] mb-5"
            style={{ fontSize: 'clamp(2.2rem, 4.1vw, 3.3rem)' }}
          >
            <span className="text-[#f3f5fa]">Manual Processes </span>
            <span className="text-[#7c8596]">Are Slowing Your Growth.</span>
          </h2>

          <p className="text-[14.5px] sm:text-[15.5px] text-[#9ca5b5] leading-[1.6] max-w-[390px] mb-8">
            Disconnected tools, repetitive admin work reduce team efficiency and limit scale.
          </p>

          <button
            type="button"
            onClick={() => onOpenContact('Fix Manual Processes')}
            className="strategy-cta-btn group inline-flex items-center min-h-[44px] rounded-[11px] bg-[#121521] hover:bg-[#191d2e] border border-white/15 hover:border-[#8b5cf6]/60 p-1.5 pl-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            <span className="strategy-cta-label text-[13.5px] font-medium text-[#f3f5fa] pr-3.5 whitespace-nowrap">
              See How We Fix This
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

        {/* RIGHT COLUMN: 4 Sticky-Stacking Cards (Matches Screenshots 1 & 2) */}
        <div className="lg:col-span-7 flex flex-col gap-6 pb-6">
          {/* CARD 1: Manual Handoffs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.65 }}
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
            className="lg:sticky lg:top-[104px] z-10 group rounded-[22px] border border-dashed border-white/[0.15] hover:border-[#8b5cf6]/50 bg-[#0d111d]/95 backdrop-blur-xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.75)] transition-colors duration-300"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-6 pr-2">
                <h3 className="text-[19px] sm:text-[21px] font-medium text-[#f3f5fa] tracking-[-0.02em] mb-2.5">
                  Manual Handoffs
                </h3>
                <p className="text-[14px] text-[#9ca5b5] leading-[1.55] max-w-[230px]">
                  Manual handoffs lead to delays and costly errors.
                </p>
              </div>

              {/* Right Graphic: 3 Stacked Handoff Status Pills */}
              <div className="sm:col-span-6 rounded-[15px] bg-[#151a2b] border border-white/[0.07] h-[162px] p-4 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Vertical connector line */}
                <div className="absolute inset-y-6 left-1/2 -translate-x-1/2 w-[1.5px] bg-white/10" />

                <div className="relative z-10 flex flex-col items-center gap-2.5 w-full max-w-[235px]">
                  {/* Pill 1: Lead Captured -> Completed */}
                  <motion.div
                    animate={{ x: activeCard === 0 ? 4 : 0 }}
                    className="w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-[9px] bg-[#0e121f] border border-white/10 shadow-md text-[11px]"
                  >
                    <span className="inline-flex items-center gap-1.5 text-[#d5dce6] font-medium truncate">
                      <span className="text-[10px] text-[#858b94]">∞</span>
                      Lead Captured
                    </span>
                    <span className="px-2 py-0.5 rounded-[5px] bg-[#22c55e]/20 text-[#4ade80] border border-[#22c55e]/30 font-medium text-[10px] shrink-0">
                      Completed
                    </span>
                  </motion.div>

                  {/* Pill 2: Assigned -> Loading */}
                  <motion.div
                    animate={{ x: activeCard === 0 ? -4 : 0 }}
                    className="w-[88%] flex items-center justify-between gap-2 px-3 py-1.5 rounded-[9px] bg-[#0e121f] border border-white/10 shadow-md text-[11px]"
                  >
                    <span className="inline-flex items-center gap-1.5 text-[#d5dce6] font-medium truncate">
                      <span className="text-[10px] text-[#858b94]">↳</span>
                      Assigned
                    </span>
                    <span className="px-2 py-0.5 rounded-[5px] bg-white/[0.08] text-[#aeb5c0] font-medium text-[10px] shrink-0 animate-pulse">
                      Loading
                    </span>
                  </motion.div>

                  {/* Pill 3: Proposal Sent -> Waiting */}
                  <motion.div
                    animate={{ x: activeCard === 0 ? 5 : 0 }}
                    className="w-[94%] flex items-center justify-between gap-2 px-3 py-1.5 rounded-[9px] bg-[#0e121f] border border-white/10 shadow-md text-[11px]"
                  >
                    <span className="inline-flex items-center gap-1.5 text-[#d5dce6] font-medium truncate">
                      <svg className="w-3 h-3 text-[#858b94] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="m22 2-7 20-4-9-9-4Z" strokeLinejoin="round" />
                      </svg>
                      Proposal Sent
                    </span>
                    <span className="px-2 py-0.5 rounded-[5px] bg-[#ef4444]/25 text-[#f87171] border border-[#ef4444]/35 font-medium text-[10px] shrink-0">
                      Waiting
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD 2: Slow Lead Response */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.65, delay: 0.05 }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            className="lg:sticky lg:top-[132px] z-20 group rounded-[22px] border border-dashed border-white/[0.15] hover:border-[#8b5cf6]/50 bg-[#0d111d]/95 backdrop-blur-xl p-5 sm:p-6 shadow-[0_22px_55px_rgba(0,0,0,0.8)] transition-colors duration-300"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-6 pr-2">
                <h3 className="text-[19px] sm:text-[21px] font-medium text-[#f3f5fa] tracking-[-0.02em] mb-2.5">
                  Slow Lead Response
                </h3>
                <p className="text-[14px] text-[#9ca5b5] leading-[1.55] max-w-[230px]">
                  Manual qualification slows down sales cycles.
                </p>
              </div>

              {/* Right Graphic: Stacked John (Pending) & Sarah (Waiting 2 days) Lead Cards */}
              <div className="sm:col-span-6 rounded-[15px] bg-[#151a2b] border border-white/[0.07] h-[162px] p-4 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Back Card: John - Pending */}
                <motion.div
                  animate={{
                    y: hoveredCard === 1 ? -18 : -12,
                    scale: hoveredCard === 1 ? 0.94 : 0.91,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="w-full max-w-[225px] flex items-center justify-between gap-2.5 px-3 py-2 rounded-[11px] bg-[#0e121f]/80 border border-white/[0.08] opacity-65"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/assets/clavion/r4hCpcC2BSjUh7yG1NodeQGem9k.jpg"
                      alt="John"
                      className="w-7 h-7 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="leading-tight">
                      <p className="text-[11px] font-semibold text-[#d5dce6]">John</p>
                      <p className="text-[9.5px] text-[#858b94]">New Lead</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-[6px] bg-white/[0.07] text-[9.5px] text-[#9ca5b5]">
                    Pending
                  </span>
                </motion.div>

                {/* Front Card: Sarah - Waiting 2 days */}
                <motion.div
                  animate={{
                    y: hoveredCard === 1 ? 2 : -2,
                    scale: hoveredCard === 1 ? 1.03 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="relative z-10 w-full max-w-[245px] flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-[12px] bg-[#0c0f1a] border border-white/15 shadow-[0_12px_28px_rgba(0,0,0,0.65)]"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/assets/clavion/C1EN7t1PkviRju6c2OgDIdKVBo.jpg"
                      alt="Sarah"
                      className="w-8 h-8 rounded-lg object-cover border border-white/15"
                      referrerPolicy="no-referrer"
                    />
                    <div className="leading-tight">
                      <p className="text-[12px] font-semibold text-[#f3f5fa]">Sarah</p>
                      <p className="text-[10px] text-[#9ca5b5]">New Lead</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-[6px] bg-[#ef4444]/20 border border-[#ef4444]/30 text-[10px] font-medium text-[#fca5a5] whitespace-nowrap">
                    Waiting 2 days
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* CARD 3: Limited Visibility */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.65, delay: 0.1 }}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            className="lg:sticky lg:top-[160px] z-30 group rounded-[22px] border border-dashed border-white/[0.15] hover:border-[#8b5cf6]/50 bg-[#0d111d]/95 backdrop-blur-xl p-5 sm:p-6 shadow-[0_24px_60px_rgba(0,0,0,0.85)] transition-colors duration-300"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-6 pr-2">
                <h3 className="text-[19px] sm:text-[21px] font-medium text-[#f3f5fa] tracking-[-0.02em] mb-2.5">
                  Limited Visibility
                </h3>
                <p className="text-[14px] text-[#9ca5b5] leading-[1.55] max-w-[230px]">
                  No real-time visibility into performance &amp; metrics.
                </p>
              </div>

              {/* Right Graphic: Leads / Conversion / Revenue Progress Bars */}
              <div className="sm:col-span-6 rounded-[15px] bg-[#151a2b] border border-white/[0.07] h-[162px] px-5 py-4 flex flex-col justify-center gap-3">
                {/* Bar 1: Leads */}
                <div>
                  <p className="text-[10.5px] text-[#cfd5e2] font-medium mb-1">Leads</p>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      animate={{ width: hoveredCard === 2 ? '76%' : '68%' }}
                      transition={{ duration: 0.4 }}
                      className="h-full rounded-full bg-[#9ca5b5]"
                    />
                  </div>
                </div>

                {/* Bar 2: Conversion */}
                <div>
                  <p className="text-[10.5px] text-[#cfd5e2] font-medium mb-1">Conversion</p>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      animate={{ width: hoveredCard === 2 ? '16%' : '10%' }}
                      transition={{ duration: 0.4 }}
                      className="h-full rounded-full bg-[#9ca5b5]"
                    />
                  </div>
                </div>

                {/* Bar 3: Revenue */}
                <div>
                  <p className="text-[10.5px] text-[#cfd5e2] font-medium mb-1">Revenue</p>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      animate={{ width: hoveredCard === 2 ? '4%' : '0%' }}
                      transition={{ duration: 0.4 }}
                      className="h-full rounded-full bg-[#ef4444]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARD 4: Disconnected Tools */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.65, delay: 0.14 }}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            className="lg:sticky lg:top-[188px] z-40 group rounded-[22px] border border-dashed border-white/[0.15] hover:border-[#8b5cf6]/50 bg-[#0d111d]/95 backdrop-blur-xl p-5 sm:p-6 shadow-[0_26px_65px_rgba(0,0,0,0.9)] transition-colors duration-300"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-6 pr-2">
                <h3 className="text-[19px] sm:text-[21px] font-medium text-[#f3f5fa] tracking-[-0.02em] mb-2.5">
                  Disconnected Tools
                </h3>
                <p className="text-[14px] text-[#9ca5b5] leading-[1.55] max-w-[230px]">
                  Your CRM and email tools don’t talk to each other.
                </p>
              </div>

              {/* Right Graphic: 3 App Tiles with Broken Dashed Connection & Red Error Badge */}
              <div className="sm:col-span-6 rounded-[15px] bg-[#151a2b] border border-white/[0.07] h-[162px] p-4 flex items-center justify-center">
                <div className="flex items-center gap-0">
                  {/* Left App Tile: Orange Burst Icon */}
                  <motion.div
                    animate={{ y: hoveredCard === 3 ? -2 : 0 }}
                    className="w-12 h-12 rounded-[12px] bg-[#0e121f] border border-white/10 shadow-md flex items-center justify-center"
                  >
                    <div className="w-8 h-8 rounded-[8px] bg-[#d96b43] flex items-center justify-center text-white">
                      <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" strokeLinecap="round" />
                      </svg>
                    </div>
                  </motion.div>

                  {/* Broken Red Dashed Connector Line */}
                  <div className="w-6 border-t-2 border-dashed border-[#ef4444]/80" />

                  {/* Middle App Tile: Globe with Red Error Badge */}
                  <motion.div
                    animate={{ scale: hoveredCard === 3 ? 1.06 : 1 }}
                    className="relative w-12 h-12 rounded-[12px] bg-[#0e121f] border border-[#ef4444]/40 shadow-md flex items-center justify-center"
                  >
                    {/* Red X Error Badge */}
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#ef4444] text-white text-[9px] font-bold flex items-center justify-center shadow-[0_0_10px_#ef4444]">
                      ✕
                    </span>
                    <svg className="w-6 h-6 text-[#d5dce6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 0 0 0 18M12 3a14.5 14.5 0 0 1 0 18" />
                    </svg>
                  </motion.div>

                  {/* Muted Gray Dashed Connector Line */}
                  <div className="w-6 border-t-2 border-dashed border-white/20" />

                  {/* Right App Tile: Notion-style Cube 'N' Icon */}
                  <motion.div
                    animate={{ y: hoveredCard === 3 ? 2 : 0 }}
                    className="w-12 h-12 rounded-[12px] bg-[#0e121f] border border-white/10 shadow-md flex items-center justify-center"
                  >
                    <div className="w-7 h-7 rounded-[6px] border border-[#9ca5b5]/60 flex items-center justify-center text-[13px] font-serif font-bold text-[#d5dce6]">
                      N
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
