import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    testTimeout: 60000,
    coverage: {
      provider: 'v8',
      // loc:report reads coverage-final.json to see which files unit tests load.
      include: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx,mjs}', 'scripts/lib/**/*.mjs', 'middleware.ts'],
      reporter: ['text-summary', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/', '**/*.test.{ts,tsx}', '**/__tests__/**', '**/*.d.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
