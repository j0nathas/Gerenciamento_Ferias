import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    watch: {
      usePolling: true,
      interval: 100, // verifica a cada 100ms
    },
    host: true,  // escuta em 0.0.0.0 (toda a rede)
    port: 5173
  },
})