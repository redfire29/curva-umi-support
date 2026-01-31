import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';

// https://astro.build/config
export default defineConfig({
  site: 'https://redfire29.github.io',
  base: '/curva-umi-support',
  integrations: [
    svelte(),
    tailwind(),
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
    plugins: [yaml()]
  }
});
