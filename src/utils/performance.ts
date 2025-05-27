/**
 * Performance monitoring utilities for the portfolio dashboard
 */

// Import React for hooks
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useInView as useFramerInView, useScroll, useTransform, motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

// Performance metrics interface
interface PerformanceMetrics {
  componentRenderTime: number;
  dataFetchTime: number;
  totalLoadTime: number;
  memoryUsage?: number;
}

// Portfolio Performance Monitor Class
class PortfolioPerformanceMonitor {
  private metrics: Map<string, PerformanceMetrics> = new Map();
  private observer: PerformanceObserver | null = null;

  constructor() {
    this.initializeObserver();
  }

  private initializeObserver() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        this.observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'measure') {
              console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
            }
          });
        });
        this.observer.observe({ entryTypes: ['measure', 'navigation'] });
      } catch (error) {
        console.warn('PerformanceObserver not supported:', error);
      }
    }
  }

  // Mark the start of a performance measurement
  markStart(name: string) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-start`);
    }
  }

  // Mark the end and measure performance
  markEnd(name: string) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-end`);
      window.performance.measure(name, `${name}-start`, `${name}-end`);
    }
  }

  // Get memory usage if available
  getMemoryUsage(): number | undefined {
    if (typeof window !== 'undefined' && 'memory' in window.performance) {
      const memory = (window.performance as any).memory;
      return memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
    }
    return undefined;
  }

  // Log performance metrics
  logMetrics(componentName: string, metrics: Partial<PerformanceMetrics>) {
    const existingMetrics = this.metrics.get(componentName) || {
      componentRenderTime: 0,
      dataFetchTime: 0,
      totalLoadTime: 0
    };

    const updatedMetrics = {
      ...existingMetrics,
      ...metrics,
      memoryUsage: this.getMemoryUsage()
    };

    this.metrics.set(componentName, updatedMetrics);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metrics for ${componentName}:`, updatedMetrics);
    }
  }

  // Get all metrics
  getAllMetrics(): Map<string, PerformanceMetrics> {
    return new Map(this.metrics);
  }

  // Clear metrics
  clearMetrics() {
    this.metrics.clear();
  }

  // Cleanup observer
  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Global performance monitor instance
export const performanceMonitor = new PortfolioPerformanceMonitor();

// React hook for performance monitoring
export const usePerformanceMonitor = (componentName: string) => {
  const startTime = React.useRef<number>(Date.now());

  React.useEffect(() => {
    performanceMonitor.markStart(`${componentName}-render`);
    
    return () => {
      performanceMonitor.markEnd(`${componentName}-render`);
      const endTime = Date.now();
      const renderTime = endTime - startTime.current;
      
      performanceMonitor.logMetrics(componentName, {
        componentRenderTime: renderTime,
        totalLoadTime: renderTime
      });
    };
  }, [componentName]);

  return {
    markStart: (operation: string) => performanceMonitor.markStart(`${componentName}-${operation}`),
    markEnd: (operation: string) => performanceMonitor.markEnd(`${componentName}-${operation}`),
    logMetrics: (metrics: Partial<PerformanceMetrics>) => 
      performanceMonitor.logMetrics(componentName, metrics)
  };
};

// Debounce utility for performance optimization
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for performance optimization
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy loading utility with error boundaries
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) {
  const LazyComponent = React.lazy(importFn);
  
  return function LazyWithSuspense(props: React.ComponentProps<T>) {
    const fallbackElement = fallback 
      ? React.createElement(fallback)
      : React.createElement('div', { className: 'min-h-32' });
      
    return React.createElement(
      React.Suspense,
      { fallback: fallbackElement },
      React.createElement(LazyComponent, props)
    );
  };
}

// Memory cleanup utility
export const useMemoryCleanup = (dependencies: any[] = []) => {
  React.useEffect(() => {
    return () => {
      // Force garbage collection if available (development only)
      if (process.env.NODE_ENV === 'development' && window.gc) {
        window.gc();
      }
    };
  }, dependencies);
};

// Virtual scrolling utility for large lists
export const useVirtualScrolling = (
  items: any[],
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(visibleStart, visibleEnd);
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;
  
  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop
  };
};

// Optimized intersection observer hook
export function useOptimizedInView(options?: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Don't create observer if already triggered once
    if (options?.triggerOnce && isInView) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        
        // Disconnect after first trigger if triggerOnce is true
        if (entry.isIntersecting && options?.triggerOnce) {
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? '50px',
      }
    );

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isInView, options?.threshold, options?.rootMargin, options?.triggerOnce]);

  return { ref, isInView };
}

// Performance-aware animation configuration
export function useAnimationConfig() {
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const isLowPowerMode = useMemo(() => {
    // Detect low power mode or slow device
    const connection = (navigator as any).connection;
    const isSlowConnection = connection && (
      connection.effectiveType === 'slow-2g' || 
      connection.effectiveType === '2g' ||
      connection.saveData
    );
    
    const isSlowDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    
    return isSlowConnection || isSlowDevice;
  }, []);

  return {
    prefersReducedMotion,
    isLowPowerMode,
    shouldReduceAnimations: prefersReducedMotion || isLowPowerMode,
    getParticleCount: (base: number) => {
      if (prefersReducedMotion) return 0;
      if (isLowPowerMode) return Math.floor(base * 0.3);
      return base;
    },
    getAnimationDuration: (base: number) => {
      if (prefersReducedMotion) return 0.3;
      if (isLowPowerMode) return base * 0.7;
      return base;
    }
  };
}

// Debounced scroll handler
export function useDebounced<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  return useMemo(() => {
    return ((...args: Parameters<T>) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    }) as T;
  }, [callback, delay]);
}

// Animation frame optimization
export function useAnimationFrame(callback: () => void, deps: any[]) {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      // Only update if enough time has passed (targeting 30fps for heavy animations)
      if (deltaTime >= 33) {
        callback();
        previousTimeRef.current = time;
      }
    } else {
      previousTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, deps);
}

// Viewport-based animation culling
export function useViewportCulling(elementRef: React.RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px' } // Start animating slightly before visible
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef]);
  
  return isVisible;
}

// Memory-efficient particle generator
export function generateParticles(count: number, bounds: { width: number; height: number }) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * bounds.width,
    y: Math.random() * bounds.height,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.8 + 0.2,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));
}

// Hook version for use in components
export function useGenerateParticles(count: number, bounds: { width: number; height: number }) {
  return useMemo(() => {
    return generateParticles(count, bounds);
  }, [count, bounds.width, bounds.height]);
}

// Component loading states
export const LoadingFallback = ({ className = "" }: { className?: string }) => 
  React.createElement('div', {
    className: `animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 ${className}`
  });

// Section Transition Utilities
export function useSectionTransition(sectionId: string) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useFramerInView(sectionRef, { 
    once: true, 
    amount: 0.1
  });

  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  return {
    ref: sectionRef,
    isInView,
    prefersReducedMotion
  };
}

// Staggered animation variants for smooth section transitions
export const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: custom * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }),
  exit: {
    opacity: 0,
    y: -50,
    scale: 1.05,
    transition: {
      duration: 0.5
    }
  }
};

// Smooth scroll transition between sections
export function useScrollTransition() {
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0.98]);
  
  return { opacity, scale };
}

// Create floating section separators
export const SectionSeparator = ({ 
  variant = "gradient",
  height = "h-px",
  className = "" 
}: { 
  variant?: "gradient" | "glow" | "dots";
  height?: string;
  className?: string;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const separatorRef = useRef<HTMLDivElement>(null);
  const isInView = useFramerInView(separatorRef, { once: true });

  if (variant === "gradient") {
    return React.createElement(
      motion.div,
      {
        ref: separatorRef,
        initial: { scaleX: 0, opacity: 0 },
        animate: isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 },
        transition: { duration: 1.2, ease: "easeOut" },
        className: `${height} ${className} relative overflow-hidden`,
        style: { originX: 0 }
      },
      React.createElement('div', {
        className: `absolute inset-0 ${
          isDark 
            ? "bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" 
            : "bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
        }`
      }),
      React.createElement(motion.div, {
        className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent",
        animate: { x: ['-100%', '200%'] },
        transition: { 
          duration: 3, 
          repeat: Infinity, 
          repeatDelay: 5,
          ease: "easeInOut"
        }
      })
    );
  }

  if (variant === "glow") {
    return React.createElement(
      motion.div,
      {
        ref: separatorRef,
        initial: { opacity: 0, scale: 0.8 },
        animate: isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 },
        transition: { duration: 1.5 },
        className: `${className} flex justify-center py-8`
      },
      React.createElement(
        motion.div,
        {
          className: `w-32 h-8 rounded-full ${
            isDark ? "bg-purple-500/20" : "bg-blue-500/10"
          } relative overflow-hidden`,
          animate: {
            boxShadow: [
              `0 0 20px ${isDark ? '#8B5CF6' : '#3B82F6'}40`,
              `0 0 40px ${isDark ? '#8B5CF6' : '#3B82F6'}60`,
              `0 0 20px ${isDark ? '#8B5CF6' : '#3B82F6'}40`
            ]
          },
          transition: { duration: 2, repeat: Infinity }
        },
        React.createElement(motion.div, {
          className: `absolute inset-0 ${
            isDark 
              ? "bg-gradient-to-r from-purple-400/50 to-blue-400/50" 
              : "bg-gradient-to-r from-blue-500/50 to-purple-500/50"
          } rounded-full`,
          animate: { x: ['-100%', '100%'] },
          transition: { duration: 2, repeat: Infinity, repeatDelay: 1 }
        })
      )
    );
  }

  if (variant === "dots") {
    return React.createElement(
      motion.div,
      {
        ref: separatorRef,
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : { opacity: 0 },
        transition: { duration: 1 },
        className: `${className} flex justify-center items-center py-8 space-x-2`
      },
      ...[...Array(5)].map((_, i) => 
        React.createElement(motion.div, {
          key: i,
          className: `w-2 h-2 rounded-full ${
            isDark ? "bg-purple-400/60" : "bg-blue-500/60"
          }`,
          animate: {
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6]
          },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2
          }
        })
      )
    );
  }

  return React.createElement('div', { className: `${height} ${className}` });
};

export default {
  createLazyComponent,
  useOptimizedInView,
  useAnimationConfig,
  useDebounced,
  useAnimationFrame,
  useViewportCulling,
  generateParticles,
  LoadingFallback,
  usePerformanceMonitor,
  useSectionTransition,
  sectionVariants,
  useScrollTransition,
  SectionSeparator
}; 