import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  MARQUEE_TAGLINES,
  PLATFORM_ROWS,
  PROCESS_STEPS,
  WHY_CHOOSE_US_PILLARS,
} from '../data/clavionData';
import {
  generateWorkflowBlueprintSummary,
  toggleAccordionItem,
} from '../utils/clavionLogic';
import { RainbowButton, SectionKicker } from './RainbowButton';

interface WhyChooseUsAndProcessProps {
  onOpenContact: (defaultPlan?: string) => void;
}

const DEFAULT_PROMPT_TEXT =
  'How can we use AI to handle inquiries, tasks, and follow-ups automatically?';

export const WhyChooseUsAndProcess: React.FC<WhyChooseUsAndProcessProps> = ({
  onOpenContact,
}) => {
  const [promptValue, setPromptValue] = useState(DEFAULT_PROMPT_TEXT);
  const [isRunningPrompt, setIsRunningPrompt] = useState(false);
  const [blueprintPreview, setBlueprintPreview] = useState<{
    pipeline: string[];
    estimatedSavings: string;
    summary: string;
  } | null>(null);

  // Process Step Accordion State (open step IDs)
  const [openSteps, setOpenSteps] = useState<string[]>([]);

  const handleRunPrompt = async (e?: React.FormEvent, overridePrompt?: string) => {
    if (e) e.preventDefault();
    const activeText = (overridePrompt ?? promptValue).trim() || DEFAULT_PROMPT_TEXT;
    setIsRunningPrompt(true);
    try {
      const response = await fetch('/api/workflow-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: activeText }),
      });
      if (response.ok) {
        const data = await response.json();
        setBlueprintPreview({
          pipeline: data.pipeline,
          estimatedSavings: data.estimatedSavings,
          summary: data.summary,
        });
      } else {
        setBlueprintPreview(generateWorkflowBlueprintSummary(activeText));
      }
    } catch {
      setBlueprintPreview(generateWorkflowBlueprintSummary(activeText));
    } finally {
      setIsRunningPrompt(false);
    }
  };

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

        {/* Interactive Prompt Box Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.7, delay: 0.06 }}
          className="max-w-[540px] mx-auto mb-14"
        >
          <div className="rounded-[18px] border border-[#858b94]/20 bg-clavion-card p-3 sm:p-4 shadow-2xl">
            <form
              action="/api/workflow-preview"
              method="POST"
              onSubmit={(e) => handleRunPrompt(e)}
              className="rounded-[14px] border border-[#858b94]/20 bg-[#141720] p-4 flex flex-col justify-between min-h-[128px]"
            >
              <label htmlFor="workflow-prompt-input" className="sr-only">
                Ask how AI can automate your workflow
              </label>
              <textarea
                id="workflow-prompt-input"
                name="prompt"
                rows={2}
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
                placeholder={DEFAULT_PROMPT_TEXT}
                aria-label="Ask how AI can automate your workflow"
                className="w-full bg-transparent text-[14px] sm:text-[15px] text-[#edf0f5] placeholder-[#858b94] leading-[1.45] focus:outline-none resize-none mb-3"
              />

              {/* Bottom Meta Row inside Prompt Box (All buttons >= 44x44px) */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPromptValue('');
                      setBlueprintPreview(null);
                    }}
                    aria-label="Clear and start new prompt"
                    className="group w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-[#1c202b] hover:bg-[#252a38] border border-white/10 text-[#edf0f5] flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const nextPrompt =
                        'Automate monthly finance reporting and spreadsheet reconciliation';
                      setPromptValue(nextPrompt);
                      handleRunPrompt(undefined, nextPrompt);
                    }}
                    className="group inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg bg-[#1c202b] hover:bg-[#252a38] border border-white/10 text-[12px] text-[#aeb5c0] hover:text-white transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                    <span>Attach</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRunPrompt()}
                    aria-label="Run voice workflow analysis"
                    className="group w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-[#1c202b] hover:bg-[#252a38] border border-white/10 text-[#edf0f5] flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="22" />
                    </svg>
                  </button>
                  <button
                    type="submit"
                    disabled={isRunningPrompt}
                    aria-label="Generate AI workflow preview"
                    className="prompt-submit-btn group w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-[#5b3df5] hover:bg-[#4f46e5] text-white shadow-[0_6px_18px_rgba(91,61,245,0.45)] flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>

            {/* Interactive Blueprint Preview Result when submitted */}
            <div role="status" aria-live="polite">
              {blueprintPreview && (
                <div className="mt-3 rounded-[12px] bg-[#10141f] border border-white/10 p-3.5 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#66bcd3]">
                      Recommended Architecture
                    </span>
                    <span className="font-mono-tech text-[11px] text-[#aeb5c0]">
                      {blueprintPreview.estimatedSavings}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#edf0f5] mb-2.5">{blueprintPreview.summary}</p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {blueprintPreview.pipeline.map((node, i) => (
                      <React.Fragment key={node}>
                        <span className="px-2 py-0.5 rounded bg-[#1a1f2e] border border-white/10 font-mono-tech text-[10px] text-[#edf0f5]">
                          {node}
                        </span>
                        {i < blueprintPreview.pipeline.length - 1 && (
                          <span className="text-[#858b94] text-xs">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom bar: We plug into your stack */}
            <div className="flex items-center justify-between px-3 pt-3 pb-1 text-[12px] text-[#aeb5c0]">
              <span>We plug into your stack:</span>
              <div className="flex items-center gap-2.5">
                {[
                  { src: '/assets/clavion/pdsakTRMXab77GjOPVEQjhtmEkI.svg', name: 'OpenAI' },
                  { src: '/assets/clavion/gCzNVoSal6o0U7nqKAXya2ZbVfY.svg', name: 'Slack' },
                  { src: '/assets/clavion/RMVMNX9wT8BsL2Peerzyqo4jcc.svg', name: 'Notion' },
                  { src: '/assets/clavion/mwv38xdCvTa7LyD6UsZM7KiRLgU.svg', name: 'HubSpot' },
                ].map((icon) => (
                  <img
                    key={icon.name}
                    src={icon.src}
                    alt={`${icon.name} integration icon`}
                    className="w-3.5 h-3.5 object-contain opacity-80"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
            </div>
          </div>
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
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -4, x: 3 }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.65, delay: idx * 0.05 }}
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
                  className="premium-interactive-card rounded-[18px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-6 sm:p-7 transition-all duration-300 cursor-pointer text-left"
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
