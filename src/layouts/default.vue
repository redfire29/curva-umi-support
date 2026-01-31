<template lang="pug">
div(
  class="flex flex-col h-full text-[#1B4965]",
)
  app-header
  div(
    class="flex-1"
  )
    div(
      class="w-full mx-auto"
    )
      slot
  app-footer
</template>

<script setup>
import 'aos/dist/aos.css'
import AOS from 'aos'
const route = useRoute();
onMounted(() => {
  AOS.init();
})

useHead({
  link: [
    { rel: 'canonical', href: computed(() => `https://redfire29.github.io/curva-umi-support${route.fullPath}` ) },
  ],
  meta: [
    { hid: 'og:url', property: 'og:url', content: computed(() => `https://redfire29.github.io/curva-umi-support${route.fullPath}`) },
  ],
})

</script>

<style>
</style>