import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { BLOG_CATEGORIES, BLOG_POSTS, BlogCategory } from '../data/blogPosts';
import { SectionKicker } from './RainbowButton';
import { GlossyAiButton } from './PillButtons';
import { BlogFeatureGraphic } from './BlogFeatureGraphic';

interface BlogPageProps {
  onNavigate: (to: string) => void;
  onOpenContact: (defaultPlan?: string) => void;
}

const POSTS_PER_PAGE = 12;

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigate,
  onOpenContact,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = 'AI Automation & Search Insights (50+ Guides) | HeyDots — Best AI Agency in 2027';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore 50+ production playbooks on custom AI agents, workflow automation, GEO/AEO ranking, and choosing the best AI agency in 2027 across the US.'
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://heydots.com/blog');
    }
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: BLOG_POSTS.length };
    for (const post of BLOG_POSTS) {
      counts[post.category] = (counts[post.category] || 0) + 1;
    }
    return counts;
  }, []);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.targetKeyword.toLowerCase().includes(q) ||
        (post.location && post.location.toLowerCase().includes(q)) ||
        post.secondaryKeywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  const showFeaturedHero = selectedCategory === 'All' && !searchQuery.trim() && currentPage === 1;
  const featuredPost = BLOG_POSTS[0];
  const gridPool = showFeaturedHero ? filteredPosts.slice(1) : filteredPosts;

  const totalPages = Math.max(1, Math.ceil(gridPool.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const visiblePosts = gridPool.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  );

  const firstRowPosts = visiblePosts.slice(0, 3);
  const remainingPosts = visiblePosts.slice(3);

  const handleCategoryChange = (category: 'All' | BlogCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 sm:pt-28 sm:pb-14 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4"
          >
            <SectionKicker text="AI INSIGHTS & 2027 PLAYBOOKS" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
            className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.1] max-w-[780px] mb-5"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', textWrap: 'balance' }}
          >
            AI Automation &amp; Search Insights
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-[#aeb5c0] text-[15px] sm:text-[16px] leading-[1.65] max-w-[600px] mb-8"
          >
            {BLOG_POSTS.length} production-grade playbooks on custom AI agents, workflow automation, SaaS development, GEO/AEO search visibility, and partnering with the best AI agency in 2027 across the US.
          </motion.p>

          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
            className="w-full max-w-[540px] mb-7"
          >
            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={`Search ${BLOG_POSTS.length} guides (e.g. Best AI agency in 2027, Austin, SaaS, RAG, AEO)...`}
                aria-label="Search blog articles"
                className="w-full pl-11 pr-4 py-3.5 rounded-full bg-[#0c1018]/85 border border-white/15 text-[14px] text-[#edf0f5] placeholder:text-[#858b94] focus:outline-none focus:border-[#8b5cf6] backdrop-blur-md transition-colors"
              />
              <svg
                className="w-4 h-4 text-[#858b94] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" strokeLinecap="round" />
              </svg>
            </div>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {BLOG_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-[12.5px] font-medium transition-all cursor-pointer border ${
                    active
                      ? 'bg-[#8b5cf6] border-[#8b5cf6] text-white shadow-lg shadow-[#8b5cf6]/25'
                      : 'bg-[#0c1018]/70 border-white/10 text-[#aeb5c0] hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {category}{' '}
                  <span className={active ? 'text-white/80' : 'text-[#858b94]'}>
                    ({categoryCounts[category] || 0})
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Post Split Card (Matches Reference Layout) */}
      {showFeaturedHero && featuredPost && (
        <section className="max-w-[1200px] mx-auto px-5 pb-14">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#66bcd3]">
              [ FEATURED 2027 GUIDE ]
            </span>
            <span className="text-[12px] text-[#858b94]">
              {BLOG_POSTS.length} Published Playbooks
            </span>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onNavigate(`/blog/${featuredPost.slug}`)}
            className="relative rounded-[24px] border border-white/12 bg-[#0c1018]/75 backdrop-blur-md overflow-hidden group cursor-pointer hover:border-[#8b5cf6]/45 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-6">
                <BlogFeatureGraphic post={featuredPost} variant="featured" />
              </div>
              <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6]/35 text-[11.5px] font-medium text-[#c4b5fd]">
                    {featuredPost.category}
                  </span>
                  <span className="text-[12px] text-[#858b94]">{featuredPost.date}</span>
                  <span className="text-[12px] text-[#858b94]">· {featuredPost.readTime}</span>
                </div>

                <h2 className="text-[24px] sm:text-[30px] font-medium text-clavion-gradient leading-[1.18] mb-3.5 group-hover:text-white transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="text-[14px] sm:text-[15px] text-[#aeb5c0] leading-[1.65] mb-5">
                  {featuredPost.excerpt}
                </p>

                <ul className="space-y-2 mb-6">
                  {featuredPost.keyTakeaways.slice(0, 2).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[13px] text-[#cbd5e1]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#66bcd3] mt-1.5 shrink-0" />
                      <span className="line-clamp-2">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-[12px] text-[#aeb5c0]">
                    <span className="text-[#edf0f5] font-medium">{featuredPost.author.name}</span>
                    <span className="text-[#858b94]"> · {featuredPost.author.role}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[#66bcd3] text-[13px] font-medium group-hover:translate-x-0.5 transition-transform">
                    Read guide
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </motion.article>
        </section>
      )}

      {/* Main Articles Section */}
      <section className="max-w-[1200px] mx-auto px-5 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-[20px] sm:text-[24px] font-medium text-[#edf0f5]">
              {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
            </h2>
            <p className="text-[13px] text-[#858b94]">
              Showing {visiblePosts.length} of {gridPool.length} articles
              {searchQuery.trim() ? ` matching "${searchQuery.trim()}"` : ''}
            </p>
          </div>
          {totalPages > 1 && (
            <span className="font-mono-tech text-[12px] text-[#aeb5c0]">
              Page {safePage} / {totalPages}
            </span>
          )}
        </div>

        {visiblePosts.length === 0 ? (
          <div className="rounded-[20px] border border-white/10 bg-[#0c1018]/70 p-12 text-center">
            <p className="text-[16px] text-[#edf0f5] font-medium mb-2">
              No articles matched your search.
            </p>
            <p className="text-[14px] text-[#aeb5c0] mb-6">
              Try searching for a US city (New York, Austin, Miami), AI agents, n8n, or GEO.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="px-5 py-2.5 rounded-full bg-[#8b5cf6] text-white text-[13px] font-medium cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            {/* Top 3-Column Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {firstRowPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => onNavigate(`/blog/${post.slug}`)}
                  className="relative rounded-[20px] border border-white/10 bg-[#0c1018]/70 backdrop-blur-md overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:border-[#8b5cf6]/45 flex flex-col"
                >
                  <BlogFeatureGraphic post={post} variant="card" />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11.5px] text-[#858b94]">{post.date}</span>
                      <span className="text-[11.5px] text-[#66bcd3] font-medium">{post.readTime}</span>
                    </div>
                    <h3 className="text-[17.5px] font-medium text-[#edf0f5] leading-[1.32] mb-2.5 group-hover:text-[#c4b5fd] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[13px] text-[#aeb5c0] leading-[1.6] mb-5 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="pt-3.5 border-t border-white/[0.07] flex items-center justify-between text-[12px]">
                      <span className="text-[#858b94]">{post.author.name}</span>
                      <span className="text-[#66bcd3] font-medium">Read article →</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Inline Mid-Grid Conversion Banner (Matches Reference Screenshot 1) */}
            <div className="my-10 relative rounded-[24px] border border-[#8b5cf6]/30 bg-gradient-to-r from-[#0e1526]/95 via-[#131932]/90 to-[#0d1926]/95 overflow-hidden p-7 sm:p-10">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8">
                  <span className="inline-block font-mono-tech text-[11px] uppercase tracking-[0.16em] text-[#66bcd3] mb-2.5">
                    [ BEST AI AGENCY IN 2027 • US &amp; GLOBAL ]
                  </span>
                  <h3 className="text-[22px] sm:text-[28px] font-medium text-clavion-gradient leading-[1.18] mb-3">
                    Turn Your Manual Workflows Into Observable Production AI Agents in 2–4 Weeks
                  </h3>
                  <p className="text-[14px] text-[#aeb5c0] leading-[1.6] max-w-[600px]">
                    Trusted by 30+ high-growth teams. Get a free workflow audit and custom 90-day AI automation blueprint tailored to your CRM, support, and operations stack.
                  </p>
                </div>
                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-3">
                  <GlossyAiButton
                    label="Book Free AI Audit"
                    onClick={() => onOpenContact('Blog Mid-Page AI Audit')}
                  />
                  <span className="text-[12px] text-[#858b94]">
                    Transparent builds starting at $499 · Zero lock-in
                  </span>
                </div>
              </div>
              <div
                className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#8b5cf6]/20 blur-3xl"
                aria-hidden
              />
            </div>

            {/* Remaining 3-Column Grid */}
            {remainingPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => onNavigate(`/blog/${post.slug}`)}
                    className="relative rounded-[20px] border border-white/10 bg-[#0c1018]/70 backdrop-blur-md overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:border-[#8b5cf6]/45 flex flex-col"
                  >
                    <BlogFeatureGraphic post={post} variant="card" />
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11.5px] text-[#858b94]">{post.date}</span>
                        <span className="text-[11.5px] text-[#66bcd3] font-medium">{post.readTime}</span>
                      </div>
                      <h3 className="text-[17.5px] font-medium text-[#edf0f5] leading-[1.32] mb-2.5 group-hover:text-[#c4b5fd] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-[13px] text-[#aeb5c0] leading-[1.6] mb-5 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="pt-3.5 border-t border-white/[0.07] flex items-center justify-between text-[12px]">
                        <span className="text-[#858b94]">{post.author.name}</span>
                        <span className="text-[#66bcd3] font-medium">Read article →</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 320, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-full border border-white/15 bg-[#0c1018]/75 text-[13px] text-[#edf0f5] disabled:opacity-40 hover:border-[#8b5cf6] transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 320, behavior: 'smooth' });
                    }}
                    className={`w-10 h-10 rounded-full text-[13px] font-medium transition-all cursor-pointer border ${
                      page === safePage
                        ? 'bg-[#8b5cf6] border-[#8b5cf6] text-white'
                        : 'bg-[#0c1018]/75 border-white/10 text-[#aeb5c0] hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 320, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-full border border-white/15 bg-[#0c1018]/75 text-[13px] text-[#edf0f5] disabled:opacity-40 hover:border-[#8b5cf6] transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Bottom Newsletter / Strategy CTA */}
      <section className="max-w-[1200px] mx-auto px-5 pb-20">
        <div className="relative rounded-[24px] border border-white/10 bg-gradient-to-br from-[#8b5cf6]/20 via-[#0c1018]/85 to-[#66bcd3]/20 overflow-hidden p-8 sm:p-12 text-center">
          <div className="relative z-10">
            <h2 className="text-[24px] sm:text-[32px] font-medium text-clavion-gradient leading-[1.15] mb-4">
              Want Custom AI Agents Built for Your Business?
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#aeb5c0] leading-[1.6] max-w-[520px] mx-auto mb-8">
              Get our weekly AI automation breakdowns—or book a free consultation with HeyDots to map your highest-ROI 2027 workflows.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-[440px] mx-auto">
              <input
                type="email"
                placeholder="Enter your work email"
                className="w-full px-4 py-3 rounded-full bg-[#0a0d14] border border-white/20 text-[14px] text-[#edf0f5] placeholder:text-[#858b94] focus:outline-none focus:border-[#8b5cf6]"
              />
              <GlossyAiButton
                label="Get Playbooks"
                onClick={() => onOpenContact('Newsletter & AI Playbooks')}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
