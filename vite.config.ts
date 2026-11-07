import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Served from GitHub Pages at https://kneuroth.github.io/kneuroth-ui/, so every
// asset — and the registry JSON under /r/ — lives below that base.
export default defineConfig({
  base: '/kneuroth-ui/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@registry': path.resolve(import.meta.dirname, 'registry/kneuroth'),
    },
  },
});
