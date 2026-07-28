import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://redfire29.github.io',
  base: '/curva-umi-support',
  integrations: [
    svelte(),
    sitemap()
  ],
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'zh'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  }
});
