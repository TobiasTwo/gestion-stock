import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['web.masmzi.icu'],
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      '/api': {
        target: 'https://apiserver-bsdfh4gmduh8bsep.francecentral-01.azurewebsites.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/v1'),
        cookieDomainRewrite: '',
        secure: false,
        headers: {
          'Connection': 'keep-alive'
        }
      }
    }
  },
})
