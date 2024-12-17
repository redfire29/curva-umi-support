<template lang="pug">
header(
  class="fixed left-0 right-0 top-0 bg-[rgba(255,255,255,0.5)] flex items-center justify-between px-[20px] py-[10px] z-40"
)
  div
    nuxt-link(:to="localePath('/')") LOGO
  div(
    class="flex items-center"
  )
    ul(
      class="flex items-center"
    )
      li(
        v-for="menu in menuItems",
        class="px-[10px]"
      )
        nuxt-link(:to="localePath(menu.url)") {{ menu.title }}
    ul(
      class="flex items-center"
    )
      li(
        @click="setLocale('ja')",
        class="lang-btn"
      )
        p 日本語
      li(
        @click="setLocale('zh')",
        class="lang-btn"
      )
        p 繁中
</template>

<script setup>
const { setLocale } = useI18n();
const localePath = useLocalePath();

const menuItems = [
  // {
  //   url: '/about',
  //   title: 'About',
  // },
  {
    url: '/songlist',
    title: 'Song List',
  },
]
</script>

<style>
.lang-btn {
  @apply bg-blue-400 rounded p-[5px_10px] mx-[5px] cursor-pointer text-white md:hover:bg-blue-600
}
</style>