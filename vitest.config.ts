import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./client/src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json"],
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
      include: ["client/src/**/*.{ts,tsx}", "server/**/*.ts"],
      exclude: [
        "**/*.test.{ts,tsx}",
        "**/*.config.{ts,js}",
        "**/node_modules/**",
        "**/dist/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
