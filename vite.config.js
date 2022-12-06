import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: true,
    port: 2077,
  },
  build: {
    assetsDir: '.',
  },
})
