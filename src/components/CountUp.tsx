import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number | string;
  duration?: number;
  className?: string;
}

export const CountUp = ({ end, duration = 2000, className }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const isNumber = typeof end === 'number' || !isNaN(Number(end));
  const endValue = isNumber ? Number(end) : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated && isNumber) {
          setHasAnimated(true);
          
          const startTime = performance.now();
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeOut * endValue);
            
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(endValue);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [endValue, duration, hasAnimated, isNumber]);

  // For non-numeric values like "∞", just display them
  if (!isNumber) {
    return <span ref={ref} className={className}>{end}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {String(count).padStart(2, '0')}
    </span>
  );
};
