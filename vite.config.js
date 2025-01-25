import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})




// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import basicSsl from '@vitejs/plugin-basic-ssl';

// export default defineConfig({
//   plugins: [react(), basicSsl()],
//   server: {
//     https: true,
//     proxy: {
//       '/radio': {
//         target: 'https://uk16freenew.listen2myradio.com/live.mp3?typeportmount=s1_33828_stream_518870635/',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/radio/, ''),
//         // configure: (proxy) => {
//         //   proxy.on('proxyRes', (proxyRes) => {
//         //     proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//         //   });
//       },
//     },
//   },
// });
