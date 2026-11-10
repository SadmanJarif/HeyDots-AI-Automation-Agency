import React from 'react';

interface SectionKickerProps {
  text: string;
  className?: string;
}

/**
 * Section Kicker:
 * Renders left and right horizontal fading lines flanking the monospace uppercase label.
 */
export const SectionKicker: React.FC<SectionKickerProps> = ({ text, className = '' }) => {
  return (
    <div className={`inline-flex items-center justify-center gap-3.5 ${className}`}>
      <span
        aria-hidden="true"
        className="kicker-fade-left w-8 sm:w-14 h-[1px] shrink-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(10, 13, 20, 0) 0%, rgba(133, 139, 148, 0.45) 100%)',
        }}
      />
      <p className="font-mono-tech text-[11px] sm:text-[12px] uppercase tracking-[0.12em] text-[#aeb5c0] whitespace-nowrap">
        {text}
      </p>
      <span
        aria-hidden="true"
        className="kicker-fade-right w-8 sm:w-14 h-[1px] shrink-0"
        style={{
          background:
            'linear-gradient(270deg, rgba(10, 13, 20, 0) 0%, rgba(133, 139, 148, 0.45) 100%)',
        }}
      />
    </div>
  );
};

interface RainbowButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'rainbow' | 'dark' | 'pill';
  iconSrc?: string;
  className?: string;
  fullWidth?: boolean;
  type?: 'button' | 'submit';
}

const ButtonLeadingIcon: React.FC<{ label: string; variant: 'rainbow' | 'dark' | 'pill' }> = ({
  label,
  variant,
}) => {
  const upper = label.toUpperCase();

  // Phone / Intro Call icon
  if (upper.includes('CALL') || upper.includes('CONTACT')) {
    return (
      <svg
        className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }

  // Calendar / Consultation icon
  if (upper.includes('CONSULTATION') || upper.includes('SCHEDULE')) {
    return (
      <svg
        className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    );
  }

  // Stack / Integration icon
  if (upper.includes('STACK')) {
    return (
      <svg
        className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    );
  }

  // Story / Case Study icon
  if (upper.includes('STORY') || upper.includes('READ')) {
    return (
      <svg
        className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    );
  }

  // Default AI Sparkle icon for START A PROJECT / TALK TO AN EXPERT / etc.
  return (
    <svg
      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 ${
        variant === 'rainbow' ? 'text-[#c4b5fd]' : ''
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3 1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3Z" />
    </svg>
  );
};

export const RainbowButton: React.FC<RainbowButtonProps> = ({
  label,
  onClick,
  href,
  variant = 'rainbow',
  className = '',
  fullWidth = false,
  type = 'button',
}) => {
  const innerContent = (
    <span className="relative inline-flex items-center justify-center gap-2.5 overflow-hidden">
      {/* Leading Icon Badge */}
      <span className="btn-icon-badge w-6 h-6 rounded-[6px] bg-white/10 group-hover:bg-[#8b5cf6] text-white flex items-center justify-center shrink-0 transition-all duration-300">
        <ButtonLeadingIcon label={label} variant={variant} />
      </span>

      {/* Dual-Sliding Label */}
      <span className="relative block overflow-hidden h-[18px] leading-[18px]">
        <span className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full whitespace-nowrap">
          {label}
        </span>
        <span
          aria-hidden="true"
          className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full whitespace-nowrap"
        >
          {label}
        </span>
      </span>

      {/* Trailing Animated Arrow */}
      <span
        aria-hidden="true"
        className="relative w-3.5 h-3.5 overflow-hidden inline-flex items-center justify-center shrink-0 opacity-85 group-hover:opacity-100"
      >
        <svg
          className="w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 group-hover:-translate-y-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7" />
          <path d="M8 7h9v9" />
        </svg>
        <svg
          className="w-3.5 h-3.5 absolute -translate-x-4 translate-y-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </span>
    </span>
  );

  if (variant === 'rainbow') {
    const wrapperClasses = `group relative inline-flex items-center justify-center min-h-[44px] p-[1.5px] rounded-[11px] bg-clavion-rainbow shadow-clavion-rainbow hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.99] cursor-pointer ${
      fullWidth ? 'w-full' : ''
    } ${className}`;

    const innerSurface = (
      <span
        className={`rainbow-btn-surface inline-flex items-center justify-center min-h-[42px] px-4 py-2.5 rounded-[9.5px] bg-[#0a0d14] group-hover:bg-[#111520] transition-colors font-mono-tech text-[12px] font-medium tracking-[0.04em] uppercase text-[#edf0f5] whitespace-nowrap shrink-0 ${
          fullWidth ? 'w-full' : ''
        }`}
      >
        {innerContent}
      </span>
    );

    if (href && !onClick) {
      return (
        <a href={href} className={wrapperClasses}>
          {innerSurface}
        </a>
      );
    }

    return (
      <button type={type} onClick={onClick} className={wrapperClasses}>
        {innerSurface}
      </button>
    );
  }

  // Dark / secondary button variant (BOOK AN INTRO CALL, START A NEW PROJECT, READ FULL STORY)
  const darkWrapperClasses = `group relative inline-flex items-center justify-center min-h-[44px] p-[1px] rounded-[11px] bg-clavion-dark-btn-border hover:-translate-y-0.5 transition-all duration-200 active:translate-y-[1px] cursor-pointer ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

  const darkInnerSurface = (
    <span
      className={`secondary-dark-btn-surface inline-flex items-center justify-center min-h-[42px] px-4 py-2.5 rounded-[10px] bg-[#161920] group-hover:bg-[#1c2029] transition-colors font-mono-tech text-[12px] font-medium tracking-[0.04em] uppercase text-[#edf0f5] whitespace-nowrap shrink-0 ${
        fullWidth ? 'w-full' : ''
      }`}
    >
      {innerContent}
    </span>
  );

  if (href && !onClick) {
    return (
      <a href={href} className={darkWrapperClasses}>
        {darkInnerSurface}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={darkWrapperClasses}>
      {darkInnerSurface}
    </button>
  );
};
