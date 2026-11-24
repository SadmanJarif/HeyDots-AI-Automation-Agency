import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BLOG_POSTS, getBlogPostBySlug, getRelatedBlogPosts } from '../data/blogPosts';
import { SectionKicker } from './RainbowButton';
import { GlossyAiButton } from './PillButtons';
import { BlogFeatureGraphic } from './BlogFeatureGraphic';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (to: string) => void;
  onOpenContact: (defaultPlan?: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  slug,
  onNavigate,
  onOpenContact,
}) => {
  const post = getBlogPostBySlug(slug);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  useEffect(() => {
    setOpenFaqIdx(0);
    if (!post) return;

    // Update page <title>, <meta description>, canonical URL, and Article + FAQPage + BreadcrumbList JSON-LD
    document.title = post.metaTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', post.metaDescription);
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    const postUrl = `https://heydots.com/blog/${post.slug}`;
    if (canonical) {
      canonical.setAttribute('href', postUrl);
    }

    const jsonLdId = 'heydots-blog-post-schema';
    const existingScript = document.getElementById(jsonLdId);
    if (existingScript) {
      existingScript.remove();
    }

    const schemaPayload = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: post.title,
          description: post.metaDescription,
          image: `https://heydots.com${post.image}`,
          datePublished: post.isoDate,
          dateModified: post.isoDate,
          author: {
            '@type': 'Person',
            name: post.author.name,
            jobTitle: post.author.role,
          },
          publisher: {
            '@type': 'Organization',
            name: 'HeyDots',
            url: 'https://heydots.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://heydots.com/favicon.png',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': postUrl,
          },
          keywords: [post.targetKeyword, ...post.secondaryKeywords].join(', '),
        },
        {
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://heydots.com/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://heydots.com/blog' },
            { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
          ],
        },
      ],
    };

    const script = document.createElement('script');
    script.id = jsonLdId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaPayload);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById(jsonLdId);
      if (s) s.remove();
    };
  }, [post]);

  if (!post) {
    return (
      <section className="min-h-[80vh] max-w-[680px] mx-auto px-5 py-24 flex flex-col items-center justify-center text-center">
        <p className="font-mono-tech text-[12px] uppercase tracking-[0.16em] text-[#e06368] mb-3">
          [ ERROR 404 — BLOG POST NOT FOUND ]
        </p>
        <h1 className="text-[36px] sm:text-[48px] font-medium text-clavion-gradient tracking-[-0.03em] leading-[1.12] mb-4">
          This Article Has Been Automated Away
        </h1>
        <p className="text-[15px] text-[#aeb5c0] max-w-[440px] leading-[1.6] mb-8">
          The blog post <code className="text-[#edf0f5] font-mono-tech">{slug}</code> does not exist. Return to the{' '}
          <span className="font-pacifico text-[#f3f5fa]">HeyDots</span> blog below.
        </p>
        <GlossyAiButton label="BACK TO BLOG" onClick={() => onNavigate('/blog')} />
      </section>
    );
  }

  const relatedPosts = getRelatedBlogPosts(post, 3);

  const tocItems = [
    { id: 'key-takeaways', label: 'Key Takeaways' },
    ...post.sections.slice(0, 2).map((s) => ({ id: s.id, label: s.heading })),
    { id: 'architecture-visual', label: 'System Blueprint' },
    ...post.sections.slice(2, 3).map((s) => ({ id: s.id, label: s.heading })),
    { id: 'comparison-table', label: 'Comparison Matrix' },
    ...post.sections.slice(3).map((s) => ({ id: s.id, label: s.heading })),
    { id: 'article-faqs', label: 'Frequently Asked Questions' },
  ];

  const scrollToBlock = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Editorial Article Header */}
      <section className="relative pt-16 pb-8 sm:pt-24 sm:pb-10 overflow-hidden">
        <div className="max-w-[1160px] mx-auto px-5">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[12.5px] text-[#858b94] mb-6"
          >
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => onNavigate('/blog')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Blog
            </button>
            <span>/</span>
            <span className="text-[#c4b5fd]">{post.category}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[880px]"
          >
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6]/35 text-[12px] font-medium text-[#c4b5fd]">
                {post.category}
              </span>
              {post.location && (
                <span className="px-3 py-1 rounded-full bg-[#66bcd3]/15 border border-[#66bcd3]/30 text-[12px] font-medium text-[#bae6fd]">
                  {post.location}
                </span>
              )}
              <span className="text-[12.5px] text-[#858b94]">{post.date}</span>
              <span className="text-[12.5px] text-[#858b94]">· {post.readTime}</span>
            </div>

            <h1 className="text-[30px] sm:text-[44px] lg:text-[48px] font-medium text-clavion-gradient tracking-[-0.03em] leading-[1.12] mb-5">
              {post.title}
            </h1>

            <p className="text-[16px] sm:text-[18px] text-[#aeb5c0] leading-[1.68] mb-6">
              {post.excerpt}
            </p>

            {/* Author Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#66bcd3] flex items-center justify-center text-[14px] font-semibold text-white">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[13.5px] font-medium text-[#edf0f5]">{post.author.name}</p>
                  <p className="text-[12px] text-[#858b94]">{post.author.role}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 font-mono-tech text-[11px] text-[#66bcd3]">
                  Focus: {post.targetKeyword}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Feature Graphic */}
      <section className="max-w-[1160px] mx-auto px-5 pb-12">
        <BlogFeatureGraphic post={post} variant="hero" />
      </section>

      {/* Main 2-Column Editorial Layout: Sticky TOC + 6 Structured Content Blocks */}
      <section className="max-w-[1160px] mx-auto px-5 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Sticky Table of Contents */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 hidden lg:block">
            <div className="rounded-[20px] border border-white/10 bg-[#0c1018]/75 backdrop-blur-md p-5">
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.15em] text-[#66bcd3] mb-4">
                [ TABLE OF CONTENTS ]
              </p>
              <nav className="space-y-1.5">
                {tocItems.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToBlock(item.id)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-[12.5px] text-[#aeb5c0] hover:text-white hover:bg-white/[0.06] transition-colors flex items-start gap-2 cursor-pointer"
                  >
                    <span className="font-mono-tech text-[10.5px] text-[#858b94] mt-0.5">
                      0{idx + 1}
                    </span>
                    <span className="line-clamp-2 leading-[1.35]">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-5 border-t border-white/10">
                <p className="text-[12.5px] font-medium text-[#edf0f5] mb-1.5">
                  Need this built for your stack?
                </p>
                <p className="text-[11.5px] text-[#858b94] leading-[1.5] mb-4">
                  Ship custom AI agents in 2–4 weeks with HeyDots.
                </p>
                <button
                  type="button"
                  onClick={() => onOpenContact(`Sidebar CTA: ${post.title}`)}
                  className="w-full py-2.5 px-3 rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white text-[12px] font-medium transition-colors cursor-pointer"
                >
                  Book Free Strategy Call
                </button>
              </div>
            </div>
          </aside>

          {/* Right Main 6-Block Article Body */}
          <article className="lg:col-span-9 space-y-10">
            {/* BLOCK 1: Executive Key Takeaways Box (AEO / GEO Summary) */}
            <div
              id="key-takeaways"
              className="scroll-mt-24 rounded-[20px] border border-[#8b5cf6]/30 bg-gradient-to-br from-[#8b5cf6]/12 via-[#0c1018]/85 to-[#66bcd3]/10 p-6 sm:p-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#66bcd3]" />
                <h2 className="font-mono-tech text-[12px] uppercase tracking-[0.16em] text-[#c4b5fd]">
                  Key Takeaways &amp; Executive Summary
                </h2>
              </div>
              <ul className="space-y-3">
                {post.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[14.5px] sm:text-[15px] text-[#e2e8f0] leading-[1.65]">
                    <span className="mt-1.5 w-5 h-5 rounded-full bg-[#8b5cf6]/25 border border-[#8b5cf6]/40 text-[#c4b5fd] text-[11px] font-mono-tech flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* BLOCK 2: Sections 1 & 2 */}
            {post.sections.slice(0, 2).map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="scroll-mt-24 rounded-[20px] border border-white/10 bg-[#0c1018]/65 backdrop-blur-md p-6 sm:p-8 space-y-4"
              >
                <h2 className="text-[22px] sm:text-[26px] font-medium text-clavion-gradient leading-[1.22]">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-[15px] sm:text-[16px] text-[#aeb5c0] leading-[1.78]">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2.5 pt-2">
                    {section.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[14.5px] text-[#cbd5e1] leading-[1.65]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#66bcd3] mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.callout && (
                  <div className="mt-4 rounded-[14px] border border-[#66bcd3]/30 bg-[#66bcd3]/10 p-4 sm:p-5">
                    <p className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#66bcd3] mb-1.5">
                      {section.callout.label}
                    </p>
                    <p className="text-[14px] sm:text-[14.5px] text-[#edf0f5] leading-[1.65]">
                      {section.callout.text}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* BLOCK 3: Mid-Article Visual Architecture Blueprint Graphic */}
            <div
              id="architecture-visual"
              className="scroll-mt-24 relative rounded-[22px] border border-[#66bcd3]/30 bg-gradient-to-br from-[#0e1628]/95 via-[#0c1018]/90 to-[#15122b]/90 p-6 sm:p-8 overflow-hidden"
            >
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-[#66bcd3]/15 border border-[#66bcd3]/35 font-mono-tech text-[11px] text-[#bae6fd] mb-3">
                  {post.visualBlock.badge}
                </span>
                <h2 className="text-[22px] sm:text-[26px] font-medium text-white leading-[1.2] mb-2">
                  {post.visualBlock.title}
                </h2>
                <p className="text-[14px] text-[#aeb5c0] leading-[1.6] mb-6 max-w-[680px]">
                  {post.visualBlock.subtitle}
                </p>

                {/* Pipeline Flow Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                  {post.visualBlock.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="rounded-[14px] border border-white/10 bg-[#0a0d14]/80 p-4 flex items-start gap-3"
                    >
                      <span className="w-7 h-7 rounded-lg bg-[#8b5cf6]/25 border border-[#8b5cf6]/40 text-[#c4b5fd] font-mono-tech text-[12px] flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </span>
                      <p className="text-[13.5px] text-[#edf0f5] leading-[1.5]">{step}</p>
                    </div>
                  ))}
                </div>

                {/* Metric Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                  {post.visualBlock.metrics.map((metric) => (
                    <div key={metric.label} className="text-left">
                      <p className="font-mono-tech text-[10.5px] uppercase tracking-[0.1em] text-[#858b94]">
                        {metric.label}
                      </p>
                      <p className="text-[16px] sm:text-[18px] font-semibold text-[#66bcd3] mt-0.5">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BLOCK 4: Section 3 + Structured Comparison Table */}
            {post.sections.slice(2, 3).map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="scroll-mt-24 rounded-[20px] border border-white/10 bg-[#0c1018]/65 backdrop-blur-md p-6 sm:p-8 space-y-4"
              >
                <h2 className="text-[22px] sm:text-[26px] font-medium text-clavion-gradient leading-[1.22]">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-[15px] sm:text-[16px] text-[#aeb5c0] leading-[1.78]">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2.5 pt-2">
                    {section.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[14.5px] text-[#cbd5e1] leading-[1.65]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Structured Comparison Table (High-Value Google Snippet & LLM Extraction Block) */}
            <div
              id="comparison-table"
              className="scroll-mt-24 rounded-[20px] border border-white/12 bg-[#0c1018]/75 backdrop-blur-md p-6 sm:p-8"
            >
              <h2 className="text-[20px] sm:text-[24px] font-medium text-clavion-gradient mb-1.5">
                {post.comparisonTable.title}
              </h2>
              <p className="text-[13.5px] text-[#858b94] mb-5">
                {post.comparisonTable.subtitle}
              </p>
              <div className="overflow-x-auto rounded-[14px] border border-white/10">
                <table className="w-full text-left border-collapse min-w-[540px]">
                  <thead>
                    <tr className="bg-white/[0.05] border-b border-white/10">
                      {post.comparisonTable.headers.map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3.5 text-[12px] font-mono-tech uppercase tracking-[0.08em] text-[#c4b5fd]"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.07]">
                    {post.comparisonTable.rows.map((row, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-white/[0.025] transition-colors">
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className={`px-4 py-3.5 text-[13.5px] leading-[1.5] ${
                              cellIdx === 0
                                ? 'font-medium text-[#edf0f5]'
                                : 'text-[#aeb5c0]'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* BLOCK 5: Remaining Narrative Sections */}
            {post.sections.slice(3).map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="scroll-mt-24 rounded-[20px] border border-white/10 bg-[#0c1018]/65 backdrop-blur-md p-6 sm:p-8 space-y-4"
              >
                <h2 className="text-[22px] sm:text-[26px] font-medium text-clavion-gradient leading-[1.22]">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-[15px] sm:text-[16px] text-[#aeb5c0] leading-[1.78]">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2.5 pt-2">
                    {section.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[14.5px] text-[#cbd5e1] leading-[1.65]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#66bcd3] mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* BLOCK 6: Frequently Asked Questions (AEO + FAQPage Schema) */}
            <div
              id="article-faqs"
              className="scroll-mt-24 rounded-[20px] border border-white/10 bg-[#0c1018]/70 backdrop-blur-md p-6 sm:p-8"
            >
              <p className="font-mono-tech text-[11px] uppercase tracking-[0.15em] text-[#66bcd3] mb-2">
                [ FREQUENTLY ASKED QUESTIONS ]
              </p>
              <h2 className="text-[22px] sm:text-[26px] font-medium text-clavion-gradient mb-6">
                Common Questions About {post.targetKeyword}
              </h2>
              <div className="space-y-3">
                {post.faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-[14px] border border-white/10 bg-[#0a0d14]/70 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                      >
                        <span className="text-[14.5px] sm:text-[15.5px] font-medium text-[#edf0f5]">
                          {faq.question}
                        </span>
                        <span className="text-[#66bcd3] font-mono-tech text-[18px] shrink-0">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 pt-1 text-[14px] text-[#aeb5c0] leading-[1.7] border-t border-white/[0.06]">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Author & Bottom Conversion CTA Card */}
            <div className="rounded-[24px] border border-[#8b5cf6]/30 bg-gradient-to-br from-[#8b5cf6]/18 via-[#0c1018]/90 to-[#66bcd3]/15 p-7 sm:p-9">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="max-w-[540px]">
                  <p className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#c4b5fd] mb-2">
                    [ READY TO DEPLOY WITH HEYDOTS? ]
                  </p>
                  <h3 className="text-[22px] sm:text-[26px] font-medium text-clavion-gradient mb-2.5">
                    Work with a Production-First AI Agency in 2027
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#aeb5c0] leading-[1.65]">
                    Book a free consultation to map your workflows, estimate exact hours saved, and launch custom AI agents tailored to your business stack in 2–4 weeks.
                  </p>
                </div>
                <div className="shrink-0">
                  <GlossyAiButton
                    label="Book a Consultation"
                    onClick={() => onOpenContact(`Blog Inquiry: ${post.title}`)}
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="max-w-[1160px] mx-auto px-5 pb-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <SectionKicker text="KEEP READING" className="mb-2" />
              <h2 className="text-[22px] sm:text-[26px] font-medium text-clavion-gradient">
                Related AI Automation Guides
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/blog')}
              className="text-[13px] text-[#66bcd3] hover:text-white transition-colors cursor-pointer"
            >
              View all {BLOG_POSTS.length} articles →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost.id}
                onClick={() => onNavigate(`/blog/${relatedPost.slug}`)}
                className="relative rounded-[20px] border border-white/10 bg-[#0c1018]/70 backdrop-blur-md overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:border-[#8b5cf6]/45 flex flex-col"
              >
                <BlogFeatureGraphic post={relatedPost} variant="card" />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] text-[#858b94]">{relatedPost.date}</span>
                    <span className="text-[11px] text-[#66bcd3]">{relatedPost.readTime}</span>
                  </div>
                  <h3 className="text-[16.5px] font-medium text-[#edf0f5] leading-[1.32] mb-2.5 group-hover:text-[#c4b5fd] transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-[12.5px] text-[#aeb5c0] leading-[1.6] line-clamp-2 flex-1">
                    {relatedPost.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
