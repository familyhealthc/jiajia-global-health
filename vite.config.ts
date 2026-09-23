import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/jiajia-global-health/',
  plugins: [react()],
  build: { rollupOptions: { input: { main: resolve(__dirname, 'index.html'), economy: resolve(__dirname, 'economy/index.html') } } },
});
