import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/hoswoo-website/",
  plugins: [react()],
  optimizeDeps: {
    include: ["react-bootstrap"],
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@src": "/src",
      "@redux": "/src/redux",
      "@pages": "/src/pages",
    },
  },
  publicDir: "public",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    copyPublicDir: true,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Ensure .nojekyll file is copied as-is
          if (assetInfo.name === '.nojekyll') {
            return '.nojekyll';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
});
