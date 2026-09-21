import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    exclude: ['e2e/**', 'node_modules/**', '**/node_modules/**', '.next/**', 'rag-upgrade/**', 'rag-design/**', 'dist/**'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
  },
})
