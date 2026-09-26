import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";
import { seoAssets } from "./build/seo-assets.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [seoAssets(), react(), cloudflare()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
  },
})