<template lang="pug">
footer(
  class="bg-deep-sea/80 border-t border-pearl-white/10 p-[20px_20px] text-pearl-white text-right relative z-20"
)
  div(class="max-w-[1450px] mx-auto")
    div(
      @click="goTop",
      class="absolute bottom-[calc(100%+10px)] right-[20px] cursor-pointer group z-40 bg-mint-green rounded-full aspect-square p-[10px] flex items-center justify-center hover:bg-curacao transition-colors duration-300 shadow-lg shadow-mint-green/20"
    )
      p(class="text-[10px] text-white tracking-widest") TOP
    div(
      class="flex items-center justify-between max-md:flex-col-reverse"
    )
      a(
        href="https://t.co/oKazNascfC", target="_blank",
        class="group flex items-center max-md:mt-[10px]"
      )
        div(
          class="flex items-center justify-center w-[30px] h-[30px] bg-white/10 rounded-full md:group-hover:bg-mint-green transition-colors duration-300"
        )
          img(src="/curva-umi-support/img/discord.svg", class="invert opacity-80 md:group-hover:invert-0 md:group-hover:opacity-100 w-[16px]")
        p うみサポ Discord
      div(
        class="pb-[5px] text-[14px]"
      )
        p {{ t('directions') }}
    //- p(
    //-   class="text-[12px]"
    //- ) Copyright © 2024 DIANAxAKKO
</template>

<script setup>
const props = defineProps({
  locale: { type: String, default: 'ja' },
  messages: { type: Object, default: () => ({}) }
});

const t = (key) => props.messages[key] || key;

const goTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
};
</script>