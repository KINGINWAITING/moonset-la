
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
    }
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: mode === 'development', // Only generate sourcemaps in development
    chunkSizeWarningLimit: 3000, // Further increase chunk size warning limit
    minify: mode !== 'development', // Disable minification in development to save memory
    cssMinify: mode !== 'development', // Disable CSS minification in development
    rollupOptions: {
      // Optimize build to avoid timeouts and memory issues
      maxParallelFileOps: 1, // Reduce parallel operations to save memory
      cache: false, // Disable cache to reduce memory footprint
      treeshake: {
        moduleSideEffects: false, // More aggressive tree shaking
      },
      output: {
        manualChunks: (id) => {
          // Create separate chunks for large dependencies
          if (id.includes('node_modules')) {
            if (id.includes('@uniswap')) return 'vendor-uniswap';
            if (id.includes('ethers')) return 'vendor-ethers';
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('@web3-react')) return 'vendor-web3';
            if (id.includes('walletconnect')) return 'vendor-walletconnect';
            if (id.includes('recharts')) return 'vendor-recharts';
            return 'vendor'; // other dependencies
          }
          // Split large content files to avoid memory issues
          if (id.includes('Whitepaper.tsx')) return 'content-whitepaper';
          if (id.includes('moonset-token')) return 'content-moonset';
        }
      }
    },
    // Force Vite to use ESBuild's minification which uses less memory
    minifyInternalExports: false
  },
  define: {
    // Polyfill for global, process, and Buffer to work with web3 libraries
    global: 'globalThis',
    'process.env': {},
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      target: 'es2020',
      supported: {
        bigint: true
      },
    },
    exclude: ['@uniswap/widgets'] // Don't pre-bundle Uniswap widgets, defer to runtime
  },
  // Reduce the size of the dependency graph
  ssr: {
    noExternal: ['@uniswap/widgets']
  }
}));
