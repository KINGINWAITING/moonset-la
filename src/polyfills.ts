// Polyfills for web3 compatibility
import { Buffer } from 'buffer';

// Make Buffer available globally
if (typeof window !== 'undefined') {
  (window as any).global = window;
  (window as any).Buffer = Buffer;
  
  // Process polyfill
  if (!(window as any).process) {
    (window as any).process = {
      env: {},
      browser: true,
      version: 'v18.0.0',
      platform: 'browser',
      nextTick: (fn: Function) => setTimeout(fn, 0)
    };
  }
}

export {}; 