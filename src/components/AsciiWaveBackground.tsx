import React, { useEffect, useState } from 'react';
import { computeAsciiWaveCell } from '../utils/clavionLogic';

interface AsciiWaveBackgroundProps {
  className?: string;
  cols?: number;
  rows?: number;
}

export const AsciiWaveBackground: React.FC<AsciiWaveBackgroundProps> = ({
  className = '',
  cols = 58,
  rows = 14,
}) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTick((t) => (t + 1) % 1000);
    }, 250);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className={`ascii-wave-container relative overflow-hidden select-none pointer-events-none bg-[#0a0d14] ${className}`}
      aria-hidden="true"
    >
      <div
        className="w-full h-full grid font-mono-tech text-[13px] leading-[18px] tracking-widest text-center"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((__, c) => {
            const { char, intensity } = computeAsciiWaveCell(c, r, cols, rows, tick);
            const opacity = (0.04 + intensity * 0.14).toFixed(3);
            return (
              <span
                key={`${r}-${c}`}
                className="ascii-wave-glyph"
                style={{ opacity }}
              >
                {char}
              </span>
            );
          })
        )}
      </div>

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
