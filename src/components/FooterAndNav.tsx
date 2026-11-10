import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BlogPost, CaseStudy } from '../data/clavionData';
import { validateContactForm } from '../utils/clavionLogic';
import { AsciiWaveBackground } from './AsciiWaveBackground';
import DriftbarFooter from './DriftbarFooter';
import { RainbowButton } from './RainbowButton';

interface FooterAndNavProps {
  onOpenContact: (defaultPlan?: string) => void;
  onBookCall: () => void;
  contactModalPlan: string | null;
  onCloseContact: () => void;
  selectedCaseStudy: CaseStudy | null;
  onCloseCaseStudy: () => void;
  selectedBlogPost: BlogPost | null;
  onCloseBlogPost: () => void;
  infoModalPage: 'about' | 'privacy' | '404' | null;
  onSelectInfoModal: (page: 'about' | 'privacy' | '404' | null) => void;
}

const MOBILE_NAV_LINKS = [
  { label: 'Services', href: '#service' },
  { label: 'Process', href: '#process' },
  { label: 'Case study', href: '#case' },
  { label: 'Blog', href: '#blog' },
];

export const FooterAndNav: React.FC<FooterAndNavProps> = ({
  onOpenContact,
  onBookCall,
  contactModalPlan,
  onCloseContact,
  selectedCaseStudy,
  onCloseCaseStudy,
  selectedBlogPost,
  onCloseBlogPost,
  infoModalPage,
  onSelectInfoModal,
}) => {
  // Mobile bottom navigation menu open/closed state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Contact modal form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isAnyModalOpen = Boolean(
    contactModalPlan || selectedCaseStudy || selectedBlogPost || infoModalPage
  );

  const resetAndCloseContact = () => {
    setFormSubmitted(false);
    setIsSubmitting(false);
    setFormError(null);
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    onCloseContact();
  };

  // Focus trap & Escape handler for modals and mobile menu (DEF-5, DEF-6)
  useEffect(() => {
    if (!isAnyModalOpen && !isMobileMenuOpen) return;

    if (document.activeElement instanceof HTMLElement) {
      previousFocusRef.current = document.activeElement;
    }

    const focusTimer = window.setTimeout(() => {
      if (dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'input, textarea, select, button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        const firstInput = dialogRef.current.querySelector<HTMLElement>('input, textarea');
        if (firstInput) {
          firstInput.focus();
        } else if (focusables.length > 0) {
          focusables[0].focus();
        }
      }
    }, 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (contactModalPlan) resetAndCloseContact();
        else if (selectedCaseStudy) onCloseCaseStudy();
        else if (selectedBlogPost) onCloseBlogPost();
        else if (infoModalPage) onSelectInfoModal(null);
        else if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (!active || active === first || !dialogRef.current.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (!active || active === last || !dialogRef.current.contains(active)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [
    isAnyModalOpen,
    isMobileMenuOpen,
    contactModalPlan,
    selectedCaseStudy,
    selectedBlogPost,
    infoModalPage,
  ]);

  // Lock body scroll when mobile menu or modal is open
  useEffect(() => {
    if (isMobileMenuOpen || isAnyModalOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isMobileMenuOpen, isAnyModalOpen]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      plan: contactModalPlan || 'General Inquiry',
      message: message.trim(),
    };

    const check = validateContactForm(payload);
    if (!check.valid) {
      setFormError(check.error || 'Please complete all required fields.');
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json().catch(() => ({ ok: response.ok }));
      if (!response.ok) {
        setFormError(responseData?.error || 'Unable to submit request. Please try again.');
        setIsSubmitting(false);
        return;
      }

      const leadRecord = responseData?.lead || {
        ...payload,
        id: `lead_${Date.now()}`,
        receivedAt: new Date().toISOString(),
      };

      try {
        const existingRaw = window.localStorage.getItem('heydots_leads');
        const existingLeads = existingRaw ? JSON.parse(existingRaw) : [];
        existingLeads.push(leadRecord);
        window.localStorage.setItem('heydots_leads', JSON.stringify(existingLeads));
        window.sessionStorage.setItem('heydots_last_lead', JSON.stringify(leadRecord));
      } catch {
        // Ignore storage quota errors in restricted environments
      }

      setFormSubmitted(true);
    } catch {
      setFormError('Network error while sending your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* READY TO START YOUR AI PROJECT CTA SECTION */}
      <section
        id="contact"
        className="relative max-w-[1200px] mx-auto px-5 py-20 overflow-hidden scroll-mt-20"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AsciiWaveBackground className="w-full h-[280px]" cols={64} rows={14} />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-[480px] mx-auto py-8">
          <h2
            className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.15] mb-3"
            style={{ fontSize: 'clamp(1.95rem, 3.8vw, 2.85rem)', textWrap: 'balance' }}
          >
            Ready to Start Your AI Project?
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#aeb5c0] leading-[1.6] max-w-[340px] mb-8">
            Let’s explore how AI can boost your workflow and business performance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <RainbowButton
              label="TALK TO AN EXPERT"
              variant="rainbow"
              onClick={() => onOpenContact('Start AI Project')}
            />
            <RainbowButton
              label="BOOK AN INTRO CALL"
              variant="dark"
              iconSrc="/assets/clavion/GukJuD6D51RayodFgi8oQiSRe0.svg"
              onClick={onBookCall}
            />
          </div>
        </div>
      </section>

      {/* HEYDOTS MEADOW VIDEO FOOTER (DriftbarFooter) */}
      <DriftbarFooter />

      {/* FULL-SCREEN BLURRED BACKDROP OVERLAY WHEN MOBILE NAVBAR IS OPEN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-[#0a0d14]/70 backdrop-blur-md md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* FLOATING BOTTOM NAVIGATION BAR (Desktop + Responsive Mobile Dock) */}
      <header className="fixed bottom-4 inset-x-0 z-40 flex flex-col items-center justify-end px-4 pointer-events-none">
        {/* MOBILE POPUP MENU CARD (Renders right above the mobile bottom dock when open) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-navigation-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-auto md:hidden w-full max-w-[420px] mb-3.5 rounded-[12px] bg-[#0a0d14] border border-[#858b94]/20 shadow-[0_0_0_6px_#161920,0_20px_50px_rgba(0,0,0,0.85)] p-4 nav-dock-surface"
            >
              <ul className="flex flex-col gap-1">
                {MOBILE_NAV_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center min-h-[48px] px-3 py-3 rounded-lg text-[15px] font-normal text-[#aeb5c0] hover:text-[#edf0f5] hover:bg-white/[0.04] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DESKTOP / TABLET BOTTOM DOCK (md and up) */}
        <nav
          aria-label="Primary desktop navigation"
          className="pointer-events-auto hidden md:flex items-center gap-5 px-5 py-2.5 rounded-[10px] bg-[#0a0d14] border border-[#858b94]/20 shadow-[0_0_0_6px_#161920,0_16px_40px_rgba(0,0,0,0.8)] nav-dock-surface transition-all duration-300"
        >
          {/* Left Nav Links */}
          <div className="flex items-center gap-4 text-[13px] text-[#aeb5c0]">
            <a
              href="#service"
              className="inline-flex items-center min-h-[44px] px-2 hover:text-[#edf0f5] transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#process"
              className="inline-flex items-center min-h-[44px] px-2 hover:text-[#edf0f5] transition-colors whitespace-nowrap shrink-0"
            >
              Process
            </a>
            <a
              href="#case"
              className="inline-flex items-center min-h-[44px] px-2 hover:text-[#edf0f5] transition-colors whitespace-nowrap shrink-0"
            >
              Case study
            </a>
          </div>

          {/* Center HeyDots Brand Button with Rainbow Ring */}
          <a
            href="#home"
            aria-label="HeyDots Home"
            className="h-11 min-h-[44px] min-w-[44px] rounded-full p-[1.5px] bg-clavion-rainbow flex items-center justify-center shrink-0 mx-1 hover:scale-105 transition-transform"
          >
            <span className="px-4 h-full rounded-full bg-[#161920] flex items-center justify-center font-pacifico text-[16px] text-[#f3f5fa] tracking-[0.01em] whitespace-nowrap">
              HeyDots
            </span>
          </a>

          {/* Right Nav Links + Contact Button */}
          <div className="flex items-center gap-3 text-[13px] text-[#aeb5c0]">
            <a
              href="#blog"
              className="inline-flex items-center min-h-[44px] px-2 hover:text-[#edf0f5] transition-colors whitespace-nowrap shrink-0"
            >
              Blog
            </a>
            <button
              type="button"
              onClick={() => onOpenContact('Bottom Dock Contact')}
              className="group relative inline-flex items-center justify-center min-h-[44px] p-[1px] rounded-[8px] bg-clavion-dark-btn-border cursor-pointer shrink-0"
            >
              <span className="secondary-dark-btn-surface inline-flex items-center gap-1.5 min-h-[42px] px-3.5 py-2 rounded-[7px] bg-[#161920] group-hover:bg-[#1c2029] font-mono-tech text-[11px] uppercase tracking-wider text-[#edf0f5] transition-colors whitespace-nowrap">
                <svg
                  className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:rotate-12"
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
                <span>CONTACT</span>
              </span>
            </button>
          </div>
        </nav>

        {/* MOBILE BOTTOM DOCK (< 768px) */}
        <nav
          aria-label="Primary mobile navigation"
          className="pointer-events-auto flex md:hidden items-center justify-between w-full max-w-[420px] px-3 py-2 rounded-[10px] bg-[#0a0d14] border border-[#858b94]/20 shadow-[0_0_0_6px_#161920,0_16px_40px_rgba(0,0,0,0.85)] nav-dock-surface transition-all duration-300"
        >
          {/* Left Rainbow-Ringed HeyDots Brand Text */}
          <a
            href="#home"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="HeyDots Home"
            className="h-11 min-h-[44px] min-w-[44px] rounded-full p-[1.5px] bg-clavion-rainbow flex items-center justify-center shrink-0"
          >
            <span className="px-4 h-full rounded-full bg-[#161920] flex items-center justify-center font-pacifico text-[16px] text-[#f3f5fa] tracking-[0.01em] whitespace-nowrap">
              HeyDots
            </span>
          </a>

          {/* Right Controls: Menu Toggle Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-dialog"
              aria-haspopup="dialog"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-[8px] bg-[#161920] hover:bg-[#1c2029] border border-[#858b94]/20 flex items-center justify-center text-[#edf0f5] transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3.5 6.25H14.5M3.5 11.75H14.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* CONTACT / CONSULTATION MODAL */}
      {contactModalPlan && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) resetAndCloseContact();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-[480px] rounded-[20px] border border-white/15 bg-[#12151f] p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={resetAndCloseContact}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-[#1c202b] hover:bg-[#252a38] border border-white/10 flex items-center justify-center text-[#aeb5c0] hover:text-white cursor-pointer"
            >
              ✕
            </button>

            <p className="font-mono-tech text-[11px] uppercase tracking-[0.12em] text-[#66bcd3] mb-2">
              {contactModalPlan}
            </p>
            <h3
              id="contact-modal-title"
              className="text-[22px] font-medium text-clavion-gradient mb-2"
            >
              Start Your AI Automation Journey
            </h3>
            <p className="text-[13px] text-[#aeb5c0] mb-6">
              Share your workflow goals below and our AI consultants will respond within 24 hours.
            </p>

            {formSubmitted ? (
              <div
                role="status"
                aria-live="polite"
                className="rounded-[14px] border border-[#66bcd3]/30 bg-[#0c131d] p-5 text-center"
              >
                <p className="text-[16px] font-medium text-[#edf0f5] mb-1">
                  Consultation Request Received
                </p>
                <p className="text-[13px] text-[#aeb5c0] mb-5">
                  Thank you, {name}! Our engineering lead will reach out to{' '}
                  <span className="text-[#edf0f5]">{email}</span> shortly.
                </p>
                <RainbowButton
                  label="DONE"
                  variant="rainbow"
                  onClick={resetAndCloseContact}
                />
              </div>
            ) : (
              <form
                action="/api/contact"
                method="POST"
                onSubmit={handleContactSubmit}
                className="flex flex-col gap-4"
                noValidate
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[12px] text-[#aeb5c0] mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    aria-label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ethan Parker"
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#0a0d14] border border-white/10 text-[13px] text-[#edf0f5] focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[12px] text-[#aeb5c0] mb-1.5"
                  >
                    Work Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    aria-label="Work Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ethan@company.com"
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#0a0d14] border border-white/10 text-[13px] text-[#edf0f5] focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-[12px] text-[#aeb5c0] mb-1.5"
                  >
                    Company / Website *
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    required
                    autoComplete="organization"
                    aria-label="Company or Website"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Nexora Labs"
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#0a0d14] border border-white/10 text-[13px] text-[#edf0f5] focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[12px] text-[#aeb5c0] mb-1.5"
                  >
                    What would you like to automate? *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    required
                    autoComplete="off"
                    aria-label="What would you like to automate?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="We want to automate tier-1 support tickets and CRM syncing..."
                    className="w-full px-3.5 py-2.5 rounded-[10px] bg-[#0a0d14] border border-white/10 text-[13px] text-[#edf0f5] focus:outline-none focus:border-white/30 resize-none"
                  />
                </div>

                <div role="alert" aria-live="assertive">
                  {formError && (
                    <p className="text-[12px] text-[#e06368]">{formError}</p>
                  )}
                </div>

                <div className="pt-2">
                  <RainbowButton
                    label={isSubmitting ? 'SENDING REQUEST...' : 'SUBMIT REQUEST'}
                    variant="rainbow"
                    fullWidth
                    type="submit"
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CASE STUDY FULL STORY MODAL */}
      {selectedCaseStudy && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) onCloseCaseStudy();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
        >
          <div className="relative w-full max-w-[680px] rounded-[20px] border border-white/15 bg-[#12151f] p-6 sm:p-8 shadow-2xl my-8">
            <button
              type="button"
              onClick={onCloseCaseStudy}
              aria-label="Close case study"
              className="absolute top-4 right-4 w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-[#1c202b] hover:bg-[#252a38] border border-white/10 flex items-center justify-center text-[#aeb5c0] hover:text-white cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={selectedCaseStudy.clientLogo}
                alt={selectedCaseStudy.clientName}
                className="h-6 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#858b94]">
                Case Study
              </span>
            </div>

            <h3
              id="case-study-modal-title"
              className="text-[24px] sm:text-[28px] font-medium text-clavion-gradient mb-4"
            >
              {selectedCaseStudy.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCaseStudy.metrics.map((m) => (
                <span
                  key={m}
                  className="px-3 py-1.5 rounded-lg bg-[#161922] border border-white/10 font-mono-tech text-[11px] text-[#edf0f5]"
                >
                  {m}
                </span>
              ))}
            </div>

            <div className="space-y-4 text-[14px] text-[#aeb5c0] leading-[1.65] mb-7">
              <div>
                <h4 className="text-[#edf0f5] font-medium mb-1">The Challenge</h4>
                <p>{selectedCaseStudy.challenge}</p>
              </div>
              <div>
                <h4 className="text-[#edf0f5] font-medium mb-1">
                  The <span className="font-pacifico font-normal">HeyDots</span> Architecture
                </h4>
                <p>{selectedCaseStudy.solution}</p>
              </div>
              <div>
                <h4 className="text-[#edf0f5] font-medium mb-1">Measurable Impact</h4>
                <p>{selectedCaseStudy.outcome}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <RainbowButton
                label="BUILD SIMILAR WORKFLOW"
                variant="rainbow"
                onClick={() => {
                  const title = selectedCaseStudy.title;
                  onCloseCaseStudy();
                  onOpenContact(`Case Study: ${title}`);
                }}
              />
              <RainbowButton
                label="CLOSE"
                variant="dark"
                onClick={onCloseCaseStudy}
              />
            </div>
          </div>
        </div>
      )}

      {/* BLOG POST READER MODAL */}
      {selectedBlogPost && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) onCloseBlogPost();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
        >
          <div className="relative w-full max-w-[680px] rounded-[20px] border border-white/15 bg-[#12151f] p-6 sm:p-8 shadow-2xl my-8">
            <button
              type="button"
              onClick={onCloseBlogPost}
              aria-label="Close article"
              className="absolute top-4 right-4 w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-[#1c202b] hover:bg-[#252a38] border border-white/10 flex items-center justify-center text-[#aeb5c0] hover:text-white cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md bg-[#161922] border border-white/10 text-[11px] text-[#aeb5c0]">
                {selectedBlogPost.category}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#161922] border border-white/10 text-[11px] text-[#aeb5c0]">
                {selectedBlogPost.date}
              </span>
              <span className="text-[12px] text-[#858b94] ml-1">
                {selectedBlogPost.readTime}
              </span>
            </div>

            <h3
              id="blog-modal-title"
              className="text-[24px] sm:text-[28px] font-medium text-clavion-gradient mb-5"
            >
              {selectedBlogPost.title}
            </h3>

            <div className="rounded-[14px] overflow-hidden border border-white/10 mb-6 aspect-[16/9]">
              <img
                src={selectedBlogPost.image}
                alt={selectedBlogPost.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4 text-[14px] sm:text-[15px] text-[#aeb5c0] leading-[1.7] mb-7">
              {selectedBlogPost.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <RainbowButton
                label="DISCUSS THIS TOPIC"
                variant="rainbow"
                onClick={() => {
                  onCloseBlogPost();
                  onOpenContact(`Blog Inquiry: ${selectedBlogPost.title}`);
                }}
              />
              <RainbowButton
                label="CLOSE"
                variant="dark"
                onClick={onCloseBlogPost}
              />
            </div>
          </div>
        </div>
      )}

      {/* INFO MODAL (About / Privacy Policy / Error 404 preview) */}
      {infoModalPage && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Information dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) onSelectInfoModal(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-[540px] rounded-[20px] border border-white/15 bg-[#12151f] p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => onSelectInfoModal(null)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg bg-[#1c202b] hover:bg-[#252a38] border border-white/10 flex items-center justify-center text-[#aeb5c0] hover:text-white cursor-pointer"
            >
              ✕
            </button>

            {infoModalPage === 'about' && (
              <>
                <p className="font-mono-tech text-[11px] uppercase tracking-wider text-[#aeb5c0] mb-2">
                  ABOUT <span className="font-pacifico normal-case text-[#f3f5fa] text-[13px] ml-0.5">HeyDots</span>
                </p>
                <h3 className="text-[24px] font-medium text-clavion-gradient mb-3">
                  Engineering Reliable AI Ecosystems
                </h3>
                <p className="text-[14px] text-[#aeb5c0] leading-[1.65] mb-6">
                  <span className="font-pacifico text-[#f3f5fa]">HeyDots</span> is an AI consulting and automation agency founded by engineers, systems architects, and product designers. We partner with modern businesses to replace brittle manual operations with observable, human-guided AI workflows.
                </p>
              </>
            )}

            {infoModalPage === 'privacy' && (
              <>
                <p className="font-mono-tech text-[11px] uppercase tracking-wider text-[#aeb5c0] mb-2">
                  LEGAL &amp; SYSTEM
                </p>
                <h3 className="text-[24px] font-medium text-clavion-gradient mb-3">
                  Privacy Policy &amp; Data Guardrails
                </h3>
                <p className="text-[14px] text-[#aeb5c0] leading-[1.65] mb-6">
                  We respect your privacy and enforce strict access controls on all client data. Information submitted through our consultation or newsletter forms is used exclusively to communicate with you about <span className="font-pacifico text-[#f3f5fa]">HeyDots</span> services and is never sold or shared with third parties.
                </p>
              </>
            )}

            {infoModalPage === '404' && (
              <>
                <p className="font-mono-tech text-[11px] uppercase tracking-wider text-[#e06368] mb-2">
                  [ ERROR 404 ]
                </p>
                <h3 className="text-[24px] font-medium text-clavion-gradient mb-3">
                  Page Not Found
                </h3>
                <p className="text-[14px] text-[#aeb5c0] leading-[1.65] mb-6">
                  The route you requested does not exist or has been automated away. Return to the main <span className="font-pacifico text-[#f3f5fa]">HeyDots</span> workspace below.
                </p>
              </>
            )}

            <RainbowButton
              label="BACK TO HOME"
              variant="rainbow"
              onClick={() => onSelectInfoModal(null)}
            />
          </div>
        </div>
      )}
    </>
  );
};
