import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false // Disable error overlay to prevent potential conflicts
    },
    // Enable HTTP/2 for development
    https: false,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Fixed polyfills for better web3 compatibility
      "buffer": "buffer",
      "process": "process/browser.js",
      "util": "util",
      "stream": "stream-browserify",
      "crypto": "crypto-browserify",
    },
  },
  define: {
    // Enhanced polyfills for global, process, and Buffer to work with web3 libraries
    global: 'globalThis',
    'process.env': {},
    // Add Buffer global for Uniswap widget compatibility
    'process.browser': true,
    'process.version': JSON.stringify('v18.0.0'),
  },
  // Performance optimizations and build configuration
  build: {
    // Enable source maps for production debugging
    sourcemap: mode === 'development',
    // Add target for better compatibility
    target: 'es2020',
    // CommonJS options for better module compatibility
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    // Optimize chunk splitting for better caching
    rollupOptions: {
      // Optimize build to avoid timeouts and memory issues
      maxParallelFileOps: 2, // Slightly increased for better build performance
      cache: true, // Enable cache for faster rebuilds
      treeshake: {
        moduleSideEffects: false, // Aggressive tree shaking
        propertyReadSideEffects: false // Further optimize tree shaking
      },
      output: {
        // Improved chunk splitting strategy
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Web3 and blockchain dependencies in a single chunk
            if (id.includes('wagmi') || 
                id.includes('viem') ||
                id.includes('@walletconnect') || 
                id.includes('@tanstack/react-query') ||
                id.includes('@uniswap') ||
                id.includes('buffer') ||
                id.includes('process')) {
              return 'vendor-blockchain';
            }
            
            // Core React and related libraries
            if (id.includes('react') || 
                id.includes('scheduler') || 
                id.includes('use-sync-external-store')) {
              return 'vendor-react';
            }

            // UI Components and animations
            if (id.includes('@radix-ui') || 
                id.includes('framer-motion') ||
                id.includes('recharts') ||
                id.includes('lucide-react')) {
              return 'vendor-ui';
            }

            // State management
            if (id.includes('redux') || 
                id.includes('recoil') || 
                id.includes('jotai') || 
                id.includes('zustand')) {
              return 'vendor-state';
            }

            // Utilities and helpers
            if (id.includes('lodash') || 
                id.includes('ramda') || 
                id.includes('date-fns') ||
                id.includes('axios') ||
                id.includes('query-string')) {
              return 'vendor-utils';
            }

            // All other dependencies
            return 'vendor';
          }
          
          // Application code splitting
          if (id.includes('src/')) {
            if (id.includes('/components/')) {
              // Split UI components by category
              if (id.includes('/components/shared/')) return 'app-shared';
              if (id.includes('/components/layout/')) return 'app-layout';
              return 'app-components';
            }
            if (id.includes('/pages/')) return 'app-pages';
            if (id.includes('/features/')) return 'app-features';
            if (id.includes('/hooks/')) return 'app-hooks';
            if (id.includes('/utils/')) return 'app-utils';
            return 'app';
          }
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 4000,
    // Enable minification
    minify: mode !== 'development' ? 'terser' : false,
    cssMinify: mode !== 'development',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: true,
        pure_funcs: mode === 'production' ? ['console.log', 'console.debug'] : [],
      },
    },
  },
  // Optimize dependency bundling
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
        Buffer: 'Buffer'
      },
      target: 'es2020',
      supported: {
        bigint: true
      },
    },
    include: [
      // Core dependencies
      'react',
      'react-dom',
      'react/jsx-runtime',
      
      // Essential polyfills for web3 compatibility
      'buffer',
      'util',
      
      // UI and animation
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      
      // Web3 and blockchain (Wagmi v2)
      'wagmi',
      'viem',
      '@tanstack/react-query',
      '@walletconnect/modal',
      
      // State management and utilities
      'zustand',
      'axios'
    ],
    exclude: [
      // Exclude large components that should be loaded on demand
      '@/components/home/LazyComponents'
    ]
  },
  // Reduce the size of the dependency graph
  ssr: {
    noExternal: []
  },
  // CSS code splitting
  css: {
    devSourcemap: true,
    modules: {
      generateScopedName: mode === 'production' 
        ? '[hash:base64:5]' 
        : '[local]__[hash:base64:5]'
    }
  }
}));
