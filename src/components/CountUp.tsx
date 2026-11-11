import React, { useEffect, useRef } from 'react';
import { animate, useInView } from 'motion/react';

interface CountUpProps {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  /** Kept for backwards compatibility */
  loopMs?: number;
}

/**
 * High-performance counter that updates textContent directly in the DOM
 * without triggering React component re-renders on every animation frame.
 */
export const CountUp: React.FC<CountUpProps> = ({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.6,
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [inView, to, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
};
