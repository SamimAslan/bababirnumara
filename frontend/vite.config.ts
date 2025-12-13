import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['41acb037-34eb-4df8-b95b-6bc17b6ed11c.preview.emergentagent.com'],
  },
})
