// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',  // Adjust the port if Flask is running on a different port
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },  
})
