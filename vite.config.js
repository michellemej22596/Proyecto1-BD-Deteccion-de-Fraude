import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@views': '/src/views',
      '@components': '/src/components',
      '@assets': '/src/assets',
      '@lib': '/src/lib',
    }
  }
})