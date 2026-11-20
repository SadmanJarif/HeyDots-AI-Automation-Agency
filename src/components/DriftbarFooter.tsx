import React from 'react';

const EXPLORE_LINKS = [
  { label: 'Services', href: '/#service' },
  { label: 'Growth Analytics', href: '/#growth' },
  { label: 'Process', href: '/#process' },
  { label: 'About Us', href: '/about' },
];

const CONNECT_LINKS = [
  { label: 'Contact Page', href: '/contact' },
  { label: 'Email Us', href: 'mailto:info@heydots.com' },
  { label: 'Back to Top', href: '/' },
];

const LEGAL_LINKS = [
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Data Protection', href: '/data-protection' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

const footerLinkClass =
  'inline-flex items-center min-h-[38px] sm:min-h-[34px] text-[13.5px] text-[#aeb6c6] hover:text-white hover:translate-x-1 transition-all duration-200';

function FooterLinkColumn({
  title,
  label,
  links,
  onNavigate,
}: {
  title: string;
  label: string;
  links: { label: string; href: string }[];
  onNavigate?: (to: string) => void;
}) {
  return (
    <nav aria-label={label}>
      <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#edf0f5] mb-3.5">
        {title}
      </h3>
      <ul className="flex flex-col gap-1">
        {links.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={(e) => {
                if (onNavigate && !item.href.startsWith('mailto:')) {
                  e.preventDefault();
                  onNavigate(item.href);
                }
              }}
              className={footerLinkClass}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface DriftbarFooterProps {
  onNavigate?: (to: string) => void;
}

export default function DriftbarFooter({ onNavigate }: DriftbarFooterProps) {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-5 pb-24 md:pb-28">
      <footer
        id="footer"
        className="relative overflow-hidden rounded-[22px] sm:rounded-[26px] border border-white/[0.1] bg-[#070910]/25 shadow-[0_24px_70px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] min-h-[430px] sm:min-h-[465px] flex flex-col justify-between"
      >
        {/* Top Luminous Hairline Accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-10 h-[1px] z-20"
          style={{
            background:
              'linear-gradient(90deg, rgba(139,92,246,0) 0%, rgba(167,139,250,0.6) 35%, rgba(56,189,248,0.6) 65%, rgba(56,189,248,0) 100%)',
          }}
        />

        {/* Lets the site ASCII field show through, with the same cobalt, cyan, and violet wash. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: [
              'radial-gradient(ellipse 70% 48% at 12% 0%, rgba(99,102,241,0.28), transparent 62%)',
              'radial-gradient(ellipse 62% 42% at 92% 6%, rgba(56,189,248,0.2), transparent 58%)',
              'radial-gradient(ellipse 80% 36% at 50% 100%, rgba(232,121,249,0.16), transparent 64%)',
              'linear-gradient(180deg, rgba(10,13,20,0.82) 0%, rgba(10,13,20,0.46) 46%, rgba(10,13,20,0.72) 100%)',
            ].join(', '),
          }}
        />

        {/* Giant Frosted Glass Watermark */}
        <p
          aria-hidden="true"
          className="pointer-events-none select-none font-pacifico absolute left-1/2 bottom-[5.6rem] sm:bottom-[5.5rem] -translate-x-1/2 z-[3] whitespace-nowrap leading-none text-[#f7f4ff] opacity-35"
          style={{
            fontSize: 'clamp(2.7rem, 16vw, 7.5rem)',
            textShadow: '0 12px 28px rgba(7, 9, 16, 0.95)',
          }}
        >
          HeyDots
        </p>

        {/* Bottom Horizon Mist */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 sm:h-16 z-[2]"
          style={{
            background:
              'linear-gradient(to top, rgba(7,9,16,0.35) 0%, rgba(7,9,16,0) 100%)',
          }}
        />

        {/* Top Main Content Grid */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Brand Block */}
          <div className="lg:col-span-4">
            <a
              href="/"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate('/');
                }
              }}
              className="inline-flex items-center font-pacifico text-[28px] sm:text-[32px] text-[#f3f5fa] hover:opacity-90 transition-opacity drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]"
              aria-label="HeyDots home"
            >
              HeyDots
            </a>

            <p className="mt-3 text-[13.5px] sm:text-[14.5px] text-[#bcc4d4] leading-[1.6] max-w-[360px]">
              Intelligent AI systems &amp; autonomous workflows built to streamline operations and scale revenue.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="mailto:info@heydots.com"
                className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-[10px] bg-white hover:bg-[#edf0f5] text-[#0a0d14] text-[13px] font-semibold shadow-[0_6px_22px_rgba(255,255,255,0.18)] hover:-translate-y-0.5 transition-all"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
                </svg>
                <span>info@heydots.com</span>
              </a>

              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-[10px] bg-white/[0.05] border border-white/[0.09] text-[12px] text-[#cbd5e1] backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399]" />
                <span>Global Remote-First</span>
              </span>
            </div>
          </div>

          {/* Link columns: Explore, Connect, Legal */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-8">
            <FooterLinkColumn
              title="Explore"
              label="Footer explore navigation"
              links={EXPLORE_LINKS}
              onNavigate={onNavigate}
            />
            <FooterLinkColumn
              title="Connect"
              label="Footer connect navigation"
              links={CONNECT_LINKS}
              onNavigate={onNavigate}
            />
            <FooterLinkColumn
              title="Legal"
              label="Footer legal navigation"
              links={LEGAL_LINKS}
              onNavigate={onNavigate}
            />
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="relative z-10 px-6 pb-5 pt-28 sm:px-10 sm:pb-7 sm:pt-36 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] font-medium text-[#f4f7fb]">
          <p>© 2024–2026 HeyDots · All rights reserved.</p>
          <p className="font-mono-tech text-[11px] tracking-[0.04em] text-[#858f9f]">
            HEYDOTS.COM
          </p>
        </div>
      </footer>
    </div>
  );
}
