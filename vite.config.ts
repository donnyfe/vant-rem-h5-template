import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd())

  return {
    base: './',

    plugins: [
      vue(),
      UnoCSS(),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    resolve: {
      alias: {
        // 配置src目录
        '@': path.resolve(__dirname, 'src'),
        // 导入其他目录
        components: path.resolve(__dirname, 'src/components'),
      },
    },

    // 跨域代理
    server: {
      port: 8081,
      proxy: {
        '/api': {
          target: 'https://localhost:3000',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
          secure: false,
        },
      },
    },
  }
})
