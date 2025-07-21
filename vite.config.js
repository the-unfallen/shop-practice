import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
  },
  server: {
    watch: {
      usePolling: true, // helpful if HMR doesn't work on some file systems
    },
    hmr: true, // ensure HMR is enabled
  },
})
