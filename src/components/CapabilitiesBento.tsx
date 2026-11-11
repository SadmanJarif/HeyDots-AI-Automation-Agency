import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { RainbowButton, SectionKicker } from './RainbowButton';
import { AsciiWaveBackground } from './AsciiWaveBackground';
import { CountUp } from './CountUp';

interface CapabilitiesBentoProps {
  onOpenContact: (defaultPlan?: string) => void;
}

const CHATBOT_PROMPTS = [
  'Ready to build? Describe',
  'Automate tier-1 support & sales triage',
  'Qualification bot synced with HubSpot',
  'Deploy 24/7 multilingual AI concierge',
];

const BAR_CHART_DATA = [
  { label: '$4k', heightPct: 40, day: 'Mon' },
  { label: '$6k', heightPct: 62, day: 'Tue' },
  { label: '$3.5k', heightPct: 34, day: 'Wed' },
  { label: '$10k', heightPct: 96, day: 'Thu', featured: true },
  { label: '$5k', heightPct: 48, day: 'Fri' },
];

const INTEGRATION_ROWS: {
  direction: 'left' | 'right';
  items: { label: string; icon: 'crm' | 'bot' | 'route' | 'book' | 'user' | 'sparkle' | 'chat' | 'wand' }[];
}[] = [
  {
    direction: 'left',
    items: [
      { label: 'CRM integration', icon: 'crm' },
      { label: 'Workflow automation', icon: 'bot' },
      { label: 'API orchestration', icon: 'route' },
      { label: 'CRM integration', icon: 'crm' },
      { label: 'Workflow automation', icon: 'bot' },
      { label: 'API orchestration', icon: 'route' },
    ],
  },
  {
    direction: 'right',
    items: [
      { label: 'Intelligent routing', icon: 'route' },
      { label: 'Data synchronization', icon: 'book' },
      { label: 'Smart webhooks', icon: 'sparkle' },
      { label: 'Intelligent routing', icon: 'route' },
      { label: 'Data synchronization', icon: 'book' },
      { label: 'Smart webhooks', icon: 'sparkle' },
    ],
  },
  {
    direction: 'left',
    items: [
      { label: 'Lead scoring', icon: 'user' },
      { label: 'Chatbot deployment', icon: 'bot' },
      { label: 'Context memory', icon: 'book' },
      { label: 'Lead scoring', icon: 'user' },
      { label: 'Chatbot deployment', icon: 'bot' },
      { label: 'Context memory', icon: 'book' },
    ],
  },
  {
    direction: 'right',
    items: [
      { label: 'Analytics pipelines', icon: 'crm' },
      { label: 'RPA solutions', icon: 'sparkle' },
      { label: 'AI assistants', icon: 'chat' },
      { label: 'Analytics pipelines', icon: 'crm' },
      { label: 'RPA solutions', icon: 'sparkle' },
      { label: 'AI assistants', icon: 'chat' },
    ],
  },
  {
    direction: 'left',
    items: [
      { label: 'Data pipelines', icon: 'route' },
      { label: 'Model deployment', icon: 'bot' },
      { label: 'Vector indexing', icon: 'book' },
      { label: 'Data pipelines', icon: 'route' },
      { label: 'Model deployment', icon: 'bot' },
      { label: 'Vector indexing', icon: 'book' },
    ],
  },
  {
    direction: 'right',
    items: [
      { label: 'Task automation', icon: 'sparkle' },
      { label: 'Process optimization', icon: 'wand' },
      { label: 'Live monitoring', icon: 'chat' },
      { label: 'Task automation', icon: 'sparkle' },
      { label: 'Process optimization', icon: 'wand' },
      { label: 'Live monitoring', icon: 'chat' },
    ],
  },
];

const IntegrationPillIcon: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'bot':
      return (
        <svg className="w-3.5 h-3.5 text-[#8e96a8] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <rect x="4" y="8" width="16" height="12" rx="3" />
          <path d="M12 4v4M9 13h.01M15 13h.01M9 17h6" strokeLinecap="round" />
        </svg>
      );
    case 'book':
      return (
        <svg className="w-3.5 h-3.5 text-[#8e96a8] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'user':
      return (
        <svg className="w-3.5 h-3.5 text-[#8e96a8] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="10" cy="8" r="4" />
          <path d="M3 20c1.5-3.5 4.2-5 7-5s5.5 1.5 7 5M19 8v6M16 11h6" strokeLinecap="round" />
        </svg>
      );
    case 'sparkle':
      return (
        <svg className="w-3.5 h-3.5 text-[#8e96a8] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="m12 3 1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3Z" strokeLinejoin="round" />
        </svg>
      );
    case 'chat':
      return (
        <svg className="w-3.5 h-3.5 text-[#8e96a8] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinejoin="round" />
        </svg>
      );
    case 'wand':
      return (
        <svg className="w-3.5 h-3.5 text-[#8e96a8] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="m15 4-1 1 4 4 1-1a2.83 2.83 0 1 0-4-4ZM13 6 3 16v4h4L17 10M8 2v2M2 8h2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg className="w-3.5 h-3.5 text-[#8e96a8] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M8.5 8.5 15.5 15.5" strokeLinecap="round" />
        </svg>
      );
  }
};

export const CapabilitiesBento: React.FC<CapabilitiesBentoProps> = ({ onOpenContact }) => {
  const [clientCount] = useState(120);
  const [satisfactionRate] = useState(99);
  const [isConsultingHovered, setIsConsultingHovered] = useState(false);

  // Interactive states for the new Solutions Bento Showcase
  const [promptIndex, setPromptIndex] = useState(0);
  const [typedText, setTypedText] = useState('Ready to build? Describe');
  const [isChatbotHovered, setIsChatbotHovered] = useState(false);
  const [activeToolIdx, setActiveToolIdx] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const [isCalendarHovered, setIsCalendarHovered] = useState(false);
  const [isChartHovered, setIsChartHovered] = useState(false);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [isIntegrationHovered, setIsIntegrationHovered] = useState(false);
  const [autoBarIndex, setAutoBarIndex] = useState(3);

  // Continuous live motion across the chart & calendar
  useEffect(() => {
    const timer = window.setInterval(() => {
      setAutoBarIndex((prev) => (prev + 1) % BAR_CHART_DATA.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const target = CHATBOT_PROMPTS[promptIndex];
    if (!isChatbotHovered && promptIndex === 0 && typedText === target) {
      return;
    }

    let charIdx = 0;
    setTypedText('');
    const typeInterval = window.setInterval(() => {
      charIdx += 1;
      setTypedText(target.slice(0, charIdx));
      if (charIdx >= target.length) {
        window.clearInterval(typeInterval);
      }
    }, 34);

    return () => window.clearInterval(typeInterval);
  }, [promptIndex, isChatbotHovered]);

  const [chatbotResult, setChatbotResult] = useState<string | null>(null);

  const handleGenerateClick = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);
    const nextIdx = (promptIndex + 1) % CHATBOT_PROMPTS.length;
    const promptToRun = typedText.trim() || CHATBOT_PROMPTS[nextIdx];
    try {
      const res = await fetch('/api/workflow-preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToRun }),
      });
      if (res.ok) {
        const data = await res.json();
        setChatbotResult(data.summary || 'Custom AI assistant blueprint generated.');
      }
    } catch {
      // Fallback summary if offline
      setChatbotResult('Custom AI assistant blueprint generated.');
    }
    setPromptIndex(nextIdx);
    window.setTimeout(() => {
      setIsGenerating(false);
    }, 450);
  };

  return (
    <section id="service" className="max-w-[1200px] mx-auto px-5 py-16 scroll-mt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
        className="flex flex-col items-center text-center mb-12"
      >
        <SectionKicker text="EXPERTISE & CAPABILITIES" className="mb-3" />
        <h2
          className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.16] max-w-[460px]"
          style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)', textWrap: 'balance' }}
        >
          AI Consulting and Automation Solutions
        </h2>
      </motion.div>

      {/* Bento Grid Container */}
      <div className="flex flex-col gap-6">
        {/* ROW 1: AI Automation + AI Agent Development */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: AI Automation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
            className="premium-interactive-card group rounded-[18px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300"
          >
            <div className="mb-6">
              <h3 className="text-[20px] sm:text-[22px] font-medium text-clavion-gradient mb-2">
                AI Automation
              </h3>
              <p className="text-[14px] text-[#aeb5c0] leading-[1.6] max-w-[420px] mb-4">
                We design intelligent systems that automate repetitive tasks and ensure smooth operations.
              </p>
              <div className="flex flex-col gap-2">
                {['Workflow mapping', 'Real-time system integration'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-[13px] text-[#edf0f5]">
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
            </div>

            {/* Hub graphic */}
            <div className="relative w-full flex items-center justify-center pt-2">
              <img
                src="/assets/clavion/fJ7OgubygTIHLGyRflLsgvqP3E.png"
                alt="AI Automation Hub"
                className="w-full max-w-[500px] h-auto object-contain rounded-xl transition-transform duration-500 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Card 2: AI Agent Development */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.7, delay: 0.08 }}
            className="premium-interactive-card rounded-[18px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300"
          >
            <div className="mb-6">
              <h3 className="text-[20px] sm:text-[22px] font-medium text-clavion-gradient mb-2">
                AI Agent Development
              </h3>
              <p className="text-[14px] text-[#aeb5c0] leading-[1.6] max-w-[420px]">
                Our experts build custom AI agents that understand context, make decisions, and act autonomously.
              </p>
            </div>

            {/* Code Window Preview */}
            <div className="rounded-[14px] border border-[#858b94]/20 bg-[#0c0f17] overflow-hidden">
              {/* Top Window Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#131722]">
                <img
                  src="/assets/clavion/fTXYSvGmDIJ6bDSxyNUsShlyI.svg"
                  alt="Window controls"
                  className="h-2.5 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1c2130] border border-white/10 text-[11px] text-[#edf0f5]">
                  <img
                    src="/assets/clavion/pHS3xuDuHQP1c8bCQ6u1XlUdWw.svg"
                    alt="Code view icon"
                    className="w-3.5 h-3.5 object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <span>Code</span>
                </div>
              </div>

              {/* Scrolling Code Body */}
              <div className="relative h-[215px] overflow-hidden p-4 bg-[#0c0f17] code-window-body">
                <div className="animate-code-scroll flex flex-col gap-4">
                  <img
                    src="/assets/clavion/Up0ciluFSofeStucGMLiRLT6Tzg.png"
                    alt="Python AI agent code snippet"
                    className="w-full h-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="/assets/clavion/Up0ciluFSofeStucGMLiRLT6Tzg.png"
                    alt="Python AI agent code snippet"
                    className="w-full h-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Top & bottom fade masks */}
                <div
                  className="code-fade-top pointer-events-none absolute inset-x-0 top-0 h-8"
                  style={{
                    background: 'linear-gradient(180deg, #0c0f17 0%, rgba(12,15,23,0) 100%)',
                  }}
                />
                <div
                  className="code-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 h-10"
                  style={{
                    background: 'linear-gradient(0deg, #0c0f17 0%, rgba(12,15,23,0) 100%)',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ROW 2: AI Chatbots & Support Bots + Center Stats Column + AI Consulting & Training */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Card (5 cols): AI Chatbots & Support Bots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
            className="premium-interactive-card group lg:col-span-5 rounded-[18px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-6 sm:p-7 flex flex-col justify-between transition-all duration-300"
          >
            <div className="mb-6">
              <h3 className="text-[20px] sm:text-[22px] font-medium text-clavion-gradient mb-2">
                AI Chatbots & Support Bots
              </h3>
              <p className="text-[14px] text-[#aeb5c0] leading-[1.6]">
                We build AI chatbots that deliver fast, consistent, human-like responses.
              </p>
            </div>

            {/* Chat Dialogue Bubbles */}
            <div className="flex flex-col gap-3">
              {/* Bot message 1 */}
              <div className="flex items-center gap-2.5 self-start transition-transform duration-300 group-hover:translate-x-1">
                <div className="w-7 h-7 rounded-lg bg-[#1c202b] border border-white/10 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/clavion/zA1OFpE5iNJz7XuslQRIyHORrI.svg"
                    alt="Bot"
                    className="w-4 h-4 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-[#161922] border border-white/[0.08] font-mono-tech text-[11px] text-[#edf0f5]">
                  What do you want to automate?
                </div>
              </div>

              {/* User message 1 */}
              <div className="flex items-center gap-2.5 self-end transition-transform duration-300 group-hover:-translate-x-1">
                <div className="px-3.5 py-2 rounded-xl bg-[#12151e] border border-white/[0.06] font-mono-tech text-[11px] text-[#aeb5c0] text-right">
                  We handle 100+ support chats a day.
                </div>
                <div className="w-7 h-7 rounded-lg bg-[#1c202b] border border-white/10 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/clavion/qbUZSivngibVx0Jq578Z3wI4dBo.svg"
                    alt="User"
                    className="w-3.5 h-3.5 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Bot message 2 */}
              <div className="flex items-center gap-2.5 self-start transition-transform duration-300 group-hover:translate-x-1">
                <div className="w-7 h-7 rounded-lg bg-[#1c202b] border border-white/10 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/clavion/zA1OFpE5iNJz7XuslQRIyHORrI.svg"
                    alt="Bot"
                    className="w-4 h-4 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-[#161922] border border-white/[0.08] font-mono-tech text-[11px] text-[#edf0f5] max-w-[270px]">
                  I can take tier-1, route the rest, and sync to your desk.
                </div>
              </div>

              {/* User message 2 */}
              <div className="flex items-center gap-2.5 self-end transition-transform duration-300 group-hover:-translate-x-1">
                <div className="px-3.5 py-2 rounded-xl bg-[#12151e] border border-white/[0.06] font-mono-tech text-[11px] text-[#aeb5c0]">
                  Let’s do it.
                </div>
                <div className="w-7 h-7 rounded-lg bg-[#1c202b] border border-white/10 flex items-center justify-center shrink-0">
                  <img
                    src="/assets/clavion/qbUZSivngibVx0Jq578Z3wI4dBo.svg"
                    alt="User"
                    className="w-3.5 h-3.5 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center Column (2 cols): 120+ Happy Clients & 99% Client Satisfaction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.7, delay: 0.06 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Stat 1: 120+ Happy clients */}
            <motion.div
              whileHover={{ y: -4 }}
              className="premium-interactive-card relative flex-1 rounded-[18px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-5 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-300"
            >
              <img
                src="/assets/clavion/r5potKirfvn8BYMPvQoN9Zv2Ng.svg"
                alt="Happy clients card background pattern"
                className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-40"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 flex items-center -space-x-2 mb-3">
                <img
                  src="/assets/clavion/r4hCpcC2BSjUh7yG1NodeQGem9k.jpg"
                  alt="Client avatar"
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#0a0d14]"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="/assets/clavion/C1EN7t1PkviRju6c2OgDIdKVBo.jpg"
                  alt="Client avatar"
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#0a0d14] relative z-10"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="/assets/clavion/mTPhSAaQlUSkjdTXB0TZUqi3E.jpg"
                  alt="Client avatar"
                  className="w-8 h-8 rounded-full object-cover border-2 border-[#0a0d14]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative z-10 text-[34px] font-semibold tracking-tight text-clavion-gradient leading-none tabular-nums mb-1">
                <CountUp to={clientCount} suffix="+" loopMs={7000} />
              </div>
              <p className="relative z-10 text-[12px] text-[#aeb5c0]">Happy clients</p>
            </motion.div>

            {/* Stat 2: 99% Client satisfaction rate */}
            <motion.div
              whileHover={{ y: -4 }}
              className="premium-interactive-card relative flex-1 rounded-[18px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-5 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-300"
            >
              <img
                src="/assets/clavion/r5potKirfvn8BYMPvQoN9Zv2Ng.svg"
                alt="Satisfaction rate card background pattern"
                className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-40"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 text-[34px] font-semibold tracking-tight text-clavion-gradient leading-none tabular-nums mb-1.5">
                <CountUp to={satisfactionRate} suffix="%" loopMs={7000} />
              </div>
              <p className="relative z-10 text-[12px] text-[#aeb5c0] leading-snug max-w-[110px]">
                Client satisfaction rate
              </p>
            </motion.div>
          </motion.div>

          {/* Right Card (5 cols): AI Consulting & Training */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.7, delay: 0.12 }}
            onMouseEnter={() => setIsConsultingHovered(true)}
            onMouseLeave={() => setIsConsultingHovered(false)}
            className="premium-interactive-card lg:col-span-5 rounded-[18px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300"
          >
            <div className="mb-6">
              <h3 className="text-[20px] sm:text-[22px] font-medium text-clavion-gradient mb-2">
                AI Consulting & Training
              </h3>
              <p className="text-[14px] text-[#aeb5c0] leading-[1.6]">
                We guide teams through every stage of AI adoption from identifying opportunities.
              </p>
            </div>

            <div className="flex items-end justify-between gap-3 pt-4">
              <img
                src="/assets/clavion/sFJEgzol00Pl6NXp95zcX8y7uko.png"
                alt="Analytics chart"
                className={`w-[38%] max-w-[145px] h-auto object-contain transition-transform duration-500 ${
                  isConsultingHovered ? '-translate-y-1.5 scale-105' : ''
                }`}
                referrerPolicy="no-referrer"
              />
              <img
                src="/assets/clavion/YPLYcHoyOL78JuvUTAcMelqDM3A.png"
                alt="AI Assistant Bot"
                className={`w-[58%] max-w-[235px] h-auto object-contain transition-transform duration-500 ${
                  isConsultingHovered ? '-translate-y-1 scale-[1.03]' : ''
                }`}
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>

        {/* ROW 3: Data & Workflow Automation (7 cols) + Not Sure Where to Start with AI? (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Card (7 cols): Data & Workflow Automation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
            className="premium-interactive-card group lg:col-span-7 rounded-[18px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300"
          >
            <div className="mb-6">
              <h3 className="text-[20px] sm:text-[22px] font-medium text-clavion-gradient mb-2">
                Data & Workflow Automation
              </h3>
              <p className="text-[14px] text-[#aeb5c0] leading-[1.6] max-w-[520px] mb-4">
                We unify data across your ecosystem to power intelligent workflows that move information automatically and accurately.
              </p>
              <div className="flex flex-col gap-2">
                {['Data pipeline setup', 'Cross-platform automation'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-[13px] text-[#edf0f5]">
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
            </div>

            {/* Workflow Node Diagram using exact Clavion node images */}
            <div className="rounded-[14px] bg-[#0c0f17] border border-white/[0.05] p-5 flex flex-col items-center gap-4">
              <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                <img
                  src="/assets/clavion/cd4b6IopiXacySAtwKlX2H3TAI.png"
                  alt="Chat message node"
                  className="h-[58px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="/assets/clavion/LgmHsFZLy8xrFLBA9B69swYwek.png"
                  alt="AI Agent node"
                  className="h-[54px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col gap-2">
                  <img
                    src="/assets/clavion/X8cqTiwRGnq6bPO5Pl0gJPXbi54.png"
                    alt="Connector"
                    className="h-[38px] w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src="/assets/clavion/W90PIe8uGL3kF59zAWMr7VdKBXY.png"
                    alt="Tool use"
                    className="h-[32px] w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 w-full">
                <img
                  src="/assets/clavion/78ilzCwXwqQ59zzDLPUDUFDQ4.png"
                  alt="AI chat model and buffer memory"
                  className="h-[96px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="/assets/clavion/369xmfV0VrKJgqUZpV0mFH94Cs.png"
                  alt="Data table node"
                  className="h-[96px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Card (5 cols): Not Sure Where to Start with AI? (with ASCII Wave background layer matching Clavion) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.7, delay: 0.08 }}
            className="premium-interactive-card relative lg:col-span-5 rounded-[18px] border border-[#858b94]/20 hover:border-[#8b5cf6]/50 bg-clavion-card p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300"
          >
            {/* Subtle ASCII Wave Background inside the card matching Clavion's XcVVPOcsu layer */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[65%] opacity-55">
              <AsciiWaveBackground className="w-full h-full" cols={36} rows={8} />
            </div>

            <div className="relative z-10 flex items-center gap-3 mb-8">
              <img
                src="/assets/clavion/VF9V184MwL6lVi1H5HxAgomY5M.jpg"
                alt="Consultant Avatar"
                className="w-14 h-14 rounded-2xl object-cover border border-white/15"
                referrerPolicy="no-referrer"
              />
              <span className="text-[18px] text-[#aeb5c0] font-light">+</span>
              <div className="w-14 h-14 rounded-2xl bg-[#1c202b] border border-white/10 flex items-center justify-center font-mono-tech text-[12px] text-[#edf0f5]">
                YOU
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-[22px] sm:text-[24px] font-medium text-clavion-gradient mb-5">
                Not Sure Where to Start with AI?
              </h3>
              <RainbowButton
                label="SCHEDULE A CONSULTATION"
                variant="rainbow"
                onClick={() => onOpenContact('AI Strategy Consultation')}
              />
              <p className="text-[12px] text-[#858b94] mt-3">
                Only 20-30min. Friendly chat, no pressure.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================
            SOLUTIONS THAT DRIVE INTELLIGENCE — 4-CARD INTERACTIVE BENTO SHOWCASE
            (Matches user's reference screenshot with double-framed cards & hover FX)
            ======================================================================== */}
        <div className="pt-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.7 }}
            className="flex flex-col items-center text-center mb-10"
          >
            {/* Glowing Kicker with Horizontal Light Beams + Purple Nodes */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center">
                <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#8b5cf6]/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_#8b5cf6]" />
              </div>
              <span className="text-[13px] font-normal text-[#d5d9e2] tracking-wide">
                Our expertise
              </span>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_#8b5cf6]" />
                <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#8b5cf6]/70" />
              </div>
            </div>

            <h3
              className="text-clavion-gradient font-normal tracking-[-0.035em] leading-[1.08] max-w-[540px] mb-3.5"
              style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.35rem)', textWrap: 'balance' }}
            >
              Solutions that drive intelligence
            </h3>
            <p className="text-[14px] sm:text-[15px] text-[#aeb5c0] max-w-[460px]">
              End-to-end AI services built to automate &amp; accelerate growth.
            </p>
          </motion.div>

          {/* 3-Column Asymmetric Bento Grid (Left 2 cols stacked + Right 1 col tall) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* LEFT 8 COLUMNS: Top 2 Cards + Bottom Full-Width Process Optimization Card */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              {/* Top Sub-Row: Custom AI Chatbots + AI Consulting */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
                {/* CARD 1: Custom AI Chatbots */}
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.65 }}
                  whileHover={{ y: -4 }}
                  onMouseEnter={() => {
                    setIsChatbotHovered(true);
                    setPromptIndex((prev) => (prev + 1) % CHATBOT_PROMPTS.length);
                  }}
                  onMouseLeave={() => setIsChatbotHovered(false)}
                  className="group relative rounded-[22px] p-1.5 bg-[#0b0d17]/90 border border-white/[0.07] hover:border-[#8b5cf6]/40 shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-colors duration-300 flex"
                >
                  <div className="relative w-full rounded-[17px] border border-white/[0.08] group-hover:border-white/[0.15] bg-gradient-to-b from-[#121524] via-[#0d101b] to-[#090b13] p-6 flex flex-col justify-between overflow-hidden transition-colors">
                    {/* Ambient hover glow */}
                    <div
                      className="pointer-events-none absolute -top-20 -left-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          'radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(139, 92, 246, 0) 70%)',
                      }}
                    />

                    <div className="relative z-10 mb-6">
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <svg
                          className="w-5 h-5 text-[#d8dce6] group-hover:text-[#a78bfa] transition-colors shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                        >
                          <path
                            d="m15 4-1 1 4 4 1-1a2.83 2.83 0 1 0-4-4ZM13 6 3 16v4h4L17 10M8 2v2M2 8h2M19 15v2M15 19h2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <h4 className="text-[20px] sm:text-[21px] font-medium text-[#f3f5fa] tracking-[-0.02em]">
                          Custom AI Chatbots
                        </h4>
                      </div>
                      <p className="text-[13.5px] text-[#9ca5b5] leading-[1.55]">
                        Design intelligent assistants tailored to automate support and sales workflows.
                      </p>
                    </div>

                    {/* Interactive Prompt Box + Generate Button */}
                    <form
                      onSubmit={handleGenerateClick}
                      className="relative z-10 rounded-[15px] p-1.5 bg-[#090b12]/90 border border-white/[0.06]"
                    >
                      <div className="rounded-[11px] border border-white/[0.08] group-hover:border-[#8b5cf6]/30 bg-[#0e111d] p-3.5 mb-2.5 transition-colors">
                        <label htmlFor="chatbot-builder-input" className="sr-only">
                          Describe the custom AI chatbot you want to build
                        </label>
                        <input
                          id="chatbot-builder-input"
                          name="chatbotPrompt"
                          type="text"
                          value={typedText}
                          onChange={(e) => setTypedText(e.target.value)}
                          placeholder="Ready to build? Describe your chatbot workflow..."
                          aria-label="Describe the custom AI chatbot you want to build"
                          className="w-full min-h-[36px] bg-transparent text-[12.5px] text-[#d6dbe7] placeholder-[#858b94] focus:outline-none"
                        />

                        {/* Model & Attachment Mini Icons (44x44 touch targets) */}
                        <div className="flex items-center gap-1 pt-2">
                          {[
                            {
                              label: 'OpenAI Engine',
                              svg: (
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                                  <path d="M12 2a4.5 4.5 0 0 0-3.89 2.25L4.5 10.5a4.5 4.5 0 0 0 0 4.5l3.61 6.25a4.5 4.5 0 0 0 7.78 0l3.61-6.25a4.5 4.5 0 0 0 0-4.5L15.89 4.25A4.5 4.5 0 0 0 12 2Z" />
                                  <circle cx="12" cy="12" r="3" />
                                </svg>
                              ),
                            },
                            {
                              label: 'Google Gemini',
                              svg: (
                                <span className="text-[11px] font-semibold leading-none">G</span>
                              ),
                            },
                            {
                              label: 'Attach Context',
                              svg: (
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              ),
                            },
                          ].map((tool, idx) => (
                            <button
                              key={tool.label}
                              type="button"
                              aria-label={tool.label}
                              onClick={() => setActiveToolIdx(idx)}
                              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                            >
                              <span
                                className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                                  activeToolIdx === idx
                                    ? 'tool-pill-active bg-[#5b3df5] border-[#8b5cf6] text-white scale-105 shadow-[0_0_12px_rgba(91,61,245,0.45)]'
                                    : 'tool-pill-inactive bg-[#171b29] border-white/10 text-[#9ca5b5] hover:text-white hover:border-white/25'
                                }`}
                              >
                                {tool.svg}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full min-h-[44px] py-2.5 px-4 rounded-[10px] bg-gradient-to-r from-[#8b5cf6] via-[#7c5dfa] to-[#9b6dff] hover:from-[#986cf9] hover:to-[#a77bff] text-white text-[13px] font-medium flex items-center justify-center gap-2 shadow-[0_6px_24px_rgba(124,93,250,0.4)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.65)] active:scale-[0.99] transition-all cursor-pointer"
                      >
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-500 ${
                            isGenerating ? 'rotate-180 scale-125' : 'group-hover:rotate-12'
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m15 4-1 1 4 4 1-1a2.83 2.83 0 1 0-4-4ZM13 6 3 16v4h4L17 10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>{isGenerating ? 'Generating workflow...' : 'Generate content'}</span>
                      </button>

                      {chatbotResult && (
                        <p
                          role="status"
                          aria-live="polite"
                          className="mt-2 px-2 text-[11.5px] text-[#c4b5fd]"
                        >
                          {chatbotResult}
                        </p>
                      )}
                    </form>
                  </div>
                </motion.div>

                {/* CARD 2: AI Consulting */}
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.65, delay: 0.06 }}
                  whileHover={{ y: -4 }}
                  onMouseEnter={() => setIsCalendarHovered(true)}
                  onMouseLeave={() => setIsCalendarHovered(false)}
                  className="group relative rounded-[22px] p-1.5 bg-[#0b0d17]/90 border border-white/[0.07] hover:border-[#8b5cf6]/40 shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-colors duration-300 flex"
                >
                  <div className="relative w-full rounded-[17px] border border-white/[0.08] group-hover:border-white/[0.15] bg-gradient-to-b from-[#121524] via-[#0d101b] to-[#090b13] p-6 flex flex-col justify-between overflow-hidden transition-colors">
                    {/* Ambient hover glow */}
                    <div
                      className="pointer-events-none absolute -top-16 right-0 w-52 h-52 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          'radial-gradient(circle, rgba(139, 92, 246, 0.16) 0%, rgba(139, 92, 246, 0) 70%)',
                      }}
                    />

                    {/* Top Calendar Optimization Widget */}
                    <div className="relative mx-auto w-full max-w-[270px] rounded-[16px] border border-white/[0.09] group-hover:border-[#8b5cf6]/30 bg-[#0d101c] p-4 shadow-inner transition-all duration-300 group-hover:-translate-y-0.5">
                      <p className="text-[12.5px] text-[#cfd5e2] mb-1">Aug Total</p>
                      <div className="flex items-baseline gap-2 pb-3 border-b border-white/[0.07]">
                        <span className="text-[24px] font-semibold text-white leading-none tabular-nums">
                          {isCalendarHovered ? '14' : '10'}
                        </span>
                        <span className="text-[13px] text-[#aeb5c0]">Major optimizations</span>
                      </div>

                      {/* Days of week */}
                      <div className="grid grid-cols-7 gap-1.5 text-center pt-3 mb-2">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                          <span key={`${d}-${i}`} className="text-[10px] font-medium text-[#525866]">
                            {d}
                          </span>
                        ))}
                      </div>

                      {/* Row 1 of Day Circles */}
                      <div className="grid grid-cols-7 gap-1.5 items-center justify-items-center mb-2">
                        {[
                          { text: '1', active: true },
                          { text: '', dot: true },
                          { text: '', dot: true },
                          { text: '', dot: true },
                          { text: '2', active: true },
                          { text: '', dot: true },
                          { text: '', dot: true },
                        ].map((cell, idx) => (
                          <div
                            key={idx}
                            style={{ transitionDelay: `${idx * 35}ms` }}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium transition-all duration-300 ${
                              cell.active
                                ? 'bg-[#171b29] border border-white/15 text-[#edf0f5] group-hover:border-[#8b5cf6]/60 group-hover:bg-[#8b5cf6]/20'
                                : 'bg-[#636875]/60 group-hover:bg-[#8b5cf6]/55 group-hover:scale-105'
                            }`}
                          >
                            {cell.text}
                          </div>
                        ))}
                      </div>

                      {/* Row 2 of Day Circles */}
                      <div className="grid grid-cols-7 gap-1.5 items-center justify-items-center">
                        {[
                          { empty: true },
                          { empty: true },
                          { text: '2', active: true },
                          { empty: true },
                          { dot: true },
                          { dot: true },
                          { dot: true },
                        ].map((cell, idx) => (
                          <div
                            key={idx}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium transition-all duration-300 ${
                              cell.empty
                                ? 'opacity-0'
                                : cell.active
                                ? 'bg-[#171b29]/80 border border-white/10 text-[#9ca5b5] group-hover:text-white group-hover:border-[#8b5cf6]/50'
                                : 'bg-[#3e4352]/55 group-hover:bg-[#6d55ce]/45'
                            }`}
                          >
                            {cell.text || ''}
                          </div>
                        ))}
                      </div>

                      {/* Bottom fade gradient over the calendar widget */}
                      <div
                        className="calendar-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 h-8 rounded-b-[16px]"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(13, 16, 28, 0) 0%, rgba(13, 16, 28, 0.85) 100%)',
                        }}
                      />
                    </div>

                    {/* Bottom Copy */}
                    <div className="relative z-10 mt-6">
                      <div className="flex items-center gap-2.5 mb-2">
                        <svg
                          className="w-5 h-5 text-[#d8dce6] group-hover:text-[#a78bfa] transition-colors shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                        >
                          <path
                            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path d="M12 8v6M9 11h6" strokeLinecap="round" />
                        </svg>
                        <h4 className="text-[20px] sm:text-[21px] font-medium text-[#f3f5fa] tracking-[-0.02em]">
                          AI Consulting
                        </h4>
                      </div>
                      <p className="text-[13.5px] text-[#9ca5b5] leading-[1.55]">
                        Define roadmaps, identify opportunities, and align AI with business objectives.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* CARD 3 (Bottom-Left Full Span): Intelligent Process Optimization */}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.65, delay: 0.1 }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => setIsChartHovered(true)}
                onMouseLeave={() => {
                  setIsChartHovered(false);
                  setHoveredBarIndex(null);
                }}
                className="group relative rounded-[22px] p-1.5 bg-[#0b0d17]/90 border border-white/[0.07] hover:border-[#8b5cf6]/40 shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-colors duration-300"
              >
                <div className="relative rounded-[17px] border border-white/[0.08] group-hover:border-white/[0.15] bg-gradient-to-b from-[#121524] via-[#0d101b] to-[#090b13] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center overflow-hidden transition-colors">
                  {/* Ambient bottom-left glow */}
                  <div
                    className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(99, 102, 241, 0.16) 0%, rgba(99, 102, 241, 0) 70%)',
                    }}
                  />

                  {/* Left Column: Title, Description & "Work with us" Pill Button */}
                  <div className="relative z-10 md:col-span-6 flex flex-col justify-between h-full min-h-[190px]">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <svg
                          className="w-5 h-5 text-[#d8dce6] group-hover:text-[#a78bfa] transition-colors shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                        >
                          <path d="M3 3v18h18M7 16v-4M11 16V9M15 16v-6M19 16V5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h4 className="text-[20px] sm:text-[22px] font-medium text-[#f3f5fa] tracking-[-0.02em]">
                          Intelligent Process Optimization
                        </h4>
                      </div>
                      <p className="text-[13.5px] sm:text-[14px] text-[#9ca5b5] leading-[1.6] max-w-[330px]">
                        Analyze workflows and deploy AI to increase efficiency, performance &amp; profit.
                      </p>
                    </div>

                    <div className="pt-6">
                      <button
                        type="button"
                        onClick={() => onOpenContact('Intelligent Process Optimization')}
                        className="strategy-cta-btn group/work inline-flex items-center min-h-[44px] rounded-[11px] bg-[#121521] hover:bg-[#191d2e] border border-[#6366f1]/45 hover:border-[#8b5cf6]/80 p-1.5 pl-4 text-[13px] font-medium text-[#f3f5fa] shadow-[0_0_22px_rgba(99,102,241,0.25)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <span className="strategy-cta-label pr-3 whitespace-nowrap">Work with us</span>
                        <span className="strategy-cta-arrow relative w-7 h-7 rounded-[7px] bg-white text-[#0b0d14] flex items-center justify-center overflow-hidden shadow-sm">
                          <svg
                            className="w-3.5 h-3.5 transition-transform duration-300 group-hover/work:translate-x-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.3"
                          >
                            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <svg
                            className="w-3.5 h-3.5 absolute -translate-x-5 transition-transform duration-300 group-hover/work:translate-x-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.3"
                          >
                            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>

                      {/* Right Column: Interactive 5-Bar Chart */}
                      <div className="relative z-10 md:col-span-6 flex flex-col justify-end">
                        <div className="h-[195px] flex items-end justify-between gap-2.5 sm:gap-3.5 px-2 pt-8 border-b border-white/[0.08]">
                          {BAR_CHART_DATA.map((bar, idx) => {
                            const isBarActive =
                              hoveredBarIndex !== null
                                ? hoveredBarIndex === idx
                                : autoBarIndex === idx || bar.featured;
                            const animatedHeight = isChartHovered || isBarActive
                              ? Math.min(100, bar.heightPct + (bar.featured ? 4 : 6))
                              : bar.heightPct;

                            return (
                              <div
                                key={bar.day}
                                onMouseEnter={() => setHoveredBarIndex(idx)}
                                className="flex-1 h-full flex flex-col items-center justify-end gap-2 cursor-pointer group/bar"
                              >
                                {/* Floating Dollar Pill Badge */}
                                <span
                                  className={`px-2 py-0.5 rounded-[6px] text-[10.5px] font-medium tabular-nums transition-all duration-300 ease-out ${
                                    isBarActive
                                      ? 'bar-chart-badge-active bg-[#e6e9f2] text-[#0a0d14] -translate-y-0.5 shadow-[0_4px_14px_rgba(255,255,255,0.25)]'
                                      : 'bar-chart-badge-inactive bg-[#7c8293]/75 text-[#0a0d14] translate-y-0'
                                  }`}
                                >
                                  {bar.label}
                                </span>

                                {/* Vertical Bar */}
                                <div
                                  style={{ height: `${animatedHeight}%` }}
                                  className={`w-full max-w-[44px] rounded-t-[8px] transition-all duration-500 ease-out ${
                                    isBarActive
                                      ? 'bar-chart-active-bar bg-gradient-to-b from-[#ffffff] via-[#e4e7f0] to-[#c5cad8] shadow-[0_0_25px_rgba(255,255,255,0.28)]'
                                      : 'bar-chart-inactive-bar bg-gradient-to-b from-[#1a1e2d] to-[#111420] border-t border-x border-white/[0.06] group-hover/bar:from-[#262c42] group-hover/bar:to-[#171b2b]'
                                  }`}
                                />
                              </div>
                            );
                          })}
                        </div>

                    {/* Chart Footer: Last 7 days + +12.5% trend */}
                    <div className="flex items-center justify-between pt-3 px-1 text-[11.5px]">
                      <span className="text-[#cfd5e2] font-medium">Last 7 days</span>
                      <span className="inline-flex items-center gap-1 font-medium text-[#edf0f5]">
                        <span>{isChartHovered ? '+18.4%' : '+12.5%'}</span>
                        <svg
                          className="w-3.5 h-3.5 text-[#22c55e]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                        >
                          <path d="M7 17 17 7M11 7h6v6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CARD 4 (Right 4 Columns, Full Height): AI Integration & Automation */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.7, delay: 0.14 }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => setIsIntegrationHovered(true)}
              onMouseLeave={() => setIsIntegrationHovered(false)}
              className="group lg:col-span-4 relative rounded-[22px] p-1.5 bg-[#0b0d17]/90 border border-white/[0.07] hover:border-[#8b5cf6]/40 shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-colors duration-300 flex"
            >
              <div className="relative w-full rounded-[17px] border border-white/[0.08] group-hover:border-white/[0.15] bg-gradient-to-b from-[#121524] via-[#0d101b] to-[#090b13] p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-colors">
                {/* Top Header */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <svg
                      className="w-5 h-5 text-[#d8dce6] group-hover:text-[#a78bfa] transition-colors shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    >
                      <rect x="3" y="4" width="18" height="12" rx="2" />
                      <path d="m8 20 4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h4 className="text-[20px] sm:text-[21px] font-medium text-[#f3f5fa] tracking-[-0.02em]">
                      AI Integration &amp; Automation
                    </h4>
                  </div>
                  <p className="text-[13.5px] text-[#9ca5b5] leading-[1.55]">
                    Seamlessly integrate AI tools into existing platforms and operational systems.
                  </p>
                </div>

                {/* Animated 6-Row Integration Pill Matrix + Central Glowing Hub */}
                <div className="relative flex-1 min-h-[340px] flex flex-col justify-center gap-3 overflow-hidden py-2">
                  {INTEGRATION_ROWS.map((row, rowIdx) => (
                    <div key={rowIdx} className="w-full overflow-hidden">
                      <div
                        className={
                          row.direction === 'left'
                            ? 'animate-marquee-left flex items-center gap-2.5'
                            : 'animate-marquee-right flex items-center gap-2.5'
                        }
                      >
                        {row.items.map((pill, pillIdx) => (
                          <div
                            key={`${pill.label}-${pillIdx}`}
                            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-[12px] bg-[#131724]/90 border border-white/[0.06] group-hover:border-white/[0.11] text-[12px] text-[#8e96a8] group-hover:text-[#bbc3d4] whitespace-nowrap shrink-0 transition-colors"
                          >
                            <IntegrationPillIcon type={pill.icon} />
                            <span>{pill.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Edge Vignette Overlays (Top, Bottom, Left, Right) matching reference */}
                  <div
                    className="integration-vignette-overlay pointer-events-none absolute inset-0 z-10"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 52%, rgba(10, 13, 21, 0) 28%, rgba(10, 13, 21, 0.86) 92%)',
                    }}
                  />

                  {/* Center Glowing Violet Hub Squircle */}
                  <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: isIntegrationHovered ? 1.08 : 1,
                        rotate: isIntegrationHovered ? 4 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                      className="w-[82px] h-[82px] rounded-[24px] bg-[#151826]/95 border border-white/[0.12] shadow-[0_14px_45px_rgba(0,0,0,0.85),0_0_40px_rgba(139,92,246,0.3)] flex items-center justify-center backdrop-blur-md"
                    >
                      <div className="w-[56px] h-[56px] rounded-[17px] bg-gradient-to-br from-[#9b6dff] via-[#8358ff] to-[#6842ff] shadow-[0_0_24px_rgba(139,92,246,0.75)] flex items-center justify-center">
                        {/* 10-dot diamond cluster icon matching reference image */}
                        <svg className="w-7 h-7 text-white" viewBox="0 0 28 28" fill="currentColor">
                          <circle cx="14" cy="5.5" r="1.8" />
                          <circle cx="10.5" cy="9" r="1.8" />
                          <circle cx="17.5" cy="9" r="1.8" />
                          <circle cx="7" cy="12.5" r="1.8" />
                          <circle cx="14" cy="12.5" r="2" />
                          <circle cx="21" cy="12.5" r="1.8" />
                          <circle cx="10.5" cy="16" r="1.8" />
                          <circle cx="17.5" cy="16" r="1.8" />
                          <circle cx="14" cy="19.5" r="1.8" />
                          <circle cx="14" cy="23" r="1.4" />
                        </svg>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
