import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';

interface CountUpProps {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  /** Re-run the count every N ms to keep the number alive (0 = once) */
  loopMs?: number;
}

/** Number that counts up when scrolled into view (and optionally replays). */
export const CountUp: React.FC<CountUpProps> = ({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.8,
  className,
  loopMs = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [value, setValue] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!inView || !loopMs) return;
    const t = window.setInterval(() => setCycle((c) => c + 1), loopMs);
    return () => window.clearInterval(t);
  }, [inView, loopMs]);

  useEffect(() => {
    if (!inView) {
      setValue(0);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, cycle]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};
