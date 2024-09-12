import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: true,
    port: 6050,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      onwarn(warning) {
        console.warn(warning);
      },
    },
    commonjsOptions: {
      include: [/node_modules/], // CommonJS 모듈 포함
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@postcoil/ui': path.resolve(__dirname, '../../packages/common-ui'),
    },
  },
  optimizeDeps: {
    include: ['three'],
    exclude: ['@postcoil/ui'],
  },
  logLevel: 'info',
});
