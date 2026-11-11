import React, { useEffect, useRef } from 'react';

interface AsciiWaveBackgroundProps {
  className?: string;
  cols?: number;
  rows?: number;
}

const WAVE_CHARS = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'];

/**
 * Lightweight GPU-friendly Canvas ASCII Wave Background.
 * Avoids 800+ React DOM node updates every 250ms and pauses automatically when off-screen.
 */
export const AsciiWaveBackground: React.FC<AsciiWaveBackgroundProps> = ({
  className = '',
  cols = 52,
  rows = 12,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let isVisible = false;
    let phase = 0;
    let lastDraw = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    const draw = (now: number) => {
      if (!isVisible) return;
      if (now - lastDraw >= 95) {
        lastDraw = now;
        resize();
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const cellW = w / cols;
        const cellH = h / rows;

        for (let r = 0; r < rows; r++) {
          const ny = (r / Math.max(1, rows - 1)) * 2 - 1;
          for (let c = 0; c < cols; c++) {
            const nx = (c / Math.max(1, cols - 1)) * 2 - 1;
            const wave =
              Math.sin(nx * 3.8 + phase) * 0.5 +
              Math.cos(ny * 2.6 - phase * 0.7) * 0.5;
            const intensity = Math.max(0, Math.min(1, (wave + 1) * 0.5));
            const charIdx = Math.min(
              WAVE_CHARS.length - 1,
              Math.floor(intensity * WAVE_CHARS.length)
            );
            const char = WAVE_CHARS[charIdx];
            if (char !== ' ') {
              const alpha = (0.04 + intensity * 0.14).toFixed(2);
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.fillText(char, (c + 0.5) * cellW, (r + 0.5) * cellH);
            }
          }
        }
        phase += 0.12;
      }
      rafId = window.requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(rafId);
          rafId = window.requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, [cols, rows]);

  return (
    <div
      className={`ascii-wave-container relative overflow-hidden select-none pointer-events-none bg-[#0a0d14] ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Top, Bottom, and Radial Vignette Overlays matching Clavion */}
      <div
        className="ascii-wave-vignette absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 60% at 50% 50%, rgba(10, 13, 20, 0) 20%, rgb(10, 13, 20) 100%), linear-gradient(180deg, rgb(10, 13, 20) 0%, rgba(10, 13, 20, 0) 28%, rgba(10, 13, 20, 0) 72%, rgb(10, 13, 20) 100%)',
        }}
      />
    </div>
  );
};
