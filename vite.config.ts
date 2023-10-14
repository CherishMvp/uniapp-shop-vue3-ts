import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // 开发阶段启用源码映射：https://uniapp.dcloud.net.cn/tutorial/migration-to-vue3.html#需主动开启-sourcemap
    sourcemap: process.env.NODE_ENV === 'development',
  },
  resolve: {
    alias: {
      'core-js/library/fn/get-iterator': 'core-js/features/get-iterator',
    },
  },
  plugins: [uni()],
  esbuild: {
    drop: process.env.NODE_ENV !== 'development' ? ['console', 'debugger'] : [],
  },
})
