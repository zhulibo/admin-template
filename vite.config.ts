import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import pkg from "./package.json"

const __APP_INFO__ = {
  version: pkg.version,
  lastBuildTime: new Date().getTime()
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader()
  ],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__)
  }
})
