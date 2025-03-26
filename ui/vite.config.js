import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      host: '127.0.0.1',
      port: 3001,
    },
    define: {
      '__VITE_BACKEND_URL__': JSON.stringify(env.VITE_BACKEND_URL || 'http://localhost:3000'),
    },
  };
});
