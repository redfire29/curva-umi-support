<template lang="pug">
footer(
  class="bg-[#62B6CB] p-[20px_20px] text-[#102355] text-right relative z-20"
)
  div(class="max-w-[1450px] mx-auto")
    div(
      @click="goTop",
      class="absolute bottom-full right-[20px] cursor-pointer group z-40 bg-blue-400 rounded-full aspect-square p-[10px] flex items-center justify-center hover:bg-blue-500"
    )
      p(class="text-[10px] text-white tracking-widest") TOP
    div(
      class="flex items-center justify-between max-md:flex-col-reverse"
    )
      //- a(
      //-   href="https://discord.com/channels/1023496935950262352/1023496935950262355", target="_blank",
      //-   class="group flex items-center max-md:mt-[10px]"
      //- )
      //-   div(
      //-     class="flex items-center justify-center w-[30px] h-[30px] bg-[#CAE9FF] rounded-full md:group-hover:bg-[#1B4965]"
      //-   )
      //-     img(src="~/assets/img/discord.svg", class="md:group-hover:invert md:group-hover:grayscale w-[16px]")
      //-   p うみサポ Discord
      div(
        class="pb-[5px] text-[14px]"
      )
        p {{ $t('directions') }}
    //- p(
    //-   class="text-[12px]"
    //- ) Copyright © 2024 DIANAxAKKO
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