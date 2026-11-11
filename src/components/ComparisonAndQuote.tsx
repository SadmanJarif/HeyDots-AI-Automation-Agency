import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DIY_CHAOS_ICONS, GUARDRAIL_NODES } from '../data/clavionData';

export const ComparisonAndQuote: React.FC = () => {
  const [hoveredGuardrail, setHoveredGuardrail] = useState<string | null>(null);
  const [autoGuardrailIdx, setAutoGuardrailIdx] = useState(0);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setAutoGuardrailIdx((prev) => (prev + 1) % GUARDRAIL_NODES.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="architecture" className="max-w-[1200px] mx-auto px-4 sm:px-5 py-10 scroll-mt-20 overflow-hidden">
      {/* Problem vs Solution 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
        {/* Left Card: [ DIY - QUICK HACKS ] */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="premium-interactive-card rounded-[18px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-5 sm:p-8 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
        >
          <div>
            <p className="font-mono-tech text-[12px] uppercase tracking-[0.08em] text-[#aeb5c0] mb-5">
              [ DIY - QUICK HACKS ]
            </p>

            {/* Floating Chaos App Icons Box */}
            <div className="relative h-[240px] w-full rounded-[14px] bg-[#0c0f17] border border-white/[0.05] overflow-hidden mb-6">
              {/* Subtle radial glow & tangled dashed lines */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(224, 99, 104, 0.08) 0%, rgba(10, 13, 20, 0) 70%)',
                }}
              />
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
                viewBox="0 0 480 240"
                fill="none"
              >
                <path
                  d="M60 50 C 140 20, 180 120, 250 45 C 320 -10, 350 140, 420 95"
                  stroke="#aeb5c0"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <path
                  d="M85 155 C 165 210, 220 95, 315 165 C 360 195, 405 125, 435 160"
                  stroke="#e06368"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
              </svg>
              {DIY_CHAOS_ICONS.map((item, index) => (
                <img
                  key={item.id}
                  src={item.src}
                  alt="Integration icon"
                  className="absolute object-contain transition-transform duration-500 hover:scale-110"
                  style={{
                    width: `${item.size}px`,
                    height: `${item.size}px`,
                    top: item.top,
                    left: item.left,
                    transform: `rotate(${item.rotate}deg)`,
                    animation: `float-slow ${4 + (index % 3)}s ease-in-out infinite`,
                  }}
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[22px] sm:text-[26px] font-medium tracking-[-0.02em] text-clavion-gradient mb-4">
              Looks Easy. Breaks Under Pressure.
            </h2>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {['Tool limits', 'No validation', 'Hard to debug'].map((label) => (
                <div key={label} className="flex items-center gap-2 text-[13px] text-[#aeb5c0]">
                  <img
                    src="/assets/clavion/raEIKL9kAGmcg0RU6fWpgzBzYs.svg"
                    alt={`${label} warning indicator`}
                    className="w-3.5 h-3.5 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Card: [ HeyDots - GUARDRAILS ] */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          className="premium-interactive-card rounded-[18px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-5 sm:p-8 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
        >
          <div>
            <p className="font-mono-tech text-[12px] uppercase tracking-[0.08em] text-[#aeb5c0] mb-5 flex items-center gap-1.5">
              <span>[</span>
              <span className="font-pacifico normal-case tracking-[0.01em] text-[15px] text-[#f3f5fa]">
                HeyDots
              </span>
              <span>- GUARDRAILS ]</span>
            </p>

            {/* Structured Guardrails Diagram with Animated Cross-Line Pulses */}
            <div className="relative h-[240px] w-full rounded-[14px] bg-[#0c0f17] border border-white/[0.05] p-4 flex flex-col justify-between overflow-hidden mb-6">
              {/* Horizontal Track + Animated Light Pulse */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative w-[78%] h-[1px] bg-white/[0.08] overflow-hidden">
                  <div
                    className="animate-pulse-x w-28 h-full"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(10,13,20,0) 0%, #ffc300 40%, #e06368 75%, rgba(10,13,20,0) 100%)',
                    }}
                  />
                </div>
              </div>

              {/* Vertical Track + Animated Light Pulse */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative h-[78%] w-[1px] bg-white/[0.08] overflow-hidden">
                  <div
                    className="animate-pulse-y h-24 w-full"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(10,13,20,0) 0%, #66bcd3 40%, #ff72e5 75%, rgba(10,13,20,0) 100%)',
                    }}
                  />
                </div>
              </div>

              {/* 2x2 Grid of Guardrail Nodes */}
              <div className="relative z-10 grid grid-cols-2 gap-3 h-full">
                {GUARDRAIL_NODES.map((node, nodeIdx) => {
                  const isRight = node.position.includes('right');
                  const isBottom = node.position.includes('bottom');
                  const isHovered =
                    hoveredGuardrail !== null
                      ? hoveredGuardrail === node.id
                      : autoGuardrailIdx === nodeIdx;
                  const cornerPos =
                    node.position === 'top-left'
                      ? 'bottom-0 right-0'
                      : node.position === 'top-right'
                      ? 'bottom-0 left-0'
                      : node.position === 'bottom-left'
                      ? 'top-0 right-0'
                      : 'top-0 left-0';
                  return (
                    <div
                      key={node.id}
                      onMouseEnter={() => setHoveredGuardrail(node.id)}
                      onMouseLeave={() => setHoveredGuardrail(null)}
                      className={`relative overflow-hidden rounded-[12px] bg-[#161920]/95 border transition-all duration-300 p-3 flex flex-col justify-between ${
                        isHovered
                          ? 'border-white/25 -translate-y-0.5 shadow-lg'
                          : 'border-[#858b94]/20'
                      } ${isRight ? 'items-end text-right' : 'items-start text-left'} ${
                        isBottom ? 'flex-col-reverse' : ''
                      }`}
                    >
                      <img
                        src={node.icon}
                        alt={`${node.title} icon`}
                        className="w-6 h-5 object-contain relative z-10"
                        referrerPolicy="no-referrer"
                      />
                      <div className="relative z-10">
                        <p className="text-[12px] sm:text-[13px] font-medium text-[#edf0f5] leading-snug">
                          {node.title}
                        </p>
                        <p className="text-[11px] text-[#858b94] mt-0.5">{node.subtitle}</p>
                      </div>
                      <img
                        src={node.shape}
                        alt={`${node.title} corner accent`}
                        className={`pointer-events-none absolute w-12 h-12 object-contain opacity-90 transition-transform duration-300 ${
                          isHovered ? 'scale-110' : 'scale-100'
                        } ${cornerPos}`}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Center HeyDots Hub */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="px-3.5 h-12 rounded-2xl bg-[#161920] border border-white/15 shadow-[0_0_25px_rgba(102,188,211,0.22)] flex items-center justify-center">
                  <span className="font-pacifico text-[16px] text-[#f3f5fa] tracking-[0.01em] whitespace-nowrap">
                    HeyDots
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[22px] sm:text-[26px] font-medium tracking-[-0.02em] text-clavion-gradient mb-4">
              Engineered, Observable, Safe
            </h2>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {['Validated outputs', 'Safe actions', 'Tracked updates'].map((label) => (
                <div key={label} className="flex items-center gap-2 text-[13px] text-[#aeb5c0]">
                  <img
                    src="/assets/clavion/l3i5eMhJcu73L5jNg7i3Dpo3bg.svg"
                    alt={`${label} verified check`}
                    className="w-3.5 h-3.5 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rated 5 Star Quote Banner with Dot-Grid Frame */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[18px] overflow-hidden py-10 sm:py-12 px-5 sm:px-6 flex flex-col items-center text-center border border-[#858b94]/20 bg-[#0c0f17]/60"
      >
        <img
          src="/assets/clavion/r5potKirfvn8BYMPvQoN9Zv2Ng.svg"
          alt="Quote banner dot-grid background pattern"
          className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />

        <div className="relative z-10 flex flex-col items-center max-w-[540px]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161920] border border-[#858b94]/25 mb-5">
            <img
              src="/assets/clavion/tUSKawIJsWy4bKNBKdv61FH0BE.svg"
              alt="Star"
              className="w-3.5 h-3.5 object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#edf0f5]">
              RATED 5 STAR BY 120+ CLIENTS
            </span>
          </div>

          <p className="text-[19px] sm:text-[22px] font-medium leading-[1.4] tracking-[-0.01em] text-clavion-gradient mb-5">
            “Great technology matters, but true impact comes from understanding the problem first.”
          </p>

          <div className="flex items-center gap-2.5">
            <img
              src="/assets/clavion/VF9V184MwL6lVi1H5HxAgomY5M.jpg"
              alt="Ethan Parker"
              className="w-6 h-6 rounded-full object-cover border border-white/15"
              referrerPolicy="no-referrer"
            />
            <span className="text-[13px] text-[#aeb5c0]">Ethan Parker, CEO</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
