import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  // --- FIX NETWORK CONNECTION LOST ---
  server: {
    watch: {
      usePolling: true, // Windows butuh polling biar gak putus
      interval: 300,
    },
    hmr: {
      overlay: false, // jangan tutup layar tiap error kecil
    },
  },
  ssr: {
    // jangan di-external, biar TipTap gak rebuild terus di worker
    noExternal: [
      "@tiptap/react",
      "@tiptap/starter-kit",
      "@tiptap/extension-placeholder",
      "@tiptap/extension-underline",
    ],
  },
  optimizeDeps: {
    include: ["@tiptap/react", "@tiptap/pm"],
  },
  clearScreen: false,
});