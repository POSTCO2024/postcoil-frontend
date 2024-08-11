import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      onwarn(warning) {
        console.warn(warning);
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@postcoil/ui': path.resolve(__dirname, '../../packages/common-ui/dist'),
    },
  },
  optimizeDeps: {
    include: ['@postcoil/ui'],
  },
  logLevel: 'info',
});
