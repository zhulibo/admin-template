import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import svgLoader from 'vite-svg-loader'
import viteCompression from 'vite-plugin-compression';
import { visualizer } from "rollup-plugin-visualizer"

const __APP_INFO__ = {
  lastBuildTime: new Date().getTime()
}

// https://vitejs.dev/config/
export default defineConfig({
  // base: './',
  server: {
    host: '0.0.0.0',
    port: 2000,
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
  plugins: [
    vue(),
    svgLoader(),
    viteCompression({
      threshold: 10240, // 大于10k才压缩
    }),
    // visualizer({
    //   filename: 'dist/stats.html'
    // })
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 取node_modules下的第一级文件夹名作为chunk的name
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    },
  },
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__)
  }
})
