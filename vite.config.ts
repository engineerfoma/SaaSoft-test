import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
      '@/app': resolve(__dirname, './app'),
      '@/shared': resolve(__dirname, './shared'),
      '@/entities': resolve(__dirname, './entities'),
      '@/features': resolve(__dirname, './features'),
      '@/widgets': resolve(__dirname, './widgets'),
      '@/pages': resolve(__dirname, './pages'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/shared/styles/css-variables.css";`
      }
    }
  }
})
