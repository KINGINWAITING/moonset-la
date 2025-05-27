import { useEffect, useCallback, useRef, useMemo } from 'react';

// Lightweight throttle implementation
const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Lightweight debounce implementation
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timeoutId: NodeJS.Timeout;
  
  const debounced = function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  } as ((...args: Parameters<T>) => void) & { cancel: () => void };

  debounced.cancel = () => clearTimeout(timeoutId);
  return debounced;
};

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  scrollPosition: number;
  renderTime: number;
}

interface UseScrollPerformanceOptions {
  /**
   * Set a CSS class to add to body during scrolling
   */
  scrollingClassName?: string;
  
  /**
   * Delay in ms after scrolling stops before removing className
   */
  debounceTime?: number;
  
  /**
   * Whether to add will-change to optimize rendering
   */
  optimizeRendering?: boolean;
  
  /**
   * Whether to enable performance metrics
   */
  enableMetrics?: boolean;
}

/**
 * Hook to optimize site scrolling performance
 */
export const useScrollPerformance = ({
  scrollingClassName = 'is-scrolling',
  debounceTime = 150,
  optimizeRendering = true,
  enableMetrics = false
}: UseScrollPerformanceOptions = {}) => {
  const metricsRef = useRef<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    scrollPosition: 0,
    renderTime: 0
  });
  
  const frameRef = useRef<number>();
  const lastScrollRef = useRef<number>(0);
  const scrollingRef = useRef<boolean>(false);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(
    throttle(() => {
      if (!scrollingRef.current) {
        scrollingRef.current = true;
        document.documentElement.classList.add(scrollingClassName);
        
        if (optimizeRendering) {
          // Disable pointer events during scroll for performance
          document.body.style.pointerEvents = 'none';
        }
      }
      
      metricsRef.current.scrollPosition = window.scrollY;
      lastScrollRef.current = performance.now();
    }, 16), // ~60fps throttling
    [scrollingClassName, optimizeRendering]
  );

  // Debounced scroll end handler
  const handleScrollEnd = useMemo(
    () => debounce(() => {
      scrollingRef.current = false;
      document.documentElement.classList.remove(scrollingClassName);
      
      if (optimizeRendering) {
        document.body.style.pointerEvents = 'auto';
      }
    }, debounceTime),
    [scrollingClassName, optimizeRendering, debounceTime]
  );

  // Performance monitoring
  const measurePerformance = useCallback(() => {
    if (!enableMetrics) return;
    
    const now = performance.now();
    
    // Calculate FPS
    if (frameRef.current) {
      const deltaTime = now - frameRef.current;
      metricsRef.current.fps = Math.round(1000 / deltaTime);
    }
    frameRef.current = now;
    
    // Memory usage (if available)
    if ('memory' in performance && (performance as any).memory) {
      const memory = (performance as any).memory;
      metricsRef.current.memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
    }
    
    requestAnimationFrame(measurePerformance);
  }, [enableMetrics]);

  useEffect(() => {
    // Add scroll listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScrollEnd, { passive: true });
    
    if (enableMetrics) {
      measurePerformance();
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollEnd);
      handleScrollEnd.cancel();
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      // Cleanup styles
      document.documentElement.classList.remove(scrollingClassName);
      document.body.style.pointerEvents = 'auto';
    };
  }, [handleScroll, handleScrollEnd, scrollingClassName, enableMetrics, measurePerformance]);

  return useMemo(() => ({
    metrics: metricsRef.current,
    isScrolling: scrollingRef.current
  }), []);
};

/**
 * Add global CSS to optimize scrolling performance
 */
export const GlobalPerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Optimize initial page load
    const optimizePageLoad = () => {
      // Preload critical resources
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'style';
      preloadLink.href = '/fonts/inter.woff2';
      document.head.appendChild(preloadLink);
      
      // Enable hardware acceleration for the body
      document.body.style.transform = 'translateZ(0)';
      document.body.style.backfaceVisibility = 'hidden';
      
      // Optimize images
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.loading) {
          img.loading = 'lazy';
        }
        if (!img.decoding) {
          img.decoding = 'async';
        }
      });
    };

    // Intersection Observer for lazy loading enhancements
    const observeElements = () => {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const target = entry.target as HTMLElement;
                target.style.willChange = 'transform, opacity';
              } else {
                const target = entry.target as HTMLElement;
                target.style.willChange = 'auto';
              }
            });
          },
          {
            rootMargin: '50px 0px',
            threshold: 0.1
          }
        );

        // Observe all sections
        const sections = document.querySelectorAll('section, .section');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
      }
    };

    // Initialize optimizations
    if (document.readyState === 'complete') {
      optimizePageLoad();
    } else {
      window.addEventListener('load', optimizePageLoad);
    }
    
    const cleanup = observeElements();

    return () => {
      window.removeEventListener('load', optimizePageLoad);
      if (cleanup) cleanup();
      
      // Reset body styles
      document.body.style.transform = '';
      document.body.style.backfaceVisibility = '';
    };
  }, []);

  return null;
};

// Performance monitoring hook
export const usePerformanceMonitor = (enabled: boolean = false) => {
  const metricsRef = useRef<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    scrollPosition: 0,
    renderTime: 0
  });

  useEffect(() => {
    if (!enabled) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let frameId: number;

    const updateMetrics = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastTime >= 1000) {
        metricsRef.current.fps = Math.round((frameCount * 1000) / (now - lastTime));
        frameCount = 0;
        lastTime = now;
      }

      frameId = requestAnimationFrame(updateMetrics);
    };

    frameId = requestAnimationFrame(updateMetrics);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [enabled]);

  return metricsRef.current;
}; 