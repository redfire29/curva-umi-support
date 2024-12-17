<template lang="pug">
div(
  class="flex flex-col h-full",
)
  app-header
  div(
    class="flex-1 pt-[50px]"
  )
    div(
      class="w-full mx-auto"
    )
      slot
  app-footer
</template>

<script setup>
</script>

<style>
</style>