import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Yalnız saf TS util-lərin unit testləri (RN komponentləri yox). Aliaslar tsconfig.json ilə eyni
const dir = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@shared": dir("./src/shared"),
      "@typings": dir("./types"),
    },
  },
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
