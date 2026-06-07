// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Served from the custom apex domain pixeria.com, so the site lives at the
// root path in every environment — no repo-name base prefix.
export default defineConfig({
  site: 'https://docs.pixeria.com',
  base: '/',
  vite: {
    plugins: [tailwindcss()]
  }
});