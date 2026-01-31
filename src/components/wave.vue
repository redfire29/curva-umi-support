<template lang="pug">
div
  svg.waves(xmlns="http://www.w3.org/2000/svg", xmlns:xlink="http://www.w3.org/1999/xlink", viewBox="0 24 150 28", preserveAspectRatio="none", shape-rendering="auto")
    defs
      path#gentle-wave(d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z")
    g.parallax
      use(xlink:href="#gentle-wave", x="48", y="0", fill="rgba(152, 226, 198, 0.7)")
      use(xlink:href="#gentle-wave", x="48", y="3", fill="rgba(152, 226, 198, 0.5)")
      use(xlink:href="#gentle-wave", x="48", y="5", fill="rgba(152, 226, 198, 0.3)")
      use(xlink:href="#gentle-wave", x="48", y="7", fill="rgba(152, 226, 198, 1)")
</template>

<script setup>
</script>

<style>
.waves {
  @apply w-full h-[100px] -mb-[7px] min-h-[100px] max-h-[150px]
}
.parallax > use {
  @apply animate-[move-forever_25s_cubic-bezier(.55,.5,.45,.5)_infinite]
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

</style>