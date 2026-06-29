import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: [
      "primepathstaff.com",
      "www.primepathstaff.com",
      "server.primepathstaff.com",
    ],
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: [
      "primepathstaff.com",
      "www.primepathstaff.com",
      "server.primepathstaff.com",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});