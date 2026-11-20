import React from 'react';
import { motion } from 'motion/react';
import { BRAND_LOGOS } from '../data/clavionData';
import { SectionKicker } from './RainbowButton';
import { BookCallButton } from './PillButtons';

const TRUSTED_FACES = [
  { src: '/assets/clavion/C1EN7t1PkviRju6c2OgDIdKVBo.jpg', alt: 'HeyDots client' },
  { src: '/assets/clavion/r4hCpcC2BSjUh7yG1NodeQGem9k.jpg', alt: 'HeyDots client' },
  { src: '/assets/clavion/mTPhSAaQlUSkjdTXB0TZUqi3E.jpg', alt: 'HeyDots client' },
  { src: '/assets/clavion/VF9V184MwL6lVi1H5HxAgomY5M.jpg', alt: 'HeyDots client' },
];

interface HeroSectionProps {
  onOpenContact: (defaultPlan?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const repeatedLogos = [...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section id="home" className="relative pt-9 pb-14 overflow-hidden scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-5 flex flex-col items-center text-center relative z-10">
        {/* Top HeyDots Brand Mark in Pacifico Font */}
        <motion.a
          href="#home"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center justify-center min-h-[44px] px-3 mb-14 focus:outline-none group"
          aria-label="HeyDots Home"
        >
          <span className="font-pacifico text-[32px] sm:text-[36px] text-[#f3f5fa] tracking-[0.01em] drop-shadow-[0_2px_16px_rgba(255,255,255,0.2)] group-hover:scale-[1.03] transition-transform">
            HeyDots
          </span>
        </motion.a>

        {/* Kicker with flanking fade lines */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
          className="mb-4"
        >
          <SectionKicker text="AI EXPERTS FOR MODERN BUSINESSES" />
        </motion.div>

        {/* Main H1 Display Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.12] max-w-[680px] mb-5"
          style={{ fontSize: 'clamp(2.25rem, 5vw, 4.1rem)', textWrap: 'balance' }}
        >
          Shaping the Future of Work with AI
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.13 }}
          className="text-[#aeb5c0] text-[15px] sm:text-[16px] leading-[1.6] max-w-[490px] mb-8"
        >
          We create intelligent AI ecosystems that streamline daily work and scale long-term performance.
        </motion.p>

        {/* Primary & Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="flex flex-col items-center gap-3 mb-16 sm:mb-20 w-full sm:w-auto"
        >
          <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onOpenContact('Custom Project')}
              className="inline-flex h-12 min-h-[44px] items-center gap-2.5 rounded-full bg-gradient-to-r from-[#38bdf8] via-[#6366f1] to-[#e879f9] px-5 text-[15px] font-semibold text-white shadow-[0_12px_30px_-14px_rgba(99,102,241,0.95)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4b5fd]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 15 9 12a22 22 0 0 1 2-4A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Start a Project
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <BookCallButton />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center" aria-hidden="true">
              {TRUSTED_FACES.map((face, index) => (
                <img
                  key={face.src}
                  src={face.src}
                  alt=""
                  className={`h-9 w-9 rounded-full border-2 border-[#0b1020] object-cover ${index === 0 ? '' : '-ml-2.5'}`}
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <p className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#e8edf6]">
              Trusted by 30+ clients
              <svg className="h-4 w-4 text-[#38bdf8]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2.2a9.8 9.8 0 1 0 0 19.6 9.8 9.8 0 0 0 0-19.6Zm4.1 7.3-4.7 5.6a1 1 0 0 1-1.5.1L7.8 12.7a1 1 0 1 1 1.4-1.4l1.4 1.4 4-4.7a1 1 0 0 1 1.5 1.3Z" clipRule="evenodd" />
              </svg>
            </p>
          </div>
          <p className="text-[12px] text-[#858b94] mt-2">
            From idea to execution your AI journey, simplified.
          </p>
        </motion.div>

        {/* Trusted by forward-thinking brands */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
          className="w-full max-w-[780px] flex flex-col items-center"
        >
          <p className="text-[12px] text-[#aeb5c0] mb-5 tracking-wide">
            Trusted by forward-thinking brands
          </p>
          <div
            className="relative w-full overflow-hidden py-3 border-b border-white/[0.07]"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            }}
          >
            <div className="animate-marquee-left items-center gap-6 sm:gap-8">
              {repeatedLogos.map((logo, idx) => (
                <div
                  key={`${logo.id}-${idx}`}
                  className="flex h-7 shrink-0 items-center justify-center sm:h-8"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className={`max-h-full max-w-full object-contain opacity-90 transition-opacity hover:opacity-100 ${
                      logo.invert ? 'brightness-0 invert' : ''
                    }`}
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
