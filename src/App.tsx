/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'motion/react';
import { BlogPost, CaseStudy } from './data/clavionData';
import GradientASCII from './components/GradientASCII';
import { HeroSection } from './components/HeroSection';
import { ComparisonAndQuote } from './components/ComparisonAndQuote';
import { CapabilitiesBento } from './components/CapabilitiesBento';
import { WhatWeBuildSection } from './components/WhatWeBuildSection';
import { AgentSystemAndFeaturesSection } from './components/AgentSystemAndFeaturesSection';
import { AgentProcessTimelineSection } from './components/AgentProcessTimelineSection';
import { ManualProcessesSection } from './components/ManualProcessesSection';
import { WhyChooseUsAndProcess } from './components/WhyChooseUsAndProcess';
import { ComparisonAndTransformationSection } from './components/ComparisonAndTransformationSection';
import { CaseStudiesAndPricing } from './components/CaseStudiesAndPricing';
import { TestimonialsFaqBlog } from './components/TestimonialsFaqBlog';
import { FooterAndNav } from './components/FooterAndNav';
import { RainbowButton } from './components/RainbowButton';

export default function App() {
  const { scrollYProgress } = useScroll();
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem('heydots_theme');
        if (saved === 'light' || saved === 'dark') return saved;
      } catch {
        // Ignore storage errors
      }
    }
    return 'dark';
  });
  const [contactModalPlan, setContactModalPlan] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [infoModalPage, setInfoModalPage] = useState<'about' | 'privacy' | '404' | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
    try {
      window.localStorage.setItem('heydots_theme', theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const currentPathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isNotFoundRoute =
    currentPathname !== '/' && currentPathname !== '/index.html';

  const handleOpenContact = (defaultPlan = 'AI Consultation') => {
    setContactModalPlan(defaultPlan);
  };

  const handleBookIntroCall = () => {
    setContactModalPlan('Book 20-Min Intro Call');
  };

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 ${
        theme === 'light'
          ? 'bg-[#fbfbff] text-[#0b0d14] selection:bg-[#8b5cf6]/25 selection:text-[#0b0d14]'
          : 'bg-[#0a0d14] text-[#edf0f5] selection:bg-[#66bcd3]/30 selection:text-white'
      }`}
    >
      {/* Accessible Skip-to-Content Link (DEF-8) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-[#66bcd3] focus:text-[#0a0d14] focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <motion.div className="scroll-progress-bar" style={{ scaleX: scrollYProgress }} />

      {/* Global Full-Website <GradientASCII /> Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <GradientASCII
          colors={
            theme === 'light'
              ? ['#ffffff', '#ede9fe', '#c4b5fd', '#818cf8']
              : ['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']
          }
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={18}
          density={0.8}
          gradientOpacity={theme === 'light' ? 0.42 : 0.65}
          glyphOpacity={theme === 'light' ? 0.32 : 0.85}
          glow={theme === 'light' ? 0.15 : 0.25}
          dpr={1}
        />
        {/* Subtle radial atmospheric veil to preserve high contrast for typography & cards across all sections */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background:
              theme === 'light'
                ? 'radial-gradient(60% 45% at 85% 8%, rgba(167, 139, 250, 0.22) 0%, rgba(255, 255, 255, 0) 60%), radial-gradient(55% 45% at 8% 55%, rgba(125, 211, 252, 0.18) 0%, rgba(255, 255, 255, 0) 60%), radial-gradient(50% 40% at 70% 95%, rgba(244, 114, 182, 0.10) 0%, rgba(255, 255, 255, 0) 60%), linear-gradient(180deg, rgba(251, 251, 255, 0.86) 0%, rgba(246, 245, 255, 0.88) 50%, rgba(240, 244, 255, 0.92) 100%)'
                : 'radial-gradient(circle at 50% 35%, rgba(10, 13, 20, 0.42) 0%, rgba(10, 13, 20, 0.52) 60%, rgba(10, 13, 20, 0.72) 100%)',
          }}
        />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10">
        <main id="main-content">
          {isNotFoundRoute ? (
            <section className="min-h-[80vh] max-w-[680px] mx-auto px-5 py-24 flex flex-col items-center justify-center text-center">
              <p className="font-mono-tech text-[12px] uppercase tracking-[0.16em] text-[#e06368] mb-3">
                [ ERROR 404 — PAGE NOT FOUND ]
              </p>
              <h1 className="text-[36px] sm:text-[48px] font-medium text-clavion-gradient tracking-[-0.03em] leading-[1.12] mb-4">
                This Route Has Been Automated Away
              </h1>
              <p className="text-[15px] text-[#aeb5c0] max-w-[440px] leading-[1.6] mb-8">
                The page <code className="text-[#edf0f5] font-mono-tech">{currentPathname}</code> does not exist. Return to the main{' '}
                <span className="font-pacifico text-[#f3f5fa]">HeyDots</span> workspace below.
              </p>
              <RainbowButton label="BACK TO HOME" variant="rainbow" href="/" />
            </section>
          ) : (
            <>
              <HeroSection
                onOpenContact={handleOpenContact}
                onBookCall={handleBookIntroCall}
              />

              <ComparisonAndQuote />

              <CapabilitiesBento onOpenContact={handleOpenContact} />

              <WhatWeBuildSection
                onOpenContact={handleOpenContact}
                onBookCall={handleBookIntroCall}
              />

              <AgentSystemAndFeaturesSection
                onOpenContact={handleOpenContact}
                onBookCall={handleBookIntroCall}
              />

              <AgentProcessTimelineSection
                onBookCall={handleBookIntroCall}
              />

              <ManualProcessesSection onOpenContact={handleOpenContact} />

              <WhyChooseUsAndProcess onOpenContact={handleOpenContact} />

              <ComparisonAndTransformationSection
                onOpenContact={handleOpenContact}
              />

              <CaseStudiesAndPricing
                onOpenContact={handleOpenContact}
                onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
              />

              <TestimonialsFaqBlog
                onOpenContact={handleOpenContact}
                onSelectBlogPost={(post) => setSelectedBlogPost(post)}
              />
            </>
          )}
        </main>

        <FooterAndNav
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenContact={handleOpenContact}
          onBookCall={handleBookIntroCall}
          contactModalPlan={contactModalPlan}
          onCloseContact={() => setContactModalPlan(null)}
          selectedCaseStudy={selectedCaseStudy}
          onCloseCaseStudy={() => setSelectedCaseStudy(null)}
          selectedBlogPost={selectedBlogPost}
          onCloseBlogPost={() => setSelectedBlogPost(null)}
          infoModalPage={infoModalPage}
          onSelectInfoModal={(page) => setInfoModalPage(page)}
        />
      </div>
    </div>
  );
}
