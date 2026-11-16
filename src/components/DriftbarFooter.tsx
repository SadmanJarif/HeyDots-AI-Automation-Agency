import React, { useEffect, useRef } from 'react';

const EXPLORE_LINKS = [
  { label: 'Services', href: '#service' },
  { label: 'Growth Analytics', href: '#growth' },
  { label: 'Process', href: '#process' },
  { label: 'Case Studies', href: '#case' },
];

const CONNECT_LINKS = [
  { label: 'Book a Call', href: '#contact' },
  { label: 'Blog & Insights', href: '#blog' },
  { label: 'Email Us', href: 'mailto:info@heydots.com' },
  { label: 'Back to Top', href: '#home' },
];

interface FooterParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  hue: 'violet' | 'cyan' | 'white';
  phase: number;
}

export default function DriftbarFooter() {
  const footerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0.5,
    y: 0.6,
    active: false,
  });

  useEffect(() => {
    const footer = footerRef.current;
    const canvas = canvasRef.current;
    if (!footer || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let inView = true;
    let rafId = 0;
    let particles: FooterParticle[] = [];

    const initScene = () => {
      const rect = footer.getBoundingClientRect();
      const nextW = Math.max(280, Math.round(rect.width));
      const nextH = Math.max(320, Math.round(rect.height));
      if (Math.abs(nextW - width) < 2 && Math.abs(nextH - height) < 2) return;

      width = nextW;
      height = nextH;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 640 ? 28 : 52;
      const nextParticles: FooterParticle[] = [];
      for (let i = 0; i < count; i++) {
        const hueRoll = i % 5;
        nextParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: -0.14 - Math.random() * 0.25,
          r: 0.9 + Math.random() * 1.5,
          alpha: 0.22 + Math.random() * 0.55,
          hue: hueRoll === 0 || hueRoll === 1 ? 'violet' : hueRoll === 2 || hueRoll === 3 ? 'cyan' : 'white',
          phase: Math.random() * Math.PI * 2,
        });
      }
      particles = nextParticles;
    };

    const drawFrame = (timeSec: number) => {
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle perspective horizon grid lines near lower half
      const horizonY = height * 0.52;
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, horizonY, width, height - horizonY);
      ctx.clip();

      const gridFade = ctx.createLinearGradient(0, horizonY, 0, height);
      gridFade.addColorStop(0, 'rgba(139, 92, 246, 0)');
      gridFade.addColorStop(0.35, 'rgba(139, 92, 246, 0.08)');
      gridFade.addColorStop(1, 'rgba(56, 189, 248, 0.14)');
      ctx.strokeStyle = gridFade;
      ctx.lineWidth = 1;

      // Perspective radiating meridians
      const vanishX = width * 0.5 + (pointerRef.current.active ? (pointerRef.current.x - 0.5) * 40 : 0);
      const numRays = width < 640 ? 10 : 18;
      for (let i = -numRays; i <= numRays; i++) {
        const bottomX = width * 0.5 + i * (width / numRays) * 1.35;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizonY - 20);
        ctx.lineTo(bottomX, height);
        ctx.stroke();
      }

      // Exponentially spaced horizontal perspective lines
      const numRows = 8;
      const scrollOffset = (timeSec * 0.22) % 1;
      for (let r = 0; r < numRows; r++) {
        const t = (r + scrollOffset) / numRows;
        const y = horizonY + Math.pow(t, 2.05) * (height - horizonY);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Soft drifting aurora glow waves at bottom
      const waveX = width * (0.5 + Math.sin(timeSec * 0.35) * 0.12);
      const glow = ctx.createRadialGradient(waveX, height * 0.96, 10, waveX, height * 0.96, width * 0.62);
      glow.addColorStop(0, 'rgba(124, 58, 237, 0.34)');
      glow.addColorStop(0.42, 'rgba(56, 189, 248, 0.16)');
      glow.addColorStop(1, 'rgba(10, 13, 20, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Interactive pointer radial aura
      if (pointerRef.current.active) {
        const px = pointerRef.current.x * width;
        const py = pointerRef.current.y * height;
        const pGrad = ctx.createRadialGradient(px, py, 0, px, py, 190);
        pGrad.addColorStop(0, 'rgba(167, 139, 250, 0.16)');
        pGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.06)');
        pGrad.addColorStop(1, 'rgba(10, 13, 20, 0)');
        ctx.fillStyle = pGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Drifting luminous particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -8) {
            p.y = height + 8;
            p.x = Math.random() * width;
          }
          if (p.x < -8) p.x = width + 8;
          if (p.x > width + 8) p.x = -8;
        }

        const twinkle = 0.55 + 0.45 * Math.sin(timeSec * 1.6 + p.phase);
        const a = p.alpha * twinkle;
        const color =
          p.hue === 'violet'
            ? `rgba(167, 139, 250, ${a.toFixed(3)})`
            : p.hue === 'cyan'
            ? `rgba(56, 189, 248, ${a.toFixed(3)})`
            : `rgba(237, 240, 245, ${(a * 0.85).toFixed(3)})`;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    initScene();

    if (prefersReduced) {
      drawFrame(1.2);
      const ro = new ResizeObserver(() => {
        initScene();
        drawFrame(1.2);
      });
      ro.observe(footer);
      return () => ro.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    io.observe(footer);

    const ro = new ResizeObserver(() => initScene());
    ro.observe(footer);

    const start = performance.now();
    const tick = (now: number) => {
      if (inView) {
        drawFrame((now - start) * 0.001);
      }
      rafId = window.requestAnimationFrame(tick);
    };
    rafId = window.requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      ro.disconnect();
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: (e.clientX - rect.left) / Math.max(1, rect.width),
      y: (e.clientY - rect.top) / Math.max(1, rect.height),
      active: true,
    };
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-5 pb-24 md:pb-28">
      <footer
        ref={footerRef}
        id="footer"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative overflow-hidden rounded-[22px] sm:rounded-[26px] border border-white/[0.1] bg-gradient-to-b from-[#0d101b]/95 via-[#0a0d16]/98 to-[#070910] shadow-[0_24px_70px_rgba(0,0,0,0.82),inset_0_1px_0_rgba(255,255,255,0.08)] min-h-[430px] sm:min-h-[465px] flex flex-col justify-between"
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

        {/* Animated Neural Horizon Grid & Aurora Particle Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full z-0"
        />

        {/* Soft Ambient Corner Spotlights */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full z-0"
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.14) 0%, rgba(124, 58, 237, 0) 70%)',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full z-0"
          style={{
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(56, 189, 248, 0) 70%)',
          }}
        />

        {/* Giant Frosted Glass Watermark */}
        <p
          aria-hidden="true"
          className="pointer-events-none select-none font-pacifico absolute left-1/2 -bottom-4 sm:-bottom-6 -translate-x-1/2 z-[1] whitespace-nowrap leading-[1.05] px-4 opacity-55"
          style={{
            fontSize: 'clamp(4.4rem, 15vw, 13rem)',
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.42), rgba(167,189,248,0.16) 55%, rgba(255,255,255,0.28))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 28px rgba(139, 92, 246, 0.2))',
          }}
        >
          HeyDots
        </p>

        {/* Bottom Horizon Mist */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-[2]"
          style={{
            background:
              'linear-gradient(to top, rgba(7,9,16,0.92) 0%, rgba(7,9,16,0.42) 52%, rgba(7,9,16,0) 100%)',
          }}
        />

        {/* Top Main Content Grid */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* Left Brand Block */}
          <div className="md:col-span-6">
            <a
              href="#home"
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

          {/* Right Link Columns (Clean 2x4 Grid) */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8 sm:gap-12 md:justify-items-end">
            <nav aria-label="Footer explore navigation">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#edf0f5] mb-3.5">
                Explore
              </h3>
              <ul className="flex flex-col gap-1">
                {EXPLORE_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="inline-flex items-center min-h-[38px] sm:min-h-[34px] text-[13.5px] text-[#aeb6c6] hover:text-white hover:translate-x-1 transition-all duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer connect navigation">
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#edf0f5] mb-3.5">
                Connect
              </h3>
              <ul className="flex flex-col gap-1">
                {CONNECT_LINKS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="inline-flex items-center min-h-[38px] sm:min-h-[34px] text-[13.5px] text-[#aeb6c6] hover:text-white hover:translate-x-1 transition-all duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="relative z-10 px-6 sm:px-10 lg:px-12 pb-6 sm:pb-8 pt-12 sm:pt-16 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-[#9aa4b5]">
          <p>© 2026 HeyDots · All rights reserved.</p>
          <p className="font-mono-tech text-[11px] tracking-[0.04em] text-[#858f9f]">
            HEYDOTS.COM
          </p>
        </div>
      </footer>
    </div>
  );
}
