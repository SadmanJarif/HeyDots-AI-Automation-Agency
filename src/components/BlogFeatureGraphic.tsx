import React from 'react';
import { BlogPost } from '../data/blogTypes';

interface BlogFeatureGraphicProps {
  post: BlogPost;
  variant?: 'card' | 'featured' | 'hero';
}

const ACCENT_STYLES: Record<
  BlogPost['accent'],
  {
    glow: string;
    badge: string;
    statBorder: string;
    bar: string;
  }
> = {
  violet: {
    glow: 'from-[#8b5cf6]/35 via-[#1e3fd8]/20 to-[#0a0d14]/90',
    badge: 'bg-[#8b5cf6]/25 border-[#8b5cf6]/40 text-[#ddd6fe]',
    statBorder: 'border-[#8b5cf6]/35 bg-[#8b5cf6]/15 text-[#e9d5ff]',
    bar: 'from-[#8b5cf6] to-[#66bcd3]',
  },
  cyan: {
    glow: 'from-[#66bcd3]/35 via-[#1e3fd8]/20 to-[#0a0d14]/90',
    badge: 'bg-[#66bcd3]/20 border-[#66bcd3]/40 text-[#bae6fd]',
    statBorder: 'border-[#66bcd3]/35 bg-[#66bcd3]/15 text-[#cffafe]',
    bar: 'from-[#66bcd3] to-[#38bdf8]',
  },
  emerald: {
    glow: 'from-[#10b981]/30 via-[#0f766e]/20 to-[#0a0d14]/90',
    badge: 'bg-[#10b981]/20 border-[#10b981]/40 text-[#a7f3d0]',
    statBorder: 'border-[#10b981]/35 bg-[#10b981]/15 text-[#d1fae5]',
    bar: 'from-[#10b981] to-[#66bcd3]',
  },
  indigo: {
    glow: 'from-[#6366f1]/35 via-[#1e3fd8]/25 to-[#0a0d14]/90',
    badge: 'bg-[#6366f1]/25 border-[#6366f1]/40 text-[#c7d2fe]',
    statBorder: 'border-[#6366f1]/35 bg-[#6366f1]/15 text-[#e0e7ff]',
    bar: 'from-[#6366f1] to-[#8b5cf6]',
  },
  amber: {
    glow: 'from-[#f59e0b]/25 via-[#8b5cf6]/20 to-[#0a0d14]/90',
    badge: 'bg-[#f59e0b]/20 border-[#f59e0b]/40 text-[#fde68a]',
    statBorder: 'border-[#f59e0b]/35 bg-[#f59e0b]/15 text-[#fef3c7]',
    bar: 'from-[#f59e0b] to-[#fb7185]',
  },
  rose: {
    glow: 'from-[#f43f5e]/28 via-[#8b5cf6]/20 to-[#0a0d14]/90',
    badge: 'bg-[#f43f5e]/20 border-[#f43f5e]/40 text-[#fecdd3]',
    statBorder: 'border-[#f43f5e]/35 bg-[#f43f5e]/15 text-[#ffe4e6]',
    bar: 'from-[#f43f5e] to-[#8b5cf6]',
  },
};

export const BlogFeatureGraphic: React.FC<BlogFeatureGraphicProps> = ({
  post,
  variant = 'card',
}) => {
  const style = ACCENT_STYLES[post.accent] || ACCENT_STYLES.violet;
  const isHero = variant === 'hero';
  const isFeatured = variant === 'featured';

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#0b101b] select-none ${
        isHero
          ? 'min-h-[260px] sm:min-h-[340px] rounded-[24px] border border-white/10'
          : isFeatured
          ? 'h-full min-h-[280px] lg:min-h-[360px]'
          : 'aspect-[16/10]'
      }`}
    >
      {/* Real Editorial Backdrop Photo */}
      <img
        src={post.image}
        alt={post.title}
        loading={isHero || isFeatured ? 'eager' : 'lazy'}
        className="absolute inset-0 w-full h-full object-cover opacity-55 transition-transform duration-700 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />

      {/* Atmospheric Dark Scrim + Accent Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${style.glow}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14]/95 via-[#0a0d14]/55 to-[#0a0d14]/30" />

      {/* Subtle Tech Grid Texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Overlay Content */}
      <div
        className={`relative z-10 h-full flex flex-col justify-between ${
          isHero ? 'p-6 sm:p-10' : isFeatured ? 'p-6 sm:p-8' : 'p-4 sm:p-5'
        }`}
      >
        {/* Top Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-full border text-[11px] font-medium backdrop-blur-md ${style.badge}`}
            >
              {post.category}
            </span>
            {post.location && (
              <span className="px-2.5 py-1 rounded-full border border-white/15 bg-[#0a0d14]/65 text-[11px] text-[#edf0f5] backdrop-blur-md">
                {post.location}
              </span>
            )}
          </div>
          <span
            className={`px-2.5 py-1 rounded-md border font-mono-tech text-[10px] sm:text-[11px] font-medium backdrop-blur-md ${style.statBorder}`}
          >
            {post.heroStat}
          </span>
        </div>

        {/* Center/Bottom Mini Editorial Card */}
        <div className={isHero ? 'grid grid-cols-1 lg:grid-cols-12 gap-5 items-end mt-6' : 'mt-auto pt-4'}>
          <div className={isHero ? 'lg:col-span-7' : ''}>
            <div className="inline-flex items-center gap-1.5 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#66bcd3]" />
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.14em] text-[#aeb5c0]">
                HeyDots • {post.targetKeyword}
              </span>
            </div>
            <p
              className={`font-medium text-white leading-[1.22] tracking-[-0.02em] ${
                isHero
                  ? 'text-[22px] sm:text-[28px]'
                  : isFeatured
                  ? 'text-[19px] sm:text-[23px]'
                  : 'text-[14px] sm:text-[15px] line-clamp-2'
              }`}
            >
              {post.visualBlock.title}
            </p>
            {(isHero || isFeatured) && (
              <p className="text-[12.5px] sm:text-[13.5px] text-[#cbd5e1] mt-2 line-clamp-2 max-w-[540px]">
                {post.visualBlock.subtitle}
              </p>
            )}
          </div>

          {isHero && (
            <div className="lg:col-span-5 grid grid-cols-2 gap-2.5">
              {post.visualBlock.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[14px] border border-white/12 bg-[#0a0d14]/75 backdrop-blur-md p-3.5"
                >
                  <p className="font-mono-tech text-[10px] uppercase tracking-[0.1em] text-[#858b94] mb-1">
                    {metric.label}
                  </p>
                  <p className="text-[15px] sm:text-[16px] font-semibold text-[#edf0f5]">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Accent Bar */}
        <div className="mt-3 h-[2px] w-full rounded-full bg-white/10 overflow-hidden">
          <div className={`h-full w-2/3 bg-gradient-to-r ${style.bar}`} />
        </div>
      </div>
    </div>
  );
};
