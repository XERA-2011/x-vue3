import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssPxtorem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
        postcssPxtorem({
          rootValue: 75, // 1rem 的值，相当于设计稿的宽度 / 10，假设设计稿是 750px 宽，rootValue 设置为 75
          unitPrecision: 5, // rem 小数点后保留的位数
          propList: ['*'], // 需要转换的属性，* 表示所有属性都转换
          selectorBlackList: [], // 不转换的选择器，类名中包含这些字符串的不会转换
          replace: true, // 替换而不是添加 fallback
          mediaQuery: false, // 允许在媒体查询中转换 px
          minPixelValue: 2 // 最小的 px 转换阈值，小于这个值的不会被转换
        })
      ]
    }
  }
})
