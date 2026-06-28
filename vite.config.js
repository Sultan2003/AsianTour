import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      i18next: "/src/vendor/i18n-shim/i18next.js",
      "react-i18next": "/src/vendor/i18n-shim/react-i18next.jsx",
      "i18next-browser-languagedetector": "/src/vendor/i18n-shim/languageDetector.js",
    },
  },
});
