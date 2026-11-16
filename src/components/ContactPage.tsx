import React, { useState } from 'react';
import { motion } from 'motion/react';
import { validateContactForm } from '../utils/clavionLogic';
import { RainbowButton, SectionKicker } from './RainbowButton';

interface ContactPageProps {
  onNavigate: (to: string) => void;
  onBookCall: () => void;
}

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const PROJECT_SCOPES = [
  'AI Automation',
  'Custom AI Agents',
  'AI Consulting',
  'Full-Stack AI App',
  'General Inquiry',
];

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onBookCall }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('AI Automation');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('info@heydots.com');
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Fallback if clipboard unavailable
      window.location.href = 'mailto:info@heydots.com';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      plan: selectedPlan,
      message: message.trim(),
    };

    const validation = validateContactForm(payload);
    if (!validation.valid) {
      setFormError(validation.error || 'Please check your input and try again.');
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
        // Ignore storage quota errors
      }

      setIsSubmitted(true);
    } catch {
      setFormError('Network error while sending your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormError(null);
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
  };

  return (
    <div className="relative z-10 pt-9 pb-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5">
        {/* Top HeyDots Brand Link & Hero */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <motion.a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: SMOOTH_EASE }}
            className="inline-flex items-center justify-center min-h-[44px] px-3 mb-10 focus:outline-none group"
            aria-label="HeyDots Home"
          >
            <span className="font-pacifico text-[32px] sm:text-[36px] text-[#f3f5fa] tracking-[0.01em] drop-shadow-[0_2px_16px_rgba(255,255,255,0.2)] group-hover:scale-[1.03] transition-transform">
              HeyDots
            </span>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: SMOOTH_EASE, delay: 0.04 }}
            className="mb-4"
          >
            <SectionKicker text="START A CONVERSATION" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: 0.08 }}
            className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.12] max-w-[680px] mb-4"
            style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.6rem)', textWrap: 'balance' }}
          >
            Let’s Build Your Next AI System
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: 0.13 }}
            className="text-[#aeb5c0] text-[15px] sm:text-[16px] leading-[1.6] max-w-[520px]"
          >
            Share your workflow goals or schedule an intro call. Our engineering team responds within 24 business hours.
          </motion.p>
        </div>

        {/* 2-Column Contact Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Interactive Project Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: 0.12 }}
            className="lg:col-span-7 relative overflow-hidden rounded-[22px] border border-[#858b94]/25 bg-clavion-card p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
          >
            {/* Top gradient accent hairline */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-8 h-[1px]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(139,92,246,0) 0%, rgba(167,139,250,0.65) 45%, rgba(56,189,248,0.55) 75%, rgba(56,189,248,0) 100%)',
              }}
            />

            {isSubmitted ? (
              <div className="py-10 text-center flex flex-col items-center">
                <span className="w-14 h-14 rounded-2xl bg-[#10b981]/15 border border-[#34d399]/40 text-[#34d399] flex items-center justify-center mb-5 shadow-[0_0_24px_rgba(52,211,153,0.25)]">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h2 className="text-[24px] font-medium text-[#f3f5fa] mb-2">
                  Message Received
                </h2>
                <p className="text-[14.5px] text-[#aeb5c0] max-w-[400px] leading-[1.6] mb-7">
                  Thanks, <span className="text-white font-medium">{name}</span>. We’ve logged your{' '}
                  <span className="text-[#a78bfa]">{selectedPlan}</span> inquiry and will reach out to{' '}
                  <span className="text-white">{email}</span> shortly.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <RainbowButton
                    label="SEND ANOTHER MESSAGE"
                    variant="dark"
                    onClick={handleReset}
                  />
                  <RainbowButton
                    label="BACK TO HOME"
                    variant="rainbow"
                    onClick={() => onNavigate('/')}
                  />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <p className="font-mono-tech text-[11px] uppercase tracking-[0.1em] text-[#9ca5b5] mb-3">
                    01 · SELECT FOCUS AREA
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_SCOPES.map((scope) => {
                      const active = selectedPlan === scope;
                      return (
                        <button
                          key={scope}
                          type="button"
                          onClick={() => setSelectedPlan(scope)}
                          className={`px-3.5 py-2 rounded-[10px] text-[12.5px] font-medium border transition-all cursor-pointer ${
                            active
                              ? 'bg-[#8b5cf6]/20 border-[#8b5cf6]/70 text-white shadow-[0_0_16px_rgba(139,92,246,0.28)]'
                              : 'bg-[#0e111a]/80 border-white/[0.08] text-[#9ca5b5] hover:text-white hover:border-white/20'
                          }`}
                        >
                          {scope}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label
                      htmlFor="contact-page-name"
                      className="block text-[12.5px] font-medium text-[#cfd5e2] mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-page-name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[11px] bg-[#0b0e17] border border-white/[0.1] focus:border-[#8b5cf6]/70 text-[14px] text-[#f3f5fa] placeholder-[#687080] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-page-email"
                      className="block text-[12.5px] font-medium text-[#cfd5e2] mb-1.5"
                    >
                      Work Email *
                    </label>
                    <input
                      id="contact-page-email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[11px] bg-[#0b0e17] border border-white/[0.1] focus:border-[#8b5cf6]/70 text-[14px] text-[#f3f5fa] placeholder-[#687080] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-page-company"
                    className="block text-[12.5px] font-medium text-[#cfd5e2] mb-1.5"
                  >
                    Company / Website <span className="text-[#687080]">(Optional)</span>
                  </label>
                  <input
                    id="contact-page-company"
                    name="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Corp — acme.com"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[11px] bg-[#0b0e17] border border-white/[0.1] focus:border-[#8b5cf6]/70 text-[14px] text-[#f3f5fa] placeholder-[#687080] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-page-message"
                    className="block text-[12.5px] font-medium text-[#cfd5e2] mb-1.5"
                  >
                    What would you like to automate or build? *
                  </label>
                  <textarea
                    id="contact-page-message"
                    name="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your current tools, bottlenecks, and goals..."
                    className="w-full px-3.5 py-3 rounded-[11px] bg-[#0b0e17] border border-white/[0.1] focus:border-[#8b5cf6]/70 text-[14px] text-[#f3f5fa] placeholder-[#687080] focus:outline-none transition-colors resize-y"
                  />
                </div>

                {formError && (
                  <p
                    role="alert"
                    className="px-3.5 py-2.5 rounded-[10px] bg-[#ef4444]/10 border border-[#ef4444]/35 text-[13px] text-[#fca5a5]"
                  >
                    {formError}
                  </p>
                )}

                <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center justify-center p-[1.5px] rounded-[11px] bg-clavion-rainbow shadow-clavion-rainbow cursor-pointer disabled:opacity-60"
                  >
                    <span className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 rounded-[10px] bg-[#0a0d14] group-hover:bg-[#111521] font-mono-tech text-[12px] font-medium uppercase tracking-[0.08em] text-[#edf0f5] transition-colors">
                      {isSubmitting ? 'SENDING...' : 'SEND PROJECT INQUIRY'}
                      <span aria-hidden="true">→</span>
                    </span>
                  </button>

                  <span className="text-[12px] text-[#858b94]">
                    No spam. NDA available on request.
                  </span>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right Column (5 cols): Direct Channels & Call Card */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Direct Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: 0.16 }}
              className="premium-interactive-card rounded-[20px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-6"
            >
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.1em] text-[#38bdf8] mb-2">
                [ DIRECT EMAIL ]
              </p>
              <h2 className="text-[19px] font-medium text-[#f3f5fa] mb-1.5">
                Prefer email directly?
              </h2>
              <p className="text-[13.5px] text-[#9ca5b5] leading-[1.55] mb-4">
                Reach our solutions architects directly anytime.
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="mailto:info@heydots.com"
                  className="inline-flex items-center gap-2 min-h-[42px] px-4 rounded-[10px] bg-white hover:bg-[#edf0f5] text-[#0a0d14] text-[13px] font-semibold transition-colors"
                >
                  info@heydots.com
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 min-h-[42px] px-3.5 rounded-[10px] bg-[#161923] hover:bg-[#1e2331] border border-white/[0.1] text-[12.5px] text-[#d5dce6] transition-colors cursor-pointer"
                >
                  {copiedEmail ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </motion.div>

            {/* Book a Discovery Call Card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: 0.22 }}
              className="premium-interactive-card rounded-[20px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-6"
            >
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.1em] text-[#a78bfa] mb-2">
                [ INTRO CALL ]
              </p>
              <h2 className="text-[19px] font-medium text-[#f3f5fa] mb-2">
                Book a 20-Min Strategy Call
              </h2>
              <ul className="space-y-2 text-[13px] text-[#aeb5c0] mb-5">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                  Audit your current manual workflows
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                  Review high-ROI automation architecture
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                  Get clear timeline &amp; investment estimate
                </li>
              </ul>
              <RainbowButton
                label="BOOK AN INTRO CALL"
                variant="dark"
                iconSrc="/assets/clavion/GukJuD6D51RayodFgi8oQiSRe0.svg"
                onClick={onBookCall}
              />
            </motion.div>

            {/* Availability & Coverage Card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: 0.28 }}
              className="rounded-[20px] border border-white/[0.08] bg-[#0c0f17]/90 p-5 flex items-center justify-between gap-4"
            >
              <div>
                <div className="inline-flex items-center gap-2 text-[13px] font-medium text-[#edf0f5] mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399]" />
                  <span>Accepting New Projects</span>
                </div>
                <p className="text-[12px] text-[#8f96a6]">
                  Global Remote-First · Americas, EMEA &amp; APAC
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/about')}
                className="text-[12.5px] font-medium text-[#a78bfa] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
              >
                About Us →
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
