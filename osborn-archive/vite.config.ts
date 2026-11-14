import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ plugins: [react(), tailwindcss()], server: { proxy: { "/api": { target: "http://115.159.121.83:8001", changeOrigin: true, rewrite: path => path.replace(/^\/api/, "") } } } });

