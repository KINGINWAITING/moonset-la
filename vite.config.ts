
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
    chunkSizeWarningLimit: 2000, // Increase chunk size warning limit
    rollupOptions: {
      // Optimize build to avoid timeouts and memory issues
      maxParallelFileOps: 1, // Reduce parallel operations to save memory
      cache: false,
      output: {
        manualChunks: (id) => {
          // Create separate chunks for large dependencies
          if (id.includes('node_modules')) {
            if (id.includes('@uniswap')) return 'vendor-uniswap';
            if (id.includes('ethers')) return 'vendor-ethers';
            if (id.includes('react')) return 'vendor-react';
            return 'vendor'; // other dependencies
          }
          // Split large content files to avoid memory issues
          if (id.includes('Whitepaper.tsx')) return 'content-whitepaper';
        }
      }
    }
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
      target: 'es2020'
    }
  }
}));
