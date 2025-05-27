/**
 * Scroll Utilities for Chat Interface
 * Performance monitoring and optimization functions for smooth scrolling
 */

/**
 * Throttle function for scroll events
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;

  return function executedFunction(...args: Parameters<T>) {
    const now = Date.now();

    if (!previous) previous = now;

    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(null, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(null, args);
      }, remaining);
    }
  };
}

/**
 * Debounce function for scroll end detection
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func.apply(null, args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if element is in viewport
 */
export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to element with custom easing
 */
export function smoothScrollToElement(
  container: HTMLElement,
  target: HTMLElement,
  duration: number = 300
): Promise<void> {
  return new Promise((resolve) => {
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const startScrollTop = container.scrollTop;
    const targetScrollTop = startScrollTop + targetRect.top - containerRect.top;
    const distance = targetScrollTop - startScrollTop;
    
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function (ease-out-cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      container.scrollTop = startScrollTop + distance * easedProgress;
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        resolve();
      }
    }
    
    requestAnimationFrame(animation);
  });
}

/**
 * Get scroll position information
 */
export interface ScrollInfo {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
  isAtTop: boolean;
  isAtBottom: boolean;
  isNearBottom: boolean;
  scrollPercentage: number;
}

export function getScrollInfo(element: HTMLElement, threshold: number = 100): ScrollInfo {
  const { scrollTop, scrollHeight, clientHeight } = element;
  const maxScroll = scrollHeight - clientHeight;
  
  return {
    scrollTop,
    scrollHeight,
    clientHeight,
    isAtTop: scrollTop <= threshold,
    isAtBottom: scrollTop >= maxScroll - threshold,
    isNearBottom: scrollHeight - scrollTop - clientHeight < threshold,
    scrollPercentage: maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0
  };
}

/**
 * Performance monitor for scroll events
 */
export class ScrollPerformanceMonitor {
  private metrics: {
    scrollEvents: number;
    lastScrollTime: number;
    avgScrollDelta: number;
    totalScrollDistance: number;
  } = {
    scrollEvents: 0,
    lastScrollTime: 0,
    avgScrollDelta: 0,
    totalScrollDistance: 0
  };

  recordScrollEvent(scrollTop: number): void {
    const now = performance.now();
    const deltaTime = now - this.metrics.lastScrollTime;
    
    if (this.metrics.lastScrollTime > 0) {
      this.metrics.avgScrollDelta = 
        (this.metrics.avgScrollDelta * this.metrics.scrollEvents + deltaTime) / 
        (this.metrics.scrollEvents + 1);
    }
    
    this.metrics.scrollEvents++;
    this.metrics.lastScrollTime = now;
    this.metrics.totalScrollDistance += Math.abs(scrollTop);
  }

  getMetrics() {
    return { ...this.metrics };
  }

  reset(): void {
    this.metrics = {
      scrollEvents: 0,
      lastScrollTime: 0,
      avgScrollDelta: 0,
      totalScrollDistance: 0
    };
  }
}

export default {
  throttle,
  debounce,
  isElementInViewport,
  smoothScrollToElement,
  getScrollInfo,
  ScrollPerformanceMonitor
}; 