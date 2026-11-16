import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { SectionKicker } from './RainbowButton';

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

interface BentoShellProps {
  className?: string;
  delay?: number;
  children: React.ReactNode;
  spotlightColor?: string;
}

const BentoShell: React.FC<BentoShellProps> = ({
  className = '',
  delay = 0,
  children,
  spotlightColor = 'rgba(139, 92, 246, 0.14)',
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!spotlightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.opacity = '1';
    spotlightRef.current.style.background = `radial-gradient(340px circle at ${x}px ${y}px, ${spotlightColor}, transparent 72%)`;
  };

  const handlePointerLeave = () => {
    if (!spotlightRef.current) return;
    spotlightRef.current.style.opacity = '0';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: SMOOTH_EASE, delay }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group relative min-w-0 overflow-hidden rounded-[18px] border border-white/[0.08] hover:border-[#8b5cf6]/45 bg-gradient-to-b from-[#13141b]/95 via-[#0e0f14]/98 to-[#090a0e]/98 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_18px_45px_rgba(0,0,0,0.65)] transition-[border-color,box-shadow] duration-300 ${className}`}
    >
      {/* Subtle reactive pointer radial sheen (no React re-renders) */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
      />
      {/* Faint ambient star-dust texture matching reference cards */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.32) 1px, transparent 1px), radial-gradient(rgba(167,139,250,0.28) 1px, transparent 1px)',
          backgroundSize: '42px 42px, 68px 68px',
          backgroundPosition: '8px 14px, 29px 41px',
        }}
      />
      {children}
    </motion.div>
  );
};

/* ============================================================================
   CARD 1: PERFORMANCES — Boost organic revenue (Animated Glowing Equalizer)
   ============================================================================ */

const TOTAL_PERF_BARS = 28;

const PerformancesCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const amountRef = useRef<HTMLSpanElement | null>(null);
  const percentRef = useRef<HTMLSpanElement | null>(null);
  const bloomRef = useRef<HTMLDivElement | null>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverProgressRef = useRef<number | null>(null);
  const inViewRef = useRef(true);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let currentRatio = 0.59; // Matches $284k / +18.6% at rest
    let rafId = 0;
    const startTime = performance.now();

    const applyVisuals = (ratio: number) => {
      const clamped = Math.max(0.04, Math.min(0.96, ratio));
      const litFloat = clamped * TOTAL_PERF_BARS;
      const tipIndex = Math.max(0, Math.min(TOTAL_PERF_BARS - 1, Math.round(litFloat) - 1));

      // Revenue & Delta synced cleanly to equalizer progression ($284k & +18.6% around 59%)
      const revenueK = Math.round(8 + Math.pow(clamped, 1.04) * 468);
      const deltaPct = (0.4 + clamped * 30.8).toFixed(1);

      if (amountRef.current) {
        amountRef.current.textContent = `$${revenueK}k`;
      }
      if (percentRef.current) {
        percentRef.current.textContent = `+${deltaPct}%`;
      }

      if (bloomRef.current) {
        const tipPct = ((tipIndex + 0.5) / TOTAL_PERF_BARS) * 100;
        bloomRef.current.style.left = `${tipPct}%`;
      }

      for (let i = 0; i < TOTAL_PERF_BARS; i++) {
        const el = barRefs.current[i];
        if (!el) continue;

        const distFromTip = tipIndex - i;
        if (i > tipIndex) {
          // Unlit trailing bars
          el.style.background = 'rgba(120, 92, 185, 0.2)';
          el.style.boxShadow = 'none';
          el.style.transform = 'scaleY(1)';
        } else if (distFromTip === 0) {
          // Leading incandescent bar
          el.style.background =
            'linear-gradient(180deg, #ffffff 0%, #f3e8ff 45%, #d8b4fe 100%)';
          el.style.boxShadow =
            '0 0 18px rgba(243, 232, 255, 0.9), 0 0 34px rgba(168, 85, 247, 0.85)';
          el.style.transform = 'scaleY(1.04)';
        } else if (distFromTip <= 2) {
          // Hot glow trail right behind leading tip
          el.style.background =
            'linear-gradient(180deg, #f3e8ff 0%, #d8b4fe 45%, #a855f7 100%)';
          el.style.boxShadow = '0 0 14px rgba(192, 132, 252, 0.65)';
          el.style.transform = 'scaleY(1.02)';
        } else {
          // Lit purple gradient bars
          el.style.background =
            'linear-gradient(180deg, #a855f7 0%, #8b5cf6 52%, #7c3aed 100%)';
          el.style.boxShadow = '0 0 10px rgba(139, 92, 246, 0.25)';
          el.style.transform = 'scaleY(1)';
        }
      }
    };

    if (prefersReduced) {
      applyVisuals(0.59);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        inViewRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(node);

    const tick = (now: number) => {
      if (inViewRef.current) {
        let targetRatio: number;
        if (hoverProgressRef.current !== null) {
          targetRatio = hoverProgressRef.current;
        } else {
          // 6.4s smooth wave matching the reference cadence ($38k -> $284k -> $274k -> smooth reset)
          const cycle = ((now - startTime) % 6400) / 6400;
          if (cycle < 0.36) {
            // Smooth cubic rise from 0.07 to 0.60
            const u = cycle / 0.36;
            const ease = 1 - Math.pow(1 - u, 3);
            targetRatio = 0.07 + ease * 0.53;
          } else if (cycle < 0.72) {
            // Organic plateau fluctuation around $272k-$292k
            const u = (cycle - 0.36) / 0.36;
            targetRatio = 0.6 + Math.sin(u * Math.PI * 2) * 0.028;
          } else {
            // Smooth glide down to base before sweeping up again
            const u = (cycle - 0.72) / 0.28;
            const ease = u * u * (3 - 2 * u);
            targetRatio = 0.6 - ease * 0.53;
          }
        }

        // Smooth Exponential interpolation for zero jitter even on pointer enter/leave
        currentRatio += (targetRatio - currentRatio) * 0.14;
        applyVisuals(currentRatio);
      }
      rafId = window.requestAnimationFrame(tick);
    };

    applyVisuals(currentRatio);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleBarPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rel = (e.clientX - rect.left) / Math.max(1, rect.width);
    hoverProgressRef.current = Math.max(0.05, Math.min(0.95, rel));
  };

  const handleBarPointerLeave = () => {
    hoverProgressRef.current = null;
  };

  return (
    <BentoShell
      className="md:col-span-2 lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-1 p-5 sm:p-6 flex flex-col justify-between min-h-[255px] lg:h-full"
      delay={0.02}
      spotlightColor="rgba(168, 85, 247, 0.14)"
    >
      <div ref={containerRef} className="relative z-10 flex flex-col justify-between h-full gap-4">
        <div>
          <p className="text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.08em] text-[#787f8e] mb-1.5">
            PERFORMANCES
          </p>
          <h3 className="text-[17px] sm:text-[19px] font-medium text-[#f3f5fa] tracking-[-0.02em] mb-1">
            Boost organic revenue
          </h3>
          <p className="text-[12.5px] sm:text-[13px] text-[#8f96a6] leading-[1.45] max-w-[540px]">
            It connects the SEO data directly to business/money growth rather than just showing technical metrics.
          </p>
        </div>

        {/* Live Counter Row + Equalizer Meter */}
        <div>
          <div className="flex items-baseline justify-between mb-2.5 px-0.5">
            <span
              ref={amountRef}
              className="text-[28px] sm:text-[32px] font-medium tracking-[-0.03em] text-white leading-none tabular-nums"
            >
              $284k
            </span>
            <span
              ref={percentRef}
              className="text-[14px] sm:text-[15.5px] font-medium text-[#5ad396] leading-none tabular-nums"
            >
              +18.6%
            </span>
          </div>

          <div
            onPointerMove={handleBarPointerMove}
            onPointerLeave={handleBarPointerLeave}
            role="img"
            aria-label="Interactive organic revenue equalizer showing growth up to $284k and +18.6%"
            className="relative h-[54px] sm:h-[56px] flex items-end gap-[3px] sm:gap-[5px] md:gap-[6px] cursor-ew-resize select-none"
          >
            {/* Soft radial purple-white flare behind leading bar */}
            <div
              ref={bloomRef}
              className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full blur-xl opacity-85"
              style={{
                left: '58%',
                background:
                  'radial-gradient(circle, rgba(233, 213, 255, 0.72) 0%, rgba(139, 92, 246, 0.42) 45%, rgba(139, 92, 246, 0) 75%)',
              }}
            />

            {Array.from({ length: TOTAL_PERF_BARS }).map((_, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  barRefs.current[idx] = el;
                }}
                className="relative z-10 flex-1 h-full rounded-[3px] sm:rounded-[4px] origin-bottom transition-[transform] duration-150 ease-out"
                style={{
                  background:
                    idx < 17
                      ? 'linear-gradient(180deg, #a855f7 0%, #8b5cf6 52%, #7c3aed 100%)'
                      : 'rgba(120, 92, 185, 0.2)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </BentoShell>
  );
};

/* ============================================================================
   CARD 2: CENTER HERO METRIC — $27B Business growth + 3-Row Pill Streams
   ============================================================================ */

interface PillToken {
  text?: string;
  spacerWidth?: string;
}

const GROWTH_PILL_ROWS: { direction: 'left' | 'right'; items: PillToken[] }[] = [
  {
    direction: 'left',
    items: [
      { spacerWidth: 'w-14 sm:w-16' },
      { text: '92% of users' },
      { spacerWidth: 'w-10 sm:w-12' },
      { text: '500K+ keywords' },
      { spacerWidth: 'w-16 sm:w-20' },
    ],
  },
  {
    direction: 'right',
    items: [
      { spacerWidth: 'w-16 sm:w-20' },
      { text: '38% average growth' },
      { spacerWidth: 'w-14 sm:w-16' },
      { spacerWidth: 'w-20 sm:w-24' },
    ],
  },
  {
    direction: 'left',
    items: [
      { spacerWidth: 'w-16 sm:w-20' },
      { spacerWidth: 'w-12 sm:w-14' },
      { text: '2.4M+ backlinks' },
      { spacerWidth: 'w-16 sm:w-20' },
    ],
  },
];

const BusinessGrowthCard: React.FC = () => {
  return (
    <BentoShell
      className="md:col-span-1 lg:col-start-2 lg:col-span-1 lg:row-start-2 lg:row-span-1 min-h-[265px] sm:min-h-[285px] lg:h-full flex flex-col justify-between"
      delay={0.08}
      spotlightColor="rgba(56, 189, 248, 0.16)"
    >
      {/* Top Oceanic / Cyan Radial Atmosphere matching reference */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(115% 75% at 50% 0%, rgba(49, 131, 173, 0.45) 0%, rgba(23, 66, 94, 0.25) 45%, rgba(10, 11, 16, 0) 78%)',
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full pt-6 sm:pt-7 pb-5">
        {/* Hero $27B Metric */}
        <div className="flex flex-col items-center text-center px-5 mb-4">
          <div
            className="font-bold tracking-[-0.04em] leading-none select-none transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            style={{
              fontSize: 'clamp(3rem, 4.6vw, 3.85rem)',
              backgroundImage:
                'linear-gradient(180deg, #9ad6ef 0%, #5e93ae 55%, #274050 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 8px 24px rgba(56, 189, 248, 0.14))',
            }}
          >
            $27B
          </div>
          <p className="text-[15px] sm:text-[16.5px] font-medium text-[#b8cedc] tracking-[-0.01em] mt-1.5">
            Business growth
          </p>
        </div>

        {/* 3 Horizontal Marquee Rows of Dark Frosted Glass Pills */}
        <div
          className="group/pills relative w-full flex flex-col gap-2.5 overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)',
          }}
        >
          {GROWTH_PILL_ROWS.map((row, rowIdx) => {
            const loopItems = [...row.items, ...row.items, ...row.items];
            return (
              <div key={rowIdx} className="w-full overflow-hidden">
                <div
                  className={
                    row.direction === 'left'
                      ? 'animate-marquee-slow-left flex items-center gap-2.5'
                      : 'animate-marquee-slow-right flex items-center gap-2.5'
                  }
                >
                  {loopItems.map((token, idx) =>
                    token.text ? (
                      <span
                        key={`${rowIdx}-${idx}`}
                        className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] text-[11px] font-medium text-[#9cb0c0] whitespace-nowrap shrink-0 group-hover:border-white/[0.14] group-hover:text-[#c7d9e7] transition-colors"
                      >
                        {token.text}
                      </span>
                    ) : (
                      <span
                        key={`${rowIdx}-${idx}`}
                        aria-hidden="true"
                        className={`${token.spacerWidth || 'w-14'} h-[27px] rounded-full bg-white/[0.025] border border-white/[0.05] shrink-0`}
                      />
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BentoShell>
  );
};

/* ============================================================================
   CARD 3: INTEGRATIONS — Connect everything (Vertical Conveyor & Brand Icons)
   ============================================================================ */

type IntegrationKey =
  | 'slack'
  | 'asana'
  | 'zapier'
  | 'vscode'
  | 'vimeo'
  | 'gmail'
  | 'claude'
  | 'figma';

interface IntegrationNode {
  id: IntegrationKey;
  label: string;
  topPx: number;
  laneClass: string;
}

const INTEGRATION_SEQUENCE: IntegrationNode[] = [
  { id: 'slack', label: 'Slack', topPx: 14, laneClass: 'left-[7%] sm:left-[10%]' },
  { id: 'asana', label: 'Asana', topPx: 54, laneClass: 'right-[7%] sm:right-[10%]' },
  { id: 'zapier', label: 'Zapier', topPx: 108, laneClass: 'left-[22%] sm:left-[26%]' },
  { id: 'vscode', label: 'Visual Studio', topPx: 162, laneClass: 'right-[6%] sm:right-[9%]' },
  { id: 'vimeo', label: 'Vimeo', topPx: 214, laneClass: 'left-[7%] sm:left-[9%]' },
  { id: 'gmail', label: 'Gmail', topPx: 274, laneClass: 'left-[18%] sm:left-[21%]' },
  { id: 'claude', label: 'Claude', topPx: 326, laneClass: 'right-[8%] sm:right-[11%]' },
  { id: 'figma', label: 'Figma', topPx: 382, laneClass: 'left-[30%] sm:left-[33%]' },
];

const IntegrationBrandIcon: React.FC<{ id: IntegrationKey }> = ({ id }) => {
  switch (id) {
    case 'slack':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M6 15a2 2 0 1 1-2-2h2v2Zm1 0a2 2 0 0 1 4 0v5a2 2 0 1 1-4 0v-5Z" fill="#E01E5A" />
          <path d="M9 6a2 2 0 1 1 2-2v2H9Zm0 1a2 2 0 0 1 0 4H4a2 2 0 1 1 0-4h5Z" fill="#36C5F0" />
          <path d="M18 9a2 2 0 1 1 2 2h-2V9Zm-1 0a2 2 0 0 1-4 0V4a2 2 0 1 1 4 0v5Z" fill="#2EB67D" />
          <path d="M15 18a2 2 0 1 1-2 2v-2h2Zm0-1a2 2 0 0 1 0-4h5a2 2 0 1 1 0 4h-5Z" fill="#ECB22E" />
        </svg>
      );
    case 'asana':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="7.2" r="3.4" fill="#F06A6A" />
          <circle cx="7" cy="15.8" r="3.4" fill="#F06A6A" />
          <circle cx="17" cy="15.8" r="3.4" fill="#F06A6A" />
        </svg>
      );
    case 'zapier':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#FF4F00" strokeWidth="2.3">
          <path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3 6.3 17.7" strokeLinecap="round" />
        </svg>
      );
    case 'vscode':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M17.5 3 9 11.2 4.5 7.7 2.8 8.6l3.9 3.4-3.9 3.4 1.7.9L9 12.8l8.5 8.2 3.7-1.8V4.8L17.5 3Z" fill="#22A6F2" />
          <path d="M17.5 7.4v9.2L12 12l5.5-4.6Z" fill="#0B5F9E" />
        </svg>
      );
    case 'vimeo':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M21.2 8.2c-.1 2.2-1.6 5.2-4.6 9-3.1 4-5.7 6-7.8 6-1.3 0-2.4-1.2-3.3-3.6L3.7 13C3 10.6 2.3 9.4 1.5 9.4c-.2 0-.8.3-1.7 1L-.8 9c1-.9 2-1.8 3-2.7 1.3-1.1 2.4-1.7 3.1-1.8 1.6-.2 2.6.9 3 3.4.4 2.7.7 4.4.9 5 .5 2.3 1.1 3.4 1.7 3.4.5 0 1.2-.8 2.2-2.3 1-1.5 1.5-2.6 1.6-3.4.1-1.3-.4-2-1.6-2-.6 0-1.2.1-1.8.4 1.2-3.9 3.4-5.8 6.8-5.7 2.5.1 3.7 1.7 3.5 4.9Z"
            fill="#1AB7EA"
          />
        </svg>
      );
    case 'gmail':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M3 7.5V18a1.5 1.5 0 0 0 1.5 1.5H7V11l5 3.7L17 11v8.5h2.5A1.5 1.5 0 0 0 21 18V7.5L12 14 3 7.5Z" fill="#EA4335" />
          <path d="M3 7.5a1.5 1.5 0 0 1 2.4-1.2L12 11.2l6.6-4.9A1.5 1.5 0 0 1 21 7.5L17 11l-5 3.7L7 11 3 7.5Z" fill="#FBBC05" />
          <path d="M3 8.5V18a1.5 1.5 0 0 0 1.5 1.5H7V11L3 8.5Z" fill="#4285F4" />
          <path d="M21 8.5V18a1.5 1.5 0 0 1-1.5 1.5H17V11l4-2.5Z" fill="#34A853" />
        </svg>
      );
    case 'claude':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#E07A5F" strokeWidth="2.1">
          <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5 4.2 16.5M3 12h18" strokeLinecap="round" />
        </svg>
      );
    case 'figma':
      return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M8.5 3H12v6H8.5a3 3 0 0 1 0-6Z" fill="#F24E1E" />
          <path d="M12 3h3.5a3 3 0 0 1 0 6H12V3Z" fill="#FF7262" />
          <path d="M12 9h3.5a3 3 0 1 1 0 6H12V9Z" fill="#1ABCFE" />
          <path d="M8.5 9H12v6H8.5a3 3 0 1 1 0-6Z" fill="#A259FF" />
          <path d="M8.5 15H12v3a3 3 0 1 1-3.5-3Z" fill="#0ACF83" />
        </svg>
      );
  }
};

const IntegrationsCard: React.FC = () => {
  return (
    <BentoShell
      className="md:col-span-1 lg:col-start-1 lg:col-span-1 lg:row-start-2 lg:row-span-2 lg:h-full flex flex-col justify-between"
      delay={0.05}
      spotlightColor="rgba(124, 93, 250, 0.14)"
    >
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Upper Animated Vertical Pipeline Stage (absolute track prevents grid row inflation) */}
        <div
          className="group/integrations relative h-[250px] sm:h-[280px] lg:h-auto lg:flex-1 lg:min-h-0 w-full overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 14%, black 82%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 14%, black 82%, transparent 100%)',
          }}
        >
          {/* Vertical dashed guide tracks behind pills */}
          <div className="pointer-events-none absolute inset-0 flex justify-around px-10 opacity-45">
            <div className="h-full w-px border-l border-dashed border-white/[0.12]" />
            <div className="h-full w-px border-l border-dashed border-white/[0.08]" />
            <div className="h-full w-px border-l border-dashed border-white/[0.12]" />
          </div>

          {/* Seamless 2x vertical scroll conveyor (absolute so height stays bounded) */}
          <div className="animate-integrations-scroll absolute inset-x-0 top-0 w-full">
            {[0, 1].map((dupIdx) => (
              <div key={dupIdx} className="relative w-full h-[440px]">
                {INTEGRATION_SEQUENCE.map((item) => (
                  <div
                    key={`${dupIdx}-${item.id}`}
                    style={{ top: `${item.topPx}px` }}
                    className={`absolute ${item.laneClass} inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-2 rounded-[11px] bg-[#161822]/95 border border-white/[0.08] hover:border-[#8b5cf6]/50 shadow-[0_10px_26px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] text-[11.5px] sm:text-[12.5px] font-medium text-[#d8dce6] whitespace-nowrap transition-colors duration-200`}
                  >
                    <IntegrationBrandIcon id={item.id} />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copy */}
        <div className="relative z-10 p-5 sm:p-6 pt-2 shrink-0">
          <p className="text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.08em] text-[#787f8e] mb-1.5">
            INTEGRATIONS
          </p>
          <h3 className="text-[17px] sm:text-[19px] font-medium text-[#f3f5fa] tracking-[-0.02em] mb-1">
            Connect everything
          </h3>
          <p className="text-[12.5px] sm:text-[13px] text-[#8f96a6] leading-[1.45]">
            Connect your favorite marketing and analytics tools to keep your SEO data, campaigns, and performance in sync.
          </p>
        </div>
      </div>
    </BentoShell>
  );
};

/* ============================================================================
   CARD 4: REGIONAL GROWTH — Grow across every market (Halftone Americas Map)
   ============================================================================ */

type Point2D = [number, number];

// Normalized [0..1] polygons depicting Greenland, North/Central America, Caribbean, and South America
const LAND_POLYGONS: Point2D[][] = [
  // North America + Central America
  [
    [0.03, 0.14],
    [0.14, 0.08],
    [0.27, 0.09],
    [0.37, 0.02],
    [0.64, 0.01],
    [0.77, 0.09],
    [0.72, 0.17],
    [0.63, 0.16],
    [0.57, 0.22],
    [0.64, 0.23],
    [0.71, 0.15],
    [0.84, 0.19],
    [0.91, 0.24],
    [0.82, 0.30],
    [0.73, 0.37],
    [0.69, 0.45],
    [0.65, 0.43],
    [0.61, 0.40],
    [0.54, 0.42],
    [0.51, 0.48],
    [0.57, 0.49],
    [0.58, 0.54],
    [0.65, 0.59],
    [0.71, 0.62],
    [0.64, 0.61],
    [0.52, 0.53],
    [0.43, 0.47],
    [0.36, 0.37],
    [0.31, 0.27],
    [0.23, 0.19],
    [0.14, 0.20],
    [0.04, 0.19],
  ],
  // Greenland top-right corner
  [
    [0.78, 0.0],
    [1.0, 0.0],
    [0.98, 0.14],
    [0.85, 0.13],
    [0.78, 0.07],
  ],
  // Caribbean archipelago (Cuba & Hispaniola diagonals — no blocky rectangle)
  [
    [0.61, 0.47],
    [0.69, 0.485],
    [0.68, 0.502],
    [0.60, 0.486],
  ],
  [
    [0.71, 0.495],
    [0.77, 0.502],
    [0.76, 0.518],
    [0.70, 0.51],
  ],
  // South America
  [
    [0.71, 0.61],
    [0.84, 0.60],
    [0.94, 0.65],
    [1.02, 0.72],
    [0.97, 0.84],
    [0.85, 0.96],
    [0.77, 1.0],
    [0.73, 0.90],
    [0.67, 0.76],
    [0.65, 0.67],
  ],
];

const isInsidePolygon = (x: number, y: number, poly: Point2D[]) => {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0];
    const yi = poly[i][1];
    const xj = poly[j][0];
    const yj = poly[j][1];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + 1e-9) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

interface MapHotspot {
  id: string;
  city: string;
  region: string;
  growth: string;
  volume: string;
  x: number;
  y: number;
  rgb: [number, number, number];
  phase: number;
  speed: number;
  radius: number;
}

const MAP_HOTSPOTS: MapHotspot[] = [
  {
    id: 'us-west',
    city: 'San Francisco',
    region: 'US West',
    growth: '+38%',
    volume: '142K',
    x: 0.36,
    y: 0.23,
    rgb: [56, 189, 248],
    phase: 0.0,
    speed: 1.5,
    radius: 0.09,
  },
  {
    id: 'us-east',
    city: 'New York',
    region: 'US East',
    growth: '+54%',
    volume: '218K',
    x: 0.57,
    y: 0.24,
    rgb: [232, 121, 249],
    phase: 1.3,
    speed: 1.75,
    radius: 0.085,
  },
  {
    id: 'us-central',
    city: 'Austin',
    region: 'Central US',
    growth: '+41%',
    volume: '116K',
    x: 0.46,
    y: 0.34,
    rgb: [96, 165, 250],
    phase: 2.1,
    speed: 1.6,
    radius: 0.08,
  },
  {
    id: 'mexico',
    city: 'Mexico City',
    region: 'LATAM North',
    growth: '+62%',
    volume: '94K',
    x: 0.47,
    y: 0.48,
    rgb: [244, 114, 182],
    phase: 0.7,
    speed: 1.9,
    radius: 0.08,
  },
  {
    id: 'caribbean',
    city: 'Miami Hub',
    region: 'Caribbean',
    growth: '+47%',
    volume: '83K',
    x: 0.68,
    y: 0.49,
    rgb: [45, 212, 191],
    phase: 3.0,
    speed: 1.65,
    radius: 0.08,
  },
  {
    id: 'brazil',
    city: 'São Paulo',
    region: 'Brazil',
    growth: '+71%',
    volume: '164K',
    x: 0.87,
    y: 0.72,
    rgb: [167, 139, 250],
    phase: 2.4,
    speed: 1.5,
    radius: 0.095,
  },
  {
    id: 'south',
    city: 'Santiago',
    region: 'Southern Cone',
    growth: '+33%',
    volume: '58K',
    x: 0.8,
    y: 0.86,
    rgb: [56, 189, 248],
    phase: 1.9,
    speed: 1.8,
    radius: 0.075,
  },
];

// Network data arcs connecting regional hubs [fromIdx, toIdx, arcCurveOffset, speed, phase]
const MAP_ARCS: [number, number, number, number, number][] = [
  [0, 1, -0.09, 0.34, 0.0], // San Francisco -> New York
  [0, 2, 0.05, 0.42, 0.35], // San Francisco -> Austin
  [2, 1, -0.06, 0.38, 0.6], // Austin -> New York
  [1, 4, 0.07, 0.36, 0.2], // New York -> Miami Hub
  [2, 3, -0.05, 0.44, 0.75], // Austin -> Mexico City
  [3, 5, -0.1, 0.28, 0.15], // Mexico City -> São Paulo
  [4, 5, 0.09, 0.31, 0.5], // Miami Hub -> São Paulo
  [5, 6, -0.06, 0.4, 0.82], // São Paulo -> Santiago
];

interface ClickRipple {
  x: number;
  y: number;
  bornAt: number;
}

const RegionalGrowthCard: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1,
    y: -1,
    active: false,
  });
  const ripplesRef = useRef<ClickRipple[]>([]);
  const activeHubIdxRef = useRef<number>(1);
  const lastManualInteractRef = useRef<number>(0);

  const [activeHubIdx, setActiveHubIdx] = useState<number>(1);

  const selectHub = (idx: number, manual = true) => {
    activeHubIdxRef.current = idx;
    setActiveHubIdx(idx);
    if (manual) {
      lastManualInteractRef.current = performance.now();
    }
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let inView = true;
    let rafId = 0;
    let landDots: { nx: number; ny: number; x: number; y: number; alpha: number }[] = [];

    const buildGrid = () => {
      const rect = wrap.getBoundingClientRect();
      const nextW = Math.max(240, Math.round(rect.width));
      const nextH = Math.max(200, Math.round(rect.height));
      if (Math.abs(nextW - width) < 2 && Math.abs(nextH - height) < 2) {
        return;
      }
      width = nextW;
      height = nextH;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const step = width < 340 ? 5.2 : 5.6;
      const dots: typeof landDots = [];

      // Map spreads across right/upper ~102% of stage
      for (let py = 6; py < height - 4; py += step) {
        const ny = py / height;
        for (let px = 6; px < width - 2; px += step) {
          const nx = px / width;
          let inside = false;
          for (let p = 0; p < LAND_POLYGONS.length; p++) {
            if (isInsidePolygon(nx, ny, LAND_POLYGONS[p])) {
              inside = true;
              break;
            }
          }
          if (!inside) continue;

          // Subtle coastal/bottom fade opacity
          const bottomFade = Math.max(0, Math.min(1, (1.0 - ny) / 0.25));
          const leftFade = Math.max(0.25, Math.min(1, nx / 0.16));
          dots.push({
            nx,
            ny,
            x: px,
            y: py,
            alpha: bottomFade * leftFade,
          });
        }
      }
      landDots = dots;
    };

    const renderFrame = (timeSec: number, nowMs: number) => {
      ctx.clearRect(0, 0, width, height);

      // Sweeping diagonal radar wave every 4.8s
      const scanPhase = (timeSec % 4.8) / 4.8;
      const scanPos = -0.15 + scanPhase * 1.35;

      // Prune finished click ripples (> 1.4s)
      ripplesRef.current = ripplesRef.current.filter((rp) => nowMs - rp.bornAt < 1400);

      const currentSelected = activeHubIdxRef.current;

      // Compute current hotspot intensities
      const activeSpots = MAP_HOTSPOTS.map((spot, idx) => ({
        ...spot,
        isSelected: idx === currentSelected,
        pulse: 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(timeSec * spot.speed + spot.phase)),
      }));

      // 1. Soft ambient glows under each active hotspot
      for (let s = 0; s < activeSpots.length; s++) {
        const spot = activeSpots[s];
        const sx = spot.x * width;
        const sy = spot.y * height;
        const boost = spot.isSelected ? 1.35 : 1.0;
        const glowR = width * spot.radius * (1.05 + spot.pulse * 0.35) * boost;
        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
        grad.addColorStop(
          0,
          `rgba(${spot.rgb[0]}, ${spot.rgb[1]}, ${spot.rgb[2]}, ${(spot.isSelected ? 0.24 : 0.13) * spot.pulse})`
        );
        grad.addColorStop(1, `rgba(${spot.rgb[0]}, ${spot.rgb[1]}, ${spot.rgb[2]}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw crisp halftone land matrix with radar scan, hotspot glow, magnetic pointer & click shockwave
      const ptr = pointerRef.current;
      for (let i = 0; i < landDots.length; i++) {
        const dot = landDots[i];
        let r = 82;
        let g = 88;
        let b = 104;
        let a = 0.46 * dot.alpha;
        let radius = 1.1;
        let drawX = dot.x;
        let drawY = dot.y;

        // Radar scan band highlight
        const diagCoord = dot.nx * 0.68 + dot.ny * 0.32;
        const scanDist = Math.abs(diagCoord - scanPos);
        if (scanDist < 0.085) {
          const sw = Math.pow(1 - scanDist / 0.085, 2) * 0.75;
          r = Math.round(r + (56 - r) * sw);
          g = Math.round(g + (189 - g) * sw);
          b = Math.round(b + (248 - b) * sw);
          a = Math.min(1, a + 0.36 * sw * dot.alpha);
          radius = Math.max(radius, 1.1 + 0.6 * sw);
        }

        // Check nearby glowing market hubs
        for (let s = 0; s < activeSpots.length; s++) {
          const spot = activeSpots[s];
          const dx = dot.nx - spot.x;
          const dy = dot.ny - spot.y;
          const dist2 = dx * dx + dy * dy;
          const maxR = spot.radius * spot.radius;
          if (dist2 < maxR) {
            const mult = spot.isSelected ? 1.15 : 0.95;
            const w = Math.min(1, Math.pow(1 - dist2 / maxR, 1.75) * spot.pulse * mult);
            r = Math.round(r + (spot.rgb[0] - r) * w);
            g = Math.round(g + (spot.rgb[1] - g) * w);
            b = Math.round(b + (spot.rgb[2] - b) * w);
            a = Math.min(1, a + 0.52 * w * dot.alpha);
            radius = Math.max(radius, 1.15 + 0.85 * w);
          }
        }

        // Expanding click shockwave ripples
        for (let k = 0; k < ripplesRef.current.length; k++) {
          const rp = ripplesRef.current[k];
          const age = (nowMs - rp.bornAt) / 1400; // 0..1
          const ringR = age * 0.45;
          const dx = dot.nx - rp.x;
          const dy = dot.ny - rp.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ringDist = Math.abs(dist - ringR);
          if (ringDist < 0.055) {
            const fade = (1 - age) * Math.pow(1 - ringDist / 0.055, 1.6);
            r = Math.round(r + (167 - r) * fade);
            g = Math.round(g + (220 - g) * fade);
            b = Math.round(b + (255 - b) * fade);
            a = Math.min(1, a + 0.7 * fade * dot.alpha);
            radius = Math.max(radius, 1.2 + 1.25 * fade);
          }
        }

        // Interactive pointer magnetic lens illumination
        if (ptr.active) {
          const dx = dot.nx - ptr.x;
          const dy = dot.ny - ptr.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 0.024) {
            const d = Math.sqrt(d2) + 1e-4;
            const boost = Math.pow(1 - d2 / 0.024, 1.6);
            r = Math.round(r + (125 - r) * boost);
            g = Math.round(g + (211 - g) * boost);
            b = Math.round(b + (252 - b) * boost);
            a = Math.min(1, a + 0.58 * boost * dot.alpha);
            radius = Math.max(radius, 1.2 + 1.05 * boost);
            // Subtle magnetic push away from pointer center
            drawX += (dx / d) * boost * 2.2;
            drawY += (dy / d) * boost * 2.2;
          }
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw curved network Bezier arcs & traveling data packets
      for (let aIdx = 0; aIdx < MAP_ARCS.length; aIdx++) {
        const [fromIdx, toIdx, curve, speed, phase] = MAP_ARCS[aIdx];
        const from = activeSpots[fromIdx];
        const to = activeSpots[toIdx];
        const x0 = from.x * width;
        const y0 = from.y * height;
        const x2 = to.x * width;
        const y2 = to.y * height;
        const mx = (x0 + x2) * 0.5 + curve * width;
        const my = (y0 + y2) * 0.5 - Math.abs(curve) * height * 0.45;

        const isRouteHighlighted = from.isSelected || to.isSelected;

        // Subtle arc guide line
        const arcGrad = ctx.createLinearGradient(x0, y0, x2, y2);
        arcGrad.addColorStop(
          0,
          `rgba(${from.rgb[0]}, ${from.rgb[1]}, ${from.rgb[2]}, ${isRouteHighlighted ? 0.36 : 0.14})`
        );
        arcGrad.addColorStop(
          1,
          `rgba(${to.rgb[0]}, ${to.rgb[1]}, ${to.rgb[2]}, ${isRouteHighlighted ? 0.36 : 0.14})`
        );

        ctx.strokeStyle = arcGrad;
        ctx.lineWidth = isRouteHighlighted ? 1.25 : 0.85;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo(mx, my, x2, y2);
        ctx.stroke();

        // Traveling glowing packet along Bezier curve
        const t = (((timeSec * speed + phase) % 1) + 1) % 1;
        const inv = 1 - t;
        const px = inv * inv * x0 + 2 * inv * t * mx + t * t * x2;
        const py = inv * inv * y0 + 2 * inv * t * my + t * t * y2;

        // Soft glow halo around packet
        const pGlow = ctx.createRadialGradient(px, py, 0, px, py, isRouteHighlighted ? 8 : 5.5);
        pGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        pGlow.addColorStop(
          0.45,
          `rgba(${to.rgb[0]}, ${to.rgb[1]}, ${to.rgb[2]}, 0.6)`
        );
        pGlow.addColorStop(1, `rgba(${to.rgb[0]}, ${to.rgb[1]}, ${to.rgb[2]}, 0)`);
        ctx.fillStyle = pGlow;
        ctx.beginPath();
        ctx.arc(px, py, isRouteHighlighted ? 8 : 5.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Draw concentric sonar rings & crisp beacon cores on each hub
      for (let s = 0; s < activeSpots.length; s++) {
        const spot = activeSpots[s];
        const sx = spot.x * width;
        const sy = spot.y * height;

        // Expanding sonar ring 1
        const ringT = (((timeSec * 0.55 + spot.phase * 0.3) % 1) + 1) % 1;
        const ringRadius = Math.max(0.5, 3 + ringT * (spot.isSelected ? 22 : 14));
        const ringAlpha = (1 - ringT) * (spot.isSelected ? 0.65 : 0.32);
        ctx.strokeStyle = `rgba(${spot.rgb[0]}, ${spot.rgb[1]}, ${spot.rgb[2]}, ${ringAlpha.toFixed(3)})`;
        ctx.lineWidth = spot.isSelected ? 1.3 : 0.9;
        ctx.beginPath();
        ctx.arc(sx, sy, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Extra second sonar ring for the selected hub
        if (spot.isSelected) {
          const ringT2 = (ringT + 0.5) % 1;
          const r2 = 3 + ringT2 * 22;
          const a2 = (1 - ringT2) * 0.5;
          ctx.strokeStyle = `rgba(255, 255, 255, ${a2.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(sx, sy, r2, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Crisp hub beacon core
        ctx.fillStyle = spot.isSelected
          ? '#ffffff'
          : `rgba(${spot.rgb[0]}, ${spot.rgb[1]}, ${spot.rgb[2]}, 0.92)`;
        ctx.beginPath();
        ctx.arc(sx, sy, spot.isSelected ? 3.2 : 2.1, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    buildGrid();

    if (prefersReduced) {
      renderFrame(1.4, performance.now());
      const ro = new ResizeObserver(() => {
        buildGrid();
        renderFrame(1.4, performance.now());
      });
      ro.observe(wrap);
      return () => ro.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(wrap);

    const resizeObs = new ResizeObserver(() => buildGrid());
    resizeObs.observe(wrap);

    const start = performance.now();
    let lastAutoCycle = start;

    const animate = (now: number) => {
      if (inView) {
        // Auto-cycle selected hub every 3.4s when user isn't hovering or within 6s of manual tap
        if (!pointerRef.current.active && now - lastManualInteractRef.current > 6000) {
          if (now - lastAutoCycle > 3400) {
            lastAutoCycle = now;
            const next = (activeHubIdxRef.current + 1) % MAP_HOTSPOTS.length;
            activeHubIdxRef.current = next;
            setActiveHubIdx(next);
          }
        }
        renderFrame(Math.max(0, (now - start) * 0.001), now);
      }
      rafId = window.requestAnimationFrame(animate);
    };
    rafId = window.requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      resizeObs.disconnect();
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  const findNearestHub = (nx: number, ny: number) => {
    let bestIdx = 0;
    let bestD2 = Infinity;
    for (let i = 0; i < MAP_HOTSPOTS.length; i++) {
      const dx = MAP_HOTSPOTS[i].x - nx;
      const dy = MAP_HOTSPOTS[i].y - ny;
      const d2 = dx * dx + dy * dy;
      if (d2 < bestD2) {
        bestD2 = d2;
        bestIdx = i;
      }
    }
    return { bestIdx, bestD2 };
  };

  const handleMapPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / Math.max(1, rect.width);
    const ny = (e.clientY - rect.top) / Math.max(1, rect.height);
    pointerRef.current = { x: nx, y: ny, active: true };

    const { bestIdx, bestD2 } = findNearestHub(nx, ny);
    if (bestD2 < 0.025 && bestIdx !== activeHubIdxRef.current) {
      selectHub(bestIdx, true);
    }
  };

  const handleMapPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / Math.max(1, rect.width);
    const ny = (e.clientY - rect.top) / Math.max(1, rect.height);
    ripplesRef.current.push({ x: nx, y: ny, bornAt: performance.now() });
    const { bestIdx } = findNearestHub(nx, ny);
    selectHub(bestIdx, true);
  };

  const handleMapPointerLeave = () => {
    pointerRef.current.active = false;
  };

  const activeHub = MAP_HOTSPOTS[activeHubIdx];

  return (
    <BentoShell
      className="md:col-span-1 lg:col-start-3 lg:col-span-1 lg:row-start-1 lg:row-span-2 lg:h-full flex flex-col justify-between"
      delay={0.1}
      spotlightColor="rgba(56, 189, 248, 0.14)"
    >
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top Interactive Dotted Americas Map */}
        <div
          ref={wrapRef}
          onPointerMove={handleMapPointerMove}
          onPointerDown={handleMapPointerDown}
          onPointerLeave={handleMapPointerLeave}
          className="relative h-[265px] sm:h-[295px] lg:h-auto lg:flex-1 lg:min-h-0 w-full overflow-hidden cursor-crosshair select-none"
          style={{
            maskImage:
              'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
          }}
        >
          <canvas
            ref={canvasRef}
            aria-label="Interactive regional growth map with live network data arcs and pulsing market hubs"
            className="absolute inset-0 block w-full h-full"
          />

          {/* Compact Live Market HUD Pill (Click to cycle markets or tap anywhere on map) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const next = (activeHubIdx + 1) % MAP_HOTSPOTS.length;
              ripplesRef.current.push({
                x: MAP_HOTSPOTS[next].x,
                y: MAP_HOTSPOTS[next].y,
                bornAt: performance.now(),
              });
              selectHub(next, true);
            }}
            aria-label={`Active market: ${activeHub.city} (${activeHub.growth}). Click to inspect next market.`}
            className="absolute top-3.5 left-3.5 z-20 inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#141722]/85 hover:bg-[#1b2030]/95 border border-white/[0.11] hover:border-[#38bdf8]/45 shadow-[0_8px_24px_rgba(0,0,0,0.65)] backdrop-blur-md text-left transition-colors duration-200 cursor-pointer"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0 animate-pulse"
              style={{
                backgroundColor: `rgb(${activeHub.rgb.join(',')})`,
                boxShadow: `0 0 8px rgb(${activeHub.rgb.join(',')})`,
              }}
            />
            <span className="text-[11px] font-medium text-[#edf0f5] whitespace-nowrap">
              {activeHub.city}
            </span>
            <span className="text-[10.5px] font-medium text-[#5ad396] tabular-nums whitespace-nowrap">
              {activeHub.growth}
            </span>
            <span className="hidden sm:inline text-[10px] text-[#8f96a6] tabular-nums whitespace-nowrap">
              · {activeHub.volume}
            </span>
          </button>
        </div>

        {/* Bottom Copy */}
        <div className="relative z-10 p-5 sm:p-6 pt-2 shrink-0">
          <p className="text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.08em] text-[#787f8e] mb-1.5">
            REGIONAL GROWTH
          </p>
          <h3 className="text-[17px] sm:text-[19px] font-medium text-[#f3f5fa] tracking-[-0.02em] mb-1">
            Grow across every market
          </h3>
          <p className="text-[12.5px] sm:text-[13px] text-[#8f96a6] leading-[1.45]">
            Track search performance across countries and discover where your brand has the most potential.
          </p>
        </div>
      </div>
    </BentoShell>
  );
};

/* ============================================================================
   CARD 5: BACKLINK GROWTH — Find links that move the needle (Glowing Sparkline)
   ============================================================================ */

// 76 organic vertex points with a clear crest at idx 30 (~40%) and trough at idx 59 (~79%)
const SPARKLINE_SERIES = [
  52, 54, 49, 51, 48, 44, 47, 50, 46, 53, 57, 61, 59, 63, 60, 56, 58, 62, 65, 63,
  68, 72, 70, 75, 74, 78, 82, 85, 89, 93, 96, 92, 89, 86, 83, 81, 84, 79, 75, 72,
  69, 66, 62, 60, 56, 53, 50, 47, 45, 43, 41, 39, 40, 38, 37, 36, 35, 34, 33, 32,
  35, 39, 44, 49, 53, 57, 55, 60, 64, 62, 66, 68, 65, 69, 72, 74,
];

const SVG_W = 640;
const SVG_H = 152;
const PEAK_INDEX = 30; // ~40% X
const LOW_INDEX = 59; // ~78.6% X

const BacklinkGrowthCard: React.FC = () => {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pulsePathRef = useRef<SVGPathElement | null>(null);
  const beamRef = useRef<HTMLDivElement | null>(null);
  const avgValRef = useRef<HTMLSpanElement | null>(null);
  const lowValRef = useRef<HTMLSpanElement | null>(null);

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const chartGeometry = useMemo(() => {
    const pts = SPARKLINE_SERIES.map((val, idx) => {
      const x = (idx / (SPARKLINE_SERIES.length - 1)) * SVG_W;
      // Map [30..100] cleanly into SVG Y padding [26..136]
      const y = SVG_H - 18 - ((val - 28) / 74) * (SVG_H - 42);
      return { x, y, val };
    });

    const linePath = pts
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(' ');
    const areaPath = `${linePath} L ${SVG_W} ${SVG_H} L 0 ${SVG_H} Z`;

    const avgPt = pts[PEAK_INDEX];
    const lowPt = pts[LOW_INDEX];

    return {
      pts,
      linePath,
      areaPath,
      avgPctX: (avgPt.x / SVG_W) * 100,
      avgPt,
      lowPctX: (lowPt.x / SVG_W) * 100,
      lowPt,
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const pulsePath = pulsePathRef.current;
    if (!stage || !pulsePath) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const totalLen = pulsePath.getTotalLength();
    const cometLen = 120;
    pulsePath.style.strokeDasharray = `${cometLen} ${totalLen + cometLen}`;

    if (prefersReduced) {
      pulsePath.style.strokeDashoffset = `${-(totalLen * 0.36)}`;
      return;
    }

    let inView = true;
    const obs = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    obs.observe(stage);

    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      if (inView) {
        const elapsed = now - start;
        // 4.4s smooth left-to-right comet travel along the sparkline
        const cycle = (elapsed % 4400) / 4400;
        const offset = -cycle * (totalLen + cometLen) + cometLen;
        pulsePath.style.strokeDashoffset = `${offset}`;

        if (beamRef.current) {
          beamRef.current.style.left = `${(cycle * 100).toFixed(2)}%`;
        }

        // Gentle organic metric drift (Avg 11.4K - 12.6K, Low 2.8K - 3.6K)
        if (avgValRef.current) {
          const avgK = (12.0 + Math.sin(elapsed * 0.0012) * 0.5).toFixed(1);
          avgValRef.current.textContent = `Avg ${avgK}K`;
        }
        if (lowValRef.current) {
          const lowK = (3.1 + Math.cos(elapsed * 0.0011) * 0.45).toFixed(1);
          lowValRef.current.textContent = `Low ${lowK}K`;
        }
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      obs.disconnect();
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleChartPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rel = Math.max(0, Math.min(1, (e.clientX - rect.left) / Math.max(1, rect.width)));
    const idx = Math.round(rel * (SPARKLINE_SERIES.length - 1));
    setHoveredIdx(idx);
  };

  const activeHoverPt = hoveredIdx !== null ? chartGeometry.pts[hoveredIdx] : null;
  const activeHoverK =
    hoveredIdx !== null ? ((SPARKLINE_SERIES[hoveredIdx] / 95) * 14.8).toFixed(1) : null;

  return (
    <BentoShell
      className="md:col-span-1 lg:col-start-2 lg:col-span-2 lg:row-start-3 lg:row-span-1 min-h-[260px] lg:h-full flex flex-col justify-between"
      delay={0.12}
      spotlightColor="rgba(168, 85, 247, 0.14)"
    >
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top Glowing Area Sparkline Stage */}
        <div
          ref={stageRef}
          onPointerMove={handleChartPointerMove}
          onPointerLeave={() => setHoveredIdx(null)}
          className="relative w-full h-[148px] sm:h-[160px] lg:h-auto lg:flex-1 lg:min-h-0 pt-2 overflow-hidden select-none cursor-crosshair"
        >
          {/* Traveling soft vertical light spotlight */}
          <div
            ref={beamRef}
            className="pointer-events-none absolute top-0 bottom-0 -translate-x-1/2 w-28 sm:w-36 opacity-55 blur-xl"
            style={{
              left: '40%',
              background:
                'radial-gradient(ellipse 65% 80% at 50% 45%, rgba(192, 132, 252, 0.42) 0%, rgba(124, 58, 237, 0.16) 50%, rgba(124, 58, 237, 0) 80%)',
            }}
          />

          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <defs>
              <linearGradient id="hd-backlink-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(139, 92, 246, 0.34)" />
                <stop offset="65%" stopColor="rgba(124, 58, 237, 0.1)" />
                <stop offset="100%" stopColor="rgba(124, 58, 237, 0)" />
              </linearGradient>
              <linearGradient id="hd-backlink-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="45%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <filter id="hd-comet-glow" x="-20%" y="-40%" width="140%" height="180%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Translucent area gradient */}
            <path d={chartGeometry.areaPath} fill="url(#hd-backlink-area)" />

            {/* Base purple sparkline */}
            <path
              d={chartGeometry.linePath}
              fill="none"
              stroke="url(#hd-backlink-stroke)"
              strokeWidth="1.9"
              strokeLinejoin="round"
            />

            {/* Luminous traveling white-lilac comet along the exact curve */}
            <path
              ref={pulsePathRef}
              d={chartGeometry.linePath}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#hd-comet-glow)"
              opacity="0.95"
            />

            {/* Vertical dashed drop lines to Peak (Avg) & Trough (Low) */}
            <line
              x1={chartGeometry.avgPt.x}
              y1={28}
              x2={chartGeometry.avgPt.x}
              y2={SVG_H}
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.1"
              strokeDasharray="3 3"
            />
            <line
              x1={chartGeometry.lowPt.x}
              y1={28}
              x2={chartGeometry.lowPt.x}
              y2={SVG_H}
              stroke="rgba(255,255,255,0.24)"
              strokeWidth="1.1"
              strokeDasharray="3 3"
            />

            {/* Anchor dots */}
            <circle
              cx={chartGeometry.avgPt.x}
              cy={chartGeometry.avgPt.y}
              r="3.2"
              fill="#38bdf8"
              stroke="#0f1117"
              strokeWidth="1.4"
            />
            <circle
              cx={chartGeometry.lowPt.x}
              cy={chartGeometry.lowPt.y}
              r="3.2"
              fill="#f43f5e"
              stroke="#0f1117"
              strokeWidth="1.4"
            />

            {/* Interactive Hover Crosshair Line & Dot */}
            {activeHoverPt && (
              <>
                <line
                  x1={activeHoverPt.x}
                  y1={0}
                  x2={activeHoverPt.x}
                  y2={SVG_H}
                  stroke="rgba(216, 180, 254, 0.55)"
                  strokeWidth="1.2"
                  strokeDasharray="2 3"
                />
                <circle
                  cx={activeHoverPt.x}
                  cy={activeHoverPt.y}
                  r="4.2"
                  fill="#ffffff"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                />
              </>
            )}
          </svg>

          {/* Floating Callout Pill 1: Avg 12.2K */}
          <div
            style={{ left: `${chartGeometry.avgPctX}%` }}
            className="pointer-events-none absolute top-3 -translate-x-1/2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[7px] bg-[#1b1d26]/95 border border-white/[0.1] shadow-[0_8px_20px_rgba(0,0,0,0.6)] backdrop-blur-sm"
          >
            <span className="inline-flex items-end gap-[1.5px] h-2.5" aria-hidden="true">
              <span className="w-[2px] h-1.5 rounded-[1px] bg-[#38bdf8]" />
              <span className="w-[2px] h-2.5 rounded-[1px] bg-[#38bdf8]" />
              <span className="w-[2px] h-2 rounded-[1px] bg-[#38bdf8]" />
            </span>
            <span
              ref={avgValRef}
              className="text-[10.5px] sm:text-[11px] font-medium text-[#edf0f5] whitespace-nowrap tabular-nums"
            >
              Avg 12.2K
            </span>
          </div>

          {/* Floating Callout Pill 2: Low 3.2K */}
          <div
            style={{ left: `${chartGeometry.lowPctX}%` }}
            className="pointer-events-none absolute top-3 -translate-x-1/2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[7px] bg-[#1b1d26]/95 border border-white/[0.1] shadow-[0_8px_20px_rgba(0,0,0,0.6)] backdrop-blur-sm"
          >
            <span className="inline-flex items-end gap-[1.5px] h-2.5" aria-hidden="true">
              <span className="w-[2px] h-2 rounded-[1px] bg-[#f43f5e]" />
              <span className="w-[2px] h-1 rounded-[1px] bg-[#f43f5e]" />
              <span className="w-[2px] h-2.5 rounded-[1px] bg-[#f43f5e]" />
            </span>
            <span
              ref={lowValRef}
              className="text-[10.5px] sm:text-[11px] font-medium text-[#edf0f5] whitespace-nowrap tabular-nums"
            >
              Low 3.2K
            </span>
          </div>

          {/* Live Hover Value Pill */}
          {activeHoverPt && activeHoverK && (
            <div
              style={{
                left: `${Math.min(86, Math.max(14, (activeHoverPt.x / SVG_W) * 100))}%`,
              }}
              className="pointer-events-none absolute bottom-3 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#7c3aed]/90 border border-white/25 text-[10.5px] font-medium text-white shadow-lg tabular-nums"
            >
              {activeHoverK}K links
            </div>
          )}
        </div>

        {/* Bottom Copy */}
        <div className="relative z-10 p-5 sm:p-6 pt-1 shrink-0">
          <p className="text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.08em] text-[#787f8e] mb-1.5">
            BACKLINK GROWTH
          </p>
          <h3 className="text-[17px] sm:text-[19px] font-medium text-[#f3f5fa] tracking-[-0.02em] mb-1">
            Find links that move the needle
          </h3>
          <p className="text-[12.5px] sm:text-[13px] text-[#8f96a6] leading-[1.45]">
            Discover high-quality backlink opportunities from relevant, authoritative websites.
          </p>
        </div>
      </div>
    </BentoShell>
  );
};

/* ============================================================================
   EXPORTED SECTION: ASYMMETRIC PINWHEEL 5-CARD GROWTH BENTO
   ============================================================================ */

export const GrowthShowcaseBento: React.FC = () => {
  return (
    <section
      id="growth"
      className="max-w-[1200px] mx-auto px-4 sm:px-5 py-14 sm:py-18 scroll-mt-20 overflow-hidden"
    >
      {/* Matching Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: SMOOTH_EASE }}
        className="flex flex-col items-center text-center mb-10 sm:mb-12"
      >
        <SectionKicker text="REAL-TIME GROWTH ANALYTICS" className="mb-3" />
        <h2
          className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.14] max-w-[560px] mb-3"
          style={{ fontSize: 'clamp(1.85rem, 3.6vw, 2.8rem)', textWrap: 'balance' }}
        >
          Connect Performance Directly to Business Revenue
        </h2>
        <p className="text-[14px] sm:text-[15px] text-[#aeb5c0] max-w-[490px] leading-[1.6]">
          Unify market reach, authority links, and live campaign integrations inside a single high-signal command view.
        </p>
      </motion.div>

      {/* Responsive Asymmetric Pinwheel Bento Grid:
          - Mobile (<768px): 1 column cleanly stacked
          - Tablet (768px..1023px): 2 balanced columns, zero orphan slots
          - Desktop (>=1024px): Exact 3x3 pinwheel layout matching reference video */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[285px_305px_285px] gap-4 sm:gap-5">
        <PerformancesCard />
        <IntegrationsCard />
        <RegionalGrowthCard />
        <BusinessGrowthCard />
        <BacklinkGrowthCard />
      </div>
    </section>
  );
};
