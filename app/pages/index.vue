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
      p 來羽うみ
  wave
  div(
    class="bg-[#62B6CB] relative py-[20px] px-[10px] pb-[40px]"
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
      section(
        class="mb-[20px]"
      )
        h2(
          data-aos="fade-up",
          class="text-[32px] mb-[20px] text-[#1B4965] font-bold tracking-[2px]"
        )
          span {{ $t('about-h2') }}
          //- span(
          //-   class="text-[20px] ml-[5px]"
          //- ) Who is Curva Umi?
        div
          div(
            class="md:flex items-start mt-[10px]"
          )
            div(
              data-aos="fade-up",
              class="max-w-[430px] h-[720px] bg-[#BEE9E8] mx-auto w-full"
            )
              p(class="px-[10px]") 圖片
            div(
              class="flex-1 md:ml-[10px] lg:ml-[30px]"
            )
              h3(
                data-aos="fade-up",
                class="text-[22px] text-[#1B4965] mb-[10px]"
              )
                span 來羽うみ
                span(
                  class="text-[18px] ml-[5px]"
                ) Curva Umi
              p(
                data-aos="fade-up",
                class="text-[18px] text-[#1B4965] mb-[10px]"
              ) {{ $t('about') }}
              p(
                data-aos="fade-up",
                class="text-[16px] mb-[5px]"
              ) {{ $t('info') }}
              ul(
                class="grid grid-cols-2 gap-x-[5px] gap-y-[5px] mb-[10px]"
              )
                li(
                  v-for="info in information",
                  data-aos="fade-up",
                  class="p-[5px_10px] border-[1px] rounded-[5px] border-[#5FA8D3] bg-[#CAE9FF] text-[14px]"
                )
                  p {{ `${info.title}: ${info.content}` }}
              p(
                data-aos="fade-up",
                class="text-[16px] mb-[5px]"
              ) {{ $t('tag') }}
              ul(
                class="grid grid-cols-2 gap-x-[5px] gap-y-[5px] mb-[10px]"
              )
                li(
                  v-for="info in tags",
                  data-aos="fade-up",
                  class="p-[5px_10px] border-[1px] rounded-[5px] border-[#5FA8D3] bg-[#CAE9FF] text-[14px]"
                )
                  p {{ `${info.title}:` }}
                  p
                    span(v-for="tag in info.content") {{ tag }}
              div(
                class="flex items-center mt-[10px]"
              )
                p(data-aos="fade-up") Link
                ul(
                  class="flex items-center ml-[5px]"
                )
                  li(
                    data-aos="fade-up",
                    class="mx-[5px]"
                  )
                    a(
                      href="https://x.com/curva_umi", target="_blank",
                      class="flex items-center justify-center w-[30px] h-[30px] bg-[#CAE9FF] rounded-full group md:hover:bg-[#1B4965]"
                    )
                      img(src="~/assets/img/twitter-x.svg", class="md:group-hover:invert md:group-hover:grayscale w-[16px]")
                  li(
                    data-aos="fade-up",
                    class="mx-[5px]"
                  )
                    a(
                      href="https://www.youtube.com/@curvaumi", target="_blank",
                      class="flex items-center justify-center w-[30px] h-[30px] bg-[#CAE9FF] rounded-full group md:hover:bg-[#1B4965]"
                    )
                      img(src="~/assets/img/youtube.svg", class="md:group-hover:invert md:group-hover:grayscale w-[16px]")
      h2(
        data-aos="fade-up",
        class="text-[32px] mt-[10px] text-[#1B4965] font-bold tracking-[2px]"
      ) {{ $t('design-h2')}}
      section(
        class="mt-[10px]",
        v-for="design in designList"
      )
        h2(
          data-aos="fade-up"
        ) {{ design.title }}
        div(
          data-aos="fade-up",
          class="py-[10px]",
          v-for="item in design.design"
        )
          div(
            class="w-full h-[200px] bg-slate-300"
          )
            p {{ item }}
        div(
          v-if="design?.member?.length > 0"
        )
          p {{ $t('design-member') }}
          ul(
            class="grid md:grid-cols-2 gap-[10px]"
          )
            li(
              v-for="member in design.member"
              data-aos="fade-up"
            )
              h2(
                class="mt-[20px]"
              ) {{ `${member?.title}` }}
              div(
                class="flex items-center py-[10px]"
              )
                div(
                  class="w-[80px] aspect-square bg-slate-300"
                )
                  p {{ member?.img }}
                div(
                  class="flex-1 px-[20px]"
                )
                  p {{ member?.name }}
                  ul(
                    class="flex items-center"
                  )
                    li(
                      data-aos="fade-up",
                      class="mx-[5px]",
                      v-if="member?.twitter"
                    )
                      a(
                        :href="member?.twitter", target="_blank",
                        class="flex items-center justify-center w-[30px] h-[30px] bg-[#CAE9FF] rounded-full group md:hover:bg-[#1B4965]"
                      )
                        img(src="~/assets/img/twitter-x.svg", class="md:group-hover:invert md:group-hover:grayscale w-[16px]")
                    li(
                      data-aos="fade-up",
                      class="mx-[5px]",
                      v-if="member?.youtube"
                    )
                      a(
                        :href="member?.youtube", target="_blank",
                        class="flex items-center justify-center w-[30px] h-[30px] bg-[#CAE9FF] rounded-full group md:hover:bg-[#1B4965]"
                      )
                        img(src="~/assets/img/youtube.svg", class="md:group-hover:invert md:group-hover:grayscale w-[16px]")
        div(
          data-aos="fade-up",
          class="h-[1px] w-full bg-[#1B4965] mt-[10px] group-last:hidden"
        )
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

const { setLocale, t } = useI18n()
const information = [
  {
    title: t('infor-birthday'),
    content: t('infor-birthday-content'),
  },
  {
    title: t('infor-like'),
    content: t('infor-like-content'),
  },
]

const tags = [
  {
    title: t('fan-mark'),
    content: ['🐧⚽️'],
  },
  {
    title: t('fan-name'),
    content: ['#うみサポ'],
  },
  {
    title: t('fan-tag'),
    content: ['#うみチャント'],
  },
  {
    title: t('fan-art'),
    content: ['#うみコレオ'],
  },
]

const designList = [
  {
    title: t('design01'),
    design: ['圖片網址'],
    member: [
      {
        title: `${t('design-art')}`,
        name: 'Art Name',
        img: 'img link',
        twitter: 'https://x.com/curva_umi',
        youtube: 'https://www.youtube.com/@curvaumi',
      },
      {
        title: `${t('design-live')}`,
        name: 'Live2D Name',
        img: 'img link',
        twitter: 'https://x.com/curva_umi',
        youtube: 'https://www.youtube.com/@curvaumi',
      },
    ]
  },
  {
    title: t('design02'),
    design: ['圖片網址'],
    member: [
      {
        title: `${t('design-art')}`,
        name: 'Art Name2',
        img: 'img link2',
        twitter: 'https://x.com/curva_umi',
        youtube: 'https://www.youtube.com/@curvaumi',
      },
      {
        title: `${t('design-live')}`,
        name: 'Live2D Name2',
        img: 'img link2',
        twitter: 'https://x.com/curva_umi',
        youtube: 'https://www.youtube.com/@curvaumi',
      },
    ]
  }
]

useHead({
  titleTemplate: () => {
    return '來羽うみSupport';
  },
})
</script>