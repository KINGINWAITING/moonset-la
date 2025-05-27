import { ReactNode, useState, useEffect, useRef } from 'react';

interface ScrollOptimizerProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  disableWhenScrolling?: boolean;
  pauseTimeout?: number;
}

/**
 * ScrollOptimizer component improves scroll performance by:
 * 1. Detecting when content is in viewport
 * 2. Optionally disabling expensive animations during active scrolling
 * 3. Re-enabling animations when scrolling stops
 */
export const ScrollOptimizer = ({
  children,
  threshold = 0.1,
  rootMargin = "20px",
  disableWhenScrolling = true,
  pauseTimeout = 150
}: ScrollOptimizerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<number | null>(null);

  // Handle visibility detection with IntersectionObserver
  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(currentRef);
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  // Handle scroll detection
  useEffect(() => {
    if (!disableWhenScrolling) return;

    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear existing timer
      if (scrollTimer.current !== null) {
        window.clearTimeout(scrollTimer.current);
      }
      
      // Set new timer to mark scrolling as ended
      scrollTimer.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, pauseTimeout);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer.current !== null) {
        window.clearTimeout(scrollTimer.current);
      }
    };
  }, [disableWhenScrolling, pauseTimeout]);

  // Content will render with animations when:
  // 1. It's visible in the viewport AND
  // 2. Either scrolling optimization is disabled OR user is not actively scrolling
  const shouldRenderAnimated = isVisible && (!disableWhenScrolling || !isScrolling);

  return (
    <div ref={containerRef} style={{ willChange: 'transform' }} className="relative">
      {shouldRenderAnimated ? (
        // Render with animations when conditions are met
        children
      ) : (
        // Render with animations disabled when scrolling or outside viewport
        <div style={{ opacity: isVisible ? 1 : 0 }} className="transition-opacity duration-300">
          {children}
        </div>
      )}
    </div>
  );
}; 