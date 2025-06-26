import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://50f6-202-47-34-162.ngrok-free.app',
  //       changeOrigin: true,
  //       secure: true
  //     }
  //   }
  // }
})
