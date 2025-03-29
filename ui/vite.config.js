import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  // No need for manual 'define' if using VITE_* variables
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        QRCodeHandle: resolve(__dirname, 'src/QRCodeHandle.js'),
        dashboard: resolve(__dirname, 'src/dashboard.js')
      }
    }
  },
  publicDir: 'public',
  base: '/',
  server: {
    port: 5173
  }
});