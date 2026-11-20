import React from 'react';
import { INTRO_CALL_URL } from '../lib/introCall';

interface GlossyAiButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
}

/** Purple gloss pill used for primary actions such as Talk to an Expert. */
export const GlossyAiButton: React.FC<GlossyAiButtonProps> = ({
  label,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`pb-ai-button ${className}`}
    >
      <span>{label}</span>
      <span className="pb-ai-sparkle" aria-hidden="true">
        ✦
      </span>
    </button>
  );
};

interface BookCallButtonProps {
  className?: string;
  label?: string;
}

/** Outlined pill matching the hero Book a Call control. */
export const BookCallButton: React.FC<BookCallButtonProps> = ({
  className = '',
  label = 'Book a Call',
}) => {
  return (
    <a
      href={INTRO_CALL_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex h-12 min-h-[44px] items-center gap-2.5 rounded-full border border-white/25 bg-white/[0.04] px-5 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4b5fd] ${className}`}
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M11 18h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      {label}
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
};
