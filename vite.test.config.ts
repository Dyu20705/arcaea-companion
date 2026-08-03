import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    ssr: "src/test/interaction-components.test.tsx",
    outDir: ".test-dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "interaction-components.test.mjs",
      },
    },
  },
});
