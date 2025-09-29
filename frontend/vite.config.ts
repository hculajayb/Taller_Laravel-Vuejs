// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: {
    host: true,
    port: 5173,
    // ❗ Solo strings, NO RegExp
    allowedHosts: [
      'tenant1.midominio.com',
      'tenant2.midominio.com',
      // agrega más si los usas en dev:
      // 'tenant2.midominio.com',
      // 'admin.midominio.com',
    ],
    // 🚫 Nada de server.proxy para /api
  },
})
