import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/radio': {
        target: 'https://uk16freenew.listen2myradio.com',
        changeOrigin: true,
        rewrite: (path) => '/live.mp3?typeportmount=s1_33828_stream_518870635',
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Origin', 'https://listen2myradio.com');
          });
        }
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
