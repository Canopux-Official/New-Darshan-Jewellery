import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Avoid EBUSY crashes when Nest/OneDrive locks files under backend/
      ignored: ['**/backend/**', '**/node_modules/**'],
    },
  },
})
