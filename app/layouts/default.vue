<template lang="pug">
div(
  class="flex flex-col h-full",
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
onMounted(() => {
  AOS.init();
})
</script>

<style>
</style>