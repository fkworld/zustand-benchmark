import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  // github pages need
  base: '/zustand-benchmark/',
  plugins: [react()],
  server: {
    open: true,
    host: true,
    port: 2077,
  },
  build: {
    outDir: 'docs',
    assetsDir: '.',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-zustand': ['zustand'],
          'vendor-jotai': ['jotai'],
          'vendor-recoil': ['recoil'],
        },
      },
    },
  },
})
