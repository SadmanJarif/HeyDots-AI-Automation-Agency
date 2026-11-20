import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { SectionKicker } from './RainbowButton';

export const LEGAL_PATHS = [
  '/cookie-policy',
  '/terms',
  '/privacy',
  '/data-protection',
  '/disclaimer',
] as const;

export type LegalPath = (typeof LEGAL_PATHS)[number];

export function isLegalPath(path: string): path is LegalPath {
  return (LEGAL_PATHS as readonly string[]).includes(path);
}

const LEGAL_LINKS: { label: string; href: LegalPath }[] = [
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Data Protection', href: '/data-protection' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const inlineLinkClass =
  'text-[#c4b5fd] hover:text-white underline decoration-[#c4b5fd]/40 underline-offset-[3px] transition-colors';

interface LegalPageProps {
  path: LegalPath;
  onNavigate: (to: string) => void;
}

interface LegalBlock {
  heading: string;
  body: React.ReactNode;
}

function MailLink() {
  return (
    <a href="mailto:info@heydots.com" className={inlineLinkClass}>
      info@heydots.com
    </a>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={inlineLinkClass}>
      {children}
    </a>
  );
}

function LegalBlocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="flex flex-col gap-8">
      {blocks.map((block) => (
        <section key={block.heading} aria-labelledby={`legal-${block.heading.replace(/\s+/g, '-').toLowerCase()}`}>
          <h2
            id={`legal-${block.heading.replace(/\s+/g, '-').toLowerCase()}`}
            className="text-[20px] sm:text-[22px] font-medium text-clavion-gradient tracking-[-0.02em] leading-[1.25] mb-3"
          >
            {block.heading}
          </h2>
          <div className="flex flex-col gap-3 text-[14.5px] sm:text-[15.5px] text-[#aeb5c0] leading-[1.7]">
            {block.body}
          </div>
        </section>
      ))}
    </div>
  );
}

function getLegalDocument(path: LegalPath): { kicker: string; title: string; lede: React.ReactNode; blocks: LegalBlock[] } {
  const sites = (
    <>
      <ExternalLink href="https://heydots.com">heydots.com</ExternalLink> and{' '}
      <ExternalLink href="https://beta.heydots.com">beta.heydots.com</ExternalLink>
    </>
  );

  if (path === '/cookie-policy') {
    return {
      kicker: 'LEGAL',
      title: 'Cookie Policy',
      lede: (
        <>
          How <span className="font-pacifico text-[#f3f5fa]">HeyDots</span> uses essential browser storage and Umami analytics on {sites}.
        </>
      ),
      blocks: [
        {
          heading: 'Essential storage',
          body: (
            <>
              <p>
                HeyDots does not set advertising cookies and does not follow you across other websites. The public site does not require an account.
              </p>
              <p>
                If you send a message through a contact form, a copy of that inquiry can be saved in local storage on your device so the page can confirm what you submitted. That copy stays in your browser until you clear site data for HeyDots. It is not shared as a third-party tracking cookie.
              </p>
            </>
          ),
        },
        {
          heading: 'Umami analytics',
          body: (
            <>
              <p>
                We measure page visits with Umami, loaded from{' '}
                <ExternalLink href="https://cloud.umami.is">cloud.umami.is</ExternalLink>. Umami is a privacy-oriented analytics service. It does not use cookies and does not build an advertising profile of you.
              </p>
              <p>A page view can include:</p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-[#8b5cf6]">
                <li>The page address and the referring page</li>
                <li>Browser, operating system, device type, language, and screen size</li>
                <li>A country derived from your IP address</li>
              </ul>
              <p>
                The IP address itself is not kept as a personal record. Visits are not tied to your name or email, and they are separate from anything you submit in a contact form or booking.
              </p>
            </>
          ),
        },
        {
          heading: 'How to opt out',
          body: (
            <>
              <p>You can stop analytics and remove saved form data on your device:</p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-[#8b5cf6]">
                <li>Block requests to cloud.umami.is in your browser or with a content blocker. That stops analytics page views from this site.</li>
                <li>Clear this site’s cookies and local storage if you want to remove a saved contact-form copy from your browser.</li>
                <li>
                  Email <MailLink /> if you want HeyDots to delete an inquiry we already received. Analytics visits are not linked to your name, so there is no personal analytics profile to erase.
                </li>
              </ul>
            </>
          ),
        },
      ],
    };
  }

  if (path === '/terms') {
    return {
      kicker: 'LEGAL',
      title: 'Terms of Use',
      lede: (
        <>
          The rules for using the <span className="font-pacifico text-[#f3f5fa]">HeyDots</span> website and for asking us about AI automation work.
        </>
      ),
      blocks: [
        {
          heading: 'The site and the services',
          body: (
            <>
              <p>
                HeyDots is an AI automation agency. We design agents, workflows, and related consulting. These terms cover use of {sites}, including contact forms and intro-call booking.
              </p>
              <p>
                A client engagement starts only when you and HeyDots agree the scope separately. Browsing the site, sending a form, or booking a call does not by itself create that contract.
              </p>
            </>
          ),
        },
        {
          heading: 'No guaranteed outcomes',
          body: (
            <p>
              Examples, timelines, and performance notes on the site describe the kind of work we do. They are not a promise that a particular workflow, revenue result, or automation will perform the same way in your business. Results depend on your systems, your data, and how the work is used.
            </p>
          ),
        },
        {
          heading: 'Acceptable use',
          body: (
            <p>
              Use the site for lawful inquiries and to learn about our work. Do not attempt to disrupt the site, break into it, submit unlawful content, or misuse the contact and booking forms. We may ignore or refuse a request that is abusive or outside the work we do.
            </p>
          ),
        },
        {
          heading: 'Contact',
          body: (
            <p>
              Questions about these terms: <MailLink />.
            </p>
          ),
        },
      ],
    };
  }

  if (path === '/privacy') {
    return {
      kicker: 'LEGAL',
      title: 'Privacy',
      lede: (
        <>
          What <span className="font-pacifico text-[#f3f5fa]">HeyDots</span> collects when you contact us or book a call, why we use it, and how to ask for deletion.
        </>
      ),
      blocks: [
        {
          heading: 'What contact and booking forms collect',
          body: (
            <>
              <p>Contact forms on this site ask for:</p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-[#8b5cf6]">
                <li>Your name and email address</li>
                <li>Your company, if you provide one</li>
                <li>The kind of project or plan you select</li>
                <li>The message you write</li>
              </ul>
              <p>
                Booking an intro call opens{' '}
                <ExternalLink href="https://cal.com/heydots/30min">cal.com/heydots/30min</ExternalLink>. Cal.com collects the details you enter there, typically your name, email, the time you choose, and any notes. Those booking details are shared with HeyDots so we can hold the call. We also receive whatever you include in an email to <MailLink />.
              </p>
            </>
          ),
        },
        {
          heading: 'Why we use it',
          body: (
            <p>
              We use this information to reply, schedule the conversation, and prepare for the work you asked about. We do not sell personal data, and we do not share it for other companies’ advertising. We share it only with the tools needed to receive the message or the booking, and with HeyDots people who are handling your request.
            </p>
          ),
        },
        {
          heading: 'Analytics',
          body: (
            <p>
              Page visits are measured with Umami, as described in the Cookie Policy. That measurement is not tied to your name or email.
            </p>
          ),
        },
        {
          heading: 'Deletion and access',
          body: (
            <p>
              Email <MailLink /> to ask what we hold about you, to correct it, or to request deletion. We will delete inquiry and booking records we do not still need for an active project or an ordinary legal obligation, and we will confirm once that is done.
            </p>
          ),
        },
      ],
    };
  }

  if (path === '/data-protection') {
    return {
      kicker: 'LEGAL',
      title: 'Data Protection',
      lede: (
        <>
          How <span className="font-pacifico text-[#f3f5fa]">HeyDots</span> limits access to client and inquiry data, and what we will not do with it.
        </>
      ),
      blocks: [
        {
          heading: 'Access controls',
          body: (
            <p>
              Contact details, project files, and prompts you share are available only to HeyDots people who need them to respond or to do the work. We do not publish client material on {sites} unless you have agreed to that.
            </p>
          ),
        },
        {
          heading: 'Not used to train public models',
          body: (
            <p>
              We do not use your client data, prompts, or project files to train public AI models. If a vendor model is part of a system we build for you, that work follows the engagement we agree with you. We do not donate your data to a public training set.
            </p>
          ),
        },
        {
          heading: 'Retention',
          body: (
            <p>
              We keep inquiry and project records only for as long as we need them to reply, deliver the work, and meet ordinary record-keeping needs. When that purpose ends, or when you ask us to delete data we are not required to keep, we delete it or reduce it so it no longer identifies you.
            </p>
          ),
        },
        {
          heading: 'Security',
          body: (
            <>
              <p>
                The site is served over HTTPS. Access to project and inquiry data is limited to the people doing the work. No online service can promise that a breach is impossible. If we learn that personal data we hold has been exposed, we will tell the people affected and explain what we are doing about it.
              </p>
              <p>
                Questions: <MailLink />.
              </p>
            </>
          ),
        },
      ],
    };
  }

  return {
    kicker: 'LEGAL',
    title: 'Disclaimer',
    lede: (
      <>
        What the <span className="font-pacifico text-[#f3f5fa]">HeyDots</span> website is, and what it is not.
      </>
    ),
    blocks: [
      {
        heading: 'Informational site',
        body: (
          <p>
            {sites} explain HeyDots services and let you contact us or book a call. Articles, diagrams, and examples are general information about AI automation. They are not a proposal for your business until we confirm one.
          </p>
        ),
      },
      {
        heading: 'AI outputs need human review',
        body: (
          <p>
            Systems we describe or build can draft, route, or recommend. Those outputs can be wrong, incomplete, or out of date. A person should review anything that affects customers, money, or operations before it is relied on.
          </p>
        ),
      },
      {
        heading: 'No legal or financial advice',
        body: (
          <p>
            Nothing on this site is legal, financial, tax, or other professional advice. Do not use it as a substitute for advice from a qualified professional. We also do not guarantee a business result from using the information here.
          </p>
        ),
      },
      {
        heading: 'Contact',
        body: (
          <p>
            Questions: <MailLink />.
          </p>
        ),
      },
    ],
  };
}

export const LegalPage: React.FC<LegalPageProps> = ({ path, onNavigate }) => {
  const doc = getLegalDocument(path);

  useEffect(() => {
    const previous = document.title;
    document.title = `${doc.title} · HeyDots`;
    return () => {
      document.title = previous;
    };
  }, [doc.title]);

  return (
    <div className="relative z-10 pt-9 pb-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-5">
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
            <SectionKicker text={doc.kicker} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: 0.08 }}
            className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.12] max-w-[720px] mb-4"
            style={{ fontSize: 'clamp(2.1rem, 4.5vw, 3.6rem)', textWrap: 'balance' }}
          >
            {doc.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: 0.13 }}
            className="text-[#aeb5c0] text-[15px] sm:text-[16px] leading-[1.65] max-w-[640px]"
          >
            {doc.lede}
          </motion.p>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: SMOOTH_EASE, delay: 0.12 }}
          className="max-w-[760px] mx-auto rounded-[22px] border border-[#858b94]/25 bg-clavion-card px-6 py-8 sm:px-10 sm:py-10 shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
        >
          <p className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#858b94] mb-8">
            Last updated 20 November 2026
          </p>
          <LegalBlocks blocks={doc.blocks} />
          <nav aria-label="Other legal pages" className="mt-10 pt-6 border-t border-white/10">
            <p className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#858b94] mb-3">
              Also in legal
            </p>
            <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-5 gap-y-1">
              {LEGAL_LINKS.filter((item) => item.href !== path).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.href);
                    }}
                    className="inline-flex items-center min-h-[36px] text-[14px] text-[#aeb6c6] hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.article>
      </div>
    </div>
  );
};
