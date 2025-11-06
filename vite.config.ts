import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "127.0.0.1",
    port: 8080,
    strictPort: false,
  },
  plugins: [
    react({
      fastRefresh: false,
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    // Optimize for mobile performance
    target: 'es2015',
    // Use terser for minification to preserve constructor names (fixes Sanity client issue)
    // Terser has better support for preserving class/function names
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
      mangle: false, // Disable mangling to preserve constructor names (fixes Sanity client issue)
      format: {
        comments: false,
      },
    },
    // Enable code splitting for better mobile performance
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Sanity-related chunks - keep client and image-url together to avoid constructor issues
          if (id.includes('sanity') || id.includes('@sanity')) {
            // Keep @sanity/client and @sanity/image-url together to avoid constructor issues
            if (id.includes('@sanity/client') || id.includes('@sanity/image-url')) {
              return 'sanity-client';
            }
            // Studio and vision can be separate as they're rarely loaded
            if (id.includes('sanity.config') || id.includes('sanity.config.ts')) {
              return 'sanity-config';
            }
            if (id.includes('@sanity/vision') || id.includes('SanityVision')) {
              return 'sanity-vision';
            }
            // Other Sanity packages together
            return 'sanity-vendor';
          }
          
          // Video player (large dependency)
          if (id.includes('VideoPlayer') || id.includes('video') || id.includes('player')) {
            return 'video-vendor';
          }
          
          // React vendor chunks
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
          
          // UI vendor chunks (Radix UI components) - split further if needed
          if (id.includes('node_modules/@radix-ui')) {
            // Split large Radix UI packages if they get too big
            if (id.includes('@radix-ui/react-dialog') || id.includes('@radix-ui/react-dropdown-menu')) {
              return 'ui-dialog-vendor';
            }
            return 'ui-vendor';
          }
          
          // Query library
          if (id.includes('@tanstack/react-query') || id.includes('tanstack')) {
            return 'query-vendor';
          }
          
          // Lucide icons (can be large)
          if (id.includes('lucide-react')) {
            return 'icons-vendor';
          }
          
          // Markdown and form libraries
          if (id.includes('react-markdown') || id.includes('remark') || id.includes('rehype')) {
            return 'markdown-vendor';
          }
          
          if (id.includes('react-hook-form') || id.includes('@hookform')) {
            return 'form-vendor';
          }
          
          // Other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimize chunk size for mobile
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/img/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[ext]/[name]-[hash][extname]`;
        },
      },
    },
    // Optimize chunk size warnings - set to 600KB since we disabled mangling (names are preserved)
    // Manual chunking is already configured, so this is acceptable
    chunkSizeWarningLimit: 600,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Source maps for production debugging (optional, can disable for smaller builds)
    sourcemap: mode === 'development',
    // Optimize asset inlining threshold (smaller assets will be inlined)
    assetsInlineLimit: 4096,
  },
  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@sanity/client'],
  },
}));
