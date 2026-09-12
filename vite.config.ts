import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/jiajia-global-health/',
  plugins: [react()],
});
