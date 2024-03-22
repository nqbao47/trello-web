import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from '@svgr/rollup'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/trello-web/',
  // Cho phép sử dụng Vite sử dụng process.env
  define: {
    'process.env': process.env
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: '~', replacement: '/src' }]
  }
})
