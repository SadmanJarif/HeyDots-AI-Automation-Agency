import React from 'react';
import { motion } from 'motion/react';

export const ComparisonAndQuote: React.FC = () => {
  return (
    <section id="architecture" className="max-w-[1200px] mx-auto px-4 sm:px-5 py-10 scroll-mt-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[18px] overflow-hidden py-10 sm:py-12 px-5 sm:px-6 flex flex-col items-center text-center border border-[#858b94]/20 bg-[#0c0f17]/60"
      >
        <img
          src="/assets/clavion/r5potKirfvn8BYMPvQoN9Zv2Ng.svg"
          alt="Quote banner dot-grid background pattern"
          className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />

        <div className="relative z-10 flex flex-col items-center max-w-[540px]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161920] border border-[#858b94]/25 mb-5">
            <img
              src="/assets/clavion/tUSKawIJsWy4bKNBKdv61FH0BE.svg"
              alt="Star"
              className="w-3.5 h-3.5 object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.08em] text-[#edf0f5]">
              RATED 5 STAR BY 120+ CLIENTS
            </span>
          </div>

          <p className="text-[19px] sm:text-[22px] font-medium leading-[1.4] tracking-[-0.01em] text-clavion-gradient mb-5">
            “Great technology matters, but true impact comes from understanding the problem first.”
          </p>

          <div className="flex items-center gap-2.5">
            <img
              src="/assets/clavion/VF9V184MwL6lVi1H5HxAgomY5M.jpg"
              alt="Ethan Parker"
              className="w-6 h-6 rounded-full object-cover border border-white/15"
              referrerPolicy="no-referrer"
            />
            <span className="text-[13px] text-[#aeb5c0]">Ethan Parker, CEO</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
