import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools()],
  server: {
    host: 'localhost', // 可选：指定开发服务器的主机名
    port: 3000, // 可选：指定开发服务器端口
    proxy: {
      '/githubUser': {
        target: 'https://api.github.com/', // 目标服务器地址
        changeOrigin: true, // 是否更改源头（必要，用于支持虚拟主机）
        rewrite: (path) => path.replace(/^\/githubUser/, '/user'), // 可选：重写请求路径
      },
      '/login/oauth/access_token': {
        target: 'https://github.com/', // 目标服务器地址
        changeOrigin: true, // 是否更改源头（必要，用于支持虚拟主机）
        // rewrite: (path) => path.replace(/^\/githubUser/, '/user'), // 可选：重写请求路径
      },
      // https://github.com/login/oauth/access_token
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
