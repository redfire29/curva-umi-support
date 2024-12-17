<template lang="pug">
footer(
  class="bg-[#8cc2ec] p-[10px_20px] text-[#102355] text-right relative z-20"
)
  div(class="max-w-[1450px] mx-auto")
    div(
      @click="goTop",
      class="absolute bottom-full right-[20px] cursor-pointer group z-40 bg-blue-400 rounded-full aspect-square p-[10px] flex items-center justify-center hover:bg-blue-500"
    )
      p(class="text-[10px] text-white tracking-widest") TOP
    div(
      class="pb-[5px] text-[14px]"
    )
      p 以上圖片皆有經過持有者的同意才使用
    p(
      class="text-[12px]"
    ) Copyright © 2024 DIANAxAKKO
</template>

<script setup>
const goTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};
</script>