<template lang="pug">
header(
  class="fixed left-0 right-0 top-0 bg-[rgba(255,255,255,0.8)] flex items-center justify-between px-[20px] py-[10px] z-40"
)
  div
    nuxt-link(:to="localePath('/')") Home
  div(
    class="flex items-center"
  )
    ul(
      class="flex items-center"
    )
      //- li(
      //-   class="px-[10px]"
      //- )
      //-   nuxt-link(
      //-     :to="localePath('/about')",
      //-     class="text-[#1B4965] block relative"
      //-     class="after:h-[1px] after:absolute after:top-full after:bg-[#1B4965] after:left-0 after:right-full after:transition-all after:duration-300"
      //-     class="md:hover:after:right-0"
      //-   ) {{ $t('menu-about') }}
      li(
        class="px-[10px]"
      )
        nuxt-link(
          :to="localePath('/songlist')",
          class="text-[#1B4965] block relative"
          class="after:h-[1px] after:absolute after:top-full after:bg-[#1B4965] after:left-0 after:right-full after:transition-all after:duration-300"
          class="md:hover:after:right-0"
        ) {{ $t('song-list') }}
      //- li(
      //-   v-for="menu in menuItems",
      //-   class="px-[10px]"
      //- )
      //-   nuxt-link(
      //-     :to="localePath(menu.url)",
      //-     class="text-[#1B4965] block relative"
      //-     class="after:h-[1px] after:absolute after:top-full after:bg-[#1B4965] after:left-0 after:right-full after:transition-all after:duration-300"
      //-     class="md:hover:after:right-0"
      //-   ) {{ menu.title }}
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
const { setLocale, t } = useI18n();
const localePath = useLocalePath();


</script>

<style>
.lang-btn {
  @apply bg-[#CAE9FF] rounded p-[5px_10px] mx-[5px] cursor-pointer text-[#1B4965] md:hover:text-[#CAE9FF] md:hover:bg-[#5FA8D3]
}
</style>