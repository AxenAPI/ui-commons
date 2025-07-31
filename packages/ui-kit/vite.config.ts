import react from '@vitejs/plugin-react';

import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import i18nextLoader from 'vite-plugin-i18next-loader';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: [path.resolve(__dirname, 'src/index.ts'), path.resolve(__dirname, 'src/rhf.ts')],
    },
    minify: 'esbuild',
    rollupOptions: {
      external: ['react', 'react-dom', 'react-hook-form'],
    },
  },
  plugins: [
    react(),
    i18nextLoader({
      namespaceResolution: 'relativePath',
      paths: [path.resolve(__dirname, 'locales')],
    }),
    dts({
      exclude: ['**/_stories'],
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  esbuild: {
    minifyIdentifiers: false,
    keepNames: true,
  },
});
