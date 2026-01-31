<template lang="pug">
header(
  class="fixed left-0 right-0 top-0 backdrop-blur-sm border-b transition-colors duration-300 flex items-center justify-between px-[20px] py-[10px] z-40",
  :class="[ isScrolled ? 'bg-deep-sea/90 border-pearl-white/20' : 'bg-white/90 border-gray-200' ]"
)
  div
    a(
      :href="localePath('/')"
      :class="[ isScrolled ? 'text-pearl-white' : 'text-deep-sea' ]"
    ) Home
  div(
    class="flex items-center"
  )
    ul(
      class="flex items-center"
    )
      //- li(
      //-   class="px-[10px]"
      //- )
      //-   a(
      //-     :href="localePath('/about')",
      //-     class="block relative"
      //-     :class="[ isScrolled ? 'text-pearl-white' : 'text-deep-sea' ]"
      //-     class="after:h-[1px] after:absolute after:top-full after:bg-[#1B4965] after:left-0 after:right-full after:transition-all after:duration-300"
      //-     class="md:hover:after:right-0"
      //-   ) {{ t('menu-about') }}
      li(
        class="px-[10px]"
      )
        a(
          :href="localePath('/songlist')",
          class="block relative transition-colors duration-300",
          :class="[ isScrolled ? 'text-pearl-white after:bg-mint-green' : 'text-deep-sea after:bg-deep-sea' ]",
          class="after:h-[1px] after:absolute after:top-full after:left-0 after:right-full after:transition-all after:duration-300"
          class="md:hover:after:right-0"
        ) {{ t('song-list') }}
    ul(
      class="flex items-center"
    )
      li(
        @click="switchLocale('ja')",
        class="lang-btn",
        :class="[ isScrolled ? 'text-pearl-white border-pearl-white/30 md:hover:bg-mint-green md:hover:text-deep-sea' : 'text-deep-sea border-deep-sea/30 md:hover:bg-deep-sea md:hover:text-white' ]",
        v-if="locale != 'ja'"
      )
        p 日本語
      li(
        @click="switchLocale('zh')",
        class="lang-btn",
        :class="[ isScrolled ? 'text-pearl-white border-pearl-white/30 md:hover:bg-mint-green md:hover:text-deep-sea' : 'text-deep-sea border-deep-sea/30 md:hover:bg-deep-sea md:hover:text-white' ]",
        v-if="locale != 'zh'"
      )
        p 繁中
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  locale: { type: String, default: 'ja' },
  messages: { type: Object, default: () => ({}) }
});

const t = (key) => props.messages[key] || key;
const isScrolled = ref(false);

const handleHeaderStyle = (event) => {
  isScrolled.value = event.detail.isDark;
};

onMounted(() => {
  window.addEventListener('update-header-style', handleHeaderStyle);
});

onUnmounted(() => {
  window.removeEventListener('update-header-style', handleHeaderStyle);
});

const localePath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const prefix = props.locale === 'ja' ? '' : '/zh';
  // Standardize path handling for Astro base
  const base = '/curva-umi-support';
  let url = `${base}${prefix}/${cleanPath}`;
  // Clean up double slashes etc if needed, but simple concat usually safer if structured
  // Ensure trailing slash if desired or not. Astro default often trailing slash
  if (!url.endsWith('/')) url += '/';
  return url.replace(/\/+/g, '/');
};

const switchLocale = (newLocale) => {
  // Logic to switch locale on same page
  // Current logic assumes structure /curva-umi-support/ (ja) and /curva-umi-support/zh/ (zh)
  // We need to parse current path and replace locale part
  
  const currentPath = window.location.pathname;
  // base: /curva-umi-support
  const base = '/curva-umi-support';
  
  let relativePath = currentPath;
  if (currentPath.startsWith(base)) {
    relativePath = currentPath.slice(base.length);
  }
  
  // relativePath might be /zh/songlist/ or /songlist/ or /
  
  // remove existing locale prefix if any
  if (relativePath.startsWith('/zh/')) {
    relativePath = relativePath.slice(3); // remove /zh
  } else if (relativePath === '/zh') {
    relativePath = '/';
  }
  
  // Now relativePath is /songlist/ or /
  
  const newPrefix = newLocale === 'ja' ? '' : '/zh';
  const newUrl = `${base}${newPrefix}${relativePath}`.replace(/\/+/g, '/');
  
  window.location.href = newUrl;
};
</script>

<style>
.lang-btn {
  @apply bg-transparent border rounded p-[5px_10px] mx-[5px] cursor-pointer transition-colors duration-300
}
</style>