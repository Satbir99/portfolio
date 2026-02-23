import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) return "react-vendor";
          if (id.includes("node_modules/react-router")) return "router";
          if (id.includes("node_modules/framer-motion")) return "framer-motion";
          if (id.includes("node_modules/three") || id.includes("node_modules/@react-three")) return "three";
          if (id.includes("node_modules/maath")) return "three";
          if (id.includes("node_modules/lenis")) return "lenis";
          if (id.includes("node_modules/@emailjs")) return "emailjs";
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 600,
  },
});
