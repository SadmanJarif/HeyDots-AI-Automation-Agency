import React from 'react';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../data/clavionData';
import { SectionKicker } from './RainbowButton';
import { GlossyAiButton } from './PillButtons';

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
  const post = BLOG_POSTS.find((p) => p.slug === slug);

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

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 sm:pt-24 sm:pb-16 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4"
          >
            <button
              type="button"
              onClick={() => onNavigate('/blog')}
              className="inline-flex items-center gap-2 text-[13px] text-[#aeb5c0] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Blog
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="max-w-[800px]"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1.5 rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 text-[12px] font-medium text-[#c4b5fd]">
                {post.category}
              </span>
              <span className="text-[12px] text-[#858b94]">{post.date}</span>
              <span className="text-[12px] text-[#858b94]">· {post.readTime}</span>
            </div>

            <h1 className="text-[32px] sm:text-[48px] font-medium text-clavion-gradient leading-[1.12] mb-6">
              {post.title}
            </h1>

            <p className="text-[16px] sm:text-[18px] text-[#aeb5c0] leading-[1.7] mb-8">
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="max-w-[1200px] mx-auto px-5 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[24px] overflow-hidden border border-white/10"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[16/9] sm:aspect-[21/9] object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </section>

      {/* Article Content */}
      <section className="max-w-[800px] mx-auto px-5 pb-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          {post.body.map((paragraph, index) => (
            <p
              key={index}
              className="text-[15px] sm:text-[16px] text-[#aeb5c0] leading-[1.8] mb-6 first:mt-0"
            >
              {paragraph}
            </p>
          ))}
        </motion.article>

        {/* Author/CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-12 p-6 sm:p-8 rounded-[20px] border border-white/10 bg-[#0c1018]/60"
        >
          <h3 className="text-[20px] sm:text-[24px] font-medium text-clavion-gradient mb-3">
            Want to implement this?
          </h3>
          <p className="text-[14px] sm:text-[15px] text-[#aeb5c0] leading-[1.6] mb-6">
            Our team can help you build similar AI automation solutions for your business. Book a free consultation to discuss your needs.
          </p>
          <GlossyAiButton
            label="Book a Consultation"
            onClick={() => onOpenContact(`Blog Inquiry: ${post.title}`)}
          />
        </motion.div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-5 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <SectionKicker text="RELATED ARTICLES" className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 + index * 0.1 }}
                  className="relative rounded-[20px] border border-white/10 bg-[#0c1018]/60 overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:border-[#8b5cf6]/30"
                  onClick={() => onNavigate(`/blog/${relatedPost.slug}`)}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[11px] font-medium text-[#c4b5fd]">
                        {relatedPost.category}
                      </span>
                      <span className="text-[11px] text-[#858b94]">{relatedPost.date}</span>
                    </div>
                    <h3 className="text-[18px] sm:text-[20px] font-medium text-[#edf0f5] leading-[1.3] mb-3 group-hover:text-[#c4b5fd] transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-[13px] text-[#aeb5c0] leading-[1.6] mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-[#66bcd3] text-[12px] font-medium">
                      <span>Read article</span>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
};
