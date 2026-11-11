import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  CASE_STUDIES,
  CaseStudy,
  SCALABLE_AI_INDUSTRIES,
} from '../data/clavionData';
import { getNextSlideIndex, getPrevSlideIndex } from '../utils/clavionLogic';
import { RainbowButton, SectionKicker } from './RainbowButton';

interface CaseStudiesAndPricingProps {
  onOpenContact: (defaultPlan?: string) => void;
  onSelectCaseStudy: (study: CaseStudy) => void;
}

export const CaseStudiesAndPricing: React.FC<CaseStudiesAndPricingProps> = ({
  onOpenContact,
  onSelectCaseStudy,
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const activeCase = CASE_STUDIES[activeCaseIndex];

  // Typewriter for "BUILDING SCALABLE AI FOR"
  const [industryIdx, setIndustryIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = SCALABLE_AI_INDUSTRIES[industryIdx];
    const delay = isDeleting ? 50 : charIdx === currentWord.length ? 1100 : 95;

    const timer = window.setTimeout(() => {
      if (!isDeleting && charIdx < currentWord.length) {
        setCharIdx((c) => c + 1);
      } else if (!isDeleting && charIdx === currentWord.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIdx > 0) {
        setCharIdx((c) => c - 1);
      } else {
        setIsDeleting(false);
        setIndustryIdx((i) => (i + 1) % SCALABLE_AI_INDUSTRIES.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charIdx, isDeleting, industryIdx]);

  const currentTypedIndustry = SCALABLE_AI_INDUSTRIES[industryIdx].slice(0, charIdx);

  return (
    <>
      {/* CASE STUDIES SECTION */}
      <section id="case" className="max-w-[1200px] mx-auto px-5 py-16 scroll-mt-20">
        {/* Header with Title & Carousel Arrows */}
        <div className="flex items-center justify-between mb-10">
          <h2
            className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.15]"
            style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)' }}
          >
            Case Studies
          </h2>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() =>
                setActiveCaseIndex((idx) => getPrevSlideIndex(idx, CASE_STUDIES.length))
              }
              aria-label="Previous case study"
              className="group w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#161920] hover:bg-[#1f2430] border border-[#858b94]/25 hover:border-[#8b5cf6]/60 text-[#edf0f5] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <svg
                className="w-4.5 h-4.5 transition-transform duration-200 group-hover:-translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveCaseIndex((idx) => getNextSlideIndex(idx, CASE_STUDIES.length))
              }
              aria-label="Next case study"
              className="group w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-[#161920] hover:bg-[#1f2430] border border-[#858b94]/25 hover:border-[#8b5cf6]/60 text-[#edf0f5] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <svg
                className="w-4.5 h-4.5 transition-transform duration-200 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Active Case Study Card with smooth slide transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="premium-interactive-card rounded-[20px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch transition-all duration-300"
          >
            {/* Left Image (5 cols) */}
            <div className="lg:col-span-5 rounded-[14px] overflow-hidden bg-[#12151e] h-[300px] sm:h-[340px] lg:h-[390px]">
              <img
                src={activeCase.image}
                alt={activeCase.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Content (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between py-2">
              <div>
                <h3 className="text-[22px] sm:text-[26px] font-medium text-clavion-gradient mb-3">
                  {activeCase.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] text-[#aeb5c0] leading-[1.6] max-w-[540px] mb-6">
                  {activeCase.description}
                </p>

                {/* Metric Tags matching Clavion */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {activeCase.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="px-3.5 py-2 rounded-[9px] bg-[#161922] border border-[#858b94]/20 font-mono-tech text-[11px] uppercase tracking-[0.04em] text-[#aeb5c0]"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Row: READ FULL STORY + Client Logo */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
                <RainbowButton
                  label="READ FULL STORY"
                  variant="dark"
                  onClick={() => onSelectCaseStudy(activeCase)}
                />
                <img
                  src={activeCase.clientLogo}
                  alt={activeCase.clientName}
                  className="h-6 w-auto object-contain opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* BUILDING SCALABLE AI FOR TYPEWRITER CALLOUT */}
      <section className="max-w-[1200px] mx-auto px-5 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
          className="premium-interactive-card relative rounded-[18px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-[#0c0f17] py-14 px-6 flex flex-col items-center text-center overflow-hidden transition-all duration-300"
        >
          <img
            src="/assets/clavion/r5potKirfvn8BYMPvQoN9Zv2Ng.svg"
            alt="Scalable AI industry banner dot-grid pattern"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-55"
            referrerPolicy="no-referrer"
          />

          <div className="relative z-10 flex flex-col items-center max-w-[520px]">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#aeb5c0] mb-3">
              BUILDING SCALABLE AI FOR
            </p>

            {/* Typewriter Line */}
            <div className="typewriter-display-text min-h-[56px] flex items-center justify-center text-[32px] sm:text-[42px] font-medium text-[#f3f5fa] tracking-tight mb-3">
              <span>{currentTypedIndustry}</span>
              <span className="inline-block ml-0.5 text-[#8b5cf6] animate-pulse">|</span>
            </div>

            <p className="text-[14px] sm:text-[15px] text-clavion-gradient leading-[1.6] max-w-[440px] mb-7">
              We build AI solutions for every industry from finance automation to healthcare analytics and beyond.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <RainbowButton
                label="SCHEDULE A CONSULTATION"
                variant="rainbow"
                onClick={() => onOpenContact('Industry AI Solution')}
              />
              <div className="inline-flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] bg-[#161920] border border-[#858b94]/20">
                <img
                  src="/assets/clavion/VF9V184MwL6lVi1H5HxAgomY5M.jpg"
                  alt="Taylor Grant"
                  className="w-6 h-6 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[12px] text-[#aeb5c0]">Taylor Grant, Project Manager</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

