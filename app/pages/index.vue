<template lang="pug">
div
  section(
    class="pt-[210px] -mb-[1px] relative"
  )
    div(
      class="fixed top-[56px] left-0 right-0 h-[210px] -z-10 flex items-center justify-center"
    )
      p 來羽うみ
  wave
  div(
    class="bg-[#8cc2ec] relative py-[20px]"
  )
    ul(
      class="absolute left-0 right-0 top-0 bottom-0"
    )
      li.bubble(
        v-for="bubble in [1,2,3,4,5,6,7,8,9,10]",
        class="bg-[rgba(255,255,255,0.2)] rounded-full aspect-square absolute top-full"
      )
        div(
          class="bg-[rgba(255,255,255,0.2)] left-[10%] top-[20%] w-1/4 aspect-square absolute rounded-full"
        )

    div(
      class="max-w-[1200px] mx-auto relative z-20"
    )
      section
        h2(
          class="text-[32px] mb-[20px]"
        )
          span 介紹
          span INTRODUCE
        div
          div(
            class="flex items-start mt-[10px]"
          )
            div(
              class="w-[430px] h-[720px] bg-[rgba(100,100,100,0.5)]"
            )
              p(class="px-[10px]") 圖片
            div(
              class="flex-1 ml-[30px]"
            )
              h3(
                class="text-[22px]"
                @click="setLocale('ja')"
              )
                span Name:
                span {{ $t('name') }}
              h3(
                class="text-[22px]"
              ) english
              div(
                class="bg-[rgba(255,255,255,0.6)] p-[10px] rounded-[10px] border-[1px] border-[rgba(94,122,222,0.8)]"
              )
                ul(
                  class="grid grid-cols-2 gap-x-[20px] gap-y-[20px]"
                )
                  li(
                    v-for="info in information",
                    class="p-[10px] border-[1px] rounded-xl border-[rgba(94,122,222,0.8)]"
                  )
                    p {{ `${info.title}: ${info.content}` }}
                p(
                  class="min-h-[100px]"
                ) 簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介簡介
              div
                p Link
                ul
                  li
                    a(href="https://x.com/curva_umi", target="_blank") X (Twitter)
                  li
                    a(href="https://www.youtube.com/@curvaumi", target="_blank") Youtube
      section(
        class="mt-[20px] "
      )
        h2 視覺圖
        div(
          class="py-[10px]"
        )
          div(
            class="w-full h-[200px] bg-slate-300"
          )
        div(
          class="grid grid-cols-2 gap-[10px]"
        )
          div
            h2(class="mt-[20px]") 繪師介紹： art
            div(
              class="flex items-center py-[10px]"
            )
              div(
                class="w-[80px] aspect-square bg-slate-300"
              )
              div(
                class="flex-1 px-[20px]"
              )
                p Name: art Name
                p X (Twitter)
          div
            h2(class="mt-[20px]") Live2D介紹： Live2D
            div(
              class="flex items-center py-[10px]"
            )
              div(
                class="w-[80px] aspect-square bg-slate-300"
              )
              div(
                class="flex-1 px-[20px]"
              )
                p Name: Live2D Name
                p X (Twitter)
</template>

<script setup>
import { gsap } from "gsap";

onMounted(() => {
  useForEach(document.querySelectorAll('.bubble'), (bubble) => {
    if (bubble) {
      gsap.set(bubble, {
        width: `${useRandom(10, 50)}px`,
        left: `${useRandom(5, 95)}vw`,
      })
      gsap.to(bubble, useRandom(5, 15), {
        top: 0,
        delay: useRandom(0, 1),
        x: Math.PI * 4,
        opacity: 0,
        modifiers: {
          x: (x) => {
            return Math.sin(parseFloat(x)) * 30 + "px";
          },
          delay: (x) => {
            return Math.sin(parseFloat(x)) * 0.5;
          },
        },
        stagger: {
          repeat: -1
        }
      })
    }
  })
})

const { setLocale } = useI18n()

const information = [
  {
    title: '生日',
    content: '12月3日',
  },
  {
    title: '喜歡的東西',
    content: '企鵝',
  },
]
</script>