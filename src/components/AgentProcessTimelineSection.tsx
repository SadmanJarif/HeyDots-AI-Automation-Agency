import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

interface AgentProcessTimelineSectionProps {
  onBookCall: () => void;
}

interface TimelineStepData {
  number: string;
  stepLabel: string;
  title: string;
  description: string;
}

const TIMELINE_STEPS: TimelineStepData[] = [
  {
    number: '01',
    stepLabel: 'STEP 01',
    title: 'Discovery And\nWorkflow Mapping',
    description:
      'We analyze your processes, identify bottlenecks, and define what should be automated.',
  },
  {
    number: '02',
    stepLabel: 'STEP 02',
    title: 'Agent Design\nAnd Architecture',
    description:
      'We design the logic, decision-making rules, and integrations needed for your agent to work reliably.',
  },
  {
    number: '03',
    stepLabel: 'STEP 03',
    title: 'Development\nAnd Integration',
    description:
      'The agent is built, tested, and connected to your existing tools and systems.',
  },
  {
    number: '04',
    stepLabel: 'STEP 04',
    title: 'Launch, Monitoring\nAnd Optimization',
    description:
      'We deploy, monitor performance, and continuously improve results over time.',
  },
];

const WORKFLOW_MAPPING_ROWS = [
  { left: 'INPUT', right: 'Inbound Lead' },
  { left: 'VALIDATION', right: 'Data Check' },
  { left: 'DECISION', right: 'Qualification Logic' },
  { left: 'ACTION', right: 'Route to Pipeline' },
];

const WEEKLY_BARS = [
  { day: 'MON', heightPct: 58 },
  { day: 'TUE', heightPct: 64 },
  { day: 'WED', heightPct: 84 },
  { day: 'THU', heightPct: 45 },
  { day: 'FRI', heightPct: 88 },
  { day: 'SAT', heightPct: 72 },
  { day: 'SUN', heightPct: 62 },
];

export const AgentProcessTimelineSection: React.FC<AgentProcessTimelineSectionProps> = ({
  onBookCall,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [maxReachedStep, setMaxReachedStep] = useState<number>(0);
  const [pulseTick, setPulseTick] = useState<number>(0);

  // Subtle live highlight inside the active step illustration
  useEffect(() => {
    const timer = window.setInterval(() => {
      setPulseTick((prev) => (prev + 1) % 4);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  // Continuous scroll progress across the entire 4-step timeline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 65%', 'end 45%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const spineFillHeight = useTransform(smoothProgress, [0, 1], ['8%', '100%']);

  // Throttled requestAnimationFrame scroll observer so state updates only when step changes
  useEffect(() => {
    let rafId = 0;

    const updateActiveStep = () => {
      rafId = 0;
      const viewportCenter = window.innerHeight * 0.52;
      const revealTrigger = window.innerHeight * 0.72;

      let closestIdx = 0;
      let minDistance = Number.POSITIVE_INFINITY;
      let highestReached = 0;

      stepRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const stepMid = rect.top + rect.height / 2;
        const distance = Math.abs(stepMid - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }

        if (rect.top <= revealTrigger) {
          highestReached = idx;
        }
      });

      setActiveStep((prev) => (prev === closestIdx ? prev : closestIdx));
      setMaxReachedStep((prev) => {
        const nextMax = Math.max(prev, highestReached, closestIdx);
        return prev === nextMax ? prev : nextMax;
      });
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateActiveStep);
      }
    };

    updateActiveStep();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="max-w-[1200px] mx-auto px-4 sm:px-5 py-16 sm:py-20 overflow-hidden">
      <div className="relative flex flex-col gap-10 sm:gap-12 lg:gap-16">
        {/* Continuous Vertical Sliding Progress Track on Desktop */}
        <div
          aria-hidden="true"
          className="hidden lg:block pointer-events-none absolute top-6 bottom-6 left-[45.833%] -translate-x-1/2 w-[2px] bg-white/10 rounded-full overflow-hidden z-0"
        >
          <motion.div
            style={{ height: spineFillHeight }}
            className="w-full bg-gradient-to-b from-[#6366f1] via-[#8b5cf6] to-[#a78bfa] shadow-[0_0_16px_rgba(99,102,241,0.85)] rounded-full"
          />
        </div>

        {TIMELINE_STEPS.map((step, idx) => {
          const isCurrent = activeStep === idx;
          const isReached = idx <= maxReachedStep;

          return (
            <div
              key={step.number}
              ref={(el) => {
                stepRefs.current[idx] = el;
              }}
              onMouseEnter={() => {
                setActiveStep(idx);
                setMaxReachedStep((prev) => Math.max(prev, idx));
              }}
              className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
            >
              {/* LEFT VISUAL STAGE CARD */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className={`lg:col-span-5 relative rounded-[20px] p-5 sm:p-8 min-h-[300px] sm:min-h-[360px] flex items-center justify-center overflow-hidden border transition-all duration-500 ease-out ${
                  isReached
                    ? 'agent-stage-reached border-[#8b5cf6]/55 hover:border-[#a78bfa] shadow-[0_24px_64px_rgba(109,40,217,0.34)] opacity-100 translate-y-0'
                    : 'agent-stage-unreached border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.3)] opacity-55 translate-y-1'
                }`}
                style={{
                  background: isReached
                    ? 'linear-gradient(180deg, #070814 0%, #1d1559 38%, #5b3df5 75%, #c4b5fd 100%)'
                    : 'linear-gradient(180deg, #161924 0%, #1d2130 50%, #2a2f45 100%)',
                }}
              >
                {/* Bottom ambient glow when active */}
                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-28 transition-opacity duration-500 ${
                    isReached ? 'opacity-80' : 'opacity-15'
                  }`}
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 75%)',
                  }}
                />

                {/* STEP 01 ILLUSTRATION: Discovery And Workflow Mapping */}
                {idx === 0 && (
                  <div className="relative z-10 w-full max-w-[300px] rounded-[14px] bg-white p-3.5 sm:p-4 shadow-[0_18px_40px_rgba(10,13,20,0.32)] flex flex-col items-center">
                    {WORKFLOW_MAPPING_ROWS.map((row, rIdx) => {
                      const isFlowRowActive = pulseTick === rIdx;
                      return (
                        <React.Fragment key={row.left}>
                          <div
                            className={`w-full rounded-[8px] px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between gap-2 border transition-all duration-300 ease-out ${
                              isFlowRowActive
                                ? 'bg-[#f5f3ff] border-[#8b5cf6] shadow-[0_4px_12px_rgba(139,92,246,0.18)] translate-x-0.5'
                                : 'bg-[#f8fafc] border-slate-200/80'
                            }`}
                          >
                            <span className="font-mono-tech text-[10px] tracking-[0.08em] text-slate-500 uppercase">
                              {row.left}
                            </span>
                            <span className="text-[11px] font-semibold text-slate-900">
                              {row.right}
                            </span>
                          </div>
                          {rIdx < WORKFLOW_MAPPING_ROWS.length - 1 && (
                            <span
                              className={`my-1 text-[#5b3df5] text-[13px] font-bold leading-none transition-transform duration-300 ${
                                isFlowRowActive ? 'scale-110' : 'scale-100'
                              }`}
                            >
                              ↓
                            </span>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                )}

                {/* STEP 02 ILLUSTRATION: Agent Design And Architecture */}
                {idx === 1 && (
                  <div className="relative z-10 w-full max-w-[300px] rounded-[14px] bg-white p-4 shadow-[0_18px_40px_rgba(10,13,20,0.32)] flex flex-col">
                    <div className="w-full rounded-[8px] bg-[#f5f3ff] border border-[#8b5cf6]/40 px-3.5 py-2.5 flex items-center justify-between">
                      <span className="font-mono-tech text-[10px] tracking-[0.08em] text-slate-500 uppercase">
                        LEAD SCORE
                      </span>
                      <span className="font-mono-tech text-[10.5px] font-semibold text-[#5b3df5]">
                        &ge; 70?
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 my-2.5 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-[1.5px] h-2.5 bg-[#8b5cf6]/50 mb-1" />
                        <span className="text-[10px] font-semibold text-emerald-600">Yes</span>
                        <div className="w-[1.5px] h-2.5 bg-[#8b5cf6]/50 mt-1" />
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-[1.5px] h-2.5 bg-slate-200 mb-1" />
                        <span className="text-[10px] font-medium text-slate-500">No</span>
                        <div className="w-[1.5px] h-2.5 bg-slate-200 mt-1" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div
                        className={`rounded-[8px] py-2.5 px-3 text-center text-[11px] font-semibold border transition-all duration-300 ${
                          pulseTick % 2 === 0
                            ? 'bg-[#f5f3ff] border-[#8b5cf6] text-[#4c1d95] shadow-sm'
                            : 'bg-[#f8fafc] border-slate-200/80 text-slate-900'
                        }`}
                      >
                        Assign Sales
                      </div>
                      <div
                        className={`rounded-[8px] py-2.5 px-3 text-center text-[11px] font-semibold border transition-all duration-300 ${
                          pulseTick % 2 === 1
                            ? 'bg-[#f5f3ff] border-[#8b5cf6] text-[#4c1d95] shadow-sm'
                            : 'bg-[#f8fafc] border-slate-200/80 text-slate-900'
                        }`}
                      >
                        Nurture Flow
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 03 ILLUSTRATION: Development And Integration (JSON Config) */}
                {idx === 2 && (
                  <div className="relative z-10 w-full max-w-[300px] rounded-[14px] bg-white p-4 shadow-[0_18px_40px_rgba(10,13,20,0.32)] font-mono-tech text-[10px] sm:text-[10.5px] leading-[1.7] text-slate-700 overflow-x-auto">
                    <div>&#123;</div>
                    <div
                      className={`pl-3 rounded px-1 transition-colors duration-300 ${
                        pulseTick === 0 ? 'bg-[#f5f3ff]' : ''
                      }`}
                    >
                      <span className="text-rose-500">&quot;TRIGGER&quot;</span>:{' '}
                      <span className="text-emerald-600">&quot;NEW_LEAD&quot;</span>,
                    </div>
                    <div
                      className={`pl-3 rounded px-1 transition-colors duration-300 ${
                        pulseTick === 1 ? 'bg-[#f5f3ff]' : ''
                      }`}
                    >
                      <span className="text-rose-500">&quot;CONDITION&quot;</span>:{' '}
                      <span className="text-emerald-600">&quot;LEAD_SCORE &gt;= 70&quot;</span>,
                    </div>
                    <div
                      className={`pl-3 rounded px-1 transition-colors duration-300 ${
                        pulseTick === 2 ? 'bg-[#f5f3ff]' : ''
                      }`}
                    >
                      <span className="text-rose-500">&quot;ACTION&quot;</span>:{' '}
                      <span className="text-emerald-600">&quot;ROUTE_TO_SALES&quot;</span>,
                    </div>
                    <div
                      className={`pl-3 rounded px-1 transition-colors duration-300 ${
                        pulseTick === 3 ? 'bg-[#f5f3ff]' : ''
                      }`}
                    >
                      <span className="text-rose-500">&quot;FALLBACK&quot;</span>:{' '}
                      <span className="text-emerald-600">&quot;NURTURE_SEQUENCE&quot;</span>
                    </div>
                    <div>&#125;</div>
                  </div>
                )}

                {/* STEP 04 ILLUSTRATION: Launch, Monitoring And Optimization (Weekly Chart) */}
                {idx === 3 && (
                  <div className="relative z-10 w-full max-w-[300px] rounded-[14px] bg-white p-4 shadow-[0_18px_40px_rgba(10,13,20,0.32)]">
                    <div className="h-[145px] flex items-end justify-between gap-2 pt-4 pb-2 px-2 border-b border-slate-100">
                      {WEEKLY_BARS.map((bar, bIdx) => {
                        const dynamicPct = isReached
                          ? Math.min(96, bar.heightPct + ((pulseTick + bIdx) % 3) * 4)
                          : 24;
                        return (
                          <div
                            key={bar.day}
                            className="flex-1 h-full flex flex-col items-center justify-end"
                          >
                            <div className="w-2 sm:w-2.5 h-full rounded-full bg-slate-100 flex flex-col justify-end overflow-hidden">
                              <div
                                className="w-full rounded-full transition-all duration-500 ease-out"
                                style={{
                                  height: `${dynamicPct}%`,
                                  background:
                                    'linear-gradient(180deg, #a78bfa 0%, #5b3df5 65%, #e0e7ff 100%)',
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between px-1.5 pt-2">
                      {WEEKLY_BARS.map((bar) => (
                        <span
                          key={bar.day}
                          className="font-mono-tech text-[8px] text-slate-400 uppercase tracking-wider"
                        >
                          {bar.day}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* CENTER STEP NUMBER NODE */}
              <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center self-stretch">
                <div
                  className={`timeline-step-node relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-mono-tech text-[11px] font-semibold border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[#5b3df5] text-white border-[#a78bfa] scale-110 shadow-[0_0_24px_rgba(139,92,246,0.85)]'
                      : isReached
                      ? 'bg-[#1e1b4b] text-[#e0e7ff] border-[#8b5cf6]/60 scale-100'
                      : 'bg-[#121624] text-[#646d7e] border-white/10 scale-100'
                  }`}
                >
                  {step.number}
                </div>
              </div>

              {/* RIGHT COPY COLUMN + SMOOTH CTA BUTTON */}
              <div
                className={`lg:col-span-6 flex flex-col justify-center items-start py-2 lg:py-4 lg:pl-4 transition-opacity duration-300 ${
                  isCurrent ? 'opacity-100' : isReached ? 'opacity-80' : 'opacity-50'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="lg:hidden inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#5b3df5] border border-[#a78bfa] font-mono-tech text-[10.5px] text-white">
                    {step.number}
                  </span>
                  <p className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#9ca5b5]">
                    {step.stepLabel}
                  </p>
                </div>

                <h3
                  className="text-clavion-gradient font-normal tracking-[-0.035em] leading-[1.1] mb-3.5 sm:mb-4 whitespace-pre-line"
                  style={{ fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)' }}
                >
                  {step.title}
                </h3>

                <p className="text-[14px] sm:text-[15px] text-[#9ca5b5] leading-[1.6] max-w-[430px] mb-6">
                  {step.description}
                </p>

                <div
                  className={`transition-all duration-300 ease-out ${
                    isCurrent
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-100 lg:opacity-0 lg:translate-y-1 lg:pointer-events-none'
                  }`}
                >
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
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <svg
                        className="w-4 h-4 absolute -translate-x-6 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
