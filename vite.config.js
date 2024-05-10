import { defineConfig } from "vite";

export default defineConfig({
  define: {
    global: "window", // This makes `global` an alias for `window`
  },
});
