// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
const isGitHubPages = !!process.env.GITHUB_PAGES;

export default defineConfig({
  site: 'https://pixeria.com',
  base: isGitHubPages ? '/pixeria.com' : '/',
  vite: {
    plugins: [tailwindcss()]
  }
});