<template lang="pug">
div(
  class="overflow-hidden"
)
  section(
    class="pt-[210px] -mb-[1px] relative"
  )
    div(
      data-aos="fade-up",
      class="fixed top-0 left-0 right-0 h-[210px] -z-10 flex items-center justify-center"
    )
      p(
        class="text-[30px] font-bold"
      ) {{ $t('menu-about') }}
  wave
  div(
    class="bg-[#62B6CB] relative py-[20px] px-[10px] pb-[40px]"
  )
    h2(
      class="text-[32px] mb-[20px] text-[#1B4965] font-bold tracking-[2px]"
    ) {{ $t('about-history') }}
    ul
      li(
        v-for="history in historyList",
        class="flex items-center",
        class="text-[18px] text-[#1B4965] mb-[10px] border-b-[1px] border-[#1B4965] pb-[10px]"
      )
        p(
          class="mr-[10px]"
        ) {{history?.time}}
        a(
          :href="history?.link"
          target="_blank"
          class="md:hover:text-[#CAE9FF]"
        )
          p {{history?.content}}
</template>

<script setup>
const { setLocale, t } = useI18n();

const historyList = [
  {
    time: '2022-01-01',
    content: t('history-demo'),
    link: 'https://x.com/curva_umi',
  },
  {
    time: '2022-01-01',
    content: t('history-demo'),
    link: 'https://www.youtube.com/@curvaumi',
  },
  {
    time: '2022-01-01',
    content: t('history-demo'),
    link: '',
  },
]
</script>