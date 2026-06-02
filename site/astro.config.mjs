// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://csilvasantin.github.io',
  base: '/pixeria.com',
  vite: {
    plugins: [tailwindcss()]
  }
});