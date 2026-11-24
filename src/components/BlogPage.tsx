import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../data/clavionData';
import { SectionKicker } from './RainbowButton';
import { GlossyAiButton } from './PillButtons';

interface BlogPageProps {
  onNavigate: (to: string) => void;
  onOpenContact: (defaultPlan?: string) => void;
  onOpenBlogPost: (post: typeof BLOG_POSTS[0]) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigate,
  onOpenContact,
  onOpenBlogPost,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI Agents', 'Productivity', 'Tools & Integrations'];

  const filteredPosts =
    selectedCategory === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const featuredPost = BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.slice(1);

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4"
          >
            <SectionKicker text="INSIGHTS & RESOURCES" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="text-clavion-gradient font-medium tracking-[-0.03em] leading-[1.12] max-w-[680px] mb-5"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4.1rem)', textWrap: 'balance' }}
          >
            AI Automation Insights
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.13 }}
            className="text-[#aeb5c0] text-[15px] sm:text-[16px] leading-[1.6] max-w-[490px] mb-8"
          >
            Expert insights on AI agents, workflow automation, and building intelligent systems that scale.
          </motion.p>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#8b5cf6] text-white'
                    : 'bg-white/[0.05] text-[#aeb5c0] hover:bg-white/[0.1] hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === 'All' && (
        <section className="max-w-[1200px] mx-auto px-5 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[24px] border border-white/10 bg-[#0c1018]/60 overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
            onClick={() => onOpenBlogPost(featuredPost)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1.5 rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 text-[12px] font-medium text-[#c4b5fd]">
                    {featuredPost.category}
                  </span>
                  <span className="text-[12px] text-[#858b94]">{featuredPost.date}</span>
                  <span className="text-[12px] text-[#858b94]">· {featuredPost.readTime}</span>
                </div>
                <h2 className="text-[26px] sm:text-[32px] font-medium text-clavion-gradient leading-[1.15] mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-[14px] sm:text-[15px] text-[#aeb5c0] leading-[1.65] mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[#66bcd3] text-[13px] font-medium">
                  <span>Read article</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="max-w-[1200px] mx-auto px-5 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedCategory === 'All' ? regularPosts : filteredPosts).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
              className="relative rounded-[20px] border border-white/10 bg-[#0c1018]/60 overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:border-[#8b5cf6]/30"
              onClick={() => onOpenBlogPost(post)}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[11px] font-medium text-[#c4b5fd]">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-[#858b94]">{post.date}</span>
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-medium text-[#edf0f5] leading-[1.3] mb-3 group-hover:text-[#c4b5fd] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[13px] text-[#aeb5c0] leading-[1.6] mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[#66bcd3] text-[12px] font-medium">
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="max-w-[1200px] mx-auto px-5 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[24px] border border-white/10 bg-gradient-to-br from-[#8b5cf6]/20 to-[#66bcd3]/20 overflow-hidden"
        >
          <div className="relative z-10 p-8 sm:p-12 text-center">
            <h2 className="text-[24px] sm:text-[32px] font-medium text-clavion-gradient leading-[1.15] mb-4">
              Stay Ahead with AI Insights
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#aeb5c0] leading-[1.6] max-w-[480px] mx-auto mb-8">
              Get weekly insights on AI automation, agent development, and workflow optimization delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-[400px] mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-full bg-[#0a0d14] border border-white/20 text-[14px] text-[#edf0f5] placeholder:text-[#858b94] focus:outline-none focus:border-[#8b5cf6]"
              />
              <GlossyAiButton label="Subscribe" onClick={() => onOpenContact('Newsletter Subscription')} />
            </div>
          </div>
          {/* Decorative gradient blobs */}
          <div
            className="absolute top-0 left-0 w-64 h-64 bg-[#8b5cf6]/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
            aria-hidden
          />
          <div
            className="absolute bottom-0 right-0 w-64 h-64 bg-[#66bcd3]/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
            aria-hidden
          />
        </motion.div>
      </section>
    </div>
  );
};
