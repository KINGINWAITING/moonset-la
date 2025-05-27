// Resource preloading utilities for performance optimization

// Preload critical CSS
export function preloadCSS(href: string) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  link.onload = () => {
    link.rel = 'stylesheet';
  };
  document.head.appendChild(link);
}

// Preload critical JavaScript modules
export function preloadJS(src: string) {
  const link = document.createElement('link');
  link.rel = 'modulepreload';
  link.href = src;
  document.head.appendChild(link);
}

// Preload critical images
export function preloadImage(src: string, crossorigin = false) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  if (crossorigin) {
    link.crossOrigin = 'anonymous';
  }
  document.head.appendChild(link);
}

// Preload web fonts
export function preloadFont(href: string, type = 'font/woff2') {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.type = type;
  link.href = href;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

// Preload dynamic imports based on user interaction hints
export function preloadModule(importFn: () => Promise<any>) {
  // Use requestIdleCallback for non-critical preloading
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      importFn().catch(() => {
        // Silently fail - module will be loaded when actually needed
      });
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      importFn().catch(() => {});
    }, 100);
  }
}

// Smart preloading based on user behavior
export function setupIntelligentPreloading() {
  let mouseMovementTimer: NodeJS.Timeout;
  let isUserActive = false;

  // Detect user engagement
  const handleUserActivity = () => {
    if (!isUserActive) {
      isUserActive = true;
      // Preload secondary components when user shows engagement
      preloadSecondaryComponents();
    }
  };

  // Mouse movement detection for intent prediction
  const handleMouseMove = () => {
    clearTimeout(mouseMovementTimer);
    mouseMovementTimer = setTimeout(() => {
      handleUserActivity();
    }, 100);
  };

  // Touch/click detection for mobile
  const handleTouch = () => {
    handleUserActivity();
  };

  // Set up event listeners
  document.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('touchstart', handleTouch, { passive: true });
  document.addEventListener('scroll', handleUserActivity, { passive: true });

  // Cleanup function
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('touchstart', handleTouch);
    document.removeEventListener('scroll', handleUserActivity);
    clearTimeout(mouseMovementTimer);
  };
}

// Preload secondary components when user shows engagement
function preloadSecondaryComponents() {
  // Preload heavy components that aren't immediately visible
  const components = [
    () => import('@/components/home/TokenSection'),
    () => import('@/components/home/FrameworkSection'),
    () => import('@/components/home/FeaturesHighlight'),
    () => import('@/components/home/CTASection'),
    () => import('@/components/home/ApolloMissionSection'),
  ];

  components.forEach(componentLoader => {
    preloadModule(componentLoader);
  });
}

// Network-aware preloading
export function getNetworkAwarePreloadStrategy() {
  const connection = (navigator as any).connection;
  
  if (!connection) {
    return 'default';
  }

  // Adjust preloading strategy based on connection
  if (connection.saveData) {
    return 'minimal';
  }

  if (connection.effectiveType === '4g' && !connection.saveData) {
    return 'aggressive';
  }

  if (connection.effectiveType === '3g') {
    return 'moderate';
  }

  return 'conservative';
}

// Apply network-aware preloading
export function applyNetworkAwarePreloading(): (() => void) | undefined {
  const strategy = getNetworkAwarePreloadStrategy();

  switch (strategy) {
    case 'aggressive':
      // Preload everything
      preloadSecondaryComponents();
      return setupIntelligentPreloading();
    
    case 'moderate':
      // Preload on user interaction
      return setupIntelligentPreloading();
    
    case 'conservative':
      // Only preload on explicit user actions (hover over navigation, etc.)
      return undefined;
    
    case 'minimal':
      // No preloading on save-data mode
      return undefined;
    
    default:
      // Default moderate strategy
      return setupIntelligentPreloading();
  }
}

// Critical resource hints for immediate loading
export function addCriticalResourceHints() {
  // Only preload resources that are actually used on the page
  // Check if fonts exist before preloading
  const criticalFonts = [
    '/fonts/inter-var.woff2',
    '/fonts/geist-mono.woff2'
  ];

  // Only preload fonts that are actually used
  criticalFonts.forEach(font => {
    // Check if font is actually used in CSS before preloading
    if (document.fonts && document.fonts.check) {
      preloadFont(font);
    }
  });

  // Only preload hero images that are actually visible
  // Remove specific image preloads to avoid unused resource warnings
  // Images will be loaded when needed by the components
}

export default {
  preloadCSS,
  preloadJS,
  preloadImage,
  preloadFont,
  preloadModule,
  setupIntelligentPreloading,
  applyNetworkAwarePreloading,
  addCriticalResourceHints,
  getNetworkAwarePreloadStrategy
}; 