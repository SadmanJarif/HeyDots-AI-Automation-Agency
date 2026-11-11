import React from 'react';
import { motion } from 'motion/react';
import { BRAND_LOGOS } from '../data/clavionData';
import { RainbowButton, SectionKicker } from './RainbowButton';

interface HeroSectionProps {
  onOpenContact: (defaultPlan?: string) => void;
  onBookCall: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onBookCall }) => {
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
          <div className="flex flex-wrap items-center justify-center gap-3.5 w-full sm:w-auto">
            <RainbowButton
              label="START A PROJECT"
              variant="rainbow"
              onClick={() => onOpenContact('Custom Project')}
            />
            <RainbowButton
              label="BOOK AN INTRO CALL"
              variant="dark"
              iconSrc="/assets/clavion/GukJuD6D51RayodFgi8oQiSRe0.svg"
              onClick={onBookCall}
            />
          </div>
          <p className="text-[12px] text-[#858b94] mt-1">
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
            <div className="animate-marquee-left items-center gap-12">
              {repeatedLogos.map((logo, idx) => (
                <div
                  key={`${logo.id}-${idx}`}
                  className="flex items-center justify-center shrink-0 opacity-80 hover:opacity-100 transition-opacity px-2"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-[22px] w-auto object-contain"
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
