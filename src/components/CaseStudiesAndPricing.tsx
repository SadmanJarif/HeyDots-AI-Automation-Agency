import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SCALABLE_AI_INDUSTRIES } from '../data/clavionData';
import { RainbowButton } from './RainbowButton';

interface CaseStudiesAndPricingProps {
  onOpenContact: (defaultPlan?: string) => void;
}

export const CaseStudiesAndPricing: React.FC<CaseStudiesAndPricingProps> = ({
  onOpenContact,
}) => {
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

