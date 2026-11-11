import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  BLOG_POSTS,
  BlogPost,
  FAQ_ITEMS,
  TESTIMONIALS,
} from '../data/clavionData';
import { getNextSlideIndex, toggleAccordionItem } from '../utils/clavionLogic';
import { RainbowButton, SectionKicker } from './RainbowButton';

interface TestimonialsFaqBlogProps {
  onOpenContact: (defaultPlan?: string) => void;
  onSelectBlogPost: (post: BlogPost) => void;
}

export const TestimonialsFaqBlog: React.FC<TestimonialsFaqBlogProps> = ({
  onOpenContact,
  onSelectBlogPost,
}) => {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [openFaqIds, setOpenFaqIds] = useState<string[]>([]);

  // Auto-advance testimonials every 5.2 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveTestimonialIdx((prev) => getNextSlideIndex(prev, TESTIMONIALS.length));
    }, 5200);
    return () => window.clearInterval(timer);
  }, [isPaused, activeTestimonialIdx]);

  const handleFaqToggle = (id: string) => {
    setOpenFaqIds((prev) => toggleAccordionItem(prev, id, true));
  };

  return (
    <>
      {/* CLIENT TESTIMONIALS SECTION */}
      <section className="max-w-[1200px] mx-auto px-5 py-16 overflow-hidden">
        <div className="flex flex-col items-center text-center mb-12">
          <SectionKicker text="CLIENT TESTIMONIALS" className="mb-3" />
          <h2
            className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.16] mb-3"
            style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)' }}
          >
            What Our Clients Think
          </h2>

          {/* 4.5 rating on Contra */}
          <div className="flex items-center gap-2.5 text-[13px] text-[#aeb5c0]">
            <img
              src="/assets/clavion/yVXrTzvfd0eA12KuXkAYzEVKok.svg"
              alt="4.5 stars"
              className="h-3.5 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <span>4.5 rating on</span>
            <img
              src="/assets/clavion/XBN0NyzDZlwRxMc9GiCmQzP62I.svg"
              alt="Contra"
              className="h-4 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* 3-Card Tilted Stack Container matching Clavion's exact iuDv9ANKq component */}
        <div
          className="max-w-[600px] mx-auto px-2 sm:px-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[385px] sm:min-h-[373px] flex items-center justify-center py-3">
            {TESTIMONIALS.map((item, idx) => {
              // Calculate relative offset: 0 = front active card, 1 = tilted +3deg back card, 2 = tilted -3deg back card
              const offset =
                (idx - activeTestimonialIdx + TESTIMONIALS.length) % TESTIMONIALS.length;
              const isFront = offset === 0;
              const rotateDeg = offset === 0 ? 0 : offset === 1 ? 3 : -3;
              const cardOpacity = offset === 0 ? 1 : offset === 1 ? 0.5 : 0.4;
              const zIndex = offset === 0 ? 30 : offset === 1 ? 20 : 10;

              return (
                <motion.div
                  key={item.id}
                  initial={false}
                  animate={{
                    rotate: rotateDeg,
                    opacity: cardOpacity,
                    scale: isFront ? 1 : 0.96,
                    y: isFront ? 0 : 6,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ zIndex }}
                  onClick={() => {
                    if (!isFront) setActiveTestimonialIdx(idx);
                  }}
                  className={`${
                    isFront ? 'relative' : 'absolute inset-x-0 top-3 cursor-pointer'
                  } w-full rounded-[18px] border border-[#858b94]/25 bg-clavion-card p-5 sm:p-8 shadow-2xl select-none`}
                >
                  {/* Author Info */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border border-white/15"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-[15px] font-medium text-[#edf0f5]">{item.name}</p>
                      <p className="text-[12px] text-[#858b94]">{item.role}</p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="mb-4">
                    <img
                      src="/assets/clavion/yVXrTzvfd0eA12KuXkAYzEVKok.svg"
                      alt="5 stars"
                      className="h-3.5 w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Quote */}
                  <p className="text-[18px] sm:text-[21px] font-medium text-clavion-gradient leading-[1.38] tracking-[-0.01em] mb-6">
                    {item.quote}
                  </p>

                  {/* Bottom Outcome Box with Dot-Grid Background */}
                  <div className="relative rounded-[12px] border border-[#858b94]/20 bg-[#0c0f17] p-4 overflow-hidden">
                    <img
                      src="/assets/clavion/r5potKirfvn8BYMPvQoN9Zv2Ng.svg"
                      alt="Testimonial outcome background pattern"
                      className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-45"
                      referrerPolicy="no-referrer"
                    />
                    <div className="relative z-10">
                      <p className="text-[13px] font-medium text-[#edf0f5] mb-1">
                        {item.summaryText}
                      </p>
                      <p className="text-[12px] text-[#858b94]">{item.metricHighlight}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination Progress Bars with 44x44px accessible touch target wrapper */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((item, idx) => {
              const isActive = idx === activeTestimonialIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTestimonialIdx(idx)}
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-pressed={isActive}
                  className={`min-h-[44px] min-w-[44px] py-4 px-1.5 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    isActive ? 'w-[88px]' : 'w-[44px]'
                  }`}
                >
                  <span
                    className={`relative block h-1.5 w-full rounded-full overflow-hidden transition-all duration-300 ${
                      isActive ? 'bg-white/15' : 'bg-white/20 hover:bg-white/40'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        key={`fill-${activeTestimonialIdx}-${isPaused ? 'paused' : 'play'}`}
                        initial={{ width: '0%' }}
                        animate={{ width: isPaused ? '65%' : '100%' }}
                        transition={{
                          duration: isPaused ? 0.3 : 5.2,
                          ease: 'linear',
                        }}
                        className="block h-full rounded-full bg-[#edf0f5]"
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ SECTION: Your Questions, Answered */}
      <section className="max-w-[1200px] mx-auto px-5 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (5 cols): Heading + Need More Clarity Card */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <h2
                className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.15] mb-3"
                style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)' }}
              >
                Your Questions, Answered
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#aeb5c0] leading-[1.6] max-w-[360px]">
                Here are answers to the questions we get most often about our projects, services, and process.
              </p>
            </div>

            {/* Need More Clarity Card */}
            <div className="relative rounded-[18px] border border-[#858b94]/20 bg-[#0c0f17] p-6 sm:p-7 overflow-hidden max-w-[385px]">
              <img
                src="/assets/clavion/r5potKirfvn8BYMPvQoN9Zv2Ng.svg"
                alt="FAQ consultation card background pattern"
                className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-50"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10">
                <img
                  src="/assets/clavion/VF9V184MwL6lVi1H5HxAgomY5M.jpg"
                  alt="AI Specialist"
                  className="w-12 h-12 rounded-xl object-cover border border-white/15 mb-4"
                  referrerPolicy="no-referrer"
                />
                <h3 className="text-[20px] font-medium text-clavion-gradient mb-1.5">
                  Need More Clarity?
                </h3>
                <p className="text-[13px] text-[#aeb5c0] mb-5">
                  We’re here to help you make the right decision.
                </p>
                <RainbowButton
                  label="TALK TO AN EXPERT"
                  variant="rainbow"
                  onClick={() => onOpenContact('FAQ Inquiry')}
                />
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): 6 Accordion Items */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = openFaqIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="premium-interactive-card rounded-[14px] border border-[#858b94]/20 bg-clavion-card overflow-hidden hover:-translate-y-0.5 transition-all duration-300 hover:border-[#8b5cf6]/50"
                >
                  <button
                    type="button"
                    onClick={() => handleFaqToggle(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <span className="text-[14.5px] sm:text-[15px] font-medium text-[#edf0f5]">
                      {faq.question}
                    </span>
                    <img
                      src="/assets/clavion/g1AvgvkNdIRzz5EX2udfzLkeyY.svg"
                      alt={isOpen ? 'Collapse answer' : 'Expand answer'}
                      className={`w-3.5 h-3.5 object-contain shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-2 text-[13.5px] sm:text-[14px] text-[#aeb5c0] leading-[1.6] border-t border-white/[0.05]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BLOG SECTION: Insights on AI and Automation */}
      <section id="blog" className="max-w-[1200px] mx-auto px-5 py-16 scroll-mt-20">
        <div className="flex flex-col items-center text-center mb-12">
          <SectionKicker text="FROM OUR BLOG" className="mb-3" />
          <h2
            className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.16]"
            style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)' }}
          >
            Insights on AI and Automation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.65, delay: idx * 0.06 }}
              onClick={() => onSelectBlogPost(post)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectBlogPost(post);
                }
              }}
              className="premium-interactive-card group cursor-pointer flex flex-col p-4 rounded-[20px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card transition-all duration-300"
            >
              <div className="rounded-[16px] overflow-hidden border border-[#858b94]/20 bg-[#141720] mb-4 aspect-[16/9]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center gap-2 mb-2.5">
                <span className="px-2.5 py-1 rounded-md bg-[#161922] border border-[#858b94]/20 text-[11px] text-[#aeb5c0]">
                  {post.category}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#161922] border border-[#858b94]/20 text-[11px] text-[#aeb5c0]">
                  {post.date}
                </span>
              </div>

              <h3 className="text-[17px] sm:text-[18px] font-medium text-[#edf0f5] group-hover:text-white transition-colors leading-snug">
                {post.title}
              </h3>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
};
