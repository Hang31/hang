// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import path from 'path'

// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src')
//     }
//   },
//   server: {
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8000',
//         changeOrigin: true
//       },
//       '/uploads': {
//         target: 'http://localhost:8000',
//         changeOrigin: true
//       }
//     }
//   }
// })
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173, // 保持前端开发服务器端口
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // 后端服务器地址
        changeOrigin: true, // 改变源
        secure: false, // 如果使用 http://localhost 和 https://localhost 混合，设置为 false
      },
      '/uploads': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
})