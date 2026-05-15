import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Only use the base path on GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/About-India/' : '/',
  server: {
    port: 5173,
    strictPort: true,
  },
});
