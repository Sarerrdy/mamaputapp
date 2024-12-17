import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { "/upload": "http://localhost:3000" },
    host: "0.0.0.0", // Ensure Vite binds to 0.0.0.0
    port: process.env.PORT || 5173, // Use the environment variable PORT if available
  },
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: { proxy: { '/upload': 'http://localhost:3000' } }
// })
