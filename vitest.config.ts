import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['03-data-structures/01-arrays/practiceproblems/**/*.ts'],
    environment: 'node',
  },
});