import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // 关键：相对路径，打包后图片正常加载
  plugins: [react()]
})