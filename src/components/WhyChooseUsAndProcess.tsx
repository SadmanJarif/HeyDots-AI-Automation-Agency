import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  MARQUEE_TAGLINES,
  PLATFORM_ROWS,
  PROCESS_STEPS,
  WHY_CHOOSE_US_PILLARS,
} from '../data/clavionData';
import { toggleAccordionItem } from '../utils/clavionLogic';
import { RainbowButton, SectionKicker } from './RainbowButton';

interface WhyChooseUsAndProcessProps {
  onOpenContact: (defaultPlan?: string) => void;
}

export const WhyChooseUsAndProcess: React.FC<WhyChooseUsAndProcessProps> = ({
  onOpenContact,
}) => {
  const [openSteps, setOpenSteps] = useState<string[]>([]);

  const handleStepToggle = (stepId: string) => {
    setOpenSteps((prev) => toggleAccordionItem(prev, stepId, true));
  };

  return (
    <>
      {/* WHY CHOOSE US SECTION */}
      <section id="about" className="max-w-[1200px] mx-auto px-5 py-16 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <SectionKicker text="WHY CHOOSE US" className="mb-3" />
          <h2
            className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.16] max-w-[540px] mb-4"
            style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)', textWrap: 'balance' }}
          >
            Driving Business Growth with Intelligent Automation
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#aeb5c0] max-w-[510px] leading-[1.6]">
            We’re a team of AI consultants, engineers, and designers helping companies turn data and automation into real business results.
          </p>
        </motion.div>

        {/* 4 Value Pillars Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {WHY_CHOOSE_US_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.65, delay: idx * 0.06 }}
              className="premium-interactive-card group flex flex-col items-center text-center p-5 rounded-[18px] border border-[#858b94]/15 hover:border-[#8b5cf6]/50 bg-clavion-card transition-all duration-300"
            >
              <div className="mb-4 w-12 h-12 rounded-xl bg-[#161922] border border-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">
                <img
                  src={pillar.icon}
                  alt={`${pillar.title} pillar icon`}
                  className="w-7 h-7 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-[17px] font-medium text-[#edf0f5] mb-2">{pillar.title}</h3>
              <p className="text-[13px] text-[#aeb5c0] leading-[1.6] max-w-[240px]">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MARQUEE TAGLINE BAR */}
      <div className="max-w-[1200px] mx-auto px-5 my-6">
        <div className="relative rounded-[14px] border border-[#858b94]/20 bg-[#0c0f17] py-5 overflow-hidden">
          <img
            src="/assets/clavion/r5potKirfvn8BYMPvQoN9Zv2Ng.svg"
            alt="Marquee tagline bar dot-grid pattern"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="animate-marquee-left items-center gap-10 relative z-10">
            {[...MARQUEE_TAGLINES, ...MARQUEE_TAGLINES, ...MARQUEE_TAGLINES].map((tag, i) => (
              <div key={`${tag}-${i}`} className="flex items-center gap-10 shrink-0">
                <span className="font-mono-tech text-[13px] text-[#aeb5c0] tracking-wide">
                  {tag}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROCESS SECTION: From Strategy to Scalable AI */}
      <section id="process" className="max-w-[1200px] mx-auto px-5 py-16 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sticky Column (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <h2
              className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.15] mb-4"
              style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)', textWrap: 'balance' }}
            >
              From Strategy to Scalable AI
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#aeb5c0] leading-[1.6] max-w-[360px] mb-7">
              A framework that unites human insight with automation to drive growth at every stage.
            </p>
            <RainbowButton
              label="START A NEW PROJECT"
              variant="dark"
              onClick={() => onOpenContact('Full Strategy & Scalable AI')}
            />
          </div>

          {/* Right Column (7 cols): 4 Interactive Expandable Step Cards */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {PROCESS_STEPS.map((step, idx) => {
              const isOpen = openSteps.includes(step.id);
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: idx * 0.05 }}
                  onClick={() => handleStepToggle(step.id)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleStepToggle(step.id);
                    }
                  }}
                  className="premium-interactive-card rounded-[18px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-5 sm:p-7 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-left"
                >
                  <p className="font-mono-tech text-[12px] text-[#aeb5c0] mb-3">{step.stepTag}</p>
                  <h3 className="text-[20px] sm:text-[22px] font-medium text-clavion-gradient mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-[#aeb5c0] leading-[1.6] mb-6">
                    {step.description}
                  </p>

                  {/* Divider & Toggle Row */}
                  <div className="pt-4 border-t border-white/[0.07] flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-[12px] text-[#aeb5c0]">
                        {step.toggleLabel}
                      </span>
                      <img
                        src="/assets/clavion/g1AvgvkNdIRzz5EX2udfzLkeyY.svg"
                        alt={isOpen ? 'Collapse step details' : 'Expand step details'}
                        className={`w-3.5 h-3.5 object-contain transition-transform duration-300 ${
                          isOpen ? 'rotate-45' : 'rotate-0'
                        }`}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Expanded Step Content with smooth spring transition */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-white/[0.05] text-[13px] text-[#edf0f5]">
                            {step.expandedType === 'pipeline' && step.expandedItems && (
                              <div className="flex flex-wrap items-center gap-2">
                                {step.expandedItems.map((node, i) => (
                                  <React.Fragment key={node}>
                                    <span className="px-3 py-1.5 rounded-lg bg-[#161922] border border-white/10 font-mono-tech text-[11px] text-[#edf0f5]">
                                      {node}
                                    </span>
                                    {i < step.expandedItems!.length - 1 && (
                                      <span className="text-[#858b94] text-xs">→</span>
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>
                            )}

                            {step.expandedType === 'checklist' && step.expandedItems && (
                              <div className="flex flex-col gap-2">
                                {step.expandedItems.map((item) => (
                                  <div key={item} className="flex items-center gap-2.5 text-[#aeb5c0]">
                                    <img
                                      src="/assets/clavion/IjhixvmVfNBhHagpo87DlvQ07sE.svg"
                                      alt={`${item} check icon`}
                                      className="w-2.5 h-2.5 object-contain"
                                      referrerPolicy="no-referrer"
                                    />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {step.expandedType === 'paragraph' && step.expandedParagraph && (
                              <p className="text-[#aeb5c0] leading-[1.6]">
                                {step.expandedParagraph}
                              </p>
                            )}

                            {step.expandedType === 'metrics' && step.expandedItems && (
                              <div className="flex flex-wrap items-center gap-3">
                                {step.expandedItems.map((metric) => (
                                  <span
                                    key={metric}
                                    className="px-3 py-1.5 rounded-lg bg-[#161922] border border-white/10 font-mono-tech text-[11px] text-[#edf0f5]"
                                  >
                                    {metric}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLATFORMS WE USE: The Engine Behind AI */}
      <section id="featured-video" className="max-w-[1200px] mx-auto px-5 py-16 scroll-mt-20">
        <div className="flex flex-col items-center text-center mb-10">
          <SectionKicker text="PLATFORMS WE USE" className="mb-3" />
          <h2
            className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.16]"
            style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)' }}
          >
            The Engine Behind AI
          </h2>
        </div>

        {/* 3-Row Infinite Marquee with Centered CTA Button */}
        <div className="relative py-4 overflow-hidden">
          <div
            className="flex flex-col gap-4"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            }}
          >
            {PLATFORM_ROWS.map((row, rowIndex) => {
              const tripled = [...row, ...row, ...row];
              const animClass =
                rowIndex === 1 ? 'animate-marquee-right' : 'animate-marquee-left-fast';
              return (
                <div key={rowIndex} className="overflow-hidden">
                  <div className={`${animClass} items-center gap-4`}>
                    {tripled.map((item, idx) => (
                      <div
                        key={`${item.name}-${idx}`}
                        className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-[11px] bg-clavion-pill border border-[#858b94]/20 shrink-0"
                      >
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="h-4 w-auto object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[13px] font-medium text-[#aeb5c0] whitespace-nowrap">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Floating Rainbow CTA */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <div className="stack-cta-halo pointer-events-auto shadow-[0_0_50px_20px_rgba(10,13,20,0.88)] rounded-[10px]">
              <RainbowButton
                label="TURN THIS STACK INTO RESULTS"
                variant="rainbow"
                onClick={() => onOpenContact('Stack Integration Project')}
              />
            </div>
          </div>
        </div>

        <p className="text-center text-[12px] text-[#858b94] mt-6">
          We use this stack to engineer real AI workflows — not experiments.
        </p>
      </section>
    </>
  );
};
