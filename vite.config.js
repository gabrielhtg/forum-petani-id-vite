import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import * as fs from "node:fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   host: '0.0.0.0', // Mengizinkan akses dari jaringan lokal
  //   https: {
  //     key: fs.readFileSync('./localhost-key.pem'),
  //     cert: fs.readFileSync('./localhost-cert.pem'),
  //   },
  // },
});
