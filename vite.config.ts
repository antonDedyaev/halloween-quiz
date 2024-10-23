import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from "vite-svg-loader"
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    svgLoader({
      svgoConfig: {
        multipass: true,
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({})
      ],
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@import "@/assets/mixins.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
