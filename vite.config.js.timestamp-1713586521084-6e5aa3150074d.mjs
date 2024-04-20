// vite.config.js
import { defineConfig } from 'file:///D:/Vite%20Project/trello-web/node_modules/vite/dist/node/index.js'
import react from 'file:///D:/Vite%20Project/trello-web/node_modules/@vitejs/plugin-react-swc/index.mjs'
import svgr from 'file:///D:/Vite%20Project/trello-web/node_modules/@svgr/rollup/dist/index.js'
var vite_config_default = defineConfig({
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
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxWaXRlIFByb2plY3RcXFxcdHJlbGxvLXdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcVml0ZSBQcm9qZWN0XFxcXHRyZWxsby13ZWJcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1ZpdGUlMjBQcm9qZWN0L3RyZWxsby13ZWIvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xyXG5pbXBvcnQgc3ZnciBmcm9tICdAc3Znci9yb2xsdXAnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIC8vIGJhc2U6ICcvdHJlbGxvLXdlYi8nLFxyXG4gIC8vIENobyBwaFx1MDBFOXAgc1x1MUVFRCBkXHUxRUU1bmcgVml0ZSBzXHUxRUVEIGRcdTFFRTVuZyBwcm9jZXNzLmVudlxyXG4gIGRlZmluZToge1xyXG4gICAgJ3Byb2Nlc3MuZW52JzogcHJvY2Vzcy5lbnZcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBzdmdyKCldLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiBbeyBmaW5kOiAnficsIHJlcGxhY2VtZW50OiAnL3NyYycgfV1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1EsU0FBUyxvQkFBb0I7QUFDclMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUdqQixJQUFPLHNCQUFRLGFBQWE7QUFBQTtBQUFBO0FBQUEsRUFHMUIsUUFBUTtBQUFBLElBQ04sZUFBZSxRQUFRO0FBQUEsRUFDekI7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQUEsRUFDekIsU0FBUztBQUFBLElBQ1AsT0FBTyxDQUFDLEVBQUUsTUFBTSxLQUFLLGFBQWEsT0FBTyxDQUFDO0FBQUEsRUFDNUM7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
